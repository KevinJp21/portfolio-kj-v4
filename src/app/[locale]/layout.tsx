import type { Metadata } from "next";
import { cookies } from "next/headers";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { notFound } from 'next/navigation';
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import { SmoothScroll, ScrollProgress, PageTransition, Navbar, Footer } from "@/components";
import { ThemeProvider } from "@/hooks";
import { resolveTheme, THEME_STORAGE_KEY } from "@/lib/theme";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  axes: ["SOFT", "opsz"],
});

const siteUrl = "https://portfolio-kj-v4.vercel.app";
const siteName = "Kevin Julio Pineda";
const ogImage = "/og-image.webp";
const faviconPath = "/favicon";

const ogLocales: Record<(typeof routing.locales)[number], string> = {
  es: "es_CO",
  en: "en_US",
};

type MetadataProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Metadata" });

  const canonical = getPathname({ locale, href: "/" });
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, getPathname({ locale: l, href: "/" })])
  );
  languages["x-default"] = getPathname({
    locale: routing.defaultLocale,
    href: "/",
  });

  const ogLocale = hasLocale(routing.locales, locale)
    ? ogLocales[locale]
    : ogLocales[routing.defaultLocale];

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t("title"),
      template: `%s | ${siteName}`,
    },
    description: t("description"),
    keywords: t("keywords").split(", "),
    authors: [{ name: siteName, url: siteUrl }],
    creator: siteName,
    publisher: siteName,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocale,
      url: canonical,
      siteName,
      title: t("title"),
      description: t("ogDescription"),
      images: [
        {
          url: ogImage,
          width: 512,
          height: 512,
          alt: t("ogImageAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("ogDescription"),
      images: [ogImage],
    },
    alternates: {
      canonical,
      languages,
    },
    manifest: `${faviconPath}/site.webmanifest`,
    icons: {
      icon: [
        { url: `${faviconPath}/favicon.ico`, sizes: "any" },
        { url: `${faviconPath}/favicon.svg`, type: "image/svg+xml" },
        {
          url: `${faviconPath}/favicon-96x96.png`,
          sizes: "96x96",
          type: "image/png",
        },
      ],
      shortcut: `${faviconPath}/favicon.ico`,
      apple: `${faviconPath}/apple-touch-icon.png`,
    },
    category: "technology",
  };
}

type TProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: TProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();
  const theme = resolveTheme((await cookies()).get(THEME_STORAGE_KEY)?.value);

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      style={{ colorScheme: theme }}
      className={`${theme} ${geistSans.variable} ${geistMono.variable} ${fraunces.variable} antialiased`}
    >
      <body className="grain relative bg-ink-900 text-bone-100 selection:bg-signal selection:text-ink-900">
        <ThemeProvider initialTheme={theme}>
          <SmoothScroll>
            <div className="blueprint" aria-hidden />
            <div className="scanline" aria-hidden />
            <ScrollProgress />
            <NextIntlClientProvider messages={messages}>
              <Navbar />
              <PageTransition>
                <main className="relative z-10 min-h-screen">{children}</main>
              </PageTransition>
              <Footer />
            </NextIntlClientProvider>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}

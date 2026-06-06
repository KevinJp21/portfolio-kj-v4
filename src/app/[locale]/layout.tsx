import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from 'next/navigation';
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import { SmoothScroll, ScrollProgress, PageTransition, Navbar, Footer } from "@/components";
import { ThemeProvider } from "@/hooks";
import { THEME_STORAGE_KEY } from "@/lib/theme";
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

const siteUrl = "https://kevinjp.dev";
const siteName = "Kevin Julio Pineda";
const siteDescription =
  "Ingeniero de sistemas y desarrollador frontend con visión full-stack. Diseño y construyo productos web a medida, adaptados a las necesidades de cada cliente.";
const ogImage = "/og-image.webp";
const faviconPath = "/favicon";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Frontend Developer • Full-stack`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "Kevin Julio Pineda",
    "frontend developer",
    "desarrollador frontend",
    "full-stack",
    "React",
    "Next.js",
    "TypeScript",
    "TailwindCSS",
    "Shopify",
    "e-commerce",
    "portfolio",
    "desarrollador web",
    "Barranquilla",
    "Colombia",
  ],
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
    locale: "es_CO",
    url: siteUrl,
    siteName,
    title: `${siteName} | Frontend Developer • Full-stack`,
    description:
      "Portfolio de Kevin Julio Pineda — desarrollador frontend con visión full-stack. Proyectos web, e-commerce y aplicaciones a medida.",
    images: [
      {
        url: ogImage,
        width: 512,
        height: 512,
        alt: `${siteName} — Frontend Developer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Frontend Developer · Full-stack`,
    description: siteDescription,
    images: [ogImage],
  },
  alternates: {
    canonical: siteUrl,
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

const themeInitScript = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var r=document.documentElement;var t=localStorage.getItem(k);r.classList.remove("light","dark");r.classList.add(t==="light"||t==="dark"?t:"dark")}catch(e){document.documentElement.classList.add("dark")}})();`;

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

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`dark ${geistSans.variable} ${geistMono.variable} ${fraunces.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="grain relative bg-ink-900 text-bone-100 selection:bg-signal selection:text-ink-900">
        <ThemeProvider>
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

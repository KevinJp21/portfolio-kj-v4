import { ContactTemplate } from "@/features"
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { siteUrl, siteName, siteTwitter } from "@/const";

type Props = {
  params: Promise<{ locale: string }>;
};

const ogImage = "/og-image.webp";

const ogLocales: Record<(typeof routing.locales)[number], string> = {
  es: "es_CO",
  en: "en_US",
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const t = await getTranslations({ locale, namespace: "ContactPage" });

  const canonical = getPathname({ locale, href: "/contact" });
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, getPathname({ locale: l, href: "/contact" })])
  );
  languages["x-default"] = getPathname({
    locale: routing.defaultLocale,
    href: "/contact",
  });
  const ogLocale = hasLocale(routing.locales, locale)
    ? ogLocales[locale]
    : ogLocales[routing.defaultLocale];

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: canonical,
      locale: ogLocale,
      siteName,
      images: [{ url: ogImage, width: 1200, height: 630, alt: t("metaTitle") }],
    },
    twitter: {
      card: "summary_large_image",
      site: siteTwitter,
      title: t("metaTitle"),
      description: t("metaDescription"),
      images: [ogImage],
    },
    alternates: { canonical, languages },
  };
}

export default async function ContactPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: "ContactPage" });
    const canonical = getPathname({ locale, href: "/contact" });

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: t("metaTitle"),
      description: t("metaDescription"),
      url: canonical,
      inLanguage: locale === "es" ? "es-CO" : "en-US",
      publisher: {
        "@type": "Organization",
        name: siteName,
        url: siteUrl,
      },
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ContactTemplate />
      </>
    );
  }
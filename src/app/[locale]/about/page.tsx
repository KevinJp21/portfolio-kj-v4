import { AboutTemplate } from "@/features";
import { getTranslations } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { siteUrl, siteName } from "@/const";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const ogImage = "/og-image.webp";

const ogLocales: Record<(typeof routing.locales)[number], string> = {
  es: "es_CO",
  en: "en_US",
};


export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const t = await getTranslations({ locale, namespace: "AboutPage" });

  const canonical = getPathname({ locale, href: "/about" })
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, getPathname({ locale: l, href: "/about" })])
  );
  languages["x-default"] = getPathname({
    locale: routing.defaultLocale,
    href: "/about",
  });
  const ogLocale = hasLocale(routing.locales, locale)
    ? ogLocales[locale]
    : ogLocales[routing.defaultLocale];

  return {
    metadataBase: new URL(siteUrl),
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      type: "website",
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: canonical,
      locale: ogLocale,
      siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: t("ogImageAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("metaTitle"),
      description: t("metaDescription"),
      images: [ogImage],
    },
    alternates: {
      canonical,
      languages
    }
  }
};

export default function AboutPage() {
  return <AboutTemplate />
}

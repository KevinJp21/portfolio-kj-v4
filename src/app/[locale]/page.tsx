import { setRequestLocale } from "next-intl/server";
import { HomeTemplate } from "@/features/home";
import { getAllPosts } from "@/lib/blog/posts";
import { TPageProps } from "@/types";
import { siteName, siteUrl } from "@/const";
import { getTranslations } from "next-intl/server";

export default async function Home({ params }: TPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Metadata" });
  const posts = getAllPosts(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t("title"),
    description: t("description"),
    url: `${siteUrl}/${locale}`,
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
      <HomeTemplate featuredPosts={posts.slice(0, 4)} totalPosts={posts.length} />
    </>
  );
}

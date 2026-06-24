import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { buildBlogIndexMetadata } from "@/lib/blog/seo";
import { getAllPosts } from "@/lib/blog/posts";
import { BlogTemplate } from "@/features";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const t = await getTranslations({ locale, namespace: "BlogPage.index" });

  return buildBlogIndexMetadata(locale, t("metaTitle"), t("metaDescription"));
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const t = await getTranslations("BlogPage.index");
  const posts = getAllPosts(locale);

  return (
    <BlogTemplate
      posts={posts}
      labels={{
        code: t("code"),
        titleLead: t("titleLead"),
        titleAccent: t("titleAccent"),
        description: t("description"),
        filterLabel: t("filterLabel"),
        filters: {
          All: t("filters.All"),
          ecommerce: t("filters.ecommerce"),
          restaurant: t("filters.restaurant"),
          ai: t("filters.ai"),
        },
        views: {
          grid: t("views.grid"),
          list: t("views.list"),
          matrix: t("views.matrix"),
        },
        matrix: {
          index: t("matrix.index"),
          project: t("matrix.project"),
          client: t("matrix.client"),
          stack: t("matrix.stack"),
          year: t("matrix.year"),
          open: t("matrix.open"),
        },
      }}
    />
  );
}

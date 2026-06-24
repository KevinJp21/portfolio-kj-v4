import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildPostMetadata,
} from "@/lib/blog/seo";
import {
  getAdjacentPosts,
  getAllStaticParams,
  getPost,
  getPostMeta,
} from "@/lib/blog/posts";
import { BlogPostView } from "@/features/blog";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return getAllStaticParams();
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const post = getPostMeta(locale, slug);
  if (!post) return { title: "Not found" };

  return buildPostMetadata(post);
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const post = getPost(locale, slug);
  if (!post) notFound();

  setRequestLocale(locale);
  const t = await getTranslations("BlogPage.post");
  const tIndex = await getTranslations("BlogPage.index");
  const { next } = getAdjacentPosts(locale, slug);

  const articleJsonLd = buildArticleJsonLd(post);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(post, tIndex("breadcrumbLabel"));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <BlogPostView
        post={post}
        nextPost={next}
        labels={{
          back: t("back"),
          client: t("client"),
          role: t("role"),
          year: t("year"),
          viewSite: t("viewSite"),
          github: t("github"),
          stack: t("stack"),
          readingTime: t("readingTime", { minutes: post.readingTime }),
          summary: t("summary"),
          next: t("next"),
        }}
      />
    </>
  );
}

import type { Metadata } from "next";
import { siteName, siteUrl } from "@/const";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import type { BlogPostMeta } from "./types";
const blogOgImage = "/blog-og-image.webp";

const ogLocales: Record<(typeof routing.locales)[number], string> = {
  es: "es_CO",
  en: "en_US",
};

function blogPath(locale: string, slug?: string) {
  if (slug) {
    return getPathname({
      locale,
      href: { pathname: "/blog/[slug]", params: { slug } },
    });
  }
  return getPathname({ locale, href: "/blog" });
}

function languageAlternates(slug?: string) {
  const languages = Object.fromEntries(
    routing.locales.map((locale) => [locale, blogPath(locale, slug)])
  );
  languages["x-default"] = blogPath(routing.defaultLocale, slug);
  return languages;
}

export function buildBlogIndexMetadata(
  locale: string,
  title: string,
  description: string
): Metadata {
  const canonical = blogPath(locale);
  const ogLocale = ogLocales[locale as keyof typeof ogLocales] ?? ogLocales.es;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: languageAlternates(),
    },
    openGraph: {
      type: "website",
      locale: ogLocale,
      url: canonical,
      siteName,
      title,
      description,
      images: [
        {
          url: blogOgImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [blogOgImage],
    },
  };
}

export function buildPostMetadata(post: BlogPostMeta): Metadata {
  const canonical = blogPath(post.locale, post.slug);
  const ogLocale =
    ogLocales[post.locale as keyof typeof ogLocales] ?? ogLocales.es;

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: siteName, url: siteUrl }],
    alternates: {
      canonical,
      languages: languageAlternates(post.slug),
    },
    openGraph: {
      type: "article",
      locale: ogLocale,
      url: canonical,
      siteName,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      tags: post.tags,
      images: [
        {
          url: post.cover,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.cover],
    },
  };
}

export function buildArticleJsonLd(post: BlogPostMeta) {
  const url = new URL(blogPath(post.locale, post.slug), siteUrl).href;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: [post.cover],
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: {
      "@type": "Person",
      name: siteName,
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: siteName,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
    keywords: post.tags.join(", "),
    articleSection: post.category,
    inLanguage: post.locale === "es" ? "es-CO" : "en-US",
  };
}

export function buildBreadcrumbJsonLd(post: BlogPostMeta, blogLabel: string) {
  const base = new URL(siteUrl).href;
  const blogUrl = new URL(blogPath(post.locale), siteUrl).href;
  const postUrl = new URL(blogPath(post.locale, post.slug), siteUrl).href;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: siteName,
        item: base,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: blogLabel,
        item: blogUrl,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  };
}

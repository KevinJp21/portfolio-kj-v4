import type { MetadataRoute } from "next";
import { siteUrl } from "@/const";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getAllPosts } from "@/lib/blog";

type LocalizedHref = Parameters<typeof getPathname>[0]["href"];

function localizedUrl(locale: string, href: LocalizedHref) {
  return new URL(getPathname({ locale, href }), siteUrl).href;
}

function languageAlternates(href: LocalizedHref) {
  const languages = Object.fromEntries(
    routing.locales.map((locale) => [locale, localizedUrl(locale, href)])
  );

  languages["x-default"] = localizedUrl(routing.defaultLocale, href);

  return { languages };
}

function postAlternates(slug: string) {
  const languages = Object.fromEntries(
    routing.locales.map((locale) => [
      locale,
      localizedUrl(locale, {
        pathname: "/blog/[slug]",
        params: { slug },
      }),
    ])
  );

  languages["x-default"] = localizedUrl(routing.defaultLocale, {
    pathname: "/blog/[slug]",
    params: { slug },
  });

  return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    entries.push({
      url: localizedUrl(locale, "/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: languageAlternates("/"),
    });

    entries.push({
      url: localizedUrl(locale, "/about"),
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.7,
      alternates: languageAlternates("/about"),
    });

    entries.push({
      url: localizedUrl(locale, "/blog"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: languageAlternates("/blog"),
    });

    for (const post of getAllPosts(locale)) {
      entries.push({
        url: localizedUrl(locale, {
          pathname: "/blog/[slug]",
          params: { slug: post.slug },
        }),
        lastModified: new Date(post.updated ?? post.date),
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: postAlternates(post.slug),
      });
    }
  }

  return entries;
}

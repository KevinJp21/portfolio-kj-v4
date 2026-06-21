import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getAllPosts } from "@/lib/blog";

const siteUrl = "https://portfolio-kj-v4.vercel.app";

function localizedUrl(locale: string, href: Parameters<typeof getPathname>[0]["href"]) {
  return new URL(getPathname({ locale, href }), siteUrl).href;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    entries.push({
      url: localizedUrl(locale, "/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    });

    entries.push({
      url: localizedUrl(locale, "/blog"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
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
      });
    }
  }

  return entries;
}

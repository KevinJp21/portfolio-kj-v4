import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { routing } from "@/i18n/routing";
import type { BlogFrontmatter, BlogPost, BlogPostMeta } from "@/types";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

function postsDir(locale: string) {
  return path.join(BLOG_DIR, locale);
}

function readingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function parseMeta(
  locale: string,
  slug: string,
  raw: string
): BlogPostMeta | null {
  const { data, content } = matter(raw);
  const frontmatter = data as BlogFrontmatter;

  if (!frontmatter.title || !frontmatter.description) {
    return null;
  }

  return {
    ...frontmatter,
    slug,
    locale,
    readingTime: readingTime(content),
  };
}

export function getAllPostSlugs(locale: string): string[] {
  const dir = postsDir(locale);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getPostMeta(
  locale: string,
  slug: string
): BlogPostMeta | null {
  const filePath = path.join(postsDir(locale), `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  return parseMeta(locale, slug, raw);
}

export function getAllPosts(locale: string): BlogPostMeta[] {
  return getAllPostSlugs(locale)
    .map((slug) => getPostMeta(locale, slug))
    .filter((post): post is BlogPostMeta => post !== null)
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

export function getPost(locale: string, slug: string): BlogPost | null {
  const filePath = path.join(postsDir(locale), `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = data as BlogFrontmatter;

  if (!frontmatter.title) return null;

  return {
    ...frontmatter,
    slug,
    locale,
    content,
    readingTime: readingTime(content),
  };
}

export function getAdjacentPosts(locale: string, slug: string) {
  const posts = getAllPosts(locale);
  const index = posts.findIndex((post) => post.slug === slug);

  if (index === -1) return { prev: null, next: null };

  return {
    prev: index > 0 ? posts[index - 1] : null,
    next: index < posts.length - 1 ? posts[index + 1] : null,
  };
}

export function getAllStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllPostSlugs(locale).map((slug) => ({ locale, slug }))
  );
}

import { BLOG_CATEGORY_KEYS } from "@/const";

export type StackLevel = "daily" | "project" | "learning";

export type StackCategoryKey = "languages" | "backend" | "ai" | "tools";

export type BlogCategoryKey = (typeof BLOG_CATEGORY_KEYS)[number];

export type BlogCategoryFilterId = "All" | BlogCategoryKey;

export type BlogHighlight = {
    label: string;
    value: string;
  };
  
  export type BlogFrontmatter = {
    title: string;
    subtitle: string;
    description: string;
    summary: string;
    date: string;
    updated?: string;
    slug: string;
    locale: string;
    index: string;
    year: string;
    role: string;
    client: string;
    categoryKey: BlogCategoryKey;
    category: string;
    stack: string[];
    cover: string;
    accent: string;
    url?: string;
    github?: string;
    tags: string[];
    highlights: BlogHighlight[];
  };
  
  export type BlogPostMeta = BlogFrontmatter & {
    readingTime: number;
  };
  
  export type BlogPost = BlogPostMeta & {
    content: string;
  };
  



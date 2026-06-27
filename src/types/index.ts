import { BLOG_CATEGORY_KEYS } from "@/const";

export type TPageProps = {
  params: Promise<{ locale: string, slug?: string }>;
};


export type TStackLevel = "daily" | "project" | "learning";

export type TStackCategoryKey = "languages" | "backend" | "ai" | "tools";

export type TBlogCategoryKey = (typeof BLOG_CATEGORY_KEYS)[number];

export type TBlogCategoryFilterId = "All" | TBlogCategoryKey;

export type TBlogHighlight = {
    label: string;
    value: string;
  };
  
  export type TBlogFrontmatter = {
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
    categoryKey: TBlogCategoryKey;
    category: string;
    stack: string[];
    cover: string;
    accent: string;
    url?: string;
    github?: string;
    tags: string[];
    highlights: TBlogHighlight[];
  };
  
  export type TTBlogPostMeta = TBlogFrontmatter & {
    readingTime: number;
  };
  
  export type TBlogPost = TTBlogPostMeta & {
    content: string;
  };
  



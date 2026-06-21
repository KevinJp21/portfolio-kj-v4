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

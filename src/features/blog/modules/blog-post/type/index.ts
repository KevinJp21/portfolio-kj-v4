import { TBlogPost, TTBlogPostMeta } from "@/types";

export type TTBlogPostTemplateProps = {
    post: TBlogPost;
    nextPost: TTBlogPostMeta | null;
    labels: {
      back: string;
      client: string;
      role: string;
      year: string;
      viewSite: string;
      github: string;
      stack: string;
      readingTime: string;
      summary: string;
      next: string;
    };
  };
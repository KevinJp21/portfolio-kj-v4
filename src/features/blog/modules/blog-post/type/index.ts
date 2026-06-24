import { BlogPost, BlogPostMeta } from "@/types";

export type TBlogPostTemplateProps = {
    post: BlogPost;
    nextPost: BlogPostMeta | null;
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
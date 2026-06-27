import { TBlogCategoryFilterId } from "@/types";
import type { TTBlogPostMeta } from "@/lib/blog/types";

export type TBlogView = "grid" | "list" | "matrix";

export type TBlogLabels = {
  code: string;
  titleLead: string;
  titleAccent: string;
  description: string;
  filterLabel: string;
  filters: Record<TBlogCategoryFilterId, string>;
  views: Record<TBlogView, string>;
  matrix: {
    index: string;
    project: string;
    client: string;
    stack: string;
    year: string;
    open: string;
  };
};

export type TBlogViewProps = {
  posts: TTBlogPostMeta[];
  labels: TBlogLabels;
};

export type TBlogTemplaterops = {
    posts: TTBlogPostMeta[];
    labels: {
      code: string;
      titleLead: string;
      titleAccent: string;
      description: string;
      filterLabel: string;
      filters: Record<TBlogCategoryFilterId, string>;
      views: {
        grid: string;
        list: string;
        matrix: string;
      };
      matrix: {
        index: string;
        project: string;
        client: string;
        stack: string;
        year: string;
        open: string;
      };
    };
  };
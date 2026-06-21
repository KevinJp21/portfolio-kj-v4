import type { BlogPostMeta } from "@/lib/blog/types";
import type { BlogCategoryFilterId } from "@/lib/blog/categories";
import { BlogIndexView } from "../components/blog-index-view";

type BlogIndexProps = {
  posts: BlogPostMeta[];
  labels: {
    code: string;
    titleLead: string;
    titleAccent: string;
    description: string;
    filterLabel: string;
    filters: Record<BlogCategoryFilterId, string>;
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

export function BlogIndex({ posts, labels }: BlogIndexProps) {
  return <BlogIndexView posts={posts} labels={labels} />;
}

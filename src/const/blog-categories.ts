import { TBlogCategoryFilterId } from "@/types";

export const BLOG_CATEGORY_KEYS = ["ecommerce", "restaurant", "ai", "saas"] as const;

export const BLOG_CATEGORY_FILTERS: TBlogCategoryFilterId[] = [
  "All",
  ...BLOG_CATEGORY_KEYS,
];

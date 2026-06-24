import { BlogCategoryFilterId } from "@/types";

export const BLOG_CATEGORY_KEYS = ["ecommerce", "restaurant", "ai"] as const;

export const BLOG_CATEGORY_FILTERS: BlogCategoryFilterId[] = [
  "All",
  ...BLOG_CATEGORY_KEYS,
];

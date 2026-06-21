export const BLOG_CATEGORY_KEYS = ["ecommerce", "restaurant", "ai"] as const;

export type BlogCategoryKey = (typeof BLOG_CATEGORY_KEYS)[number];

export type BlogCategoryFilterId = "All" | BlogCategoryKey;

export const BLOG_CATEGORY_FILTERS: BlogCategoryFilterId[] = [
  "All",
  ...BLOG_CATEGORY_KEYS,
];

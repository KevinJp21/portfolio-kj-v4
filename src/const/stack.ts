import type { TStackCategoryKey, TStackLevel } from "@/types";

export const stackItems: {
  categoryKey: TStackCategoryKey;
  items: { name: string; level: TStackLevel }[];
}[] = [
  {
    categoryKey: "languages",
    items: [
      { name: "TypeScript", level: "daily" },
      { name: "JavaScript", level: "daily" },
      { name: "React", level: "daily" },
      { name: "Next.js", level: "daily" },
      { name: "TailwindCSS", level: "daily" },
      { name: "Remix", level: "project" },
      { name: "GraphQL", level: "project" },
      { name: "Angular", level: "learning" },
    ],
  },
  {
    categoryKey: "backend",
    items: [
      { name: "Node.js", level: "project" },
      { name: "Express", level: "project" },
      { name: "Python", level: "project" },
      { name: "Flask", level: "project" },
      { name: "MySQL", level: "project" },
      { name: "SQLAlchemy", level: "project" },
      { name: "Shopify · Liquid", level: "project" },
      { name: "PHP", level: "project" },
      { name: "Java", level: "project" },
    ],
  },
  {
    categoryKey: "ai",
    items: [
      { name: "TensorFlow", level: "project" },
      { name: "Keras", level: "project" },
      { name: "NLTK", level: "project" },
      { name: "Pandas", level: "project" },
      { name: "NumPy", level: "project" },
      { name: "SciKit-Learn", level: "project" },
      { name: "Matplotlib", level: "project" },
      { name: "Seaborn", level: "project" },
    ],
  },
  {
    categoryKey: "tools",
    items: [
      { name: "Git", level: "daily" },
      { name: "npm", level: "daily" },
      { name: "pnpm", level: "daily" },
      { name: "Cloudflare", level: "project" },
      { name: "Docker", level: "learning" },
    ],
  },
];

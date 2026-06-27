import { setRequestLocale } from "next-intl/server";
import { HomeTemplate } from "@/features/home";
import { getAllPosts } from "@/lib/blog/posts";
import { TPageProps } from "@/types";

export default async function Home({ params }: TPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = getAllPosts(locale);

  return (
    <HomeTemplate featuredPosts={posts.slice(0, 4)} totalPosts={posts.length} />
  );
}

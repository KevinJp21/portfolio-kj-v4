import { setRequestLocale } from "next-intl/server";
import { HomeTemplate } from "@/features/home";
import { getAllPosts } from "@/lib/blog/posts";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = getAllPosts(locale);

  return (
    <HomeTemplate featuredPosts={posts.slice(0, 4)} totalPosts={posts.length} />
  );
}

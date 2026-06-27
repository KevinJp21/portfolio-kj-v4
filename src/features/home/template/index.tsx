import type { TTBlogPostMeta } from "@/lib/blog/types";
import {
  Hero,
  AboutBlock,
  ExperienceTimeline,
  FeaturedProjects,
  StackOrbital,
  CloserBlock,
} from "..";

type HomeTemplateProps = {
  featuredPosts: TTBlogPostMeta[];
  totalPosts: number;
};

export function HomeTemplate({ featuredPosts, totalPosts }: HomeTemplateProps) {
  return (
    <>
      <Hero />
      <AboutBlock />
      <ExperienceTimeline />
      <FeaturedProjects posts={featuredPosts} totalPosts={totalPosts} />
      <StackOrbital />
      <CloserBlock />
    </>
  );
}

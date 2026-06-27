import type { TTBlogPostMeta } from "@/types";
import {
  Hero,
  AboutBlock,
  ExperienceTimeline,
  FeaturedProjects,
  StackOrbital,
  CloserBlock,
} from "..";

type THomeTemplateProps = {
  featuredPosts: TTBlogPostMeta[];
  totalPosts: number;
};

export function HomeTemplate({ featuredPosts, totalPosts }: THomeTemplateProps) {
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

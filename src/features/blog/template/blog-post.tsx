import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { BlogPost, BlogPostMeta } from "@/lib/blog";
import { mdxComponents } from "../components/mdx-components";
import {
  ArticleAside,
  ArticleCover,
  ArticleHeader,
  NextPostLink,
} from "../components/article-shell";
import { BlogPostMotion } from "../components/blog-post-motion";

type BlogPostViewProps = {
  post: BlogPost;
  nextPost: BlogPostMeta | null;
  labels: {
    back: string;
    client: string;
    role: string;
    year: string;
    viewSite: string;
    github: string;
    stack: string;
    readingTime: string;
    summary: string;
    next: string;
  };
};

export async function BlogPostView({
  post,
  nextPost,
  labels,
}: BlogPostViewProps) {
  const content = await MDXRemote({
    source: post.content,
    components: mdxComponents,
  });

  return (
    <BlogPostMotion>
      <article className="relative pb-32 pt-36">
        <ArticleHeader
          post={post}
          backLabel={labels.back}
          clientLabel={labels.client}
          roleLabel={labels.role}
          yearLabel={labels.year}
          viewSiteLabel={labels.viewSite}
          githubLabel={labels.github}
        />

        <ArticleCover post={post}>
          <Image
            src={post.cover}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1320px) 100vw, 1320px"
            className="object-cover"
          />
        </ArticleCover>

        <section className="section-x mx-auto mt-24 grid max-w-[1320px] gap-12 md:grid-cols-12">
          <ArticleAside
            post={post}
            stackLabel={labels.stack}
            readingTimeLabel={labels.readingTime}
          />

          <div className="md:col-span-8">
            <p
              data-fade
              className="mb-12 font-display text-[clamp(1.35rem,2.4vw,2rem)] leading-snug text-bone-100"
            >
              <em className="italic text-signal">{labels.summary}</em>{" "}
              {post.summary}
            </p>

            <div className="blog-prose space-y-6">{content}</div>
          </div>
        </section>

        {nextPost ? (
          <NextPostLink post={nextPost} label={labels.next} />
        ) : null}
      </article>
    </BlogPostMotion>
  );
}

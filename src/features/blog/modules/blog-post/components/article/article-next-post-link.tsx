import { Link } from "@/i18n/navigation";
import type { TTBlogPostMeta } from "@/types";
import { MoveLeft } from "lucide-react";

type NextPostLinkProps = {
  post: TTBlogPostMeta;
  label: string;
};

export function ArticleNextPostLink({ post, label }: NextPostLinkProps) {
  return (
    <div className="section-x mx-auto mt-32 max-w-[1320px]">
      <Link
        href={{ pathname: "/blog/[slug]", params: { slug: post.slug } }}
        data-cursor="cta"
        data-cursor-label={post.title}
        data-fade
        className="group block overflow-hidden rounded-3xl border border-rule bg-ink-850 p-10 transition-colors hover:bg-ink-800 md:p-16"
      >
        <p className="chip-mono text-bone-500">{label}</p>
        <div className="mt-8 grid items-end justify-between gap-6 md:grid-cols-2">
          <h2 className="font-display text-[clamp(2rem,7vw,5rem)] leading-[0.9] text-bone-100">
            {post.title}
            <span className="block text-bone-400 italic">
              {post.subtitle.split(".")[0]}.
            </span>
          </h2>
          <div className="flex items-center justify-between gap-4 md:justify-end">
            <span className="font-mono text-sm text-bone-400">
              {post.index} · {post.year} · {post.category}
            </span>
            <span
              aria-hidden
              className="inline-block transform text-3xl text-signal transition-transform group-hover:translate-x-2"
            >
              <MoveLeft className="size-6 stroke-2 transform rotate-130" />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ArticleNextPostLink;
import { TTBlogPostMeta } from "@/types";
import { Link } from "@/i18n/navigation";

export function BlogListView({ items }: { items: TTBlogPostMeta[] }) {
    return (
      <ul className="divide-y divide-rule-soft border-y border-rule-soft">
        {items.map((post) => (
          <li key={post.slug} className="bi-card">
            <Link
              href={{ pathname: "/blog/[slug]", params: { slug: post.slug } }}
              data-cursor="cta"
              data-cursor-label={post.title}
              className="group grid grid-cols-12 items-center gap-4 py-6 transition-colors hover:bg-ink-850/40"
            >
              <span className="col-span-1 font-mono text-xs text-bone-400">
                {post.index}
              </span>
              <h3 className="col-span-11 font-display text-[clamp(1.75rem,4.5vw,3.5rem)] leading-tight text-bone-100 transition-all group-hover:translate-x-2 md:col-span-5">
                {post.title}
              </h3>
              <span className="hidden text-sm text-bone-400 md:col-span-3 md:block">
                {post.subtitle}
              </span>
              <span className="hidden font-mono text-xs uppercase tracking-widest text-bone-400 md:col-span-2 md:block">
                {post.category}
              </span>
              <span className="hidden text-right text-bone-400 transition-colors group-hover:text-signal md:col-span-1 md:block">
                ↗
              </span>
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  export default BlogListView;
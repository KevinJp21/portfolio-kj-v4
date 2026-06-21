import { Link } from "@/i18n/navigation";
import type { BlogPostMeta } from "@/lib/blog";
import { ArticleTitle } from "./article-title";

export { ArticleCover } from "./article-cover";

type ArticleHeaderProps = {
  post: BlogPostMeta;
  backLabel: string;
  clientLabel: string;
  roleLabel: string;
  yearLabel: string;
  viewSiteLabel: string;
  githubLabel: string;
};

export function ArticleHeader({
  post,
  backLabel,
  clientLabel,
  roleLabel,
  yearLabel,
  viewSiteLabel,
  githubLabel,
}: ArticleHeaderProps) {
  return (
    <header className="section-x mx-auto max-w-[1320px]">
      <div className="flex flex-wrap items-center gap-3 border-y border-rule-soft py-4">
        <Link
          href="/blog"
          data-cursor="link"
          data-cursor-label={backLabel}
          className="chip-mono text-bone-400 transition-colors hover:text-signal"
        >
          ← /blog
        </Link>
        <span className="chip-mono text-bone-500">·</span>
        <span className="chip-mono text-signal">{post.index}</span>
        <span className="chip-mono text-bone-500">·</span>
        <span className="chip-mono text-bone-500">{post.category}</span>
        <span className="ml-auto chip-mono text-bone-500">{post.year}</span>
      </div>

      <div className="mt-12 grid items-end gap-10 md:grid-cols-12">
        <div className="md:col-span-9">
          <ArticleTitle title={post.title} />
          <p className="mt-6 max-w-2xl font-display text-[clamp(1.125rem,2.2vw,1.75rem)] leading-snug text-bone-400">
            <em className="italic">{post.subtitle}</em>
          </p>
        </div>

        <div className="md:col-span-3">
          <dl className="space-y-3 text-sm">
            <MetaField label={clientLabel} value={post.client} />
            <MetaField label={roleLabel} value={post.role} />
            <MetaField label={yearLabel} value={post.year} />
          </dl>

          <div className="mt-4 flex flex-wrap gap-2">
            {post.url ? (
              <a
                href={post.url}
                target="_blank"
                rel="noreferrer noopener"
                data-cursor="link"
                data-cursor-label={viewSiteLabel}
                className="inline-flex items-center gap-2 rounded-full border border-rule-strong px-4 py-2 text-sm text-bone-100 transition-colors hover:border-signal"
              >
                {viewSiteLabel} ↗
              </a>
            ) : null}
            {post.github ? (
              <a
                href={post.github}
                target="_blank"
                rel="noreferrer noopener"
                data-cursor="link"
                data-cursor-label={githubLabel}
                className="inline-flex items-center gap-2 rounded-full border border-rule-strong px-4 py-2 text-sm text-bone-100 transition-colors hover:border-signal"
              >
                {githubLabel} ↗
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}

type ArticleAsideProps = {
  post: BlogPostMeta;
  stackLabel: string;
  readingTimeLabel: string;
};

export function ArticleAside({
  post,
  stackLabel,
  readingTimeLabel,
}: ArticleAsideProps) {
  return (
    <aside className="md:sticky md:top-32 md:col-span-4 md:self-start">
      <div
        data-fade
        className="rounded-2xl border border-rule bg-ink-850 p-6"
      >
        <h2 className="chip-mono mb-6 text-bone-500">{stackLabel}</h2>
        <ul className="space-y-2">
          {post.stack.map((item) => (
            <li
              key={item}
              className="flex items-center justify-between border-b border-rule-soft py-2 last:border-b-0"
            >
              <span className="font-display text-lg text-bone-100">{item}</span>
              <span aria-hidden className="text-bone-500">
                ·
              </span>
            </li>
          ))}
        </ul>
      </div>

      <ul
        data-fade
        className="mt-6 overflow-hidden rounded-2xl border border-rule"
      >
        {post.highlights.map((item) => (
          <li
            key={item.label}
            className="flex items-baseline justify-between gap-4 border-b border-rule-soft bg-ink-900 px-5 py-4 last:border-b-0"
          >
            <span className="chip-mono text-bone-500">{item.label}</span>
            <span className="font-display text-lg text-bone-100 md:text-xl">
              {item.value}
            </span>
          </li>
        ))}
      </ul>

      <p className="chip-mono mt-6 text-bone-500">
        {readingTimeLabel}
      </p>
    </aside>
  );
}

type NextPostLinkProps = {
  post: BlogPostMeta;
  label: string;
};

export function NextPostLink({ post, label }: NextPostLinkProps) {
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
          <div className="flex items-baseline justify-between gap-4 md:justify-end">
            <span className="font-mono text-sm text-bone-400">
              {post.index} · {post.year} · {post.category}
            </span>
            <span
              aria-hidden
              className="inline-block transform text-3xl text-signal transition-transform group-hover:translate-x-2"
            >
              ↗
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

function MetaField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-rule-soft pb-3">
      <dt className="chip-mono">{label}</dt>
      <dd className="text-bone-100">{value}</dd>
    </div>
  );
}

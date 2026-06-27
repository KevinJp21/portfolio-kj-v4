import { BlogPostMeta } from "@/types";
import { ArticleTitle } from "./article-title";
import { TextReveal } from "@/components";
import { Dot, MoveLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";

type ArticleHeaderProps = {
    post: BlogPostMeta;
    backLabel: string;
    clientLabel: string;
    roleLabel: string;
    yearLabel: string;
    viewSiteLabel: string;
    githubLabel: string;
};

function MetaField({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col gap-1 border-b border-rule-soft pb-3">
            <dt className="chip-mono">{label}</dt>
            <dd className="text-bone-100">{value}</dd>
        </div>
    );
}

export const ArticleHeader = ({
    post,
    backLabel,
    clientLabel,
    roleLabel,
    yearLabel,
    viewSiteLabel,
    githubLabel,
}: ArticleHeaderProps) => {
    return (
        <header className="default-container section-x">
            <div className="chip-mono flex flex-wrap items-center gap-3 border-y border-rule-soft py-4">
                <Link
                    href="/blog"
                    data-cursor="link"
                    data-cursor-label={backLabel}
                    className="text-bone-400 transition-colors hover:text-signal"
                >
                    <span className="flex flex-nowrap gap-2.5 items-center">
                        <MoveLeft className="size-3.5 stroke-2" /> /blog
                    </span>
                </Link>
                <span><Dot className="size-2.5" /></span>
                <span>{post.index}</span>
                <span><Dot className="size-2.5" /></span>
                <span>{post.category}</span>
                <span className="ml-auto">{post.year}</span>
            </div>

            <div className="mt-12 grid items-end gap-10 md:grid-cols-12">
                <div className="md:col-span-9">
                    <ArticleTitle title={post.title} />
                    <p className="mt-6 max-w-2xl font-display text-[clamp(1.125rem,2.2vw,1.75rem)] leading-snug text-bone-400">
                        <TextReveal as="span" trigger="mount">
                            {post.subtitle.split(".")[0]}
                        </TextReveal>
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

export default ArticleHeader;
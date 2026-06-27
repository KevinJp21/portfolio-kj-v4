import { TTBlogPostMeta } from "@/types";
import { Dot } from "lucide-react";

type ArticleAsideProps = {
    post: TTBlogPostMeta;
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
                            <span><Dot className="size-2.5 text-bone-500" /></span>
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

export default ArticleAside;

import { BlogPostMeta } from "@/types";
import { TBlogLabels } from "../types";
import { Link } from "@/i18n/navigation";

export const BlogMatrixView = ({ items, labels, }: { items: BlogPostMeta[]; labels: TBlogLabels["matrix"]; }) => {
    return (
        <div className="overflow-hidden rounded-2xl border border-rule">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b border-rule-soft bg-ink-850 text-[10px] uppercase tracking-widest text-bone-500">
                        <th className="px-4 py-3 font-normal">{labels.index}</th>
                        <th className="px-4 py-3 font-normal">{labels.project}</th>
                        <th className="hidden px-4 py-3 font-normal md:table-cell">
                            {labels.client}
                        </th>
                        <th className="hidden px-4 py-3 font-normal md:table-cell">
                            {labels.stack}
                        </th>
                        <th className="px-4 py-3 font-normal">{labels.year}</th>
                        <th className="px-4 py-3 text-right font-normal">{labels.open}</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((post) => (
                        <tr
                            key={post.slug}
                            className="bi-card group border-b border-rule-soft last:border-b-0 transition-colors hover:bg-ink-850/40"
                        >
                            <td className="px-4 py-4 font-mono text-xs text-bone-400">
                                {post.index}
                            </td>
                            <td className="px-4 py-4">
                                <Link
                                    href={{ pathname: "/blog/[slug]", params: { slug: post.slug } }}
                                    data-cursor="link"
                                    data-cursor-label={post.title}
                                    className="flex items-center gap-3"
                                >
                                    <span
                                        aria-hidden
                                        className="h-1.5 w-1.5 rounded-full"
                                        style={{ backgroundColor: post.accent }}
                                    />
                                    <span className="font-display text-lg text-bone-100">
                                        {post.title}
                                    </span>
                                </Link>
                            </td>
                            <td className="hidden px-4 py-4 text-sm text-bone-400 md:table-cell">
                                {post.client}
                            </td>
                            <td className="hidden px-4 py-4 text-xs text-bone-400 md:table-cell">
                                {post.stack.slice(0, 3).join(" · ")}
                            </td>
                            <td className="px-4 py-4 font-mono text-xs text-bone-400">
                                {post.year}
                            </td>
                            <td className="px-4 py-4 text-right text-bone-400 transition-colors group-hover:text-signal">
                                ↗
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BlogMatrixView;
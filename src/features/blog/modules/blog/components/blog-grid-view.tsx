import { BlogPostMeta } from "@/types";
import { Link } from "@/i18n/navigation";
import { BlogPostArtwork } from "./blog-post-artwork";

export const BlogGridView = ({ items }: { items: BlogPostMeta[] }) => {
    return (
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((post, index) => (
                <li key={post.slug} className="bi-card h-full">
                    <Link
                        href={{ pathname: "/blog/[slug]", params: { slug: post.slug } }}
                        data-cursor="cta"
                        data-cursor-label={post.title}
                        className="
                group flex h-full flex-col
                overflow-hidden rounded-2xl
                border border-rule bg-ink-850
                transition-all hover:border-rule-strong
              "
                    >
                        <BlogPostArtwork post={post} priority={index === 0} />

                        <div className="flex flex-1 flex-col p-5">
                            <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-bone-500">
                                <span>
                                    {post.index} · {post.category}
                                </span>
                                <span>{post.year}</span>
                            </div>

                            <h3 className="mt-3 line-clamp-2 font-display text-2xl leading-tight text-bone-100">
                                {post.title}
                            </h3>

                            <p className="mt-3 line-clamp-3 text-sm text-bone-400">
                                {post.subtitle}
                            </p>

                            <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                                {post.stack.slice(0, 3).map((item) => (
                                    <li
                                        key={item}
                                        className="chip-mono rounded-full border border-rule-soft px-2 py-0.5 text-bone-400"
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default BlogGridView;
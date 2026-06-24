import { BlogPostMeta } from "@/lib";
import Image from "next/image";

export const BlogPostArtwork = ({ post, priority = false, }: { post: BlogPostMeta; priority?: boolean; }) => {
    return (
        <div
            className="relative aspect-4/3 w-full overflow-hidden border-b border-rule-soft bg-ink-900"
            style={{
                background: `radial-gradient(circle at 30% 30%, ${post.accent}25, transparent 60%), radial-gradient(circle at 70% 80%, ${post.accent}18, transparent 70%), #10131a`,
            }}
        >
            <Image
                src={post.cover}
                alt={`${post.title} — ${post.subtitle}`}
                fill
                priority={priority}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 will-change-transform group-hover:scale-[1.04]"
            />
            <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink-900/85 via-ink-900/15 to-transparent"
            />
            <span
                aria-hidden
                className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-30"
                style={{ backgroundColor: post.accent }}
            />
            <span className="absolute left-3 top-3 chip-mono rounded-full border border-rule-strong bg-ink-900/70 px-2 py-1 backdrop-blur">
                {post.index} · {post.year}
            </span>
            <span
                aria-hidden
                className="absolute right-3 top-3 inline-flex h-6 w-6 items-center justify-center rounded-full border border-rule-strong bg-ink-900/70 text-bone-100 backdrop-blur"
            >
                ↗
            </span>
        </div>
    );
}

export default BlogPostArtwork;
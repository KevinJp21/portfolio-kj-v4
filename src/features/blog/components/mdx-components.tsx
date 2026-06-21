import Image from "next/image";
import dynamic from "next/dynamic";
import type { MDXComponents } from "mdx/types";
import { ScopeFrame } from "@/components";
import { cn } from "@/lib/utils";
import { GalleryImage } from "./gallery-image";
import { resolveGalleryImages, type GalleryProps } from "../lib/gallery";

const ArticleGallery = dynamic(() =>
  import("./article-gallery").then((mod) => mod.ArticleGallery),
);

function Gallery({ children, images, ...props }: GalleryProps) {
  const resolvedImages = resolveGalleryImages(images, children);

  if (resolvedImages.length === 0) return null;

  return <ArticleGallery images={resolvedImages} {...props} />;
}

Gallery.Image = GalleryImage;

type CoverImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
};

export function CoverImage({ src, alt, priority }: CoverImageProps) {
  return (
    <figure data-fade className="not-prose my-10">
      <ScopeFrame className="overflow-hidden rounded-2xl border border-rule">
        <div className="relative aspect-16/10 w-full overflow-hidden bg-ink-850">
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 1320px) 100vw, 1320px"
            className="object-cover transition-transform duration-700 will-change-transform"
          />
        </div>
      </ScopeFrame>
    </figure>
  );
}

type MetaItemProps = {
  label: string;
  value: string;
};

export function MetaItem({ label, value }: MetaItemProps) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-rule-soft pb-3 last:border-b-0 sm:last:pb-0">
      <dt className="chip-mono text-bone-500">{label}</dt>
      <dd className="text-right text-sm text-bone-100">{value}</dd>
    </div>
  );
}

type MetaGridProps = {
  children: React.ReactNode;
};

export function MetaGrid({ children }: MetaGridProps) {
  return (
    <dl
      data-fade
      className="not-prose my-8 grid gap-3 rounded-2xl border border-rule bg-ink-850/60 p-6 sm:grid-cols-2"
    >
      {children}
    </dl>
  );
}

type CalloutProps = {
  children: React.ReactNode;
};

export function Callout({ children }: CalloutProps) {
  return (
    <blockquote
      data-fade
      className={cn(
        "not-prose my-8 border-l-2 border-signal pl-6",
        "font-display text-[clamp(1.125rem,2vw,1.5rem)] italic leading-snug text-bone-200",
        "[&>p]:m-0 [&>p]:font-display [&>p]:text-[clamp(1.125rem,2vw,1.5rem)] [&>p]:italic [&>p]:leading-snug [&>p]:text-bone-200"
      )}
    >
      {children}
    </blockquote>
  );
}

export const mdxComponents: MDXComponents = {
  CoverImage,
  Gallery,
  GalleryImage,
  "Gallery.Image": GalleryImage,
  MetaGrid,
  MetaItem,
  Callout,
  h2: ({ className, ...props }) => (
    <h2
      data-fade
      className={cn(
        "mt-12 scroll-mt-32 font-display text-3xl leading-tight text-bone-100 first:mt-0 md:text-4xl",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn(
        "mt-8 font-display text-2xl leading-tight text-bone-100",
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p
      data-fade
      className={cn("text-lg leading-relaxed text-bone-300", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul
      data-fade
      className={cn("my-6 space-y-3 pl-0", className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn("my-6 space-y-3 pl-0", className)}
      {...props}
    />
  ),
  li: ({ className, ...props }) => (
    <li
      className={cn(
        "flex items-start gap-4 border-t border-rule-soft pt-3 text-base text-bone-300",
        className
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }) => (
    <a
      className={cn(
        "text-signal underline decoration-signal/40 underline-offset-4 transition-colors hover:text-bone-100",
        className
      )}
      {...props}
    />
  ),
  strong: ({ className, ...props }) => (
    <strong className={cn("font-medium text-bone-100", className)} {...props} />
  ),
  code: ({ className, ...props }) => (
    <code
      className={cn(
        "rounded bg-ink-800 px-1.5 py-0.5 font-mono text-sm text-signal",
        className
      )}
      {...props}
    />
  ),
};

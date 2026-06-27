"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScopeFrame } from "@/components";
import { TTBlogPostMeta } from "@/types";

gsap.registerPlugin(ScrollTrigger);

type ArticleCoverProps = {
  post: TTBlogPostMeta;
  children: ReactNode;
};

export function ArticleCover({ post, children }: ArticleCoverProps) {
  const coverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const coverWrap = coverRef.current;
    if (!coverWrap) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const cover = coverWrap.querySelector<HTMLElement>("[data-cover]");
    if (!cover) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cover,
        { scale: 1 },
        {
          scale: 1.3,
          ease: "none",
          scrollTrigger: {
            trigger: coverWrap,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, coverWrap);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={coverRef}
      className="section-x mx-auto mt-16 max-w-[1320px] overflow-hidden"
    >
      <ScopeFrame className="overflow-hidden rounded-3xl border border-rule">
        <div
          data-cover
          className="relative aspect-video w-full origin-center bg-ink-850 will-change-transform"
          style={{
            background: `radial-gradient(circle at 25% 25%, ${post.accent}40, transparent 55%), radial-gradient(circle at 75% 75%, ${post.accent}25, transparent 60%), #10131a`,
          }}
        >
          {children}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink-900/55 via-transparent to-ink-900/15"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-25"
            style={{ backgroundColor: post.accent }}
          />
          <svg
            viewBox="0 0 1600 900"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
            aria-hidden
          >
            <g stroke="rgba(244,239,230,0.18)" strokeWidth="0.5">
              {Array.from({ length: 25 }).map((_, i) => (
                <line key={`v${i}`} x1={i * 64} y1="0" x2={i * 64} y2="900" />
              ))}
              {Array.from({ length: 15 }).map((_, i) => (
                <line key={`h${i}`} x1="0" y1={i * 64} x2="1600" y2={i * 64} />
              ))}
            </g>
            <g
              fill="#f4efe6"
              opacity="0.85"
              fontFamily="ui-monospace, monospace"
              fontSize="14"
            >
              <text x="240" y="140">{post.slug.toUpperCase()}</text>
              <text x="1260" y="140">{`REV — ${post.year}`}</text>
            </g>
          </svg>
        </div>
      </ScopeFrame>
    </div>
  );
}

export default ArticleCover;
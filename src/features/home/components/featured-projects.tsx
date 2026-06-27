"use client";

import { Link } from "@/i18n/navigation";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { SectionHeader, ProjectCard } from "@/components";
import type { TTBlogPostMeta } from "@/lib/blog/types";

type FeaturedProjectsProps = {
  posts: TTBlogPostMeta[];
  totalPosts: number;
};

export function FeaturedProjects({ posts, totalPosts }: FeaturedProjectsProps) {
  const t = useTranslations("HomePage.featured");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const reduceMotion = Boolean(context.conditions?.reduceMotion);
        const duration = reduceMotion ? 0 : 0.85;
        const ease = "power3.out";

        const ctx = gsap.context(() => {
          gsap.fromTo(
            ".fp-intro > *",
            { y: 40, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration,
              ease,
              stagger: reduceMotion ? 0 : 0.1,
              scrollTrigger: {
                trigger: ".fp-intro",
                start: "top 82%",
                once: true,
              },
            }
          );

          gsap.utils.toArray<HTMLElement>(".project-card").forEach((card, i) => {
            const image = card.querySelector<HTMLElement>(".project-card-image");
            const accent = card.querySelector<HTMLElement>(".project-card-accent");
            const meta = card.querySelectorAll<HTMLElement>(".project-card-meta > *");
            const body = card.querySelectorAll<HTMLElement>(".project-card-body > *");

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                once: true,
              },
            });

            if (accent) {
              tl.fromTo(
                accent,
                { scaleX: 0 },
                { scaleX: 1, duration: reduceMotion ? 0 : 0.7, ease: "power2.out" },
                0
              );
            }

            if (image) {
              tl.fromTo(
                image,
                { scale: 1.14, autoAlpha: 0 },
                { scale: 1, autoAlpha: 1, duration, ease },
                reduceMotion ? 0 : 0.05
              );
            }

            tl.fromTo(
              meta,
              { y: 24, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: reduceMotion ? 0 : 0.65,
                ease,
                stagger: reduceMotion ? 0 : 0.06,
              },
              reduceMotion ? 0 : 0.12
            ).fromTo(
              body,
              { y: 28, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: reduceMotion ? 0 : 0.65,
                ease,
                stagger: reduceMotion ? 0 : 0.07,
              },
              reduceMotion ? 0 : 0.2
            );

            if (reduceMotion) return;

            const imageInner = card.querySelector<HTMLElement>(".project-card-image-inner");
            const arrow = card.querySelector<HTMLElement>(".project-card-arrow");
            let xTo: gsap.QuickToFunc | null = null;
            let yTo: gsap.QuickToFunc | null = null;

            if (imageInner) {
              xTo = gsap.quickTo(imageInner, "x", { duration: 0.45, ease: "power3" });
              yTo = gsap.quickTo(imageInner, "y", { duration: 0.45, ease: "power3" });
            }

            const onEnter = () => {
              gsap.to(imageInner, { scale: 1.06, duration: 0.7, ease: "power3.out" });
              gsap.to(arrow, { x: 4, y: -4, duration: 0.45, ease: "power3.out" });
            };

            const onLeave = () => {
              gsap.to(imageInner, { scale: 1, x: 0, y: 0, duration: 0.7, ease: "power3.out" });
              gsap.to(arrow, { x: 0, y: 0, duration: 0.45, ease: "power3.out" });
            };

            const onMove = (e: MouseEvent) => {
              if (!xTo || !yTo) return;
              const rect = card.getBoundingClientRect();
              const relX = (e.clientX - rect.left) / rect.width - 0.5;
              const relY = (e.clientY - rect.top) / rect.height - 0.5;
              xTo(relX * 18);
              yTo(relY * 12);
            };

            card.addEventListener("mouseenter", onEnter);
            card.addEventListener("mouseleave", onLeave);
            card.addEventListener("mousemove", onMove);

            const indexLink = sectionRef.current?.querySelector<HTMLElement>(
              `.fp-index-item[data-index="${i}"]`
            );

            ScrollTrigger.create({
              trigger: card,
              start: "top 55%",
              end: "bottom 45%",
              onToggle: (self) => {
                if (!indexLink) return;
                gsap.to(indexLink, {
                  autoAlpha: self.isActive ? 1 : 0.35,
                  x: self.isActive ? 6 : 0,
                  color: self.isActive
                    ? "var(--color-bone-100)"
                    : "var(--color-bone-500)",
                  duration: 0.35,
                  ease: "power2.out",
                });
                gsap.to(indexLink.querySelector(".fp-index-dot"), {
                  scale: self.isActive ? 1 : 0,
                  autoAlpha: self.isActive ? 1 : 0,
                  duration: 0.35,
                  ease: "back.out(1.4)",
                });
              },
            });
          });
        }, sectionRef);

        return () => ctx.revert();
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section section-x">
      <div className="default-container">
        <SectionHeader code={t("code")} eyebrow={t("eyebrow")} />

        <div className="mt-14 grid gap-16 lg:grid-cols-12 lg:gap-10">
          <aside className="fp-intro lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
            <h2 className="font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.02] text-bone-100">
              {t("titleLead")}
              <br />
              <em className="italic text-signal">{t("titleAccent")}</em>
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-bone-400">
              {t("description")}
            </p>

            <nav
              aria-label={t("indexNavLabel")}
              className="mt-10 hidden flex-col gap-1 border-t border-rule-soft pt-8 lg:flex"
            >
              {posts.map((post, i) => (
                <a
                  key={post.slug}
                  href={`#project-${post.slug}`}
                  data-index={i}
                  className="fp-index-item group inline-flex items-center gap-3 py-2 font-mono text-xs uppercase tracking-[0.2em] text-bone-500 transition-colors hover:text-bone-100"
                >
                  <span
                    className="fp-index-dot h-1.5 w-1.5 rounded-full bg-signal"
                    style={{ transform: "scale(0)" }}
                    aria-hidden
                  />
                  <span>{post.index}</span>
                  <span className="h-px w-6 bg-rule-soft transition-all group-hover:w-10 group-hover:bg-signal" />
                  <span className="truncate normal-case tracking-normal text-bone-400">
                    {post.title}
                  </span>
                </a>
              ))}
            </nav>

            <Link
              href="/blog"
              data-cursor="link"
              data-cursor-label={t("viewIndexCursor")}
              className="fp-cta mt-10 inline-flex items-center gap-3 rounded-full border border-rule-strong px-5 py-3 text-sm text-bone-100 transition-colors hover:border-signal"
            >
              {t("viewAll")}
              <span className="font-mono text-xs text-bone-400">
                /blog · {totalPosts}
              </span>
            </Link>
          </aside>

          <ul className="flex flex-col gap-10 lg:col-span-8 lg:gap-14">
            {posts.map((post, i) => (
              <ProjectCard
                key={post.slug}
                project={post}
                index={i}
                ctaLabel={t("readArticle")}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

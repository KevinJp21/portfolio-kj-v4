"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { SectionHeader, TextReveal } from "@/components";
import { BlogCategoryFilterId } from "@/types";
import { BLOG_CATEGORY_FILTERS } from "@/const";
import { cn } from "@/lib";
import { TBlogViewProps, TBlogView } from "../types";
import { BlogViewSwitch, BlogGridView, BlogListView, BlogMatrixView } from "../components";

export const BlogTemplate = ({ posts, labels }: TBlogViewProps) => {
    const t = useTranslations("BlogPage.index");
    const [filter, setFilter] = useState<BlogCategoryFilterId>("All");
    const [view, setView] = useState<TBlogView>("grid");
    const ref = useRef<HTMLElement>(null);
  
    const filtered = useMemo(
      () =>
        filter === "All"
          ? posts
          : posts.filter((post) => post.categoryKey === filter),
      [filter, posts]
    );
  
    const eyebrow = t("eyebrow", {
      filtered: filtered.length,
      total: posts.length,
    });
  
    useEffect(() => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;
  
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".bi-card",
          { y: 40, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.06,
          }
        );
      }, ref);
  
      return () => ctx.revert();
    }, [filter, view]);
  
    return (
      <section ref={ref} className="section section-x pt-40 pb-32">
        <div className="mx-auto max-w-[1320px]">
          <SectionHeader code={labels.code} eyebrow={eyebrow} />
  
          <div className="mt-10 grid items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-8">
              <h1 className="font-display text-[clamp(3rem,9vw,9rem)] leading-[0.85] text-bone-100 italic">
                <TextReveal as="span" trigger="mount">
                  {labels.titleLead}
                </TextReveal>
  
                {" "}
  
                <TextReveal
                  as="span"
                  trigger="mount"
                  className="text-signal"
                >
                  {labels.titleAccent}
                </TextReveal>
              </h1>
              <TextReveal as="p" trigger="mount" className="mt-6 max-w-xl text-base text-bone-300">
                {labels.description}
              </TextReveal>
            </div>
            <div className="md:col-span-4">
              <BlogViewSwitch
                view={view}
                onChange={setView}
                labels={labels.views}
              />
            </div>
          </div>
  
          <div className="mt-12 flex flex-wrap items-center gap-2 border-y border-rule-soft py-4">
            <span className="chip-mono mr-2 text-bone-500">
              {labels.filterLabel}
            </span>
            {BLOG_CATEGORY_FILTERS.map((id) => {
              const active = id === filter;
              const count =
                id === "All"
                  ? posts.length
                  : posts.filter((post) => post.categoryKey === id).length;
  
              return (
                <button
                  key={id}
                  type="button"
                  data-cursor="link"
                  data-cursor-label={labels.filters[id]}
                  onClick={() => setFilter(id)}
                  className={cn(
                    "group flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors",
                    active
                      ? "border-signal bg-signal/10 text-bone-100"
                      : "border-rule text-bone-400 hover:border-rule-strong hover:text-bone-100"
                  )}
                >
                  <span>{labels.filters[id]}</span>
                  <span className="font-mono text-[10px] text-bone-500">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
  
          <div className="mt-12">
            {view === "grid" ? <BlogGridView items={filtered} /> : null}
            {view === "list" ? <BlogListView items={filtered} /> : null}
            {view === "matrix" ? (
              <BlogMatrixView items={filtered} labels={labels.matrix} />
            ) : null}
          </div>
        </div>
      </section>
    );
  }
  
export default BlogTemplate;
"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { Link } from "@/i18n/navigation";
import { SectionHeader, TextReveal } from "@/components";
import { cn } from "@/lib/utils";
import type { BlogPostMeta } from "@/lib/blog/types";
import {
  BLOG_CATEGORY_FILTERS,
  type BlogCategoryFilterId,
} from "@/lib/blog/categories";

type View = "grid" | "list" | "matrix";

type BlogIndexLabels = {
  code: string;
  titleLead: string;
  titleAccent: string;
  description: string;
  filterLabel: string;
  filters: Record<BlogCategoryFilterId, string>;
  views: Record<View, string>;
  matrix: {
    index: string;
    project: string;
    client: string;
    stack: string;
    year: string;
    open: string;
  };
};

type BlogIndexViewProps = {
  posts: BlogPostMeta[];
  labels: BlogIndexLabels;
};

export function BlogIndexView({ posts, labels }: BlogIndexViewProps) {
  const t = useTranslations("BlogPage.index");
  const [filter, setFilter] = useState<BlogCategoryFilterId>("All");
  const [view, setView] = useState<View>("grid");
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
            <ViewSwitch
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
          {view === "grid" ? <GridView items={filtered} /> : null}
          {view === "list" ? <ListView items={filtered} /> : null}
          {view === "matrix" ? (
            <MatrixView items={filtered} labels={labels.matrix} />
          ) : null}
        </div>
      </div>
    </section>
  );
}

function ViewSwitch({
  view,
  onChange,
  labels,
}: {
  view: View;
  onChange: (v: View) => void;
  labels: Record<View, string>;
}) {
  const views: { id: View; label: string; icon: React.ReactNode }[] = [
    { id: "grid", label: labels.grid, icon: <GridIcon /> },
    { id: "list", label: labels.list, icon: <ListIcon /> },
    { id: "matrix", label: labels.matrix, icon: <MatrixIcon /> },
  ];

  return (
    <div className="inline-flex items-center gap-px overflow-hidden rounded-full border border-rule bg-ink-850 p-1 md:justify-self-end">
      {views.map((v) => (
        <button
          key={v.id}
          type="button"
          data-cursor="link"
          data-cursor-label={v.label}
          onClick={() => onChange(v.id)}
          className={cn(
            "flex items-center gap-2 rounded-full px-3 py-2 text-xs transition-colors",
            view === v.id
              ? "bg-bone-100 text-ink-900"
              : "text-bone-400 hover:text-bone-100"
          )}
        >
          {v.icon}
          <span>{v.label}</span>
        </button>
      ))}
    </div>
  );
}

function GridView({ items }: { items: BlogPostMeta[] }) {
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
            <PostArtwork post={post} priority={index === 0} />

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

function ListView({ items }: { items: BlogPostMeta[] }) {
  return (
    <ul className="divide-y divide-rule-soft border-y border-rule-soft">
      {items.map((post) => (
        <li key={post.slug} className="bi-card">
          <Link
            href={{ pathname: "/blog/[slug]", params: { slug: post.slug } }}
            data-cursor="cta"
            data-cursor-label={post.title}
            className="group grid grid-cols-12 items-center gap-4 py-6 transition-colors hover:bg-ink-850/40"
          >
            <span className="col-span-1 font-mono text-xs text-bone-400">
              {post.index}
            </span>
            <h3 className="col-span-11 font-display text-[clamp(1.75rem,4.5vw,3.5rem)] leading-tight text-bone-100 transition-all group-hover:translate-x-2 md:col-span-5">
              {post.title}
            </h3>
            <span className="hidden text-sm text-bone-400 md:col-span-3 md:block">
              {post.subtitle}
            </span>
            <span className="hidden font-mono text-xs uppercase tracking-widest text-bone-500 md:col-span-2 md:block">
              {post.category}
            </span>
            <span className="hidden text-right text-bone-400 transition-colors group-hover:text-signal md:col-span-1 md:block">
              ↗
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function MatrixView({
  items,
  labels,
}: {
  items: BlogPostMeta[];
  labels: BlogIndexLabels["matrix"];
}) {
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

function PostArtwork({
  post,
  priority = false,
}: {
  post: BlogPostMeta;
  priority?: boolean;
}) {
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

function GridIcon() {
  return (
    <svg viewBox="0 0 14 14" className="h-3 w-3" fill="currentColor" aria-hidden>
      <rect x="0" y="0" width="6" height="6" />
      <rect x="8" y="0" width="6" height="6" />
      <rect x="0" y="8" width="6" height="6" />
      <rect x="8" y="8" width="6" height="6" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg viewBox="0 0 14 14" className="h-3 w-3" fill="currentColor" aria-hidden>
      <rect x="0" y="1" width="14" height="2" />
      <rect x="0" y="6" width="14" height="2" />
      <rect x="0" y="11" width="14" height="2" />
    </svg>
  );
}

function MatrixIcon() {
  return (
    <svg
      viewBox="0 0 14 14"
      className="h-3 w-3"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden
    >
      <rect x="0.5" y="0.5" width="13" height="13" />
      <line x1="0" y1="4.5" x2="14" y2="4.5" />
      <line x1="0" y1="9" x2="14" y2="9" />
      <line x1="4.5" y1="0" x2="4.5" y2="14" />
    </svg>
  );
}

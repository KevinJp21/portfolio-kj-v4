"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { stackItems } from "@/const/stack";
import type { TStackCategoryKey, TStackLevel } from "@/types";
import { SectionHeader } from "@/components";
import { cn } from "@/lib/utils";

const levelDotClass: Record<TStackLevel, string> = {
  daily: "bg-signal shadow-[0_0_12px_color-mix(in_srgb,var(--signal)_70%,transparent)]",
  project: "border border-bone-500 bg-transparent",
  learning: "bg-bone-300",
};

const levelTextClass: Record<TStackLevel, string> = {
  daily: "text-signal",
  project: "text-bone-500",
  learning: "text-bone-300",
};

export function StackOrbital() {
  const t = useTranslations("HomePage.stack");
  const ref = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const skipRowAnimation = useRef(true);
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState<string | null>(null);

  const levelLabel = (level: TStackLevel) => t(`levels.${level}`);
  const categoryLabel = (key: TStackCategoryKey) => t(`categories.${key}`);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const intro = introRef.current;
      const panel = panelRef.current;

      if (intro) {
        gsap.fromTo(
          Array.from(intro.children),
          { y: 40, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: intro,
              start: "top 82%",
              once: true,
            },
          }
        );
      }

      if (!panel) return;

      gsap.fromTo(
        panel,
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panel,
            start: "top 88%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        gsap.utils.toArray<HTMLElement>(".stack-item"),
        { y: 24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.65,
          ease: "power3.out",
          stagger: 0.05,
          scrollTrigger: {
            trigger: panel,
            start: "top 88%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        gsap.utils.toArray<HTMLElement>(".stack-row"),
        { y: 20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.55,
          ease: "power3.out",
          stagger: 0.035,
          scrollTrigger: {
            trigger: panel,
            start: "top 88%",
            once: true,
          },
        }
      );
    }, ref);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (skipRowAnimation.current) {
      skipRowAnimation.current = false;
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        gsap.utils.toArray<HTMLElement>(".stack-row"),
        { y: 16, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.45,
          ease: "power3.out",
          stagger: 0.03,
        }
      );
    }, panelRef);

    return () => ctx.revert();
  }, [active]);

  const current = stackItems[active];
  const currentCategory = categoryLabel(current.categoryKey);

  return (
    <section ref={ref} className="section section-x">
      <div className="default-container">
        <SectionHeader code={t("code")} eyebrow={t("eyebrow")} />

        <div
          ref={introRef}
          className="stack-intro mt-12 grid items-end justify-between gap-6 md:grid-cols-2"
        >
          <h2 className="font-display text-[clamp(2.25rem,6vw,5rem)] leading-[0.95] text-bone-100">
            {t("titleLead")}{" "}
            <em className="italic text-signal">{t("titleAccent")}</em>
            <br />
            {t("titleLine2")}
          </h2>
          <p className="text-sm leading-relaxed text-bone-400 md:max-w-sm md:justify-self-end">
            {t("description")}
          </p>
        </div>

        <div
          ref={panelRef}
          className="stack-panel mt-14 grid gap-px overflow-hidden rounded-2xl border border-rule bg-rule md:grid-cols-[260px_1fr]"
        >
          <ul className="flex flex-col bg-ink-900 md:py-4">
            {stackItems.map((s, i) => (
              <li key={s.categoryKey}>
                <button
                  type="button"
                  data-cursor="link"
                  data-cursor-label={categoryLabel(s.categoryKey)}
                  onClick={() => setActive(i)}
                  className={cn(
                    "stack-item group flex w-full items-center justify-between border-l-2 px-6 py-4 text-left transition-colors",
                    active === i
                      ? "border-signal bg-ink-850 text-bone-100"
                      : "border-transparent text-bone-400 hover:text-bone-100"
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span className="chip-mono">
                      {String(i).padStart(2, "0")}
                    </span>
                    <span className="font-display text-lg">
                      {categoryLabel(s.categoryKey)}
                    </span>
                  </span>
                  <span className="font-mono text-xs text-bone-500">
                    {s.items.length}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="relative bg-ink-900 p-6 md:p-10">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <p className="chip-mono text-bone-500">
                {t("toolsCount", {
                  category: currentCategory,
                  count: current.items.length,
                })}
              </p>
              <ul className="flex items-center gap-4 text-[10px] uppercase tracking-[0.18em] text-bone-500">
                {(["daily", "project", "learning"] as TStackLevel[]).map((lvl) => (
                  <li key={lvl} className="flex items-center gap-1.5">
                    <span className={cn("h-1.5 w-1.5 rounded-full", levelDotClass[lvl])} />
                    <span>{levelLabel(lvl)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <ul className="grid gap-1">
              {current.items.map((tool) => (
                <li
                  key={tool.name}
                  onMouseEnter={() => setHover(tool.name)}
                  onMouseLeave={() => setHover(null)}
                  data-cursor="link"
                  data-cursor-label={levelLabel(tool.level)}
                  className="stack-row group flex items-baseline justify-between gap-6 border-b border-rule-soft py-3"
                >
                  <span
                    className={cn(
                      "font-display text-lg transition-colors md:text-xl",
                      hover === tool.name ? "italic text-signal" : "text-bone-100"
                    )}
                  >
                    {tool.name}
                  </span>
                  <span className="flex items-center gap-2.5">
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full transition-transform",
                        levelDotClass[tool.level],
                        hover === tool.name && "scale-150"
                      )}
                    />
                    <span
                      className={cn(
                        "text-[10px] uppercase tracking-[0.18em] transition-colors",
                        levelTextClass[tool.level]
                      )}
                    >
                      {levelLabel(tool.level)}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

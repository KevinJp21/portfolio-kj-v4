"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components";

type AboutStat = {
  value: string;
  suffix?: string;
  label: string;
};

export function AboutBlock() {
  const t = useTranslations("HomePage.about");
  const stats = t.raw("stats") as AboutStat[];
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".about-line").forEach((line, i) => {
        gsap.fromTo(
          line,
          { yPercent: 110, autoAlpha: 0 },
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 1,
            ease: "power4.out",
            delay: i * 0.08,
            scrollTrigger: {
              trigger: line.parentElement,
              start: "top 75%",
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".about-stat").forEach((stat) => {
        const target = stat.querySelector<HTMLSpanElement>("[data-count]");
        if (!target) return;
        const raw = stat.dataset.value ?? "0";
        const value = parseInt(raw, 10);
        const padLength = raw.length;
        ScrollTrigger.create({
          trigger: stat,
          start: "top 85%",
          once: true,
          onEnter: () => {
            const obj = { v: 0 };
            gsap.to(obj, {
              v: value,
              duration: 1.6,
              ease: "power2.out",
              onUpdate: () => {
                target.textContent = String(Math.round(obj.v)).padStart(
                  padLength,
                  "0"
                );
              },
            });
          },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="section section-x">
      <div className="default-container">
        <SectionHeader code={t("code")} eyebrow={t("eyebrow")} />

        <div className="mt-12 grid items-start gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="font-display text-[clamp(2rem,4.6vw,4rem)] leading-[1.05] text-bone-100">
              <span className="block">
                <span className="about-line block">
                  {t("headline.line1")}{" "}
                  <em className="italic text-signal">{t("headline.line1Accent")}</em>
                </span>
              </span>
              <span className="block">
                <span className="about-line block">{t("headline.line2")}</span>
              </span>
              <span className="block">
                <span className="about-line block">{t("headline.line3")}</span>
              </span>
              <span className="block">
                <span className="about-line block italic text-bone-400">
                  {t("headline.line4")}
                </span>
              </span>
            </p>
            <p className="mt-10 max-w-xl text-base leading-relaxed text-bone-300">
              {t("body")}
            </p>
          </div>

          <div className="md:col-span-5">
            <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-rule bg-rule">
              {stats.map((s) => (
                <li
                  key={s.label}
                  data-value={s.value.replace(/\D/g, "")}
                  className="about-stat group relative bg-ink-900 p-6 transition-colors hover:bg-ink-850"
                >
                  <span className="chip-mono text-bone-500">{s.label}</span>
                  <p className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] leading-none text-bone-100">
                    <span data-count>0</span>
                    {s.suffix ? (
                      <span className="text-signal">{s.suffix}</span>
                    ) : null}
                  </p>
                  <span
                    aria-hidden
                    className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full bg-rule-strong transition-colors group-hover:bg-signal"
                  />
                </li>
              ))}
            </ul>

            <Link
              href="/about"
              data-cursor="link"
              data-cursor-label={t("link.cursor")}
              className="group mt-8 inline-flex items-center gap-3 text-sm text-bone-100"
            >
              <span className="inline-block h-px w-8 bg-bone-400 transition-all group-hover:w-16 group-hover:bg-signal" />
              {t("link.text")}
              <span className="font-mono text-xs uppercase tracking-widest text-bone-400 group-hover:text-signal">
                /about
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

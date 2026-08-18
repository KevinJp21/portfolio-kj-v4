"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components";

type AboutSnapshot = {
  label: string;
  value: string;
};

export function AboutBlock() {
  const t = useTranslations("HomePage.about");
  const snapshot = t.raw("snapshot") as AboutSnapshot[];
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

      gsap.fromTo(
        ".about-snapshot > *",
        { y: 20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.07,
          scrollTrigger: {
            trigger: ".about-snapshot",
            start: "top 85%",
          },
        }
      );
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

          <div className="about-snapshot md:col-span-5">
            <ul>
              {snapshot.map((item) => (
                <li
                  key={item.label}
                  className="flex items-baseline justify-between gap-4 border-b border-rule-soft py-3 text-sm first:border-t"
                >
                  <span className="chip-mono text-bone-500">{item.label}</span>
                  <span className="text-right text-bone-100">{item.value}</span>
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

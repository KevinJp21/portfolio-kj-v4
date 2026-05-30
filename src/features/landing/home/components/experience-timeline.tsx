"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { experience } from "@/lib/data";
import { SectionHeader } from "@/components";

export function ExperienceTimeline() {
  const ref = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".exp-item");

      items.forEach((item) => {
        const number = item.querySelector<HTMLElement>(".exp-number");
        const content = item.querySelector<HTMLElement>(".exp-content");
        const meta = item.querySelector<HTMLElement>(".exp-meta");

        gsap.fromTo(
          [number, meta, content],
          { y: 30, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.06,
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
            },
          }
        );
      });

      if (railRef.current) {
        gsap.fromTo(
          railRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top center",
              end: "bottom bottom",
              scrub: 0.4,
            },
          }
        );
      }
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="section section-x">
      <div className="default-container">
        <SectionHeader code="C/02" eyebrow="Experiencia — colaboraciones recientes" />

        <div className="mt-12 grid items-start gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] text-bone-100">
              Experiencia reciente
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-bone-400">
              Roles, stack y contexto de cada proyecto. Ordenados de lo más
              reciente al anterior.
            </p>
          </div>

          <ol className="relative md:col-span-8">
            <span
              aria-hidden
              className="absolute left-[14px] top-2 bottom-2 w-px overflow-hidden bg-rule-soft md:left-[18px]"
            >
              <span
                ref={railRef}
                className="block h-full origin-top bg-linear-to-b from-signal via-iris to-filament"
              />
            </span>

            {experience.map((item, i) => (
              <li
                key={`${item.company}-${i}`}
                className="exp-item relative mb-12 last:mb-0 pl-12 md:pl-16"
              >
                <span
                  aria-hidden
                  className={`absolute left-0 top-2 inline-flex h-[30px] w-[30px] items-center justify-center rounded-full border bg-ink-900 md:h-[38px] md:w-[38px] ${
                    item.current ? "border-signal" : "border-rule-strong"
                  }`}
                >
                  {item.current ? (
                    <>
                      <span className="absolute h-2 w-2 animate-ping rounded-full bg-signal opacity-75" />
                      <span className="relative h-2 w-2 rounded-full bg-signal shadow-[0_0_10px_color-mix(in_srgb,var(--signal)_70%,transparent)]" />
                    </>
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-signal" />
                  )}
                </span>

                <div className="exp-meta mb-2 flex flex-wrap items-center gap-3">
                  <span className="chip-mono text-signal">{item.period}</span>
                  {item.current && (
                    <span className="chip-mono inline-flex items-center gap-1.5 rounded-full border border-signal/40 bg-signal/5 px-2 py-0.5 text-signal">
                      <span className="h-1 w-1 rounded-full bg-signal" />
                      Actual
                    </span>
                  )}
                  <span className="chip-mono text-bone-500">·</span>
                  <span className="chip-mono text-bone-500">{item.location}</span>
                </div>

                <div className="exp-number mb-3 flex items-end justify-between gap-6 border-b border-rule-soft pb-3">
                  <h3 className="font-display text-[clamp(1.5rem,3vw,2.5rem)] leading-tight text-bone-100">
                    {item.role}
                    <span className="block text-bone-400">@ {item.company}</span>
                  </h3>
                  <span className="font-mono text-xl text-bone-500 md:text-3xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="exp-content">
                  <p className="max-w-xl text-sm leading-relaxed text-bone-300">
                    {item.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {item.stack.map((s) => (
                      <li
                        key={s}
                        className="chip-mono rounded-full border border-rule px-3 py-1 text-bone-300"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

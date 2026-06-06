"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "@/i18n/navigation";
import { SectionHeader } from "@/components";

const stats: { value: string; suffix?: string; label: string }[] = [
  { value: "04", label: "Proyectos en portfolio" },
  { value: "3", suffix: "+", label: "Años desarrollando" },
  { value: "16", suffix: "+", label: "Tecnologías" },
  { value: "100", suffix: "%", label: "Hecho desde cero" },
];

export function AboutBlock() {
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
        <SectionHeader code="C/01" eyebrow="Manifesto" />

        <div className="mt-12 grid items-start gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="font-display text-[clamp(2rem,4.6vw,4rem)] leading-[1.05] text-bone-100">
              <span className="block">
                <span className="about-line block">
                  Construyo aplicaciones{" "}
                  <em className="italic text-signal">web</em>
                </span>
              </span>
              <span className="block">
                <span className="about-line block">
                  con React, Next.js y Tailwind,
                </span>
              </span>
              <span className="block">
                <span className="about-line block">
                  desde la interfaz hasta
                </span>
              </span>
              <span className="block">
                <span className="about-line block italic text-bone-400">
                  el backend que la sostiene.
                </span>
              </span>
            </p>
            <p className="mt-10 max-w-xl text-base leading-relaxed text-bone-300">
            Soy ingeniero de sistemas y desarrollador frontend con enfoque full-stack. Trabajo en aplicaciones reales integrando APIs, autenticación, manejo de estado, validaciones y experiencias enfocadas en rendimiento, escalabilidad y usabilidad.
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
              data-cursor-label="Saber más"
              className="group mt-8 inline-flex items-center gap-3 text-sm text-bone-100"
            >
              <span className="inline-block h-px w-8 bg-bone-400 transition-all group-hover:w-16 group-hover:bg-signal" />
              Lee la historia completa
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

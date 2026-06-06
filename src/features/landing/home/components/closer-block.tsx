"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MoveRight } from "lucide-react";
import { SectionHeader } from "@/components";

export function CloserBlock() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".closer-line",
        { yPercent: 110, autoAlpha: 0 },
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 1,
          ease: "power4.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ref.current, start: "top 75%" },
        }
      );
      gsap.fromTo(
        ".closer-meta",
        { y: 24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ref.current, start: "top 70%" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="section section-x">
      <div className="mx-auto max-w-[1320px]">
        <div className="mt-24 grid items-end gap-12 md:grid-cols-12">
          <div className="md:col-span-8">
            <SectionHeader code="C/07" eyebrow="Let's build" />
            <h2 className="mt-10 font-display text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.9] text-bone-100">
              <span className="block overflow-hidden">
                <span className="closer-line block">
                  ¿Un proyecto en
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="closer-line block italic text-signal">
                  mente?
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="closer-line block text-bone-400">
                  Construyámoslo juntos.
                </span>
              </span>
            </h2>
          </div>

          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="closer-meta glass rounded-2xl p-6">
              <div className="flex items-center gap-3 border-b border-rule-soft pb-4">
                <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-signal" />
                <span className="chip-mono text-bone-200">
                  Disponible para nuevos proyectos
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-bone-400">
                Frontend, full-stack o e-commerce. Si tienes una idea
                concreta o necesitas un par de manos extra, conversemos.
              </p>
            </div>

            <Link
              href="/contact"
              data-cursor="cta"
              data-cursor-label="Hablar"
              className="closer-meta group relative inline-flex items-center justify-between gap-3 overflow-hidden rounded-full bg-bone-100 px-6 py-4 text-base font-medium text-ink-900 transition-transform hover:scale-[1.02]"
            >
              <span className="z-10 transition-transform duration-300 group-hover:translate-x-0.5">Empieza una conversación</span>
              <span aria-hidden className="text-base z-10 transition-transform duration-300 group-hover:translate-x-0.5"><MoveRight size={14} /></span>
              <span className="absolute inset-y-0 left-0 z-0 w-0 bg-signal transition-[width] duration-500 group-hover:w-full" />
            </Link>

            <Link
              href="mailto:kevinjp821@gmail.com"
              data-cursor="link"
              data-cursor-label="Email"
              className="closer-meta group flex items-center justify-between rounded-full border border-rule-strong px-6 py-4 text-sm text-bone-100 transition-colors hover:border-signal"
            >
              <span>kevinjp821@gmail.com</span>
              <span className="font-mono text-xs uppercase tracking-widest text-bone-400 group-hover:text-signal">
                .email
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

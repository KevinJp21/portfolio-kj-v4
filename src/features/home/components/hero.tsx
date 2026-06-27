"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { TextReveal, Marquee } from "@/components";
import { AVATAR_URL } from "@/const/avatar";
import { MoveRight } from "lucide-react";
import { useTranslations } from "next-intl";

export function Hero() {
    const heroRef = useRef<HTMLElement>(null);
    const orbRef = useRef<HTMLDivElement>(null);
    const chipRef = useRef<HTMLDivElement>(null);
    const t = useTranslations("HomePage.hero");
    const marqueeItems = t.raw("marquee.items") as string[];
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(
                chipRef.current,
                { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.3 }
            );

            gsap.to(
                ".hero-meta",
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.9,
                    ease: "power3.out",
                    stagger: 0.08,
                    delay: 0.7,
                }
            );

            gsap.to(orbRef.current, {
                yPercent: -18,
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });

            gsap.to(".hero-display", {
                yPercent: -8,
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });


        }, heroRef);

        return () => ctx.revert();
    }, []);

    const getYear = () => {
        return new Date().getFullYear();
    }

    return (
        <section
            ref={heroRef}
            className="relative isolate flex min-h-svh flex-col pt-24 md:pt-28"
        >
            <div className="section-x relative default-container flex w-full flex-1 flex-col gap-6 md:gap-8">
                <div
                    ref={chipRef}
                    className="flex flex-wrap items-center gap-3 text-xs opacity-0 translate-y-6"
                >
                    <span className="flex items-center gap-2 rounded-full border border-rule px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-bone-400 h-[29px]">
                        <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-signal" />
                        {t("availability", { year: getYear() })}
                    </span>
                </div>

                <div className="flex flex-1 justify-center w-full flex-col gap-6 md:gap-8">
                    <div className="relative grid items-center gap-8 md:grid-cols-12 md:gap-12">
                        <div className="md:col-span-7">
                            <h1 className="hero-display font-display text-[clamp(2rem,6.4vw,6rem)] leading-[0.92] tracking-tight text-bone-100">
                                <span className="block overflow-hidden">
                                    <TextReveal as="span" trigger="mount" delay={0.4} className="block">
                                        {t("headline.line1")}
                                    </TextReveal>
                                </span>
                                <span className="block italic overflow-hidden text-signal-deep">
                                    <TextReveal as="span" trigger="mount" delay={0.65} className="block">
                                        {t("headline.line2")}
                                    </TextReveal>
                                </span>
                                <span className="block overflow-hidden">
                                    <TextReveal
                                        as="span"
                                        trigger="mount"
                                        delay={0.9}
                                        className="block"
                                    >
                                        {t("headline.line3")}
                                    </TextReveal>
                                </span>
                            </h1>
                        </div>

                        <div className="md:col-span-5 md:justify-self-end">
                            <div
                                ref={orbRef}
                                className="relative mx-auto aspect-square w-[clamp(200px,32vw,360px)] min-[400px]:w-[clamp(320px,70vw,360px)] md:w-[clamp(200px,32vw,360px)] md:mx-0"
                            >
                                <div
                                    aria-hidden
                                    className="absolute -inset-6 rounded-full bg-linear-to-br from-signal/30 via-iris/30 to-filament/20 blur-3xl"
                                />
                                <div className="relative aspect-square overflow-hidden rounded-full border border-rule-strong bg-ink-850">
                                    <Avatar />
                                    <span
                                        aria-hidden
                                        className="pointer-events-none absolute inset-0 rounded-full border border-bone-100/10"
                                    />
                                    <span
                                        aria-hidden
                                        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-linear-to-b from-bone-100/15 to-transparent"
                                    />
                                </div>
                                <span className="chip-mono absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                                    {t("avatar.caption")}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="grid items-end gap-6 mt-4 md:grid-cols-12 md:gap-10">
                        <p className="hero-meta md:col-span-5 max-w-md text-sm leading-relaxed text-bone-300 md:text-[15px] opacity-0 translate-y-[18px]">
                            <span className="font-display italic text-bone-100">
                                Kevin Julio Pineda.
                            </span>{" "}{t("bio.body")}
                        </p>

                        <div className="hero-meta md:col-span-4 space-y-2 opacity-0 translate-y-[18px]">
                            <Row label={t("meta.focus.label")} value={t("meta.focus.value")} />
                            <Row label={t("meta.backend.label")} value={t("meta.backend.value")} />
                            <Row label={t("meta.status.label")} value={t("meta.status.value", { year: getYear() })} />
                        </div>

                        <div className="hero-meta md:col-span-3 flex flex-col gap-2.5 opacity-0 translate-y-[18px]">
                            <Link
                                href="/contact"
                                data-cursor="cta"
                                data-cursor-label={t("cursor.startProject")}
                                className="group relative inline-flex items-center justify-between gap-3 overflow-hidden rounded-full bg-bone-100 px-5 py-3 text-sm font-medium text-ink-900 transition-transform hover:scale-[1.02]"
                            >
                                <span className="z-10 transition-transform duration-300 group-hover:translate-x-0.5">{t("actions.startProject")}</span>
                                <span aria-hidden className="text-base z-10 transition-transform duration-300 group-hover:translate-x-0.5"><MoveRight size={14} /></span>
                                <span className="absolute inset-y-0 left-0 z-0 w-0 bg-signal transition-[width] duration-500 group-hover:w-full" />
                            </Link>
                            <a
                                href="/assets/docs/kevin-julio-cv.pdf"
                                target="_blank"
                                data-cursor="link"
                                data-cursor-label={t("cursor.downloadCv")}
                                className="group inline-flex items-center justify-between gap-3 rounded-full border border-rule-strong px-5 py-3 text-sm text-bone-100 transition-colors hover:border-signal"
                            >
                                <span>{t("actions.downloadCv")}</span>
                                <span className="font-mono text-xs uppercase tracking-widest text-bone-400 group-hover:text-signal">
                                    .pdf
                                </span>
                            </a>
                        </div>
                    </div>
                </div>

            </div>

            <div className="mt-6 border-y border-rule-soft py-2 md:mt-4 md:py-3">
                <Marquee
                    className="text-xs md:text-sm"
                    duration={42}
                    items={marqueeItems}
                />
            </div>
        </section>
    );
}

function Row({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-baseline justify-between gap-4 border-b border-rule-soft pb-2 text-sm">
            <span className="chip-mono">{label}</span>
            <span className="text-bone-100">{value}</span>
        </div>
    );
}

function Avatar() {
    const t = useTranslations("HomePage.hero.avatar");
    return (
        <div className="relative h-full w-full overflow-hidden bg-ink-900">
            <Image
                src={AVATAR_URL}
                alt="Kevin Julio Pineda"
                fill
                sizes="(max-width: 768px) 60vw, 440px"
                priority
                unoptimized
                className="object-cover object-[50%_28%] scale-110"
            />
        </div>
    );
}

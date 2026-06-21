"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { MoveLeft, Dot } from "lucide-react";
import { TextReveal, ScopeFrame, SectionHeader } from "@/components";
import { PortraitArtwork } from "../components";
import { useTranslations } from "next-intl";

export const AboutTemplate = () => {
    const t = useTranslations("AboutPage");
    const ref = useRef<HTMLElement>(null);

    const chapters = [
        {
            code: t("chapters.formacion.code"),
            title: t("chapters.formacion.title"),
            body: t("chapters.formacion.body"),
            year: t("chapters.formacion.year"),
        },
        {
            code: t("chapters.frontend.code"),
            title: t("chapters.frontend.title"),
            body: t("chapters.frontend.body"),
            year: t("chapters.frontend.year"),
        },
        {
            code: t("chapters.fullstack.code"),
            title: t("chapters.fullstack.title"),
            body: t("chapters.fullstack.body"),
            year: t("chapters.fullstack.year"),
        },
        {
            code: t("chapters.experiencia.code"),
            title: t("chapters.experiencia.title"),
            body: t("chapters.experiencia.body"),
            year: t("chapters.experiencia.year"),
        },
        {
            code: t("chapters.actualidad.code"),
            title: t("chapters.actualidad.title"),
            body: t("chapters.actualidad.body"),
            year: t("chapters.actualidad.year"),
        },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray<HTMLElement>(".chapter").forEach((ch) => {
                gsap.fromTo(
                    ch.querySelectorAll(".chapter-line"),
                    { y: 40, autoAlpha: 0 },
                    {
                        y: 0,
                        autoAlpha: 1,
                        duration: 0.9,
                        ease: "power3.out",
                        stagger: 0.08,
                        scrollTrigger: { trigger: ch, start: "top 85%" },
                    }
                );
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <article ref={ref} className="pt-36 pb-20">
            <header className="default-container section-x">
                <div className="chip-mono flex items-center gap-3 border-y border-rule-soft py-4">
                    <Link href="/" className="hover:text-signal">
                        <span className="flex flex-nowrap gap-2.5 items-center">
                            <MoveLeft className="size-3.5 stroke-2" /> /{t("returnLink")}
                        </span>
                    </Link>
                    <span><Dot className="size-2.5" /></span>
                    <span>{t("code")}</span>
                    <span>{t("eyebrow")}</span>
                </div>

                <div className="mt-14 grid items-end gap-10 md:grid-cols-12">
                    <div className="md:col-span-9">
                        <p className="chip-mono mb-6">{t("header.kicker")}</p>

                        <h1 className="font-display text-[clamp(3rem,11vw,11rem)] leading-[0.85] text-bone-100">
                            <TextReveal as="span" trigger="mount">
                                {t("header.title")}
                            </TextReveal>
                        </h1>

                        <p className="mt-4 font-display text-[clamp(2rem,5.5vw,4.5rem)] italic leading-[0.85] text-bone-400">
                            <TextReveal as="span" trigger="mount">
                                {t("header.subtitle")}
                            </TextReveal>
                        </p>
                    </div>

                    <div className="md:col-span-3">
                        <ScopeFrame className="aspect-3/4 overflow-hidden rounded-2xl border border-rule">
                            <PortraitArtwork />
                        </ScopeFrame>
                    </div>
                </div>
            </header>

            <section className="section-x default-container mt-32 grid md:grid-cols-12 gap-12">
                <aside className="md:sticky md:top-32 md:col-span-3 md:self-start">
                    <SectionHeader code="A/01" eyebrow="Chapters" />

                    <ol className="mt-6 space-y-3">
                        {chapters.map((c) => (
                            <li
                                key={c.code}
                                className="flex items-baseline justify-between border-b border-rule-soft pb-2"
                            >
                                <span className="chip-mono text-bone-500">{c.code}</span>
                                <span className="text-sm text-bone-100">{c.title}</span>
                            </li>
                        ))}
                    </ol>
                </aside>

                <div className="space-y-24 md:col-span-9">
                    {chapters.map((c) => (
                        <div key={c.code} className="chapter">
                            <div className="chapter-line flex items-baseline justify-between border-b border-rule-soft pb-4">
                                <span className="chip-mono text-signal">{c.code}</span>
                                <span className="font-mono text-xs text-bone-500">{c.year}</span>
                            </div>

                            <h2 className="chapter-line mt-6 font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[0.95] text-bone-100">
                                {c.title}
                                <em className="ml-3 inline-block text-bone-400 italic">·</em>
                            </h2>

                            <p className="chapter-line mt-6 max-w-xl text-base leading-relaxed text-bone-300">
                                {c.body}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </article>
    );
};

export default AboutTemplate;
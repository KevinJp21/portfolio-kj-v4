'use client'

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { TextReveal } from "@/components";
import { ContactForm } from "..";
import { channels } from "..";
import { Dot, MoveLeft } from "lucide-react";

export function ContactTemplate() {
  const t = useTranslations("ContactPage");
  const ref = useRef<HTMLElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [interest, setInterest] = useState<string | null>(null);
  const [budget, setBudget] = useState<string | null>(null);
  const [timeline, setTimeline] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [brief, setBrief] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-line",
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: { trigger: ref.current, start: "top 80%" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!submitted || !successRef.current) return;
    gsap.fromTo(
      successRef.current,
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out" }
    );
  }, [submitted]);

  const onSubmit = () => {
    setSubmitted(true);
  };

  return (
    <section ref={ref} className="section-x default-container pt-36 pb-20">
      <div className="chip-mono flex items-center gap-3 border-y border-rule-soft py-4">
        <Link href="/" className="hover:text-signal">
          <span className="flex flex-nowrap gap-2.5 items-center">
            <MoveLeft className="size-3.5 stroke-2" /> /{t("returnLink")}
          </span>
        </Link>
        <span><Dot className="size-2.5" /></span>
        <span>{t("code")}</span>
        <span>{t("breadcrumb")}</span>
      </div>

      <div className="mt-14 grid items-end gap-10 md:grid-cols-12">
        <div className="md:col-span-9">
          <p className="contact-line chip-mono mb-6">{t("kicker")}</p>
          <h1 className="contact-line font-display text-[clamp(3rem,11vw,11rem)] leading-[0.85] text-bone-100">
            <TextReveal as="span" trigger="mount">
              {t("titleLine1")}
            </TextReveal>
            <span className="block italic text-signal">
              <TextReveal as="span" trigger="mount">
                {t("titleAccent")}
              </TextReveal>
            </span>
          </h1>

            <TextReveal as="p" trigger="mount" className="contact-line mt-6 max-w-xl text-base leading-relaxed text-bone-300">
              {t("description")}
            </TextReveal>
        </div>
        <ul className="md:col-span-3 space-y-3">
          {channels.map((c) => (
            <li key={c.label}>
              <a
                href={c.href}
                target="_blank"
                rel="noreferrer"
                data-cursor="link"
                data-cursor-label={c.label}
                className="group flex items-baseline justify-between border-b border-rule-soft pb-2 text-sm"
              >
                <span className="chip-mono">{c.label}</span>
                <span className="text-bone-100 transition-colors group-hover:text-signal">
                  {c.value} ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {submitted ? (
        <div
          ref={successRef}
          className="mt-20 rounded-3xl border border-signal/40 bg-ink-850/60 p-12 text-center"
        >
          <span className="pulse-dot mx-auto inline-block h-2 w-2 rounded-full bg-signal" />
          <h2 className="mt-6 font-display text-[clamp(2rem,5vw,3.5rem)] italic leading-none text-bone-100">
            {t("success.title")}
          </h2>
          <p className="mt-4 text-base text-bone-300">
            {t.rich("success.body", {
              name: name ? `, ${name.split(" ")[0]}` : "",
              email: email || t("success.fallbackEmail"),
              link: (ch) => (
                <Link href="/projects" className="underline decoration-rule-strong underline-offset-4 hover:text-signal">
                  {ch}
                </Link>
              )
            })}
          </p>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setName("");
              setEmail("");
              setBrief("");
              setInterest(null);
              setBudget(null);
              setTimeline(null);
            }}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-rule-strong px-4 py-2 text-sm text-bone-100 transition-colors hover:border-signal"
          >
            {t("success.resetButton")}
            <span aria-hidden>↻</span>
          </button>
        </div>
      ) : (
        <ContactForm
          onSubmit={() => onSubmit}
          name={name} setName={setName}
          email={email} setEmail={setEmail}
          interest={interest} setInterest={setInterest}
          budget={budget} setBudget={setBudget}
          timeline={timeline} setTimeline={setTimeline}
          brief={brief} setBrief={setBrief}
        />
      )}
    </section>
  );
}
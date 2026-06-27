'use client'

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScopeFrame, TextReveal, SectionHeader } from "@/components";
import { cn } from "@/lib";
import { ContactField, ContactSummary } from "..";
import { budgets, timelines, channels, interests } from "..";

export function ContactTemplate() {
  const ref = useRef<HTMLElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [interest, setInterest] = useState<string | null>(null);
  const [budget, setBudget] = useState<(typeof budgets)[number] | null>(null);
  const [timeline, setTimeline] = useState<(typeof timelines)[number] | null>(
    null
  );
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

  const onSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section ref={ref} className="section-x default-container pt-36 pb-20">
      <div className="flex items-center gap-3 border-y border-rule-soft py-4">
        <Link
          href="/"
          data-cursor="link"
          data-cursor-label="Home"
          className="chip-mono text-bone-400 hover:text-signal"
        >
          ← /home
        </Link>
        <span className="chip-mono text-bone-500">·</span>
        <span className="chip-mono text-signal">K/00</span>
        <span className="chip-mono text-bone-500">contact · let&apos;s build</span>
      </div>

      <div className="mt-14 grid items-end gap-10 md:grid-cols-12">
        <div className="md:col-span-9">
          <p className="contact-line chip-mono mb-6 text-bone-500">Empieza aquí</p>
          <h1 className="contact-line font-display text-[clamp(3rem,11vw,11rem)] leading-[0.85] text-bone-100">
            <TextReveal as="span" trigger="mount" delay={0.2}>
              Construyamos
            </TextReveal>
            <span className="block italic text-signal">
              <TextReveal as="span" trigger="mount" delay={0.45}>
                algo real.
              </TextReveal>
            </span>
          </h1>
          <p className="contact-line mt-6 max-w-xl text-base leading-relaxed text-bone-300">
            Cuéntame qué tienes en mente, frontend, full-stack, e-commerce o backend. Respondo en menos de 48 horas para coordinar tiempos, alcance y siguiente paso.
          </p>
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
            Mensaje enviado.
          </h2>
          <p className="mt-4 text-base text-bone-300">
            Gracias{name ? `, ${name.split(" ")[0]}` : ""}. Te escribo a{" "}
            <span className="text-signal">{email || "tu correo"}</span> antes de 48h. Mientras tanto, mira{" "}
            <Link href="/projects" className="underline decoration-rule-strong underline-offset-4 hover:text-signal">
              algunos trabajos recientes
            </Link>
            .
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
            Enviar otro mensaje
            <span aria-hidden>↻</span>
          </button>
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          className="mt-20 grid gap-12 md:grid-cols-12"
        >
          <div className="md:col-span-7">
            <SectionHeader code="K/01" eyebrow="Brief · sobre tu proyecto" />

            <div className="mt-8 space-y-8">
              <ContactField
                id="name"
                label="¿Cómo te llamas?"
                value={name}
                onChange={setName}
                placeholder="Tu nombre"
                required
              />
              <ContactField
                id="email"
                label="¿Dónde te respondo?"
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="email@dominio.com"
                required
              />

              <div>
                <span className="chip-mono mb-3 block text-bone-500">
                  ¿Qué necesitas construir?
                </span>
                <ul className="flex flex-wrap gap-2">
                  {interests.map((i) => {
                    const active = interest === i;
                    return (
                      <li key={i}>
                        <button
                          type="button"
                          data-cursor="link"
                          data-cursor-label={i}
                          onClick={() => setInterest(i)}
                          className={cn(
                            "rounded-full border px-3 py-2 text-sm transition-colors",
                            active
                              ? "border-signal bg-signal/10 text-bone-100"
                              : "border-rule text-bone-400 hover:border-rule-strong hover:text-bone-100"
                          )}
                        >
                          {i}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <ContactField
                id="brief"
                label="Cuéntame en 2 — 3 líneas"
                value={brief}
                onChange={setBrief}
                placeholder="Estamos construyendo X. Necesitamos ayuda con Y. Soñamos con Z."
                multiline
              />
            </div>
          </div>

          <div className="md:col-span-5">
            <SectionHeader code="K/02" eyebrow="Scope · presupuesto y tiempos" />

            <div className="mt-8 space-y-8">
              <div>
                <span className="chip-mono mb-3 block text-bone-500">
                  Presupuesto aproximado
                </span>
                <ul className="grid grid-cols-2 gap-2">
                  {budgets.map((b) => {
                    const active = budget === b;
                    return (
                      <li key={b}>
                        <button
                          type="button"
                          data-cursor="link"
                          data-cursor-label={b}
                          onClick={() => setBudget(b)}
                          className={cn(
                            "w-full rounded-xl border px-3 py-3 text-sm transition-colors",
                            active
                              ? "border-signal bg-signal/10 text-bone-100"
                              : "border-rule text-bone-400 hover:border-rule-strong hover:text-bone-100"
                          )}
                        >
                          {b}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div>
                <span className="chip-mono mb-3 block text-bone-500">
                  ¿Cuándo te gustaría empezar?
                </span>
                <ul className="space-y-2">
                  {timelines.map((t) => {
                    const active = timeline === t;
                    return (
                      <li key={t}>
                        <button
                          type="button"
                          data-cursor="link"
                          data-cursor-label={t}
                          onClick={() => setTimeline(t)}
                          className={cn(
                            "flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm transition-colors",
                            active
                              ? "border-signal bg-signal/10 text-bone-100"
                              : "border-rule text-bone-400 hover:border-rule-strong hover:text-bone-100"
                          )}
                        >
                          <span>{t}</span>
                          <span
                            aria-hidden
                            className={cn(
                              "h-1.5 w-1.5 rounded-full transition-colors",
                              active ? "bg-signal" : "bg-rule-strong"
                            )}
                          />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <ScopeFrame className="rounded-2xl border border-rule bg-ink-850 p-6">
                <p className="chip-mono mb-3 text-bone-500">Resumen</p>
                <dl className="space-y-2 text-sm">
                  <ContactSummary label="Nombre" value={name || "—"} />
                  <ContactSummary label="Email" value={email || "—"} />
                  <ContactSummary label="Proyecto" value={interest ?? "—"} />
                  <ContactSummary label="Presupuesto" value={budget ?? "—"} />
                  <ContactSummary label="Cuándo" value={timeline ?? "—"} />
                </dl>
              </ScopeFrame>

              <button
                type="submit"
                data-cursor="cta"
                data-cursor-label="Enviar"
                className="group relative inline-flex w-full items-center justify-between gap-3 overflow-hidden rounded-full bg-bone-100 px-5 py-4 text-sm font-medium text-ink-900 transition-transform hover:scale-[1.01]"
              >
                <span className="relative z-10">Enviar el brief</span>
                <span className="relative z-10 flex items-center gap-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-ink-700">
                    /send
                  </span>
                  <span aria-hidden>→</span>
                </span>
                <span className="absolute inset-y-0 left-0 z-0 w-0 bg-signal transition-[width] duration-500 group-hover:w-full" />
              </button>

              <p className="text-center text-xs text-bone-500">
                Mockup visual. Esta versión no envía datos reales — solo simula la respuesta del servidor.
              </p>
            </div>
          </div>
        </form>
      )}
    </section>
  );
}
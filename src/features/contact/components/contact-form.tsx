"use client";

import { useTranslations } from "next-intl";
import { ScopeFrame, SectionHeader } from "@/components";
import { cn } from "@/lib";
import { ContactField, ContactSummary } from "..";
import { MoveRight } from "lucide-react";

type ContactFormProps = {
  onSubmit: () => void;
  name: string;
  setName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  interest: string | null;
  setInterest: (v: string | null) => void;
  budget: string | null;
  setBudget: (v: string | null) => void;
  timeline: string | null;
  setTimeline: (v: string | null) => void;
  brief: string;
  setBrief: (v: string) => void;
};

export function ContactForm({
  onSubmit,
  name, setName,
  email, setEmail,
  interest, setInterest,
  budget, setBudget,
  timeline, setTimeline,
  brief, setBrief,
}: ContactFormProps) {
  const t = useTranslations("ContactPage");

  return (
    <form onSubmit={onSubmit} className="mt-20 grid gap-12 md:grid-cols-12">
      <div className="md:col-span-7">
        <SectionHeader code={t("brief.code")} eyebrow={t("brief.eyebrow")} />

        <div className="mt-8 space-y-8">
          <ContactField
            id="name"
            label={t("brief.nameLabel")}
            value={name}
            onChange={setName}
            placeholder={t("brief.namePlaceholder")}
            required
          />
          <ContactField
            id="email"
            label={t("brief.emailLabel")}
            type="email"
            value={email}
            onChange={setEmail}
            placeholder={t("brief.emailPlaceholder")}
            required
          />

          <div>
            <span className="chip-mono mb-3 block text-bone-500">
              {t("brief.interestLabel")}
            </span>
            <ul className="flex flex-wrap gap-2">
              {(t.raw("interests") as string[]).map((i) => {
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
            label={t("brief.briefLabel")}
            value={brief}
            onChange={setBrief}
            placeholder={t("brief.briefPlaceholder")}
            multiline
          />
        </div>
      </div>

      <div className="md:col-span-5">
        <SectionHeader code={t("scope.code")} eyebrow={t("scope.eyebrow")} />

        <div className="mt-8 space-y-8">
          <div>
            <span className="chip-mono mb-3 block text-bone-500">
              {t("scope.budgetLabel")}
            </span>
            <ul className="grid grid-cols-2 gap-2">
              {(t.raw("budgets") as string[]).map((b) => {
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
              {t("scope.timelineLabel")}
            </span>
            <ul className="space-y-2">
              {(t.raw("timelines") as string[]).map((tl) => {
                const active = timeline === tl;
                return (
                  <li key={tl}>
                    <button
                      type="button"
                      data-cursor="link"
                      data-cursor-label={tl}
                      onClick={() => setTimeline(tl)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm transition-colors",
                        active
                          ? "border-signal bg-signal/10 text-bone-100"
                          : "border-rule text-bone-400 hover:border-rule-strong hover:text-bone-100"
                      )}
                    >
                      <span>{tl}</span>
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
            <p className="chip-mono mb-3 text-bone-500">{t("scope.summaryLabel")}</p>
            <dl className="space-y-2 text-sm">
              <ContactSummary label={t("scope.summaryName")} value={name || "—"} />
              <ContactSummary label={t("scope.summaryEmail")} value={email || "—"} />
              <ContactSummary label={t("scope.summaryProject")} value={interest ?? "—"} />
              <ContactSummary label={t("scope.summaryBudget")} value={budget ?? "—"} />
              <ContactSummary label={t("scope.summaryWhen")} value={timeline ?? "—"} />
            </dl>
          </ScopeFrame>

          <button
            type="button"
            data-cursor="cta"
            data-cursor-label={t("form.submit")}
            className="group relative inline-flex w-full items-center justify-between gap-3 overflow-hidden rounded-full bg-bone-100 px-5 py-4 text-sm font-medium text-ink-900 transition-transform hover:scale-[1.01]"
          >
            <span className="relative z-10">{t("form.submit")}</span>
            <span className="relative z-10 flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-widest text-ink-700">
                /send
              </span>
              <span aria-hidden><MoveRight className="size-3.5 stroke-2" /></span>
            </span>
            <span className="absolute inset-y-0 left-0 z-0 w-0 bg-signal transition-[width] duration-500 group-hover:w-full" />
          </button>
        </div>
      </div>
    </form>
  );
}

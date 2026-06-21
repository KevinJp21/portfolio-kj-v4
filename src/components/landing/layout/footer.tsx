"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";

const social = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kevin-julio-667280240/",
  },
  { label: "GitHub", href: "https://github.com/KevinJp21" },
  { label: "Email", href: "mailto:kevinjp821@gmail.com" },
];

export function Footer() {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const clockRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!clockRef.current) return;
    const fmt = new Intl.DateTimeFormat(locale === "es" ? "es-CO" : "en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "America/Bogota",
      hour12: false,
    });
    const tick = () => {
      if (clockRef.current) clockRef.current.textContent = fmt.format(new Date());
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [locale]);

  return (
    <footer className="h-fit relative z-10 mt-32 overflow-hidden border-t border-rule bg-ink-950">
      <div className="section-x pb-10">
        <div className="mt-12 flex flex-col items-center justify-center gap-6 text-xs text-bone-400 text-center">
          <p className="chip-mono">{t("copyright")}</p>
          <div className="flex items-center gap-2">
            {social.map((s) => (
              <Link key={s.href} href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

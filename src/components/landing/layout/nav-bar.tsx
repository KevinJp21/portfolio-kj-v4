"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";
import { MoveRight } from "lucide-react";


export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -28, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 1.1, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      ref={navRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex items-center justify-center px-4 pt-4 transition-all duration-500",
        scrolled ? "pt-3" : "pt-6"
      )}
    >
      <nav
        className={cn(
          "flex w-full max-w-[1320px] items-center justify-between rounded-2xl border border-rule px-4 py-3 transition-all duration-500 md:px-6",
          scrolled ? "glass" : "border-transparent bg-transparent"
        )}
      >
        <Link
          href="/"
          data-cursor="link"
          data-cursor-label="Index"
          className="group flex items-center gap-3"
        >
          <span className="hidden flex-col leading-none md:flex">
            <span className="text-xs font-medium tracking-tight text-bone-100">
              Kevin J. Pineda
            </span>
            <span className="chip-mono mt-1">frontend developer</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  data-cursor="link"
                  data-cursor-label={link.label}
                  className={cn(
                    "group relative flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors",
                    active
                      ? "text-bone-100"
                      : "text-bone-400 hover:text-bone-100"
                  )}
                >
                  <span className="chip-mono text-[9px]">{link.code}</span>
                  <span>{link.label}</span>
                  {active && (
                    <span
                      className="pulse-dot ml-1 inline-block h-1.5 w-1.5 rounded-full bg-signal"
                      aria-hidden
                    />
                  )}
                  <span className="pointer-events-none absolute inset-x-3 -bottom-px h-px scale-x-0 bg-bone-100/40 transition-transform duration-500 group-hover:scale-x-100" />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <span className="flex items-center gap-2 rounded-full border border-rule px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-bone-400">
            <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-signal" />
            disponible · 2026
          </span>
          <Link
            href="/contact"
            data-cursor="cta"
            data-cursor-label="Empezar"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-bone-100 px-4 py-2 text-sm font-medium text-ink-900 transition-transform duration-300 hover:scale-[1.02]"
          >
            <span>Empezar proyecto</span>
            <MoveRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-rule md:hidden"
        >
          <span
            className={cn(
              "block h-px w-5 bg-bone-100 transition-transform duration-300",
              open && "translate-y-[3px] rotate-45"
            )}
          />
          <span
            className={cn(
              "block h-px w-5 bg-bone-100 transition-transform duration-300",
              open && "-translate-y-[3px] -rotate-45"
            )}
          />
        </button>
      </nav>

      {open && (
        <div className="fixed inset-x-4 top-20 z-40 origin-top rounded-2xl border border-rule glass p-6 md:hidden">
          <ul className="space-y-2">
            {navLinks.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center justify-between rounded-xl border border-rule-soft px-4 py-3 text-base",
                      active ? "bg-ink-800 text-bone-100" : "text-bone-300"
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span className="chip-mono">{link.code}</span>
                      {link.label}
                    </span>
                    <MoveRight size={14} />
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href="/contact"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-bone-100 px-4 py-3 text-sm font-medium text-ink-900"
          >
            Empezar proyecto
            <MoveRight size={14} />
          </Link>
        </div>
      )}
    </header>
  );
}

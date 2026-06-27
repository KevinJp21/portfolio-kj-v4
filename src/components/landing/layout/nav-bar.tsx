"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { navLinks } from "@/const/nav-links";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme";
import { LanguageSwitch } from "@/components/landing/layout/language-switch";
import { MoveRight } from "lucide-react";

export function Navbar() {
  const t = useTranslations("Navbar");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

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

  const closeMenu = useCallback((onComplete?: () => void) => {
    const menu = menuRef.current;

    if (!menu) {
      onComplete?.();
      return;
    }

    gsap
      .timeline({
        onComplete: () => onComplete?.(),
      })
      .to(
        menu.querySelectorAll(".mobile-nav-item, .mobile-nav-cta"),
        {
          y: 10,
          autoAlpha: 0,
          duration: 0.2,
          stagger: 0.025,
          ease: "power2.in",
        },
        0
      )
      .to(
        menu,
        { y: -12, autoAlpha: 0, duration: 0.28, ease: "power2.in" },
        0.05
      );
  }, []);

  const toggleMenu = useCallback(() => {
    if (open) {
      closeMenu(() => setOpen(false));
      return;
    }
    setOpen(true);
  }, [closeMenu, open]);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const menu = menuRef.current;
      if (!menu) return;

      gsap.set(menu, {
        y: -14,
        autoAlpha: 0,
        scaleY: 0.96,
        transformOrigin: "top center",
      });
      gsap.set(menu.querySelectorAll(".mobile-nav-item, .mobile-nav-cta"), {
        y: 18,
        autoAlpha: 0,
      });

      gsap
        .timeline()
        .to(menu, {
          y: 0,
          autoAlpha: 1,
          scaleY: 1,
          duration: 0.45,
          ease: "power3.out",
        })
        .to(
          menu.querySelectorAll(".mobile-nav-item"),
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.4,
            ease: "power3.out",
            stagger: 0.05,
          },
          0.1
        )
        .to(
          menu.querySelector(".mobile-nav-cta"),
          { y: 0, autoAlpha: 1, duration: 0.4, ease: "power3.out" },
          0.22
        );
    }, menuRef);

    return () => {
      document.body.style.overflow = "";
      ctx.revert();
    };
  }, [open]);

  useEffect(() => {
    closeMenu(() => setOpen(false));
  }, [pathname, closeMenu]);

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
          "flex w-full default-container items-center justify-between rounded-2xl border border-rule px-4 py-3 transition-all duration-500 lg:px-6",
          scrolled ? "glass" : "border-transparent bg-transparent"
        )}
      >
        <Link
          href="/"
          data-cursor="link"
          data-cursor-label={t("cursor.index")}
          aria-label={t("cursor.index")}
          className="group flex items-center gap-3"
        >
          <span className="hidden flex-col leading-none lg:flex">
            <span className="text-xs font-medium tracking-tight text-bone-100">
              Kevin J. Pineda
            </span>
            <span className="chip-mono mt-1">{t("role")}</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const label = t(`links.${link.labelKey}`);
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  data-cursor="link"
                  data-cursor-label={label}
                  className={cn(
                    "group relative flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors",
                    active
                      ? "text-bone-100"
                      : "text-bone-400 hover:text-bone-100"
                  )}
                >
                  <span className="chip-mono text-[9px]">{link.code}</span>
                  <span>{label}</span>
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

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <LanguageSwitch />
          <Link
            href="/contact"
            data-cursor="cta"
            data-cursor-label={t("cursor.start")}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-bone-100 px-4 py-2 text-sm font-medium text-ink-900 transition-transform duration-300 hover:scale-[1.02]"
          >
            <span>{t("startProject")}</span>
            <MoveRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <LanguageSwitch />
          <button
          type="button"
          aria-label={open ? t("closeMenu") : t("openMenu")}
          aria-expanded={open}
          onClick={toggleMenu}
          className="inline-flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-rule"
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
              open && "translate-y-[-3px] -rotate-45"
            )}
          />
        </button>
        </div>
      </nav>

      {open && (
          <div
            ref={menuRef}
            className="mobile-nav-panel fixed inset-x-4 top-22 z-40 origin-top rounded-2xl border border-rule glass p-6 lg:hidden"
          >
            <ul className="space-y-2">
              {navLinks.map((link) => {
                const label = t(`links.${link.labelKey}`);
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <li key={link.href} className="mobile-nav-item">
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center justify-between rounded-xl border border-rule-soft px-4 py-3 text-base",
                        active ? "bg-ink-800 text-bone-100" : "text-bone-300"
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <span className="chip-mono">{link.code}</span>
                        {label}
                      </span>
                      <MoveRight size={14} />
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link
              href="/contact"
              className="mobile-nav-cta mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-bone-100 px-4 py-3 text-sm font-medium text-ink-900"
            >
              {t("startProject")}
              <MoveRight size={14} />
            </Link>
          </div>
      )}
    </header>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Globe } from "lucide-react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const localeLabels: Record<(typeof routing.locales)[number], string> = {
  es: "Español",
  en: "English",
};

type AppHref =
  | "/"
  | "/blog"
  | "/about"
  | "/contact"
  | { pathname: "/blog/[slug]"; params: { slug: string } };

function resolveHref(
  pathname: ReturnType<typeof usePathname>,
  slugParam: string | string[] | undefined
): AppHref {
  if (pathname === "/blog/[slug]") {
    const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;
    if (slug) {
      return { pathname: "/blog/[slug]", params: { slug } };
    }
    return "/blog";
  }

  if (pathname === "/blog") return "/blog";
  if (pathname === "/about") return "/about";
  if (pathname === "/contact") return "/contact";
  return "/";
}

type LanguageSwitchProps = {
  className?: string;
};

export function LanguageSwitch({ className }: LanguageSwitchProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const handleLocaleChange = (newLocale: (typeof routing.locales)[number]) => {
    if (newLocale === locale) {
      setOpen(false);
      return;
    }

    router.replace(resolveHref(pathname, params.slug), { locale: newLocale });
    setOpen(false);
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Cambiar idioma"
        aria-expanded={open}
        aria-haspopup="listbox"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-rule text-bone-300 transition-colors hover:border-rule-strong hover:text-bone-100"
      >
        <Globe size={16} aria-hidden />
      </button>

      {open ? (
        <ul
          role="listbox"
          aria-label="Idioma"
          className="absolute top-full right-0 z-50 mt-2 min-w-[9.5rem] overflow-hidden rounded-xl border border-rule glass p-1.5 shadow-lg"
        >
          {routing.locales.map((loc) => (
            <li key={loc} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={loc === locale}
                onClick={() => handleLocaleChange(loc)}
                className={cn(
                  "flex w-full items-center rounded-lg px-3 py-2 text-left text-sm transition-colors",
                  loc === locale
                    ? "bg-ink-800 text-bone-100"
                    : "text-bone-400 hover:bg-ink-800/60 hover:text-bone-100"
                )}
              >
                {localeLabels[loc]}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

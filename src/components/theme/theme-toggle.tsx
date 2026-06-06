"use client";

import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/use-theme";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full border border-rule text-bone-300 transition-colors hover:border-rule-strong hover:text-bone-100",
        className
      )}
    >
      {mounted ? (
        isDark ? <Sun size={16} aria-hidden /> : <Moon size={16} aria-hidden />
      ) : (
        <Sun size={16} aria-hidden className="opacity-0" />
      )}
    </button>
  );
}

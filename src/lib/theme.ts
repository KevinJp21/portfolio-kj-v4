export const THEME_STORAGE_KEY = "portfolio-theme";

export type Theme = "light" | "dark";

export function isTheme(value: string | null): value is Theme {
  return value === "light" || value === "dark";
}

export function resolveTheme(value: string | undefined | null): Theme {
  const normalized = value ?? null;
  return isTheme(normalized) ? normalized : "dark";
}

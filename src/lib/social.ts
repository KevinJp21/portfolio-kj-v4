import type { TranslationValues } from "next-intl";

type Translator = (key: string, values?: TranslationValues) => string;

export function getSocialLinks(t: Translator) {
  return [
    {
      label: "LinkedIn",
      value: "kevin Julio",
      href: "https://www.linkedin.com/in/kevin-julio-667280240/",
    },
    {
      label: "GitHub",
      value: "KevinJp21",
      href: "https://github.com/KevinJp21",
    },
    {
      label: "Email",
      value: "contact@kevinjp.dev",
      href: `mailto:contact@kevinjp.dev?subject=${encodeURIComponent(
        t("mailtoSubject")
      )}&body=${encodeURIComponent(t("mailtoBody"))}`,
    },
  ] as const;
}
type ClassValue = string | number | boolean | null | undefined | ClassValue[];

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  const push = (value: ClassValue) => {
    if (!value && value !== 0) return;
    if (Array.isArray(value)) {
      for (const v of value) push(v);
      return;
    }
    if (typeof value === "string" || typeof value === "number") {
      out.push(String(value));
    }
  };
  for (const v of inputs) push(v);
  return out.join(" ");
}

export function splitWords(text: string): string[] {
  return text.split(/(\s+)/);
}

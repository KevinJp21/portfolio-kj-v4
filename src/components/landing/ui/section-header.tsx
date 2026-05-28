import { cn } from "@/lib/utils";

type Props = {
  code: string;
  eyebrow: string;
  className?: string;
};

export function SectionHeader({ code, eyebrow, className }: Props) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 border-t border-rule-soft pt-6",
        className
      )}
    >
      <span className="chip-mono">{code}</span>
      <span className="h-px flex-1 bg-rule-soft" />
      <span className="chip-mono">{eyebrow}</span>
    </div>
  );
}

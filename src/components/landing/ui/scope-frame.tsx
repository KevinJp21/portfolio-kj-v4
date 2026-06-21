import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type ScopeFrameProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "inset" | "outset";
};

export function ScopeFrame({
  children,
  className,
  variant = "outset",
}: ScopeFrameProps) {
  return (
    <div className={cn("relative", className)}>
      <CornerBracket position="tl" variant={variant} />
      <CornerBracket position="tr" variant={variant} />
      <CornerBracket position="bl" variant={variant} />
      <CornerBracket position="br" variant={variant} />
      {children}
    </div>
  );
}

function CornerBracket({
  position,
  variant,
}: {
  position: "tl" | "tr" | "bl" | "br";
  variant: "inset" | "outset";
}) {
  const offset = variant === "outset" ? "-8px" : "6px";
  const map: Record<typeof position, string> = {
    tl: "border-t border-l",
    tr: "border-t border-r",
    bl: "border-b border-l",
    br: "border-b border-r",
  };
  const placement: Record<typeof position, CSSProperties> = {
    tl: { top: offset, left: offset },
    tr: { top: offset, right: offset },
    bl: { bottom: offset, left: offset },
    br: { bottom: offset, right: offset },
  };

  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute h-3 w-3 border-signal",
        map[position]
      )}
      style={placement[position]}
    />
  );
}

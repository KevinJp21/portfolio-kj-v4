import { MagicMarquee } from "@/components";
import { cn } from "@/lib/utils";

type Props = {
  items: string[];
  /** Duración de una vuelta completa, en segundos. Mayor = más lento. */
  duration?: number;
  className?: string;
  separator?: string;
  italic?: boolean;
  reverse?: boolean;
};

export function Marquee({
  items,
  duration = 32,
  className,
  separator = "·",
  italic = false,
  reverse = false,
}: Props) {
  return (
    <MagicMarquee
      reverse={reverse}
      className={cn(
        "[--gap:2vw] p-0!",
        italic && "font-display italic",
        className
      )}
      style={{ ["--duration" as string]: `${duration}s` }}
    >
      {items.map((item, i) => (
        <span
          key={i}
          className="flex items-center gap-[2vw] whitespace-nowrap"
        >
          <span>{item}</span>
          <span aria-hidden className="text-bone-400/40">
            {separator}
          </span>
        </span>
      ))}
    </MagicMarquee>
  );
}

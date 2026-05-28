"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

type Props = {
  children: string;
  as?: "span" | "div" | "p" | "h1" | "h2" | "h3";
  className?: string;
  delay?: number;
  stagger?: number;
  trigger?: "scroll" | "mount";
  start?: string;
};

export function TextReveal({
  children,
  as = "span",
  className,
  delay = 0,
  stagger = 0.06,
  trigger = "scroll",
  start = "top 85%",
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const words = node.querySelectorAll<HTMLSpanElement>(
      "[data-reveal-word] > span"
    );
    if (!words.length) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      gsap.set(words, { yPercent: 0 });
      return;
    }

    gsap.set(words, { yPercent: 110 });

    const animate = () =>
      gsap.to(words, {
        yPercent: 0,
        duration: 1,
        ease: "power4.out",
        stagger,
        delay,
      });

    if (trigger === "mount") {
      const id = window.requestAnimationFrame(animate);
      return () => window.cancelAnimationFrame(id);
    }

    const st = ScrollTrigger.create({
      trigger: node,
      start,
      once: true,
      onEnter: animate,
    });

    return () => st.kill();
  }, [delay, stagger, trigger, start]);

  const parts = splitToWords(children);
  const content = parts.map((part, i) =>
    part === " " ? (
      <span key={i}>&nbsp;</span>
    ) : (
      <span key={i} data-reveal-word>
        <span>{part}</span>
      </span>
    )
  );

  const sharedProps = {
    ref: ref as React.Ref<HTMLSpanElement & HTMLDivElement & HTMLParagraphElement & HTMLHeadingElement>,
    "data-reveal": true,
    className: cn(className),
  } as const;

  switch (as) {
    case "div":
      return <div {...sharedProps}>{content}</div>;
    case "p":
      return <p {...sharedProps}>{content}</p>;
    case "h1":
      return <h1 {...sharedProps}>{content}</h1>;
    case "h2":
      return <h2 {...sharedProps}>{content}</h2>;
    case "h3":
      return <h3 {...sharedProps}>{content}</h3>;
    case "span":
    default:
      return <span {...sharedProps}>{content}</span>;
  }
}

function splitToWords(text: string): string[] {
  const out: string[] = [];
  let current = "";
  for (const ch of text) {
    if (ch === " ") {
      if (current) {
        out.push(current);
        current = "";
      }
      out.push(" ");
    } else {
      current += ch;
    }
  }
  if (current) out.push(current);
  return out;
}

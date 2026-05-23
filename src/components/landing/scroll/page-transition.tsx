"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { usePathname } from "next/navigation";
import { useRef } from "react";

const ENTER_FROM = { autoAlpha: 0, y: 24 } as const;
const ENTER_TO = {
  autoAlpha: 1,
  y: 0,
  duration: 0.9,
  ease: "power3.out",
} as const;

const ROUTE_FROM = { autoAlpha: 0, y: 36 } as const;
const ROUTE_TO = {
  autoAlpha: 1,
  y: 0,
  duration: 0.7,
  ease: "power3.out",
} as const;

export function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const hasMountedRef = useRef(false);

  useGSAP(
    () => {
      const target = containerRef.current;
      if (!target) return;

      const isFirstMount = !hasMountedRef.current;
      hasMountedRef.current = true;

      if (!isFirstMount) {
        window.scrollTo({ top: 0, behavior: "instant" });
      }

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          target,
          isFirstMount ? ENTER_FROM : ROUTE_FROM,
          isFirstMount ? ENTER_TO : ROUTE_TO,
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(target, { autoAlpha: 1, y: 0 });
      });
    },
    { scope: containerRef, dependencies: [pathname] },
  );

  return <div ref={containerRef}>{children}</div>;
}

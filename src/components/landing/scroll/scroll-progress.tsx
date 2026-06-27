"use client";

import { useEffect, useRef, useState } from "react";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        const p = max > 0 ? window.scrollY / max : 0;
        const clamped = Math.max(0, Math.min(1, p));
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${clamped})`;
        }
        setPercent(Math.round(clamped * 100));
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div className="pointer-events-none fixed top-0 left-0 right-0 z-60 h-[2px] bg-bone-100/4">
        <div
          ref={barRef}
          className="h-full origin-left bg-linear-to-r from-signal via-iris to-filament"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
      <div className="pointer-events-none fixed bottom-6 right-6 z-z-60 hidden font-mono text-[10px] uppercase tracking-[0.2em] text-bone-400 md:flex">
        <span className="rounded-full border border-rule px-2 py-1 backdrop-blur-md">
          {String(percent).padStart(3, "0")} / 100
        </span>
      </div>
    </>
  );
}

"use client";

import React, { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface AnimatedHeadlineProps extends React.HTMLAttributes<HTMLHeadingElement> {
  text: string;
  stagger?: number;
}

export function AnimatedHeadline({ text, className, stagger = 0.04, ...rest }: AnimatedHeadlineProps) {
  const containerRef = useRef<HTMLHeadingElement | null>(null);

  const words = useMemo(() => text.split(" "), [text]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const chars = container.querySelectorAll<HTMLElement>("[data-char]");
      if (!chars.length) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.set(chars, { yPercent: 120, opacity: 0 });
      tl.to(chars, { yPercent: 0, opacity: 1, duration: 0.6, stagger });
      tl.to(chars, { yPercent: -8, duration: 0.15, ease: "power1.out", stagger }, "<");
      tl.to(chars, { yPercent: 0, duration: 0.25, ease: "back.out(2)", stagger }, "<0.12");
    }, container);

    return () => ctx.revert();
  }, [text, stagger]);

  return (
    <h1 ref={containerRef} className={cn(className)} aria-label={text} {...rest}>
      {words.map((word, wordIdx) => (
        <div key={`${word}-${wordIdx}`} className="inline-block overflow-hidden align-bottom mr-2 last:mr-0">
          {Array.from(word).map((char, charIdx) => (
            <span
              key={`${wordIdx}-${charIdx}`}
              data-char
              aria-hidden="true"
              className="inline-block will-change-transform"
            >
              {char}
            </span>
          ))}
        </div>
      ))}
    </h1>
  );
} 
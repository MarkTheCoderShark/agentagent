"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fadeInLeft" | "fadeInRight" | "slideInLeft" | "slideInRight" | "flipInY";
  delay?: number;
  duration?: number;
}

export function AnimatedSection({
  children,
  className,
  animation = "fadeInLeft",
  delay = 0,
  duration = 1500,
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const element = ref.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all",
        isVisible ? `${animation} animated` : "opacity-0",
        className
      )}
      style={{
        animationDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
} 
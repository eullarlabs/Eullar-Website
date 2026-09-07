"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Text that fills in word by word as the block moves through the viewport —
 * the reading pace is bound to the scroll position rather than to a timer.
 */
export function LineReveal({
  text,
  className,
  highlight = [],
  start = 0.85,
  end = 0.4,
}: {
  text: string;
  className?: string;
  /** Words (lowercased, punctuation-stripped) to render in the accent colour. */
  highlight?: string[];
  start?: number;
  end?: number;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${start}`, `end ${end}`] as never,
  });

  const words = text.split(" ");
  const hi = new Set(highlight.map((h) => h.toLowerCase()));

  return (
    <p ref={ref} className={cn("flex flex-wrap", className)}>
      {words.map((w, i) => (
        <Word
          key={`${w}-${i}`}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1.6) / words.length]}
          accent={hi.has(w.toLowerCase().replace(/[^a-z]/g, ""))}
          reduce={!!reduce}
        >
          {w}
        </Word>
      ))}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  accent,
  reduce,
}: {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  accent: boolean;
  reduce: boolean;
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <span className="relative mr-[0.26em] inline-block">
      <motion.span
        style={reduce ? undefined : { opacity }}
        className={accent ? "text-accent" : undefined}
      >
        {children}
      </motion.span>
    </span>
  );
}

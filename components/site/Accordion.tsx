"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function Accordion({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t border-line">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q} className="border-b border-line">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="group flex w-full items-start justify-between gap-6 py-6 text-left"
            >
              <span
                className={cn(
                  "font-sans text-[1.0625rem] font-medium leading-snug transition-colors sm:text-[1.1875rem]",
                  isOpen ? "text-accent" : "text-ink group-hover:text-accent",
                )}
              >
                {it.q}
              </span>
              <span
                aria-hidden
                className={cn(
                  "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border transition-all duration-400",
                  isOpen
                    ? "rotate-45 border-accent/50 bg-accent-soft text-accent"
                    : "border-line text-faint group-hover:border-accent/40",
                )}
              >
                <svg viewBox="0 0 14 14" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <path d="M7 2v10M2 7h10" />
                </svg>
              </span>
            </button>
            <motion.div
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <p className="max-w-3xl pb-7 text-[0.9375rem] leading-relaxed text-dim">
                {it.a}
              </p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ConceptGraph } from "./ConceptGraph";
import { FeedbackEngine } from "./FeedbackEngine";
import { PRODUCTS } from "@/lib/content";
import { cn } from "@/lib/utils";

export function ProductShowcase() {
  const [i, setI] = useState(0);
  const p = PRODUCTS[i];

  return (
    <div>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex gap-2">
          {PRODUCTS.map((pr, idx) => (
            <button
              key={pr.slug}
              onClick={() => setI(idx)}
              className={cn(
                "group relative overflow-hidden rounded-2xl border px-5 py-4 text-left transition-all duration-400",
                idx === i
                  ? "border-ink bg-ink text-surface shadow-[0_20px_50px_-26px_rgba(4,25,27,0.8)]"
                  : "border-line bg-surface-2 text-ink hover:border-accent/40",
              )}
              aria-pressed={idx === i}
            >
              <span className="flex items-center gap-2">
                <span className="font-sans text-[1.0625rem] font-medium">{pr.name}</span>
                <span
                  className={cn(
                    "mono-label rounded-full px-1.5 py-0.5 text-[0.5rem]",
                    idx === i ? "bg-surface-2/12 text-accent" : "bg-surface-3 text-dim",
                  )}
                >
                  {pr.index}
                </span>
              </span>
              <span
                className={cn(
                  "mt-1 block text-[0.8125rem]",
                  idx === i ? "text-dim" : "text-dim",
                )}
              >
                {pr.kind}
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="max-w-xl lg:text-right"
          >
            <p className="text-[1.0625rem] leading-relaxed text-ink">
              {p.oneLiner}
            </p>
            <Link
              href={p.href}
              className="group mt-2 inline-flex items-center gap-2 mono-label text-accent transition-colors hover:text-ink"
            >
              Open {p.name}
              <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>→</span>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {i === 0 ? <ConceptGraph /> : <FeedbackEngine />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

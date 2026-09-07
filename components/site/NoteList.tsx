"use client";

import { useState } from "react";
import { motion } from "motion/react";
import type { Note } from "@/lib/content";
import { cn } from "@/lib/utils";

const areaTone: Record<Note["area"], string> = {
  Alignment: "text-iris-500 border-iris-400/30 bg-iris-500/[0.06]",
  Evaluation: "text-turq-700 border-turq-200 bg-turq-50",
  "Learning science": "text-turq-700 border-turq-200 bg-turq-50",
  Systems: "text-ink-600 border-line bg-mist",
  Interpretability: "text-iris-500 border-iris-400/30 bg-iris-500/[0.06]",
};

export function NoteList({ notes }: { notes: Note[] }) {
  const [open, setOpen] = useState<string | null>(notes[0]?.id ?? null);

  return (
    <ul className="border-t border-line">
      {notes.map((n) => {
        const isOpen = open === n.id;
        return (
          <li key={n.id} className="border-b border-line">
            <button
              onClick={() => setOpen(isOpen ? null : n.id)}
              aria-expanded={isOpen}
              className="group grid w-full grid-cols-[auto_1fr_auto] items-start gap-4 py-6 text-left transition-colors sm:gap-6 sm:py-7"
            >
              <span className="mt-1 font-mono text-[0.6875rem] tabular-nums text-ink-600/45 sm:w-24">
                {n.id}
              </span>

              <span className="min-w-0">
                <span
                  className={cn(
                    "block font-display text-[1.0625rem] font-medium leading-snug transition-colors sm:text-[1.25rem]",
                    isOpen ? "text-turq-700" : "text-ink-900 group-hover:text-turq-700",
                  )}
                >
                  {n.title}
                </span>
                <span className="mt-2.5 flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "inline-flex rounded-full border px-2 py-0.5 mono-label text-[0.5625rem]",
                      areaTone[n.area],
                    )}
                  >
                    {n.area}
                  </span>
                  <span className="mono-label text-[0.5625rem] text-ink-600/45">
                    {n.status} · {n.date}
                  </span>
                </span>

                <motion.span
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="block overflow-hidden"
                >
                  <span className="block max-w-2xl pt-4 text-[0.9375rem] leading-relaxed text-ink-600/85">
                    {n.abstract}
                  </span>
                </motion.span>
              </span>

              <span
                className={cn(
                  "mt-1 flex size-7 shrink-0 items-center justify-center rounded-full border transition-all duration-400",
                  isOpen
                    ? "rotate-45 border-turq-400 bg-turq-50 text-turq-700"
                    : "border-line text-ink-600/50 group-hover:border-turq-300 group-hover:text-turq-600",
                )}
                aria-hidden
              >
                <svg viewBox="0 0 14 14" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <path d="M7 2v10M2 7h10" />
                </svg>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

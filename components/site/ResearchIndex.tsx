"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { NoteList } from "./NoteList";
import { NOTES, type Note } from "@/lib/content";
import { cn } from "@/lib/utils";

const AREAS = ["All", ...Array.from(new Set(NOTES.map((n) => n.area)))] as const;

export function ResearchIndex() {
  const [area, setArea] = useState<string>("All");

  const notes = useMemo<Note[]>(
    () => (area === "All" ? NOTES : NOTES.filter((n) => n.area === area)),
    [area],
  );

  return (
    <div>
      <div className="no-scrollbar -mx-6 flex gap-1.5 overflow-x-auto px-6 pb-2">
        {AREAS.map((a) => (
          <button
            key={a}
            onClick={() => setArea(a)}
            className={cn(
              "relative shrink-0 rounded-full border px-4 py-2 text-[0.8125rem] font-medium transition-colors",
              area === a
                ? "border-ink-900 text-white"
                : "border-line bg-white text-ink-600 hover:border-turq-300 hover:text-ink-900",
            )}
          >
            {area === a && (
              <motion.span
                layoutId="ri-pill"
                className="absolute inset-0 rounded-full bg-ink-900"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative">{a}</span>
          </button>
        ))}
        <span className="ml-auto hidden shrink-0 items-center mono-label text-ink-600/40 sm:flex">
          {notes.length} {notes.length === 1 ? "note" : "notes"}
        </span>
      </div>

      <div className="mt-8">
        <NoteList key={area} notes={notes} />
      </div>
    </div>
  );
}

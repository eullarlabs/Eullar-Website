"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const LINES: { t: string; tone?: "dim" | "ok" | "warn" | "in" }[] = [
  { t: "eullar eval run --suite delayed-recall --window 14d", tone: "in" },
  { t: "loading cohort … 1,204 sessions across 3 schools", tone: "dim" },
  { t: "building prerequisite graph from syllabus/ghana-jhs-maths.yaml", tone: "dim" },
  { t: "  nodes 312   edges 908   orphans 4", tone: "dim" },
  { t: "warn  4 concepts have no inbound prerequisite — flagged for review", tone: "warn" },
  { t: "scoring policy A (topic order) vs policy B (graph re-plan)", tone: "dim" },
  { t: "  immediate accuracy   A 0.71   B 0.73   Δ +0.02", tone: "dim" },
  { t: "  recall at 14 days    A 0.44   B 0.61   Δ +0.17", tone: "ok" },
  { t: "note  the proxy barely moves; the thing we care about does.", tone: "ok" },
  { t: "writing artefact → notes/EL-2025-07/recall-delta.json", tone: "dim" },
];

export function ResearchTerminal({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(false);
  const [shown, setShown] = useState(0);
  const [chars, setChars] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);

  // Under reduced motion the whole log is present immediately.
  const visible = reduce ? LINES.length : shown;

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!active || reduce || shown >= LINES.length) return;

    const line = LINES[shown].t;
    if (chars < line.length) {
      const speed = LINES[shown].tone === "in" ? 24 : 8;
      const id = setTimeout(() => setChars((c) => c + 1), speed);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => {
      setShown((s) => s + 1);
      setChars(0);
    }, 320);
    return () => clearTimeout(id);
  }, [active, reduce, shown, chars]);

  const tone = {
    dim: "text-white/45",
    ok: "text-turq-300",
    warn: "text-amber-400",
    in: "text-white",
  };

  return (
    <div
      ref={boxRef}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-ink-950",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-white/8 px-4 py-2.5">
        <span className="size-2 rounded-full bg-coral-500/70" />
        <span className="size-2 rounded-full bg-amber-400/70" />
        <span className="size-2 rounded-full bg-turq-400/70" />
        <span className="ml-2 font-mono text-[0.625rem] tracking-widest text-white/30 uppercase">
          eullar · eval
        </span>
      </div>
      <div className="h-[19rem] overflow-hidden p-4 font-mono text-[0.75rem] leading-[1.9] sm:text-[0.8125rem]">
        {LINES.slice(0, visible + 1).map((l, i) => {
          const text = i === visible ? l.t.slice(0, chars) : l.t;
          return (
            <div key={i} className="flex gap-2">
              <span className="shrink-0 text-turq-500/50">
                {l.tone === "in" ? "›" : " "}
              </span>
              <span className={cn(tone[l.tone ?? "dim"], "break-words")}>
                {text}
                {i === visible && <span className="animate-blink text-turq-400">▍</span>}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

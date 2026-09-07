"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  A small slice of a real maths curriculum, as a prerequisite graph  */
/* ------------------------------------------------------------------ */

type CNode = { id: string; label: string; x: number; y: number };

const NODES: CNode[] = [
  { id: "num", label: "Number line", x: 62, y: 214 },
  { id: "fra", label: "Fractions", x: 178, y: 116 },
  { id: "rat", label: "Ratio", x: 178, y: 312 },
  { id: "equ", label: "Equivalence", x: 300, y: 78 },
  { id: "pro", label: "Proportion", x: 300, y: 304 },
  { id: "lin", label: "Linear equations", x: 424, y: 168 },
  { id: "fac", label: "Factorising", x: 424, y: 336 },
  { id: "rea", label: "Rearranging", x: 552, y: 92 },
  { id: "gra", label: "Graphing lines", x: 552, y: 228 },
  { id: "qua", label: "Quadratics", x: 552, y: 366 },
  { id: "sim", label: "Simultaneous", x: 672, y: 158 },
  { id: "wor", label: "Word problems", x: 672, y: 308 },
];

const EDGES: [string, string][] = [
  ["num", "fra"],
  ["num", "rat"],
  ["fra", "equ"],
  ["rat", "pro"],
  ["equ", "lin"],
  ["pro", "lin"],
  ["pro", "fac"],
  ["lin", "rea"],
  ["lin", "gra"],
  ["fac", "qua"],
  ["rea", "sim"],
  ["gra", "sim"],
  ["gra", "wor"],
  ["qua", "wor"],
];

const byId = (id: string) => NODES.find((n) => n.id === id)!;

type Profile = {
  id: string;
  name: string;
  meta: string;
  goal: string;
  blocking: string;
  route: string[];
  mastery: Record<string, number>;
  plan: { step: string; detail: string }[];
  read: string;
};

const M = (over: Record<string, number>): Record<string, number> => {
  const base = Object.fromEntries(NODES.map((n) => [n.id, 0.82]));
  return { ...base, ...over } as Record<string, number>;
};

const PROFILES: Profile[] = [
  {
    id: "ama",
    name: "Learner A",
    meta: "Year 9 · stalls on simultaneous equations",
    goal: "sim",
    blocking: "pro",
    route: ["pro", "lin", "gra", "sim"],
    mastery: M({ pro: 0.28, lin: 0.44, gra: 0.36, sim: 0.15, rat: 0.62, wor: 0.3 }),
    read: "Failures on simultaneous equations trace back through graphing to an unstable proportion model — not to the topic being assessed.",
    plan: [
      { step: "Repair", detail: "Proportion as a multiplicative relation, using the ratio work already secure" },
      { step: "Rebuild", detail: "Linear equations re-derived from the repaired proportion idea" },
      { step: "Bridge", detail: "Graphing lines as the visual form of the same relation" },
      { step: "Reach", detail: "Simultaneous equations, introduced graphically before algebraically" },
    ],
  },
  {
    id: "kofi",
    name: "Learner B",
    meta: "Year 10 · quadratics not landing",
    goal: "wor",
    blocking: "fac",
    route: ["fac", "qua", "wor"],
    mastery: M({ fac: 0.31, qua: 0.24, wor: 0.29, pro: 0.66 }),
    read: "Algebraic manipulation is intact; the gap is factorising, which quietly blocks every quadratic method downstream of it.",
    plan: [
      { step: "Repair", detail: "Factorising drilled against area models rather than pattern-matching" },
      { step: "Rebuild", detail: "Quadratics approached through the factored form first" },
      { step: "Reach", detail: "Word problems that require choosing the form, not applying a given one" },
    ],
  },
  {
    id: "zara",
    name: "Learner C",
    meta: "Year 9 · ahead of the sequence",
    goal: "wor",
    blocking: "gra",
    route: ["gra", "sim", "wor"],
    mastery: M({ qua: 0.71, wor: 0.58, sim: 0.68, gra: 0.74 }),
    read: "No blocking gap. The frontier is depth, so the route swaps remediation for problems that are underdetermined on purpose.",
    plan: [
      { step: "Extend", detail: "Graphing pushed into non-linear cases ahead of the class sequence" },
      { step: "Connect", detail: "Simultaneous systems framed as intersection, then as constraint" },
      { step: "Reach", detail: "Open word problems with more than one defensible model" },
    ],
  },
];

function curve(a: CNode, b: CNode) {
  const mx = (a.x + b.x) / 2;
  return `M ${a.x} ${a.y} C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`;
}

function masteryTone(v: number) {
  if (v >= 0.75) return { fill: "var(--color-turq-500)", ring: "var(--color-turq-200)", text: "#fff" };
  if (v >= 0.5) return { fill: "var(--color-turq-200)", ring: "var(--color-turq-100)", text: "var(--color-ink-900)" };
  return { fill: "#fff", ring: "var(--color-data-flag)", text: "var(--color-ink-900)" };
}

export function ConceptGraph() {
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState<string | null>(null);
  const p = PROFILES[active];

  const routeSet = useMemo(() => new Set(p.route), [p]);
  const routeEdges = useMemo(() => {
    const s = new Set<string>();
    for (let i = 0; i < p.route.length - 1; i++) s.add(`${p.route[i]}->${p.route[i + 1]}`);
    return s;
  }, [p]);

  const routePath = useMemo(
    () =>
      p.route
        .map((id, i) => {
          const n = byId(id);
          if (i === 0) return `M ${n.x} ${n.y}`;
          const prev = byId(p.route[i - 1]);
          const mx = (prev.x + n.x) / 2;
          return `C ${mx} ${prev.y}, ${mx} ${n.y}, ${n.x} ${n.y}`;
        })
        .join(" "),
    [p],
  );

  const hovered = hover ? byId(hover) : null;

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-white">
      {/* Profile switcher */}
      <div className="flex flex-col gap-3 border-b border-line bg-mist/60 p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4">
        <div className="flex flex-wrap gap-1.5">
          {PROFILES.map((pr, i) => (
            <button
              key={pr.id}
              onClick={() => setActive(i)}
              className={cn(
                "relative rounded-full px-3.5 py-2 text-left text-[0.8125rem] font-medium transition-colors",
                i === active ? "text-white" : "text-ink-600 hover:text-ink-900",
              )}
            >
              {i === active && (
                <motion.span
                  layoutId="cg-pill"
                  className="absolute inset-0 rounded-full bg-ink-900"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{pr.name}</span>
            </button>
          ))}
        </div>
        <p className="mono-label text-ink-600/60">
          fig. 1 — prerequisite graph, live re-plan
        </p>
      </div>

      <div className="grid lg:grid-cols-[1.55fr_1fr]">
        {/* Graph */}
        <div className="no-scrollbar relative min-w-0 overflow-x-auto border-b border-line lg:border-b-0 lg:border-r">
          <div className="grid-paper-fine absolute inset-0 opacity-50" />
          <svg
            viewBox="0 0 736 430"
            className="relative block h-auto w-full min-w-[600px]"
            role="img"
            aria-label="Curriculum prerequisite graph with the currently planned route highlighted"
          >
            <defs>
              <marker id="cg-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-turq-600)" />
              </marker>
              <filter id="cg-glow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="6" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* base edges */}
            {EDGES.map(([a, b]) => {
              const key = `${a}->${b}`;
              const isRoute = routeEdges.has(key);
              const dim = hover ? hover !== a && hover !== b : false;
              return (
                <path
                  key={key}
                  d={curve(byId(a), byId(b))}
                  fill="none"
                  stroke={isRoute ? "var(--color-turq-500)" : "var(--color-line-strong)"}
                  strokeWidth={isRoute ? 2 : 1.25}
                  opacity={dim ? 0.25 : 1}
                  className="transition-all duration-500"
                />
              );
            })}

            {/* animated route */}
            <AnimatePresence mode="wait">
              <motion.path
                key={p.id}
                d={routePath}
                fill="none"
                stroke="var(--color-turq-400)"
                strokeWidth={3.5}
                strokeLinecap="round"
                filter="url(#cg-glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.85 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
              />
            </AnimatePresence>

            {/* travelling packet */}
            <motion.circle
              key={`packet-${p.id}`}
              r="4.5"
              fill="var(--color-turq-600)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <animateMotion dur="3.4s" repeatCount="indefinite" path={routePath} keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
            </motion.circle>

            {/* nodes */}
            {NODES.map((n) => {
              const v = p.mastery[n.id];
              const tone = masteryTone(v);
              const inRoute = routeSet.has(n.id);
              const isBlock = n.id === p.blocking;
              const isGoal = n.id === p.goal;
              const dim = hover ? hover !== n.id : false;

              return (
                <g
                  key={n.id}
                  onMouseEnter={() => setHover(n.id)}
                  onMouseLeave={() => setHover(null)}
                  className="cursor-pointer"
                  opacity={dim ? 0.42 : 1}
                  style={{ transition: "opacity .35s" }}
                >
                  {isBlock && (
                    <circle cx={n.x} cy={n.y} r={26} fill="none" stroke="var(--color-data-flag)" strokeWidth="1.2" strokeDasharray="3 4" className="animate-[spin_18s_linear_infinite]" style={{ transformOrigin: `${n.x}px ${n.y}px` }} />
                  )}
                  {isGoal && (
                    <rect x={n.x - 24} y={n.y - 24} width="48" height="48" rx="14" fill="none" stroke="var(--color-ink-900)" strokeWidth="1.2" strokeDasharray="2 5" />
                  )}
                  <motion.circle
                    cx={n.x}
                    cy={n.y}
                    r={inRoute ? 15 : 11}
                    initial={false}
                    animate={{ r: inRoute ? 15 : 11 }}
                    transition={{ type: "spring", stiffness: 260, damping: 24 }}
                    fill={tone.fill}
                    stroke={tone.ring}
                    strokeWidth={inRoute ? 4 : 3}
                  />
                  {/* mastery arc */}
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={19}
                    fill="none"
                    stroke="var(--color-turq-600)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray={`${v * 2 * Math.PI * 19} ${2 * Math.PI * 19}`}
                    transform={`rotate(-90 ${n.x} ${n.y})`}
                    opacity={0.55}
                    className="transition-all duration-700"
                  />
                  <text
                    x={n.x}
                    y={n.y + 38}
                    textAnchor="middle"
                    className="fill-ink-700 font-mono text-[9.5px] tracking-wide"
                  >
                    {n.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* legend */}
          <div className="pointer-events-none absolute bottom-3 left-4 flex flex-wrap gap-x-4 gap-y-1">
            {[
              ["var(--color-turq-500)", "secure"],
              ["var(--color-turq-200)", "partial"],
              ["var(--color-data-flag)", "gap"],
            ].map(([c, l]) => (
              <span key={l} className="flex items-center gap-1.5 mono-label text-[0.5625rem] text-ink-600/70">
                <span className="size-2 rounded-full" style={{ background: c as string }} />
                {l}
              </span>
            ))}
          </div>
        </div>

        {/* Read-out */}
        <div className="relative p-5 sm:p-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="mono-label text-turq-600">{p.meta}</p>

              <div className="mt-5 rounded-xl border border-[var(--color-data-flag)]/25 bg-[var(--color-data-flag)]/[0.045] p-4">
                <p className="mono-label text-[var(--color-data-flag)]">Blocking concept</p>
                <p className="mt-1.5 font-display text-xl font-semibold text-ink-900">
                  {byId(p.blocking).label}
                </p>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-600/85">
                  {p.read}
                </p>
              </div>

              <p className="mono-label mt-6 text-ink-600/50">
                Generated route — {p.plan.length} steps
              </p>
              <ol className="mt-3 space-y-3">
                {p.plan.map((s, i) => (
                  <motion.li
                    key={s.step}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.09, duration: 0.4 }}
                    className="flex gap-3"
                  >
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md bg-ink-900 font-mono text-[0.5625rem] text-white">
                      {i + 1}
                    </span>
                    <span className="text-[0.875rem] leading-relaxed text-ink-700">
                      <span className="font-medium text-ink-900">{s.step}. </span>
                      {s.detail}
                    </span>
                  </motion.li>
                ))}
              </ol>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="absolute inset-x-5 bottom-5 rounded-xl border border-line bg-white/95 p-3 shadow-[0_20px_50px_-24px_rgba(4,25,27,0.4)] backdrop-blur sm:inset-x-7"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.75rem] text-ink-900">
                    {hovered.label}
                  </span>
                  <span className="mono-label text-turq-600">
                    mastery {(p.mastery[hovered.id] * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-haze">
                  <motion.div
                    className="h-full rounded-full bg-turq-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${p.mastery[hovered.id] * 100}%` }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Reevue — criterion ↔ evidence alignment, rendered as feedback      */
/* ------------------------------------------------------------------ */

type Crit = { id: string; label: string; weight: number };

const ROLE = {
  title: "Junior Data Analyst",
  ref: "REQ-2291",
  criteria: [
    { id: "sql", label: "SQL against production data", weight: 0.3 },
    { id: "stat", label: "Applied statistics", weight: 0.25 },
    { id: "comm", label: "Communicating to non-analysts", weight: 0.25 },
    { id: "own", label: "Owned a project end to end", weight: 0.2 },
  ] as Crit[],
};

type Frag = { text: string; crit?: string };

type Candidate = {
  id: string;
  label: string;
  outcome: "Not selected" | "Shortlisted";
  excerpt: Frag[];
  scores: Record<string, number>;
  feedback: { crit: string; text: string }[];
};

const CANDIDATES: Candidate[] = [
  {
    id: "a",
    label: "Applicant 4172",
    outcome: "Not selected",
    excerpt: [
      { text: "During my final year I " },
      { text: "built dashboards in Power BI for the student union", crit: "comm" },
      { text: ", pulling numbers from a shared spreadsheet each week. I taught myself " },
      { text: "basic SQL through an online course", crit: "sql" },
      { text: " and have used it on sample datasets. My dissertation used " },
      { text: "a regression to test whether attendance predicted grades", crit: "stat" },
      { text: ", which I presented to my department." },
    ],
    scores: { sql: 0.34, stat: 0.62, comm: 0.71, own: 0.28 },
    feedback: [
      {
        crit: "sql",
        text: "The SQL evidence in your application is coursework on sample datasets. This role's first criterion is querying production data, where the difficulty is unfamiliar schemas and dirty joins rather than syntax. A public dataset with a genuinely messy schema, written up as a short case study, would close most of this distance.",
      },
      {
        crit: "own",
        text: "Nothing in the application shows a project you carried from question to delivered decision. The dashboard work is described as a recurring task set by someone else. Reviewers look for one instance where you chose the question, and can say what changed because of the answer.",
      },
      {
        crit: "comm",
        text: "Your strongest signal. The dashboard work and the departmental presentation both show translation for a non-technical audience — keep this prominent in future applications.",
      },
    ],
  },
  {
    id: "b",
    label: "Applicant 4406",
    outcome: "Shortlisted",
    excerpt: [
      { text: "At my internship I " },
      { text: "wrote and maintained the SQL models behind the retention report", crit: "sql" },
      { text: ", including a rewrite that cut its runtime. I " },
      { text: "ran the A/B test for the onboarding change end to end", crit: "own" },
      { text: " — designed the split, " },
      { text: "picked the test and reported the effect size with its interval", crit: "stat" },
      { text: " — and presented it to the growth team." },
    ],
    scores: { sql: 0.86, stat: 0.79, comm: 0.58, own: 0.83 },
    feedback: [
      {
        crit: "comm",
        text: "The technical evidence is strong and specific. The one thinner area is communication to non-analysts: the application describes presenting to a growth team, which is already numerate. At interview, be ready with an example of explaining a result to someone who disagreed with it.",
      },
      {
        crit: "own",
        text: "The A/B test is the clearest end-to-end ownership signal in the application — design, analysis and delivery all attributed to you. Expect the interview to probe what you would have done had the result been null.",
      },
    ],
  },
];

const GENERIC =
  "Thank you for your interest in this position. After careful consideration, we have decided to move forward with other candidates whose experience more closely matches our requirements. We wish you the best in your search.";

const PIPELINE = [
  "Application received",
  "Criteria alignment",
  "Evidence anchoring",
  "Team review",
  "Delivered to applicant",
];

export function FeedbackEngine() {
  const [ci, setCi] = useState(0);
  const [mode, setMode] = useState<"reevue" | "standard">("reevue");
  const [hover, setHover] = useState<string | null>(null);
  const c = CANDIDATES[ci];

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-white">
      {/* header */}
      <div className="flex flex-col gap-3 border-b border-line bg-mist/60 p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4">
        <div className="flex items-center gap-3">
          <span className="mono-label text-ink-600/60">{ROLE.ref}</span>
          <span className="h-3 w-px bg-line-strong" />
          <span className="text-[0.875rem] font-medium text-ink-900">{ROLE.title}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded-full border border-line bg-white p-0.5">
            {CANDIDATES.map((cd, i) => (
              <button
                key={cd.id}
                onClick={() => setCi(i)}
                className={cn(
                  "relative rounded-full px-3 py-1.5 font-mono text-[0.6875rem] transition-colors",
                  i === ci ? "text-white" : "text-ink-600 hover:text-ink-900",
                )}
              >
                {i === ci && (
                  <motion.span layoutId="fe-cand" className="absolute inset-0 rounded-full bg-ink-900" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                )}
                <span className="relative">{cd.label}</span>
              </button>
            ))}
          </div>
          <button
            onClick={() => setMode((m) => (m === "reevue" ? "standard" : "reevue"))}
            className={cn(
              "flex items-center gap-2 rounded-full border px-3 py-1.5 mono-label transition-colors",
              mode === "reevue"
                ? "border-turq-300 bg-turq-50 text-turq-700"
                : "border-line bg-white text-ink-600",
            )}
            aria-pressed={mode === "reevue"}
          >
            <span
              className={cn(
                "relative h-3 w-5 rounded-full transition-colors",
                mode === "reevue" ? "bg-turq-500" : "bg-line-strong",
              )}
            >
              <motion.span
                layout
                transition={{ type: "spring", stiffness: 500, damping: 34 }}
                className={cn(
                  "absolute top-0.5 size-2 rounded-full bg-white",
                  mode === "reevue" ? "left-2.5" : "left-0.5",
                )}
              />
            </span>
            Reevue {mode === "reevue" ? "on" : "off"}
          </button>
        </div>
      </div>

      {/* pipeline */}
      <div className="no-scrollbar min-w-0 overflow-x-auto border-b border-line bg-white px-4 py-3">
        <div className="flex min-w-[620px] items-center gap-2">
          {PIPELINE.map((s, i) => (
            <div key={s} className="flex flex-1 items-center gap-2">
              <div className="flex items-center gap-2">
                <span className="relative flex size-1.5">
                  <span
                    className="absolute inline-flex size-full rounded-full bg-turq-400"
                    style={{ animation: `pulse-ring 2.6s ${i * 0.4}s var(--ease-out-expo) infinite` }}
                  />
                  <span className="relative inline-flex size-1.5 rounded-full bg-turq-500" />
                </span>
                <span className="mono-label whitespace-nowrap text-ink-600/70">{s}</span>
              </div>
              {i < PIPELINE.length - 1 && (
                <div className="relative h-px flex-1 bg-line">
                  <motion.span
                    className="absolute -top-[1.5px] size-1 rounded-full bg-turq-500"
                    animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 2.2, delay: i * 0.4, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3">
        {/* application */}
        <div className="border-b border-line p-5 lg:border-b-0 lg:border-r sm:p-6">
          <p className="mono-label text-ink-600/50">Submitted application — excerpt</p>
          <p className="mt-4 text-[0.9375rem] leading-[1.85] text-ink-700">
            {c.excerpt.map((f, i) =>
              f.crit ? (
                <span
                  key={i}
                  onMouseEnter={() => setHover(f.crit!)}
                  onMouseLeave={() => setHover(null)}
                  className={cn(
                    "cursor-pointer rounded px-0.5 transition-colors duration-300",
                    hover === f.crit
                      ? "bg-turq-200 text-ink-950"
                      : "bg-turq-50 decoration-turq-300 underline decoration-dotted underline-offset-4",
                  )}
                >
                  {f.text}
                </span>
              ) : (
                <span key={i}>{f.text}</span>
              ),
            )}
          </p>
          <div className="mt-6 flex items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 mono-label text-[0.625rem]",
                c.outcome === "Shortlisted"
                  ? "border-turq-200 bg-turq-50 text-turq-700"
                  : "border-line bg-mist text-ink-600",
              )}
            >
              Outcome · {c.outcome}
            </span>
            <span className="mono-label text-[0.5625rem] text-ink-600/45">
              decided by the hiring team
            </span>
          </div>
        </div>

        {/* alignment */}
        <div className="border-b border-line p-5 lg:border-b-0 lg:border-r sm:p-6">
          <p className="mono-label text-ink-600/50">Criterion alignment</p>
          <div className="mt-5 space-y-4">
            {ROLE.criteria.map((cr) => {
              const v = c.scores[cr.id];
              const isGap = v < 0.45;
              const isHot = hover === cr.id;
              return (
                <div
                  key={cr.id}
                  onMouseEnter={() => setHover(cr.id)}
                  onMouseLeave={() => setHover(null)}
                  className={cn(
                    "cursor-pointer rounded-lg p-2 transition-colors -mx-2",
                    isHot ? "bg-turq-50" : "hover:bg-mist",
                  )}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-[0.8125rem] font-medium text-ink-900">
                      {cr.label}
                    </span>
                    <span className="font-mono text-[0.6875rem] tabular-nums text-ink-600/60">
                      w{cr.weight.toFixed(2)}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-haze">
                      <motion.div
                        key={`${c.id}-${cr.id}`}
                        className="h-full rounded-full"
                        style={{
                          background: isGap
                            ? "var(--color-data-flag)"
                            : `color-mix(in oklab, var(--color-data-teal) ${Math.round(55 + v * 45)}%, white)`,
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${v * 100}%` }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                    <span className="w-8 text-right font-mono text-[0.6875rem] tabular-nums text-ink-700">
                      {(v * 100).toFixed(0)}
                    </span>
                  </div>
                  {isGap && (
                    <p className="mt-1.5 flex items-center gap-1.5 font-mono text-[0.625rem] text-[var(--color-data-flag)]">
                      <span aria-hidden>▲</span> gap — below the bar for this role
                    </p>
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1 border-t border-line pt-4">
            <span className="flex items-center gap-1.5 mono-label text-[0.5625rem] text-ink-600/70">
              <span className="h-1.5 w-4 rounded-full bg-[var(--color-data-teal)]" /> evidenced
            </span>
            <span className="flex items-center gap-1.5 mono-label text-[0.5625rem] text-ink-600/70">
              <span className="h-1.5 w-4 rounded-full bg-[var(--color-data-flag)]" /> gap
            </span>
          </div>
          <p className="mt-3 text-[0.75rem] leading-relaxed text-ink-600/60">
            Alignment is computed against criteria the hiring team wrote. It is
            an explanation of the fit, not a ranking — Reevue never selects.
          </p>
        </div>

        {/* feedback */}
        <div className="relative bg-mist/40 p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <p className="mono-label text-ink-600/50">Returned to applicant</p>
            <span className="mono-label text-[0.5625rem] text-turq-600">
              {mode === "reevue" ? "generated · reviewed" : "template"}
            </span>
          </div>

          <AnimatePresence mode="wait">
            {mode === "standard" ? (
              <motion.div
                key="standard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="mt-5"
              >
                <div className="rounded-xl border border-line bg-white p-4">
                  <p className="text-[0.875rem] leading-relaxed text-ink-600/70">
                    {GENERIC}
                  </p>
                </div>
                <p className="mt-4 flex items-start gap-2 text-[0.75rem] leading-relaxed text-[var(--color-data-flag)]">
                  <span aria-hidden className="mt-0.5">✕</span>
                  Nothing here is actionable. The applicant cannot tell which
                  criterion they missed, or by how far.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={`reevue-${c.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="mt-5 space-y-3"
              >
                {c.feedback.map((f, i) => {
                  const cr = ROLE.criteria.find((x) => x.id === f.crit)!;
                  const isHot = hover === f.crit;
                  return (
                    <motion.div
                      key={f.crit}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      onMouseEnter={() => setHover(f.crit)}
                      onMouseLeave={() => setHover(null)}
                      className={cn(
                        "cursor-pointer rounded-xl border bg-white p-4 transition-all duration-300",
                        isHot
                          ? "border-turq-300 shadow-[0_16px_40px_-24px_rgba(18,173,161,0.9)]"
                          : "border-line",
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <span className="size-1.5 rounded-full bg-turq-500" />
                        <span className="mono-label text-turq-700">{cr.label}</span>
                      </div>
                      <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-700">
                        {f.text}
                      </p>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

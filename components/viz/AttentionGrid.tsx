"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const TOKENS = ["solve", "for", "x", "when", "2x", "+", "3", "=", "11", "step", "by", "step"];

const HEADS = [
  { id: 0, name: "local", note: "attends to the immediately preceding tokens — the window that carries syntax" },
  { id: 1, name: "sink", note: "dumps probability mass on the first token, a known artefact rather than a feature" },
  { id: 2, name: "operator", note: "locks onto the arithmetic operators and the equality — the structure of the problem" },
  { id: 3, name: "diffuse", note: "near-uniform: this head is carrying almost no information at this layer" },
];

function weight(head: number, i: number, j: number) {
  if (j > i) return 0; // causal mask
  const d = i - j;
  switch (head) {
    case 0:
      return Math.exp(-d / 1.6) + 0.02;
    case 1:
      return (j === 0 ? 2.2 : 0.08) + Math.exp(-d / 6) * 0.25;
    case 2: {
      const opish = [4, 5, 6, 7, 8].includes(j) ? 1.5 : 0.1;
      return opish + Math.exp(-d / 9) * 0.2;
    }
    default:
      return 0.35 + Math.sin(i * 0.7 + j * 1.3) * 0.06;
  }
}

export function AttentionGrid() {
  const [head, setHead] = useState(0);
  const [cell, setCell] = useState<{ i: number; j: number } | null>(null);

  const rows = useMemo(() => {
    return TOKENS.map((_, i) => {
      const raw = TOKENS.map((_, j) => weight(head, i, j));
      const sum = raw.reduce((a, b) => a + b, 0) || 1;
      return raw.map((v) => v / sum);
    });
  }, [head]);

  const n = TOKENS.length;
  const size = 26;
  const pad = 58;

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-white">
      <div className="flex flex-col gap-3 border-b border-line bg-mist/60 p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4">
        <p className="mono-label text-ink-600/60">
          fig. 2 — attention over a solved-example prompt
        </p>
        <div className="flex flex-wrap gap-1">
          {HEADS.map((h) => (
            <button
              key={h.id}
              onClick={() => setHead(h.id)}
              className={cn(
                "relative rounded-full px-3 py-1.5 font-mono text-[0.6875rem] transition-colors",
                head === h.id ? "text-white" : "text-ink-600 hover:text-ink-900",
              )}
            >
              {head === h.id && (
                <motion.span layoutId="ag-pill" className="absolute inset-0 rounded-full bg-ink-900" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
              )}
              <span className="relative">head·{h.id}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
        <div className="no-scrollbar overflow-x-auto border-b border-line p-4 lg:border-b-0 lg:border-r sm:p-6">
          <svg
            viewBox={`0 0 ${pad + n * size + 14} ${pad + n * size + 14}`}
            className="block h-auto w-full min-w-[430px]"
            role="img"
            aria-label="Attention weight matrix; rows are query tokens, columns are key tokens"
          >
            {/* column labels */}
            {TOKENS.map((t, j) => (
              <text
                key={`c-${j}`}
                x={pad + j * size + size / 2}
                y={pad - 10}
                textAnchor="start"
                transform={`rotate(-58 ${pad + j * size + size / 2} ${pad - 10})`}
                className={cn(
                  "font-mono text-[9px] transition-colors",
                  cell?.j === j ? "fill-turq-700" : "fill-ink-700/45",
                )}
              >
                {t}
              </text>
            ))}
            {/* row labels */}
            {TOKENS.map((t, i) => (
              <text
                key={`r-${i}`}
                x={pad - 10}
                y={pad + i * size + size / 2 + 3}
                textAnchor="end"
                className={cn(
                  "font-mono text-[9px] transition-colors",
                  cell?.i === i ? "fill-turq-700" : "fill-ink-700/45",
                )}
              >
                {t}
              </text>
            ))}

            {rows.map((row, i) =>
              row.map((v, j) => {
                const active = cell?.i === i || cell?.j === j;
                const masked = j > i;
                return (
                  <rect
                    key={`${i}-${j}`}
                    x={pad + j * size}
                    y={pad + i * size}
                    width={size - 3}
                    height={size - 3}
                    rx={4}
                    fill={
                      masked
                        ? "var(--color-haze)"
                        : `color-mix(in oklab, var(--color-data-teal) ${Math.min(100, v * 260)}%, white)`
                    }
                    stroke={cell?.i === i && cell?.j === j ? "var(--color-ink-900)" : "transparent"}
                    strokeWidth="1.5"
                    opacity={cell && !active ? 0.35 : 1}
                    onMouseEnter={() => setCell({ i, j })}
                    onMouseLeave={() => setCell(null)}
                    className="cursor-crosshair transition-all duration-300"
                  />
                );
              }),
            )}

            <text x={pad - 10} y={20} textAnchor="end" className="fill-ink-700/40 font-mono text-[8px] tracking-widest uppercase">
              query
            </text>
            <text x={pad + n * size} y={pad + n * size + 26} textAnchor="end" className="fill-ink-700/40 font-mono text-[8px] tracking-widest uppercase">
              key
            </text>
          </svg>
        </div>

        <div className="flex flex-col justify-between p-5 sm:p-7">
          <div>
            <p className="mono-label text-turq-600">head · {HEADS[head].name}</p>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-700">
              {HEADS[head].note}
            </p>
            <p className="mt-5 text-[0.8125rem] leading-relaxed text-ink-600/70">
              The greyed upper triangle is the causal mask: a token cannot attend
              to what has not been written yet. Reading these patterns is how we
              decide whether a tutoring model is following the structure of a
              problem or matching its surface.
            </p>
          </div>

          <div className="mt-8 rounded-xl border border-line bg-mist/50 p-4">
            {cell ? (
              <div className="font-mono text-[0.75rem] leading-relaxed">
                <div className="flex justify-between text-ink-600/60">
                  <span>query[{cell.i}]</span>
                  <span className="text-ink-900">{TOKENS[cell.i]}</span>
                </div>
                <div className="mt-1 flex justify-between text-ink-600/60">
                  <span>key[{cell.j}]</span>
                  <span className="text-ink-900">{TOKENS[cell.j]}</span>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
                  <span className="text-ink-600/60">weight</span>
                  <span className="tabular-nums text-turq-700">
                    {cell.j > cell.i ? "masked" : rows[cell.i][cell.j].toFixed(4)}
                  </span>
                </div>
              </div>
            ) : (
              <p className="font-mono text-[0.75rem] text-ink-600/45">
                hover a cell to read the weight
                <span className="ml-0.5 inline-block animate-blink">▍</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

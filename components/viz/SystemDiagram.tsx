"use client";

import { motion } from "motion/react";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 1.1, delay: 0.35 + i * 0.12, ease: [0.16, 1, 0.3, 1] as const }, opacity: { duration: 0.2, delay: 0.35 + i * 0.12 } },
  }),
};

const box = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

function Box({
  x, y, w, h, title, sub, i, tone = "line",
}: {
  x: number; y: number; w: number; h: number;
  title: string; sub?: string; i: number;
  tone?: "line" | "turq" | "ink";
}) {
  const fill = tone === "ink" ? "var(--color-ink-900)" : tone === "turq" ? "var(--color-turq-50)" : "#fff";
  const stroke = tone === "ink" ? "var(--color-ink-900)" : tone === "turq" ? "var(--color-turq-300)" : "var(--color-line-strong)";
  const text = tone === "ink" ? "#fff" : "var(--color-ink-900)";
  const subText = tone === "ink" ? "rgba(255,255,255,.55)" : "var(--color-ink-600)";

  return (
    <motion.g variants={box} custom={i} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-15%" }}>
      <rect x={x} y={y} width={w} height={h} rx={14} fill={fill} stroke={stroke} strokeWidth="1.4" />
      <text x={x + 18} y={y + (sub ? 30 : h / 2 + 4)} fill={text} className="font-display text-[15px] font-semibold">
        {title}
      </text>
      {sub && (
        <text x={x + 18} y={y + 50} fill={subText} className="font-mono text-[10px]">
          {sub}
        </text>
      )}
      {/* corner ticks */}
      {[[x, y, 1, 1], [x + w, y, -1, 1], [x, y + h, 1, -1], [x + w, y + h, -1, -1]].map(([cx, cy, dx, dy], k) => (
        <g key={k} stroke={stroke} strokeWidth="1.4">
          <line x1={cx} y1={cy} x2={cx + dx * 9} y2={cy} />
          <line x1={cx} y1={cy} x2={cx} y2={cy + dy * 9} />
        </g>
      ))}
    </motion.g>
  );
}

export function SystemDiagram() {
  return (
    <div className="no-scrollbar min-w-0 overflow-x-auto">
      <svg viewBox="0 0 980 600" className="block h-auto w-full min-w-[760px]" role="img" aria-label="Eullar system diagram: products sit on a shared core of representation, evaluation and control, which sits on a swappable model layer">
        <defs>
          <marker id="sd-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-turq-600)" />
          </marker>
          <pattern id="sd-hatch" width="7" height="7" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="7" stroke="var(--color-turq-200)" strokeWidth="2" />
          </pattern>
        </defs>

        {/* layer rules */}
        {[
          { y: 74, label: "L3 · surfaces" },
          { y: 258, label: "L2 · eullar core" },
          { y: 470, label: "L1 · inference" },
        ].map((l, i) => (
          <g key={l.label}>
            <motion.line
              x1={26} y1={l.y} x2={954} y2={l.y}
              stroke="var(--color-line)" strokeWidth="1" strokeDasharray="2 6"
              variants={draw} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}
            />
            <text x={26} y={l.y - 10} className="fill-ink-700/40 font-mono text-[9px] tracking-[0.16em] uppercase">
              {l.label}
            </text>
          </g>
        ))}

        {/* products */}
        <Box i={0} x={120} y={96} w={330} h={86} title="Syllabi" sub="teaching · learning · diagnostics" tone="turq" />
        <Box i={1} x={530} y={96} w={330} h={86} title="Reevue" sub="applicant feedback · portal embed" tone="turq" />

        {/* core */}
        <motion.rect
          variants={box} custom={2} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-15%" }}
          x={96} y={276} width={788} height={150} rx={20}
          fill="url(#sd-hatch)" fillOpacity="0.35" stroke="var(--color-turq-400)" strokeWidth="1.4"
        />
        <motion.text
          variants={box} custom={2} initial="hidden" whileInView="show" viewport={{ once: true }}
          x={114} y={266} className="fill-turq-700 font-mono text-[10px] tracking-[0.16em] uppercase"
        >
          shared core
        </motion.text>

        <Box i={3} x={120} y={306} w={228} h={90} title="Representation" sub="domain → graph" />
        <Box i={4} x={376} y={306} w={228} h={90} title="Evaluation" sub="measure the thing" />
        <Box i={5} x={632} y={306} w={228} h={90} title="Control" sub="override · audit" />

        {/* model layer */}
        <Box i={6} x={96} y={492} w={788} h={78} title="Model layer" sub="swappable providers · region-pinned or self-hosted inference" tone="ink" />

        {/* connectors: core → products */}
        {[
          "M 285 276 L 285 182",
          "M 695 276 L 695 182",
        ].map((d, i) => (
          <motion.path
            key={d} d={d} fill="none" stroke="var(--color-turq-600)" strokeWidth="1.6"
            markerEnd="url(#sd-arrow)"
            variants={draw} custom={i + 3} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-15%" }}
          />
        ))}

        {/* connectors: model → core */}
        {[220, 490, 760].map((x, i) => (
          <motion.path
            key={x} d={`M ${x} 492 L ${x} 426`} fill="none" stroke="var(--color-line-strong)" strokeWidth="1.4"
            strokeDasharray="5 5" markerEnd="url(#sd-arrow)"
            variants={draw} custom={i + 5} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-15%" }}
          />
        ))}

        {/* flowing packets on the product connectors */}
        {[285, 695].map((x) => (
          <motion.circle
            key={`p-${x}`} cx={x} r="3.5" fill="var(--color-turq-500)"
            initial={{ cy: 276, opacity: 0 }}
            whileInView={{ cy: [276, 186], opacity: [0, 1, 1, 0] }}
            viewport={{ once: false }}
            transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 0.6, ease: "linear", delay: x === 695 ? 0.9 : 0 }}
          />
        ))}

        {/* annotations */}
        {[
          { x: 872, y: 340, tx: 902, label: "override is a", label2: "first-class action" },
          { x: 348, y: 352, tx: 60, label: "curricula and role", label2: "criteria, as graphs", anchor: "end" as const },
        ].map((a, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 1.1 + i * 0.15, duration: 0.5 }}
          >
            <line x1={a.x} y1={a.y} x2={a.tx} y2={a.y} stroke="var(--color-turq-400)" strokeWidth="1" strokeDasharray="2 3" />
            <circle cx={a.x} cy={a.y} r="2.5" fill="var(--color-turq-500)" />
            <text x={a.tx + (a.anchor === "end" ? -6 : 6)} y={a.y - 3} textAnchor={a.anchor ?? "start"} className="fill-ink-700/70 font-mono text-[9.5px]">
              {a.label}
            </text>
            <text x={a.tx + (a.anchor === "end" ? -6 : 6)} y={a.y + 10} textAnchor={a.anchor ?? "start"} className="fill-ink-700/70 font-mono text-[9.5px]">
              {a.label2}
            </text>
          </motion.g>
        ))}

        {/* dimension line */}
        <g stroke="var(--color-line-strong)" strokeWidth="1">
          <line x1={62} y1={96} x2={62} y2={570} />
          <line x1={56} y1={96} x2={68} y2={96} />
          <line x1={56} y1={570} x2={68} y2={570} />
        </g>
        <text x={52} y={340} textAnchor="middle" transform="rotate(-90 52 340)" className="fill-ink-700/35 font-mono text-[9px] tracking-[0.16em] uppercase">
          one stack
        </text>
      </svg>
    </div>
  );
}

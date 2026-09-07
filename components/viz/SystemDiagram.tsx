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
  x, y, w, h, title, sub, i, tone = "line", active = false,
}: {
  x: number; y: number; w: number; h: number;
  title: string; sub?: string; i: number;
  tone?: "line" | "turq" | "ink";
  active?: boolean;
}) {
  const fill = tone === "ink" ? "var(--ink)" : tone === "turq" ? "var(--accent-soft)" : "#fff";
  const stroke = tone === "ink" ? "var(--ink)" : tone === "turq" ? "var(--accent)" : "var(--line-2)";
  const text = tone === "ink" ? "#fff" : "var(--ink)";
  const subText = tone === "ink" ? "rgba(255,255,255,.55)" : "var(--dim)";

  return (
    <motion.g variants={box} custom={i} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-15%" }}>
      <rect
        x={x} y={y} width={w} height={h} rx={14}
        fill={active ? "var(--accent-soft)" : fill}
        stroke={active ? "var(--accent)" : stroke}
        strokeWidth={active ? 2 : 1.4}
        style={{ transition: "fill .5s, stroke .5s, stroke-width .5s" }}
      />
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

export function SystemDiagram({ active = -1 }: { active?: number } = {}) {
  return (
    <div className="no-scrollbar min-w-0 overflow-x-auto">
      <svg viewBox="0 0 980 600" className="block h-auto w-full min-w-[760px]" role="img" aria-label="Eullar system diagram: products sit on a shared core of representation, evaluation and control, which sits on a swappable model layer">
        <defs>
          <marker id="sd-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" />
          </marker>
          <pattern id="sd-hatch" width="7" height="7" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="7" stroke="var(--accent-soft)" strokeWidth="2" />
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
              stroke="var(--line)" strokeWidth="1" strokeDasharray="2 6"
              variants={draw} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}
            />
            <text x={26} y={l.y - 10} className="fill-faint font-mono text-[9px] tracking-[0.16em] uppercase">
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
          fill="url(#sd-hatch)" fillOpacity="0.35" stroke="var(--accent)" strokeWidth="1.4"
        />
        <motion.text
          variants={box} custom={2} initial="hidden" whileInView="show" viewport={{ once: true }}
          x={114} y={266} className="fill-accent font-mono text-[10px] tracking-[0.16em] uppercase"
        >
          shared core
        </motion.text>

        <Box i={3} x={120} y={306} w={228} h={90} title="Representation" sub="domain → graph" active={active === 0} />
        <Box i={4} x={376} y={306} w={228} h={90} title="Evaluation" sub="measure the thing" active={active === 1} />
        <Box i={5} x={632} y={306} w={228} h={90} title="Control" sub="override · audit" active={active === 2} />

        {/* model layer */}
        <Box i={6} x={96} y={492} w={788} h={78} title="Model layer" sub="swappable providers · region-pinned or self-hosted inference" tone="ink" />

        {/* connectors: core → products */}
        {[
          "M 285 276 L 285 182",
          "M 695 276 L 695 182",
        ].map((d, i) => (
          <motion.path
            key={d} d={d} fill="none" stroke="var(--accent)" strokeWidth="1.6"
            markerEnd="url(#sd-arrow)"
            variants={draw} custom={i + 3} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-15%" }}
          />
        ))}

        {/* connectors: model → core */}
        {[220, 490, 760].map((x, i) => (
          <motion.path
            key={x} d={`M ${x} 492 L ${x} 426`} fill="none" stroke="var(--line-2)" strokeWidth="1.4"
            strokeDasharray="5 5" markerEnd="url(#sd-arrow)"
            variants={draw} custom={i + 5} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-15%" }}
          />
        ))}

        {/* flowing packets on the product connectors */}
        {[285, 695].map((x) => (
          <motion.circle
            key={`p-${x}`} cx={x} r="3.5" fill="var(--accent)"
            initial={{ cy: 276, opacity: 0 }}
            whileInView={{ cy: [276, 186], opacity: [0, 1, 1, 0] }}
            viewport={{ once: false }}
            transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 0.6, ease: "linear", delay: x === 695 ? 0.9 : 0 }}
          />
        ))}

        {/* annotations */}
        {[
          { x: 746, y: 396, tx: 746, label: "override is a", label2: "first-class action", below: true },
          { x: 234, y: 396, tx: 234, label: "curricula and role", label2: "criteria, as graphs", below: true },
        ].map((a, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 1.1 + i * 0.15, duration: 0.5 }}
          >
            {a.below ? (
              <>
                <line x1={a.x} y1={a.y} x2={a.x} y2={a.y + 44} stroke="var(--accent)" strokeWidth="1" strokeDasharray="2 3" />
                <circle cx={a.x} cy={a.y} r="2.5" fill="var(--accent)" />
                <text x={a.x + 8} y={a.y + 44} className="fill-dim font-mono text-[9.5px]">{a.label}</text>
                <text x={a.x + 8} y={a.y + 57} className="fill-dim font-mono text-[9.5px]">{a.label2}</text>
              </>
            ) : (
              <>
                <line x1={a.x} y1={a.y} x2={a.tx} y2={a.y} stroke="var(--accent)" strokeWidth="1" strokeDasharray="2 3" />
                <circle cx={a.x} cy={a.y} r="2.5" fill="var(--accent)" />
                <text x={a.tx + 6} y={a.y - 3} className="fill-dim font-mono text-[9.5px]">{a.label}</text>
                <text x={a.tx + 6} y={a.y + 10} className="fill-dim font-mono text-[9.5px]">{a.label2}</text>
              </>
            )}
          </motion.g>
        ))}

        {/* dimension line */}
        <g stroke="var(--line-2)" strokeWidth="1">
          <line x1={40} y1={96} x2={40} y2={570} />
          <line x1={34} y1={96} x2={46} y2={96} />
          <line x1={34} y1={570} x2={46} y2={570} />
        </g>
        <text x={28} y={340} textAnchor="middle" transform="rotate(-90 28 340)" className="fill-faint font-mono text-[9px] tracking-[0.16em] uppercase">
          one stack
        </text>
      </svg>
    </div>
  );
}

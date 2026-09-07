"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Three slow, overlapping blooms. Cheap (three blurred divs), and it stops the
 * dark ground from reading as a flat rectangle.
 */
export function Aurora() {
  const reduce = useReducedMotion();

  const blobs = [
    { c: "var(--accent)", size: "44rem", x: "12%", y: "18%", d: 0, o: 0.3 },
    { c: "var(--clay)", size: "34rem", x: "72%", y: "26%", d: 3.5, o: 0.16 },
    { c: "var(--accent-2)", size: "38rem", x: "52%", y: "76%", d: 7, o: 0.22 },
  ];

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[110px]"
          style={{
            width: b.size,
            height: b.size,
            left: b.x,
            top: b.y,
            translateX: "-50%",
            translateY: "-50%",
            background: `radial-gradient(circle, ${b.c}, transparent 66%)`,
            opacity: b.o,
          }}
          animate={
            reduce
              ? undefined
              : { x: [0, 34, -22, 0], y: [0, -28, 18, 0], scale: [1, 1.08, 0.96, 1] }
          }
          transition={{ duration: 26 + i * 6, delay: b.d, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

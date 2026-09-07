"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Aurora } from "@/components/viz/Aurora";
import { LatentField } from "@/components/viz/LatentField";
import { Button } from "./Button";
import { Eyebrow } from "./Bits";
import { Wrap } from "./Skin";

const READOUTS = [
  ["products in field", "02"],
  ["decision authority", "human"],
  ["model layer", "swappable"],
  ["origin", "5.60°N 0.19°W"],
] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const fieldY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const fieldScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);

  const s = reduce ? {} : { y: textY, opacity: textOpacity };
  const f = reduce ? {} : { y: fieldY, scale: fieldScale };

  return (
    <section
      ref={ref}
      data-skin="ink"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-surface pb-16 pt-28 text-ink"
    >
      <Aurora />
      <motion.div style={f} className="absolute inset-0">
        <div className="rule-grid absolute inset-0 mask-radial opacity-70" />
        <LatentField />
      </motion.div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-surface to-transparent" />

      <Wrap className="relative">
        <motion.div style={s}>
          <Eyebrow>Eullar Labs · applied AI research · Accra</Eyebrow>

          <h1 className="display-xl mt-8 max-w-[16ch]">
            <Line delay={0.05}>AI that has to</Line>
            <Line delay={0.14}>work on a</Line>
            <Line delay={0.23}>
              <span className="relative text-accent">
                Tuesday morning
                <motion.svg
                  className="absolute -bottom-1 left-0 w-full sm:-bottom-3"
                  viewBox="0 0 400 14"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.05, duration: 0.5 }}
                >
                  <motion.path
                    d="M3 9C70 4 150 2.5 236 5.5c48 1.7 96 3.6 161 2"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1.05, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  />
                </motion.svg>
              </span>
              .
            </Line>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 max-w-xl text-[1.0625rem] leading-relaxed text-dim sm:text-lg"
          >
            Eullar Labs builds practical AI tools and publishes what it learns
            making them. Two are in the field today —{" "}
            <Link href="/products/syllabi" className="text-ink underline decoration-accent/60 decoration-2 underline-offset-4 transition-colors hover:text-accent">
              Syllabi
            </Link>{" "}
            for teaching and learning, and{" "}
            <Link href="/products/reevue" className="text-ink underline decoration-accent/60 decoration-2 underline-offset-4 transition-colors hover:text-accent">
              Reevue
            </Link>{" "}
            for applicant feedback.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button href="/contact">Request access</Button>
            <Button href="/research" variant="secondary">Read the research</Button>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 1 }}
            className="mt-14 grid max-w-4xl grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-7 sm:grid-cols-4"
          >
            {READOUTS.map(([k, v]) => (
              <div key={k}>
                <dt className="mono-label text-faint">{k}</dt>
                <dd className="mt-2 font-display text-lg text-ink">{v}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </Wrap>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="pointer-events-none absolute bottom-8 right-8 hidden flex-col items-center gap-2.5 lg:flex"
      >
        <span className="mono-label text-faint">scroll</span>
        <motion.span
          className="h-12 w-px bg-gradient-to-b from-accent to-transparent"
          animate={reduce ? undefined : { scaleY: [0.4, 1, 0.4], originY: 0 }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}

function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  /* The display face is set at line-height 0.92, so the line box is shorter
     than the glyphs. Pad the mask and pull it back with a negative margin,
     otherwise overflow-hidden crops the ascenders and descenders. */
  return (
    <span className="-mb-[0.22em] -mt-[0.16em] block overflow-hidden pb-[0.22em] pt-[0.16em]">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ delay, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

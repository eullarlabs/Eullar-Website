"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  animate,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  A section that pins while its steps advance                               */
/* -------------------------------------------------------------------------- */

export function PinnedScene({
  count,
  vh = 300,
  className,
  children,
}: {
  count: number;
  vh?: number;
  className?: string;
  children: (state: { index: number; progress: MotionValue<number> }) => ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.max(0, Math.min(count - 1, Math.floor(v * count * 0.999)));
    setIndex(next);
  });

  return (
    <div ref={ref} style={{ height: `${vh}vh` }} className={cn("relative", className)}>
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="w-full">{children({ index, progress: scrollYProgress })}</div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Vertical scroll drives a horizontal rail                                  */
/* -------------------------------------------------------------------------- */

export function Rail({
  children,
  vh = 320,
  className,
}: {
  children: ReactNode;
  vh?: number;
  className?: string;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const measure = () => {
      const t = track.current;
      if (!t) return;
      setDistance(Math.max(0, t.scrollWidth - window.innerWidth + 48));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: outer,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const smooth = useSpring(x, { stiffness: 120, damping: 28, mass: 0.4 });

  return (
    <div ref={outer} style={{ height: `${vh}vh` }} className={cn("relative", className)}>
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <motion.div ref={track} style={{ x: smooth }} className="flex gap-5 pl-6 will-change-transform">
          {children}
        </motion.div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Marquee whose speed and direction follow scroll velocity                  */
/* -------------------------------------------------------------------------- */

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

export function VelocityMarquee({
  items,
  baseVelocity = 2.2,
  className,
}: {
  items: readonly string[];
  baseVelocity?: number;
  className?: string;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smooth = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1200], [1, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    let move = direction.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    move += direction.current * move * Math.abs(f);
    baseX.set(baseX.get() + move);
  });

  const row = [...items, ...items, ...items, ...items];

  return (
    <div className={cn("mask-x relative flex overflow-hidden", className)}>
      <motion.div className="flex flex-nowrap whitespace-nowrap" style={{ x }}>
        {row.map((t, i) => (
          <span key={`${t}-${i}`} className="mono-label flex items-center gap-7 pr-7 text-faint">
            {t}
            <span className="text-accent/60">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Odds and ends                                                             */
/* -------------------------------------------------------------------------- */

export function Parallax({
  children,
  distance = 90,
  className,
}: {
  children: ReactNode;
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

export function Counter({
  to,
  suffix = "",
  decimals = 0,
  className,
}: {
  to: number;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, to, decimals]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {display}
      {suffix}
    </span>
  );
}

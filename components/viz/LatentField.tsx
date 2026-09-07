"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  seed: number;
  charge: number;
};

type Pulse = { a: number; b: number; t: number; speed: number };

/**
 * A drifting graph of nodes in a slow curl flow field. Edges form between
 * neighbours; the pointer acts as a local attractor and links to whatever
 * falls inside its radius. Pulses travel along edges to suggest message
 * passing. Everything is drawn on one canvas at device resolution.
 */
export function LatentField({
  className,
  density = 1,
  interactive = true,
}: {
  className?: string;
  density?: number;
  interactive?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let raf = 0;
    let running = true;

    const pointer = { x: -9999, y: -9999, active: false, strength: 0 };

    const LINK_DIST = () => Math.min(170, Math.max(96, w * 0.11));
    const POINTER_DIST = 200;

    function build() {
      const rect = canvas!.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const area = w * h;
      const count = Math.round(
        Math.min(120, Math.max(26, (area / 15500) * density)),
      );

      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: Math.random() < 0.12 ? 3.1 + Math.random() * 1.6 : 1.1 + Math.random() * 1.3,
        seed: Math.random() * 1000,
        charge: i % 7 === 0 ? 1 : 0,
      }));
      pulses = [];
    }

    function flow(x: number, y: number, time: number) {
      // cheap curl-ish field: two out-of-phase sinusoids
      const s = 0.0022;
      const a = Math.sin(x * s + time * 0.00022) + Math.cos(y * s * 1.3 - time * 0.00017);
      const b = Math.cos(x * s * 1.1 - time * 0.00019) + Math.sin(y * s - time * 0.00023);
      return { fx: a * 0.014, fy: b * 0.014 };
    }

    function step(time: number) {
      if (!running) return;
      ctx!.clearRect(0, 0, w, h);

      const link = LINK_DIST();

      // integrate
      for (const n of nodes) {
        if (!reduced) {
          const f = flow(n.x, n.y, time);
          n.vx += f.fx;
          n.vy += f.fy;

          if (pointer.active) {
            const dx = pointer.x - n.x;
            const dy = pointer.y - n.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < POINTER_DIST * POINTER_DIST && d2 > 1) {
              const d = Math.sqrt(d2);
              const pull = (1 - d / POINTER_DIST) * 0.055;
              n.vx += (dx / d) * pull;
              n.vy += (dy / d) * pull;
            }
          }

          n.vx *= 0.965;
          n.vy *= 0.965;
          n.x += n.vx;
          n.y += n.vy;
        }

        // wrap
        if (n.x < -20) n.x = w + 20;
        if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        if (n.y > h + 20) n.y = -20;
      }

      // edges
      ctx!.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > link * link) continue;
          const d = Math.sqrt(d2);
          const alpha = (1 - d / link) * 0.42;
          ctx!.strokeStyle = `rgba(18, 173, 161, ${alpha})`;
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(b.x, b.y);
          ctx!.stroke();

          if (!reduced && Math.random() < 0.00035 && pulses.length < 26) {
            pulses.push({ a: i, b: j, t: 0, speed: 0.012 + Math.random() * 0.02 });
          }
        }
      }

      // pointer links
      if (pointer.active && interactive) {
        for (const n of nodes) {
          const dx = pointer.x - n.x;
          const dy = pointer.y - n.y;
          const d = Math.hypot(dx, dy);
          if (d > POINTER_DIST) continue;
          const alpha = (1 - d / POINTER_DIST) * 0.55 * pointer.strength;
          ctx!.strokeStyle = `rgba(10, 139, 130, ${alpha})`;
          ctx!.lineWidth = 1;
          ctx!.beginPath();
          ctx!.moveTo(pointer.x, pointer.y);
          ctx!.lineTo(n.x, n.y);
          ctx!.stroke();
        }

        // pointer reticle
        const R = 22 + Math.sin(time * 0.004) * 2.5;
        ctx!.strokeStyle = `rgba(10, 139, 130, ${0.35 * pointer.strength})`;
        ctx!.beginPath();
        ctx!.arc(pointer.x, pointer.y, R, 0, Math.PI * 2);
        ctx!.stroke();
        ctx!.beginPath();
        ctx!.moveTo(pointer.x - R - 8, pointer.y);
        ctx!.lineTo(pointer.x - R + 4, pointer.y);
        ctx!.moveTo(pointer.x + R - 4, pointer.y);
        ctx!.lineTo(pointer.x + R + 8, pointer.y);
        ctx!.stroke();
      }

      // pulses
      pulses = pulses.filter((p) => p.t < 1);
      for (const p of pulses) {
        p.t += p.speed;
        const a = nodes[p.a];
        const b = nodes[p.b];
        if (!a || !b) continue;
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        const fade = Math.sin(p.t * Math.PI);
        ctx!.fillStyle = `rgba(49, 198, 186, ${fade * 0.95})`;
        ctx!.beginPath();
        ctx!.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx!.fill();
      }

      // nodes
      for (const n of nodes) {
        const breathe = reduced ? 1 : 1 + Math.sin(time * 0.0016 + n.seed) * 0.16;
        const r = n.r * breathe;

        if (n.charge) {
          ctx!.fillStyle = "rgba(49, 198, 186, 0.14)";
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, r * 4.2, 0, Math.PI * 2);
          ctx!.fill();
        }

        ctx!.fillStyle = n.charge
          ? "rgba(10, 139, 130, 0.95)"
          : "rgba(13, 58, 60, 0.55)";
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx!.fill();
      }

      raf = requestAnimationFrame(step);
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
      pointer.strength = Math.min(1, pointer.strength + 0.15);
    };
    const onPointerLeave = () => {
      pointer.active = false;
      pointer.strength = 0;
    };

    const ro = new ResizeObserver(() => build());
    ro.observe(canvas);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(step);
        } else if (!entry.isIntersecting) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const parent = canvas.parentElement ?? canvas;
    parent.addEventListener("pointermove", onPointerMove, { passive: true });
    parent.addEventListener("pointerleave", onPointerLeave, { passive: true });

    build();
    raf = requestAnimationFrame(step);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      parent.removeEventListener("pointermove", onPointerMove);
      parent.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [density, interactive]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("size-full", className)}
    />
  );
}

"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Node = { x: number; y: number; vx: number; vy: number; r: number; seed: number; hub: number };
type Pulse = { a: number; b: number; t: number; speed: number };

/** "#5fd4c3" -> "95,212,195" so we can build rgba() strings with live alpha. */
function rgbTriplet(hex: string, fallback: string) {
  const h = hex.trim().replace("#", "");
  if (h.length !== 6 && h.length !== 3) return fallback;
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  if (Number.isNaN(n)) return fallback;
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
}

/**
 * A drifting graph in a slow curl field. The pointer is an attractor and links
 * to whatever falls inside its radius; pulses travel edges to suggest message
 * passing. Colours are read from the surrounding skin, so the same component
 * works on ink and on paper.
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

    let w = 0, h = 0, dpr = 1, raf = 0, running = true;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let accent = "95,212,195";
    let ink = "239,237,228";

    const pointer = { x: -9999, y: -9999, active: false, strength: 0 };
    const LINK = () => Math.min(190, Math.max(104, w * 0.115));
    const REACH = 220;

    function readSkin() {
      const cs = getComputedStyle(canvas!);
      accent = rgbTriplet(cs.getPropertyValue("--accent"), accent);
      ink = rgbTriplet(cs.getPropertyValue("--ink"), ink);
    }

    function build() {
      const rect = canvas!.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      if (w === 0 || h === 0) return;
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      readSkin();

      const count = Math.round(Math.min(130, Math.max(24, ((w * h) / 15000) * density)));
      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.14,
        vy: (Math.random() - 0.5) * 0.14,
        r: Math.random() < 0.11 ? 3 + Math.random() * 1.8 : 0.9 + Math.random() * 1.4,
        seed: Math.random() * 1000,
        hub: i % 8 === 0 ? 1 : 0,
      }));
      pulses = [];
    }

    function flow(x: number, y: number, t: number) {
      const s = 0.0021;
      return {
        fx: (Math.sin(x * s + t * 0.00021) + Math.cos(y * s * 1.3 - t * 0.00016)) * 0.013,
        fy: (Math.cos(x * s * 1.1 - t * 0.00018) + Math.sin(y * s - t * 0.00022)) * 0.013,
      };
    }

    function step(time: number) {
      if (!running) return;
      ctx!.clearRect(0, 0, w, h);
      const link = LINK();

      for (const n of nodes) {
        if (!reduced) {
          const f = flow(n.x, n.y, time);
          n.vx += f.fx;
          n.vy += f.fy;

          if (pointer.active) {
            const dx = pointer.x - n.x, dy = pointer.y - n.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < REACH * REACH && d2 > 1) {
              const d = Math.sqrt(d2);
              const pull = (1 - d / REACH) * 0.06;
              n.vx += (dx / d) * pull;
              n.vy += (dy / d) * pull;
            }
          }
          n.vx *= 0.962;
          n.vy *= 0.962;
          n.x += n.vx;
          n.y += n.vy;
        }
        if (n.x < -24) n.x = w + 24;
        if (n.x > w + 24) n.x = -24;
        if (n.y < -24) n.y = h + 24;
        if (n.y > h + 24) n.y = -24;
      }

      ctx!.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > link * link) continue;
          const d = Math.sqrt(d2);
          ctx!.strokeStyle = `rgba(${accent},${(1 - d / link) * 0.3})`;
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(b.x, b.y);
          ctx!.stroke();

          if (!reduced && Math.random() < 0.0004 && pulses.length < 22) {
            pulses.push({ a: i, b: j, t: 0, speed: 0.011 + Math.random() * 0.018 });
          }
        }
      }

      if (pointer.active && interactive) {
        for (const n of nodes) {
          const d = Math.hypot(pointer.x - n.x, pointer.y - n.y);
          if (d > REACH) continue;
          ctx!.strokeStyle = `rgba(${accent},${(1 - d / REACH) * 0.6 * pointer.strength})`;
          ctx!.beginPath();
          ctx!.moveTo(pointer.x, pointer.y);
          ctx!.lineTo(n.x, n.y);
          ctx!.stroke();
        }
        const R = 24 + Math.sin(time * 0.004) * 3;
        ctx!.strokeStyle = `rgba(${accent},${0.4 * pointer.strength})`;
        ctx!.beginPath();
        ctx!.arc(pointer.x, pointer.y, R, 0, Math.PI * 2);
        ctx!.stroke();
        ctx!.beginPath();
        ctx!.moveTo(pointer.x - R - 9, pointer.y);
        ctx!.lineTo(pointer.x - R + 5, pointer.y);
        ctx!.moveTo(pointer.x + R - 5, pointer.y);
        ctx!.lineTo(pointer.x + R + 9, pointer.y);
        ctx!.stroke();
      }

      pulses = pulses.filter((p) => p.t < 1);
      for (const p of pulses) {
        p.t += p.speed;
        const a = nodes[p.a], b = nodes[p.b];
        if (!a || !b) continue;
        ctx!.fillStyle = `rgba(${accent},${Math.sin(p.t * Math.PI)})`;
        ctx!.beginPath();
        ctx!.arc(a.x + (b.x - a.x) * p.t, a.y + (b.y - a.y) * p.t, 1.9, 0, Math.PI * 2);
        ctx!.fill();
      }

      for (const n of nodes) {
        const breathe = reduced ? 1 : 1 + Math.sin(time * 0.0015 + n.seed) * 0.18;
        const r = n.r * breathe;
        if (n.hub) {
          ctx!.fillStyle = `rgba(${accent},0.11)`;
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, r * 4.6, 0, Math.PI * 2);
          ctx!.fill();
        }
        ctx!.fillStyle = n.hub ? `rgba(${accent},0.95)` : `rgba(${ink},0.3)`;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx!.fill();
      }

      raf = requestAnimationFrame(step);
    }

    const onMove = (e: PointerEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
      pointer.strength = Math.min(1, pointer.strength + 0.14);
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.strength = 0;
    };

    const ro = new ResizeObserver(build);
    ro.observe(canvas);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(step);
        } else if (!e.isIntersecting) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const parent = canvas.parentElement ?? canvas;
    parent.addEventListener("pointermove", onMove, { passive: true });
    parent.addEventListener("pointerleave", onLeave, { passive: true });

    build();
    raf = requestAnimationFrame(step);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
    };
  }, [density, interactive]);

  return <canvas ref={canvasRef} aria-hidden className={cn("size-full", className)} />;
}

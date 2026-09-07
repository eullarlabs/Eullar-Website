"use client";

import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "quiet";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-[#06100f] px-6 py-3.5 hover:bg-ink hover:text-surface",
  secondary:
    "border border-line-2 text-ink px-6 py-3.5 hover:border-accent hover:text-accent",
  quiet: "text-dim px-3 py-2 hover:text-ink",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  magnetic = true,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  magnetic?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const reduce = useReducedMotion();

  const onMove = (e: React.MouseEvent) => {
    if (!magnetic || reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setOffset({
      x: (e.clientX - (r.left + r.width / 2)) * 0.16,
      y: (e.clientY - (r.top + r.height / 2)) * 0.26,
    });
  };

  return (
    <Link
      ref={ref}
      href={href}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2.5 rounded-full text-[0.9375rem] font-medium transition-colors duration-400",
        variants[variant],
        className,
      )}
      onMouseMove={onMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition:
          offset.x === 0 && offset.y === 0
            ? "transform .55s cubic-bezier(.34,1.56,.64,1), background-color .4s, color .4s, border-color .4s"
            : "transform .08s linear",
      }}
    >
      <span className="relative">{children}</span>
      <svg
        viewBox="0 0 16 16"
        className="size-3.5 transition-transform duration-400 group-hover:translate-x-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M2 8h11M9 4l4 4-4 4" />
      </svg>
    </Link>
  );
}

export function TickLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "mono-label group inline-flex items-center gap-2 text-accent transition-colors hover:text-ink",
        className,
      )}
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-all duration-500 group-hover:w-full" />
      </span>
      <span aria-hidden className="text-sm leading-none">↗</span>
    </Link>
  );
}

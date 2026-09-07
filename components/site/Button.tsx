"use client";

import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "onDark";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full text-[0.9375rem] font-medium transition-[background,color,border-color,box-shadow] duration-300 will-change-transform";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink-900 text-white px-6 py-3 hover:bg-turq-600 shadow-[0_1px_0_0_rgba(255,255,255,0.15)_inset,0_10px_30px_-12px_rgba(4,25,27,0.6)]",
  secondary:
    "bg-white text-ink-900 px-6 py-3 border border-line-strong hover:border-turq-400 hover:text-turq-700 hover:shadow-[0_10px_30px_-16px_rgba(18,173,161,0.7)]",
  ghost:
    "text-ink-700 px-3 py-2 hover:text-turq-600",
  onDark:
    "bg-turq-400 text-ink-950 px-6 py-3 hover:bg-turq-300 shadow-[0_10px_36px_-14px_rgba(49,198,186,0.9)]",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  magnetic = true,
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  magnetic?: boolean;
  external?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const reduce = useReducedMotion();

  const onMove = (e: React.MouseEvent) => {
    if (!magnetic || reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    setOffset({ x: x * 0.18, y: y * 0.28 });
  };

  const Inner = (
    <>
      <span className="relative z-10">{children}</span>
      <svg
        viewBox="0 0 16 16"
        className="relative z-10 size-3.5 transition-transform duration-300 group-hover:translate-x-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M2 8h11M9 4l4 4-4 4" />
      </svg>
    </>
  );

  const props = {
    ref,
    className: cn(base, variants[variant], className),
    onMouseMove: onMove,
    onMouseLeave: () => setOffset({ x: 0, y: 0 }),
    style: {
      transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
      transition: offset.x === 0 && offset.y === 0 ? "transform .5s cubic-bezier(.34,1.56,.64,1)" : "transform .08s linear",
    } as React.CSSProperties,
  };

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" {...props}>
        {Inner}
      </a>
    );
  }

  return (
    <Link href={href} {...props}>
      {Inner}
    </Link>
  );
}

/** A small, dense, technical-looking link. */
export function TickLink({
  href,
  children,
  className,
  onDark = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 mono-label transition-colors",
        onDark
          ? "text-turq-300 hover:text-white"
          : "text-turq-700 hover:text-ink-900",
        className,
      )}
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-all duration-400 group-hover:w-full" />
      </span>
      <motion.span aria-hidden className="text-base leading-none">
        ↗
      </motion.span>
    </Link>
  );
}

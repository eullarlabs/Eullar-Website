import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
  dot = true,
}: {
  children: ReactNode;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span className={cn("mono-label inline-flex items-center gap-2.5 text-accent", className)}>
      {dot && (
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ring rounded-full bg-current" />
          <span className="relative inline-flex size-1.5 rounded-full bg-current" />
        </span>
      )}
      {children}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lede,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn(align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="display-l mt-6">{title}</h2>
      {lede && (
        <p className="mt-6 text-[1.0625rem] leading-relaxed text-dim sm:text-lg">
          {lede}
        </p>
      )}
    </div>
  );
}

/** A bordered technical panel with crop marks and an optional label. */
export function Frame({
  children,
  className,
  label,
}: {
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <div className={cn("relative rounded-2xl border border-line bg-surface-2", className)}>
      {(
        [
          ["-top-px -left-px", "left-0", "top-0"],
          ["-top-px -right-px", "right-0", "top-0"],
          ["-bottom-px -left-px", "left-0", "bottom-0"],
          ["-bottom-px -right-px", "right-0", "bottom-0"],
        ] as const
      ).map(([pos, hx, vy], i) => (
        <span key={i} className={cn("pointer-events-none absolute", pos)} aria-hidden>
          <span className={cn("absolute block h-px w-3 bg-accent/50", hx)} />
          <span className={cn("absolute block h-3 w-px bg-accent/50", hx, vy)} />
        </span>
      ))}
      {label && (
        <span className="mono-label absolute -top-2 left-6 bg-surface px-2 text-accent">
          {label}
        </span>
      )}
      {children}
    </div>
  );
}

export function Pill({
  children,
  tone = "accent",
  className,
}: {
  children: ReactNode;
  tone?: "accent" | "clay" | "iris" | "quiet";
  className?: string;
}) {
  const tones = {
    accent: "border-accent/30 bg-accent-soft text-accent",
    clay: "border-clay/35 bg-clay/10 text-clay",
    iris: "border-iris/35 bg-[var(--iris-soft)] text-iris",
    quiet: "border-line-2 bg-surface-2 text-dim",
  } as const;
  return (
    <span
      className={cn(
        "mono-label inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
  onDark = false,
  dot = true,
}: {
  children: ReactNode;
  className?: string;
  onDark?: boolean;
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 mono-label",
        onDark ? "text-turq-300/90" : "text-turq-700",
        className,
      )}
    >
      {dot && (
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-current" />
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
  onDark = false,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  onDark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl",
        className,
      )}
    >
      {eyebrow && <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          "mt-5 text-[clamp(1.9rem,4.2vw,3.25rem)] font-semibold leading-[1.05]",
          onDark ? "text-white" : "text-ink-900",
        )}
      >
        {title}
      </h2>
      {lede && (
        <p
          className={cn(
            "mt-5 text-[1.0625rem] leading-relaxed sm:text-lg",
            onDark ? "text-white/60" : "text-ink-600/85",
            align === "center" && "mx-auto",
          )}
        >
          {lede}
        </p>
      )}
    </div>
  );
}

/** A bordered technical panel with crop marks and an optional coordinate label. */
export function Frame({
  children,
  className,
  label,
  onDark = false,
}: {
  children: ReactNode;
  className?: string;
  label?: string;
  onDark?: boolean;
}) {
  const tick = onDark ? "bg-turq-400/60" : "bg-turq-500/60";
  return (
    <div
      className={cn(
        "relative rounded-2xl border",
        onDark ? "border-white/10 bg-white/[0.02]" : "border-line bg-white",
        className,
      )}
    >
      {(["-top-px -left-px", "-top-px -right-px", "-bottom-px -left-px", "-bottom-px -right-px"] as const).map(
        (pos, i) => (
          <span key={i} className={cn("pointer-events-none absolute", pos)} aria-hidden>
            <span className={cn("absolute block h-px w-3", tick, i % 2 ? "right-0" : "left-0")} />
            <span className={cn("absolute block h-3 w-px", tick, i > 1 ? "bottom-0" : "top-0", i % 2 ? "right-0" : "left-0")} />
          </span>
        ),
      )}
      {label && (
        <span
          className={cn(
            "absolute -top-2.5 left-6 px-2 mono-label",
            onDark ? "bg-ink-950 text-turq-300/80" : "bg-white text-turq-600",
          )}
        >
          {label}
        </span>
      )}
      {children}
    </div>
  );
}

export function Pill({
  children,
  tone = "turq",
  className,
}: {
  children: ReactNode;
  tone?: "turq" | "iris" | "neutral" | "amber";
  className?: string;
}) {
  const tones = {
    turq: "bg-turq-50 text-turq-700 border-turq-200/70",
    iris: "bg-iris-500/8 text-iris-500 border-iris-400/30",
    amber: "bg-amber-400/10 text-[#a06a08] border-amber-400/30",
    neutral: "bg-mist text-ink-600 border-line",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 mono-label text-[0.625rem]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Horizontal infinite ticker of technical strings. */
export function Marquee({
  items,
  onDark = false,
  reverse = false,
}: {
  items: readonly string[];
  onDark?: boolean;
  reverse?: boolean;
}) {
  const row = [...items, ...items];
  return (
    <div className="mask-x relative flex overflow-hidden py-1">
      <div
        className={cn(
          "flex shrink-0 items-center gap-8 pr-8",
          reverse ? "animate-marquee-rev" : "animate-marquee",
        )}
      >
        {row.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className={cn(
              "flex shrink-0 items-center gap-8 mono-label",
              onDark ? "text-white/40" : "text-ink-600/50",
            )}
          >
            {t}
            <span className={onDark ? "text-turq-400/60" : "text-turq-500/60"}>
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

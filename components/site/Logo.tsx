import { cn } from "@/lib/utils";

/**
 * The Eullar mark: the letter E drawn as a dependency graph —
 * a spine with three outbound edges and terminal nodes.
 */
export function LogoMark({
  className,
  animated = false,
}: {
  className?: string;
  animated?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      className={cn("size-7", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="eullar-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-turq-400)" />
          <stop offset="60%" stopColor="var(--color-turq-500)" />
          <stop offset="100%" stopColor="var(--color-turq-700)" />
        </linearGradient>
      </defs>
      <rect
        x="0.75"
        y="0.75"
        width="26.5"
        height="26.5"
        rx="8"
        fill="url(#eullar-mark)"
      />
      <g
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        className={animated ? "origin-center" : undefined}
      >
        <path d="M8.5 6.5V21.5" />
        <path d="M8.5 6.5H18.5" />
        <path d="M8.5 14H16" />
        <path d="M8.5 21.5H18.5" />
      </g>
      <g fill="white">
        <circle cx="18.6" cy="6.5" r="2.1" />
        <circle cx="16.1" cy="14" r="2.1" />
        <circle cx="18.6" cy="21.5" r="2.1" />
      </g>
      <circle
        cx="8.5"
        cy="14"
        r="2.4"
        fill="var(--color-turq-700)"
        stroke="white"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function Wordmark({
  className,
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      <span
        className={cn(
          "font-display text-[1.0625rem] font-semibold tracking-[-0.03em]",
          onDark ? "text-white" : "text-ink-900",
        )}
      >
        Eullar
        <span
          className={cn(
            "ml-1 font-mono text-[0.6rem] font-medium tracking-[0.18em] uppercase",
            onDark ? "text-turq-300/80" : "text-turq-600/80",
          )}
        >
          Labs
        </span>
      </span>
    </span>
  );
}

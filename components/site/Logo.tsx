import { cn } from "@/lib/utils";

/** The letter E drawn as a dependency graph: a spine, three edges, terminals. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={cn("size-7", className)} aria-hidden="true">
      <g
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        opacity="0.55"
      >
        <path d="M7.5 5.5V22.5" />
        <path d="M7.5 5.5H19" />
        <path d="M7.5 14H16.5" />
        <path d="M7.5 22.5H19" />
      </g>
      <g fill="currentColor">
        <circle cx="19.2" cy="5.5" r="2.3" />
        <circle cx="16.7" cy="14" r="2.3" />
        <circle cx="19.2" cy="22.5" r="2.3" />
        <circle cx="7.5" cy="14" r="2.7" />
      </g>
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark className="size-6 text-accent" />
      <span className="font-display text-[1.05rem] tracking-[-0.02em]">
        Eullar
        <span className="mono-label ml-1.5 align-[0.15em] text-[0.5rem] text-accent">
          LABS
        </span>
      </span>
    </span>
  );
}

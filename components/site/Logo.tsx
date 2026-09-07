import { cn } from "@/lib/utils";

/**
 * The Eullar mark: a Möbius band — one surface that returns to itself, running
 * from mint through blue to indigo, with the underside showing at the fold.
 *
 * The gradients and the clip live in <LogoDefs/>, rendered once per document by
 * the root layout, so repeating the mark costs one <svg> and no duplicate ids.
 *
 * Replacing this with the original artwork: drop the file into /public and
 * swap the <svg> below for an <img>. Nothing else references the geometry.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={cn("size-7", className)} aria-hidden="true">
      <g clipPath="url(#eu-ring)">
        <rect width="100" height="100" fill="url(#eu-band)" />
        <ellipse
          cx="52"
          cy="84"
          rx="52"
          ry="26"
          transform="rotate(-19 52 84)"
          fill="url(#eu-under)"
        />
      </g>
    </svg>
  );
}

/** Document-level gradient + clip definitions for the mark. Rendered once. */
export function LogoDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" className="absolute">
      <defs>
        <linearGradient id="eu-band" x1="8" y1="72" x2="93" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#AEE0DC" />
          <stop offset="0.18" stopColor="#83CFCB" />
          <stop offset="0.38" stopColor="#61A6CC" />
          <stop offset="0.58" stopColor="#5B7CCA" />
          <stop offset="0.8" stopColor="#7B79D7" />
          <stop offset="1" stopColor="#6560C4" />
        </linearGradient>
        <linearGradient id="eu-under" x1="28" y1="92" x2="86" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#4A45A6" />
          <stop offset="0.55" stopColor="#5A55B6" />
          <stop offset="1" stopColor="#7472D2" />
        </linearGradient>
        <clipPath id="eu-ring">
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            transform="rotate(-19 50 50)"
            d="M 6 50 a 44 29 0 1 0 88 0 a 44 29 0 1 0 -88 0 Z
               M 21 43 a 29 14.5 0 1 0 58 0 a 29 14.5 0 1 0 -58 0 Z"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark className="size-7" />
      <span className="font-display text-[1.05rem] tracking-[-0.02em]">
        Eullar
        <span className="mono-label ml-1.5 align-[0.15em] text-[0.5rem] text-iris">
          LABS
        </span>
      </span>
    </span>
  );
}

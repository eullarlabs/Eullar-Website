import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A band of the page in one of the two skins. Everything inside — including
 * the figures — re-tunes to it via CSS variables, so a figure never needs to
 * know which background it landed on.
 */
export function Skin({
  tone,
  children,
  className,
  id,
}: {
  tone: "ink" | "paper";
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      data-skin={tone}
      className={cn("relative bg-surface text-ink", className)}
    >
      {children}
    </section>
  );
}

export function Wrap({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[88rem] px-6 sm:px-8", className)}>
      {children}
    </div>
  );
}

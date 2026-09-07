import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  id,
  tone,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Omit to inherit the surrounding skin; set it to start a new band. */
  tone?: "ink" | "paper";
}) {
  return (
    <section
      id={id}
      data-skin={tone}
      className={cn("relative", tone && "bg-surface text-ink", className)}
    >
      <div className="mx-auto w-full max-w-[88rem] px-6 sm:px-8">{children}</div>
    </section>
  );
}

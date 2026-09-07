import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  id,
  bleed = false,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  bleed?: boolean;
}) {
  return (
    <section id={id} className={cn("relative", className)}>
      <div className={cn("mx-auto w-full", bleed ? "" : "max-w-[86rem] px-6")}>
        {children}
      </div>
    </section>
  );
}

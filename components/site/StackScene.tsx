"use client";

import { PinnedScene } from "@/components/motion/Scene";
import { SystemDiagram } from "@/components/viz/SystemDiagram";
import { Eyebrow } from "./Bits";
import { Wrap } from "./Skin";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    k: "Representation",
    t: "A curriculum and a job spec are the same kind of object.",
    d: "Both are dependency structures wearing different clothes. We extract them once — concepts and prerequisites, criteria and evidence — and the machinery above is shared.",
  },
  {
    k: "Evaluation",
    t: "Every deployment carries its own measure of success.",
    d: "Chosen before launch, reported after, and deliberately slower than the flattering proxy. Delayed recall rather than time-on-task; acted-on feedback rather than satisfaction.",
  },
  {
    k: "Control",
    t: "Override, audit and refusal are seams, not settings.",
    d: "A teacher rewrites a route; a hiring team blocks a message. Those actions are first-class in the architecture, which is why the products can be trusted with the cases that matter.",
  },
];

export function StackScene() {
  return (
    <div data-skin="paper" className="relative bg-surface text-ink">
      <div className="rule-grid absolute inset-0 opacity-70" />
      <PinnedScene count={3} vh={340} className="relative">
        {({ index }) => (
          <Wrap>
            <div className="grid items-center gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
              <div>
                <Eyebrow>Architecture</Eyebrow>
                <h2 className="display-l mt-5">
                  One stack,
                  <br />
                  two surfaces.
                </h2>

                <ol className="mt-9 space-y-1">
                  {STEPS.map((s, i) => (
                    <li key={s.k}>
                      <button
                        className={cn(
                          "block w-full border-l-2 py-3 pl-5 text-left transition-all duration-500",
                          i === index
                            ? "border-accent"
                            : "border-line",
                        )}
                        aria-current={i === index}
                      >
                        <span
                          className={cn(
                            "mono-label transition-colors duration-500",
                            i === index ? "text-accent" : "text-faint",
                          )}
                        >
                          {String(i + 1).padStart(2, "0")} · {s.k}
                        </span>
                        <span
                          className={cn(
                            "mt-2 block font-display text-[1.15rem] leading-snug transition-colors duration-500 sm:text-[1.3rem]",
                            i === index ? "text-ink" : "text-faint",
                          )}
                        >
                          {s.t}
                        </span>
                        <span
                          className={cn(
                            "grid transition-all duration-500",
                            i === index
                              ? "mt-2 grid-rows-[1fr] opacity-100"
                              : "grid-rows-[0fr] opacity-0",
                          )}
                        >
                          <span className="overflow-hidden">
                            <span className="block max-w-md text-[0.9375rem] leading-relaxed text-dim">
                              {s.d}
                            </span>
                          </span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="hidden rounded-3xl border border-line bg-surface-2/60 p-4 sm:p-6 lg:block">
                <SystemDiagram active={index} />
              </div>
            </div>
          </Wrap>
        )}
      </PinnedScene>
    </div>
  );
}

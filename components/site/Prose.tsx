import type { ReactNode } from "react";

export function LegalPage({
  title,
  updated,
  intro,
  children,
}: {
  title: string;
  updated: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line pt-36 pb-14 sm:pt-44">
        <div className="rule-grid absolute inset-0 mask-b opacity-50" />
        <div className="relative mx-auto max-w-[86rem] px-6">
          <p className="mono-label text-accent">Legal · updated {updated}</p>
          <h1 className="mt-6 max-w-3xl text-[clamp(2.2rem,6vw,4rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-ink">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-dim">
            {intro}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <div className="space-y-10">{children}</div>
      </div>
    </>
  );
}

export function Clause({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-[0.6875rem] text-accent">{n}</span>
        <h2 className="font-display text-xl text-ink">{title}</h2>
      </div>
      <div className="mt-4 space-y-4 pl-0 text-[0.9375rem] leading-relaxed text-dim sm:pl-9">
        {children}
      </div>
    </section>
  );
}

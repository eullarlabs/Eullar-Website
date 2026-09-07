import type { ReactNode } from "react";
import Link from "next/link";
import { Section } from "./Section";
import { Eyebrow, SectionHeader, Frame, Pill } from "./Bits";
import { Button } from "./Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { LatentField } from "@/components/viz/LatentField";
import { PRODUCTS, type Product } from "@/lib/content";
import { cn } from "@/lib/utils";

export function ProductPage({
  product,
  demo,
  demoCaption,
}: {
  product: Product;
  demo: ReactNode;
  demoCaption: string;
}) {
  const other = PRODUCTS.find((p) => p.slug !== product.slug)!;

  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-20">
        <div className="rule-grid absolute inset-0 mask-b opacity-60" />
        <div className="absolute inset-0 opacity-70">
          <LatentField density={0.55} />
        </div>

        <div className="relative mx-auto max-w-[86rem] px-6">
          <Reveal immediate>
            <div className="flex flex-wrap items-center gap-3">
              <Eyebrow>{product.index} · {product.kind}</Eyebrow>
              <Pill tone={product.accent === "turq" ? "accent" : "iris"}>
                {product.status}
              </Pill>
            </div>
          </Reveal>

          <Reveal immediate delay={0.06}>
            <h1 className="mt-7 text-[clamp(3rem,10vw,7.5rem)] font-semibold leading-[0.9] tracking-[-0.05em] text-ink">
              {product.name}
            </h1>
          </Reveal>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <Reveal immediate delay={0.12} className="min-w-0">
              <p className="font-display text-[clamp(1.5rem,3.4vw,2.35rem)] leading-[1.15] tracking-[-0.02em] text-ink">
                {product.oneLiner}
              </p>
              <p className="mt-7 max-w-2xl text-[1.0625rem] leading-relaxed text-dim">
                {product.summary}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="/contact">Request access</Button>
                <Button href="#how" variant="secondary">
                  How it works
                </Button>
              </div>
            </Reveal>

            <Reveal immediate delay={0.18} className="min-w-0">
              <Frame label="spec" className="p-5 sm:p-6">
                <dl className="divide-y divide-[var(--line)]">
                  {product.stack.map((s) => (
                    <div key={s.label} className="flex items-baseline justify-between gap-4 py-3 first:pt-0 last:pb-0">
                      <dt className="mono-label text-faint">{s.label}</dt>
                      <dd className="text-right font-mono text-[0.8125rem] text-ink">
                        {s.value}
                      </dd>
                    </div>
                  ))}
                  <div className="flex items-baseline justify-between gap-4 py-3 last:pb-0">
                    <dt className="mono-label text-faint">Built for</dt>
                    <dd className="max-w-[60%] text-right text-[0.8125rem] leading-snug text-ink">
                      {product.audience}
                    </dd>
                  </div>
                </dl>
              </Frame>
            </Reveal>
          </div>
        </div>
      </section>

      {/* live demo */}
      <Section className="border-t border-line py-20 sm:py-28">
        <Reveal>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader eyebrow="Live figure" title="Not a screenshot." />
            <p className="max-w-md text-[0.9375rem] leading-relaxed text-dim">
              {demoCaption}
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="mt-12">
          {demo}
        </Reveal>
      </Section>

      {/* how it works */}
      <Section id="how" tone="paper" className="py-24 sm:py-32">
        <Reveal>
          <SectionHeader
            eyebrow="How it works"
            title="Four steps, none of them hidden."
            lede="Each stage produces an artefact a human can read, contest and overrule. That constraint shapes the architecture more than any model choice does."
          />
        </Reveal>

        <RevealGroup className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {product.flow.map((f, i) => (
            <RevealItem key={f.n}>
              <div className="relative h-full">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-ink font-mono text-[0.6875rem] text-surface">
                    {f.n}
                  </span>
                  {i < product.flow.length - 1 && (
                    <span className="hidden h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent lg:block" />
                  )}
                </div>
                <h3 className="mt-5 font-sans text-[1.0625rem] font-medium leading-snug text-ink">
                  {f.title}
                </h3>
                <p className="mt-3 text-[0.875rem] leading-relaxed text-dim">
                  {f.body}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* capabilities */}
      <Section className="border-t border-line py-24 sm:py-32">
        <Reveal>
          <SectionHeader eyebrow="Capabilities" title="What it actually does." />
        </Reveal>
        <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {product.capabilities.map((c, i) => (
            <RevealItem key={c.title}>
              <div className="group h-full bg-surface-2 p-7 transition-colors duration-400 hover:bg-accent-soft">
                <div className="flex items-start justify-between">
                  <h3 className="max-w-[80%] font-sans text-[1.0625rem] font-medium leading-snug text-ink">
                    {c.title}
                  </h3>
                  <span className="font-mono text-[0.625rem] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-3 text-[0.875rem] leading-relaxed text-dim">
                  {c.body}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* quote + refusals */}
      <Section tone="paper" className="py-24 sm:py-32">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <blockquote className="relative">
              <span
                aria-hidden
                className="font-display absolute -left-2 -top-10 text-[7rem] leading-none text-accent/30"
              >
                &ldquo;
              </span>
              <p className="relative font-display text-[clamp(1.4rem,3vw,2rem)] leading-[1.25] tracking-[-0.02em] text-ink">
                {product.quote.text}
              </p>
              <footer className="mono-label mt-6 text-faint">
                {product.quote.who}
              </footer>
            </blockquote>
          </Reveal>

          <Reveal delay={0.1}>
            <Frame label="what it will not do" className="p-6 sm:p-8">
              <ul className="space-y-5">
                {product.refusals.map((r) => (
                  <li key={r} className="flex gap-4">
                    <span
                      aria-hidden
                      className="mt-1.5 flex size-5 shrink-0 items-center justify-center rounded-md border border-line-2 font-mono text-[0.625rem] text-faint"
                    >
                      ✕
                    </span>
                    <span className="text-[0.9375rem] leading-relaxed text-ink">
                      {r}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-7 border-t border-line pt-5 text-[0.8125rem] leading-relaxed text-dim">
                Limits are part of the specification. They are enforced in the
                system, not in the marketing.
              </p>
            </Frame>
          </Reveal>
        </div>
      </Section>

      {/* next product + CTA */}
      <section className="relative overflow-hidden border-t border-line bg-ink py-20 sm:py-24">
        <div className="dotfield absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-[86rem] px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <Eyebrow>Next</Eyebrow>
              <Link href={other.href} className="group mt-5 block">
                <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-none text-surface transition-colors group-hover:text-accent">
                  {other.name}
                  <span className="ml-4 inline-block transition-transform duration-400 group-hover:translate-x-2" aria-hidden>
                    →
                  </span>
                </h2>
              </Link>
              <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-dim">
                {other.oneLiner}
              </p>
            </div>

            <div className={cn("lg:justify-self-end")}>
              <p className="max-w-sm text-[1.0625rem] leading-relaxed text-dim">
                Want {product.name} against your own data? Pilots start with a
                short scoping call and a sample of the real thing.
              </p>
              <div className="mt-7">
                <Button href="/contact" variant="primary">
                  Request access
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

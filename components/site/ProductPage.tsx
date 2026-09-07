import type { ReactNode } from "react";
import Link from "next/link";
import { Section } from "./Section";
import { Eyebrow, SectionHeader, Frame, Pill } from "./Bits";
import { Button } from "./Button";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
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
        <div className="grid-paper absolute inset-0 mask-b opacity-60" />
        <div className="absolute inset-0 opacity-70">
          <LatentField density={0.55} />
        </div>

        <div className="relative mx-auto max-w-[86rem] px-6">
          <Reveal immediate>
            <div className="flex flex-wrap items-center gap-3">
              <Eyebrow>{product.index} · {product.kind}</Eyebrow>
              <Pill tone={product.accent === "turq" ? "turq" : "iris"}>
                {product.status}
              </Pill>
            </div>
          </Reveal>

          <Reveal immediate delay={0.06}>
            <h1 className="mt-7 text-[clamp(3rem,10vw,7.5rem)] font-semibold leading-[0.9] tracking-[-0.05em] text-ink-900">
              {product.name}
            </h1>
          </Reveal>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <Reveal immediate delay={0.12} className="min-w-0">
              <p className="font-editorial text-[clamp(1.5rem,3.4vw,2.35rem)] leading-[1.15] tracking-[-0.02em] text-ink-900">
                {product.oneLiner}
              </p>
              <p className="mt-7 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-600/90">
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
                <dl className="divide-y divide-line">
                  {product.stack.map((s) => (
                    <div key={s.label} className="flex items-baseline justify-between gap-4 py-3 first:pt-0 last:pb-0">
                      <dt className="mono-label text-ink-600/50">{s.label}</dt>
                      <dd className="text-right font-mono text-[0.8125rem] text-ink-900">
                        {s.value}
                      </dd>
                    </div>
                  ))}
                  <div className="flex items-baseline justify-between gap-4 py-3 last:pb-0">
                    <dt className="mono-label text-ink-600/50">Built for</dt>
                    <dd className="max-w-[60%] text-right text-[0.8125rem] leading-snug text-ink-900">
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
      <Section className="border-t border-line bg-mist/40 py-20 sm:py-28">
        <Reveal>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader eyebrow="Live figure" title="Not a screenshot." />
            <p className="max-w-md text-[0.9375rem] leading-relaxed text-ink-600/70">
              {demoCaption}
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="mt-12">
          {demo}
        </Reveal>
      </Section>

      {/* how it works */}
      <Section id="how" className="border-t border-line py-24 sm:py-32">
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
                  <span className="flex size-9 items-center justify-center rounded-xl bg-ink-900 font-mono text-[0.6875rem] text-white">
                    {f.n}
                  </span>
                  {i < product.flow.length - 1 && (
                    <span className="hidden h-px flex-1 bg-gradient-to-r from-turq-300 to-transparent lg:block" />
                  )}
                </div>
                <h3 className="mt-5 font-display text-[1.0625rem] font-semibold leading-snug text-ink-900">
                  {f.title}
                </h3>
                <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-600/85">
                  {f.body}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* capabilities */}
      <Section className="border-t border-line bg-mist/40 py-24 sm:py-32">
        <Reveal>
          <SectionHeader eyebrow="Capabilities" title="What it actually does." />
        </Reveal>
        <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {product.capabilities.map((c, i) => (
            <RevealItem key={c.title}>
              <div className="group h-full bg-white p-7 transition-colors duration-400 hover:bg-turq-50/60">
                <div className="flex items-start justify-between">
                  <h3 className="max-w-[80%] font-display text-lg font-semibold leading-snug text-ink-900">
                    {c.title}
                  </h3>
                  <span className="font-mono text-[0.625rem] text-turq-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-600/85">
                  {c.body}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* quote + refusals */}
      <Section className="border-t border-line py-24 sm:py-32">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <blockquote className="relative">
              <span
                aria-hidden
                className="font-editorial absolute -left-2 -top-10 text-[7rem] leading-none text-turq-200"
              >
                &ldquo;
              </span>
              <p className="relative font-editorial text-[clamp(1.4rem,3vw,2rem)] leading-[1.25] tracking-[-0.02em] text-ink-900">
                {product.quote.text}
              </p>
              <footer className="mono-label mt-6 text-ink-600/50">
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
                      className="mt-1.5 flex size-5 shrink-0 items-center justify-center rounded-md border border-line-strong font-mono text-[0.625rem] text-ink-600/60"
                    >
                      ✕
                    </span>
                    <span className="text-[0.9375rem] leading-relaxed text-ink-700">
                      {r}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-7 border-t border-line pt-5 text-[0.8125rem] leading-relaxed text-ink-600/65">
                Limits are part of the specification. They are enforced in the
                system, not in the marketing.
              </p>
            </Frame>
          </Reveal>
        </div>
      </Section>

      {/* next product + CTA */}
      <section className="relative overflow-hidden border-t border-line bg-ink-900 py-20 sm:py-24">
        <div className="dot-field-dark absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-[86rem] px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <Eyebrow onDark>Next</Eyebrow>
              <Link href={other.href} className="group mt-5 block">
                <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-none text-white transition-colors group-hover:text-turq-300">
                  {other.name}
                  <span className="ml-4 inline-block transition-transform duration-400 group-hover:translate-x-2" aria-hidden>
                    →
                  </span>
                </h2>
              </Link>
              <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-white/50">
                {other.oneLiner}
              </p>
            </div>

            <div className={cn("lg:justify-self-end")}>
              <p className="max-w-sm text-[1.0625rem] leading-relaxed text-white/60">
                Want {product.name} against your own data? Pilots start with a
                short scoping call and a sample of the real thing.
              </p>
              <div className="mt-7">
                <Button href="/contact" variant="onDark">
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

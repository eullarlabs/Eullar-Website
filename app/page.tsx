import Link from "next/link";
import { Hero } from "@/components/site/Hero";
import { StackScene } from "@/components/site/StackScene";
import { Skin, Wrap } from "@/components/site/Skin";
import { Eyebrow, SectionHeader, Pill } from "@/components/site/Bits";
import { Button, TickLink } from "@/components/site/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { VelocityMarquee, Rail, Counter, Parallax } from "@/components/motion/Scene";
import { NoteList } from "@/components/site/NoteList";
import { ResearchTerminal } from "@/components/viz/ResearchTerminal";
import { ProductShowcase } from "@/components/viz/ProductShowcase";
import { Aurora } from "@/components/viz/Aurora";
import { NOTES, PRINCIPLES, PRODUCTS, TICKER } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Hero />

      {/* ---------------------------------------------------------- TICKER */}
      <Skin tone="ink" className="border-y border-line py-3.5">
        <VelocityMarquee items={TICKER} />
      </Skin>

      {/* -------------------------------------------------------- STATEMENT */}
      <Skin tone="paper" className="py-28 sm:py-40">
        <div className="rule-grid absolute inset-0 opacity-60" />
        <Wrap className="relative">
          <Reveal>
            <Eyebrow>What we are</Eyebrow>
          </Reveal>

          <LineReveal
            className="display-l mt-8 max-w-[19ch]"
            text="A lab with a product, not a product with a blog."
            highlight={["product,"]}
          />

          <div className="mt-16 grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div>
              <LineReveal
                className="max-w-xl text-[1.0625rem] leading-relaxed text-dim sm:text-lg"
                text="Most of what an AI system gets wrong shows up only when a real person depends on it — a teacher planning tomorrow's lesson, a graduate reading a rejection. So we do not keep a wall between research and deployment. The same people write the evaluation and answer the support ticket."
                start={0.9}
                end={0.5}
              />
              <Reveal className="mt-8">
                <p className="max-w-xl text-[1.0625rem] leading-relaxed text-dim">
                  We work on two problems where a better system changes an
                  outcome rather than a metric: what a learner is taught next,
                  and what an applicant is told.
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <TickLink href="/about">How we work</TickLink>
                  <span className="text-faint">/</span>
                  <TickLink href="/about#principles">Principles</TickLink>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1} className="min-w-0">
              <Parallax distance={40}>
                <ResearchTerminal />
                <p className="mono-label mt-4 text-faint">
                  fig. 0 — an evaluation run, edited for length
                </p>
              </Parallax>
            </Reveal>
          </div>
        </Wrap>
      </Skin>

      {/* --------------------------------------------------------- PRODUCTS */}
      <Skin tone="ink" className="overflow-hidden py-28 sm:py-36">
        <Aurora />
        <Wrap className="relative">
          <Reveal>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeader
                eyebrow="Products"
                title={
                  <>
                    Two surfaces.
                    <br />
                    Try them right here.
                  </>
                }
              />
              <p className="max-w-sm text-[0.9375rem] leading-relaxed text-dim">
                These are not screenshots. Switch profiles, hover the graph,
                toggle the engine off — the figures below run the same logic the
                products do, on fixed sample data.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="mt-14">
            <ProductShowcase />
          </Reveal>

          <RevealGroup className="mt-5 grid gap-5 sm:grid-cols-2">
            {PRODUCTS.map((p) => (
              <RevealItem key={p.slug}>
                <Link
                  href={p.href}
                  className="group flex h-full flex-col justify-between rounded-3xl border border-line bg-surface-2/50 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-accent/40 hover:bg-surface-2"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-display text-2xl">{p.name}</span>
                      <Pill tone={p.accent === "turq" ? "accent" : "iris"}>{p.status}</Pill>
                    </div>
                    <p className="mt-4 leading-relaxed text-dim">{p.oneLiner}</p>
                  </div>
                  <span className="mono-label mt-8 flex items-center gap-2 text-accent">
                    {p.audience.split(",")[0]}
                    <span className="transition-transform duration-400 group-hover:translate-x-1" aria-hidden>→</span>
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Wrap>
      </Skin>

      {/* ------------------------------------------------------- STACK SCENE */}
      <StackScene />

      {/* ---------------------------------------------------------- NUMBERS */}
      <Skin tone="ink" className="border-y border-line py-20 sm:py-24">
        <Wrap>
          <RevealGroup className="grid gap-10 sm:grid-cols-3">
            {[
              { v: 2, s: "", k: "products in the field", d: "Syllabi and Reevue, both running against real cohorts rather than benchmarks." },
              { v: 17, s: "pts", k: "recall gained at 14 days", d: "Graph re-planning against topic order, in the evaluation run on the right of this page." },
              { v: 100, s: "%", k: "outcomes decided by people", d: "Neither product ranks or selects. They explain, propose and draft; a person decides." },
            ].map((n) => (
              <RevealItem key={n.k}>
                <div className="border-t border-line pt-6">
                  <div className="font-display text-[clamp(2.6rem,6vw,4rem)] leading-none text-accent">
                    <Counter to={n.v} suffix={n.s} />
                  </div>
                  <p className="mono-label mt-4 text-ink">{n.k}</p>
                  <p className="mt-3 max-w-xs text-[0.875rem] leading-relaxed text-dim">{n.d}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Wrap>
      </Skin>

      {/* ------------------------------------------------------- PRINCIPLES */}
      <Skin tone="ink" className="overflow-hidden">
        <div className="dotfield absolute inset-0 opacity-40" />
        <Rail vh={330} className="relative">
          <div className="flex w-[min(30rem,80vw)] shrink-0 flex-col justify-center pr-6">
            <Eyebrow>How we work</Eyebrow>
            <h2 className="display-l mt-6">Six commitments we can be held to.</h2>
            <p className="mt-6 max-w-sm leading-relaxed text-dim">
              Written to be falsifiable. If we break one, it should be obvious
              from the outside.
            </p>
            <p className="mono-label mt-8 flex items-center gap-3 text-faint">
              keep scrolling <span aria-hidden className="text-accent">→</span>
            </p>
          </div>

          {PRINCIPLES.map((p) => (
            <article
              key={p.n}
              className="flex min-h-[21rem] w-[min(22rem,78vw)] shrink-0 flex-col justify-between rounded-3xl border border-line bg-surface-2/60 p-8 backdrop-blur-sm transition-colors duration-500 hover:border-accent/40"
            >
              <span className="mono-label text-accent">{p.n}</span>
              <div>
                <h3 className="font-display text-[1.45rem] leading-snug">{p.title}</h3>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-dim">{p.body}</p>
              </div>
            </article>
          ))}
          <div className="w-6 shrink-0" />
        </Rail>
      </Skin>

      {/* --------------------------------------------------------- RESEARCH */}
      <Skin tone="paper" className="py-28 sm:py-36">
        <Wrap>
          <Reveal>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeader eyebrow="Research" title="Working notes, including the ones that failed." />
              <TickLink href="/research">All notes</TickLink>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="mt-14">
            <NoteList notes={NOTES.slice(0, 3)} />
          </Reveal>
        </Wrap>
      </Skin>

      {/* -------------------------------------------------------------- CTA */}
      <Skin tone="ink" className="overflow-hidden py-28 sm:py-36">
        <Aurora />
        <div className="rule-grid absolute inset-0 opacity-50" />
        <Wrap className="relative">
          <Reveal>
            <Eyebrow>Work with the lab</Eyebrow>
          </Reveal>
          <LineReveal
            className="display-l mt-7 max-w-[22ch]"
            text="If you run a classroom or a hiring queue, we want the hard version of your problem."
            highlight={["hard", "version"]}
          />
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl text-[1.0625rem] leading-relaxed text-dim">
              Pilots, research collaborations and integration work. Tell us what
              breaks today and we will tell you honestly whether we can help.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button href="/contact">Start a conversation</Button>
              <Button href="/research" variant="secondary">Browse research</Button>
            </div>
          </Reveal>
        </Wrap>
      </Skin>
    </>
  );
}

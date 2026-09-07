import Link from "next/link";
import { Section } from "@/components/site/Section";
import { Eyebrow, SectionHeader, Marquee, Frame, Pill } from "@/components/site/Bits";
import { Button, TickLink } from "@/components/site/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/Reveal";
import { NoteList } from "@/components/site/NoteList";
import { LatentField } from "@/components/viz/LatentField";
import { ResearchTerminal } from "@/components/viz/ResearchTerminal";
import { ProductShowcase } from "@/components/viz/ProductShowcase";
import { SystemDiagram } from "@/components/viz/SystemDiagram";
import { NOTES, PRINCIPLES, PRODUCTS, TICKER } from "@/lib/content";

export default function Home() {
  return (
    <>
      {/* ------------------------------------------------------------- HERO */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16">
        <div className="grid-paper absolute inset-0 mask-radial opacity-70" />
        <div className="absolute inset-0">
          <LatentField />
        </div>
        <div
          className="pointer-events-none absolute -right-40 top-1/4 size-[42rem] rounded-full opacity-40 blur-[120px]"
          style={{ background: "radial-gradient(circle, var(--color-turq-100), transparent 65%)" }}
        />

        <div className="relative mx-auto w-full max-w-[86rem] px-6">
          <Reveal>
            <Eyebrow>Applied AI research · Accra</Eyebrow>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-7 max-w-5xl text-[clamp(2.6rem,7.2vw,6rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-ink-900">
              Applied AI research,
              <br />
              shipped as tools
              <span className="relative ml-3 inline-block">
                <span className="text-gradient-turq">people use</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path
                    d="M2 8C60 3 120 2 180 5c40 2 80 4 118 2"
                    stroke="var(--color-turq-400)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-9 max-w-xl text-[1.0625rem] leading-relaxed text-ink-600/90 sm:text-lg">
              Eullar Labs builds practical AI systems and advances what is known
              about them. Two products are in the field today:{" "}
              <Link href="/products/syllabi" className="font-medium text-ink-900 underline decoration-turq-300 decoration-2 underline-offset-4 transition-colors hover:text-turq-700">
                Syllabi
              </Link>{" "}
              for teaching and learning, and{" "}
              <Link href="/products/reevue" className="font-medium text-ink-900 underline decoration-turq-300 decoration-2 underline-offset-4 transition-colors hover:text-turq-700">
                Reevue
              </Link>{" "}
              for applicant feedback.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button href="/contact">Request access</Button>
              <Button href="/research" variant="secondary">
                Read the research
              </Button>
            </div>
          </Reveal>

          {/* coordinate strip */}
          <Reveal delay={0.34}>
            <dl className="mt-16 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
              {[
                ["products in field", "02"],
                ["decision authority", "human"],
                ["model layer", "swappable"],
                ["origin", "5.6°N 0.19°W"],
              ].map(([k, v]) => (
                <div key={k} className="bg-white/70 px-4 py-4 backdrop-blur-sm">
                  <dt className="mono-label text-[0.5625rem] text-ink-600/45">{k}</dt>
                  <dd className="mt-1.5 font-display text-lg font-semibold text-ink-900">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex">
          <span className="mono-label text-[0.5625rem] text-ink-600/35">scroll</span>
          <span className="h-10 w-px bg-gradient-to-b from-turq-400 to-transparent" />
        </div>
      </section>

      {/* ----------------------------------------------------------- TICKER */}
      <div className="border-y border-line bg-mist/60 py-3">
        <Marquee items={TICKER} />
      </div>

      {/* ---------------------------------------------------------- MISSION */}
      <Section className="py-24 sm:py-32">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div>
            <Reveal>
              <Eyebrow>What we are</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-6 text-[clamp(1.9rem,4.2vw,3.25rem)] font-semibold leading-[1.03] text-ink-900">
                A lab with a product, not a product with a blog.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-7 space-y-5 text-[1.0625rem] leading-relaxed text-ink-600/90">
                <p>
                  Most of what an AI system gets wrong shows up only when a real
                  person depends on it — a teacher planning Tuesday&rsquo;s lesson, a
                  graduate reading a rejection. So we do not keep a wall between
                  research and deployment. The same team writes the evaluation
                  and answers the support ticket.
                </p>
                <p>
                  We work on two problems where a better system changes an
                  outcome rather than a metric: what a learner is taught next,
                  and what an applicant is told.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-wrap gap-3">
                <TickLink href="/about">How we work</TickLink>
                <span className="text-line-strong">/</span>
                <TickLink href="/about#principles">Principles</TickLink>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-turq-100/40 blur-2xl" />
              <ResearchTerminal className="relative" />
              <p className="mono-label mt-4 text-ink-600/45">
                fig. 0 — an evaluation run, edited for length
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* --------------------------------------------------------- PRODUCTS */}
      <Section className="border-t border-line bg-mist/40 py-24 sm:py-32">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
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
            <p className="max-w-sm text-[0.9375rem] leading-relaxed text-ink-600/70">
              These are not screenshots. Switch profiles, hover the graph,
              toggle the engine off — the figures below run the same logic the
              products do, on fixed sample data.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <ProductShowcase />
        </Reveal>

        <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-2">
          {PRODUCTS.map((p) => (
            <RevealItem key={p.slug}>
              <Link
                href={p.href}
                className="group flex h-full flex-col justify-between rounded-2xl border border-line bg-white p-6 transition-all duration-400 hover:-translate-y-1 hover:border-turq-300 hover:shadow-[0_28px_60px_-34px_rgba(18,173,161,0.9)]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xl font-semibold text-ink-900">
                      {p.name}
                    </span>
                    <Pill tone={p.accent === "turq" ? "turq" : "iris"}>
                      {p.status}
                    </Pill>
                  </div>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600/85">
                    {p.oneLiner}
                  </p>
                </div>
                <span className="mono-label mt-6 flex items-center gap-2 text-turq-700">
                  {p.audience.split(",")[0]}
                  <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                    →
                  </span>
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* ----------------------------------------------------------- SYSTEM */}
      <Section className="border-t border-line py-24 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
          <Reveal>
            <SectionHeader
              eyebrow="Architecture"
              title="One stack, two surfaces."
              lede="Syllabi and Reevue look nothing alike from the outside. Underneath they are the same three problems: turn a messy domain into a graph, measure what actually matters, and keep a person in control of the outcome."
            />
            <div className="mt-9 space-y-4">
              {[
                ["Representation", "A curriculum and a job spec are both dependency structures. We extract them once and reuse the machinery."],
                ["Evaluation", "Every deployment carries its own measure of success, chosen before launch and reported after."],
                ["Control", "Override, audit and refusal are built in at the seam, not bolted on as settings."],
              ].map(([t, d]) => (
                <div key={t} className="flex gap-4 border-l-2 border-turq-200 pl-4">
                  <div>
                    <p className="font-display text-[0.9375rem] font-semibold text-ink-900">{t}</p>
                    <p className="mt-1 text-[0.875rem] leading-relaxed text-ink-600/80">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <Frame label="fig. 3 — system" className="p-4 sm:p-6">
              <SystemDiagram />
            </Frame>
          </Reveal>
        </div>
      </Section>

      {/* --------------------------------------------------------- RESEARCH */}
      <Section className="border-t border-line bg-mist/40 py-24 sm:py-32">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader
              eyebrow="Research"
              title="Working notes, including the ones that failed."
            />
            <TickLink href="/research">All notes</TickLink>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="mt-12">
          <NoteList notes={NOTES.slice(0, 3)} />
        </Reveal>
      </Section>

      {/* ------------------------------------------------------- PRINCIPLES */}
      <Section className="border-t border-line py-24 sm:py-32">
        <Reveal>
          <SectionHeader
            eyebrow="How we work"
            title="Six commitments we can be held to."
            align="center"
          />
        </Reveal>

        <RevealGroup className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map((p) => (
            <RevealItem key={p.n}>
              <div className="group relative h-full bg-white p-7 transition-colors duration-400 hover:bg-turq-50/50">
                <span className="font-mono text-[0.6875rem] text-turq-500">{p.n}</span>
                <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-ink-900">
                  {p.title}
                </h3>
                <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-600/85">
                  {p.body}
                </p>
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-turq-400 transition-all duration-500 group-hover:w-full" />
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* --------------------------------------------------------------- CTA */}
      <section className="relative overflow-hidden bg-ink-900 py-24 sm:py-32">
        <div className="dot-field-dark absolute inset-0 opacity-50" />
        <div className="absolute inset-0">
          <LatentField density={0.5} />
        </div>
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-96 w-[46rem] -translate-x-1/2 rounded-full opacity-30 blur-[110px]"
          style={{ background: "radial-gradient(circle, var(--color-turq-500), transparent 68%)" }}
        />

        <div className="relative mx-auto max-w-[86rem] px-6">
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow onDark>Work with the lab</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-6 text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.02] text-white">
                If you run a classroom or a hiring queue, we want the hard version
                of your problem.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-white/55">
                Pilots, research collaborations and integration work. Tell us
                what breaks today and we will tell you honestly whether we can
                help.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Button href="/contact" variant="onDark">
                  Start a conversation
                </Button>
                <Button href="/research" variant="secondary" className="border-white/15 bg-white/5 text-white hover:border-turq-400 hover:bg-white/10 hover:text-white">
                  Browse research
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

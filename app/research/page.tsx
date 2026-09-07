import type { Metadata } from "next";
import { Section } from "@/components/site/Section";
import { Eyebrow, SectionHeader, Frame } from "@/components/site/Bits";
import { Button } from "@/components/site/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/Reveal";
import { ResearchIndex } from "@/components/site/ResearchIndex";
import { AttentionGrid } from "@/components/viz/AttentionGrid";
import { ResearchTerminal } from "@/components/viz/ResearchTerminal";
import { LatentField } from "@/components/viz/LatentField";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Working notes from Eullar Labs on prerequisite graphs, evaluation of generated feedback, uncertainty under latency budgets, and skew monitoring in production.",
};

const METHOD = [
  {
    n: "01",
    t: "Pick the measure before the method",
    d: "We write down what would count as the system working — and what would count as it failing — before choosing an approach. The measure is registered in the repository alongside the code.",
  },
  {
    n: "02",
    t: "Evaluate on the deployment, not the benchmark",
    d: "Benchmarks tell you a model is capable. They do not tell you a product is useful. Our evaluations run against live cohorts under production latency and real data quality.",
  },
  {
    n: "03",
    t: "Prefer the slower signal",
    d: "Immediate accuracy is easy to move and easy to fool. Delayed recall, acted-on feedback, and teacher override rates are slower, noisier, and worth more.",
  },
  {
    n: "04",
    t: "Publish what did not hold",
    d: "Negative results are cheaper to share than to repeat. Our notes carry the methods we abandoned and the reason.",
  },
];

export default function ResearchPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-20">
        <div className="grid-paper absolute inset-0 mask-b opacity-60" />
        <div className="absolute inset-0 opacity-80">
          <LatentField density={0.6} />
        </div>

        <div className="relative mx-auto max-w-[86rem] px-6">
          <Reveal>
            <Eyebrow>Working notes</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-7 max-w-4xl text-[clamp(2.6rem,7vw,5.5rem)] font-semibold leading-[0.94] tracking-[-0.045em] text-ink-900">
              Research we are
              <br />
              willing to be wrong about.
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-8 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-600/90 sm:text-lg">
              Everything here comes out of a deployed system. We publish the
              method, the measure, and the result — including the runs that
              closed a line of work rather than opening one.
            </p>
          </Reveal>
        </div>
      </section>

      {/* index */}
      <Section className="border-t border-line py-20 sm:py-24">
        <Reveal>
          <ResearchIndex />
        </Reveal>
      </Section>

      {/* figure */}
      <Section className="border-t border-line bg-mist/40 py-24 sm:py-32">
        <Reveal>
          <SectionHeader
            eyebrow="Interpretability"
            title="We look inside the systems we deploy."
            lede="A tutoring model that produces the right answer for the wrong reason will fail the moment the problem changes shape. Reading attention patterns over a solved example is one of the cheap checks we run before a model reaches a classroom."
          />
        </Reveal>
        <Reveal delay={0.1} className="mt-14">
          <AttentionGrid />
        </Reveal>
      </Section>

      {/* method */}
      <Section className="border-t border-line py-24 sm:py-32">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <Reveal>
              <SectionHeader eyebrow="Method" title="How an evaluation runs here." />
            </Reveal>
            <RevealGroup className="mt-12 space-y-8">
              {METHOD.map((m) => (
                <RevealItem key={m.n}>
                  <div className="flex gap-5">
                    <span className="font-mono text-[0.6875rem] text-turq-500">{m.n}</span>
                    <div>
                      <h3 className="font-display text-[1.0625rem] font-semibold text-ink-900">
                        {m.t}
                      </h3>
                      <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600/85">
                        {m.d}
                      </p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <Reveal delay={0.1}>
            <div className="lg:sticky lg:top-28">
              <ResearchTerminal />
              <Frame label="reading" className="mt-6 p-6">
                <p className="text-[0.9375rem] leading-relaxed text-ink-700">
                  In that run the proxy we could have reported — immediate
                  accuracy — moved by two points. The measure we committed to
                  before starting, recall at fourteen days, moved by seventeen.
                  Both numbers are true. Only one of them is the product.
                </p>
              </Frame>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* collaborate */}
      <section className="relative overflow-hidden border-t border-line bg-ink-900 py-24 sm:py-28">
        <div className="grid-paper-dark absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-[86rem] px-6">
          <div className="max-w-2xl">
            <Eyebrow onDark>Collaborate</Eyebrow>
            <h2 className="mt-6 text-[clamp(1.9rem,4.6vw,3.25rem)] font-semibold leading-[1.03] text-white">
              We would rather run the study on a deployed system than on a
              benchmark.
            </h2>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-white/55">
              If you research learning, labour markets or evaluation and want
              access to a system in the field, write to us. We share methods and
              aggregate results; we do not share customer data.
            </p>
            <div className="mt-9">
              <Button href="/contact#collaborate" variant="onDark">
                Propose a collaboration
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

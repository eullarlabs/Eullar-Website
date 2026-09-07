import type { Metadata } from "next";
import { Section } from "@/components/site/Section";
import { Eyebrow, SectionHeader, Frame } from "@/components/site/Bits";
import { Button } from "@/components/site/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/Reveal";
import { Accordion } from "@/components/site/Accordion";
import { LatentField } from "@/components/viz/LatentField";
import { SystemDiagram } from "@/components/viz/SystemDiagram";
import { FAQ, PRINCIPLES, SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Eullar Labs is an AI research company building practical tools and advancing AI knowledge responsibly. Based in Accra, working on education and hiring.",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-20">
        <div className="grid-paper absolute inset-0 mask-b opacity-60" />
        <div className="absolute inset-0 opacity-75">
          <LatentField density={0.55} />
        </div>
        <div className="relative mx-auto max-w-[86rem] px-6">
          <Reveal immediate>
            <Eyebrow>About the lab</Eyebrow>
          </Reveal>
          <Reveal immediate delay={0.06}>
            <h1 className="mt-7 max-w-4xl text-[clamp(2.6rem,7vw,5.5rem)] font-semibold leading-[0.94] tracking-[-0.045em] text-ink-900">
              We build the thing,
              <br />
              then we say what it did.
            </h1>
          </Reveal>
          <Reveal immediate delay={0.12}>
            <p className="mt-8 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-600/90 sm:text-lg">
              {SITE.name} is an AI research company. We make practical tools and
              publish what we learn making them — the useful results and the
              dead ends alike.
            </p>
          </Reveal>
        </div>
      </section>

      {/* story */}
      <Section className="border-t border-line py-24 sm:py-32">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <SectionHeader eyebrow="Why we exist" title="Two rooms, one failure." />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="space-y-6 text-[1.0625rem] leading-relaxed text-ink-600/90">
              <p>
                A teacher with forty students cannot diagnose forty different
                misconceptions in one period, so the class moves on and the gap
                compounds. A hiring team with four hundred applications cannot
                write four hundred honest replies, so it sends a template and
                four hundred people learn nothing.
              </p>
              <p>
                Both are the same shape of failure: attention that does not
                scale, in a place where the individual case is the only thing
                that matters. That is a narrow, tractable problem for machine
                learning — and a badly served one, because the systems built for
                it are usually optimised for engagement rather than for the
                outcome that justified building them.
              </p>
              <p className="font-editorial text-[clamp(1.35rem,2.8vw,1.85rem)] leading-[1.25] tracking-[-0.02em] text-ink-900">
                We started Eullar to work on the version of these problems that
                shows up in a real classroom in Accra and a real application
                queue — not the version that fits neatly in a benchmark.
              </p>
              <p>
                That commitment sets the shape of the company. The research team
                is the product team. Evaluations run against deployments. And
                every system we ship has a documented limit on what it is
                allowed to decide on its own.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* principles */}
      <Section id="principles" className="border-t border-line bg-mist/40 py-24 sm:py-32">
        <Reveal>
          <SectionHeader
            eyebrow="Principles"
            title="Six commitments we can be held to."
            lede="Written to be falsifiable. If we break one, it should be obvious from the outside."
          />
        </Reveal>

        <RevealGroup className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map((p) => (
            <RevealItem key={p.n}>
              <div className="group relative h-full bg-white p-7 transition-colors duration-400 hover:bg-turq-50/60">
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

      {/* stack */}
      <Section className="border-t border-line py-24 sm:py-32">
        <Reveal>
          <SectionHeader
            eyebrow="How it is built"
            title="Model-agnostic by design."
            lede="We do not train foundation models. We build the representation, evaluation and control layer above them, and we keep the inference layer swappable so a product decision is never hostage to one provider's roadmap."
            align="center"
          />
        </Reveal>
        <Reveal delay={0.1} className="mt-16">
          <Frame label="fig. 3 — system" className="p-4 sm:p-7">
            <SystemDiagram />
          </Frame>
        </Reveal>
      </Section>

      {/* faq */}
      <Section className="border-t border-line bg-mist/40 py-24 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <SectionHeader eyebrow="Questions" title="Asked often, answered plainly." />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <Accordion items={[...FAQ]} />
          </Reveal>
        </div>
      </Section>

      {/* place */}
      <section className="relative overflow-hidden border-t border-line bg-ink-900 py-24 sm:py-28">
        <div className="dot-field-dark absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-[86rem] px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <Eyebrow onDark>Where we are</Eyebrow>
              <h2 className="mt-6 text-[clamp(1.9rem,4.6vw,3.25rem)] font-semibold leading-[1.03] text-white">
                Accra, and wherever the deployment is.
              </h2>
              <p className="mt-6 max-w-lg text-[1.0625rem] leading-relaxed text-white/55">
                Building from West Africa is a design constraint before it is an
                origin story: intermittent connectivity, large classes, price
                sensitivity, and multilingual classrooms are the default case
                here. Systems that hold up under those conditions tend to hold
                up everywhere else.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="/contact" variant="onDark">Work with us</Button>
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:justify-self-end">
              {[
                ["founded", String(SITE.founded)],
                ["base", "Accra, GH"],
                ["latitude", "5.6037° N"],
                ["longitude", "0.1870° W"],
                ["products", "Syllabi · Reevue"],
                ["team", "research = product"],
              ].map(([k, v]) => (
                <div key={k} className="bg-ink-900 px-5 py-5">
                  <dt className="mono-label text-[0.5625rem] text-white/35">{k}</dt>
                  <dd className="mt-1.5 font-mono text-[0.8125rem] text-turq-300">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}

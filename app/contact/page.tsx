import type { Metadata } from "next";
import { Section } from "@/components/site/Section";
import { Eyebrow, SectionHeader, Frame } from "@/components/site/Bits";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/Reveal";
import { ContactForm } from "@/components/site/ContactForm";
import { LatentField } from "@/components/viz/LatentField";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a pilot, propose a research collaboration, or ask a question. Eullar Labs, Accra.",
};

const ROUTES = [
  {
    id: "pilots",
    label: "Pilots & access",
    body: "Schools, universities and employers who want Syllabi or Reevue running against their own data. Expect a scoping call and a sample before anything is signed.",
    turnaround: "reply within 2 working days",
  },
  {
    id: "collaborate",
    label: "Research collaboration",
    body: "Learning scientists, labour-market researchers and evaluation groups. We share methods and aggregate results, and we do not share customer data.",
    turnaround: "reply within a week",
  },
  {
    id: "general",
    label: "General & press",
    body: "Everything else — questions about the work, speaking, or writing about what we build.",
    turnaround: "reply when we can",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-14 sm:pt-44 sm:pb-16">
        <div className="grid-paper absolute inset-0 mask-b opacity-60" />
        <div className="absolute inset-0 opacity-70">
          <LatentField density={0.5} />
        </div>
        <div className="relative mx-auto max-w-[86rem] px-6">
          <Reveal immediate>
            <Eyebrow>Contact</Eyebrow>
          </Reveal>
          <Reveal immediate delay={0.06}>
            <h1 className="mt-7 max-w-4xl text-[clamp(2.6rem,7vw,5.5rem)] font-semibold leading-[0.94] tracking-[-0.045em] text-ink-900">
              Tell us the hard
              <br />
              version of the problem.
            </h1>
          </Reveal>
          <Reveal immediate delay={0.12}>
            <p className="mt-8 max-w-xl text-[1.0625rem] leading-relaxed text-ink-600/90">
              We would rather hear what is broken than what you would like to
              buy. If we are not the right tool for it, we will say so in the
              first reply.
            </p>
          </Reveal>
        </div>
      </section>

      <Section className="border-t border-line py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <ContactForm />
          </Reveal>

          <div className="space-y-4">
            <RevealGroup className="space-y-4">
              {ROUTES.map((r) => (
                <RevealItem key={r.id}>
                  <div id={r.id} className="scroll-mt-32 rounded-2xl border border-line bg-white p-6 transition-colors hover:border-turq-300">
                    <div className="flex items-baseline justify-between gap-4">
                      <h2 className="font-display text-[1.0625rem] font-semibold text-ink-900">
                        {r.label}
                      </h2>
                      <span className="mono-label text-[0.5625rem] text-turq-600">
                        {r.turnaround}
                      </span>
                    </div>
                    <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-600/85">
                      {r.body}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.15}>
              <Frame label="direct" className="p-6">
                <a
                  href={`mailto:${SITE.email}`}
                  className="group flex items-center justify-between gap-4"
                >
                  <span className="font-mono text-[0.9375rem] text-ink-900 transition-colors group-hover:text-turq-700">
                    {SITE.email}
                  </span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1 text-turq-600" aria-hidden>
                    →
                  </span>
                </a>
                <div className="mt-5 space-y-2 border-t border-line pt-5">
                  {[
                    ["location", SITE.location],
                    ["hours", "GMT · 09:00–18:00"],
                    ["founded", String(SITE.founded)],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-baseline justify-between">
                      <span className="mono-label text-ink-600/45">{k}</span>
                      <span className="font-mono text-[0.75rem] text-ink-700">{v}</span>
                    </div>
                  ))}
                </div>
              </Frame>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section className="border-t border-line py-20 sm:py-24">
        <Reveal>
          <SectionHeader
            align="center"
            eyebrow="Before you write"
            title="Three things that make a first email useful."
          />
        </Reveal>
        <RevealGroup className="mx-auto mt-14 grid max-w-4xl gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {[
            ["The failure", "What goes wrong today, described concretely enough that we could reproduce it."],
            ["The scale", "How many learners, applicants or courses. It changes the answer more than anything else."],
            ["The constraint", "Data residency, budget, connectivity, procurement. Tell us early; it shapes what we propose."],
          ].map(([t, d]) => (
            <RevealItem key={t}>
              <div className="h-full bg-white p-6">
                <h3 className="font-display text-[0.9375rem] font-semibold text-ink-900">{t}</h3>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-600/85">{d}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>
    </>
  );
}

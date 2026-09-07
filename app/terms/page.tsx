import type { Metadata } from "next";
import { LegalPage, Clause } from "@/components/site/Prose";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms governing use of the Eullar Labs website and products.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms"
      updated="September 2026"
      intro="The terms below govern this website. Product use is governed by the agreement signed with each customer, which takes precedence wherever the two differ."
    >
      <Clause n="01" title="This website">
        <p>
          The content here is provided for information. The interactive figures
          run on fixed sample data and are illustrations of how our systems
          work, not guarantees of any particular result.
        </p>
      </Clause>

      <Clause n="02" title="Products">
        <p>
          Access to Syllabi and Reevue is granted under a written agreement
          covering scope, data handling, availability and support. Nothing on
          this website creates an entitlement to access.
        </p>
      </Clause>

      <Clause n="03" title="Acceptable use">
        <p>
          Our systems must not be used to make automated decisions about people
          where a human review is required, to infer protected characteristics,
          or to generate content presented as a person&rsquo;s own assessment
          without disclosure.
        </p>
      </Clause>

      <Clause n="04" title="Intellectual property">
        <p>
          Customers keep their own content. Research notes published here may be
          quoted with attribution.
        </p>
      </Clause>

      <Clause n="05" title="Contact">
        <p>
          Questions about these terms:{" "}
          <a className="text-turq-700 underline decoration-turq-300 underline-offset-4" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>
          . {SITE.name}, {SITE.location}.
        </p>
      </Clause>
    </LegalPage>
  );
}

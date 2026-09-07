import type { Metadata } from "next";
import { LegalPage, Clause } from "@/components/site/Prose";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Eullar Labs handles personal data across its website and products.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy"
      updated="September 2026"
      intro="Plain language first, then the detail. This describes what we collect, why, and what we will never do with it."
    >
      <Clause n="01" title="What this covers">
        <p>
          This notice covers {SITE.name}&rsquo;s website and the products we
          operate — Syllabi and Reevue. Where we process data on behalf of a
          school or an employer, that organisation is the controller and its own
          notice governs the relationship with learners and applicants.
        </p>
      </Clause>

      <Clause n="02" title="What we collect">
        <p>
          From this website: nothing beyond what is needed to serve the pages
          and keep them working. We do not run advertising trackers or sell data
          to anyone.
        </p>
        <p>
          From the products: the content a customer sends us to process —
          curricula, learner work, applications, role criteria — plus operational
          logs needed to run and debug the service.
        </p>
      </Clause>

      <Clause n="03" title="Training">
        <p>
          Customer content is processed for that customer&rsquo;s own workload. We
          do not use it to train shared or third-party models, and our inference
          providers are contracted on the same basis.
        </p>
      </Clause>

      <Clause n="04" title="Where it is processed">
        <p>
          Deployment options include region-pinned processing and customer-hosted
          inference. Where data is processed is agreed in writing before a
          deployment begins, not decided afterwards.
        </p>
      </Clause>

      <Clause n="05" title="Retention and deletion">
        <p>
          Customer content is retained for the term agreed with the customer and
          deleted on request or at the end of the contract. Operational logs are
          kept for a short, fixed window and then discarded.
        </p>
      </Clause>

      <Clause n="06" title="Your rights">
        <p>
          If you are a learner or an applicant, your first route is the school or
          employer that holds your relationship. If you cannot reach them, write
          to{" "}
          <a className="text-turq-700 underline decoration-turq-300 underline-offset-4" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>{" "}
          and we will route it.
        </p>
      </Clause>

      <Clause n="07" title="Changes">
        <p>
          Material changes to this notice are dated at the top of the page.
          Customers are told directly rather than by silent edit.
        </p>
      </Clause>
    </LegalPage>
  );
}

import type { Metadata } from "next";
import { ProductPage } from "@/components/site/ProductPage";
import { ConceptGraph } from "@/components/viz/ConceptGraph";
import { productBySlug } from "@/lib/content";

const product = productBySlug("syllabi")!;

export const metadata: Metadata = {
  title: product.name,
  description: product.summary,
};

export default function SyllabiPage() {
  return (
    <ProductPage
      product={product}
      demo={<ConceptGraph />}
      demoCaption="Switch between three learner profiles. The prerequisite graph re-plans in place: the blocking concept is circled, the route redraws, and the generated plan on the right is rewritten to match."
    />
  );
}

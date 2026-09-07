import type { Metadata } from "next";
import { ProductPage } from "@/components/site/ProductPage";
import { FeedbackEngine } from "@/components/viz/FeedbackEngine";
import { productBySlug } from "@/lib/content";

const product = productBySlug("reevue")!;

export const metadata: Metadata = {
  title: product.name,
  description: product.summary,
};

export default function ReevuePage() {
  return (
    <ProductPage
      product={product}
      demo={<FeedbackEngine />}
      demoCaption="Hover a highlighted passage to see which criterion it answers. Toggle Reevue off to read what the same applicant would otherwise receive."
    />
  );
}

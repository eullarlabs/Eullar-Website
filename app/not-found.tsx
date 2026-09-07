import Link from "next/link";
import { Button } from "@/components/site/Button";
import { LatentField } from "@/components/viz/LatentField";
import { PRODUCTS } from "@/lib/content";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[86svh] items-center overflow-hidden pt-32">
      <div className="grid-paper absolute inset-0 mask-radial opacity-70" />
      <div className="absolute inset-0">
        <LatentField density={0.7} />
      </div>

      <div className="relative mx-auto w-full max-w-[86rem] px-6">
        <p className="mono-label text-turq-700">error · 404</p>
        <h1 className="mt-6 max-w-3xl text-[clamp(2.6rem,8vw,6rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-ink-900">
          No node at
          <br />
          this address.
        </h1>
        <p className="mt-7 max-w-lg text-[1.0625rem] leading-relaxed text-ink-600/90">
          The page you asked for is not in the graph. These are the edges that do
          exist.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <Button href="/">Back to the start</Button>
          <Button href="/research" variant="secondary">Research</Button>
        </div>

        <div className="mt-14 flex flex-wrap gap-6 border-t border-line pt-6">
          {PRODUCTS.map((p) => (
            <Link
              key={p.slug}
              href={p.href}
              className="group mono-label text-ink-600/60 transition-colors hover:text-turq-700"
            >
              {p.index} · {p.name}
              <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden>→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

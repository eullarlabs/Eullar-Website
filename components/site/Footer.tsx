import Link from "next/link";
import { LogoMark } from "./Logo";
import { Wrap } from "./Skin";
import { PRODUCTS, SITE } from "@/lib/content";

const columns = [
  { title: "Products", links: PRODUCTS.map((p) => ({ label: p.name, href: p.href })) },
  {
    title: "Lab",
    links: [
      { label: "Research", href: "/research" },
      { label: "About", href: "/about" },
      { label: "Principles", href: "/about#principles" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Request access", href: "/contact" },
      { label: "Collaborate", href: "/contact#collaborate" },
      { label: SITE.email, href: `mailto:${SITE.email}` },
    ],
  },
];

export function Footer() {
  return (
    <footer data-skin="ink" className="relative overflow-hidden bg-surface text-ink">
      <div className="rule-grid absolute inset-0 opacity-70" />
      <div className="bloom pointer-events-none absolute -top-52 left-1/2 h-[30rem] w-[56rem] -translate-x-1/2 opacity-40" />

      <Wrap className="relative pb-10 pt-24">
        <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <LogoMark className="size-8 text-accent" />
              <span className="font-display text-xl">Eullar Labs</span>
            </div>
            <p className="mt-6 max-w-sm leading-relaxed text-dim">{SITE.description}</p>
            <div className="mt-8 flex items-center gap-2.5">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ring rounded-full bg-accent" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              <span className="mono-label text-accent">{SITE.location}</span>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="mono-label text-faint">{col.title}</h3>
              <ul className="mt-6 space-y-3.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="group inline-flex items-center gap-2 text-[0.9375rem] text-dim transition-colors hover:text-accent"
                    >
                      <span className="size-1 rounded-full bg-accent opacity-0 transition-opacity group-hover:opacity-100" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div aria-hidden className="pointer-events-none mt-20 select-none overflow-hidden">
          <div className="font-display text-[clamp(4rem,18vw,16rem)] leading-[0.78] tracking-[-0.05em] text-ink opacity-[0.045]">
            EULLAR
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="mono-label text-faint">
            © {new Date().getFullYear()} {SITE.name}
          </p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
            <Link href="/privacy" className="mono-label text-faint transition-colors hover:text-accent">Privacy</Link>
            <Link href="/terms" className="mono-label text-faint transition-colors hover:text-accent">Terms</Link>
            <span className="mono-label text-faint opacity-60">Built in Accra</span>
          </div>
        </div>
      </Wrap>
    </footer>
  );
}

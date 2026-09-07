import Link from "next/link";
import { LogoMark } from "./Logo";
import { PRODUCTS, SITE } from "@/lib/content";

const columns = [
  {
    title: "Products",
    links: PRODUCTS.map((p) => ({ label: p.name, href: p.href })),
  },
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
    <footer className="relative overflow-hidden bg-ink-950 text-white">
      <div className="grid-paper-dark absolute inset-0 opacity-70" />
      <div
        className="absolute -top-40 left-1/2 h-[28rem] w-[52rem] -translate-x-1/2 rounded-full opacity-25 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-turq-400), transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-[86rem] px-6 pt-20 pb-10 sm:pt-24">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <LogoMark className="size-9" />
              <span className="font-display text-xl font-semibold tracking-tight">
                Eullar Labs
              </span>
            </div>
            <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-white/55">
              {SITE.description}
            </p>
            <div className="mt-7 flex items-center gap-2.5">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-turq-400" />
                <span className="relative inline-flex size-2 rounded-full bg-turq-400" />
              </span>
              <span className="mono-label text-turq-300/90">
                {SITE.location}
              </span>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="mono-label text-white/35">{col.title}</h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="group inline-flex items-center gap-2 text-[0.9375rem] text-white/70 transition-colors hover:text-turq-300"
                    >
                      <span className="size-1 rounded-full bg-turq-400/0 transition-colors group-hover:bg-turq-400" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Oversized wordmark, cropped by the viewport edge */}
        <div
          aria-hidden
          className="pointer-events-none mt-16 select-none overflow-hidden"
        >
          <div className="font-display text-[clamp(4rem,17vw,15rem)] font-semibold leading-[0.8] tracking-[-0.05em] text-white/[0.055]">
            EULLAR LABS
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="mono-label text-white/35">
            © {new Date().getFullYear()} {SITE.name} — all rights reserved
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/privacy" className="mono-label text-white/35 transition-colors hover:text-turq-300">
              Privacy
            </Link>
            <Link href="/terms" className="mono-label text-white/35 transition-colors hover:text-turq-300">
              Terms
            </Link>
            <span className="mono-label text-white/25">
              Built in Accra
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

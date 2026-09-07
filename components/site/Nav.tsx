"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Wordmark } from "./Logo";
import { PRODUCTS } from "@/lib/content";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Research", href: "/research" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [skin, setSkin] = useState<"ink" | "paper">("ink");
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 20));

  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
    setMenu(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* The bar takes the skin of whatever band is passing under it. */
  useEffect(() => {
    const bands = document.querySelectorAll<HTMLElement>("main [data-skin]");
    if (!bands.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const tone = (e.target as HTMLElement).dataset.skin;
            if (tone === "ink" || tone === "paper") setSkin(tone);
          }
        }
      },
      { rootMargin: "-56px 0px -100% 0px", threshold: 0 },
    );
    bands.forEach((b) => io.observe(b));
    return () => io.disconnect();
  }, [pathname]);

  return (
    <>
      <header
        data-skin={skin}
        className={cn(
          "fixed inset-x-0 top-0 z-[60] text-ink transition-[padding] duration-500",
          scrolled ? "py-2" : "py-4",
        )}
      >
        <div className="mx-auto max-w-[88rem] px-4 sm:px-6">
          <nav
            className={cn(
              "flex items-center justify-between rounded-full px-3 py-2 transition-all duration-500 sm:px-4",
              scrolled
                ? "border border-line bg-surface/70 backdrop-blur-xl backdrop-saturate-150"
                : "border border-transparent",
            )}
          >
            <Link href="/" aria-label="Eullar Labs — home" className="shrink-0 px-1.5 py-1">
              <Wordmark />
            </Link>

            <div className="hidden items-center gap-1 lg:flex">
              <div
                className="relative"
                onMouseEnter={() => setMenu(true)}
                onMouseLeave={() => setMenu(false)}
              >
                <button
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-4 py-2 text-[0.9375rem] transition-colors",
                    pathname.startsWith("/products") ? "text-accent" : "text-dim hover:text-ink",
                  )}
                  aria-expanded={menu}
                >
                  Products
                  <svg
                    viewBox="0 0 12 12"
                    className={cn("size-3 transition-transform duration-400", menu && "rotate-180")}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  >
                    <path d="M3 4.5 6 7.5 9 4.5" />
                  </svg>
                </button>

                <AnimatePresence>
                  {menu && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute left-1/2 top-full w-[min(40rem,82vw)] -translate-x-1/2 pt-3"
                    >
                      <div className="grid grid-cols-2 gap-2 rounded-3xl border border-line bg-surface/95 p-2 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
                        {PRODUCTS.map((p) => (
                          <Link
                            key={p.slug}
                            href={p.href}
                            className="group rounded-2xl border border-transparent p-5 transition-colors hover:border-line hover:bg-surface-2"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-display text-lg">{p.name}</span>
                              <span className="mono-label text-[0.5rem] text-accent">{p.index}</span>
                            </div>
                            <p className="mt-2 text-[0.8125rem] leading-relaxed text-dim">
                              {p.oneLiner}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-[0.9375rem] transition-colors",
                    pathname === l.href ? "text-accent" : "text-dim hover:text-ink",
                  )}
                >
                  {l.label}
                </Link>
              ))}

              <Link
                href="/contact"
                className="ml-2 rounded-full bg-accent px-5 py-2.5 text-[0.9375rem] font-medium text-[#06100f] transition-colors duration-400 hover:bg-ink hover:text-surface"
              >
                Request access
              </Link>
            </div>

            <button
              onClick={() => setOpen((v) => !v)}
              className="relative z-[80] flex size-10 items-center justify-center rounded-full border border-line lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span className="relative block h-3 w-4">
                <span className={cn("absolute left-0 h-px w-4 bg-current transition-all duration-400", open ? "top-1.5 rotate-45" : "top-0")} />
                <span className={cn("absolute left-0 top-1.5 h-px bg-current transition-all duration-400", open ? "w-0 opacity-0" : "w-3")} />
                <span className={cn("absolute left-0 h-px w-4 bg-current transition-all duration-400", open ? "top-1.5 -rotate-45" : "top-3")} />
              </span>
            </button>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            data-skin="ink"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-[70] bg-surface text-ink lg:hidden"
          >
            <div className="rule-grid absolute inset-0 opacity-60" />
            <div className="relative flex h-full flex-col justify-between px-6 pb-10 pt-28">
              <div>
                {[
                  ...PRODUCTS.map((p) => ({ label: p.name, href: p.href, note: p.index })),
                  ...LINKS.map((l) => ({ label: l.label, href: l.href, note: "" })),
                ].map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + i * 0.055, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link href={l.href} className="flex items-baseline justify-between border-b border-line py-5">
                      <span className="display-m">{l.label}</span>
                      {l.note && <span className="mono-label text-accent">{l.note}</span>}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.36 }}
                className="space-y-4"
              >
                <Link
                  href="/contact"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 font-medium text-[#06100f]"
                >
                  Request access <span aria-hidden>→</span>
                </Link>
                <p className="mono-label text-center text-faint">Accra · Remote</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

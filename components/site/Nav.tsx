"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
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
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  // Close both menus when the route changes — adjusted during render rather
  // than in an effect, so no cascading second pass.
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

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "py-2.5" : "py-4",
        )}
      >
        <div className="mx-auto max-w-[86rem] px-4 sm:px-6">
          <nav
            className={cn(
              "flex items-center justify-between rounded-2xl px-3 py-2 transition-all duration-500 sm:px-4",
              scrolled
                ? "glass border border-line shadow-[0_8px_40px_-24px_rgba(4,25,27,0.35)]"
                : "border border-transparent",
            )}
          >
            <Link href="/" aria-label="Eullar Labs — home" className="shrink-0 px-1 py-1">
              <Wordmark />
            </Link>

            {/* Desktop */}
            <div className="hidden items-center gap-1 lg:flex">
              <div
                className="relative"
                onMouseEnter={() => setMenu(true)}
                onMouseLeave={() => setMenu(false)}
              >
                <button
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-4 py-2 text-[0.9375rem] font-medium transition-colors",
                    pathname.startsWith("/products")
                      ? "text-turq-700"
                      : "text-ink-700 hover:text-ink-900",
                  )}
                  aria-expanded={menu}
                >
                  Products
                  <svg
                    viewBox="0 0 12 12"
                    className={cn(
                      "size-3 transition-transform duration-300",
                      menu && "rotate-180",
                    )}
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
                      initial={{ opacity: 0, y: 6, scale: 0.985 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.985 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute left-1/2 top-full w-[min(38rem,80vw)] -translate-x-1/2 pt-3"
                    >
                      <div className="grid grid-cols-2 gap-2 rounded-2xl border border-line bg-white/95 p-2 shadow-[0_28px_70px_-30px_rgba(4,25,27,0.4)] backdrop-blur-xl">
                        {PRODUCTS.map((p) => (
                          <Link
                            key={p.slug}
                            href={p.href}
                            className="group relative overflow-hidden rounded-xl border border-transparent p-4 transition-colors hover:border-line hover:bg-mist"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-display text-base font-semibold text-ink-900">
                                {p.name}
                              </span>
                              <span
                                className={cn(
                                  "mono-label rounded-full px-2 py-0.5 text-[0.5625rem]",
                                  p.accent === "turq"
                                    ? "bg-turq-50 text-turq-700"
                                    : "bg-iris-500/10 text-iris-500",
                                )}
                              >
                                {p.kind}
                              </span>
                            </div>
                            <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-ink-600/90">
                              {p.oneLiner}
                            </p>
                            <span className="mono-label mt-3 inline-flex items-center gap-1.5 text-turq-600 opacity-0 transition-opacity group-hover:opacity-100">
                              Open <span aria-hidden>→</span>
                            </span>
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
                    "rounded-full px-4 py-2 text-[0.9375rem] font-medium transition-colors",
                    pathname === l.href
                      ? "text-turq-700"
                      : "text-ink-700 hover:text-ink-900",
                  )}
                >
                  {l.label}
                </Link>
              ))}

              <Link
                href="/contact"
                className="ml-2 inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-[0.9375rem] font-medium text-white transition-colors duration-300 hover:bg-turq-600"
              >
                Request access
              </Link>
            </div>

            {/* Mobile trigger */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="relative z-50 flex size-10 items-center justify-center rounded-full border border-line bg-white/70 lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span className="relative block h-3 w-4">
                <span
                  className={cn(
                    "absolute left-0 h-[1.5px] w-4 bg-ink-900 transition-all duration-300",
                    open ? "top-1.5 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-1.5 h-[1.5px] bg-ink-900 transition-all duration-300",
                    open ? "w-0 opacity-0" : "w-3 opacity-100",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-[1.5px] w-4 bg-ink-900 transition-all duration-300",
                    open ? "top-1.5 -rotate-45" : "top-3",
                  )}
                />
              </span>
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-white lg:hidden"
          >
            <div className="grid-paper absolute inset-0 opacity-60" />
            <div className="relative flex h-full flex-col justify-between px-6 pb-10 pt-28">
              <div className="flex flex-col">
                {[
                  ...PRODUCTS.map((p) => ({
                    label: p.name,
                    href: p.href,
                    note: p.kind,
                  })),
                  ...LINKS.map((l) => ({ label: l.label, href: l.href, note: "" })),
                ].map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={l.href}
                      className="flex items-baseline justify-between border-b border-line py-4"
                    >
                      <span className="font-display text-3xl font-medium tracking-tight text-ink-900">
                        {l.label}
                      </span>
                      {l.note && (
                        <span className="mono-label text-turq-600">{l.note}</span>
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="space-y-4"
              >
                <Link
                  href="/contact"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-ink-900 px-6 py-4 font-medium text-white"
                >
                  Request access <span aria-hidden>→</span>
                </Link>
                <p className="mono-label text-center text-ink-600/60">
                  Accra · Remote — hello@eullar.com
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

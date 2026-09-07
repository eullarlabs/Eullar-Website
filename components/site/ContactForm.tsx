"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { SITE } from "@/lib/content";
import { cn } from "@/lib/utils";

const INTERESTS = [
  { id: "syllabi", label: "Syllabi pilot" },
  { id: "reevue", label: "Reevue pilot" },
  { id: "research", label: "Research collaboration" },
  { id: "other", label: "Something else" },
] as const;

const field =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-[0.9375rem] text-ink-900 placeholder:text-ink-600/35 transition-colors focus:border-turq-400 focus:outline-none";

export function ContactForm() {
  const [interest, setInterest] = useState<string>("syllabi");
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const label = INTERESTS.find((i) => i.id === interest)?.label ?? "Enquiry";
  const subject = `${label} — ${org || name || "enquiry"}`;
  const body = [
    `Name: ${name}`,
    `Organisation: ${org}`,
    `Reply to: ${email}`,
    `Interest: ${label}`,
    "",
    message,
  ].join("\n");

  const href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const ready = name.trim().length > 1 && message.trim().length > 10;

  return (
    <form
      className="rounded-3xl border border-line bg-white p-6 sm:p-8"
      onSubmit={(e) => e.preventDefault()}
    >
      <fieldset>
        <legend className="mono-label text-ink-600/50">What is this about</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {INTERESTS.map((i) => (
            <button
              key={i.id}
              type="button"
              onClick={() => setInterest(i.id)}
              aria-pressed={interest === i.id}
              className={cn(
                "relative rounded-full border px-4 py-2 text-[0.8125rem] font-medium transition-colors",
                interest === i.id
                  ? "border-ink-900 text-white"
                  : "border-line text-ink-600 hover:border-turq-300 hover:text-ink-900",
              )}
            >
              {interest === i.id && (
                <motion.span
                  layoutId="cf-pill"
                  className="absolute inset-0 rounded-full bg-ink-900"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{i.label}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mono-label text-ink-600/50">Name</span>
          <input
            className={cn(field, "mt-2")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ada Mensah"
            autoComplete="name"
          />
        </label>
        <label className="block">
          <span className="mono-label text-ink-600/50">Organisation</span>
          <input
            className={cn(field, "mt-2")}
            value={org}
            onChange={(e) => setOrg(e.target.value)}
            placeholder="School, company or lab"
            autoComplete="organization"
          />
        </label>
      </div>

      <label className="mt-4 block">
        <span className="mono-label text-ink-600/50">Reply-to address</span>
        <input
          className={cn(field, "mt-2")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.org"
          type="email"
          autoComplete="email"
        />
      </label>

      <label className="mt-4 block">
        <span className="mono-label text-ink-600/50">
          What breaks today
        </span>
        <textarea
          className={cn(field, "mt-2 min-h-36 resize-y leading-relaxed")}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="The more specific the failure, the more useful our first reply will be."
        />
      </label>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-[0.75rem] leading-relaxed text-ink-600/55">
          This opens a draft in your own mail client — nothing is transmitted
          from this page.
        </p>
        <a
          href={ready ? href : undefined}
          aria-disabled={!ready}
          className={cn(
            "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[0.9375rem] font-medium transition-all duration-300",
            ready
              ? "bg-ink-900 text-white hover:bg-turq-600"
              : "cursor-not-allowed bg-haze text-ink-600/40",
          )}
        >
          Compose the email
          <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
            →
          </span>
        </a>
      </div>
    </form>
  );
}

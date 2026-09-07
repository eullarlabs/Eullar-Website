# Eullar Labs — website

Marketing and research site for Eullar Labs, an AI research company building
practical AI tools (Syllabi, Reevue) and publishing what it learns.

## Stack

- **Next.js 16** (App Router, Turbopack, typed routes) + **React 19**
- **Tailwind CSS v4** — all design tokens live in `app/globals.css` under `@theme`
- **Motion** (`motion/react`) for reveal/layout animation
- Type-safe content in `lib/content.ts` — no CMS, edit the file

## Run

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Structure

```
app/
  page.tsx                 home
  research/                working notes index + interpretability figure
  products/syllabi/        product page, live prerequisite-graph figure
  products/reevue/         product page, live feedback-engine figure
  about/  contact/         company, principles, FAQ, enquiry form
  privacy/  terms/         legal
  opengraph-image.tsx      generated OG card
components/
  site/                    nav, footer, buttons, reveals, section chrome
  viz/                     the interactive figures (see below)
lib/content.ts             all copy, products, notes, principles, FAQ
```

## The figures

| Component | Where | What it does |
|---|---|---|
| `viz/LatentField` | every hero | Canvas graph in a curl flow field; the pointer is an attractor. DPR-aware, pauses off-screen, static under `prefers-reduced-motion`. |
| `viz/ConceptGraph` | home, Syllabi | Curriculum prerequisite graph. Switching learner profile re-plans the route in place and rewrites the generated plan. |
| `viz/FeedbackEngine` | home, Reevue | Application ↔ criterion alignment. Hovering a passage links it to the criterion and the feedback it produced; the toggle shows the template rejection instead. |
| `viz/AttentionGrid` | research | Attention matrix with a causal mask; four heads with different structure. |
| `viz/SystemDiagram` | home, about | Blueprint of the stack; connectors draw on scroll. |
| `viz/ResearchTerminal` | home, research | Typed evaluation log, starts when scrolled into view. |

## Colour

Brand tokens are in `app/globals.css`. Data marks use `--color-data-teal`
(`#0F9E92`) and the reserved status colour `--color-data-flag` (`#DD4E2E`) —
this pair is validated for colour-vision separation against a light surface
(deutan ΔE 13.2, normal ΔE 28.1, contrast ≥ 3:1). Ordinal encodings use a single
turquoise ramp; `data-flag` never ships without a text label beside it.

## Before launch

- Replace `hello@eullar.com` and the `eullar.com` domain in `lib/content.ts`,
  `app/layout.tsx`, `app/sitemap.ts` and `app/robots.ts`.
- Have `app/privacy` and `app/terms` reviewed by a lawyer — they are plain-language
  drafts, not legal advice.
- Product copy, research notes and the sample data in the figures are written to
  be edited: everything lives in `lib/content.ts` and the `viz/` components.

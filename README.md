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

## The mark

`components/site/Logo.tsx` draws the Möbius mark as inline SVG — one surface
returning to itself, mint → blue → indigo with the underside showing at the
fold. Its gradients and clip path are declared once per document by `LogoDefs`
in the root layout, so repeating the mark costs one `<svg>` and no duplicate
element ids.

**This is a redraw, not the original artwork.** It was rebuilt from a reference
image because the source file was not available. To swap in the real asset:
drop it into `public/` and replace the `<svg>` inside `LogoMark` with an
`<img>`. Nothing else in the codebase references the geometry. The same drawing
is also committed at `public/eullar-mark.svg`, `app/icon.svg` (favicon) and
`app/apple-icon.png` (touch icon, 180×180 — Next only accepts raster here).

## Colour

Two skins, defined in `app/globals.css`. Sections declare `data-skin="ink"` or
`"paper"` and the whole subtree — figures included — re-tunes through CSS
variables, so a figure never needs to know which band it landed on.

Nothing is pure white or pure black. Ink is `#0b1413` with warm off-white
`#efede4`; paper is a warm cream `#f3f0e8`. The mark supplies both brand
colours: turquoise as the primary, its periwinkle (`--iris`) as the secondary.

Data marks are validated per surface with the dataviz palette validator —
ink `#14a392` / `#cb7044`, paper `#008b7e` / `#be5230` — both passing all six
checks (lightness band, chroma floor, CVD separation, normal-vision floor and
contrast). Ordinal encodings use a single teal ramp mixed toward the current
surface; the reserved status colour never ships without a text label.

## Before launch

- Replace `hello@eullar.com` and the `eullar.com` domain in `lib/content.ts`,
  `app/layout.tsx`, `app/sitemap.ts` and `app/robots.ts`.
- Have `app/privacy` and `app/terms` reviewed by a lawyer — they are plain-language
  drafts, not legal advice.
- Product copy, research notes and the sample data in the figures are written to
  be edited: everything lives in `lib/content.ts` and the `viz/` components.

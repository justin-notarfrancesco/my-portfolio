# 🚇 notar.nyc

**Justin Notarfrancesco — Senior Frontend Engineer, New York City**

A personal portfolio built as a working demonstration of a design system — not just a place to host a static bio page.

The whole site is themed around the **NYC Subway wayfinding language** (the Vignelli / MTA *Standards Manual*):

- 🎨 A pure-black canvas
- 🔠 Bold Helvetica set at station-name weight
- 🚏 Authentic line colors
- 🟢 Roundel "bullet" badges

The concept isn't decoration — it drives the information architecture:

- 🔵 Nav = the A/C/E blue
- 🟡 Links = the N/Q/R/W yellow
- 🟠 The footer is a live arrival board

That's the point: a design system is only worth anything if the constraints actually decide things.

🔗 **Live:** [notar.nyc](https://notar.nyc)

---

## 🤔 Why this exists (and what it's meant to show)

Portfolios are usually judged on the work they link to. I wanted the *container itself* to be a piece of evidence — that I can take an opinionated design language, encode it as tokens, and ship it as something fast, accessible, and maintainable.

Everything below is a deliberate engineering choice, not a framework default.

## ⚙️ Engineering highlights

- **📦 JavaScript only where it earns its place.** Anything that *can* be pure CSS *is*: the mobile
  navigation, the animated "in service" pulse, and the hamburger-to-X transition all run on a hidden
  checkbox + `:checked` sibling selectors — zero JS. The build ships **no JS bundle at all**;
  the only client-side scripts are a ~0.5 KB inline handler on the contact page that builds a
  pre-filled `mailto:` link on submit, a few-line guard on the 404 page, and — in production
  builds only — the ~2 KB Umami analytics tracker. Every page is otherwise static HTML plus a
  single ~9.7 KB stylesheet (~2.7 KB gzipped).
- **🧩 A real design system, not scattered styles.** One file (`src/styles/global.css`) is the single
  source of truth: MTA line palette, semantic role mapping, fluid type scale, spacing, and layout
  tokens as CSS custom properties. The palette is *also* exposed as a typed module
  (`src/lib/theme.ts`) so component logic can resolve line colors without duplicating hex values.
- **🔒 Type-safe content.** Projects are Markdown files validated at build time against a **Zod schema**
  via Astro Content Collections — frontmatter typos become build errors, not silent bugs. Adding a
  case study is a single `.md` file; the grid, detail page, and dynamic route follow automatically.
- **♿ Accessibility treated as a requirement, not a pass.** Skip-to-content link, semantic landmarks,
  `aria-current="page"` on the active route, visible `:focus-visible` rings, `sr-only` utilities,
  and a full `prefers-reduced-motion` path that disables the arrival-board animations.
- **📐 Fluid and responsive without breakpoint sprawl.** Typography and spacing scale with `clamp()`
  against the viewport, so most of the layout is resolution-independent with only a couple of
  intentional breakpoints (e.g. the CSS-only mobile menu at 720px).
- **✨ Modern CSS, deliberately.** `color-mix()` for tinted shadows and translucent surfaces, logical
  properties (`inline-size` / `block-size`), `backdrop-filter` for the sticky glass nav, and
  `text-wrap: balance` on headings.
- **🔍 SEO / share-ready by construction.** The layout centralizes canonical URLs, Open Graph, and
  Twitter card metadata and derives absolute URLs from the configured `site`, so every page is
  correct without per-page boilerplate.
- **🛡️ Strict everything.** `astro/tsconfigs/strict` TypeScript across components, loaders, and helpers.

## 🛠️ Tech stack

| Concern | Choice | Why |
| :------ | :----- | :-- |
| Framework | **Astro 7** | Islands architecture; ships zero JS by default — ideal for a content site where interactivity is the exception, not the rule. |
| Language | **TypeScript** (strict) | Type safety down to the content frontmatter. |
| Styling | **Hand-authored CSS** with custom-property design tokens | No utility framework; the design system *is* the styling layer. |
| Content | **Astro Content Collections + Zod** | Schema-validated Markdown as a lightweight CMS. |
| Analytics | **Umami Cloud** | Privacy-friendly script tag, production builds only — no runtime npm dependency. |
| Hosting | **Vercel** | Static output, edge-delivered. |

## 🗺️ Architecture

```text
src/
├── content.config.ts          # Zod schema for the projects collection (build-time validation)
├── content/projects/*.md      # One Markdown file per case study — the content source
├── lib/theme.ts               # Typed MTA palette + resolveColor() (semantic key or raw hex)
├── styles/global.css          # Single source of theme truth: tokens + base styles
├── layouts/Layout.astro       # <head>, SEO/OG metadata, Nav + Footer shell
├── components/
│   ├── LineBadge.astro        # Circular subway roundel
│   ├── NowArriving.astro      # Arrival-board hero eyebrow
│   ├── ProjectCard.astro      # Work-grid card
│   ├── Nav.astro              # Sticky glass header; CSS-only mobile menu, active-route detection
│   ├── SocialLink.astro       # Contact row
│   └── Footer.astro           # "Last stop" arrival-board footer
└── pages/
    ├── index.astro            # Hero + featured work
    ├── about.astro            # Bio, stats, skills (line-color badges)
    ├── projects/index.astro   # Work grid
    ├── projects/[slug].astro  # Dynamic project detail pages
    ├── contact.astro          # Social links + contact
    └── 404.astro              # "Off the Map"
```

The data flow is intentionally boring in the best way:

**content → schema → typed collection → components → static HTML.**

No runtime data fetching, no hydration, nothing to go stale.

## 🎨 Design system

Colors and type are CSS custom properties in
[`src/styles/global.css`](src/styles/global.css); the line palette is mirrored as a typed module in
[`src/lib/theme.ts`](src/lib/theme.ts) for use in component logic.

Semantic roles map onto real MTA lines:

- 🔵 **Blue (A/C/E)** — navigation & primary actions
- 🟡 **Yellow (N/Q/R/W)** — links & hover states
- 🟠 **Orange (B/D/F/M)** — arrival-board accent

The entire site — palette, type scale, spacing — retunes from that one stylesheet.

## 📊 Analytics

The site uses [**Umami Cloud**](https://umami.is) — a privacy-first, cookieless alternative to
Google Analytics (no consent banner needed). Like everything else here, it's wired up deliberately:

- **Production only.** The tracker renders in `src/layouts/Layout.astro` behind
  `import.meta.env.PROD`, with the website ID injected from `PUBLIC_UMAMI_WEBSITE_ID` in Vercel's
  env settings (see [`.env.example`](.env.example)). Local dev ships zero analytics code, and
  `data-domains="notar.nyc"` keeps `*.vercel.app` preview deploys out of the stats.
- **Declarative custom events.** Meaningful interactions — nav, footer, social, project, and
  contact clicks — are instrumented with Umami's HTML `data-umami-event` attributes, so event
  tracking adds no JavaScript. The one scripted event is a guarded `not-found` beacon on the 404
  page that records the missing path.
- **No PII, ever.** Events carry at most 1–2 properties from a small vocabulary
  (`destination`, `platform`, `project`, `target`, `path`) — no emails, no free text, no query
  strings.

## 🏃 Running locally

Requires Node ≥ 22.12.

| Command | Action |
| :------ | :----- |
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at `localhost:4321` |
| `npm run build` | Production build to `./dist/` |
| `npm run preview` | Preview the production build locally |

---

*Design reference: [NYC Transit Authority Graphics Standards Manual](https://standardsmanual.com/products/nyctacompactedition) (Unimark / Vignelli, 1970).*

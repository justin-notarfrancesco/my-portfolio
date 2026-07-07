# notar.nyc — Justin Notarfrancesco

Personal portfolio for a senior frontend engineer, built with **Astro** + TypeScript.
Design language: the **NYC Subway wayfinding system** (Vignelli / MTA Standards Manual) —
pure-black canvas, bold Helvetica, authentic line colors, and roundel "bullet" badges.

## 🚇 Project structure

```text
public/
├── favicon.svg                 # subway-roundel "J" favicon
└── profile.svg                 # profile picture
src/
├── content.config.ts           # projects content collection schema
├── content/projects/*.md       # one markdown file per project (swap in real work)
├── lib/theme.ts                # MTA palette + contrast helpers
├── styles/global.css           # design tokens (CSS custom properties) + base styles
├── layouts/Layout.astro        # <head> SEO/OG, Nav + Footer wrapper
├── components/
│   ├── LineBadge.astro         # circular subway roundel
│   ├── ProjectCard.astro       # project grid card
│   ├── SocialLink.astro        # icon + label contact row
│   ├── Nav.astro               # sticky header, CSS-only mobile menu
│   └── Footer.astro            # "last stop" arrival-board footer
└── pages/
    ├── index.astro             # Home / hero + featured work
    ├── about.astro             # Bio, stats, skills (line-color badges)
    ├── projects/index.astro    # Work grid
    ├── projects/[slug].astro   # Dynamic project detail pages
    ├── contact.astro           # Social links + mailto form
    └── 404.astro               # "Off the Map"
```

## 🎨 Theming

All colors and fonts are CSS custom properties in [`src/styles/global.css`](src/styles/global.css).
Line colors live in both the CSS (`--mta-*`) and [`src/lib/theme.ts`](src/lib/theme.ts).
Semantic roles: **blue** = navigation/primary, **yellow** = links/hover, **orange** = accent.

## ✅ Placeholders to replace

- [ ] `public/profile.svg` — your real photo (used on Home + About)
- [ ] `public/og.png` — 1200×630 social share image
- [ ] `src/content/projects/*.md` — real projects (frontmatter: `title`, `description`,
      `techStack`, `image`, `liveUrl`, `repoUrl`, `lineColor`, `line`, `year`, `featured`, `order`)
- [ ] Bio + stats in `src/pages/about.astro`
- [ ] Social handles in `src/pages/contact.astro` and `src/components/Footer.astro`

## 🧞 Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm run dev`     | Local dev server at `localhost:4321`         |
| `npm run build`   | Build the production site to `./dist/`       |
| `npm run preview` | Preview the production build locally         |

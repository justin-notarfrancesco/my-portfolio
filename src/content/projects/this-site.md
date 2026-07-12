---
title: "notar.nyc"
description: "This site — a portfolio styled after the 1970 NYC Transit Authority Standards Manual, built with Astro so every page ships as static HTML with almost no JavaScript."
techStack: ["Astro", "TypeScript", "Content Collections", "Umami", "Vercel"]
liveUrl: "https://notar.nyc"
repoUrl: "https://github.com/justin-notarfrancesco/my-portfolio"
image: "/projects/this-site.png"
lineColor: "yellow"
line: "N"
year: 2026
featured: false
order: 4
---

## Overview

The site you're reading. The design language borrows from Massimo Vignelli's NYC
subway wayfinding: authentic MTA line colors, route bullets as project markers, and a
strict typographic grid. Projects live as markdown files in an Astro content
collection, so adding one is a single file with typed frontmatter.

## What I built

- A theme built on the nine MTA line colors, with a helper that resolves semantic
  keys ("red", "yellow") or raw hex from content frontmatter.
- Type-safe project pages: a Zod-validated content collection drives the cards,
  detail routes, and homepage feature slots from one source of truth.
- Privacy-friendly analytics with Umami's data-attribute API — a small, consistent
  event vocabulary instead of tracking everything.

## Outcome

Static HTML on Vercel with near-zero client JavaScript, which is most of the
performance story. The rest is restraint.

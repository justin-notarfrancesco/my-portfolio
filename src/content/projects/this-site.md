---
title: "notar.nyc"
description: "This site: a portfolio styled after the 1970 NYC Transit Authority Standards Manual, built with Astro so every page ships as static HTML with almost no JavaScript."
techStack: ["Astro", "TypeScript", "Content Collections", "Umami", "Vercel"]
liveUrl: "https://notar.nyc"
repoUrl: "https://github.com/justin-notarfrancesco/my-portfolio"
image: "/projects/this-site.png"
lineColor: "yellow"
line: "N"
year: 2026
featured: false
order: 5
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
- Privacy-friendly analytics with Umami's data-attribute API: a small, consistent
  event vocabulary instead of tracking everything.

## Key decisions

[//]: # "Hidden until you write something here: add a few short paragraphs or bullets. These [//] lines never render. Prompts:"
[//]: # "Why Astro with near-zero client JavaScript."
[//]: # "Why the 1970 NYCTA Standards Manual as the design system, and how strictly you follow it."
[//]: # "Why a small, fixed Umami event vocabulary instead of tracking everything."

## What was hard

[//]: # "Hidden until you write something here. Prompts:"
[//]: # "Making the subway train ride the portrait frame (offset-path: border-box) and articulate around corners."
[//]: # "Keeping the layout steady at every width, in print, and at large text sizes."

## Outcome

Static HTML on Vercel with near-zero client JavaScript, which is most of the
performance story. The rest is restraint.

## What I'd change

[//]: # "Hidden until you write something here. Prompts:"
[//]: # "What you'd change about the site next."

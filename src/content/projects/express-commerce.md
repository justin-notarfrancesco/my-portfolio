---
title: "Express Commerce"
description: "A headless storefront with edge-rendered product pages, optimistic cart updates, and a checkout that stays fast on a subway-tunnel connection."
techStack: ["Astro", "React Islands", "Stripe", "Edge Functions", "Playwright"]
liveUrl: "https://example.com/express-commerce"
repoUrl: "https://github.com/justin-notarfrancesco/express-commerce"
lineColor: "orange"
line: "F"
year: 2024
featured: false
order: 3
---

## Overview

A headless commerce reference build focused on perceived speed: static product pages at
the edge, hydrated only where interaction lives, and a cart that never blocks the UI.

## What I built

- Islands-architecture product pages that ship near-zero JS until the "Add to cart" tap.
- An optimistic cart backed by a small state machine with rollback on server rejection.
- End-to-end checkout coverage in Playwright, including flaky-network simulation.

## Outcome

95th-percentile Time-to-Interactive under 1.2s on throttled 3G.

---
title: "Last Stop"
description: "Snake, but you're driving the NYC subway — swipe a 16-bit pixel-art train around a route map, couple on cars as you pick up passengers, and share your crash as a Wordle-style emoji card."
techStack: ["TypeScript", "HTML Canvas", "Vite"]
liveUrl: "https://last-stop-five.vercel.app"
repoUrl: "https://github.com/justin-notarfrancesco/subway-snake"
image: "/projects/last-stop.png"
lineColor: "blue"
line: "A"
year: 2026
featured: true
order: 2
---

## Overview

A daily arcade game built for the group chat. Everyone gets the same Daily Commute — a
shared, date-seeded map with identical Track Work obstacles and passenger spawns — and
when you inevitably crash, you get a service-alert card ("Service Suspended — this
train made 28 stops") and a five-line emoji result made for iMessage.

## What I built

- A deterministic daily puzzle: one `mulberry32` PRNG seeded by the date drives the
  whole map, so every player worldwide compares the same commute.
- Crisp pixel art at any screen density — drawn on a low-res offscreen canvas and
  integer-scaled with smoothing off.
- A Local → Express difficulty curve: the ticker speeds up and an EXP badge appears
  once your train hits 12 passengers.
- Streaks tracked on a MetroCard that earns a punch per day, plus instant
  swipe-up-to-re-board restarts. No menus, ever.

## Outcome

Vanilla TypeScript and a `<canvas>` — no framework, no runtime dependencies. The whole
game ships as a static bundle and the tutorial is one sentence: swipe anywhere.

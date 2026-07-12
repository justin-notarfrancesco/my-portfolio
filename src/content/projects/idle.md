---
title: "Idle"
description: "A startup treasury dashboard with live T-bill rates, a ladder builder, maker-checker transfer controls, and an audit trail — the company is fictional, but every rate is real and every cent is accounted for."
techStack: ["Next.js", "TypeScript", "Zustand", "Vitest + fast-check", "Playwright"]
liveUrl: "https://idle-woad.vercel.app"
repoUrl: "https://github.com/justin-notarfrancesco/idle"
image: "/projects/idle.png"
lineColor: "darkgreen"
line: "4"
year: 2026
featured: true
order: 1
---

## Overview

I spent five years building financial UI at JPMorgan Chase, where the money was real
and the tooling had decades of institutional weight behind it. Idle is what I think the
other end of the market deserves: the treasury dashboard a startup CFO should have for
the cash sitting in checking. SOFR, the effective fed funds rate, and T-bill auction
results stream in live from FRED and Treasury FiscalData; the company, its ledger, and
its bank connection are simulated in the browser. Nothing leaves your machine.

## What I built

- A money library where every amount is integer cents in a `bigint` — floats never
  enter, and any operation that could produce a fraction takes an explicit rounding mode.
- An `allocate` primitive using the largest-remainder method, so a $500,000 ladder
  split across six maturities always reconciles to the input to the cent.
- Bond-equivalent yield computed exactly as 31 CFR 356 appendix B specifies, not an
  approximation — so bills and deposit products compare honestly.
- A transfer state machine with a 2 PM ET cutoff, banking-day awareness, and
  maker-checker dual approval, plus a demo clock to fast-forward settlement.

## Outcome

Property-based tests (fast-check) hold the money invariants, and CI enforces 100%
branch coverage on the money and analysis libraries. Add `?chaos=1` for a 20%
simulated-network failure rate.

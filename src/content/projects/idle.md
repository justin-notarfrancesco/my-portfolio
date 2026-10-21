---
title: "idle"
description: "A demo of treasury software for startups, built to practice money math: T-bill ladders, maker-checker transfer controls, and a to-the-cent ledger priced from live U.S. Treasury rates. Every rate is real and every cent is accounted for."
techStack: ["Next.js", "TypeScript", "Zustand", "Vitest + fast-check", "Playwright"]
liveUrl: "https://idle-woad.vercel.app"
repoUrl: "https://github.com/justin-notarfrancesco/idle"
image: "/projects/idle.png"
lineColor: "darkgreen"
line: "4"
year: 2026
wordmark: "idle"
featured: true
order: 3
---

## Overview

I built Idle to practice the kind of frontend where every cent has to reconcile. Idle
cash is a quiet expense (checking earns next to nothing while T-bills pay real yield),
so the demo imagines treasury software for a startup: T-bill ladders, maker-checker
transfer controls, and a to-the-cent ledger. It runs for a sample company, Meridian
Robotics: SOFR, the effective fed
funds rate, and T-bill auction results stream in live from FRED and Treasury
FiscalData, while the ledger and bank connection are simulated in the browser.

## What I built

- A money library where every amount is integer cents in a `bigint`: floats never
  enter, and any operation that could produce a fraction takes an explicit rounding mode.
- An `allocate` primitive using the largest-remainder method, so a $500,000 ladder
  split across six maturities always reconciles to the input to the cent.
- Bond-equivalent yield computed exactly as 31 CFR 356 appendix B specifies, not an
  approximation, so bills and deposit products compare honestly.
- A transfer state machine with a 2 PM ET cutoff, banking-day awareness, and
  maker-checker dual approval, plus a demo clock to fast-forward settlement.

## Key decisions

[//]: # "Hidden until you write something here: add a few short paragraphs or bullets. These [//] lines never render. Prompts:"
[//]: # "Why integer cents in a bigint instead of a decimal library."
[//]: # "Why the largest-remainder method for allocate."
[//]: # "Why compute bond-equivalent yield exactly per 31 CFR 356 rather than approximating."
[//]: # "How you modeled the transfer state machine (cutoff, banking days, maker-checker)."

## What was hard

[//]: # "Hidden until you write something here. Prompts:"
[//]: # "A money bug the property-based tests caught that example tests wouldn't have."
[//]: # "Working with live FRED and Treasury FiscalData feeds: gaps, delays, failures (and what ?chaos=1 taught you)."

## Outcome

Property-based tests (fast-check) hold the money invariants, and CI enforces 100%
branch coverage on the money and analysis libraries. Add `?chaos=1` for a 20%
simulated-network failure rate.

## What I'd change

[//]: # "Hidden until you write something here. Prompts:"
[//]: # "What you'd add for a real treasury product: auth, audit trails, a real bank connection."

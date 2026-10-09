---
title: "Can My Cat Eat XYZ"
description: "Type any food and get a straight yes-or-no answer on whether your cat can eat it, with the reasoning. Known cat toxins get fixed, vetted answers; everything else comes from Gemini, cached in Firebase."
techStack: ["React", "Tailwind CSS", "Gemini API", "Vercel Functions", "Firebase"]
liveUrl: "https://canmycateat.xyz"
repoUrl: "https://github.com/justin-notarfrancesco/can-my-cat-eat-xyz"
image: "/projects/can-my-cat-eat-xyz.png"
lineColor: "orange"
line: "F"
year: 2022
featured: false
order: 4
---

## Overview

Cat owners google this constantly and get a page of ads before an answer. Can My Cat
Eat XYZ does one thing: you type a food, and you get "yep" or "nope" followed by two or
three sentences of why. Every food has its own shareable URL, so a link to /grapes
is the answer.

## What I built

- A single-purpose search UI in React and Tailwind CSS: one input, a list of suggested
  foods, and an answer page for each food.
- A Vercel serverless function wrapping Google's Gemini API, so the API key stays
  server-side and never ships to the browser. A constrained prompt forces the
  yes/no-first format and returns a graceful "try a different food" when the question
  doesn't make sense.
- Fixed answers for well-known cat toxins (lilies, onions and garlic, grapes, chocolate,
  caffeine, alcohol, xylitol, human painkillers, antifreeze), matched before the model is
  ever asked, so the most dangerous questions never depend on an AI getting it right.
- A Firebase Realtime Database cache of model answers, written only from the server and
  capped with a timeout so a cache outage falls back to the model instead of hanging the
  search.
- Guardrails for an AI answer about pets: an "AI-generated, not veterinary advice" note
  and the ASPCA Poison Control number under every answer, full terms and privacy pages,
  and analytics that load only after cookie consent.

## Outcome

Live and free to use: ask it about grapes before your cat finds out the hard way.

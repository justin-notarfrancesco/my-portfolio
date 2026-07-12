---
title: "Can My Cat Eat XYZ"
description: "A cat nutrition search engine: type any food and get a straight yes-or-no answer with the reasoning, powered by OpenAI behind a serverless API."
techStack: ["React", "Tailwind CSS", "OpenAI API", "Vercel Functions", "Firebase"]
liveUrl: "https://can-my-cat-eat-xyz-psi.vercel.app"
repoUrl: "https://github.com/justin-notarfrancesco/can-my-cat-eat-xyz"
image: "/projects/can-my-cat-eat-xyz.png"
lineColor: "orange"
line: "F"
year: 2022
featured: true
order: 3
---

## Overview

Cat owners google this constantly and get a page of ads before an answer. Can My Cat
Eat XYZ does one thing: you type a food, and the answer comes back starting with "Yes."
or "No.", followed by two or three sentences of why.

## What I built

- A single-purpose search UI in React and Tailwind that gets you from question to
  answer in one input field.
- A Vercel serverless function wrapping the OpenAI Responses API, so the API key stays
  server-side and never ships to the browser.
- A constrained prompt that forces the yes/no-first format and returns a graceful
  "try a different food" when the question doesn't make sense.

## Outcome

Live and free to use — ask it about grapes before your cat finds out the hard way.

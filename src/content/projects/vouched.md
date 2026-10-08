---
title: "Vouched"
description: "Find local businesses through the people you know. Every recommendation carries a real name, there are no ads, and nobody can pay to rank higher. Browse by trade or city, or see who a friend vouches for."
techStack: ["Next.js", "TypeScript", "Server Actions", "Tailwind CSS", "Cloudflare Turnstile", "Vercel"]
liveUrl: "https://www.vouchedsoftware.com"
image: "/projects/vouched.png"
lineColor: "purple"
line: "7"
year: 2026
featured: true
order: 2
---

## Overview

Asking around is still the best way to find a good mechanic or plumber, but those answers
live in group chats and get lost. Vouched makes them searchable: people put their name
behind the local businesses they'd send a friend to, and you find businesses through the
people you know. There are no anonymous reviews, no ads, and no way to pay for a higher
spot.

## What I built

- A business directory searchable by name or trade, with browse-by-trade and
  browse-by-city filters and a page for every business.
- A people directory, A to Z, where each person's page lists the businesses they vouch
  for, so every recommendation comes with a name attached.
- Passwordless sign-in by text message: enter a mobile number and get a 6-digit code. A
  Cloudflare Turnstile check screens out bots before a code is sent.
- An "Add your business" flow behind sign-in, so every listing is tied to a real account.
- Progressive enhancement throughout: search is a plain GET form, the trade and city
  pickers are native disclosure elements, and writes go through Next.js Server Actions, so
  the core of the site works before client JavaScript loads.

## Outcome

Live at vouchedsoftware.com, built with Next.js and Tailwind CSS and deployed on Vercel.
The live version narrows an earlier prototype (profiles, a feed, a requests board) down
to two jobs: find a business, and see who vouches for it.

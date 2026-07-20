---
title: "Vouched"
description: "A social trust network where word-of-mouth becomes a shareable page: one link for the plumbers, dentists, and realtors you'd actually send a friend to — personal proof instead of anonymous reviews."
techStack: ["Next.js", "React 19", "TypeScript", "Tailwind CSS", "shadcn/ui", "Vercel"]
liveUrl: "https://vouched-omega.vercel.app"
repoUrl: "https://github.com/justin-notarfrancesco/vouched"
image: "/projects/vouched.png"
lineColor: "purple"
line: "7"
year: 2026
featured: false
order: 5
---

## Overview

Recommendations for local services still live in group chats and half-remembered
conversations. Vouched turns that word-of-mouth into a shareable record: a personal page
of the service providers you actually use and would happily send a friend to. It leans on
personal trust rather than anonymous ratings — a living list of the people you know and
vouch for, from plumbers and dentists to realtors, accountants, and IT help.

## What I built

- A public profile page (`/u/[username]`) where each person's vouches read as considered
  recommendations, not star ratings — with a share-ready link at the center of the flow.
- An explore experience browsable by category and city (`/explore/[category]/[city]`), so
  a referral is one search away.
- A dashboard, feed, and requests flow for creating vouches and fielding asks from people
  looking for a trusted provider.
- FAQ structured data (JSON-LD) and per-route metadata so pages surface cleanly in search.

## Outcome

Built on Next.js 16 and React 19 with Tailwind v4 and shadcn/ui (Radix) components, so the
interface stays accessible and consistent across every route. Deployed on Vercel.

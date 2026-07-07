---
title: "Transit Dashboard"
description: "A real-time arrivals board for NYC subway lines, pulling the MTA GTFS-realtime feed and rendering live countdown clocks with an offline-first service worker."
techStack: ["Astro", "TypeScript", "GTFS-realtime", "Service Workers", "Web Components"]
liveUrl: "https://example.com/transit-dashboard"
repoUrl: "https://github.com/justin-notarfrancesco/transit-dashboard"
lineColor: "red"
line: "2"
year: 2025
featured: true
order: 1
---

## Overview

Transit Dashboard began as a hallway monitor for figuring out whether it was worth
sprinting for the train. It consumes the MTA's GTFS-realtime protobuf feeds, decodes
them in a Web Worker, and paints an authentic split-flap "arrival board" in the browser.

## What I built

- A typed protobuf decoding pipeline that normalizes noisy realtime data into a clean arrivals model.
- A `<countdown-clock>` custom element with tabular-figure animation, no framework runtime.
- Offline-first caching so the board still renders the last-known state on a flaky platform connection.

## Outcome

Sub-50ms render on refresh and a Lighthouse performance score of 100. The split-flap
component was later extracted into its own package.

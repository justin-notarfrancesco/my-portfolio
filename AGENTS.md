## Development

IMPORTANT: Before starting the dev server, always kill any process already listening on port 4321, then start fresh. A stale or orphaned server on that port is the most common cause of startup failures. Do not try to reuse an existing server you did not start this session.

```
lsof -ti:4321 | xargs kill -9 2>/dev/null || true
```

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Analytics

The site uses Umami Cloud (free tier). The tracking script renders in `src/layouts/Layout.astro` for production builds only (`import.meta.env.PROD`); the website ID comes from `PUBLIC_UMAMI_WEBSITE_ID`, set in Vercel env settings (see `.env.example`). Nothing analytics-related runs in local dev — that is by design; do not add the ID locally or try to make the tracker load in dev.

When building any feature with user interaction (buttons, links, forms, CTAs), add tracking as part of the feature, not as a follow-up. Use Umami's data-attribute API: `data-umami-event` with a kebab-case event name, plus at most 1–2 `data-umami-event-*` properties drawn from the existing vocabulary — `destination`, `platform`, `project`, `target`, `path`.

Existing events (keep new names consistent with these):

- `nav-click` — `destination` (header nav + brand link, `src/components/Nav.astro`)
- `footer-click` — `destination` (all footer links, `src/components/Footer.astro`)
- `social-click` — `platform` (`src/components/SocialLink.astro`)
- `project-click` — `project`, plus `target` (`demo` | `repo`) on the project detail page's outbound buttons (`src/components/ProjectCard.astro`, `src/pages/projects/[slug].astro`)
- `contact-click` — `target` (`form` | `mailto`) (`src/pages/contact.astro`)
- `cta-click` — `destination` (in-page CTAs on `src/pages/index.astro` and `src/pages/404.astro`)
- `not-found` — `path` (JS `umami.track()` call in `src/pages/404.astro`, guarded with `typeof umami !== 'undefined'`; path only, never query strings)

Never put PII in event names or properties (no emails, no free text). Each stored property counts toward the 100k events/month free quota — instrument meaningful interactions, not everything.

New pages must render through `src/layouts/Layout.astro` to be counted in page views.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

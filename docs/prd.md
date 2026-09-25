# Jaya, Entre Mundos — Hub Phase 2 Product Requirements Document (PRD)

**Product:** public hub at <https://plataforma.jayaroberta.com.br> · **Repo:** `ecossistema-jaya/hub-ecossistema`
**Owner:** Jaya (product) · Ayla (drafting) · **Status:** Draft for review · **Date:** 2026-09-25

## Goals and Background Context

### Goals

- Make the hub the single link people follow from Instagram, and measure what they click.
- Close the open items left by Story 1.1 (copy review, seasonal link, dashboard toggles).
- Guarantee that every destination the hub promotes is reachable, and know which ones have unverified critical flows.
- Keep the performance and accessibility bar already reached (Lighthouse mobile 98/100/100/100).
- Deliver all of the above without depending on the EIXO migration, which is paused until a restorable backup exists.

### Background Context

The hub went live on 2026-09-25 (Story 1.1). It is a static Astro site with 37 outbound links driven by `src/data/links.json`, deployed automatically from `main` to Vercel. Since that day, all outbound links open in a new tab with `rel="noopener"` (commit `33837fb`).

The page exists, but it is not yet in front of anyone: the Instagram bio still points elsewhere, Vercel Web Analytics and Speed Insights are not enabled, and there is no production Lighthouse run. Some destinations have known issues that live in other projects: BusinessJaya's Google login returns to the wrong site, and the real Hotmart checkout → delivery flow has never been exercised with a real purchase. The ecosystem centralization (GitHub/Vercel/Supabase) is paused on the EIXO backup; the hub touches EIXO only through one outbound link whose domain is not expected to change.

### Audience (deliverable standard)

| Question | Answer |
|---|---|
| WHO | Visitors arriving from Instagram `@jayaroberta.shakti`, mostly on mid/low-end phones inside the Instagram WebView |
| WHAT | Reach the right product in one tap: quiz, Claude do Zero, WhatsApp session, planners, Ayla |
| WHY | One page shows both worlds (Shakti and Jaya AI) instead of a bare link list |
| WHEN | First touch after the profile; before any purchase |
| HOW we measure | Visits from the bio, outbound clicks per link id, `utm_source=plataforma` arrivals at the destinations |
| WHAT IF it fails | Low click-through → reorder or trim cards using click data; broken destination → hide the link via `"hidden": true` until fixed |

### Change Log

| Date | Version | Description | Author |
|---|---|---|---|
| 2026-09-25 | 0.1 | Initial draft for Jaya's review | Ayla |
| 2026-09-25 | 0.2 | Q1–Q4 decided (option 1 each); progress table | Ayla |

## Requirements

### Functional

- **FR1:** Outbound links open in a new tab with `rel="noopener"`; in-page anchors (logo, hero cue, skip link) stay in the same tab. *Done in `33837fb`; supersedes Story 1.1 AC3 ("opens in the same tab").*
- **FR2:** Every outbound URL keeps `utm_source=plataforma&utm_medium=hub&utm_content=<id>` (unchanged from Story 1.1).
- **FR3:** Vercel Web Analytics and Speed Insights record data for the production domain.
- **FR4:** Outbound clicks are countable per link `id` (mechanism pending decision Q1).
- **FR5:** A link can be hidden without deleting it (`"hidden": true`, exists today). Fogueira Junina is hidden outside its season (rule pending decision Q2).
- **FR6:** Every string drafted by Ayla (list in Story 1.1 "Open items") is approved or replaced by Jaya before being considered final.
- **FR7:** A script checks every URL in `links.json` (and `restricted`) and reports any non-2xx/3xx response, with the link `id`.
- **FR8:** A destination readiness table records, for each link, whether its critical flow (login, checkout, delivery) was verified, and who owns the fix.
- **FR9:** The Instagram bio of `@jayaroberta.shakti` points to `https://plataforma.jayaroberta.com.br`, and a launch story/post is published.

### Non Functional

- **NFR1:** Lighthouse mobile on production: performance ≥ 0.95, accessibility ≥ 0.95, LCP ≤ 2.5 s, CLS ≤ 0.05, TBT ≤ 150 ms (same thresholds as `lighthouserc.json`).
- **NFR2:** Total JS stays ≤ 50 KB; any tracking added for FR4 counts against it.
- **NFR3:** WCAG AA in both themes; touch targets ≥ 44 px; visible focus.
- **NFR4:** Works inside the Instagram and WhatsApp WebViews (new-tab links must still navigate there).
- **NFR5:** `links.json` stays the single source of truth for links and card copy.
- **NFR6:** No work in this PRD blocks on, or changes, the EIXO migration.

## User Interface Design Goals

### Overall UX Vision

No redesign. SAND stays as approved (light by default, rich art). Phase 2 changes content and measurement, not layout.

### Core Screens and Views

- The single home page (`src/pages/index.astro`); no new pages in this phase.

### Accessibility: WCAG AA

### Branding

SAND design system (`../sanddesignsystem.html`): Marcellus + Open Sans 300, paper cream, teal ink, rust action, gold. Name "Jaya, Entre Mundos", thesis "Inteligência Relacional".

### Target Device and Platforms: Web Responsive (mobile first)

## Technical Assumptions

### Repository Structure: Polyrepo (one repo per product)

### Service Architecture

Static Astro build on Vercel, no backend. Tracking, if any, uses Vercel Analytics; no new third-party service.

### Testing Requirements

`npx astro check` + `npm run build` before every push; link checker (FR7) before every push that touches `links.json`; Lighthouse mobile on production after each visual change.

### Additional Technical Assumptions and Requests

- There is no CI workflow in the repo (`.github/workflows` is absent), so `lighthouserc.json` is not enforced anywhere today. `lhci autorun` fails on Windows (EPERM); a GitHub Action on Linux would enforce it.
- `@fontsource-variable/petrona` and `@fontsource-variable/jost` are still in `dependencies` but unused since the SAND redesign.
- Story 1.1 text still describes v1 (Petrona/Jost, same-tab links); the file list is outdated.
- Vercel team `betinhapotters-projects` is Pro, so Analytics custom events are available.

## Epic List

1. **Epic 2 — Distribution & measurement:** put the hub in front of people and see what they click.
2. **Epic 3 — Content closure:** finish Story 1.1 leftovers and align the docs with what is live.
3. **Epic 4 — Destination reliability:** know that every promoted link works and who fixes the ones that don't.

## Epic 2 — Distribution & measurement

Goal: the bio sends traffic to the hub, and the hub reports which paths people take.

### Story 2.1 — Bio link and launch post

As Jaya, I want the Instagram bio to point to the hub and a launch post announcing it, so that followers start using it.

#### Acceptance Criteria

1. Bio link of `@jayaroberta.shakti` is `https://plataforma.jayaroberta.com.br` (Jaya's action).
2. Launch story and caption drafted by Ayla, approved by Jaya, published.
3. Link previews on WhatsApp and Instagram show the current OG image.

### Story 2.2 — Analytics on

As Jaya, I want to see visits and performance from real devices, so that decisions use data.

#### Acceptance Criteria

1. Web Analytics and Speed Insights enabled in the Vercel dashboard (Jaya's action).
2. First visits visible in the dashboard within 24 h.
3. Production Lighthouse mobile ×3 recorded in the story; meets NFR1.

### Story 2.3 — Outbound click tracking (depends on Q1)

As Jaya, I want clicks counted per card, so that I know which products attract interest.

#### Acceptance Criteria

1. Each outbound click is recorded with its link `id`.
2. JS budget (NFR2) and Lighthouse (NFR1) still pass.
3. Works with `prefers-reduced-motion` and in the Instagram WebView.

## Epic 3 — Content closure

Goal: every word on the page is Jaya's choice, and the docs match production.

### Story 3.1 — Copy review

#### Acceptance Criteria

1. Each Ayla-drafted string (quick-card notes, footer line, Atlas group notes, Jaya AI summary, "Descubra suas forças", "Territórios para explorar o Claude", "Ritual sazonal", elements summary, page description) is marked approved or replaced.
2. Changes land only in `links.json` or the owning component; build passes.

### Story 3.2 — Seasonal Fogueira Junina (depends on Q2)

#### Acceptance Criteria

1. Fogueira Junina is not shown outside its season.
2. Turning it back on requires one change in `links.json` (or none, if a date window is chosen).

### Story 3.3 — Docs and dependency cleanup

#### Acceptance Criteria

1. Story 1.1 ACs and file list reflect the SAND version and FR1.
2. Unused Petrona/Jost packages removed; build, check and Lighthouse unchanged.

## Epic 4 — Destination reliability

Goal: the hub never sends a visitor into a dead end without Jaya knowing.

### Story 4.1 — Link checker script

#### Acceptance Criteria

1. `npm run check:links` requests every URL in `links.json` and prints status per `id`.
2. Non-zero exit when any link fails; `wa.me` and Hotmart redirects count as success.
3. Documented in `docs/HANDOFF.md` "Como editar".

### Story 4.2 — Destination readiness table

#### Acceptance Criteria

1. Table lists every destination with: reachable (from 4.1), critical flow, last verification date, owner project.
2. Known gaps recorded with source: BusinessJaya Google login (wrong callback), Hotmart real checkout → delivery never run with a real purchase, Ayla Hotmart Club guidance not published.
3. Each gap has a decision from Jaya: keep, hide, or fix in the owner project (Q3).

## Out of Scope

- EIXO migration and anything in the root `HANDOFF.md`.
- Fixing BusinessJaya OAuth, the Hotmart webhook or Hotmart Club content (owner projects; this PRD only tracks them).
- New sections, redesign or new pages.
- Trademark search for "Jaya, Entre Mundos".

## Decisions (Jaya, 2026-09-25)

- **Q1 — Click tracking:** Vercel Analytics custom events (`outbound` event with the link `id`). Rejected: UTM only (Hotmart and WhatsApp don't report it back), skip.
- **Q2 — Fogueira Junina:** `"hidden": true` now, flipped manually each June. Rejected: build-time date window (needs a scheduled redeploy).
- **Q3 — Unverified destinations:** keep visible; fixes happen in the owner projects in parallel. Tracked in [destinations.md](destinations.md). Rejected: hide until verified, scheduled test purchase.
- **Q4 — Copy review:** Ayla lists each string with 2 alternatives, Jaya picks. Rejected: Jaya rewrites directly.

## Progress

| Story | Status |
|---|---|
| 2.1 Bio link and launch post | AC1 done: link in 3 bios (@jayaroberta, @jayaroberta.ai, @jayaroberta.shakti), 2026-09-25; post/story copy + image prompts delivered, publication pending |
| 2.2 Analytics on | AC1 done (Jaya, 2026-09-25); AC3 done: production Lighthouse mobile ×3 (local CLI) 99/97/97 · 100 · 100 · 100, LCP 1.69–1.98 s, CLS 0, TBT ≤ 1 ms; AC2 pending (visits within 24 h) |
| 2.3 Outbound click tracking | Done: production `POST /_vercel/insights/event` → 200 on click (2 test events `quick-quiz`, 2026-09-25) |
| 3.1 Copy review | Done (Jaya picked 2026-09-25; item 10 written by Jaya) |
| 3.2 Seasonal Fogueira Junina | Done (`hidden: true`) |
| 3.3 Docs and dependency cleanup | Done (Petrona/Jost removed; Story 1.1 notes updated) |
| 4.1 Link checker script | Done (`npm run check:links`: 28 unique URLs, 0 failed, LinkedIn bot-walled) |
| 4.2 Destination readiness table | Done ([destinations.md](destinations.md)); fixes owned by other projects |

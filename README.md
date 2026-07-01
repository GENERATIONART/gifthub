# Fondly — Web

The production front end for **Fondly**, the AI gifting concierge, built from the
`design_handoff_fondly` "Luxe" design system. Fully responsive, backend-agnostic.

## Stack

- **Vite + React 18 + TypeScript** — single-page app.
- **react-router-dom** for routing.
- **No backend coupling.** All data lives in [`src/data/app.ts`](src/data/app.ts)
  as seeded values behind typed shapes. Each export maps to a future API
  resource — implement those shapes (Python/FastAPI, Django, Node, …) and swap
  the imports; no screen changes.

## Run

```bash
cd fondly-web
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck (tsc -b) + production build
npm run typecheck  # types only
```

## Architecture

```
src/
  theme/        design tokens (theme.ts) + jewel-accent ThemeProvider
  data/app.ts   ← the backend seam: all seeded data + gift-scoring
  components/    AppShell (responsive 3-pane), AIPanel, ui primitives
  screens/       Landing, Auth, Onboarding (standalone) + app/* (in-app)
  global.css     design-system tokens as CSS vars + responsive layout rules
scripts/         puppeteer screenshot + verification helpers (dev only)
```

### Responsive model

One app, three layouts driven by CSS breakpoints:

- **≥1200px** — three panes: left nav rail · center content · right AI panel.
- **900–1200px** — nav rail + content; AI panel becomes a slide-over drawer
  (opened via the floating assistant button).
- **<900px** — nav collapses to an off-canvas drawer, a top bar + bottom tab
  bar appear, the AI panel is a drawer, content goes full-width and fluid.

Off-canvas drawers are `inert` while closed (no stray tab-stops); Escape closes
them; `prefers-reduced-motion` is honored.

## Routes

| Route | Screen |
|---|---|
| `/` | Marketing landing (tall-scroll) |
| `/auth` | Magic-link auth (signin · create · sent) |
| `/onboarding` | 5-step first-run with a live profile card |
| `/app` | Home / Upcoming |
| `/app/calendar` · `/app/discover` · `/app/studio` | Calendar · Discover · Gift studio (picks) |
| `/app/refine` · `/app/approve` · `/app/tracking` · `/app/reaction` | The gift flow |
| `/app/memory` · `/app/from-fondly` · `/app/alerts` | Gift memory · Concierge messages · Alerts |
| `/app/settings` · `/app/profile/:id` | Settings (guardrails + accent) · Person profile |

The whole gift flow is wired end-to-end: Home → Studio → Refine → Approve →
Tracking → Reaction. The **Refine** dials re-rank the pre-scored gift pool live
(`scoreGift` in `data/app.ts`), and the right AI panel is context-aware per
screen.

## Theming

A single **jewel accent** (default champagne gold) themes every surface via the
`--g` CSS variable. Change it under **Settings → Theme**; the choice persists to
`localStorage`. All 10 handoff presets are available.

## Design fidelity

Colors, typography (Bodoni Moda + Jost), spacing, radius, motion, and the status
palette are transcribed from the handoff. Inline styles preserve the exact spec;
structural/responsive behavior lives in `global.css`.

## Not wired (future backend work)

Real magic-link email, live gift catalog + imagery, payment, and the lifecycle
emails (`Fondly - Emails.dc.html`) are out of scope for the front end — they plug
in behind `src/data/app.ts` and the auth flow.

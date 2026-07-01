# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Fondly Web — the production front end for Fondly, an "AI gifting concierge," built from the
`design_handoff_fondly` "Luxe" design system. Vite + React 18 + TypeScript SPA. **Backend-agnostic
and backendless**: there are no network calls; all data is seeded in `src/data/app.ts`.

## Commands

```bash
npm run dev        # Vite dev server → http://localhost:5173
npm run build      # tsc -b (typecheck) + vite build
npm run typecheck  # tsc -b --noEmit — types only
npm run preview    # serve the production build
```

There is no test runner and no linter/formatter config. `tsc` is the only static gate — it runs in
`strict` mode with `noUnusedLocals`/`noUnusedParameters`/`noFallthroughCasesInSwitch`, so unused
imports and locals fail the build. Run `npm run typecheck` to validate a change.

Route/overflow verification is done with Puppeteer helpers against a running dev server (they drive
system Google Chrome, not bundled Chromium):
- `node scripts/sweep.mjs <screenshotDir> [width]` — visits every route, capturing console errors + horizontal-overflow offenders.
- `node scripts/shoot.mjs <url> <w> <h> <out> [measure]` — single screenshot; pass `measure` to list elements overflowing the viewport.

## Architecture

### `src/data/app.ts` is the backend seam — the most important file

Every export is a typed shape standing in for a future API resource: `currentUser`, `navItems`,
`people`, `needsYou`/`inMotion` (Home), `profile`, `refinePool`, `panels`, etc. **Screens import
data only from here.** To wire a real backend, replace these exports with `fetch()` calls returning
the same shapes — no screen should need to change. When adding a screen, add its data here first,
then consume it.

### Routing (`src/App.tsx`)

Two tiers:
- **Standalone full-page** routes: `/` (Landing), `/auth`, `/onboarding`.
- **In-app** routes nested under `/app`, all rendered inside `<AppShell>` via `<Outlet>`:
  `calendar`, `discover`, `studio`, `refine`, `approve`, `tracking`, `reaction`, `memory`,
  `from-fondly`, `alerts`, `settings`, `profile/:id`, `empty`. Unknown paths redirect to `/app`.

The gift flow is wired end-to-end: **Home → Studio → Refine → Approve → Tracking → Reaction**.

### `AppShell` — responsive three-pane shell (`src/components/AppShell.tsx`)

One shell, three layouts driven purely by CSS breakpoints in `global.css`:
- **≥1200px** — nav rail · content · right AI panel (all visible).
- **900–1200px** — nav + content; AI panel becomes a slide-over drawer (FAB/top-bar toggle).
- **<900px** — nav collapses to an off-canvas drawer; top bar + bottom tab bar appear; content full-width.

AppShell owns drawer state (`navOpen`, `panelOpen`), closes drawers on navigation and on Escape, and
sets off-canvas drawers `inert` while closed (no stray tab-stops). `prefers-reduced-motion` is honored.
`screenKeyFor(pathname)` maps the current route to a string key used to select the right AI-panel
content from `panels` in `app.ts`. When adding an in-app route, update `screenKeyFor` and add a
matching `panels[key]` entry.

### AI panel (`src/components/AIPanel.tsx`)

Context-aware right pane driven by `panels[screenKey]`. Cosmetic/ambient by design (a cycling
"working" line on a `setInterval`) — never load-bearing for the flow.

### Gift scoring (the one piece of real logic)

`refinePool` gifts carry four axes (`feel`, `spend`, `form`, `risk`, each −1/0/1). The Refine screen's
dials produce a preference vector; `scoreGift(pref, gift)` ranks the pool live by negative L1 distance
(closer = higher). This re-ranks the pre-scored pool in place — no backend involved.

### Theming (`src/theme/`)

A single "jewel" accent themes every surface through the CSS custom property `--g`. `ThemeProvider`
holds the value, writes it to `document.documentElement`, and persists it to `localStorage`
(`fondly.jewel`). Change it at Settings → Theme. `useTheme()` throws if used outside the provider.
Default lives in `theme/theme.ts` (`DEFAULT_JEWEL`).

### Styling convention

Two deliberate layers:
- **Inline styles** in components preserve the exact handoff spec (colors, type, spacing) verbatim.
- **`src/global.css`** holds design-system tokens as CSS vars under `:root` and all
  structural/responsive rules (breakpoints at 1200/900px, plus finer ones). Fonts are Bodoni Moda
  (`--f-display`) + Jost. Follow this split — don't move exact-spec values into CSS or responsive
  behavior into inline styles.

Shared primitives live in `src/components/ui.tsx` (`Avatar`, `StatusPill`, `ImgWell`, `Eyebrow`,
`AccentButton`). `StatusPill`/status colors key off the `Tone` union (`accent | done | plan | quiet | error`).

## Out of scope (future backend)

Real magic-link email, live gift catalog + imagery, payment, and lifecycle emails are not
implemented — they plug in behind `src/data/app.ts` and the auth flow.

# Changelog

## [0.1.3] — 2026-06-08

### Added

- **Kitchen sink gallery:** rebuilt `/kitchen-sink/` as a structured examples page — Components, Blocks, and Layouts sections with sticky on-page nav (`kitchen_sink_nav.njk`)

### Changed

- **Docs theme boot:** inline light/dark paint guard before first paint; consolidated `themeMode` / style-variant script; single stylesheet injection (no nova → swap flash)
- **Docs HTMX navigation:** swaps only `#content` page body — sticky header and footer stay mounted during in-app nav
- **Lobe brand images:** light/dark PNGs stacked in markup; CSS toggles visibility (removed `lobe-brand-theme.js` src swapping)
- **Geist fonts:** `font-display: optional` and preloads for 400/500/600 weights to reduce metric swap CLS
- **Dark mode toggle:** fixed-size icon stack in docs header (no layout shift on theme change)

### Fixed

- **CLS (docs site):** dark-mode FOUC where `html.dark > body` painted light before CSS loaded — attributed as Poor CLS in Core Web Vitals
- **Kitchen sink layout:** example content no longer renders behind the fixed sidebar; block/layout previews use horizontal scroll containers inside preview cards
- **Docs shell overflow:** removed `w-full` on `docs-main` alongside sidebar `margin-left` — fixes full-page horizontal scrollbar when sidebar is open
- **HTMX content swap:** `contain: layout` only during `.htmx-swapping`; min-height pinning prevents jumpy reflow mid-navigation

## [0.1.2] — 2026-06-07

### Added

- **DESIGN.md brand skins:** `cursor`, `claude`, `grok`, `openai`, `openclaw`, and `hermes` under `agents/design-md/<skin>/` with per-skin `tokens.css` overrides
- **CLI `design` command:** `npx @social-5h3ll/5h3ll-ui design <skin>` with aliases (`chatgpt`/`codex` → `openai`, `xai` → `grok`, `nousresearch` → `hermes`)
- **Design demo pages:** `/design-demos/<skin>/` with full-page replicas for OpenClaw and Hermes; generic token-swap demos for other skins
- **Design demos gallery:** `/integrations/design-md/demos/` — card list with open-in-new-tab demo links
- **OpenClaw demo interactivity:** `openclaw-demo.js` — quickstart mode tabs (One-liner / npm / Hackable / Apps), per-mode secondary toolbars (beta, npm/pnpm, installer/pnpm), copy buttons, typing animation
- **Hermes demo interactivity:** `hermes-demo.js` — macOS/Linux ↔ Windows install tabs, copy buttons, GRPO terminal demo sequence, scroll-reveal features, expandable “More Details”
- **OpenClaw replica sections:** testimonial marquee, feature cards (hover highlight), newsletter signup, sponsors grid, site topbar nav, light/dark theme toggle, full footer
- **Hermes replica polish:** header GitHub/Discord icons (`github_icon`, `discord_icon` macros), NousResearch dark mark in “See It in Action” visual panel
- **Demo assets:** OpenClaw sponsor SVGs (`docs/src/assets/sponsors/`), OpenClaw favicon (`docs/src/assets/openclaw/favicon.svg`)

### Changed

- **OpenClaw tokens:** coral-red primary brand (`#ff4d4d`), cyan as secondary; newsletter/sponsors/footer styling aligned with openclaw.ai
- **Hermes tokens:** blueprint grid background, double-border terminal, animated visual panel, platform-tab install UI
- **Design demo layout:** replica skins load skin CSS only (no Nova frame); per-skin demo scripts wired in `design-demo.njk`

### Fixed

- **OpenClaw Quick Start:** separate secondary toolbar per mode instead of stacking beta/npm controls in one bar
- **OpenClaw “Stay in the Loop”:** restructured to match openclaw.ai (title with accent, single description, inline subscribe form)
- **OpenClaw “Full System Access” card:** removed default highlight; all feature cards highlight on hover only
- **OpenClaw demo frame:** removed outer white border; `html`/`body` background matches skin
- **Hermes Discord icon:** corrected Simple Icons SVG path (was using OpenClaw variant)
- **Hermes terminal demo:** GRPO training script with tool timings, checklist, and saved-path output

## [0.1.1] — 2026-06-07

### Added

- **Docs blocks:** integration marquees (vertical/horizontal), stacked icons, grid; hero social proof, hero creative tools; CTA grid background, CTA learning split; newsletter inline, card, and split; contact simple, split, card, and global; share config modal
- **Docs layouts:** automation hero orbit, features grid/tabs, footer variants (premium, columns, minimal, serif, CTA band, compact), testimonial carousel/switcher/showcase/wall, community testimonials (+ marquee)
- **Shared docs data:** `integrationProviders`, `testimonials`, `orbitIcons`, `features`, `featuresTabs`, `shareConfigMembers`
- **Docs-only JS helpers:** globe.gl contact global map, Leaflet contact simple map, testimonial carousel/showcase, automation hero orbit subscribe bar, share config modal (QR + copy link), Lobe brand theme sync
- **Maintainer workflow:** `dev/` inbox, guides, portable agent rules (`npm run rules:sync`)

### Fixed

- **Security** (CVE-equivalent): toast component had four DOM XSS vectors. `title` and `description` were interpolated into `innerHTML` without escaping; `action.href` accepted `javascript:` and `data:` schemes; `action.onclick` and `cancel.onclick` were injected as inline `onclick` attributes; `new Function` executed arbitrary code from a data attribute. All four are now eliminated:
  - User text (title, description, labels) uses `textContent` — browser escapes automatically
  - URLs are validated; only `http:` and `https:` schemes pass
  - Inline `onclick` attributes removed entirely; click delegation handles close
  - `new Function` replaced with a `CustomEvent` (`ui5h3ll:toast:action`) dispatched on the toast element — host applications handle action callbacks via event listener
- **Contact global:** restored interactive 3D globe (globe.gl + Three.js) with Belfast HQ and global office arcs
- **Contact simple:** restored OpenStreetMap / Leaflet map centered on Belfast HQ with 5H3LL-UI token styling
- **Testimonial carousel / showcase:** replaced scroll-bar preview with working prev/next carousel behavior in docs
- **Automation hero orbit:** scrollable docs preview, expandable email subscribe bar, Lobe icon light/dark theme swap (OpenAI slug corrected to `openai` PNG)
- **Integration block previews:** moved loop data from `{% set %}` in includes to Eleventy `_data/*.js` so Preview/Code tabs render correctly
- **Integrations page:** global Lobe brand theme sync (replaces page-local script)

### Changed

- Root workspace version aligned to `0.1.1` with `@social-5h3ll/5h3ll-ui` and `@social-5h3ll/5h3ll-cli`
- Inbox integrations use 5H3LL-UI semantic tokens, [pravatar.cc](https://pravatar.cc/) avatars, and Lobe Icons CDN for brand marks

## [0.1.0] — 5H3LL-UI initial release

### Added

- First 5H3LL-UI release under social-5h3ll
- npm: `@social-5h3ll/5h3ll-ui`, `@social-5h3ll/5h3ll-cli`
- JS registry: `window.ui5h3ll` with `ui5h3ll:*` events and `data-ui5h3ll-*-initialized` flags
- CSS entrypoints: `5h3ll_ui.css` and eight standalone style packs (Vega, Nova, Maia, Lyra, Mira, Luma, Sera, Rhea)
- Three-layer CSS architecture: `base/` tokens, `components/` structure, `styles/` visuals
- Standalone Empty, Item, and Input Group component styles and docs
- Spinner docs and style-specific package entrypoints
- Docs site footer with copyright and attribution
- Segmented docs sidebar navigation (flat Getting started, collapsible Components submenu)
- Docs site layout guide at `/docs-site/`

### Changed

- 5H3LL-UI (attribution retained in `AUTHORS.md` and `LICENSE.md`)
- 5H3LL-UI release line starts at `0.1.0`, independent of upstream versioning
- Reworked component CSS so shared component files own structure and behavior hooks while style packs own visuals
- Updated component set toward current shadcn/ui styles
- Split Native Select documentation from custom Select documentation
- Docs use 5H3LL-UI HTML patterns instead of React/shadcn composition APIs

### Fixed

- Mobile sidebar toggle: aligned CSS init-flag selectors with `data-ui5h3ll-*-initialized` naming
- Sidebar active state: nested submenu links with `aria-current="page"` are styled correctly; parent submenu labels are no longer highlighted
- Docs sidebar active state syncs on HTMX navigation without a full page reload

### Breaking Changes

- Removed the `.form` convenience selector. Use explicit component classes (`label`, `input`, `textarea`, `select`) or compose fields with `.field` / `.fieldset`.
- Changed Combobox markup to an input-first structure with a hidden submitted value.
- Changed Command markup: `.command-dialog` wraps `.command` with role-based menu items.
- Removed Combobox-specific search behavior from Select.
- Non-default style packs are standalone bundles; do not load on top of the default/Vega bundle.
- Removed the old Form component page.

### Migration Notes

To keep the previous `.form` wrapper behavior, define it in your own Tailwind CSS:

```css
.form label { @apply label; }
.form input { @apply input; }
.form textarea { @apply textarea; }
.form select { @apply select; }
```

## Unreleased

_No changes yet._


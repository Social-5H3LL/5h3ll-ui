---
version: alpha
name: OpenAI-design-analysis
description: Inspired interpretation of OpenAI and ChatGPT marketing surfaces — high-contrast neutral canvas, calm sans typography, signature green primary for product CTAs, and dark chat/product panels. Applies to ChatGPT and OpenAI Codex agent workflows.

colors:
  primary: "#10a37f"
  primary-active: "#0d8c6c"
  ink: "#0d0d0d"
  body: "#404040"
  muted: "#6e6e80"
  hairline: "#ececf1"
  canvas: "#ffffff"
  canvas-soft: "#f7f7f7"
  surface-dark: "#212121"
  surface-dark-elevated: "#2f2f2f"
  on-primary: "#ffffff"
  on-dark: "#ececf1"

typography:
  display-lg:
    fontFamily: "Söhne, Inter, system-ui, sans-serif"
    fontSize: 48px
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: -0.02em
  title-md:
    fontFamily: "Söhne, Inter, system-ui, sans-serif"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.35
  body-md:
    fontFamily: "Söhne, Inter, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: "Söhne, Inter, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  code:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
  button:
    fontFamily: "Söhne, Inter, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1

rounded:
  sm: 6px
  md: 10px
  lg: 16px
  pill: 9999px

spacing:
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  section: 80px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 10px 18px
  button-secondary:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 10px 18px
  hero-band:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.display-lg}"
    padding: "{spacing.section}"
  chat-panel:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  feature-card:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.title-md}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
---

## 5H3LL-UI usage

Brand-direction companion for [5H3LL-UI](https://ui.5h3ll.site). Read [agents/SKILL.md](https://github.com/social-5h3ll/5h3ll-ui/blob/main/agents/SKILL.md) for markup rules.

- Keep 5H3LL-UI component classes (`.btn`, `.card`, `.alert`, …) — use this file for colors, type, spacing, and mood only.
- **Style pack** (Nova, Maia, Vega, …) stays the user's choice; do not replace it unless they ask.
- Map tokens to CSS variables when overriding: `{colors.primary}` → `--primary`, `{colors.canvas}` → `--background`, `{colors.ink}` → `--foreground`.
- Install this file: `npx @social-5h3ll/5h3ll-ui design openai`
- **OpenAI Codex** uses the same visual language as ChatGPT — point Codex agents at this file.

## Overview

OpenAI's public surfaces read as **calm, neutral, and product-first**. Marketing pages use a white or soft-gray canvas with near-black ink, restrained sans type, and the signature **OpenAI green** (`{colors.primary}` — #10a37f) reserved for primary actions and product affordances. Developer and Codex contexts inherit the same palette inside darker `{colors.surface-dark}` panels.

**Key characteristics:**
- Neutral canvas, not warm cream or saturated brand color fields.
- Green primary used sparingly on CTAs — not as page background.
- Dark panels for chat, code, and agent product mockups.
- Rounded pills for primary buttons; modest radius on cards.
- Monospace only on code, metrics, and API references.

## Colors

- **Primary green** (`{colors.primary}`): ChatGPT / OpenAI CTAs, success-adjacent accents.
- **Canvas** (`{colors.canvas}`): Default marketing floor.
- **Surface dark** (`{colors.surface-dark}`): Chat shells, Codex panels, footer bands.
- **Ink / body / muted**: Standard text hierarchy on light surfaces.

## Typography

Use **Söhne** or **Inter** substitutes. Display headlines at weight 600 with slight negative tracking. Body stays 400. Code in monospace at 13px.

## Components

Map OpenAI moods onto 5H3LL-UI primitives:

| Intent | 5H3LL-UI |
|--------|----------|
| Primary CTA | `.btn` with `--primary` override |
| Secondary CTA | `.btn-outline` |
| Marketing hero | `.card` or block hero + `.btn` row |
| Chat / Codex panel | `.card` on dark token overrides |
| Feature grid | `.card` + `.card` title/body slots |

## Do's and Don'ts

### Do
- Keep layouts airy with generous section spacing.
- Use green primary only for the main action per view.
- Switch to dark surfaces when showing agent/chat UI.

### Don't
- Don't flood the page with green backgrounds.
- Don't use serif display type — OpenAI marketing is sans-first.
- Don't invent React or shadcn component APIs.

## Agent prompt guide

> Build this page with 5H3LL-UI components. Follow `./DESIGN.md` for OpenAI / ChatGPT visual direction: white canvas, dark ink, green pill primary CTAs, dark panels for chat or Codex contexts. Map `{colors.primary}` to `--primary`. Style pack is optional.

## Known gaps

- Söhne is licensed; Inter is the practical substitute.
- Codex product UI adds review/diff chrome not fully captured here.
- ChatGPT consumer UI evolves independently of openai.com marketing.

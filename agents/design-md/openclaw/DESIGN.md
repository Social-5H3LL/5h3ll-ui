---
version: alpha
name: OpenClaw-design-analysis
description: Inspired interpretation of OpenClaw marketing (openclaw.ai) — deep navy starfield canvas, coral-red lobster brand accent, cyan secondary glow, terminal quick-start, testimonial cards, and feature grid.

colors:
  primary: "#ff4d4d"
  primary-active: "#e63946"
  primary-dark: "#991b1b"
  accent-cyan: "#00e5cc"
  accent-cyan-mid: "#14b8a6"
  ink: "#f0f4ff"
  body: "#8892b0"
  muted: "#5a6480"
  hairline: "rgba(136, 146, 176, 0.15)"
  canvas: "#050810"
  canvas-soft: "#0a0f1a"
  surface-card: "rgba(10, 15, 26, 0.88)"
  surface-elevated: "#111827"
  on-primary: "#ffffff"
  on-dark: "#f0f4ff"

typography:
  display-lg:
    fontFamily: "Clash Display, system-ui, sans-serif"
    fontSize: 72px
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: -0.03em
  hero-kicker:
    fontFamily: "Satoshi, Inter, system-ui, sans-serif"
    fontSize: 15px
    fontWeight: 500
    lineHeight: 1.4
    color: "{colors.primary}"
  body-md:
    fontFamily: "Satoshi, Inter, system-ui, sans-serif"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.65
  section-label:
    fontFamily: "Satoshi, Inter, system-ui, sans-serif"
    fontSize: 13px
    fontWeight: 600
    letterSpacing: 0.04em
    textTransform: uppercase
    color: "{colors.primary}"
  code:
    fontFamily: "SF Mono, Fira Code, JetBrains Mono, monospace"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.6

rounded:
  sm: 6px
  md: 10px
  lg: 12px
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
    rounded: "{rounded.md}"
  terminal-window:
    backgroundColor: "{colors.surface-elevated}"
    borderColor: "rgba(255, 77, 77, 0.3)"
    rounded: "{rounded.lg}"
  feature-card-highlight:
    borderColor: "rgba(255, 77, 77, 0.55)"
    shadow: "0 0 40px rgba(255, 77, 77, 0.12)"
  hero-title:
    gradient: "linear-gradient(135deg, #f0f4ff 0%, #ff4d4d 100%)"
---

## 5H3LL-UI usage

Brand-direction companion for [5H3LL-UI](https://ui.5h3ll.site). Read [agents/SKILL.md](https://github.com/social-5h3ll/5h3ll-ui/blob/main/agents/SKILL.md) for markup rules.

- Keep 5H3LL-UI component classes when building product UI — use this file for colors, type, spacing, and mood.
- **Style pack** stays the user's choice unless they ask otherwise.
- Map tokens to CSS variables: `{colors.primary}` → `--primary`, `{colors.canvas}` → `--background`.
- Install: `npx @social-5h3ll/5h3ll-ui design openclaw`
- Reference: [openclaw.ai](https://openclaw.ai/)
- Live replica demo: `/design-demos/openclaw/`

## Overview

OpenClaw marketing is a **dark starfield landing page**: navy canvas (`#050810`), **coral-red** lobster accent (`#ff4d4d`) on CTAs/logo/section labels, cyan (`#00e5cc`) as atmospheric glow only, glassy cards, terminal quick-start, testimonial grid, and feature cards with one red-highlighted tile.

## Agent prompt guide

> Match openclaw.ai: navy background, coral primary buttons, terminal install block, section labels prefixed with `⟩`, feature grid with red glow highlight. Cyan is secondary atmosphere — not the main CTA color.

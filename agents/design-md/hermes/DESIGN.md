---
version: alpha
name: Hermes-NousResearch-design-analysis
description: Inspired interpretation of Hermes Agent marketing (hermes-agent.nousresearch.com) — blueprint-blue grid on light periwinkle canvas, uppercase editorial type, install/configure blocks, terminal demo, and feature matrix.

colors:
  primary: "#0000f2"
  primary-soft: "#2b57ff"
  ink: "#0000f2"
  body: "rgba(0, 0, 242, 0.72)"
  muted: "rgba(0, 0, 242, 0.72)"
  hairline: "#0000f2"
  canvas: "#eceffd"
  canvas-soft: "#dfe6ff"
  surface-panel: "#dfe6ff"
  on-primary: "#ffffff"

typography:
  display-lg:
    fontFamily: "Georgia, Times New Roman, serif"
    fontSize: 42px
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: 0.02em
    textTransform: uppercase
  hero-eyebrow:
    fontFamily: "Courier New, Courier, monospace"
    fontSize: 11px
    fontWeight: 400
    letterSpacing: 0.18em
    textTransform: uppercase
  body-md:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.6
  ui-label:
    fontFamily: "Courier New, Courier, monospace"
    fontSize: 11px
    letterSpacing: 0.12em
    textTransform: uppercase
  code:
    fontFamily: "Courier New, Courier, monospace"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.5

rounded:
  sm: 0px
  md: 0px
  lg: 0px

spacing:
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  section: 64px

components:
  grid-cell:
    borderColor: "{colors.hairline}"
    borderWidth: 1px
  install-block:
    backgroundColor: "{colors.surface-panel}"
    borderColor: "{colors.hairline}"
  terminal-window:
    backgroundColor: "{colors.surface-panel}"
    borderColor: "{colors.hairline}"
---

## 5H3LL-UI usage

Brand-direction companion for [5H3LL-UI](https://ui.5h3ll.site). Read [agents/SKILL.md](https://github.com/social-5h3ll/5h3ll-ui/blob/main/agents/SKILL.md) for markup rules.

- Keep 5H3LL-UI component classes when building product UI — use this file for colors, type, spacing, and mood.
- **Style pack** stays the user's choice unless they ask otherwise.
- Map tokens to CSS variables: `{colors.primary}` → `--primary`, `{colors.canvas}` → `--background`.
- Install: `npx @social-5h3ll/5h3ll-ui design hermes`
- Reference: [hermes-agent.nousresearch.com](https://hermes-agent.nousresearch.com/)
- Live replica demo: `/design-demos/hermes/`

## Overview

Hermes Agent marketing is a **blueprint grid landing page**: light periwinkle canvas, electric blue (`#0000f2`) lines and text, square corners, uppercase headings, monospace install/configure blocks, split terminal + visual section, and a bordered 3×2 feature matrix.

## Agent prompt guide

> Match hermes-agent.nousresearch.com: light blue background, 1px blue grid borders, uppercase hero, step 1/2 install blocks with Copy, terminal demo panel, feature grid with MORE DETAILS footer row.

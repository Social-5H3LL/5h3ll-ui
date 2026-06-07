---
name: 5h3ll-ui
description: >-
  Use 5H3LL-UI in vanilla HTML/CSS/JS projects — shadcn-compatible components
  without React. Load when building UIs with HTMX, Django, Flask, Rails, PHP,
  or plain JavaScript. Reference ui.5h3ll.site docs, llms.txt, and component
  pages for markup, style packs, and behavior.
---

# 5H3LL-UI — User Skill

Portable skill for **using** 5H3LL-UI in your project. 

## What 5H3LL-UI is

- **Vanilla HTML/CSS/JS** component library matching shadcn/ui visuals
- **No React, Radix, or framework runtime** — works in any server-rendered or static stack
- **Docs:** [ui.5h3ll.site](https://ui.5h3ll.site)
- **npm:** `@social-5h3ll/5h3ll-ui`, CLI `@social-5h3ll/5h3ll-cli`
- **JS registry:** `window.ui5h3ll` (load `ui5h3ll.js` for interactive components)
- **Default CSS bundle:** `5h3ll_ui.css` (Vega style pack)

## Before you generate markup

1. Load **[llms.txt](https://ui.5h3ll.site/llms.txt)** for a plain-text index of all documentation (preview at [integrations/llms](https://ui.5h3ll.site/integrations/llms/)).
2. Open the **specific component or block page** for the control you need (e.g. `/components/button`, `/blocks/ai-chat-panel`).
3. Read **installation** and **customization** if setting up CSS imports or themes.
4. If the user wants a **brand aesthetic** (Cursor, Claude, Grok, OpenAI/ChatGPT/Codex, OpenClaw, Hermes), install the matching [DESIGN.md skin](https://ui.5h3ll.site/integrations/design-md/) to `./DESIGN.md` and read it for colors, type, and mood — **style pack** (Nova, Maia, Vega, …) remains their structural choice.

## Install (typical)

```css
@import "tailwindcss";
@import "@social-5h3ll/5h3ll-ui";
```

Or pick a style pack: `@import "@social-5h3ll/5h3ll-ui/nova";`

```html
<script src="/path/to/ui5h3ll.js" defer></script>
```

Only load individual JS files for components that need behavior (dropdown-menu, popover, select, sidebar, tabs, toast, combobox, command).

## Markup rules

1. **One root class** per component (e.g. `.btn`, `.card`, `.alert`).
2. **Semantic children** — prefer `button`, `a`, `input`, `label`, `section`, `header`, `fieldset` over extra wrapper classes.
3. **Native elements first** — `<dialog>`, `<details>`, `<select>` before custom JS widgets.
4. **ARIA only for behavior** — not for styling; describe state and relationships.
5. **Copy examples from docs** — do not invent `data-slot`, `cn-*`, or React-only patterns.

## CSS architecture (consumer view)

| Layer | What you import | Purpose |
|-------|-----------------|---------|
| Base + components | `5h3ll_ui-base.css` or default bundle | Tokens, layout, structure |
| Style pack | `5h3ll_ui-{vega,nova,maia,lyra,mira,luma,sera,rhea}.css` | Colors, radius, shadows, variants |

Override tokens via `:root` / `.dark` CSS variables — see the customization guide.

## Interactive components

Register with `window.ui5h3ll` after DOM ready. Init is idempotent via `data-ui5h3ll-{component}-initialized`.

Custom events: `ui5h3ll:theme`, `ui5h3ll:toast`, `ui5h3ll:sidebar`, `ui5h3ll:popover`, `ui5h3ll:initialized`.

## Theming

- Toggle dark mode with `.dark` on `<html>` or a wrapper.
- Use logical utilities (`ps`, `pe`, `ms`, `me`, `start`, `end`) for RTL-friendly layouts.
- Eight style packs ship standalone — do not stack one pack on top of another.

## Documentation map

| Need | Source |
|------|--------|
| Full site index | [ui.5h3ll.site/llms.txt](https://ui.5h3ll.site/llms.txt) |
| llms preview page | [integrations/llms](https://ui.5h3ll.site/integrations/llms/) |
| Setup | [Installation](https://ui.5h3ll.site/installation/) |
| Tokens & packs | [Customization](https://ui.5h3ll.site/customization/) |
| Component API | [Components](https://ui.5h3ll.site/components/button/) |
| Page sections | [Blocks](https://ui.5h3ll.site/blocks/ai-chat-panel/) |
| Agent integrations | [Integrations](https://ui.5h3ll.site/integrations/) |
| Brand DESIGN.md skins | [integrations/design-md](https://ui.5h3ll.site/integrations/design-md/) |

## Brand direction (optional)

```bash
npx @social-5h3ll/5h3ll-ui design claude   # or cursor, grok, openai, openclaw, hermes
```

- **`openai`** covers ChatGPT and **OpenAI Codex** (same skin).
- **`grok`** covers x.AI / Grok.
- Gemini and Lovable skins planned for a later release.

Read `./DESIGN.md` after install. Map `{colors.primary}` → `--primary`, etc. Keep 5H3LL-UI component classes from docs.

## When implementing a task

1. Identify the component or block from docs — do not guess class names.
2. Match the documented HTML structure and variants (`btn-outline`, `alert-destructive`, etc.).
3. Add behavior JS only when the docs page says it is required.
4. Prefer composition (card + button + input) over new custom CSS when docs show a pattern.

## Do not

- Port React/Radix markup or `asChild` patterns.
- Assume every shadcn component exists; check docs first.
- Hand-edit generated bundle files under `node_modules/@social-5h3ll/5h3ll-ui`.

## Links

- GitHub: [social-5h3ll/5h3ll-ui](https://github.com/social-5h3ll/5h3ll-ui)
- This skill (raw): [agents/SKILL.md](https://github.com/social-5h3ll/5h3ll-ui/blob/main/agents/SKILL.md)

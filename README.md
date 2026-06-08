# 5H3LL-UI

[![npm version](https://img.shields.io/npm/v/@social-5h3ll/5h3ll-ui?style=flat-square)](https://www.npmjs.com/package/@social-5h3ll/5h3ll-ui)
[![license](https://img.shields.io/npm/l/@social-5h3ll/5h3ll-ui?style=flat-square)](LICENSE.md)

5H3LL-UI is a Tailwind CSS, vanilla HTML/CSS/JavaScript implementation of the shadcn/ui design system — components for any web stack without React, Radix, or framework runtime dependencies.

![5H3LL-UI](screenshots/5h3ll-ui_cover.jpg)

## Features

- **Semantic HTML-first** components built on accessible markup.
- **Tailwind CSS v4** source files and generated CSS bundles.
- **Vanilla JavaScript** for components that need behavior — no framework required.
- **Nunjucks and Jinja** template macros for templating workflows.
- **Eight style packs** — Vega, Nova, Maia, Lyra, Mira, Luma, Sera, and Rhea.
- **Dark mode** and full CSS variable theming.
- **Three usage paths** — CDN, npm, and CLI.

## Themes

5H3LL-UI ships with semantic token-based theming. Switch between packs or use the base layer to build your own.

| Light | Dark |
|-------|------|
| ![Light Mode](screenshots/5h3ll-ui_default_light.jpg) | ![Dark Mode](screenshots/5h3ll-ui_default_dark.jpg) |

## Quick Start

```bash
npm install @social-5h3ll/5h3ll-ui
```

```css
@import "tailwindcss";
@import "@social-5h3ll/5h3ll-ui";
```

Or use a specific style pack:

```css
@import "tailwindcss";
@import "@social-5h3ll/5h3ll-ui/nova";
```

## Documentation

- **Website** — [ui.5h3ll.site](https://ui.5h3ll.site)
- **Installation** — [ui.5h3ll.site/installation](https://ui.5h3ll.site/installation)
- **Customization** — [ui.5h3ll.site/customization](https://ui.5h3ll.site/customization)

## Packages

This repository publishes two workspace packages:

- [`@social-5h3ll/5h3ll-ui`](packages/css/README.md) — CSS, JavaScript, Nunjucks macros, and Jinja macros.
- [`@social-5h3ll/5h3ll-cli`](packages/cli/README.md) — CLI for adding 5H3LL-UI assets to a project.

## CSS Architecture

5H3LL-UI separates structure from style:

| Layer | Path | Purpose |
|-------|------|---------|
| Base | `src/css/base/base.css` | Shared tokens and semantic utilities |
| Components | `src/css/components/*.css` | Layout, accessibility selectors, behavior hooks |
| Styles | `src/css/styles/*.css` | Visual rules — color, radius, shadow, typography, spacing |

Generated source entrypoints are committed for transparency and package imports:

- `src/css/5h3ll_ui.css` — default Vega bundle
- `src/css/5h3ll_ui-base.css` — base + components, no style pack
- `src/css/5h3ll_ui-components.css` — component imports only
- `src/css/5h3ll_ui-{style}.css` — base + one style pack
- `src/css/5h3ll_ui-{style}.cdn.css` — CDN-compatible wrapper

## Repository Layout

```
.
├── docs/ Eleventy documentation site
├── packages/
│   ├── cli/               Published CLI package
│   └── css/              Published CSS package
├── scripts/               Build and generation scripts
└── src/
    ├── css/
    │   ├── base/          Shared tokens, base layer, semantic utilities
    │   ├── components/    Component structure and behavior hooks
    │   └── styles/        Style-pack visual rules
    ├── jinja/             Jinja component macros
    ├── js/                Vanilla JS components and registry
    └── nunjucks/          Nunjucks component macros
```

## Development

```bash
# Install dependencies
npm i

# Run the docs site
npm run docs:dev

# Build package assets
npm run build

# Build the static docs site
npm run docs:build

# Run the Workers docs site locally
npm run workers:dev

# Deploy the Workers docs site
npm run workers:deploy
```

## Links

- **GitHub** — [social-5h3ll/5h3ll-ui](https://github.com/social-5h3ll/5h3ll-ui)
- **X** — [@social5h3ll](https://x.com/social5h3ll)
- **Docs** — [ui.5h3ll.site](https://ui.5h3ll.site)

## License

[MIT](LICENSE.md)

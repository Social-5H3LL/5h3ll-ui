# @social-5h3ll/5h3ll-cli

This package provides a Command Line Interface (CLI) to help you quickly scaffold [5H3LL-UI](https://ui.5h3ll.site) components into your project.

## Prerequisites

- Ensure you have Node.js and npm (or your preferred package manager) installed.
- For the components to function correctly, your project should have:
  - [Tailwind CSS](https://tailwindcss.com/docs/installation) installed and configured.
  - The `@social-5h3ll/5h3ll-ui` package installed and imported (or `5h3ll_ui.css` manually added).

## Usage

Use the `add` command to add components to your project:

```bash
# npx
npx 5h3ll-ui add [component]

# pnpm
pnpm dlx 5h3ll-ui add [component]

# bun
bunx 5h3ll-ui add [component]

# yarn
yarn dlx 5h3ll-ui add [component]
```

Replace `[component]` with the name of the component you wish to add (e.g., `dialog`, `select`) or leave it out if you want to pick from the list of available components
or install all of them at once.

### DESIGN.md skins

Copy a brand-direction file to `./DESIGN.md`:

```bash
npx @social-5h3ll/5h3ll-ui design cursor
npx @social-5h3ll/5h3ll-ui design openai   # ChatGPT + Codex
```

Skins: `cursor`, `claude`, `grok`, `openai`, `openclaw`, `hermes`. See [integrations/design-md](https://ui.5h3ll.site/integrations/design-md/).

The CLI will prompt you for:

1.  **Template Engine:** Choose between Nunjucks (`.njk`) or Jinja (`.html.jinja`).
2.  **Assets Directory:** The path where component assets (like JavaScript files) should be placed (e.g., `src/assets/js/components`).
3.  **Macros Directory:** The path where component macros should be placed (e.g., `src/_includes/macros/components`).

The CLI will then copy the necessary JavaScript files and Nunjucks/Jinja macros for the selected component into the specified directories.

### Example

To add the `dialog` component:

```bash
npx 5h3ll-ui add dialog
```

## Documentation

For more detailed information on components, their usage, and customization options, please refer to the [5H3LL-UI documentation](https://ui.5h3ll.site/installation/#install-cli).

## License

[MIT](https://github.com/social-5h3ll/5h3ll-ui/blob/main/LICENSE.md)

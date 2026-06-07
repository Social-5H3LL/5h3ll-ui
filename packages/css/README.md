# @social-5h3ll/5h3ll-ui

This package provides the core CSS styles for [5H3LL-UI](https://ui.5h3ll.site), a component library built with Tailwind CSS.

## Prerequisites

Your project must have [Tailwind CSS](https://tailwindcss.com/docs/installation) installed and configured, as 5H3LL-UI relies on Tailwind utility classes and theming.

## Installation

Install with any package manager:

```bash
npm install @social-5h3ll/5h3ll-ui # or pnpm add / yarn add / bun add
```

## Usage

Add it just after Tailwind in your stylesheet:

```css
@import "tailwindcss";
@import "@social-5h3ll/5h3ll-ui";
```

That's it, you can use any 5H3LL-UI class (`btn`, `card`, `input`, etc) in your markup.

To use a specific style, import its standalone bundle instead:

```css
@import "tailwindcss";
@import "@social-5h3ll/5h3ll-ui/sera";
```

### (Optional) JavaScript files

Some interactive components (Dropdown Menu, Popover, Select, Sidebar, Tabs, Toast) need some JavaScript.

With a build tool (ESM):

```js
import '@social-5h3ll/5h3ll-ui/all';
```

Or cherry-pick the components you need:

```js
import '@social-5h3ll/5h3ll-ui/tabs';
import '@social-5h3ll/5h3ll-ui/popover';
```

Without a build tool, copy the files from `node_modules`:

```bash
npx copyfiles -u 1 "node_modules/@social-5h3ll/5h3ll-ui/dist/js/**/*" public/js/5h3ll-ui
```

Then reference what you need, e.g.

```html
<script src="/js/5h3ll-ui/tabs.min.js" defer></script>
```

## Documentation

For more detailed information on components, their usage, and customization options, please refer to the [5H3LL-UI documentation](https://ui.5h3ll.site/installation/#install-css).

## License

[MIT](https://github.com/social-5h3ll/5h3ll-ui/blob/main/LICENSE.md)

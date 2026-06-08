# Integrating sensory-ui with 5H3LL-UI

## Architecture fit

5H3LL-UI uses:

- **Markup** — `.btn`, `.dialog`, `.toast`, etc.
- **JS registry** — `ui5h3ll.js` + per-component modules
- **Events** — `ui5h3ll:theme`, `ui5h3ll:sidebar`, `ui5h3ll:toast:action`

sensory-ui (React) uses a `sound` prop on shadcn components. The 5H3LL equivalent is **`data-sound="<role>"`** plus optional hooks inside existing JS modules.

## Wiring levels

### Level 1 — Declarative (spike)

`sensory.js` delegates clicks on `[data-sound]` and watches checkbox/switch changes. Zero changes to core components.

### Level 2 — Component hooks (production)

Call `window.ui5h3llSensory?.play('overlay.open')` from:

| Module | Roles |
|--------|-------|
| `dialog.js` | `overlay.open`, `overlay.close` |
| `tabs.js` | `navigation.tab` |
| `toast.js` | `notification.*` by category |
| `dropdown-menu.js` / `popover.js` | `overlay.open`, `overlay.close` |

### Level 3 — Macros (optional)

```njk
{{ button("Save", sound="interaction.confirm") }}
```

Emits `data-sound="interaction.confirm"` on the root element.

## Docs site demo path

1. Copy `addons/sensory-ui/sensory.js` → `docs/src/assets/js/sensory.js`
2. Add script to `base.njk` (behind a flag or kitchen-sink only first)
3. Add kitchen-sink section "Sensory" with buttons + toasts

## CLI `addon` command (to implement)

Mirror `design` in `packages/cli/index.js`:

```js
program
  .command('addon')
  .argument('[name]', 'Add-on name (sensory-ui)')
  .action(async (name) => {
    // copy from dist/assets/addons/<name>/*
    // prompt for scriptDest like `add` command
  });
```

`scripts/build.js`:

```js
await copyDirRecursive(
  path.join(projectRoot, 'addons'),
  path.join(cliDistAssetsDir, 'addons')
);
```

## HTMX / dynamic DOM

`sensory.js` uses event delegation on `document` — new nodes from HTMX swaps work without re-init. Toast/dialog sounds should fire from component JS after swap when `ui5h3ll.initAll()` runs.

## Accessibility

- Default **off** until first user gesture unlocks AudioContext
- Honor `prefers-reduced-motion: reduce`
- Global kill-switch: `data-sensory="off"` on `<html>` or `localStorage['5h3ll-sensory'] === 'off'`
- Every sound must have a visual equivalent (already true in 5H3LL components)

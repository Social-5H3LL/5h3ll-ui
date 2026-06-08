# sensory-ui for 5H3LL-UI (spike)

Vanilla port of the idea behind [sensory-ui](https://www.sensory-ui.com/#showcase) — semantic UI sounds via Web Audio API, no React, no audio files.

**Not production-ready.** Proves the add-on packaging model before a CLI `addon` command ships.

## Planned install (matches `design` ergonomics)

```bash
npx @social-5h3ll/5h3ll-ui addon sensory-ui
```

Would copy:

- `sensory.js` → your project (e.g. `./static/js/5h3ll-ui/sensory.js`)
- Print script tag + `data-sound` usage

## Manual try (today)

1. Copy `sensory.js` into your app's static JS folder.
2. Load **after** `ui5h3ll.js`:

```html
<script src="/assets/js/ui5h3ll.js" defer></script>
<script src="/assets/js/sensory.js" defer></script>
```

3. Mark elements:

```html
<button class="btn" data-sound="interaction.tap">Save</button>
<input type="checkbox" class="input" data-sound="interaction.toggle" />
```

4. Opt out globally: `localStorage.setItem('5h3ll-sensory', 'off')` or `data-sensory="off"` on `<html>`.

See [INTEGRATION.md](./INTEGRATION.md) for roles and component mapping.

## Sound roles (v0 spike)

Subset of sensory-ui's 17 roles — procedural tones only:

| Role | Use |
|------|-----|
| `interaction.tap` | Buttons, links |
| `interaction.toggle` | Checkbox, switch, radio |
| `overlay.open` / `overlay.close` | Dialog, drawer |
| `navigation.tab` | Tabs |
| `notification.success` | Toast (category success) |

Respects `prefers-reduced-motion: reduce`.

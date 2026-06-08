# 5H3LL-UI add-ons

Optional capabilities that ship **beside** the core library — same idea as `agents/design-md/` skins, but for behavior modules instead of brand tokens.

| Add-on | Status | Future CLI |
|--------|--------|------------|
| [sensory-ui](./sensory-ui/) | Spike / experiment | `npx @social-5h3ll/5h3ll-ui addon sensory-ui` |

## How this mirrors `design`

| | `design cursor` | `addon sensory-ui` (planned) |
|---|-----------------|------------------------------|
| **Source** | `agents/design-md/<skin>/` | `addons/<name>/` |
| **Build** | Copied to `packages/cli/dist/assets/design-md/` | Copied to `packages/cli/dist/assets/addons/` |
| **Install** | Writes `./DESIGN.md` | Copies JS + prints wiring steps |
| **Runtime** | Agent reads DESIGN.md | Browser loads `sensory.js`, `data-sound` hooks |

## Experiment here (no pub-release copy needed)

Use **this repo** as the sandbox — the pub zip is the same tree minus `dev/`. To try an add-on:

1. Work in `addons/<name>/`
2. Symlink or copy `sensory.js` into `docs/src/assets/js/` for a docs demo
3. When stable: wire `scripts/build.js` + `packages/cli/index.js` `addon` command

Do **not** duplicate the full release into a subfolder; it drifts instantly. Keep spikes in `addons/` and test against the live docs site.

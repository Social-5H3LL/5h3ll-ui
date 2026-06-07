# 5H3LL-UI DESIGN.md skins

Brand-direction files for AI agents — complementary to [agents/SKILL.md](../SKILL.md) and 5H3LL-UI style packs.

| Skin | Covers | Source |
|------|--------|--------|
| `cursor` | Cursor IDE / marketing | Adapted from [awesome-design-md](https://github.com/VoltAgent/awesome-design-md) |
| `claude` | Anthropic Claude | Adapted from awesome-design-md |
| `grok` | x.AI / Grok | Adapted from awesome-design-md (`x.ai`) |
| `openai` | ChatGPT + OpenAI Codex | 5H3LL-authored |
| `openclaw` | OpenClaw | 5H3LL-authored; [openclaw.ai](https://openclaw.ai/) landing replica |
| `hermes` | NousResearch Hermes | 5H3LL-authored; [hermes-agent.nousresearch.com](https://hermes-agent.nousresearch.com/) landing replica |

**Planned (v0.1.3):** Gemini, Lovable.

## Install

Copies `./DESIGN.md` to your project root (overwrites if present):

```bash
npx @social-5h3ll/5h3ll-ui design cursor
npx @social-5h3ll/5h3ll-ui design claude
npx @social-5h3ll/5h3ll-ui design grok
npx @social-5h3ll/5h3ll-ui design openai    # ChatGPT + Codex
npx @social-5h3ll/5h3ll-ui design openclaw
npx @social-5h3ll/5h3ll-ui design hermes
```

Aliases: `chatgpt`, `codex`, and `xai` resolve to `openai` or `grok` as appropriate.

## How it fits together

1. **SKILL.md** — correct 5H3LL-UI markup and behavior  
2. **Style pack** — Nova, Maia, Vega, … (user's choice)  
3. **DESIGN.md** — optional brand look and feel  

Map design tokens to CSS variables when overriding, e.g. `{colors.primary}` → `--primary`.

## Raw files in repo

- [cursor/DESIGN.md](./cursor/DESIGN.md)
- [claude/DESIGN.md](./claude/DESIGN.md)
- [grok/DESIGN.md](./grok/DESIGN.md)
- [openai/DESIGN.md](./openai/DESIGN.md)
- [openclaw/DESIGN.md](./openclaw/DESIGN.md)
- [hermes/DESIGN.md](./hermes/DESIGN.md)

Docs: [ui.5h3ll.site/integrations/design-md](https://ui.5h3ll.site/integrations/design-md/) · [Live demos](https://ui.5h3ll.site/integrations/design-md/demos/)

Each skin includes `tokens.css` — CSS variable overrides used by the [prebuilt demo pages](https://ui.5h3ll.site/integrations/design-md/demos/).

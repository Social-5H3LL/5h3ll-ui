---
templateEngineOverride: njk
layout: layouts/page.njk
title: DESIGN.md skins
description: Brand-direction DESIGN.md files for AI agents — complementary to agents/SKILL.md and 5H3LL-UI style packs.
icon: palette
toc:
  - label: Overview
    id: overview
  - label: Install
    id: install
  - label: Available skins
    id: skins
  - label: With agents
    id: agents
  - label: Live demos
    id: demos
---

{% from "macros/code_block.njk" import code_block %}

<h2 id="overview"><a href="#overview">Overview</a></h2>

<div class="prose">
  <p><strong>DESIGN.md</strong> files tell agents how a UI should <em>look and feel</em> for a given brand. They complement <a href="https://github.com/social-5h3ll/5h3ll-ui/blob/main/agents/SKILL.md"><code>agents/SKILL.md</code></a> (how to build with 5H3LL-UI) and your chosen <a href="/customization/">style pack</a> (Nova, Maia, Vega, …).</p>
  <ul>
    <li><b>SKILL.md</b> — markup rules, component classes, behavior</li>
    <li><b>Style pack</b> — structural theme (user's choice)</li>
    <li><b>DESIGN.md</b> — brand colors, type mood, spacing philosophy</li>
  </ul>
  <p>Install copies <code>./DESIGN.md</code> to your project root. Map design tokens to CSS variables when overriding — e.g. <code>{colors.primary}</code> → <code>--primary</code>.</p>
</div>

<h2 id="install"><a href="#install">Install</a></h2>

<div class="prose">
{% set code %}npx @social-5h3ll/5h3ll-ui design cursor
npx @social-5h3ll/5h3ll-ui design claude
npx @social-5h3ll/5h3ll-ui design grok
npx @social-5h3ll/5h3ll-ui design openai
npx @social-5h3ll/5h3ll-ui design openclaw
npx @social-5h3ll/5h3ll-ui design hermes{% endset %}
{{ code_block(code, "bash") }}
  <p>Aliases: <code>chatgpt</code> and <code>codex</code> → <code>openai</code>; <code>xai</code> → <code>grok</code>; <code>nousresearch</code> → <code>hermes</code>.</p>
  <p>Run without a skin name to pick from a list interactively.</p>
</div>

<h2 id="skins"><a href="#skins">Available skins</a></h2>

<div class="prose">
  <table>
    <thead>
      <tr><th>Skin</th><th>Brand</th><th>Notes</th></tr>
    </thead>
    <tbody>
      <tr><td><code>cursor</code></td><td>Cursor</td><td>Adapted from awesome-design-md</td></tr>
      <tr><td><code>claude</code></td><td>Anthropic Claude</td><td>Adapted from awesome-design-md</td></tr>
      <tr><td><code>grok</code></td><td>x.AI / Grok</td><td>Adapted from awesome-design-md</td></tr>
      <tr><td><code>openai</code></td><td>ChatGPT + OpenAI Codex</td><td>5H3LL-authored; Codex uses this skin</td></tr>
      <tr><td><code>openclaw</code></td><td>OpenClaw</td><td>5H3LL-authored</td></tr>
      <tr><td><code>hermes</code></td><td>NousResearch Hermes</td><td>5H3LL-authored</td></tr>
    </tbody>
  </table>
  <p><b>Planned (v0.1.3):</b> Gemini, Lovable.</p>
  <p>Source files live in <a href="https://github.com/social-5h3ll/5h3ll-ui/tree/main/agents/design-md"><code>agents/design-md/</code></a> on GitHub.</p>
</div>

<h2 id="agents"><a href="#agents">With agents</a></h2>

<div class="prose">
  <p>Typical agent workflow:</p>
  <ol>
    <li>Load <a href="/llms.txt" hx-boost="false"><code>/llms.txt</code></a> and <code>agents/SKILL.md</code>.</li>
    <li>Install a DESIGN.md skin if the user wants a brand direction.</li>
    <li>Copy markup from the relevant component or block docs page.</li>
    <li>Apply token overrides from <code>./DESIGN.md</code> via <code>:root</code> / <code>.dark</code> — keep 5H3LL-UI class names.</li>
  </ol>
  <p>Do not replace 5H3LL-UI components with custom markup from DESIGN.md component names — use DESIGN.md for visual direction only.</p>
</div>

<h2 id="demos"><a href="#demos">Live demos</a></h2>

<div class="prose">
  <p>Prebuilt demo pages show each skin on real 5H3LL-UI components. Browse them on the <a href="/integrations/design-md/demos/">DESIGN.md demos</a> page — each opens in a new tab:</p>
  <ul>
    {% for item in designSkins %}
      <li><a href="/design-demos/{{ item.id }}/" target="_blank" rel="noopener noreferrer">{{ item.label }}</a> — {{ item.brand }}</li>
    {% endfor %}
  </ul>
</div>

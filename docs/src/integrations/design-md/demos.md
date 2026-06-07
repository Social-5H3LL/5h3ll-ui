---
templateEngineOverride: njk
layout: layouts/page.njk
title: DESIGN.md demos
description: Prebuilt live previews for each 5H3LL-UI DESIGN.md brand skin — open each demo in a new tab.
icon: swatch-book
toc:
  - label: Demos
    id: demos
  - label: Install
    id: install
head: |
  <link rel="stylesheet" href="/assets/design-skins-gallery.css">
---

{% from "macros/code_block.njk" import code_block %}

<h2 id="demos"><a href="#demos">Demos</a></h2>

<div class="prose">
  <p>Each skin has a <strong>standalone prebuilt demo page</strong>. OpenClaw and Hermes are full landing-page replicas of their marketing sites; the other skins use compact 5H3LL-UI component previews with token overrides. Open any demo in a new tab.</p>
</div>

<div class="design-skin-demo-list my-8">
  {% for item in designSkins %}
    <article class="card design-skin-demo-list-item">
      <header class="flex flex-wrap items-start justify-between gap-3">
        <div class="space-y-1">
          <h3 class="text-base font-semibold leading-none">{{ item.label }}</h3>
          <p class="text-sm text-muted-foreground">{{ item.brand }}</p>
        </div>
        <a href="/design-demos/{{ item.id }}/" class="btn-sm" target="_blank" rel="noopener noreferrer">
          Open demo
          {% lucide "external-link" %}
        </a>
      </header>
      <section class="text-sm text-muted-foreground">{{ item.description }}</section>
      <footer class="flex flex-wrap gap-2 text-sm">
        <a href="{{ item.siteUrl }}" class="badge-outline" target="_blank" rel="noopener noreferrer">
          Brand site
          {% lucide "arrow-up-right" %}
        </a>
        <span class="badge-secondary">{{ item.mode }} demo</span>
      </footer>
    </article>
  {% endfor %}
</div>

<h2 id="install"><a href="#install">Install</a></h2>

<div class="prose">
  <p>Copy the agent-facing <code>DESIGN.md</code> file for any skin:</p>
{% set code %}npx @social-5h3ll/5h3ll-ui design openclaw
npx @social-5h3ll/5h3ll-ui design hermes{% endset %}
{{ code_block(code, "bash") }}
  <p>Demo token CSS lives beside each skin at <a href="https://github.com/social-5h3ll/5h3ll-ui/tree/main/agents/design-md"><code>agents/design-md/&lt;skin&gt;/tokens.css</code></a>.</p>
  <p>See also: <a href="/integrations/design-md/">DESIGN.md skins overview</a>.</p>
</div>

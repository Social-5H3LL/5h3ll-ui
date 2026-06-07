---
templateEngineOverride: njk
layout: layouts/page.njk
title: Integrations grid
description: Responsive grid of integration cards with logo, description, and learn-more footer — Lobe Icons CDN logos.
icon: layout-grid
toc:
  - label: Overview
    id: overview
  - label: Examples
    id: examples
    children:
      - label: Default
        id: example-default
      - label: Composition
        id: example-composition
---

{% from "macros/code_preview.njk" import code_preview %}

<h2 id="overview"><a href="#overview">Overview</a></h2>

<div class="prose">
  <p>The <strong>Integrations grid</strong> block displays six AI integration cards in a responsive grid. Each card uses the <a href="/components/card/">Card</a> pattern with a Lobe Icons CDN logo, description, and external learn-more action.</p>
  <p>Hook class: <code>block-integrations-grid</code>.</p>
</div>

<h2 id="examples"><a href="#examples">Examples</a></h2>

<h3 id="example-default"><a href="#example-default">Default</a></h3>

{% set code %}
{% include "partials/blocks/integrations-grid.njk" %}
{% endset %}
{{ code_preview("block-integrations-grid", code, "w-full") }}

<h3 id="example-composition"><a href="#example-composition">Composition</a></h3>

<div class="prose">
  <p>This block composes:</p>
  <ul>
    <li><a href="/components/card/">Card</a> — header, section, dashed footer</li>
    <li><a href="/components/button/">Button</a> — outline footer link with Lucide arrow</li>
    <li>Remote Lobe Icons CDN logos — one per provider</li>
  </ul>
</div>

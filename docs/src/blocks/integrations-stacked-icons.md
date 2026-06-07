---
templateEngineOverride: njk
layout: layouts/page.njk
title: Integrations stacked icons
description: Centered integration block with overlapping circular icon buttons and a primary CTA — Lobe Icons CDN brand marks.
icon: layers
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
  <p>The <strong>Integrations stacked icons</strong> block highlights a row of overlapping integration marks above a single call to action. Each mark is a Lobe Icons CDN SVG inside an icon <a href="/components/button/">Button</a>.</p>
  <p>Hook class: <code>block-integrations-stacked-icons</code>.</p>
</div>

<h2 id="examples"><a href="#examples">Examples</a></h2>

<h3 id="example-default"><a href="#example-default">Default</a></h3>

{% set code %}
{% include "partials/blocks/integrations-stacked-icons.njk" %}
{% endset %}
{{ code_preview("block-integrations-stacked-icons", code, "w-full max-w-3xl") }}

<h3 id="example-composition"><a href="#example-composition">Composition</a></h3>

<div class="prose">
  <p>This block composes:</p>
  <ul>
    <li><code>btn-icon-outline</code> — circular stacked controls with hover scale</li>
    <li><code>btn</code> — primary CTA link</li>
    <li>Shared provider data from <code>_data/integrationProviders.js</code></li>
  </ul>
</div>

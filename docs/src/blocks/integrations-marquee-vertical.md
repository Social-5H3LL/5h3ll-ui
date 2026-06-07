---
templateEngineOverride: njk
layout: layouts/page.njk
title: Integrations marquee (vertical)
description: Integration showcase block with split layout — copy and CTA beside a dual-column vertical logo marquee with Lobe Icons CDN marks.
icon: rows-3
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
  <p>The <strong>Integrations marquee (vertical)</strong> block pairs marketing copy with two infinitely scrolling columns of integration tiles. Brand logos load from the <a href="https://lobehub.com/icons">Lobe Icons</a> CDN as remote SVG images — no npm install or local assets.</p>
  <p>Hook class: <code>block-integrations-marquee-vertical</code>. Marquee motion is docs-only CSS in <code>docs/css/custom.css</code>.</p>
</div>

<h2 id="examples"><a href="#examples">Examples</a></h2>

<h3 id="example-default"><a href="#example-default">Default</a></h3>

{% set code %}
{% include "partials/blocks/integrations-marquee-vertical.njk" %}
{% endset %}
{{ code_preview("block-integrations-marquee-vertical", code, "w-full") }}

<h3 id="example-composition"><a href="#example-composition">Composition</a></h3>

<div class="prose">
  <p>This block composes:</p>
  <ul>
    <li><a href="/components/badge/">Badge</a> — section label</li>
    <li><a href="/components/button/">Button</a> — outline CTA</li>
    <li><a href="/components/card/">Card</a> — one per marquee tile</li>
    <li>Remote <code>&lt;img&gt;</code> logos via Lobe Icons CDN (see <code>dev/LOBE-ICONS.md</code> in the maintainer workspace)</li>
  </ul>
  <p>Provider list lives in <code>_data/integrationProviders.js</code>. Duplicate tile markup in Nunjucks replaces client-side <code>innerHTML</code> for HTMX-safe static HTML.</p>
</div>

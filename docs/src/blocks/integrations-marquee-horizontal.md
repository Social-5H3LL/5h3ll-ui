---
templateEngineOverride: njk
layout: layouts/page.njk
title: Integrations marquee (horizontal)
description: Integration showcase block with header row and dual horizontal logo marquees — Lobe Icons CDN marks.
icon: gallery-horizontal
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
  <p>The <strong>Integrations marquee (horizontal)</strong> block stacks two counter-scrolling rows of integration tiles beneath a header and CTA. Logos use the Lobe Icons CDN; tiles repeat in Nunjucks for seamless CSS animation.</p>
  <p>Hook class: <code>block-integrations-marquee-horizontal</code>. Animation styles live in <code>docs/css/custom.css</code>.</p>
</div>

<h2 id="examples"><a href="#examples">Examples</a></h2>

<h3 id="example-default"><a href="#example-default">Default</a></h3>

{% set code %}
{% include "partials/blocks/integrations-marquee-horizontal.njk" %}
{% endset %}
{{ code_preview("block-integrations-marquee-horizontal", code, "w-full") }}

<h3 id="example-composition"><a href="#example-composition">Composition</a></h3>

<div class="prose">
  <p>This block composes:</p>
  <ul>
    <li><a href="/components/badge/">Badge</a> and <a href="/components/button/">Button</a> — header actions</li>
    <li><a href="/components/card/">Card</a> — marquee tiles</li>
    <li>Shared <code>integrationProviders.js</code> data and <code>integration_showcase.njk</code> macros</li>
  </ul>
</div>

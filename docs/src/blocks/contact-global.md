---
templateEngineOverride: njk
layout: layouts/page.njk
title: Contact global
description: Dark global contact hub with an interactive 3D globe (globe.gl + Three.js).
icon: globe
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
  <p>The <strong>Contact global</strong> block pairs contact cards with an interactive 3D globe powered by <a href="https://github.com/vasturiano/globe.gl" target="_blank" rel="noopener noreferrer">globe.gl</a> and Three.js (CDN). Office points, arcs, and labels match the original inbox demo. Hook class: <code>block-contact-global</code>.</p>
  <p>Load <code>/assets/js/contact-global-globe.js</code> after the markup. The script pulls Three.js and globe.gl from unpkg and inits every <code>[data-contact-global-globe]</code> mount — including docs Preview tabs and HTMX navigation.</p>
</div>

<h2 id="examples"><a href="#examples">Examples</a></h2>

<h3 id="example-default"><a href="#example-default">Default</a></h3>

{% set code %}
{% include "partials/blocks/contact-global.njk" %}
{% endset %}
{{ code_preview("block-contact-global", code, "w-full") }}

<h3 id="example-composition"><a href="#example-composition">Composition</a></h3>

<div class="prose">
  <p>This block composes existing 5H3LL-UI contact cards plus:</p>
  <ul>
    <li><code>data-contact-global-globe</code> mount — 650px canvas area for globe.gl</li>
    <li><code>contact-global-globe.js</code> — docs helper that loads Three.js + globe.gl CDN scripts</li>
    <li>Earth textures from the three-globe examples bundle on unpkg</li>
    <li>HQ overlay card and stats positioned absolute over the globe</li>
  </ul>
</div>

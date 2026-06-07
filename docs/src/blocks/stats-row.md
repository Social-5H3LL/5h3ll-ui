---
templateEngineOverride: njk
layout: layouts/page.njk
title: Stats row
description: Dashboard statistics row composed from Card elements — four metric tiles with labels and deltas.
icon: chart-column
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
  <p>The <strong>Stats row</strong> block shows a responsive grid of metric cards for dashboards and admin home pages. It composes compact <a href="/components/card/">Card</a> elements (<code>data-size="sm"</code>) in a single-column, two-column, or four-column layout. Add the hook class <code>block-stats-row</code> (and optional <code>block-stats-row-value</code> on the metric) when you need block-specific layout overrides.</p>
</div>

<h2 id="examples"><a href="#examples">Examples</a></h2>

<h3 id="example-default"><a href="#example-default">Default</a></h3>

{% set code %}
{% include "partials/blocks/stats-row.njk" %}
{% endset %}
{{ code_preview("block-stats-row", code, "w-full") }}

<h3 id="example-composition"><a href="#example-composition">Composition</a></h3>

<div class="prose">
  <p>This block composes:</p>
  <ul>
    <li><a href="/components/card/">Card</a> — one per metric, with <code>data-size="sm"</code> for compact padding</li>
    <li><code>h3</code> metric labels in <code>header</code>, value and delta in <code>section</code></li>
    <li>Responsive grid: 1 column (default), 2 from <code>sm</code>, 4 from <code>lg</code></li>
  </ul>
  <p>Use <code>min-w-0</code> on cards and the grid so columns can shrink. The <code>block-stats-row-value</code> class scales the metric with <code>clamp()</code> and container query units so values such as <code>$45,231.89</code> stay inside the card background. The docs site applies these styles in <code>docs/css/custom.css</code>.</p>
</div>

---
templateEngineOverride: njk
layout: layouts/page.njk
title: CTA banner
description: Marketing call-to-action block with 5H3LL-UI branding, headline, and primary actions.
icon: megaphone
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
  <p>The <strong>CTA banner</strong> block is a centered marketing strip for landing pages and docs promos. It highlights 5H3LL-UI with the site icon, headline, and action buttons.</p>
</div>

<h2 id="examples"><a href="#examples">Examples</a></h2>

<h3 id="example-default"><a href="#example-default">Default</a></h3>

{% set code %}
{% include "partials/blocks/cta-banner.njk" %}
{% endset %}
{{ code_preview("block-cta-banner", code, "w-full max-w-2xl") }}

<h3 id="example-composition"><a href="#example-composition">Composition</a></h3>

<div class="prose">
  <p>This block composes:</p>
  <ul>
    <li><a href="/components/card/">Card</a> — centered layout wrapper</li>
    <li><a href="/components/button/">Button</a> — primary and outline links</li>
    <li>Site favicon from <code>/assets/favicon.svg</code></li>
  </ul>
  <p>Hook class: <code>block-cta-banner</code>. Swap button <code>href</code> values for your install flow or external links.</p>
</div>

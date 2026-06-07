---
templateEngineOverride: njk
layout: layouts/page.njk
title: Contact split
description: Three-channel contact cards with gradient backdrop.
icon: headphones
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
  <p>The <strong>Contact split</strong> block is composed from 5H3LL-UI semantic tokens and existing components. Hook class: <code>block-contact-split</code>.</p>
</div>

<h2 id="examples"><a href="#examples">Examples</a></h2>

<h3 id="example-default"><a href="#example-default">Default</a></h3>

{% set code %}
{% include "partials/blocks/contact-split.njk" %}
{% endset %}
{{ code_preview("block-contact-split", code, "w-full") }}

<h3 id="example-composition"><a href="#example-composition">Composition</a></h3>

<div class="prose">
  <p>This block composes existing 5H3LL-UI <a href="/components/card/">Card</a>, <a href="/components/button/">Button</a>, <a href="/components/input/">Input</a>, and related primitives. Copy the markup into your server-rendered stack.</p>
</div>

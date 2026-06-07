---
templateEngineOverride: njk
layout: layouts/page.njk
title: AI Chat Panel
description: Open flagship block — a compact support or assistant chat panel composed from Card, Avatar, Button, and Input.
icon: messages-square
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
{% from "macros/code_block.njk" import code_block %}

<h2 id="overview"><a href="#overview">Overview</a></h2>

<div class="prose">
  <p>The <strong>AI Chat Panel</strong> is the open flagship block for 5H3LL-UI. It demonstrates how to compose existing elements and components into a product-ready section without new CSS or JavaScript dependencies.</p>
  <p>Use it for support widgets, assistant sidebars, or dashboard help panels in server-rendered apps.</p>
</div>

<h2 id="examples"><a href="#examples">Examples</a></h2>

<h3 id="example-default"><a href="#example-default">Default</a></h3>

{% set code %}
{% include "partials/blocks/ai-chat-panel.njk" %}
{% endset %}
{{ code_preview("block-ai-chat-panel", code, "w-full max-w-lg") }}

<h3 id="example-composition"><a href="#example-composition">Composition</a></h3>

<div class="prose">
  <p>This block composes:</p>
  <ul>
    <li><a href="/components/card/">Card</a> — panel wrapper</li>
    <li><a href="/components/avatar/">Avatar</a> — header image</li>
    <li><a href="/components/button/">Button</a> — icon actions</li>
    <li><a href="/components/input/">Input</a> — message composer</li>
    <li><a href="/components/tooltip/">Tooltip</a> — optional on header actions</li>
  </ul>
  <p>Add the hook class <code>block-ai-chat-panel</code> when you need block-specific overrides. Message content uses <code>section</code> so Card padding applies; the header action tooltip uses <code>data-side="left"</code> to avoid clipping.</p>
</div>

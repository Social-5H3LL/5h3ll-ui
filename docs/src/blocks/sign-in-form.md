---
templateEngineOverride: njk
layout: layouts/page.njk
title: Sign-in form
description: Authentication block composed from Card, Label, Input, and Button — email/password sign-in with social option.
icon: log-in
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
  <p>The <strong>Sign-in form</strong> block is a compact authentication panel for login pages and modals. It composes existing form primitives inside a single card.</p>
</div>

<h2 id="examples"><a href="#examples">Examples</a></h2>

<h3 id="example-default"><a href="#example-default">Default</a></h3>

{% set code %}
{% include "partials/blocks/sign-in-form.njk" %}
{% endset %}
{{ code_preview("block-sign-in-form", code, "w-full max-w-sm") }}

<h3 id="example-composition"><a href="#example-composition">Composition</a></h3>

<div class="prose">
  <p>This block composes:</p>
  <ul>
    <li><a href="/components/card/">Card</a> — panel wrapper</li>
    <li><a href="/components/label/">Label</a> — field labels</li>
    <li><a href="/components/input/">Input</a> — email and password fields</li>
    <li><a href="/components/button/">Button</a> — primary and outline actions</li>
  </ul>
  <p>Use unique <code>id</code> values per instance when multiple sign-in blocks appear on one page. Hook class: <code>block-sign-in-form</code>.</p>
</div>

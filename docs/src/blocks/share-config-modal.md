---
templateEngineOverride: njk
layout: layouts/page.njk
title: Share config modal
description: Project sharing panel with invites, access controls, link copy, and QR code.
icon: share-2
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
  <p>The <strong>Share config modal</strong> block is a composed sharing panel with member invites, access selects, website link copy, and a QR code for <code>ui.5h3ll.site</code>. Hook class: <code>block-share-config-modal</code>.</p>
  <p>Collaborator rows use <a href="https://pravatar.cc/">pravatar.cc</a> avatars. Load <code>/assets/js/share-config-modal.js</code> for QR generation (qrcodejs CDN) and copy-to-clipboard.</p>
</div>

<h2 id="examples"><a href="#examples">Examples</a></h2>

<h3 id="example-default"><a href="#example-default">Default</a></h3>

{% set code %}
{% include "partials/blocks/share-config-modal.njk" %}
{% endset %}
{{ code_preview("block-share-config-modal", code, "w-full") }}

<h3 id="example-composition"><a href="#example-composition">Composition</a></h3>

<div class="prose">
  <p>This block composes existing 5H3LL-UI <a href="/components/card/">Card</a>, <a href="/components/button/">Button</a>, <a href="/components/input/">Input</a>, and <a href="/components/native-select/">Native select</a> primitives. Member data lives in <code>docs/src/_data/shareConfigMembers.js</code>.</p>
</div>

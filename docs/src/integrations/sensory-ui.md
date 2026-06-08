---
templateEngineOverride: njk
layout: layouts/page.njk
title: Sensory UI
description: Semantic UI sounds for 5H3LL-UI — procedural Web Audio via data-sound roles (vanilla port inspired by sensory-ui).
icon: audio-lines
toc:
  - label: Overview
    id: overview
  - label: Attribution
    id: attribution
  - label: Install
    id: install
  - label: Usage
    id: usage
  - label: Sound roles
    id: roles
  - label: Accessibility
    id: accessibility
  - label: Live demo
    id: demo
---

{% from "macros/code_block.njk" import code_block %}

<h2 id="overview"><a href="#overview">Overview</a></h2>

<div class="prose">
  <p><strong>Sensory UI for 5H3LL-UI</strong> is an optional add-on that adds semantic audio feedback to interactive markup. It is a <strong>vanilla HTML/CSS/JS port of the idea</strong> behind <a href="https://www.sensory-ui.com/" target="_blank" rel="noopener noreferrer">sensory-ui</a> — not the React/shadcn package. Sounds are synthesized in the browser with the Web Audio API; there are no audio files to host.</p>
  <p>Assign a <code>data-sound</code> attribute with a <strong>role</strong> (e.g. <code>interaction.tap</code>, <code>overlay.open</code>). The spike lives in <a href="https://github.com/social-5h3ll/5h3ll-ui/tree/main/addons/sensory-ui"><code>addons/sensory-ui/</code></a> on GitHub.</p>
  <p>Planned CLI (same ergonomics as <a href="/integrations/design-md/">DESIGN.md skins</a>):</p>
{% set code %}npx @social-5h3ll/5h3ll-ui addon sensory-ui{% endset %}
{{ code_block(code, "bash") }}
</div>

<h2 id="attribution"><a href="#attribution">Attribution</a></h2>

<div class="prose">
  <p>The <strong>concept, role taxonomy, and design philosophy</strong> come from <a href="https://www.sensory-ui.com/#showcase" target="_blank" rel="noopener noreferrer">sensory-ui</a> by <strong>Satyam Vyas</strong> (<a href="https://github.com/SatyamVyas04/sensory-ui" target="_blank" rel="noopener noreferrer">SatyamVyas04/sensory-ui</a>).</p>
  <p>5H3LL-UI's implementation is an independent vanilla port for non-React stacks — procedural tones, <code>data-sound</code> hooks, and integration with <code>ui5h3ll.js</code>. Thank you to Satyam for the original work on semantic sound for shadcn/ui.</p>
  <ul>
    <li>Original project: <a href="https://www.sensory-ui.com/" target="_blank" rel="noopener noreferrer">sensory-ui.com</a></li>
    <li>Upstream repo: <a href="https://github.com/SatyamVyas04/sensory-ui" target="_blank" rel="noopener noreferrer">github.com/SatyamVyas04/sensory-ui</a></li>
    <li>5H3LL-UI add-on: <a href="https://github.com/social-5h3ll/5h3ll-ui/tree/main/addons/sensory-ui"><code>addons/sensory-ui/</code></a></li>
  </ul>
</div>

<h2 id="install"><a href="#install">Install</a></h2>

<div class="prose">
  <p><strong>Manual (today):</strong> copy <code>addons/sensory-ui/sensory.js</code> into your static assets and load it after <code>ui5h3ll.js</code>.</p>
{% set scripts %}<script src="/assets/js/ui5h3ll.js" defer></script>
<script src="/assets/js/sensory.js" defer></script>{% endset %}
{{ code_block(scripts, "html") }}
  <p><strong>CLI (planned):</strong> <code>npx @social-5h3ll/5h3ll-ui addon sensory-ui</code> will copy the file and print wiring steps.</p>
</div>

<h2 id="usage"><a href="#usage">Usage</a></h2>

<div class="prose">
  <p>Add <code>data-sound</code> to any interactive element:</p>
{% set markup %}<button class="btn" data-sound="interaction.tap">Save</button>

<input type="checkbox" class="input" data-sound="interaction.toggle" />

<button type="button" class="btn-outline"
  data-sound="overlay.open"
  onclick="document.getElementById('my-dialog').showModal()">
  Open dialog
</button>{% endset %}
{{ code_block(markup, "html") }}
  <p>Programmatic playback from your own JS:</p>
{% set js %}document.dispatchEvent(new CustomEvent('ui5h3ll:sensory', {
  detail: { role: 'notification.success' }
}));

// or
window.ui5h3llSensory?.play('interaction.confirm');{% endset %}
{{ code_block(js, "javascript") }}
  <p><strong>Mute</strong> for the current browser: <code>localStorage.setItem('5h3ll-sensory', 'off')</code> or set <code>data-sensory="off"</code> on <code>&lt;html&gt;</code>.</p>
  <p>For <strong>notification</strong> roles, pair <code>data-sound</code> with the 5H3LL-UI toaster — load <code>ui5h3ll.js</code> (includes toast), add <code>&lt;div id="toaster" class="toaster"&gt;&lt;/div&gt;</code>, then append toast markup (HTMX or <code>ui5h3ll:toast</code>).</p>
</div>

<h2 id="roles"><a href="#roles">Sound roles</a></h2>

<div class="prose">
  <p>v0 spike roles (subset of sensory-ui's full taxonomy):</p>
  <table>
    <thead>
      <tr><th>Role</th><th>Typical use</th></tr>
    </thead>
    <tbody>
      <tr><td><code>interaction.tap</code></td><td>Buttons, primary actions</td></tr>
      <tr><td><code>interaction.subtle</code></td><td>Secondary clicks, slider ticks</td></tr>
      <tr><td><code>interaction.toggle</code></td><td>Checkbox, switch, radio</td></tr>
      <tr><td><code>interaction.confirm</code></td><td>Confirm / destructive confirm</td></tr>
      <tr><td><code>overlay.open</code> / <code>overlay.close</code></td><td>Dialog, drawer, menu</td></tr>
      <tr><td><code>navigation.tab</code></td><td>Tabs, pagination</td></tr>
      <tr><td><code>notification.success</code> / <code>notification.error</code></td><td>Toasts, alerts</td></tr>
    </tbody>
  </table>
</div>

<h2 id="accessibility"><a href="#accessibility">Accessibility</a></h2>

<div class="prose">
  <ul>
    <li>Honors <code>prefers-reduced-motion: reduce</code> — no sounds when that media query matches.</li>
    <li>Global mute via <code>localStorage</code> or <code>data-sensory="off"</code>.</li>
    <li>Audio unlocks only after a user gesture (browser autoplay policy).</li>
    <li>Sounds are <strong>enhancement only</strong> — every 5H3LL-UI control already has visible focus and state.</li>
  </ul>
</div>

<h2 id="demo"><a href="#demo">Live demo</a></h2>

<div class="not-prose sensory-ui-panel">
  <div class="sensory-ui-panel-body">
    {% include "partials/sensory-ui-demo.njk" %}
  </div>
</div>

<script src="/assets/js/sensory.js" defer></script>

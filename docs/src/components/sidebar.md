---
templateEngineOverride: njk
layout: layouts/page.njk
title: Sidebar
description: A composable, themeable and customizable sidebar component.
toc:
  - label: Usage
    id: usage
    children:
      - label: HTML + JavaScript
        id: usage-html-js
        children:
          - label: "Step 1: Include the JavaScript files"
            id: usage-html-js-1
          - label: "Step 2: Add your sidebar HTML"
            id: usage-html-js-2
          - label: HTML structure
            id: usage-html-js-3
          - label: Header brand mirror
            id: usage-html-js-brand-mirror
          - label: 5H3LL-UI differences
            id: usage-html-js-4
          - label: JavaScript events
            id: usage-html-js-5
      - label: Jinja and Nunjucks
        id: usage-macro
---

{% from "macros/code_block.njk" import code_block %}
{% from "sidebar.njk" import sidebar %}

<h2 id="usage"><a href="#usage">Usage</a></h2>

<h3 id="usage-html-js"><a href="#usage-html-js">HTML + JavaScript</a></h3>

<h4 id="usage-html-js-1"><a href="#usage-html-js-1">Step 1: Include the JavaScript files</a></h4>

<section class="prose">
  <p>You can either <a href="/installation/#install-cdn-all">include the JavaScript file for all the components</a>, or just the one for this component by adding this to the <code>&lt;head&gt;</code> of your page:</p>
</section>

{% set code_script %}<script src="https://cdn.jsdelivr.net/npm/@social-5h3ll/5h3ll-ui@{{ pkg.version }}/dist/js/ui5h3ll.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/@social-5h3ll/5h3ll-ui@{{ pkg.version }}/dist/js/sidebar.min.js" defer></script>{% endset %}
{{ code_block(code_script | prettyHtml, "html") }}

<div class="flex flex-wrap gap-2 my-6">
  <a class="badge-outline" href="/installation/#install-js">
    Components with JavaScript
    {% lucide "arrow-right" %}
  </a>
  <a class="badge-outline" href="/cli">
    Use the CLI
    {% lucide "arrow-right" %}
  </a>
  <a class="badge-outline" href="https://github.com/social-5h3ll/5h3ll-ui/blob/main/src/js/sidebar.js" target="_blank">
    sidebar.js
    {% lucide "arrow-right" %}
  </a>
</div>

<h4 id="usage-html-js-2"><a href="#usage-html-js-2">Step 2: Add your sidebar HTML</a></h4>

{% set code_html %}
{% set icon_square_terminal %}{% lucide "square-terminal" %}{% endset %}
{% set icon_bot %}{% lucide "bot" %}{% endset %}
{% set icon_settings %}{% lucide "settings" %}{% endset %}
{% set menu = [
  { type: "group", label: "Getting started", items: [
    { label: "Playground", url: "#", icon: icon_square_terminal },
    { label: "Models", url: "#", icon: icon_bot },
    { label: "Settings", type: "submenu", icon: icon_settings, items: [
      { label: "General", url: "#" },
      { label: "Team", url: "#" },
      { label: "Billing", url: "#" },
      { label: "Limits", url: "#" }
    ] }
  ]}
] %}
{{ sidebar(
  label="Sidebar navigation",
  content_attrs={
    "class": "scrollbar"
  },
  menu=menu
) }}
<main>
  <button type="button" onclick="document.dispatchEvent(new CustomEvent('ui5h3ll:sidebar'))">Toggle sidebar</button>
  <h1>Content</h1>
</main>
{% endset %}
{{ code_block(code_html | prettyHtml, "html") }}

<h4 id="usage-html-js-3"><a href="#usage-html-js-3">HTML structure</a></h4>

<section class="prose">
  <dl>
    <dt><code class="highlight language-html">&lt;aside class="sidebar" aria-hidden="false"&gt;</code></dt>
    <dd>Wraps the sidebar component. Supported attributes:
      <ul>
        <li><code>id</code>: target a specific sidebar from the <code>ui5h3ll:sidebar</code> event.</li>
        <li><code>aria-hidden</code>: current open state. <code>false</code> means visible, <code>true</code> means hidden.</li>
        <li><code>data-side</code>: physical side of the viewport. Use <code>left</code> or <code>right</code>. Defaults to <code>left</code>.</li>
        <li><code>data-initial-open</code>: set to <code>false</code> to start closed on desktop.</li>
        <li><code>data-initial-mobile-open</code>: set to <code>true</code> to start open below the breakpoint.</li>
        <li><code>data-breakpoint</code>: pixel width used to switch between desktop and mobile behavior. Defaults to <code>768</code>.</li>
      </ul>
    </dd>
    <dt><code class="highlight language-html">&lt;nav aria-label="..."&gt;</code></dt>
    <dd>The semantic navigation landmark inside the sidebar.</dd>
    <dt><code class="highlight language-html">&lt;header&gt;</code> <span class="badge-secondary">Optional</span></dt>
    <dd>Top area for branding, workspace switchers, or primary controls. Mark the brand block with <code>data-sidebar-brand</code> to mirror it into the page header when the sidebar is closed.</dd>
    <dt><code class="highlight language-html">data-sidebar-brand</code> <span class="badge-secondary">Optional</span></dt>
    <dd>Branding element inside the sidebar header. <code>sidebar.js</code> clones this node into <code>data-sidebar-brand-mirror</code> and shows the mirror while <code>aria-hidden="true"</code>.</dd>
    <dt><code class="highlight language-html">data-sidebar-brand-mirror</code> <span class="badge-secondary">Optional</span></dt>
    <dd>Empty target in the sibling content area (for example the page header). Set the attribute value to the sidebar <code>id</code> when multiple sidebars exist; otherwise place the first mirror inside the sidebar's next sibling.</dd>
    <dt><code class="highlight language-html">&lt;section&gt;</code></dt>
    <dd>Scrollable sidebar content.</dd>
    <dt><code class="highlight language-html">&lt;div role="group" aria-labelledby="..."&gt;</code></dt>
    <dd>A grouped set of navigation items. Use an <code>h3</code> with a matching <code>id</code> when the group has a visible label.</dd>
    <dt><code class="highlight language-html">&lt;ul&gt;</code> / <code class="highlight language-html">&lt;li&gt;</code></dt>
    <dd>Navigation list structure. Items may contain an <code>a</code>, a <code>button</code>, or a <code>details</code> submenu.</dd>
    <dt><code class="highlight language-html">&lt;a aria-current="page"&gt;</code></dt>
    <dd>Use <code>aria-current="page"</code> for the active link. You can also use <code>data-active="true"</code> for non-link active items.</dd>
    <dt><code class="highlight language-html">&lt;button type="button"&gt;</code></dt>
    <dd>Use buttons for actions. On mobile, links and buttons close the sidebar unless they include <code>data-keep-mobile-sidebar-open</code>.</dd>
    <dt><code class="highlight language-html">&lt;details&gt;</code> / <code class="highlight language-html">&lt;summary&gt;</code></dt>
    <dd>Use native disclosure for submenus. The nested <code>ul</code> contains the submenu items. Add the <code>open</code> attribute when the section should start expanded (for example when the current page is inside that submenu). Put <code>aria-current="page"</code> on the child link that matches the current page — active styles apply to nested links, not the parent <code>summary</code>.</dd>
    <dt><code class="highlight language-html">&lt;footer&gt;</code> <span class="badge-secondary">Optional</span></dt>
    <dd>Bottom area for account controls, settings, or secondary actions.</dd>
    <dt><code class="highlight language-html">&lt;main&gt;</code></dt>
    <dd>The sibling content wrapper. 5H3LL-UI applies the desktop margin to the sibling that follows the sidebar.</dd>
    <dt><code class="highlight language-html">&lt;button type="button" onclick="document.dispatchEvent(new CustomEvent('ui5h3ll:sidebar'))"&gt;</code></dt>
    <dd>Dispatches the event used to toggle, open, or close the sidebar.</dd>
  </dl>
</section>

{% set code_current %}<!-- Server-side or router-driven current item -->
<nav aria-label="Sidebar navigation">
  <ul>
    <li><a href="/my-path?page=overview">Overview</a></li>
    <li>
      <details open>
        <summary>Settings</summary>
        <ul>
          <li><a href="/my-path?page=general">General</a></li>
          <li><a href="/my-path?page=team" aria-current="page">Team</a></li>
        </ul>
      </details>
    </li>
    <li><button type="button" data-active="true">Active action</button></li>
  </ul>
</nav>{% endset %}
{{ code_block(code_current | prettyHtml, "html") }}

<h4 id="usage-html-js-brand-mirror"><a href="#usage-html-js-brand-mirror">Header brand mirror</a></h4>

<section class="prose">
  <p>When the sidebar is collapsed, show the same branding in your page header so users can still identify the app and navigate home.</p>
</section>

{% set code_brand_mirror %}{% set icon_home %}{% lucide "house" %}{% endset %}
<aside id="app-sidebar" class="sidebar" aria-hidden="false">
  <nav aria-label="Sidebar navigation">
    <header>
      <a href="/" class="btn-ghost sidebar-brand p-2 h-12 w-full justify-start" data-sidebar-brand>
        {{ icon_home }}
        <span class="truncate font-medium">Acme</span>
      </a>
    </header>
    <section><!-- navigation --></section>
  </nav>
</aside>
<main id="content">
  <header class="flex items-center gap-2 border-b p-2">
    <button type="button" onclick="document.dispatchEvent(new CustomEvent('ui5h3ll:sidebar'))">Toggle</button>
    <div data-sidebar-brand-mirror="app-sidebar" hidden></div>
  </header>
</main>{% endset %}
{{ code_block(code_brand_mirror | prettyHtml, "html") }}

<h4 id="usage-html-js-4"><a href="#usage-html-js-4">5H3LL-UI differences</a></h4>

<section class="prose">
  <p>5H3LL-UI keeps sidebar intentionally smaller than shadcn/ui. It supports fixed left/right sidebars, mobile overlay behavior, grouped navigation, active states, and native <code>details</code> submenus.</p>
  <p>It does not currently expose shadcn/ui's React provider, rail, inset/floating variants, icon-only collapse mode, menu actions, menu badges, or menu skeleton API. Those can be composed manually if needed, but they are not part of the 5H3LL-UI sidebar contract.</p>
  <p>RTL content is supported through logical spacing and borders. The <code>data-side</code> value remains physical: <code>left</code> means the left side of the viewport and <code>right</code> means the right side.</p>
</section>

<h4 id="usage-html-js-5"><a href="#usage-html-js-5">JavaScript events</a></h4>

<section class="prose">
  <dl>
    <dt><code>ui5h3ll:initialized</code></dt>
    <dd>Once the component is fully initialized, it dispatches a custom (non-bubbling) <code>ui5h3ll:initialized</code> event on itself.</dd>
    <dt><code>ui5h3ll:sidebar</code></dt>
    <dd>
      <p>Sidebars listen for this event on <code>document</code> to open, close or toggle themselves. By default, the event will toggle the sidebar, but can be used to open or close if you add an <code>action</code> to the detail. Additionally, if you have multiple sidebars on the page, you can target a specific sidebar by adding its <code>id</code> to the detail:</p>
        {% set code_trigger %}<!-- Toggles the sidebar -->
<button type="button" onclick="document.dispatchEvent(new CustomEvent('ui5h3ll:sidebar'));">Toggle sidebar</button>
<!-- Opens the `#main-navigation` sidebar -->
<button type="button" onclick="document.dispatchEvent(new CustomEvent('ui5h3ll:sidebar', { detail: { id: 'main-navigation', action: 'open' } }));">Open sidebar</button>
<!-- Closes the sidebar -->
<button type="button" onclick="document.dispatchEvent(new CustomEvent('ui5h3ll:sidebar', { detail: { action: 'close' } }));">Close sidebar</button>{% endset %}
        {{ code_block(code_trigger | prettyHtml, "html") }}
    </dd>
  </dl>
</section>

<h3 id="usage-macro"><a href="#usage-macro">Jinja and Nunjucks</a></h3>

<div class="prose">
  <p>You can use the <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs">sidebar()</code> Nunjucks or Jinja macro for this component.</p>
</div>

<div class="flex flex-wrap gap-2 my-6">
  <a class="badge-outline" href="/cli#macros" target="_blank">
    Use Nunjucks or Jinja macros
    {% lucide "arrow-right" %}
  </a>
  <a class="badge-outline" href="https://github.com/social-5h3ll/5h3ll-ui/blob/main/src/jinja/sidebar.html.jinja" target="_blank">
    Jinja macro
    {% lucide "arrow-right" %}
  </a>
  <a class="badge-outline" href="https://github.com/social-5h3ll/5h3ll-ui/blob/main/src/nunjucks/sidebar.njk" target="_blank">
    Nunjucks macro
    {% lucide "arrow-right" %}
  </a>
</div>

{% set raw_code %}{% raw %}{% set menu = [
  { type: "group", label: "Getting started", items: [
    { label: "Playground", url: "#" },
    { label: "Models", url: "#" },
    { label: "Settings", type: "submenu", items: [
      { label: "General", url: "#" },
      { label: "Team", url: "#" },
      { label: "Billing", url: "#" },
      { label: "Limits", url: "#" }
    ] }
  ]}
] %}

{{ sidebar(
  label="Sidebar navigation",
  menu=menu
) }}
<main>
  <h1>Content</h1>
</main>
{% endraw %}{% endset%}
{{ code_block(raw_code, "jinja") }}

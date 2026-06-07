---
templateEngineOverride: njk
layout: layouts/page.njk
title: Docs site layout
description: How the 5H3LL-UI documentation site structures sidebar navigation and the page footer.
icon: layout-template
toc:
  - label: Overview
    id: overview
  - label: Sidebar navigation
    id: navigation
  - label: Page footer
    id: footer
  - label: Layout shell
    id: layout-shell
---

{% from "macros/code_block.njk" import code_block %}

<h2 id="overview"><a href="#overview">Overview</a></h2>

<div class="prose">
  <p>The docs at <a href="https://ui.5h3ll.site">ui.5h3ll.site</a> are an Eleventy site under <code>docs/</code>. Page chrome — sidebar, header, main content, and footer — is composed from Nunjucks partials and layouts, not from the Sidebar component docs page alone.</p>
  <p>This page is for <b>maintainers</b> forking or extending the docs site. End users of 5H3LL-UI components do not need to copy these files unless they are building a similar docs layout.</p>
</div>

<h2 id="navigation"><a href="#navigation">Sidebar navigation</a></h2>

<div class="prose">
  <p>Navigation is driven by <code>docs/src/_data/docs.json</code>. Eleventy filters in <code>src/eleventy/navigation.js</code> turn that config into sidebar markup and command-palette items.</p>

  <h3>Menu structure</h3>
  <ul>
    <li><b>Group</b> — <code>type: "group"</code> with an optional <code>label</code>. Renders a labelled section of flat links.</li>
    <li><b>Submenu</b> — <code>type: "submenu"</code> with <code>label</code>, optional <code>icon</code>, and <code>items</code>. Renders a native <code>details</code> disclosure for collapsible sections.</li>
    <li><b>Slug</b> — a string such as <code>"introduction"</code> or <code>"components/button"</code> resolves to a doc page URL and title from front matter.</li>
    <li><b>Item</b> — an object with <code>url</code>, <code>label</code>, and optional <code>icon</code> / <code>external</code> for custom or off-site links.</li>
  </ul>

  <p>The current layout uses a flat <b>Getting started</b> group and collapsible submenus in the second group: <b>Elements</b>, <b>Components</b>, <b>Blocks</b>, <b>Layouts</b>, and <b>Integrations</b>. Primitives live under Elements; interactive patterns under Components; composed sections under Blocks.</p>
</div>

{% set code_nav %}{
  "menu": [
    {
      "type": "group",
      "label": "Getting started",
      "items": ["introduction", "installation", "docs-site"]
    },
    {
      "type": "group",
      "items": [
        {
          "type": "submenu",
          "label": "Elements",
          "icon": "layers",
          "items": ["components/button", "components/input"]
        },
        {
          "type": "submenu",
          "label": "Components",
          "icon": "component",
          "items": ["components/card", "components/dialog"]
        },
        {
          "type": "submenu",
          "label": "Blocks",
          "icon": "layout-grid",
          "items": ["blocks/ai-chat-panel"]
        },
        {
          "type": "submenu",
          "label": "Layouts",
          "icon": "panels-top-left",
          "items": ["layouts/overview"]
        },
        {
          "type": "submenu",
          "label": "Integrations",
          "icon": "plug",
          "items": ["integrations"]
        }
      ]
    }
  ]
}{% endset %}
{{ code_block(code_nav, "json") }}

<div class="prose">
  <h3>Active and open states</h3>
  <p>When the current page is inside a submenu, the build:</p>
  <ul>
    <li>sets <code>open</code> on the parent <code>details</code> so the section stays expanded;</li>
    <li>sets <code>aria-current="page"</code> on the matching child link (active styling applies at any nesting depth).</li>
  </ul>
  <p>When you are not on a page in that section, the submenu is collapsed by default. Visitors can toggle it with the disclosure control.</p>
  <p>Empty <code>items</code> arrays are skipped — do not add a submenu until it has at least one entry.</p>

  <h3>Related files</h3>
  <ul>
    <li><code>docs/src/_includes/partials/sidebar.njk</code> — passes <code>docs.json</code> menu into the <code>sidebar()</code> macro</li>
    <li><code>src/nunjucks/sidebar.njk</code> — renders groups, links, and <code>details</code> submenus</li>
    <li><code>src/eleventy/menu.js</code> — flattens slugs for prev/next navigation</li>
    <li><code>docs/css/custom.css</code> — docs-only spacing overrides (e.g. submenu icon gap)</li>
  </ul>
</div>

<h2 id="footer"><a href="#footer">Page footer</a></h2>

<div class="prose">
  <p>The site footer is a docs-only partial at <code>docs/src/_includes/partials/site-footer.njk</code>. It is included from <code>docs/src/_includes/layouts/layout.njk</code> at the bottom of the main content column — below page content, above the closing <code>main</code> tag.</p>

  <h3>Responsive layout</h3>
  <ul>
    <li><b>Desktop</b> (<code>lg</code> and up): copyright and attribution on one line, separated by a dash.</li>
    <li><b>Tablet and mobile</b>: copyright on the first line; “Made with … Belfast” on the second line with spacing above and below the block.</li>
  </ul>

  <p>Footer-specific styles live in <code>docs/css/custom.css</code> under <code>.site-footer</code>. Rebuild docs CSS after editing: <code>npm run docs:build:css</code>.</p>
</div>

{% set code_footer %}{% raw %}<footer class="site-footer border-t text-center text-sm text-muted-foreground px-4 pt-8 pb-10 md:px-6 xl:px-12">
  <div class="mx-auto flex max-w-screen-lg flex-col items-center gap-2 lg:flex-row lg:justify-center lg:gap-2">
    <p class="m-0">
      Copyright &copy; <a href="https://github.com/social-5h3ll" ...>Social-5h3ll</a> 2026
    </p>
    <p class="m-0 inline-flex items-center justify-center gap-1.5">
      <span class="hidden lg:inline" aria-hidden="true">-</span>
      <span>Made with</span>
      <!-- heart icon -->
      <span>in Belfast, Northern Ireland</span>
    </p>
  </div>
</footer>{% endraw %}{% endset %}
{{ code_block(code_footer, "html") }}

<h2 id="layout-shell"><a href="#layout-shell">Layout shell</a></h2>

<div class="prose">
  <p>Docs pages use this layout chain:</p>
  <p>Navigation uses HTMX boost (<code>hx-target="#content"</code>), so only the main column swaps on in-site link clicks. The sidebar stays mounted; <code>syncSidebarNav()</code> in <code>layouts/base.njk</code> updates <code>aria-current</code> and submenu <code>open</code> state after each HTMX swap and history navigation.</p>

  <ol>
    <li><code>layouts/base.njk</code> — HTML shell, assets, HTMX boost on <code>#content</code>, sidebar nav sync</li>
    <li><code>layouts/layout.njk</code> — sidebar, sticky header, content padding, site footer</li>
    <li><code>layouts/page.njk</code> — article header, TOC column, prev/next footer (component and guide pages)</li>
  </ol>
  <p>Site metadata (title, logo, URLs) is in <code>docs/src/_data/site.js</code>. Package version for cache-busters and CDN examples comes from <code>docs/src/_data/pkg.js</code> (root <code>package.json</code>).</p>
</div>

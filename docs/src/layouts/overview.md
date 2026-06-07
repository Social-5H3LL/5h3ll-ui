---
templateEngineOverride: njk
layout: layouts/page.njk
title: Layouts overview
description: Full-page HTML shells for marketing sites, dashboards, and app chrome — composed from 5H3LL-UI components and blocks.
icon: layout-template
toc:
  - label: Overview
    id: overview
  - label: Roadmap
    id: roadmap
---

{% from "macros/layout_roadmap_card.njk" import layout_roadmap_card %}

<h2 id="overview"><a href="#overview">Overview</a></h2>

<div class="prose">
  <p><strong>Layouts</strong> are full-page shells — headers, sidebars, content regions, and footers — built from 5H3LL-UI components and blocks.</p>
  <p>They ship as <strong>copy-paste HTML</strong> you can drop into Django, Flask, Rails, HTMX, or any server-rendered stack. The docs site itself uses a separate Eleventy layout chain; see <a href="/docs-site/">Docs site layout</a> for that shell.</p>
</div>

<h2 id="roadmap"><a href="#roadmap">Roadmap</a></h2>

<div class="prose">
  <p>Layout shells ship as documented HTML you can copy into your stack. Each entry below is a self-contained page chrome pattern composed from 5H3LL-UI components and blocks.</p>
  <p>New layouts are documented here as they ship — each entry includes copy-paste HTML composed from components and blocks.</p>
</div>

<div class="layouts-roadmap-grid">
  {{ layout_roadmap_card(
    "megaphone",
    "Minimal marketing shell",
    "planned",
    "Hero, navigation, and footer regions for product landing pages and lightweight marketing sites."
  ) }}

  {{ layout_roadmap_card(
    "layout-dashboard",
    "Minimal admin / dashboard shell",
    "planned",
    "Sidebar, header, and main content area for internal tools, admin panels, and operational dashboards."
  ) }}

  {{ layout_roadmap_card(
    "book-open",
    "Documentation site shell",
    "live",
    "Reference layout powering this docs site — grouped sidebar navigation, command search, and page chrome.",
    "/docs-site/",
    "Docs site layout guide"
  ) }}

  {{ layout_roadmap_card(
    "layers",
    "Extended marketing landing",
    "planned",
    "Full landing pages with feature grids, social proof, pricing blocks, and primary call-to-action sections."
  ) }}

  {{ layout_roadmap_card(
    "grid-3x3",
    "Extended admin dashboard",
    "planned",
    "Dense dashboard shell with widget regions, summary cards, charts, and data-dense table layouts."
  ) }}

  {{ layout_roadmap_card(
    "settings",
    "Settings and account pages",
    "planned",
    "Profile, billing, and preference flows with form-heavy content regions and consistent page headers."
  ) }}
</div>

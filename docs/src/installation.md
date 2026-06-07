---
templateEngineOverride: njk
layout: layouts/page.njk
title: Installation
description: How to install and use 5H3LL-UI in your app.
icon: download
toc:
  - label: Install using the CDN
    id: install-cdn
    children:
      - label: Install all components
        id: install-cdn-all
      - label: Install specific components
        id: install-cdn-specific
  - label: Installing using NPM
    id: install-npm
    children:
      - label: "Step 1: Add Tailwind CSS"
        id: install-npm-tailwind
      - label: "Step 2: Add 5H3LL-UI"
        id: install-npm-5h3ll-ui
      - label: "Step 3: Import 5H3LL-UI"
        id: install-npm-import
      - label: "Step 4: Add JavaScript files"
        id: install-npm-js
      - label: "Step 5: Use components"
        id: install-npm-done
  - label: Components with JavaScript
    id: install-js
---

{% from "macros/code_block.njk" import code_block %}
{% from "tabs.njk" import tabs %}

<h2 id="install-cdn"><a href="#install-cdn">Install using the CDN</a></h2>

<h3 id="install-cdn-all"><a href="#install-cdn-all">Install all components</a></h3>

<section class="prose">
  <p>Add the following to the <code><head></code> of your HTML file:</p>
</section>

{% set code %}<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@social-5h3ll/5h3ll-ui@{{ pkg.version }}/dist/5h3ll_ui.cdn.min.css">
<script src="https://cdn.jsdelivr.net/npm/@social-5h3ll/5h3ll-ui@{{ pkg.version }}/dist/js/all.min.js" defer></script>{% endset %}
{{ code_block(code, "html") }}

<section class="prose">
  <p>The default CDN stylesheet is the 5H3LL-UI default. To use a specific style, load the matching standalone stylesheet instead:</p>
</section>

{% set code %}<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@social-5h3ll/5h3ll-ui@{{ pkg.version }}/dist/5h3ll_ui-sera.cdn.min.css">{% endset %}
{{ code_block(code, "html") }}

<h3 id="install-cdn-specific"><a href="#install-cdn-specific">Install specific components</a></h3>

<section class="prose">
  <p>While the JavaScript file for all components is small (around 3kB gzipped), you can cherry-pick the components you need as instructed in the component's page (<a href="/components/dropdown-menu">Dropdown Menu</a>, <a href="/components/popover">Popover</a>, <a href="/components/select">Select</a>, <a href="/components/sidebar">Sidebar</a>, <a href="/components/tabs">Tabs</a> and <a href="/components/toast">Toast</a>). For example, to add the <a href="/components/dropdown-menu">Dropdown Menu</a> component, add the following to the <code><head></code> of your HTML file:</p>
</section>

{% set code %}<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@social-5h3ll/5h3ll-ui@{{ pkg.version }}/dist/5h3ll_ui.cdn.min.css">
<script src="https://cdn.jsdelivr.net/npm/@social-5h3ll/5h3ll-ui@{{ pkg.version }}/dist/js/ui5h3ll.min.js" defer></script> <!-- Only needed once to register and initialize components -->
<script src="https://cdn.jsdelivr.net/npm/@social-5h3ll/5h3ll-ui@{{ pkg.version }}/dist/js/dropdown-menu.min.js" defer></script>{% endset %}
{{ code_block(code, "html") }}

<h2 id="install-npm"><a href="#install-npm">Install using NPM</a></h2>

<div class="grid gap-8 mb-12">
  <section>
    <h3 class="mb-4 scroll-m-20 font-semibold tracking-tight" id="install-npm-tailwind"><a href="#install-npm-tailwind">Step 1: Add Tailwind CSS</a></h3>
    <div class="prose">
      <p>5H3LL-UI uses Tailwind CSS. You need to install it in your project.</p>
      <p><a href="https://tailwindcss.com/docs/installation" target="_blank">Follow the Tailwind CSS installation instructions to get started.</a></p>
    </div>
  </section>
  <section>
    <h3 class="mb-4 scroll-m-20 font-semibold tracking-tight" id="install-npm-5h3ll-ui"><a href="#install-npm-5h3ll-ui">Step 2: Add 5H3LL-UI</a></h3>
    <div class="prose">
      <p>Add 5H3LL-UI to your Tailwind CSS file.</p>
    </div>
    {% set code_npm %}npm install @social-5h3ll/5h3ll-ui{% endset %}
    {% set code_pnpm %}pnpm add @social-5h3ll/5h3ll-ui{% endset %}
    {% set code_bun %}bun add @social-5h3ll/5h3ll-ui{% endset %}
    {% set code_yarn %}yarn add @social-5h3ll/5h3ll-ui{% endset %}
    {% set tabsets = [
      { tab: "npm", panel: code_block(code_npm, class="") },
      { tab: "pnpm", panel: code_block(code_pnpm, class="") },
      { tab: "bun", panel: code_block(code_bun, class="") },
      { tab: "yarn", panel: code_block(code_yarn, class="") }
    ] %}
    {{ tabs(id="npm-install", tabsets=tabsets) }}
    <div class="prose">
      <p>Alternatively, you can directly <a href="https://github.com/social-5h3ll/5h3ll-ui/blob/main/src/css/5h3ll_ui.css" target="_blank">copy the <code>5h3ll_ui.css</code> file</a> into your project.</p>
    </div>
  </section>
  <section>
    <h3 class="mb-4 scroll-m-20 font-semibold tracking-tight" id="install-npm-import"><a href="#install-npm-import">Step 3: Import 5H3LL-UI</a></h3>
    {% set code %}@import "tailwindcss";
@import "@social-5h3ll/5h3ll-ui";{% endset %}
    {{ code_block(code, "css") }}
    <div class="prose">
      <p>The default import is the 5H3LL-UI default. To use a specific style, import the standalone style bundle instead:</p>
    </div>
    {% set code %}@import "tailwindcss";
@import "@social-5h3ll/5h3ll-ui/sera";{% endset %}
    {{ code_block(code, "css") }}
  </section>
  <section>
    <h3 class="mb-4 scroll-m-20 font-semibold tracking-tight" id="install-npm-js"><a href="#install-npm-js">Step 4: Add JavaScript files</a></h3>
    <div class="prose">
      <p>Some components <a href="#install-js">need some JavaScript</a> (e.g. the <a href="/components/tabs">Tabs</a> component). There are two ways to get it into your project:</p>

      <h4 class="mt-6 font-semibold">Using a build tool (Vite, Webpack…)</h4>
      <p>If your project is ESM-aware you can directly import the scripts. To include all components:</p>
    </div>
    {% set code %}{% raw %}import '@social-5h3ll/5h3ll-ui/all';{% endraw %}{% endset %}
    {{ code_block(code, "js") }}
    <div class="prose">
      <p>Or cherry-pick specific components, for example:</p>
    </div>
    {% set code %}{% raw %}import '@social-5h3ll/5h3ll-ui/ui5h3ll';
import '@social-5h3ll/5h3ll-ui/popover';
import '@social-5h3ll/5h3ll-ui/tabs';{% endraw %}{% endset %}
    {{ code_block(code, "js") }}
    <div class="prose">
      <h4 class="mt-6 font-semibold">Without a build tool</h4>
      <p>Copy the pre-built files from <code>node_modules</code> into your public directory:</p>
    </div>
    {% set code %}npx copyfiles -u 1 "node_modules/@social-5h3ll/5h3ll-ui/dist/js/**/*" public/js/5h3ll-ui{% endset %}
    {{ code_block(code, "bash") }}
    <div class="prose">
      <p>Then reference the script you need as well as the <code>ui5h3ll.min.js</code> file (used to register and initialize components):</p>
    </div>
    {% set code %}<script src="/js/5h3ll-ui/ui5h3ll.min.js" defer></script>
<script src="/js/5h3ll-ui/tabs.min.js" defer></script>{% endset %}
    {{ code_block(code, "html") }}
    <div class="prose">
      <p>See each component page for the minimal script required.</p>
    </div>
  </section>
  <section>
    <h3 class="mb-4 scroll-m-20 font-semibold tracking-tight" id="install-npm-done"><a href="#install-npm-done">Step 5: Use components</a></h3>
    <div class="prose">
      <p>You can now use any of the 5H3LL-UI classes in your project (e.g. <code>btn</code>, <code>card</code>, <code>input</code>, etc). Read the documentation about each component to get started (e.g. <a href="/components/button">button</a>, <a href="/components/card">card</a>, <a href="/components/input">input</a>, etc).</p>
      <p>Some components (e.g. <a href="/components/select">Select</a>) require <a href="#install-js">JavaScript code to work</a>.</p>
    </div>
  </section>
</div>

<h2 id="install-js"><a href="#install-js">Components with JavaScript</a></h2>

<div class="prose">
  <p><b>A handful of components require JavaScript code to work</b>, specifically <a href="/components/dropdown-menu">Dropdown Menu</a>, <a href="/components/popover">Popover</a>, <a href="/components/select">Select</a>, <a href="/components/sidebar">Sidebar</a>, <a href="/components/tabs">Tabs</a> and <a href="/components/toast">Toast</a></p>

  <p>If a component requires JavaScript, the documentation page will provide instructions. There are 2 options to add the JavaScript code to your project:</p>

  <ul>
    <li><b>CDN</b>: you either <a href="#install-cdn-all">add the code for all of the components</a> to the <code><head></code> of your HTML file, or just the file for the component you want to use as instructed on the component's page.</li>
    <li><b>Local file</b>: you download the script as a separate file and include it in your project. Once again, you have the choice to include the file for all components at once (<code>all.min.js</code> or <code>all.js</code>).</li>
  </ul>
</div>

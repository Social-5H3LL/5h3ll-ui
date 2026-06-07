---
templateEngineOverride: njk
layout: layouts/page.njk
title: Typography
description: Styles for headings, paragraphs, lists, and other text — utility-class patterns, not a shipped component.
icon: type
toc:
  - label: Overview
    id: overview
  - label: Examples
    id: examples
    children:
      - label: Full example
        id: example-full
      - label: h1
        id: example-h1
      - label: h2
        id: example-h2
      - label: h3
        id: example-h3
      - label: h4
        id: example-h4
      - label: p
        id: example-p
      - label: Blockquote
        id: example-blockquote
      - label: Table
        id: example-table
      - label: List
        id: example-list
      - label: Inline code
        id: example-inline-code
      - label: Lead
        id: example-lead
      - label: Large
        id: example-large
      - label: Small
        id: example-small
      - label: Muted
        id: example-muted
      - label: RTL
        id: example-rtl
---

{% from "macros/code_preview.njk" import code_preview %}
{% from "macros/code_block.njk" import code_block %}

<h2 id="overview"><a href="#overview">Overview</a></h2>

<div class="prose">
  <p>5H3LL-UI does <strong>not</strong> ship typography styles in the package. This page shows how to style headings, paragraphs, lists, tables, and text variants with Tailwind utility classes — the same approach as <a href="https://ui.shadcn.com/docs/components/radix/typography" target="_blank" rel="noopener noreferrer">shadcn/ui Typography</a>.</p>
  <p>Copy the patterns below into your own markup. For long-form docs or blog content, you can also wrap regions in <code>.prose</code> on the 5H3LL-UI docs site (<code>docs/css/custom.css</code>). Shipping <code>.prose</code> in the package may come later; for now it is docs-only.</p>
  <p><strong>Intentional difference:</strong> examples use logical properties where noted (<code>border-s</code>, <code>ps</code>, <code>ms</code>, <code>text-start</code>) so typography works in RTL without separate physical rules.</p>
</div>

<h2 id="examples"><a href="#examples">Examples</a></h2>

<h3 id="example-full"><a href="#example-full">Full example</a></h3>

{% set code %}
{% include "partials/blocks/typography-joke-tax.njk" %}
{% endset %}
{{ code_preview("typography-full", code, "w-full") }}

<h3 id="example-h1"><a href="#example-h1">h1</a></h3>

{% set code %}
<h1 class="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
  Taxing Laughter: The Joke Tax Chronicles
</h1>
{% endset %}
{{ code_preview("typography-h1", code, "w-full max-w-3xl") }}

<h3 id="example-h2"><a href="#example-h2">h2</a></h3>

{% set code %}
<h2 class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
  The People of the Kingdom
</h2>
{% endset %}
{{ code_preview("typography-h2", code, "w-full max-w-3xl") }}

<h3 id="example-h3"><a href="#example-h3">h3</a></h3>

{% set code %}
<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">
  The Joke Tax
</h3>
{% endset %}
{{ code_preview("typography-h3", code, "w-full max-w-3xl") }}

<h3 id="example-h4"><a href="#example-h4">h4</a></h3>

{% set code %}
<h4 class="scroll-m-20 text-xl font-semibold tracking-tight">
  People stopped telling jokes
</h4>
{% endset %}
{{ code_preview("typography-h4", code, "w-full max-w-3xl") }}

<h3 id="example-p"><a href="#example-p">p</a></h3>

{% set code %}
<p class="leading-7 [&:not(:first-child)]:mt-6">
  The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax.
</p>
{% endset %}
{{ code_preview("typography-p", code, "w-full max-w-3xl") }}

<h3 id="example-blockquote"><a href="#example-blockquote">Blockquote</a></h3>

{% set code %}
<blockquote class="mt-6 border-s-2 ps-6 italic">
  "After all," he said, "everyone enjoys a good joke, so it's only fair that they should pay for the privilege."
</blockquote>
{% endset %}
{{ code_preview("typography-blockquote", code, "w-full max-w-3xl") }}

<h3 id="example-table"><a href="#example-table">Table</a></h3>

<div class="prose">
  <p>For data-heavy UIs with sorting, captions, and component styling, see <a href="/components/table/">Table</a>. The pattern below is for simple typography tables inside articles.</p>
</div>

{% set code %}
<div class="my-6 w-full overflow-x-auto">
  <table class="w-full caption-bottom text-sm">
    <thead>
      <tr class="border-b">
        <th class="h-10 px-4 text-start align-middle font-medium">King's Treasury</th>
        <th class="h-10 px-4 text-start align-middle font-medium">People's happiness</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b">
        <td class="p-4 align-middle">Empty</td>
        <td class="p-4 align-middle">Overflowing</td>
      </tr>
      <tr class="border-b">
        <td class="p-4 align-middle">Modest</td>
        <td class="p-4 align-middle">Satisfied</td>
      </tr>
      <tr class="border-b">
        <td class="p-4 align-middle">Full</td>
        <td class="p-4 align-middle">Ecstatic</td>
      </tr>
    </tbody>
  </table>
</div>
{% endset %}
{{ code_preview("typography-table", code, "w-full max-w-3xl") }}

<h3 id="example-list"><a href="#example-list">List</a></h3>

{% set code %}
<ul class="my-6 ms-6 list-disc [&>li]:mt-2">
  <li>1st level of puns: 5 gold coins</li>
  <li>2nd level of jokes: 10 gold coins</li>
  <li>3rd level of one-liners: 20 gold coins</li>
</ul>
{% endset %}
{{ code_preview("typography-list", code, "w-full max-w-3xl") }}

<h3 id="example-inline-code"><a href="#example-inline-code">Inline code</a></h3>

<div class="prose">
  <p>Matches the inline <code>code</code> styling used in docs <code>.prose</code> regions.</p>
</div>

{% set code %}
<code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">@radix-ui/react-alert-dialog</code>
{% endset %}
{{ code_preview("typography-inline-code", code) }}

<h3 id="example-lead"><a href="#example-lead">Lead</a></h3>

{% set code %}
<p class="text-xl text-muted-foreground">
  A modal dialog that interrupts the user with important content and expects a response.
</p>
{% endset %}
{{ code_preview("typography-lead", code, "w-full max-w-3xl") }}

<h3 id="example-large"><a href="#example-large">Large</a></h3>

{% set code %}
<p class="text-lg font-semibold">Are you absolutely sure?</p>
{% endset %}
{{ code_preview("typography-large", code) }}

<h3 id="example-small"><a href="#example-small">Small</a></h3>

{% set code %}
<small class="text-sm leading-none font-medium">Email address</small>
{% endset %}
{{ code_preview("typography-small", code) }}

<h3 id="example-muted"><a href="#example-muted">Muted</a></h3>

{% set code %}
<p class="text-sm text-muted-foreground">Enter your email address.</p>
{% endset %}
{{ code_preview("typography-muted", code) }}

<h3 id="example-rtl"><a href="#example-rtl">RTL</a></h3>

<div class="prose">
  <p>Add <code>dir="rtl"</code> on the article or a page wrapper. Prefer logical spacing utilities (<code>border-s</code>, <code>ps</code>, <code>ms</code>) in typography patterns so blockquotes and lists flip automatically.</p>
</div>

{% set code %}
<article class="typography-joke-tax mx-auto w-full max-w-3xl" dir="rtl" lang="ar">
  <h1 class="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
    فرض الضرائب على الضحك: سجلات ضريبة النكتة
  </h1>
  <p class="leading-7 [&:not(:first-child)]:mt-6">
    في قديم الزمان، في أرض بعيدة، كان هناك ملك كسول جداً يقضي يومه كله مستلقياً على عرشه. في أحد الأيام، جاءه مستشاروه بمشكلة: المملكة كانت تنفد من المال.
  </p>
  <h2 class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 [&:not(:first-child)]:mt-10">
    خطة الملك
  </h2>
  <p class="leading-7 [&:not(:first-child)]:mt-6">
    فكر الملك طويلاً وبجد، وأخيراً توصل إلى خطة عبقرية: سيفرض ضريبة على النكات في المملكة.
  </p>
  <blockquote class="mt-6 border-s-2 ps-6 italic">
    "في النهاية،" قال، "الجميع يستمتع بنكتة جيدة، لذا من العدل أن يدفعوا مقابل هذا الامتياز."
  </blockquote>
  <ul class="my-6 ms-6 list-disc [&>li]:mt-2">
    <li>المستوى الأول من التورية: 5 قطع ذهبية</li>
    <li>المستوى الثاني من النكات: 10 قطع ذهبية</li>
    <li>المستوى الثالث من النكات القصيرة: 20 قطعة ذهبية</li>
  </ul>
</article>
{% endset %}
{{ code_preview("typography-rtl", code, "w-full") }}

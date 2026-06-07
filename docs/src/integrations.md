---
templateEngineOverride: njk
layout: layouts/page.njk
title: Integrations
description: AI agent integrations for 5H3LL-UI — supported tools, llms.txt, and the portable user skill.
icon: plug
toc:
  - label: Overview
    id: overview
  - label: Supported agents
    id: agents
  - label: llms.txt
    id: llms-txt
  - label: User skill
    id: user-skill
  - label: Working with agents
    id: workflow
---

{% from "macros/lobe_agent_icon.njk" import integration_agent_card %}
{% set lobe = "https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages" %}
{% set llms_link = '<a href="/llms.txt" hx-boost="false"><code>/llms.txt</code></a>' %}
{% set skill_link = '<a href="https://github.com/social-5h3ll/5h3ll-ui/blob/main/agents/SKILL.md" target="_blank" rel="noopener noreferrer"><code>agents/SKILL.md</code></a>' %}

<h2 id="overview"><a href="#overview">Overview</a></h2>

<div class="prose">
  <p>5H3LL-UI is built for <strong>human + agent</strong> collaboration. Point agents at <a href="/llms.txt" hx-boost="false"><code>/llms.txt</code></a> for site-wide context and load <a href="https://github.com/social-5h3ll/5h3ll-ui/blob/main/agents/SKILL.md"><code>agents/SKILL.md</code></a> as the portable user skill for markup and setup rules.</p>
  <p>Use this page to connect your agent stack — whether you work in an IDE, a hosted model API, or an orchestration platform.</p>
</div>

<h2 id="agents"><a href="#agents">Supported agents</a></h2>

<div class="prose">
  <p>These tools are commonly used with 5H3LL-UI. Most integrations start with <code>/llms.txt</code>; skill-capable hosts should also load <code>agents/SKILL.md</code>.</p>
  <p>Brand marks are served from <a href="https://github.com/lobehub/lobe-icons">LobeHub lobe-icons</a>. Each card shows the icon and theme-specific wordmark with an external-link control in the header; the provider URL is linked at the bottom of the card.</p>
</div>

<div class="integrations-agent-grid">
  {{ integration_agent_card(
    lobe ~ "/static-avatar/avatars/openclaw.webp",
    lobe ~ "/static-avatar/avatars/openclaw.webp",
    lobe ~ "/static-png/light/openclaw-text.png",
    lobe ~ "/static-png/dark/openclaw-text.png",
    "OpenClaw",
    "https://openclaw.ai",
    "openclaw.ai",
    "OpenClaw orchestrates task breakdown, documentation drafts, and multi-step workflows against structured project context.",
    "Context",
    llms_link
  ) }}

  {{ integration_agent_card(
    lobe ~ "/static-avatar/avatars/nousresearch.webp",
    lobe ~ "/static-avatar/avatars/nousresearch.webp",
    lobe ~ "/static-png/light/nousresearch-text.png",
    lobe ~ "/static-png/dark/nousresearch-text.png",
    "Hermes",
    "https://github.com/NousResearch/hermes-agent",
    "NousResearch Hermes",
    "Hermes is the NousResearch agent runtime for loading maintainer skills across local and hosted environments.",
    "Skill",
    skill_link
  ) }}

  {{ integration_agent_card(
    lobe ~ "/static-png/dark/codex-color.png",
    lobe ~ "/static-png/light/codex-color.png",
    lobe ~ "/static-png/light/codex-text.png",
    lobe ~ "/static-png/dark/codex-text.png",
    "OpenAI Codex",
    "https://developers.openai.com/codex",
    "OpenAI Codex",
    "OpenAI Codex reviews architecture, accessibility, edge cases, and pull-request diffs in the 5H3LL-UI repository.",
    "Context",
    llms_link
  ) }}

  {{ integration_agent_card(
    lobe ~ "/static-png/light/cursor.png",
    lobe ~ "/static-png/dark/cursor.png",
    lobe ~ "/static-png/light/cursor-text.png",
    lobe ~ "/static-png/dark/cursor-text.png",
    "Cursor",
    "https://cursor.com",
    "cursor.com",
    "Cursor is a common IDE for implementation, refactors, documentation updates, and interactive debugging with 5H3LL-UI.",
    "Skill",
    skill_link
  ) }}

  {{ integration_agent_card(
    lobe ~ "/static-avatar/avatars/claude.webp",
    lobe ~ "/static-avatar/avatars/claude.webp",
    lobe ~ "/static-png/light/claude-text.png",
    lobe ~ "/static-png/dark/claude-text.png",
    "Anthropic Claude",
    "https://www.anthropic.com/claude",
    "anthropic.com/claude",
    "Anthropic Claude supports terminal and IDE agent workflows for editing 5H3LL-UI components and documentation.",
    "Context",
    llms_link
  ) }}

  {{ integration_agent_card(
    lobe ~ "/static-png/light/githubcopilot.png",
    lobe ~ "/static-png/dark/githubcopilot.png",
    lobe ~ "/static-png/light/githubcopilot-text.png",
    lobe ~ "/static-png/dark/githubcopilot-text.png",
    "GitHub Copilot",
    "https://github.com/features/copilot",
    "GitHub Copilot",
    "GitHub Copilot provides inline completion and chat inside GitHub and supported editors when working with 5H3LL-UI markup.",
    "Context",
    llms_link
  ) }}

  {{ integration_agent_card(
    lobe ~ "/static-png/light/copilot-color.png",
    lobe ~ "/static-png/dark/copilot-color.png",
    lobe ~ "/static-png/light/copilot-text.png",
    lobe ~ "/static-png/dark/copilot-text.png",
    "Microsoft Copilot",
    "https://copilot.microsoft.com",
    "copilot.microsoft.com",
    "Microsoft Copilot supports workspace and IDE assistants across the Microsoft ecosystem for 5H3LL-UI component work.",
    "Context",
    llms_link
  ) }}

  {{ integration_agent_card(
    lobe ~ "/static-png/light/gemini-color.png",
    lobe ~ "/static-png/dark/gemini-color.png",
    lobe ~ "/static-png/light/gemini-text.png",
    lobe ~ "/static-png/dark/gemini-text.png",
    "Google Gemini",
    "https://gemini.google.com",
    "gemini.google.com",
    "Google Gemini provides coding assistants for generating faithful 5H3LL-UI HTML and CSS from component documentation.",
    "Context",
    llms_link
  ) }}

  {{ integration_agent_card(
    lobe ~ "/static-png/light/grok.png",
    lobe ~ "/static-png/dark/grok.png",
    lobe ~ "/static-png/light/grok-text.png",
    lobe ~ "/static-png/dark/grok-text.png",
    "Grok",
    "https://x.ai",
    "x.ai",
    "Grok is xAI agent tooling for structured component and block contributions using the public docs.",
    "Context",
    llms_link
  ) }}

  {{ integration_agent_card(
    lobe ~ "/static-png/light/minimax-color.png",
    lobe ~ "/static-png/dark/minimax-color.png",
    lobe ~ "/static-png/light/minimax-text.png",
    lobe ~ "/static-png/dark/minimax-text.png",
    "MiniMax",
    "https://www.minimax.io",
    "minimax.io",
    "MiniMax provides models for orchestration, subagents, and parallel drafting tasks alongside 5H3LL-UI documentation.",
    "Context",
    llms_link
  ) }}
</div>

<h2 id="llms-txt"><a href="#llms-txt">llms.txt</a></h2>

<div class="prose">
  <p>Each docs build writes <a href="/llms.txt" hx-boost="false"><code>/llms.txt</code></a> — a plain-text index of documentation pages with titles, URLs, and descriptions. Point agents and IDE context tools at this file for full-site awareness without scraping HTML.</p>
  <p>Preview the generated index on the docs site at <a href="/integrations/llms/"><code>/integrations/llms/</code></a>, or open the raw <a href="/llms-full.txt" hx-boost="false"><code>/llms-full.txt</code></a> export for complete page bodies.</p>
  <p>Generated by <code>src/eleventy/llm-content.js</code> from <code>docs.json</code> menu slugs and all <code>docs/src/**/*.md</code> sources.</p>
</div>

<h2 id="user-skill"><a href="#user-skill">User skill</a></h2>

<div class="prose">
  <p><a href="https://github.com/social-5h3ll/5h3ll-ui/blob/main/agents/SKILL.md"><code>agents/SKILL.md</code></a> is the portable skill for <strong>using</strong> 5H3LL-UI in your project — install paths, markup rules, style packs, and links to docs. Copy or reference it in Cursor, Hermes, OpenClaw, Codex, and other skill-capable hosts.</p>
  <p>It is intentionally separate from internal maintainer docs (repo editing, specs, release tracking) which are not part of the public release archive.</p>
  <ul>
    <li><strong>Context</strong> — load <code>/llms.txt</code> first for full documentation coverage</li>
    <li><strong>Skill</strong> — load <code>agents/SKILL.md</code> for stable markup and setup constraints</li>
    <li><strong>Cursor</strong> — copy to <code>.cursor/skills/5h3ll-ui/SKILL.md</code> or point rules at the GitHub raw file</li>
  </ul>
</div>

<h2 id="workflow"><a href="#workflow">Working with agents</a></h2>

<div class="prose">
  <p>A typical flow:</p>
  <ol>
    <li><strong>Human</strong> — defines the goal and approves output.</li>
    <li><strong>Agent</strong> — loads <code>/llms.txt</code> and <code>agents/SKILL.md</code>, then opens the relevant component or block page.</li>
    <li><strong>Agent</strong> — implements markup or project changes using documented examples; contributors run <code>npm run build</code> and <code>npm run docs:build</code> when editing the library itself.</li>
  </ol>
  <p>Keep output aligned with the public API: semantic HTML, documented component classes, minimal vanilla JS only where behavior is required, and docs examples for every supported markup change.</p>
</div>

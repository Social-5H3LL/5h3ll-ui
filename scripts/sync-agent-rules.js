#!/usr/bin/env node
/**
 * Sync portable agent rules from dev/rules/ → .cursor/rules/*.mdc
 * and regenerate dev/rules/ALL-RULES.md.
 *
 * Source of truth: dev/rules/*.md + dev/rules/manifest.json
 * Do not hand-edit .cursor/rules/*.mdc
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

async function readJson(filePath) {
  const raw = await fs.readFile(filePath, 'utf8');
  return JSON.parse(raw);
}

function yamlFrontmatter(cursor) {
  const lines = ['---'];
  lines.push(`description: ${cursor.description}`);
  if (cursor.globs) lines.push(`globs: ${cursor.globs}`);
  lines.push(`alwaysApply: ${cursor.alwaysApply === true}`);
  lines.push('---');
  return lines.join('\n');
}

function buildBundle(manifest, bodies) {
  const generated = new Date().toISOString().slice(0, 10);
  const sections = [
    '# 5H3LL-UI — Maintainer agent rules (all)',
    '',
    `> Generated from \`dev/rules/\` on ${generated}. Edit source files and run \`npm run rules:sync\`.`,
    '',
    'Read **`dev/AGENT-BRIEF.md`** first for full workflow, inbox, and Lobe Icons CDN policy.',
    '',
    '---',
    '',
  ];

  for (const rule of manifest.rules) {
    const body = bodies.get(rule.source);
    sections.push(`## ${rule.title}`);
    if (rule.applyWhen) {
      sections.push('');
      sections.push(`**Apply when:** ${rule.applyWhen}`);
    } else {
      sections.push('');
      sections.push('**Apply when:** Every session');
    }
    sections.push('');
    sections.push(body.trim());
    sections.push('');
    sections.push('---');
    sections.push('');
  }

  return sections.join('\n').trimEnd() + '\n';
}

async function main() {
  const manifestPath = path.join(root, 'dev/rules/manifest.json');
  const manifest = await readJson(manifestPath);
  const bodies = new Map();

  for (const rule of manifest.rules) {
    const sourcePath = path.join(root, manifest.sourceDir, rule.source);
    const body = await fs.readFile(sourcePath, 'utf8');
    bodies.set(rule.source, body);
  }

  const cursorDir = path.join(root, manifest.cursorDir);
  await fs.mkdir(cursorDir, { recursive: true });

  for (const rule of manifest.rules) {
    const body = bodies.get(rule.source);
    const mdc = `${yamlFrontmatter(rule.cursor)}\n\n${body.trimEnd()}\n`;
    const outPath = path.join(cursorDir, `${rule.id}.mdc`);
    await fs.writeFile(outPath, mdc, 'utf8');
    console.log(`wrote ${path.relative(root, outPath)}`);
  }

  const bundlePath = path.join(root, manifest.bundle);
  await fs.writeFile(bundlePath, buildBundle(manifest, bodies), 'utf8');
  console.log(`wrote ${path.relative(root, bundlePath)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

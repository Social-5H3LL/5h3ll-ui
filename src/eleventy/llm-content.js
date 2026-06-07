import fs from 'node:fs/promises';
import path from 'node:path';

import { collectMenuSlugs, docUrl, fallbackLabelFromSlug } from './menu.js';

export const toAsciiPlainText = (text) => {
  if (!text) return text;
  return text
    .replace(/\uFEFF/g, '')
    .replace(/\s*\u2014\s*/g, ' - ')
    .replace(/\s*\u2013\s*/g, ' - ')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\u2026/g, '...')
    .replace(/\u00A0/g, ' ');
};

const collectFiles = async (dir, predicate) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const out = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await collectFiles(fullPath, predicate)));
    else if (entry.isFile() && predicate(fullPath)) out.push(fullPath);
  }

  return out;
};

const stripFrontMatter = (source) => {
  if (!source.startsWith('---')) return source;
  const match = source.match(/^---\s*\n[\s\S]*?\n---\s*\n?/);
  return match ? source.slice(match[0].length) : source;
};

const readFrontMatterField = (source, key) => {
  if (!source.startsWith('---')) return null;
  const match = source.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
  if (!match) return null;
  const line = match[1]
    .split('\n')
    .map((l) => l.trim())
    .find((l) => l.startsWith(`${key}:`));
  if (!line) return null;
  let value = line.slice(`${key}:`.length).trim();
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    value = value.slice(1, -1);
  }
  return value || null;
};

export async function buildLlmArtifacts({ docsRoot, siteUrl, siteTitle, menu = [] }) {
  const sourceFiles = await collectFiles(docsRoot, (filePath) => filePath.endsWith('.md'));
  const docs = (
    await Promise.all(
      sourceFiles.map(async (filePath) => {
        const source = await fs.readFile(filePath, 'utf8');
        const relative = path.relative(docsRoot, filePath).replaceAll(path.sep, '/');
        const slug = relative.replace(/\.md$/, '') === 'index' ? 'index' : relative.replace(/\.md$/, '');
        const url = docUrl(slug);
        const title = toAsciiPlainText(readFrontMatterField(source, 'title') || fallbackLabelFromSlug(slug));
        const description = toAsciiPlainText((readFrontMatterField(source, 'description') || '').trim());
        const content = toAsciiPlainText(stripFrontMatter(source).trim());
        return { slug, url, title: title.trim(), description, content };
      }),
    )
  ).sort((a, b) => a.url.localeCompare(b.url));

  const menuSlugs = collectMenuSlugs(menu);
  const docsBySlug = new Map(docs.map((d) => [d.slug, d]));
  const docsInMenu = menuSlugs.map((slug) => docsBySlug.get(slug)).filter(Boolean);
  const docsNotInMenu = docs.filter((doc) => !docsInMenu.includes(doc));
  const orderedDocs = [...docsInMenu, ...docsNotInMenu];

  const llmsLines = [`# ${toAsciiPlainText(siteTitle)}`, '', '## Docs', ''];
  menu.forEach((group) => {
    if (group?.type !== 'group') return;
    llmsLines.push(`### ${toAsciiPlainText(group.label || 'Docs')}`, '');
    const addSlug = (slug) => {
      const doc = docsBySlug.get(slug);
      if (!doc) return;
      const fullUrl = `${siteUrl}${doc.url}`;
      llmsLines.push(doc.description ? `- [${doc.title}](${fullUrl}): ${doc.description}` : `- [${doc.title}](${fullUrl})`);
    };
    (group.items || []).forEach((item) => {
      if (typeof item === 'string') addSlug(item);
      else if (item?.type === 'submenu' && Array.isArray(item.items)) item.items.forEach(addSlug);
    });
    llmsLines.push('');
  });

  const fullLines = [];
  orderedDocs.forEach((doc) => {
    fullLines.push(`# ${doc.title}`, `Source: ${siteUrl}${doc.url}`, '');
    if (doc.description) fullLines.push(doc.description, '');
    fullLines.push(doc.content, '', '---', '');
  });

  return {
    docs,
    orderedDocs,
    indexText: llmsLines.join('\n') + '\n',
    fullText: fullLines.join('\n') + '\n',
    docCount: docs.length,
  };
}

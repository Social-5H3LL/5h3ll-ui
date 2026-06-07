import fs from 'node:fs/promises';
import path from 'node:path';

import { buildLlmArtifacts } from './llm-content.js';

export const registerLlmExports = (eleventyConfig, options) => {
  const writeTextFile = async (outputDir, relativePath, content) => {
    const outPath = path.join(outputDir, relativePath);
    await fs.mkdir(path.dirname(outPath), { recursive: true });
    await fs.writeFile(outPath, content, 'utf8');
  };

  const markdownExportPathFromSlug = (slug) => {
    if (slug === 'index') return 'index.md';
    if (slug.endsWith('/index')) return `${slug.slice(0, -'/index'.length)}.md`;
    return `${slug}.md`;
  };

  eleventyConfig.on('afterBuild', async (eventsArg) => {
    const outputDir = eventsArg?.directories?.output || eventsArg?.dir?.output;
    const inputDir = eventsArg?.directories?.input || eventsArg?.dir?.input;
    if (!outputDir || !inputDir) return;

    const docsRoot = path.resolve(inputDir);
    const siteUrl = options.getSiteUrl();
    const siteTitle = options.getSiteTitle();

    let docsConfig = null;
    for (const docsConfigPath of [path.join(docsRoot, '_data', 'docs.json'), path.join(docsRoot, 'docs.json')]) {
      try {
        docsConfig = JSON.parse(await fs.readFile(docsConfigPath, 'utf8'));
        break;
      } catch (_) {}
    }
    const menu = docsConfig?.menu || [];

    const { docs, indexText, fullText } = await buildLlmArtifacts({
      docsRoot,
      siteUrl,
      siteTitle,
      menu,
    });

    await Promise.all(
      docs.map(async (doc) => {
        const parts = [`# ${doc.title}`];
        if (doc.description) parts.push(doc.description);
        if (doc.content) parts.push(doc.content);
        await writeTextFile(outputDir, markdownExportPathFromSlug(doc.slug), parts.join('\n\n') + '\n');
      }),
    );

    await writeTextFile(outputDir, 'llms.txt', indexText);

    await writeTextFile(
      outputDir,
      '_headers',
      ['/llms.txt', '  Content-Type: text/plain; charset=utf-8', '', '/llms-full.txt', '  Content-Type: text/plain; charset=utf-8', ''].join('\n') + '\n',
    );

    await writeTextFile(outputDir, 'llms-full.txt', fullText);
  });
};

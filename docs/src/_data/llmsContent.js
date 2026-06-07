import fs from 'node:fs/promises';
import path from 'node:path';

import { buildLlmArtifacts } from '../../../src/eleventy/llm-content.js';

export default async function llmsContent() {
  const docsRoot = path.resolve(process.cwd(), 'docs/src');
  const docsConfigPath = path.join(docsRoot, '_data', 'docs.json');
  const docsConfig = JSON.parse(await fs.readFile(docsConfigPath, 'utf8'));
  const isServe = process.argv.includes('--serve');
  const siteUrl = process.env.SITE_URL || (isServe ? '' : 'https://ui.5h3ll.site');

  const { indexText, fullText, docCount } = await buildLlmArtifacts({
    docsRoot,
    siteUrl,
    siteTitle: '5H3LL-UI',
    menu: docsConfig.menu || [],
  });

  return {
    indexText,
    fullText,
    docCount,
    fullLineCount: fullText.split('\n').length,
  };
};

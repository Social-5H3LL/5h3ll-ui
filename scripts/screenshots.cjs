const { chromium } = require('/Users/5h3ll/.nvm/versions/node/v24.16.0/lib/node_modules/playwright');

const BASE = 'http://localhost:8080';
const OUT = './screenshots';
const VIEWPORTS = [
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'mobile', width: 390, height: 844 },
];
const PAGES = [
  { url: '/', name: 'homepage' },
  { url: '/introduction', name: 'introduction' },
  { url: '/installation', name: 'installation' },
  { url: '/components/button', name: 'button' },
  { url: '/components/sidebar', name: 'sidebar' },
  { url: '/components/dialog', name: 'dialog' },
  { url: '/components/command', name: 'command' },
  { url: '/kitchen-sink', name: 'kitchen-sink' },
];

async function main() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  for (const vp of VIEWPORTS) {
    await page.setViewportSize({ width: vp.width, height: vp.height });

    for (const p of PAGES) {
      // Light mode
      await page.goto(`${BASE}${p.url}`, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.documentElement.classList.remove('dark'));
      await page.screenshot({
        path: `${OUT}/${p.name}-${vp.name}-light.png`,
        fullPage: false,
      });

      // Dark mode
      await page.evaluate(() => document.documentElement.classList.add('dark'));
      await page.screenshot({
        path: `${OUT}/${p.name}-${vp.name}-dark.png`,
        fullPage: false,
      });

      console.log(`✓ ${p.name} (${vp.name})`);
    }
  }

  await browser.close();
  console.log('\nAll screenshots saved to ./screenshots/');
}

main().catch(console.error);

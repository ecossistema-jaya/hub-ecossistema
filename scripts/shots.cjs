// Visual check: screenshots of the local preview in mobile/desktop × light/dark (+ reduced motion).
// Usage: node scripts/shots.cjs [outDir] [url]
const puppeteer = require(require.resolve('puppeteer', { paths: [process.cwd(), require('os').homedir()] }));
const path = require('path');

const out = process.argv[2] || 'shots';
const url = process.argv[3] || 'http://127.0.0.1:4321/';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--enable-webgl', '--ignore-gpu-blocklist'] });
  const cases = [
    { name: 'mobile-light', w: 390, h: 844, mobile: true, theme: 'light' },
    { name: 'mobile-dark', w: 390, h: 844, mobile: true, theme: 'dark' },
    { name: 'desktop-light', w: 1440, h: 900, mobile: false, theme: 'light' },
    { name: 'desktop-dark', w: 1440, h: 900, mobile: false, theme: 'dark' },
  ];
  for (const c of cases) {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    await page.setViewport({ width: c.w, height: c.h, deviceScaleFactor: c.mobile ? 2 : 1, isMobile: c.mobile, hasTouch: c.mobile });
    await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: c.theme }]);
    await page.goto(url, { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 4500)); // let intro + idle shader boot
    const info = await page.evaluate(() => ({
      theme: document.documentElement.dataset.theme,
      tier: document.documentElement.dataset.tier,
      shader: document.querySelector('.sun-canvas')?.classList.contains('is-ready'),
      overflowX: document.documentElement.scrollWidth > innerWidth,
    }));
    await page.screenshot({ path: path.join(out, `${c.name}-top.png`) });
    await page.screenshot({ path: path.join(out, `${c.name}-full.png`), fullPage: true });
    console.log(c.name, JSON.stringify(info), errors.length ? 'ERRORS: ' + errors.join(' | ') : 'no errors');
    await page.close();
  }
  await browser.close();
})();

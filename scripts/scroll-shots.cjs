// Scrolls the page like a visitor and captures viewport shots, so scroll-driven reveals actually run.
// Usage: node scripts/scroll-shots.cjs <outDir> <theme> [width] [height]
const puppeteer = require(require.resolve('puppeteer', { paths: [process.cwd(), require('os').homedir()] }));
const path = require('path');
const [out, theme = 'light', w = '390', h = '844'] = process.argv.slice(2);
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const mobile = +w < 800;
  await page.setViewport({ width: +w, height: +h, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile });
  await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: theme }]);
  await page.goto('http://127.0.0.1:4321/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1500));
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  let i = 0;
  for (let y = 0; y < total; y += +h * 0.9) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await new Promise((r) => setTimeout(r, 700));
    await page.screenshot({ path: path.join(out, `scroll-${theme}-${w}-${String(i++).padStart(2, '0')}.png`) });
  }
  const sw = await page.evaluate(() => document.documentElement.scrollWidth);
  console.log(`shots=${i} scrollWidth=${sw} viewport=${w}`);
  await browser.close();
})();

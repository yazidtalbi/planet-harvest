const path = require('node:path');
const { pathToFileURL } = require('node:url');
const puppeteer = require('/Users/yazidtalbi/.npm/_npx/0f94ee7615faf582/node_modules/puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/Users/yazidtalbi/Library/Caches/ms-playwright/chromium-1234/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
    headless: true,
    args: ['--no-sandbox'],
  });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 1.5 });
    await page.goto(pathToFileURL(path.join(__dirname, 'brand-guidelines.html')).href, { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);
    console.log(await page.evaluate(() => ({
      pages: document.querySelectorAll('.page').length,
      fonts: [...document.fonts].map(f => ({ family: f.family, status: f.status })),
      brokenImages: [...document.images].filter(i => !i.complete || !i.naturalWidth).map(i => i.src),
      pageBounds: [...document.querySelectorAll('.page')].map(el => ({ height: el.clientHeight, content: el.scrollHeight })),
    })));
    await page.pdf({ path: path.join(__dirname, 'Planet-Harvest-Brand-Guidelines.pdf'), preferCSSPageSize: true, printBackground: true });
    const pages = await page.$$('.page');
    for (let i = 0; i < pages.length; i++) {
      await pages[i].screenshot({ path: path.join(__dirname, `page-${i + 1}.png`) });
    }
  } finally {
    await browser.close();
  }
})();

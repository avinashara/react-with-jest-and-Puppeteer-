const puppeteer = require('puppeteer');

describe("check for rendering", () => {
  test('Loading..', async () => {
    debugger;
    let browser = await puppeteer.launch({
      headless: false
    });
    let page = await browser.newPage();
    page.emulate({
      viewport: {
        width: 500,
        height: 2400
      },
      userAgent: ''
    });
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('#jp-search-root');
    const html = await page.$eval('#jp-search-root', e => e.innerHTML);
    expect(typeof html).toBe('string');
    browser.close();
  }, 16000);
});
import puppeteer from 'puppeteer';

describe('Homepage', () => {
  it('it should have logo text', async () => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto('http://140.143.241.207:8000', { waitUntil: 'networkidle2' });
    await page.waitForSelector('h1');
    const text = await page.evaluate(() => document.body.innerHTML);
    expect(text).toContain('<h1>9AM x WeWork</h1>');
    await page.close();
    browser.close();
  });
});

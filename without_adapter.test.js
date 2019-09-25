const puppeteer = require('puppeteer');
let browser, page;

describe('Google', () => {
    beforeAll(async () => {
        jest.setTimeout(30000);
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 100,
            args: ['--start-maximized', '--window-size=1920,1200'],
            timeout: 30000 // maximum time in milliseconds to wait for the browser instance to start.
        })
        page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1200 })
    })
    afterAll(async () => {
        await browser.close()
    })

    it('should return the correct title of Google\'s homepage', async () => {
        await page.goto('https://www.google.com');
        await expect(page.title()).resolves.toMatch('Google');
    })

    it('should return the correct title of search item from WebdriverIO', async () => {
        await page.goto("https://webdriver.io/");
        await page.waitForSelector("#search_input_react");

        await Promise.all([
            page.waitForNavigation(),
            page.type("#search_input_react", 'puppeteer\n')
        ])

        await expect(page.title()).resolves.toMatch('Devtools Service · WebdriverIO');
    })

    it('should be redirected to search result page', async () => {
        await page.goto("https://tiki.vn");
        await page.waitForSelector('input[placeholder="Tìm sản phẩm, danh mục hay thương hiệu mong muốn ..."]');

        await Promise.all([
            page.waitForNavigation(),
            page.type('input[placeholder="Tìm sản phẩm, danh mục hay thương hiệu mong muốn ..."]', 'sony a73\n')
        ]);

        await expect(page.title()).resolves.toContain("sony a73");
    })
});
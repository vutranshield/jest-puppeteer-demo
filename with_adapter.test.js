/* step to use adapter:
    + install packages: jest-jestPuppeteer, jest, puppeteer
    + setup preset in `jest.config.js`
    + create file jest-puppeteer.config.js
    + no need to create the variables of browser. page
*/

describe('Test header and title of the page', () => {
    beforeAll(async () => {
        jest.setTimeout(30000);
        await page.setViewport({ width: 1920, height: 1200 });
    });

    it('Title of the page', async () => {
        await page.goto("https://google.com");
        const title = await page.title();
        expect(title).toEqual('Google');
    });
});
const Page = require('./helpers/page');

let page;

describe('Header testing', () => {
  beforeEach(async () => {
    page = await Page.build();
    await page.goto('http://localhost:3000');
  });

  afterEach(async () => {
    await page.close();
  });
  test('should have a brand logo text as Blogster', async () => {
    const text = await page.getContentsOf('a.brand-logo');
    expect(text).toEqual('Blogster');
  });
});

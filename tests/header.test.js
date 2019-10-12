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

  test('should click the link Login With Google and start oauth flow ', async () => {
    await page.click('.right a');

    const url = await page.url();
    expect(url).toMatch(/accounts\.google\.com/);
  });

  // test.skip('should show logout button when user is signed in', async () => {
  //   await page.login();

  //   const text = await page.$eval('a[href="/auth/logout"]', el => el.innerHTML);

  //   expect(text).toEqual('Logout');
  // });
});

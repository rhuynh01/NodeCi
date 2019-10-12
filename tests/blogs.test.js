const Page = require('./helpers/page');
let page;

beforeEach(async () => {
  page = await Page.build();
  await page.goto('http://localhost:3000');
});

afterEach(async () => {
  await page.close();
});

describe('When User is logged in', () => {
  beforeEach(async () => {
    await page.login();
    await page.click('a.btn-floating');
  });
  test('should see blog create form', async () => {
    const label = await page.getContentsOf('form label');
    expect(label).toEqual('Blog Title');
  });
  describe('and using invalid inputs', () => {
    beforeEach(async () => {
      await page.click('form button');
    });

    test('should show error message', async () => {
      const titleError = await page.getContentsOf('.title .red-text');
      const contentError = await page.getContentsOf('.title .red-text');

      expect(titleError).toEqual('You must provide a value');
      expect(contentError).toEqual('You must provide a value');
    });
  });
  describe('and using valid input', () => {
    beforeEach(async () => {
      await page.type('.title input', 'My Title');
      await page.type('.content input', 'My Content');
      await page.click('form button');
    });
    test('should take user to review screen after submitting', async () => {
      const text = await page.getContentsOf('h5');
      expect(text).toEqual('Please confirm your entries');
    });
    test('should saving add blog to index page', async () => {
      await page.click('button.green');
      await page.waitFor('.card');

      const title = await page.getContentsOf('.card-title');
      const content = await page.getContentsOf('p');

      expect(title).toEqual('My Title');
      expect(content).toEqual('My Content');
    });
  });
});

describe('When User is NOT logged in', () => {
  const actions = [
    {
      method: 'GET',
      path: '/api/blogs'
    },
    {
      method: 'POST',
      path: '/api/blogs',
      data: {
        title: 'T',
        content: 'C'
      }
    }
  ];

  test('User cannot create blog posts', async () => {
    const result = await page.post('/api/blogs', { title: 'T', content: 'C' });
    // expect(result.error).toEqual('You must log in!');
    expect(result).toEqual({ error: 'You must log in!' });
  });

  test('User cannot retrieve posts listing', async () => {
    const result = await page.get('/api/blogs');
    expect(result).toEqual({ error: 'You must log in!' });
  });
});

import { test, expect } from './fixtures/basic.fixture';

test.describe('Smoke', () => {
  test('home page loads and has expected title', async ({ page, homePage }) => {
    await homePage.goto();
    await expect(page).toHaveTitle(/simplex/i);
  });
});

import { expect, test } from '@playwright/test';

// Runs against the static server in e2e/serve-dist.mjs (the `prerender`
// project in playwright.config.ts). Asserts on the *raw* HTML so a client-side
// re-render cannot mask a broken prerender — this is the state crawlers and
// no-JS visitors see.

test('prerendered / contains the default state: Polish content and placeholder phone', async ({ request }) => {
  const response = await request.get('/');

  expect(response.status()).toBe(200);

  const html = await response.text();
  expect(html).toContain('Doświadczenie zawodowe');
  expect(html).toContain('Najciekawsze projekty');
  expect(html).toContain('000 000 000');
});

test('prerendered /certificates exists as its own static page', async ({ request }) => {
  const response = await request.get('/certificates');

  expect(response.status()).toBe(200);

  const html = await response.text();
  expect(html).toContain('<app-certificates');
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('the prerendered page still renders', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Doświadczenie zawodowe' })).toBeVisible();
  });
});

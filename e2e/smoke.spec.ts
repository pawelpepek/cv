import { expect, test } from '@playwright/test';

// Smoke coverage for the query-param driven features (?lang, ?highlight,
// ?exclude) and both routes — the paths most at risk during Angular upgrades.

test('renders the Polish CV with the placeholder phone by default', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Doświadczenie zawodowe' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Najciekawsze projekty' })).toBeVisible();
  await expect(page.getByText('000 000 000').first()).toBeVisible();
});

test('?lang=en switches the content to English', async ({ page }) => {
  await page.goto('/?lang=en');

  await expect(page.getByRole('heading', { name: 'Work experience' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Most interesting projects' })).toBeVisible();
});

test('?highlight bolds matched terms, honoring ?exclude', async ({ page }) => {
  await page.goto('/?highlight=angular,.net&exclude=ASP.NET');

  const bolded = page.locator('span.font-black');
  await expect(bolded.first()).toBeVisible();

  const texts = await bolded.allTextContents();
  expect(texts.some(t => /angular/i.test(t))).toBe(true);
  expect(texts.some(t => /asp\.net/i.test(t))).toBe(false);
});

test('the certificates route renders', async ({ page }) => {
  await page.goto('/certificates');

  await expect(page.locator('app-certificates')).toBeVisible();
});

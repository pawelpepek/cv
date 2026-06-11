import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

// Axe accessibility audit of every route/language variant, limited to WCAG
// 2.x A/AA rules (best-practice rules are too opinionated to gate CI on).

const pages = [
  { name: 'CV (Polish)', url: '/' },
  { name: 'CV (English)', url: '/?lang=en' },
  { name: 'certificates', url: '/certificates' },
];

for (const { name, url } of pages) {
  test(`the ${name} page has no WCAG A/AA violations`, async ({ page }) => {
    await page.goto(url);

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      // The "Preview" watermark is decorative and intentionally low-contrast
      // (aria-hidden, opacity-20) — axe would flag color-contrast on it anyway.
      .exclude('[data-testid="preview-watermark"]')
      .analyze();

    expect(results.violations).toEqual([]);
  });
}

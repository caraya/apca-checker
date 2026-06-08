import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const wcagTags = [
  'wcag2a',
  'wcag2aa',
  'wcag21a',
  'wcag21aa',
  'wcag22aa',
];

const formatViolations = (violations) =>
  violations.map((v) => ({
    id: v.id,
    impact: v.impact,
    help: v.help,
    nodes: v.nodes.length,
  }));

const runAxe = async (page, options = {}) => {
  const { include } = options;
  const builder = new AxeBuilder({ page }).withTags(wcagTags);

  if (include) {
    builder.include(include);
  }

  return builder.analyze();
};

test.describe('Accessibility (axe)', () => {
  test('page-level scan has no WCAG A/AA violations', async ({ page }, testInfo) => {
    await page.goto('/');

    const results = await runAxe(page);
    await testInfo.attach('axe-page-results', {
      body: JSON.stringify(formatViolations(results.violations), null, 2),
      contentType: 'application/json',
    });

    expect(results.violations).toEqual([]);
  });

  test('color controls region has no WCAG A/AA violations', async ({ page }, testInfo) => {
    await page.goto('/');

    const results = await runAxe(page, { include: '[aria-labelledby="color-controls-heading"]' });
    await testInfo.attach('axe-color-controls-results', {
      body: JSON.stringify(formatViolations(results.violations), null, 2),
      contentType: 'application/json',
    });

    expect(results.violations).toEqual([]);
  });

  test('compliance results region has no WCAG A/AA violations', async ({ page }, testInfo) => {
    await page.goto('/');

    const results = await runAxe(page, { include: '[aria-labelledby="compliance-heading"]' });
    await testInfo.attach('axe-compliance-results', {
      body: JSON.stringify(formatViolations(results.violations), null, 2),
      contentType: 'application/json',
    });

    expect(results.violations).toEqual([]);
  });

  test('expanded guidance disclosures have no WCAG A/AA violations', async ({ page }, testInfo) => {
    await page.goto('/');

    await page.getByText("What's Covered by the Bronze Level?").click();
    await page.getByText("What's Covered by the Silver Level?").click();
    await page.getByText("What's Covered by the Gold Level?").click();

    const results = await runAxe(page, { include: 'details[open]' });
    await testInfo.attach('axe-open-details-results', {
      body: JSON.stringify(formatViolations(results.violations), null, 2),
      contentType: 'application/json',
    });

    expect(results.violations).toEqual([]);
  });
});

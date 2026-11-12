import { test, expect } from '@playwright/test';

/**
 * `src/styles/cynosure.css` imports Cynosure's stylesheets one component at a time. A component
 * whose stylesheet is missing still renders, just unstyled, so nothing else would catch it.
 * This checks that every Cynosure root class on a page has a rule in the loaded stylesheets.
 */
const routes = ['/', '/features', '/download', '/privacy', '/terms', '/404'];

async function unstyled(page: import('@playwright/test').Page) {
  return page.evaluate(() => {
    const rules: string[] = [];
    const walk = (list: CSSRuleList) => {
      for (const rule of list) {
        if ('selectorText' in rule) rules.push((rule as CSSStyleRule).selectorText);
        if ('cssRules' in rule) walk((rule as CSSGroupingRule).cssRules);
      }
    };
    for (const sheet of document.styleSheets) walk(sheet.cssRules);
    const css = rules.join('\n');
    const used = new Set<string>();
    document.querySelectorAll('[class*="cy-"]').forEach((el) => {
      // Root classes only: parts (`cy-button-label`) are covered by their root's file.
      const root = [...el.classList].find((c) => c.startsWith('cy-'));
      if (root) used.add(root);
    });
    return [...used].filter((c) => !css.includes(`.${c}`));
  });
}

for (const path of routes) {
  test(`${path} has styles for every Cynosure component on it`, async ({ page }) => {
    await page.goto(path, { waitUntil: 'networkidle' });
    expect(await unstyled(page)).toEqual([]);
  });
}

test('the mobile menu sheet is styled', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 });
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: /open menu/i }).click();
  await expect(page.getByRole('dialog', { name: /menu/i })).toBeVisible();
  expect(await unstyled(page)).toEqual([]);
});

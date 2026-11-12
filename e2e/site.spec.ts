import { test, expect } from '@playwright/test';

const routes = ['/', '/features', '/download', '/privacy', '/terms'];

for (const path of routes) {
  test(`${path} renders with an h1`, async ({ page }) => {
    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toBeVisible();
  });
}

test('theme toggle flips and persists', async ({ page }) => {
  await page.goto('/');
  const html = page.locator('html');
  // Cynosure's ThemeToggle steps system → light → dark; the mode lives on <html data-cy-mode>.
  await expect(html).toHaveAttribute('data-cy-mode', 'system');
  await page.getByRole('button', { name: /colour mode/i }).click();
  await expect(html).toHaveAttribute('data-cy-mode', 'light');
  await page.getByRole('button', { name: /colour mode/i }).click();
  await expect(html).toHaveAttribute('data-cy-mode', 'dark');
  await page.reload();
  await expect(html).toHaveAttribute('data-cy-mode', 'dark');
});

test('mobile menu opens the navigation in a sheet', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 });
  await page.goto('/');
  await page.getByRole('button', { name: /open menu/i }).click();
  const dialog = page.getByRole('dialog', { name: /menu/i });
  await expect(dialog.getByRole('link', { name: 'Features' })).toBeVisible();
});

test('download page shows the real QR code', async ({ page }) => {
  await page.goto('/download');
  const qr = page.getByRole('img', { name: /qr code linking to the nimaz app on google play/i });
  await expect(qr).toBeVisible();
  await expect(qr.locator('svg')).toBeVisible();
});

test('download CTA points at the real Play Store listing', async ({ page }) => {
  await page.goto('/');
  const cta = page.getByRole('link', { name: /get it on google play/i }).first();
  await expect(cta).toHaveAttribute(
    'href',
    'https://play.google.com/store/apps/details?id=com.arshadshah.nimaz',
  );
  await expect(cta).toHaveAttribute('rel', /noopener/);
});

test('home page has an FAQ with FAQPage structured data', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /frequently asked questions/i })).toBeVisible();
  const faq = page.getByRole('button', { name: /is nimaz free/i });
  await expect(faq).toHaveAttribute('aria-expanded', 'false');
  // The accordion is an island: retry until it has hydrated and the press takes effect.
  await expect(async () => {
    await faq.click();
    await expect(faq).toHaveAttribute('aria-expanded', 'true', { timeout: 500 });
  }).toPass();
  // <script> text isn't "rendered", so locate all JSON-LD blocks and parse them.
  const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
  const faqLd = blocks.map((b) => JSON.parse(b)).find((o) => o['@type'] === 'FAQPage');
  expect(faqLd?.mainEntity.length).toBeGreaterThan(0);
});

test('prayer widget lists six prayers', async ({ page }) => {
  await page.goto('/');
  const list = page.getByRole('list', { name: /prayer times/i });
  await expect(list.getByText('Fajr')).toBeVisible();
  await expect(list.getByText('Isha')).toBeVisible();
});

test('terms tabs switch panels', async ({ page }) => {
  await page.goto('/terms');
  await page.getByRole('tab', { name: /license agreement/i }).click();
  await expect(page.getByRole('tabpanel', { name: /license agreement/i })).toBeVisible();
});

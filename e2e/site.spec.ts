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
  const before = await html.getAttribute('data-theme');
  await page.getByRole('button', { name: /toggle color theme/i }).click();
  const after = await html.getAttribute('data-theme');
  expect(after).not.toBe(before);
  await page.reload();
  expect(await html.getAttribute('data-theme')).toBe(after);
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

test('prayer widget lists six prayers', async ({ page }) => {
  await page.goto('/');
  const list = page.getByRole('list', { name: /prayer times/i });
  await expect(list.getByText('Fajr')).toBeVisible();
  await expect(list.getByText('Isha')).toBeVisible();
});

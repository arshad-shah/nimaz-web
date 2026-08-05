/**
 * Regenerate the downloadable legal PDFs from the pages that render them.
 *
 * `public/legal/*.pdf` are linked from /privacy and /terms as the "complete" documents, so a
 * stale PDF is worse than no PDF — it is a second, contradictory source of truth that a reader
 * is invited to download. Before this script they were produced somewhere off to the side and
 * drifted for two years. Now they are printed from the same `src/data/{privacy,terms}.ts` that
 * feeds the pages, which makes drift impossible rather than merely unlikely.
 *
 * Run it whenever `privacy.ts` or `terms.ts` changes, and commit the result — the same manual
 * pattern as `gen:assets`:
 *
 *   pnpm build && pnpm preview --port 4321 &
 *   pnpm gen:legal
 *
 * Print styling lives in the `@media print` block in `src/styles/global.css`; the page content
 * sits inside <details> accordions, which are forced open here so nothing is omitted.
 */
import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const BASE = process.env.BASE_URL ?? 'http://localhost:4321';
const DOCS = [
  { path: '/privacy', out: 'public/legal/Privacy-Policy.pdf' },
  { path: '/terms', out: 'public/legal/Terms-and-Conditions.pdf' },
];

await mkdir('public/legal', { recursive: true });

// PLAYWRIGHT_CHROMIUM_PATH lets a sandbox point at a preinstalled browser.
const browser = await chromium.launch(
  process.env.PLAYWRIGHT_CHROMIUM_PATH
    ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH }
    : {},
);

try {
  const page = await browser.newPage();
  for (const { path, out } of DOCS) {
    const res = await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle' });
    if (!res || !res.ok()) {
      throw new Error(`${path} returned ${res?.status() ?? 'no response'} — is the preview up?`);
    }
    // Force the light theme and expand every accordion, or the PDF prints headings alone.
    await page.emulateMedia({ media: 'print', colorScheme: 'light' });
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'light');
      document.querySelectorAll('details').forEach((d) => d.setAttribute('open', ''));
    });
    await page.pdf({
      path: out,
      format: 'A4',
      printBackground: true,
      margin: { top: '18mm', bottom: '18mm', left: '16mm', right: '16mm' },
    });
    console.log(`wrote ${out}`);
  }
} finally {
  await browser.close();
}

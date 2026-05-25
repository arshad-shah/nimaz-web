# Nimaz Web — Site Redesign Design Spec

**Date:** 2026-05-25
**Repo:** `nimaz-web` (new, standalone)
**Status:** Approved visual direction; pending spec review.

## 1. Goal

Rebuild the Nimaz marketing/companion website from scratch with a new design and
information architecture, reusing the existing site's content verbatim but adopting
the **Nimaz mobile app's design language**. The result must be production-ready:
fast, accessible, tested, zero known vulnerabilities, modular, and easy to maintain.

Source material:

- **Content / data:** `arshad-shah/nimaz_site` (copy, legal text, app metadata, links).
- **Design language:** `arshad-shah/Nimaz` app (colors, typography, shapes, logo).
- **Live app listing:** Google Play, package `com.arshadshah.nimaz`.

Non-goals: no backend, no CMS, no user accounts, no analytics beyond a privacy-friendly
optional pageview counter (off by default — see §10). No unrelated refactors of the
source repos.

## 2. Constraints (hard requirements from the user)

- Latest, appropriate tech for a content site with one interactive element.
- New repository, ready to publish.
- Automated tests; **zero** known dependency vulnerabilities.
- High-quality, distinctive UI/UX.
- **No gradients. No emoji. No ASCII art.** Any decorative art must be SVG.
- Use icons for affordances.
- Modular, maintainable structure.
- Use the **real Nimaz app icon** for branding.
- QR code must encode the **real** Play Store URL and actually scan.

## 3. Chosen direction (validated in brainstorming)

- **Visual direction:** "App-like" (Direction B) — product-forward, matches the app's
  OLED dark theme, gold accents, color-coded prayer rows. Ships with a **light theme**
  (default) and **dark theme**, plus a user toggle.
- **Branding:** the app's actual launcher icon. A gradient-free site logomark places the
  gold foreground figure on a solid teal (`#14B8A6`) rounded tile for web chrome/favicons.

## 4. Tech stack

| Concern             | Choice                                                       | Why                                                                                                  |
| ------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| Framework           | **Astro 5** (static output)                                  | Content-first; ships ~0 JS by default; islands for the one interactive widget; great Lighthouse/SEO. |
| Interactive islands | **React 19** (`@astrojs/react`)                              | Live prayer widget + theme toggle only.                                                              |
| Styling             | **Tailwind CSS 4** (`@tailwindcss/vite`)                     | Utility-first; design tokens map cleanly to the app palette.                                         |
| Icons               | **`astro-icon`** + Lucide set (inline SVG at build)          | Crisp, tree-shaken, no icon-font/emoji.                                                              |
| Prayer maths        | **`adhan`**                                                  | Same library the current site and app concepts use.                                                  |
| QR generation       | **`qrcode`** (build-time, SVG output)                        | Real, scannable code from the canonical URL.                                                         |
| Long-form legal     | **Astro Content Collections (MDX)**                          | Privacy/Terms authored as content, type-checked.                                                     |
| Data validation     | **Zod** (via content collection schemas + data tests)        | Guarantees content integrity.                                                                        |
| Fonts               | **Fontsource** self-hosted: Outfit, Plus Jakarta Sans, Amiri | Matches app type; privacy (no Google CDN); perf.                                                     |
| Package manager     | **pnpm**                                                     | Matches current project; fast, strict.                                                               |
| Hosting             | **Cloudflare Pages**                                         | Static `dist/`; free; global edge; per the user's choice.                                            |

### Testing & quality tooling

| Layer                             | Tool                                                 |
| --------------------------------- | ---------------------------------------------------- |
| Unit (logic, data, QR URL, theme) | **Vitest**                                           |
| Component (React islands)         | **Vitest + @testing-library/react**                  |
| E2E (routes, nav, toggle, widget) | **Playwright**                                       |
| Accessibility                     | **@axe-core/playwright** per route                   |
| Lint / format / types             | **ESLint (flat) + Prettier + `astro check` (tsc)**   |
| Vulnerabilities                   | **`pnpm audit --audit-level=low`** gate + Dependabot |

## 5. Information architecture (multi-page)

Static routes (each its own page, server-rendered to HTML at build):

| Route       | Purpose              | Key content                                                                                                                 |
| ----------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `/`         | Landing              | Hero + **live prayer widget**, feature highlights (3–6), trust stats, download CTA, developer message, footer.              |
| `/features` | Full feature catalog | All 6 features expanded (verbatim copy), stats strip, app screenshots.                                                      |
| `/download` | Conversion           | Install steps (1-2-3), **real QR code**, store badge, app metadata (rating, size, OS, developer), "free / no ads / no IAP". |
| `/privacy`  | Privacy Policy       | Privacy-at-a-glance, 7 expandable sections, FAQ accordion, PDF download.                                                    |
| `/terms`    | Terms & Conditions   | 4 tabbed sections, permitted/prohibited cards, effective date, PDF download, contact CTA.                                   |
| `/404`      | Not found            | On-brand SVG illustration + links home.                                                                                     |

**Global nav:** Home · Features · Download · Privacy · Terms · theme toggle · Download CTA.
**Footer:** brand + tagline, nav links, feature list, contact (email/website), GitHub link,
copyright, "Made by Arshad Shah". The developer's full message lives on `/` and/or footer.

## 6. Component architecture (modular)

```
src/
  components/
    layout/      Header.astro, Footer.astro, NavLink.astro, Container.astro, Seo.astro
    ui/          Button.astro, Card.astro, Badge.astro, Pill.astro, SectionHeading.astro,
                 Accordion.astro, Tabs.astro, Icon.astro, PhoneFrame.astro
    islands/     PrayerWidget.tsx, ThemeToggle.tsx           (React, client-hydrated)
    sections/    Hero.astro, FeatureGrid.astro, StatsStrip.astro, DownloadSteps.astro,
                 DeveloperMessage.astro, QrCard.astro, PrivacyGlance.astro
  content/
    legal/       privacy.mdx, terms.mdx                      (collection)
    config.ts    collection schemas (Zod)
  data/
    site.ts      canonical links, store URL, package id, contact, social
    features.ts  feature[]  (icon, title, body)
    stats.ts     stat[]
    privacy.ts   sections[], faq[], glance[]
    terms.ts     tabs[], permitted[], prohibited[]
  layouts/       Base.astro (html shell, SEO, theme bootstrap, fonts)
  pages/         index.astro, features.astro, download.astro, privacy.astro,
                 terms.astro, 404.astro
  styles/        tokens.css (CSS vars), global.css
  lib/           qr.ts (build-time QR), prayer.ts (adhan wrapper), theme.ts
  assets/        nimaz-icon.png (real app icon source), screenshots, generated favicons
```

Principles: each component has one purpose and a typed prop interface; all copy/links
come from `src/data/*` or content collections (no hardcoded strings in components);
sections compose `ui` primitives. A single `site.ts` is the source of truth for the
Play Store URL and contact info so the QR, buttons, and JSON-LD never drift.

## 7. Design system / tokens

Derived from the app's `Color.kt`, `Type.kt`, `Shape.kt`.

**Color (CSS variables, themed light/dark):**

- Primary (teal): `#14B8A6`; dark `#0F766E`; light tints `#F0FDFA`/`#CCFBF1`.
- Secondary (gold): `#EAB308` / `#FACC15`.
- Tertiary (purple): `#7C4DFF`.
- Prayer accents: Fajr `#6366F1`, Sunrise `#F59E0B`, Dhuhr `#EAB308`, Asr `#F97316`,
  Maghrib `#EF4444`, Isha `#8B5CF6` (used as solid left-accent stripes — no gradients).
- Neutrals (warm stone scale): `#FAFAFA … #0C0A09`.
- Light theme: bg `#FAFAFA`, surface `#FFFFFF`, text `#1C1917`, muted `#57534E`, outline `#E7E5E4`.
- Dark theme: bg `#0C0A09`, surface `#1C1917`, variant `#292524`, text `#E0E0E0`, outline `#292524`.

**Type:** Outfit (display/headings, 600–800), Plus Jakarta Sans (body/labels),
Amiri (Arabic). Scale mirrors the app's Material type scale, mapped to rem.

**Shape/space:** radius 8 / 12 / 16 / 20 / full; spacing 4/8/12/16/24/32/48;
elevation as subtle solid-color shadows (no gradient overlays).

**Theming mechanism:** `data-theme="light|dark"` on `<html>`. An inline,
render-blocking script in `Base.astro` reads `localStorage.theme` (falling back to
`prefers-color-scheme`) before paint to prevent flash. `ThemeToggle.tsx` updates the
attribute and persists choice. All colors via CSS variables so both themes share markup.

## 8. Interactive island: PrayerWidget

- **Input:** browser Geolocation (on explicit user action — a "Use my location" button,
  never auto-prompt). Fallback: a small searchable city list + the current site's default
  (Dubai `25.276987, 55.296249`) so the widget always renders meaningful data, even SSR/no-JS.
- **Compute:** `adhan` `PrayerTimes` + `CalculationMethod` (default Moonsighting Committee,
  matching the current site). Derives the 6 daily times and the next-prayer countdown.
- **Render:** color-coded rows (prayer accent stripe), highlighted "next" row, live
  countdown (updates each second; respects `prefers-reduced-motion` by reducing to per-minute).
- **Progressive enhancement:** the `.astro` page renders a static default-location card;
  the React island hydrates (`client:visible`) and upgrades it. No layout shift.
- **Privacy:** location is used in-memory only, never stored or sent anywhere. Copy says so.

## 9. QR code (real & scannable)

- Single source: `site.ts` → `PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.arshadshah.nimaz"`.
- `lib/qr.ts` calls `qrcode.toString(url, { type: 'svg', errorCorrectionLevel: 'M', margin: 1 })`
  at build time; the SVG is inlined into `QrCard`. Themed via `currentColor`.
- **Test:** a Vitest test decodes the generated matrix (using `qrcode`'s round-trip or a
  decoder) and asserts the payload equals `PLAY_STORE_URL`, guaranteeing it scans to the
  correct listing. CI fails if the URL and rendered QR ever diverge.

## 10. SEO, accessibility, performance

- **SEO:** per-page `<title>`/description, canonical URLs, OpenGraph + Twitter cards with a
  generated OG image, `@astrojs/sitemap`, `robots.txt`, JSON-LD `SoftwareApplication`
  (name, rating 4.8, price 0, OS Android 10+, install URL).
- **A11y:** semantic landmarks, skip-link, visible focus rings, keyboard-operable
  Accordion/Tabs (ARIA patterns), AA contrast verified, `prefers-reduced-motion` honored,
  alt text on all imagery. axe checks gate CI.
- **Perf:** static HTML, self-hosted subset fonts (`font-display: swap`, preload),
  `astro:assets` for responsive/optimized images, islands only where needed. Target
  Lighthouse ≥ 95 across the board.
- **Analytics:** none by default (the app's whole pitch is privacy). Leave a documented,
  commented-out slot for Cloudflare Web Analytics (cookieless) if the owner opts in.

## 11. Branding & assets pipeline

- Vendor the real icon: `src/assets/nimaz-icon.png` (512² from `ic_launcher-playstore.png`).
- Generate at build (script + `sharp`): `favicon.ico`, `favicon-32/16`, `apple-touch-icon`
  (180²), `icon-192/512` (maskable) for the web manifest, and a 1200×630 OG image
  (logomark + wordmark on solid surface — no gradient).
- `site.webmanifest` for installable PWA-lite (name, theme color `#14B8A6`, icons).
- Site logomark component renders the gold foreground figure on a solid teal tile.

## 12. Testing strategy

- **Unit:** `prayer.ts` (correct times for a known lat/long/date/method), `qr.ts`
  (payload round-trips to `PLAY_STORE_URL`), `theme.ts` (resolution order), data schema
  validation (every `data/*` entry parses against its Zod schema; no dead links shape).
- **Component:** `PrayerWidget` (renders fallback location, computes/sorts rows, marks next
  prayer, countdown formats) and `ThemeToggle` (toggles attribute, persists, reflects stored).
- **E2E (Playwright):** each route returns 200 and renders its H1; nav works; theme toggle
  flips and survives reload; QR `<svg>` present on `/download`; external links have correct
  href + `rel="noopener"`; no-JS smoke (widget still shows default card).
- **A11y E2E:** `@axe-core/playwright` on `/`, `/features`, `/download`, `/privacy`, `/terms`
  — zero serious/critical violations.
- **Pipeline gate:** `pnpm lint && pnpm check && pnpm test && pnpm build && pnpm test:e2e && pnpm audit --audit-level=low`.

## 13. CI/CD & supply chain

- **GitHub Actions** `ci.yml` (PR + main): install (frozen lockfile) → lint → typecheck →
  unit/component tests → build → Playwright e2e (+axe) → `pnpm audit`.
- **`deploy.yml`** (main, after CI): `wrangler pages deploy ./dist --project-name nimaz-web`
  via `cloudflare/wrangler-action` using `CLOUDFLARE_API_TOKEN` + account id secrets.
  (Alternative documented in README: connect the repo in the Cloudflare Pages dashboard
  with build `pnpm build`, output `dist`.)
- **Zero-vuln posture:** minimal dependency surface; `pnpm audit` blocks low+; Dependabot
  (or Renovate) weekly; pinned versions via committed `pnpm-lock.yaml`; `.nvmrc`/engines.
- **Repo hygiene:** README (setup, scripts, deploy, content-editing guide), LICENSE,
  `.gitignore` (incl. `.superpowers/`, `dist`, `node_modules`, `test-results`), CODEOWNERS,
  PR template, `.editorconfig`.

## 14. Content reuse

All marketing copy, the 6 feature descriptions, 7 privacy sections + 7 FAQs, 4 terms
sections + permitted/prohibited lists, the developer's message, app metadata (rating 4.8,
47MB, Android 10+, developer Arshad Shah), and links (Play Store, `info@arshadshah.com`,
`arshadshah.com`, GitHub) are carried over verbatim into typed `data/*` files and MDX.
The two legal PDFs are vendored into `public/` and linked from their pages.

## 15. Risks / open items

- **No vector logo** exists in the app (raster only). We use the 512² PNG and derive web
  assets from it; acceptable for chrome and favicons. A future hand-built SVG mark is
  optional and out of scope.
- **Social links** in the old footer were placeholders (twitter/instagram). We include only
  verified links (GitHub, website, email) and omit unknown placeholders.
- **Cloudflare deploy** needs the owner to create the Pages project + add API token secrets;
  documented in README. Until then, `pnpm build` produces a deployable `dist/`.

## 16. Success criteria

- All routes build to static HTML; `pnpm build` clean.
- Lighthouse ≥ 95 (perf/a11y/best-practices/SEO) on `/`.
- All test layers green; axe shows no serious/critical issues.
- `pnpm audit` reports 0 vulnerabilities at low+.
- Light/dark both correct, no FOUC; QR scans to the real Play Store listing.
- No gradients, no emoji, no ASCII art anywhere; all decorative art is SVG.

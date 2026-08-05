# Nimaz Web

The companion website for the [Nimaz](https://play.google.com/store/apps/details?id=com.arshadshah.nimaz) Android app — accurate prayer times, Qibla, Quran and Hadith.

Built with Astro + React islands + Tailwind CSS. Static output, light/dark themes, fully tested, zero known vulnerabilities.

## Develop

```bash
pnpm install
pnpm dev          # http://localhost:4321
```

## Scripts

| Command                     | Purpose                                                                                                                                                                            |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm dev`                  | Dev server                                                                                                                                                                         |
| `pnpm build`                | Static build to `dist/`                                                                                                                                                            |
| `pnpm preview`              | Preview the production build                                                                                                                                                       |
| `pnpm lint` / `pnpm format` | ESLint + Prettier                                                                                                                                                                  |
| `pnpm check`                | Astro/TypeScript type-check                                                                                                                                                        |
| `pnpm test`                 | Vitest unit + component tests                                                                                                                                                      |
| `pnpm test:e2e`             | Playwright + axe end-to-end tests                                                                                                                                                  |
| `pnpm gen:assets`           | Regenerate favicons / OG image from `src/assets/nimaz-icon.png` (run manually after changing the icon; outputs are committed under `public/`)                                      |
| `pnpm gen:legal`            | Reprint `public/legal/*.pdf` from the live `/privacy` and `/terms` pages (run manually after editing `privacy.ts` or `terms.ts`; needs a preview server up, outputs are committed) |

## Editing content

All copy and data live in `src/data/*` (`site.ts`, `features.ts`, `stats.ts`, `faq.ts`, `privacy.ts`, `terms.ts`). No copy is hardcoded in components. The Play Store URL is defined once in `src/data/site.ts` and drives the buttons, JSON-LD, and the build-time QR code.

Two rules keep the copy honest, both enforced by `src/data/__tests__/content.test.ts`:

- **Numbers must match the app.** Counts quoted in `stats.ts` and in feature copy describe the real Nimaz app; each is sourced from a named enum or screen in `arshad-shah/Nimaz` and the test asserts the two surfaces agree. `docs/audits/2026-08-05-app-site-parity-audit.md` §8 lists the source file for every number.
- **The legal pages must describe what the app does.** The test fails if the policy stops disclosing a third party the app reaches, or starts promising a control (such as an analytics opt-out) that the app does not have. After editing `privacy.ts` or `terms.ts`, run `pnpm gen:legal` so the downloadable PDFs match.

## Deploy (Cloudflare Pages)

Connect this repository in the Cloudflare Pages dashboard:

- **Build command:** `pnpm build`
- **Output directory:** `dist`
- **Node version:** as pinned in `.nvmrc`

Pushes to `main` then build and deploy automatically via Cloudflare's Git integration.

## License

MIT © Arshad Shah

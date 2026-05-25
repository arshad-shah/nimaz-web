# Nimaz Web

The companion website for the [Nimaz](https://play.google.com/store/apps/details?id=com.arshadshah.nimaz) Android app — accurate prayer times, Qibla, Quran and Hadith.

Built with Astro + React islands + Tailwind CSS. Static output, light/dark themes, fully tested, zero known vulnerabilities.

## Develop

```bash
pnpm install
pnpm dev          # http://localhost:4321
```

## Scripts

| Command                     | Purpose                                                                                                                                       |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm dev`                  | Dev server                                                                                                                                    |
| `pnpm build`                | Static build to `dist/`                                                                                                                       |
| `pnpm preview`              | Preview the production build                                                                                                                  |
| `pnpm lint` / `pnpm format` | ESLint + Prettier                                                                                                                             |
| `pnpm check`                | Astro/TypeScript type-check                                                                                                                   |
| `pnpm test`                 | Vitest unit + component tests                                                                                                                 |
| `pnpm test:e2e`             | Playwright + axe end-to-end tests                                                                                                             |
| `pnpm gen:assets`           | Regenerate favicons / OG image from `src/assets/nimaz-icon.png` (run manually after changing the icon; outputs are committed under `public/`) |

## Editing content

All copy and data live in `src/data/*` (`site.ts`, `features.ts`, `stats.ts`, `privacy.ts`, `terms.ts`). No copy is hardcoded in components. The Play Store URL is defined once in `src/data/site.ts` and drives the buttons, JSON-LD, and the build-time QR code.

## Deploy (Cloudflare Pages)

Connect this repository in the Cloudflare Pages dashboard:

- **Build command:** `pnpm build`
- **Output directory:** `dist`
- **Node version:** as pinned in `.nvmrc`

Pushes to `main` then build and deploy automatically via Cloudflare's Git integration.

## License

MIT © Arshad Shah

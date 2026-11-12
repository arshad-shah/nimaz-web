// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { cynosure } from '@arshad-shah/cynosure/astro';
import { theme, MODE_KEY } from './src/theme.ts';

export default defineConfig({
  site: 'https://nimaz.pages.dev',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'directory' },
  integrations: [
    react(),
    // Themes every page on the server: the Nimaz theme as CSS, the stylesheets of the Cynosure
    // components each page uses, and the script that applies a saved colour mode before paint.
    cynosure({ theme, styles: 'imports', initScript: { key: MODE_KEY } }),
    sitemap(),
  ],
});

// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { cynosure } from '@arshad-shah/cynosure/vite';
import { theme } from './src/theme.ts';

export default defineConfig({
  site: 'https://nimaz.pages.dev',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'directory' },
  integrations: [react(), sitemap()],
  // `virtual:cynosure/theme.css` is the Nimaz theme compiled to CSS at build time.
  vite: { plugins: [cynosure({ theme })] },
});

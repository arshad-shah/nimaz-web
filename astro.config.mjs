// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://nimaz.pages.dev',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'directory' },
  integrations: [react(), icon({ iconDir: 'src/icons' })],
  vite: { plugins: [tailwindcss()] },
});

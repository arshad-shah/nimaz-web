// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://nimaz.pages.dev',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'directory' },
});

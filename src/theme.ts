import type { ThemeInput } from '@arshad-shah/cynosure/tokens';

/**
 * The Nimaz theme: the only place the site's look is decided. Everything else is Cynosure
 * components reading these tokens. Compiled to CSS at build time by the Cynosure Vite adapter
 * (see `astro.config.mjs`) and imported once in `layouts/Base.astro`.
 */
export const theme: ThemeInput = {
  // The darker brand teal: white text on it passes WCAG AA, which the app's #14b8a6 does not.
  accent: '#0f766e',
  // Cynosure's base scale is tuned for dense app UI (13px body); a marketing site reads larger.
  scale: 1.25,
  font: {
    sans: '"Plus Jakarta Sans Variable", system-ui, sans-serif',
    display: '"Outfit Variable", system-ui, sans-serif',
  },
  palettes: {
    light: {
      bg: '#fafafa',
      surface: '#ffffff',
      surfaceRaised: '#ffffff',
      soft: '#f5f5f4',
      ink: '#1c1917',
      muted: '#57534e',
      line: '#e7e5e4',
    },
    dark: {
      bg: '#0c0a09',
      surface: '#1c1917',
      surfaceRaised: '#292524',
      soft: '#292524',
      ink: '#e7e5e4',
      muted: '#a8a29e',
      line: '#3a3532',
    },
  },
  components: {
    // 72rem page column, matching the width the site has always used.
    container: { sizeLg: '72rem' },
    // Page and section titles at marketing size; card headings keep the smaller steps.
    heading: { sizeXl: '1.75rem', 'size-2xl': '2.25rem' },
  },
};

/** Brand colours that are not the accent; used only as category colours on Cynosure props. */
export const brand = {
  teal: '#14b8a6',
  gold: '#eab308',
  purple: '#7c4dff',
} as const;

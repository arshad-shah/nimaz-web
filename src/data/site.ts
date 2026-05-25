export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.arshadshah.nimaz';

export const site = {
  name: 'Nimaz',
  tagline: 'Prayer times, at your fingertips.',
  description:
    'Nimaz helps you stay connected with your spiritual practices through accurate prayer times, Qibla direction, Quran and Hadith.',
  url: 'https://nimaz.pages.dev',
  playStoreUrl: PLAY_STORE_URL,
  packageId: 'com.arshadshah.nimaz',
  email: 'info@arshadshah.com',
  website: 'https://arshadshah.com',
  github: 'https://github.com/arshad-shah',
  developer: 'Arshad Shah',
  app: { rating: 4.8, size: '47MB', minOs: 'Android 10.0+', category: 'Lifestyle & Religion' },
  nav: [
    { label: 'Features', href: '/features' },
    { label: 'Download', href: '/download' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
} as const;

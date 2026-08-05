export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.arshadshah.nimaz';

export const site = {
  name: 'Nimaz',
  tagline: 'Prayer times, at your fingertips.',
  description:
    'Nimaz is a free, offline-first Islamic companion for Android: accurate prayer times and adhan, Qibla with AR, the Quran with tafsir, six hadith collections, duas, tasbih, prayer and fasting trackers, khatam plans, zakat and the Hijri calendar.',
  url: 'https://nimaz.pages.dev',
  playStoreUrl: PLAY_STORE_URL,
  packageId: 'com.arshadshah.nimaz',
  email: 'info@arshadshah.com',
  website: 'https://arshadshah.com',
  github: 'https://github.com/arshad-shah',
  developer: 'Arshad Shah',
  // `minOs` matches the app's minSdk 29. `rating` and `size` cannot be derived from the app
  // repository and must be re-checked against the live Play listing when it is updated —
  // `size` especially, since ~31 MB of bundled content assets were removed at versionCode 385.
  app: { rating: 4.8, size: '47MB', minOs: 'Android 10.0+', category: 'Lifestyle & Religion' },
  nav: [
    { label: 'Features', href: '/features' },
    { label: 'Download', href: '/download' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
} as const;

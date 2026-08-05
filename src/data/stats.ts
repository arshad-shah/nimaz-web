export interface Stat {
  value: string;
  label: string;
}

/**
 * Four numbers a reader could check for themselves.
 *
 * These replaced "99.9% Prayer Time Accuracy" and "±0.5° Qibla Precision", which nothing in
 * the app produced or could substantiate, and corrected two counts that were simply wrong
 * (18 calculation methods, 9 hadith collections — the app has 11 and 6). Each value below
 * comes from one source of truth in the Nimaz app, and `__tests__/content.test.ts` pins it:
 *
 * - collections  → the book ids in `HadithCollectionScreen.kt`
 * - translations → the `QuranTranslation` enum
 * - reciters     → the `QuranReciter` enum
 * - methods      → the `CalculationMethod` enum
 *
 * When the app gains one, change it here and in `features.ts` together — the test asserts
 * the two surfaces agree.
 */
export const stats: Stat[] = [
  { value: '6', label: 'Hadith Collections' },
  { value: '15', label: 'Quran Translations' },
  { value: '13', label: 'Reciters' },
  { value: '11', label: 'Calculation Methods' },
];

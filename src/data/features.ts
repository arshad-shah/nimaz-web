/**
 * The feature catalogue behind `/features`, the home-page grid and the footer.
 *
 * Every claim here is checkable against the Nimaz app source — the counts in particular
 * (11 calculation methods, 6 hadith collections, 15 translations, 13 reciters, 2 tafsir
 * sources, 6 widgets, 6 interface languages, 3 Arabic fonts). `stats.ts` carries the same
 * numbers and `__tests__/content.test.ts` pins them, so a number cannot drift on one surface
 * without failing on the other. `docs/audits/2026-08-05-app-site-parity-audit.md` §8 lists
 * the app file each one was read from.
 *
 * `illustrated: true` marks the six features with hand-drawn spot art in `FeatureArt.astro`;
 * they lead their category with the large two-column treatment and the rest render as cards.
 * Giving another feature art means adding its Lucide icon key to that component and setting
 * this flag.
 */

export type FeatureCategoryId = 'prayer' | 'quran' | 'worship' | 'library' | 'tools' | 'platform';

export interface FeatureCategory {
  id: FeatureCategoryId;
  label: string;
  blurb: string;
}

export interface Feature {
  icon: string; // lucide icon name
  title: string;
  body: string;
  accent: 'primary' | 'gold' | 'purple';
  category: FeatureCategoryId;
  /** Has bespoke art in FeatureArt.astro, and leads its category. */
  illustrated?: true;
}

export const featureCategories: FeatureCategory[] = [
  {
    id: 'prayer',
    label: 'Prayer & Qibla',
    blurb: 'The five daily prayers, worked out on your device and kept honest.',
  },
  {
    id: 'quran',
    label: 'Qur’an',
    blurb: 'Read it, hear it, and understand the context around it.',
  },
  {
    id: 'worship',
    label: 'Worship & habits',
    blurb: 'The parts of practice that build up over weeks rather than minutes.',
  },
  {
    id: 'library',
    label: 'Islamic library',
    blurb: 'Hadith, the calendar, the names, and a first Arabic reader.',
  },
  {
    id: 'tools',
    label: 'Tools',
    blurb: 'The practical things — the ones you need daily, and the ones you need once a year.',
  },
  {
    id: 'platform',
    label: 'Privacy & platform',
    blurb: 'How Nimaz behaves on your phone, and what never leaves it.',
  },
];

export const features: Feature[] = [
  // ── Prayer & Qibla ────────────────────────────────────────────────────────
  {
    icon: 'clock',
    title: 'Accurate prayer times',
    body: 'Precise times calculated on your device from your location, with 11 calculation methods — Muslim World League, ISNA, Egyptian, Umm Al-Qura, Karachi, Moonsighting Committee and more — plus Hanafi or Standard Asr, high-latitude rules, and a manual adjustment for every prayer when your masjid differs by a minute or two.',
    accent: 'primary',
    category: 'prayer',
    illustrated: true,
  },
  {
    icon: 'bell',
    title: 'Adhan notifications',
    body: 'The full call to prayer at every prayer time, from three muezzins — Mishary Rashid Alafasy, Abdul Basit Abdul Samad, or Makkah’s Masjid al-Haram — or a simple beep. Download the audio once and it plays offline. Set each prayer separately, add a pre-adhan warning, control vibration and Do Not Disturb, and run the built-in diagnostics when Android gets in the way.',
    accent: 'gold',
    category: 'prayer',
    illustrated: true,
  },
  {
    icon: 'compass',
    title: 'Qibla direction',
    body: 'Find the Kaaba with a compass that reads your device’s magnetometer and tells you honestly how well it is calibrated — or switch to AR mode and see the direction drawn over your camera view.',
    accent: 'gold',
    category: 'prayer',
    illustrated: true,
  },
  {
    icon: 'calendar-days',
    title: 'A month at a time',
    body: 'Every prayer time for the whole month in one table — for planning travel, shift work and Ramadan, or simply checking what Fajr will be on a date three weeks out.',
    accent: 'primary',
    category: 'prayer',
  },
  {
    icon: 'square-check-big',
    title: 'Prayer tracker & statistics',
    body: 'Tick off each of the five daily prayers as you pray them, and watch streaks and consistency build over weeks and months. Missed prayers go to a separate qada ledger, so what you owe stays visible until you make it up.',
    accent: 'primary',
    category: 'prayer',
  },

  // ── Qur'an ────────────────────────────────────────────────────────────────
  {
    icon: 'book-open',
    title: 'Qur’an reader with tafsir',
    body: 'Read, listen to and search the Qur’an with 15 translations across 11 languages, and two complete commentaries — Tafsir Ibn Kathir and Ma’arif al-Qur’an. Highlight passages in colour, attach your own notes to them, and choose from three Arabic typefaces including IndoPak Nastaʿlīq.',
    accent: 'primary',
    category: 'quran',
    illustrated: true,
  },
  {
    icon: 'book-marked',
    title: 'Mushaf, juz and surah modes',
    body: 'Read page by page in a true mushaf layout, work through one juz at a time, or open any surah directly. Your place is remembered whichever way you read, and bookmarks carry across all three.',
    accent: 'primary',
    category: 'quran',
  },
  {
    icon: 'headphones',
    title: '13 reciters, playing offline',
    body: 'Recitation from thirteen reciters — among them Mishary Rashid Alafasy, Abdul Basit Abdul Samad, Abdul Rahman Al-Sudais and Al-Minshawi — in both murattal and mujawwad styles, with background playback and lock-screen controls.',
    accent: 'gold',
    category: 'quran',
  },
  {
    icon: 'list-tree',
    title: 'The context around every surah',
    body: 'Each surah carries a background essay, an outline of its passages, and the subjects its verses are cited under — all cross-linked into a browsable topic tree, so you can follow a theme through the whole Qur’an instead of reading one verse at a time.',
    accent: 'purple',
    category: 'quran',
  },

  // ── Worship & habits ──────────────────────────────────────────────────────
  {
    icon: 'circle-dot',
    title: 'Tasbih counter',
    body: 'A digital tasbih with haptic feedback and saved presets for your own adhkar, plus statistics and a full history — so a dhikr you began this morning is still counted tonight.',
    accent: 'primary',
    category: 'worship',
  },
  {
    icon: 'heart',
    title: 'Dua collection',
    body: 'Authentic supplications arranged by category and by occasion — waking, travelling, eating, rain, distress and the rest — each with Arabic, transliteration and translation, plus favourites and search.',
    accent: 'purple',
    category: 'worship',
  },
  {
    icon: 'moon',
    title: 'Fasting tracker',
    body: 'Track Ramadan and voluntary fasts, with suhoor and iftar taken from the same calculation settings as your prayer times rather than a second, disagreeing set. Missed days go to a makeup ledger.',
    accent: 'purple',
    category: 'worship',
  },
  {
    icon: 'target',
    title: 'Khatam — Qur’an completion plans',
    body: 'Set a date to finish the Qur’an and Nimaz works out the daily reading, tracks how far you have come, reminds you when you fall behind, and puts the progress on your home screen.',
    accent: 'gold',
    category: 'worship',
  },
  {
    icon: 'moon-star',
    title: 'Night worship & 11 extra reminders',
    body: 'A Tahajjud and Witr hub with Surah Al-Mulk, the night duas and a relevant hadith one tap away — plus reminders for suhoor, iftar, taraweeh, Laylatul Qadr, morning and evening adhkar, and Monday/Thursday, White Days and Arafah/Ashura fasts. Ramadan reminders appear only during Ramadan.',
    accent: 'primary',
    category: 'worship',
  },

  // ── Islamic library ───────────────────────────────────────────────────────
  {
    icon: 'scroll-text',
    title: 'Hadith collections',
    body: 'All six canonical collections — Sahih al-Bukhari, Sahih Muslim, Sunan Abu Dawud, Jami’ at-Tirmidhi, Sunan an-Nasa’i and Sunan Ibn Majah — browsable by book and chapter, filterable by grading, searchable, bookmarkable, and easy to share with family.',
    accent: 'purple',
    category: 'library',
    illustrated: true,
  },
  {
    icon: 'calendar',
    title: 'Islamic calendar',
    body: 'The Hijri calendar beside the Gregorian one, with the days that matter marked — both Eids, Ramadan, Laylat al-Qadr, Arafah, Ashura, Mawlid and the Hijri new year — and a greeting in the app when they arrive.',
    accent: 'purple',
    category: 'library',
    illustrated: true,
  },
  {
    icon: 'sparkles',
    title: 'The Names, and the Prophets',
    body: 'Asma ul Husna and Asma un Nabi with their meanings and explanations, and a browsable set of the prophets with their stories. Save the ones you keep coming back to.',
    accent: 'gold',
    category: 'library',
  },
  {
    icon: 'graduation-cap',
    title: 'Qaida — Arabic reading from scratch',
    body: 'A structured Qaida course that teaches the Arabic letters and their sounds lesson by lesson, with a letter chart and saved progress. Built for children learning to read Qur’an, and for adults starting late.',
    accent: 'primary',
    category: 'library',
  },

  // ── Tools ─────────────────────────────────────────────────────────────────
  {
    icon: 'calculator',
    title: 'Zakat calculator',
    body: 'Work your zakat out across cash, gold, silver, investments and debts against the current nisab — and keep every past calculation, so next year starts from what you actually did last year.',
    accent: 'gold',
    category: 'tools',
  },
  {
    icon: 'search',
    title: 'Search everything, with optional AI',
    body: 'One search across the Qur’an, hadith and duas at once. Turn on “Ask with Proof” and you can ask a question in plain language: only the question text leaves your phone, and every verse and hadith the answer cites is looked up in the library already on your device and shown as a card you can open. It stays off until you switch it on.',
    accent: 'primary',
    category: 'tools',
  },
  {
    icon: 'layout-grid',
    title: 'Six home-screen widgets',
    body: 'Next prayer with a live countdown, the whole day’s times, a tap-to-tick prayer tracker, today’s Hijri date, a Hijri month view, and your khatam progress — all on your home screen without opening the app.',
    accent: 'purple',
    category: 'tools',
  },
  {
    icon: 'refresh-cw',
    title: 'Move to a new phone directly',
    body: 'Send your bookmarks, trackers, tasbih sessions, khatams, notes and settings straight from one phone to the other over a direct peer-to-peer connection. No account, no cloud, and no server in the middle — the two devices talk to each other.',
    accent: 'primary',
    category: 'tools',
  },

  // ── Privacy & platform ────────────────────────────────────────────────────
  {
    icon: 'wifi-off',
    title: 'Offline from the first launch',
    body: 'The Qur’an, the hadith collections, the duas and the entire calculation engine ship inside the app. There is no sign-up, no first-run download, and nothing that stops working on a plane or in a basement.',
    accent: 'primary',
    category: 'platform',
  },
  {
    icon: 'palette',
    title: 'Arranged the way you like',
    body: 'Light, dark or system theme with Material You colour, six interface languages — English, Turkish, Indonesian, Malay, French and German — three Arabic typefaces, and layouts that genuinely use the space on tablets and foldables.',
    accent: 'gold',
    category: 'platform',
  },
  {
    icon: 'circle-help',
    title: 'Help that answers the real question',
    body: 'A built-in help centre with guides for the things people actually get stuck on, and a notification diagnostics screen that names the exact device setting keeping your adhan quiet.',
    accent: 'purple',
    category: 'platform',
  },
];

/** The features filed under one category, in catalogue order. */
export function featuresIn(category: FeatureCategoryId): Feature[] {
  return features.filter((f) => f.category === category);
}

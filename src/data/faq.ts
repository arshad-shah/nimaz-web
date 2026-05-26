export interface Faq {
  q: string;
  a: string;
}

/**
 * General product FAQ shown on the landing page (distinct from the privacy FAQ).
 * Answers reflect the app's real facts: free, Android-only, offline-capable,
 * privacy-respecting. Kept free of calculation-method detail by design.
 */
export const faqs: Faq[] = [
  {
    q: 'Is Nimaz free?',
    a: 'Yes — Nimaz is completely free. There are no ads, no subscriptions, and no in-app purchases. It is a personal project built to serve the Muslim community.',
  },
  {
    q: 'Which devices does Nimaz support?',
    a: 'Nimaz is an Android app and runs on Android 10.0 and newer. There is no iOS version at this time.',
  },
  {
    q: 'Does Nimaz work offline?',
    a: 'Yes. Prayer times and Qibla direction are calculated on your device, so they keep working without an internet connection once the app is set up. A connection is only needed for occasional updates.',
  },
  {
    q: 'Does Nimaz track me or sell my data?',
    a: 'No. Nimaz never sells or shares your personal data. Location is used only for prayer times and Qibla — never tracked in the background — and the small amount of anonymous analytics can be turned off in settings. See the privacy policy for full details.',
  },
  {
    q: 'What else does Nimaz include besides prayer times?',
    a: 'A Qibla compass, an Islamic (Hijri) calendar, the full Quran with translations and Tafsir, the major authentic Hadith collections, and customizable adhan notifications for each prayer.',
  },
  {
    q: 'Will I be notified for each prayer?',
    a: 'Yes. Nimaz can send a beautiful adhan notification at each prayer time, and you can customize the notification and sound for every prayer.',
  },
  {
    q: 'How do I get help or share feedback?',
    a: 'Reach the developer at info@arshadshah.com. Feedback and feature requests are always welcome.',
  },
] satisfies Faq[];

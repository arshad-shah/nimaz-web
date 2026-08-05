export interface Faq {
  q: string;
  a: string;
}

/**
 * General product FAQ shown on the landing page (distinct from the privacy FAQ).
 * Answers reflect the app's real facts: free, Android-only, offline-first, privacy-respecting.
 * Kept free of calculation-method detail by design.
 *
 * On analytics: an earlier version of this file said the anonymous analytics "can be turned
 * off in settings". The app has no such toggle — no analytics preference in its DataStore and
 * no privacy row in any settings screen — so the answer below describes what the app actually
 * does. If a toggle ships, update this answer and `privacy.ts` in the same change.
 */
export const faqs: Faq[] = [
  {
    q: 'Is Nimaz free?',
    a: 'Yes — Nimaz is completely free. There are no ads, no subscriptions, and no in-app purchases. It is a personal project built to serve the Muslim community.',
  },
  {
    q: 'Which devices does Nimaz support?',
    a: 'Nimaz is an Android app and runs on Android 10.0 and newer, including tablets and foldables, where the layouts expand to use the extra space. There is no iOS version at this time.',
  },
  {
    q: 'Does Nimaz work offline?',
    a: 'Yes, from the very first launch. The Quran, the six hadith collections, the duas and the whole prayer-time calculation engine ship inside the app — there is no sign-up and no first-run download. A connection is needed only for optional extras: downloading adhan audio, and the opt-in AI search.',
  },
  {
    q: 'Does Nimaz track me or sell my data?',
    a: 'No. Nimaz has no user account and no server holding your data — your bookmarks, trackers and notes stay on your phone. Location is used only for prayer times, Qibla and phone-to-phone sync, and never in the background. The app does send anonymous usage and crash statistics to Firebase to help find bugs; they carry no personal content, and there is currently no in-app switch to disable them. The privacy policy has the full picture.',
  },
  {
    q: 'What else does Nimaz include besides prayer times?',
    a: 'A great deal: a Qibla compass with an AR mode, the full Quran with 15 translations, 13 reciters and two tafsir commentaries, all six canonical hadith collections, a dua library, a tasbih counter, prayer and fasting trackers with a qada ledger, Quran completion (khatam) plans, a zakat calculator, the Hijri calendar, the 99 Names and the Prophets, a Qaida reader for children, six home-screen widgets, and adhan notifications you can tune prayer by prayer.',
  },
  {
    q: 'Will I be notified for each prayer?',
    a: 'Yes. Nimaz plays the full adhan at each prayer time — three muezzins to choose from, or a simple beep — and every prayer can be set separately. You can add a pre-adhan warning, control vibration and Do Not Disturb, and there is a diagnostics screen that checks your device when notifications are not arriving.',
  },
  {
    q: 'Does Nimaz keep track of my prayers and fasts?',
    a: 'Yes, if you want it to. You can tick off each of the five daily prayers, keep a qada ledger of prayers you owe, track Ramadan and voluntary fasts with a makeup list, count dhikr sessions, and run a khatam plan to finish the Quran by a chosen date. All of it is stored on your device only — none of it is uploaded anywhere.',
  },
  {
    q: 'Are there home-screen widgets?',
    a: 'Six of them: the next prayer with a live countdown, the full day’s prayer times, a prayer tracker you can tick straight from the home screen, today’s Hijri date, a Hijri month view, and your khatam reading progress.',
  },
  {
    q: 'How do I move my data to a new phone?',
    a: 'Put both phones side by side and use the sync screen. Bookmarks, trackers, tasbih sessions, khatams, notes and settings transfer directly from one device to the other over a peer-to-peer connection — there is no account to sign into, and nothing passes through a server.',
  },
  {
    q: 'What is “Ask with Proof”?',
    a: 'An optional AI layer over the app’s search. You ask a question in plain language, and only the question text is sent — over an encrypted connection, to the Nimaz worker on Cloudflare and on to Anthropic’s Claude — to produce an answer. Every verse and hadith the answer cites is then looked up in the library already on your phone and shown as a card you can open and read in full. It is switched off by default, and AI answers are not religious rulings — always check them against the cited sources.',
  },
  {
    q: 'How do I get help or share feedback?',
    a: 'Nimaz has a built-in help centre with guides for the common problems, including a notification diagnostics screen for when the adhan does not sound. Beyond that, reach the developer at info@arshadshah.com — feedback and feature requests are always welcome.',
  },
] satisfies Faq[];

# Nimaz app ↔ nimaz-web parity audit

**Date:** 2026-08-05
**App audited:** `arshad-shah/Nimaz` @ `dev` — versionName `3.0.96`, versionCode `396`
**Site audited:** `arshad-shah/nimaz-web` @ `main` — commit `951fd85`
**Method:** read-only. App facts come from source (`Routes.kt`, domain enums, `AndroidManifest.xml`,
`build.gradle.kts`, `res/values*`) and the app's own docs (`docs/NAVIGATION.md` §3,
`docs/SUBSYSTEMS.md` §0, `docs/ai-ask-with-proof.md`). Site facts come from `src/data/*` and
`src/pages/*`.

---

## Contents

1. [Headline](#1-headline)
2. [Wrong on the site today](#2-wrong-on-the-site-today)
3. [Features the app has and the site never mentions](#3-features-the-app-has-and-the-site-never-mentions)
4. [Data the site could carry but doesn't](#4-data-the-site-could-carry-but-doesnt)
5. [Legal pages vs. what the app actually does](#5-legal-pages-vs-what-the-app-actually-does)
6. [Structural gaps in the site itself](#6-structural-gaps-in-the-site-itself)
7. [Recommended order of work](#7-recommended-order-of-work)
8. [Appendix — verified app numbers](#8-appendix--verified-app-numbers)

---

## 1. Headline

The site presents Nimaz as a **six-feature app**: prayer times, Qibla, Islamic calendar, Quran
reader, adhan notifications, hadith. That was accurate at some point in 2024. The app it
describes today ships **93 navigable destinations** across roughly **twenty** distinct feature
areas.

The gap is not "a few missing bullets". Whole pillars of the product — Tasbih, Duas, the Zakat
calculator, prayer and fasting trackers, Khatam planning, the Qaida reader, Asma ul Husna / Asma
un Nabi / Prophets, six home-screen widgets, device-to-device sync, AR Qibla, and the opt-in
"Ask with Proof" AI search — have **zero** presence on the site. Grepping the whole `src/` tree
for `tasbih`, `zakat`, `khatam`, `qaida`, `asma`, `tahajjud`, `dhikr`, `tracker` and `fasting`
returns **no hits at all**.

Three of the site's four headline statistics are also wrong, and both legal pages describe a
narrower app than the one currently shipping — including one claim (an analytics opt-out in
settings) that does not exist in the app at all.

---

## 2. Wrong on the site today

Fix these before adding anything new. Each is checkable against source.

| Where                                                                                                                                                                         | Site says                                                                                                                                                                                                                                          | App actually                                                                                                                                                                                                                                                                                                 | Severity                                                   |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------- |
| `src/data/stats.ts`                                                                                                                                                           | **18** Calculation Methods                                                                                                                                                                                                                         | **11** — `CalculationMethod` in `domain/model/PrayerModels.kt` has exactly 11 entries (MWL, Egyptian, Karachi, Umm Al-Qura, Dubai, Moonsighting Committee, ISNA, Kuwait, Qatar, Singapore, Turkey)                                                                                                           | **High** — overstated by 64%                               |
| `src/data/stats.ts`                                                                                                                                                           | **9** Hadith Collections                                                                                                                                                                                                                           | **6** — `bukhari`, `muslim`, `tirmidhi`, `nasai`, `abudawud`, `ibnmajah` (`HadithCollectionScreen.kt`, `NimazColors.HadithCollectionColors`, and `docs/ai-ask-with-proof.md`: "the six shipped collections"). The site's own `features.ts` copy names exactly these six — so the page **contradicts itself** | **High**                                                   |
| `src/data/stats.ts`                                                                                                                                                           | **99.9%** Prayer Time Accuracy · **±0.5°** Qibla Precision                                                                                                                                                                                         | Not derived from anything in the codebase. Unfalsifiable marketing numbers on a religious-practice app                                                                                                                                                                                                       | **Medium** — replace with real, checkable numbers (see §4) |
| `src/data/features.ts` (Quran)                                                                                                                                                | "renowned interpretations by **Ibn Kathir**"                                                                                                                                                                                                       | **Two** tafsir sources — `TafseerSource` = Ibn Kathir **and Ma'arif al-Qur'an**. Undersells                                                                                                                                                                                                                  | **Medium**                                                 |
| `src/data/privacy.ts` → "User Control & Rights" → `Analytics opt-out option`, and `src/data/faq.ts` → "the small amount of anonymous analytics can be turned off in settings" | There is **no analytics toggle in the app.** No `analyticsEnabled` preference in `PreferencesDataStore`, no `setAnalyticsCollectionEnabled` call, no privacy row in any settings screen. `core/monitoring/AppAnalytics.kt` reports unconditionally | **Critical** — a privacy policy promising a control that doesn't exist. Either ship the toggle in the app or correct both pages                                                                                                                                                                              |
| `src/data/site.ts`                                                                                                                                                            | `rating: 4.8`, `size: '47MB'`                                                                                                                                                                                                                      | Not verifiable from the repo. Size in particular is stale-prone: ~31 MB of bundled JSON assets were retired at versionCode 385 and `app/src/main/assets/` is now effectively empty                                                                                                                           | **Medium** — re-check both against the live Play listing   |
| `src/data/privacy.ts`                                                                                                                                                         | `updated: 'March 2024'`                                                                                                                                                                                                                            | The app has shipped ~2 years and 100+ versionCodes of change since                                                                                                                                                                                                                                           | **High**                                                   |
| `src/data/terms.ts`                                                                                                                                                           | `effective: 'March 1, 2024'`                                                                                                                                                                                                                       | Same                                                                                                                                                                                                                                                                                                         | **High**                                                   |

`site.app.minOs: 'Android 10.0+'` is **correct** — `minSdk = 29`. Good.

---

## 3. Features the app has and the site never mentions

Grouped as they'd sensibly appear on the site. Route names are from `docs/NAVIGATION.md` §3.

### 3.1 Worship tracking — the biggest omission

Nothing on the site suggests Nimaz remembers anything you do. It does, extensively:

- **Prayer tracker** (`PrayerTracker`) — mark each of the five daily prayers.
- **Prayer statistics** (`PrayerStats`) — streaks and consistency over time.
- **Qada prayers** (`QadaPrayers`) — a make-up prayer ledger.
- **Fast tracker** (`FastingHome` / `FastingTracker` / `FastingStats`) — plus a **makeup-fasts**
  tab for missed days.
- **Khatam** (`KhatamList` / `KhatamDetail` / `KhatamCreate` / `KhatamEdit`) — Quran completion
  plans with a daily target, progress, a dedicated home-screen widget and its own notification
  channel.

This is the single most compelling category on the list and it is 100% absent from the site.

### 3.2 Dhikr & duas

- **Tasbih** — a bottom-navigation root. Counter (`TasbihCounter`), custom dhikr presets
  (`TasbihPresets`, `TasbihAddPreset`), statistics (`TasbihStats`) and history (`TasbihHistory`).
- **Duas** — a full library: categories (`DuaCategory`), browse-by-occasion (`DuaOccasion`),
  reader (`DuaReader`), favourites (`DuaFavorites`), search (`DuaSearch`), settings
  (`DuaSettings`).

### 3.3 Islamic knowledge library

- **Asma ul Husna** — the 99 Names, list + detail.
- **Asma un Nabi** — the names of the Prophet ﷺ, list + detail.
- **Prophets** — a browsable list with detail screens.
- **Qaida** — a children's Arabic-reading course: lessons (`QaidaReader`), a letter chart
  (`QaidaLetters`), with saved progress. A genuinely differentiating family feature.

### 3.4 Quran depth the site flattens into one paragraph

The site's Quran bullet mentions reading, listening, search, translations, tafsir, bookmarks and
notes. It omits:

- **Mushaf page mode** (`QuranPage`) and **Juz mode** (`QuranJuz`) alongside surah reading.
- **Surah info hub** (`SurahInfo`) — identity, revelation data, summary.
- **Surah background** (`SurahBackground`) — long-form context, up to 47 KB of prose per surah.
- **Passage outlines** (`SurahPassages`) — up to 282 structured passages per surah, and the
  reader marks the passage you're in.
- **Thematic subject browser** (`QuranTopics`, `QuranTopicDetail`, `SurahSubjects`) — a
  navigable topic tree with cross-links, and per-surah subject lists.
- **Tafsir highlighting and notes** — coloured highlights on tafsir spans with attached notes,
  plus a "My notes" list.
- **13 reciters**, **15 translations across 11 languages**, **3 Arabic fonts** (Amiri,
  Scheherazade New, IndoPak Nastaʿlīq).

### 3.5 Zakat

`ZakatCalculator` + `ZakatHistory` — a calculator that saves past calculations. A top-of-funnel
search term the site does not rank for at all.

### 3.6 Night worship & extended reminders

- **Night worship hub** (`NightWorship`) — Tahajjud/Witr, with Al-Mulk, night duas and a
  relevant hadith one tap away.
- **11 worship reminder types** beyond the five prayers (`WorshipRemindersScreen`): Tahajjud,
  Witr, Suhoor, Iftar, Taraweeh, Laylatul Qadr, morning adhkar, evening adhkar, Monday/Thursday
  fasts, White Days fasts, Arafah/Ashura fasts. Ramadan-scoped reminders auto-hide outside
  Ramadan.

### 3.7 Home-screen widgets — six of them

`docs/SUBSYSTEMS.md` §0.4: Next Prayer, Prayer Times, Prayer Tracker, Hijri Date, Hijri Calendar,
Khatam. Widgets are a top reason people choose one prayer app over another, and they screenshot
beautifully. The site shows none.

### 3.8 Device-to-device sync — a genuine privacy story, untold

`data/sync/` moves your entire app data between two phones over **Google Nearby Connections** —
peer-to-peer, **no server and no account**. Bookmarks, prayer/fast records, tasbih, khatams,
tafsir notes, zakat history, qaida progress: 14 tables plus preferences, last-write-wins merge.

This is exactly the kind of thing the privacy-conscious audience the site targets wants to hear,
and it is the strongest possible proof of the "your data stays yours" claim. It is not mentioned.

### 3.9 AR Qibla

`presentation/components/organisms/qibla/ArQiblaView.kt` — a camera-based augmented-reality Qibla
mode with an accuracy indicator, alongside the classic compass. The manifest's `CAMERA`
permission exists solely for this. The site's Qibla copy describes only the magnetometer compass.

### 3.10 "Ask with Proof" — opt-in AI search

Global Search (`GlobalSearch`) is a unified library search across Quran, Hadith and Duas. On top
of it sits an **opt-in, off-by-default** AI layer (`docs/ai-ask-with-proof.md`): ask a question,
and the answer's cited Quran and Hadith references are **resolved locally** into proof cards from
the on-device library. Only the question text leaves the phone.

This is a marquee feature with an unusually defensible privacy design — and it is the one feature
where saying nothing on the site is actively risky, because it is the only feature that sends user
text to a server (see §5).

### 3.11 Personalisation & polish

- **6 UI languages** — English, Turkish, Indonesian, Malay, French, German (`values-{tr,id,ms,fr,de}`).
- **Light / dark / system theming** (`AppTheme`), plus Material You dynamic colour.
- **Adaptive layouts for tablets and foldables** — `presentation/screens/adaptive/` has
  list-detail layouts for Quran, Hadith, Dua, Khatam, Asma, Prophets, More and Settings.
- **In-app help centre** (`SettingsHelp`, `HelpTopicDetail`, `HelpGuide`) with deep-linkable topics.
- **Notification diagnostics** (`SettingsNotificationsDiagnostics`) — device checks, a test
  notification, and a reset. Directly answers the #1 support complaint for every prayer app
  ("notifications stopped working").
- **Monthly prayer times** (`MonthlyPrayerTimes`) — a full month at a glance.
- **Unified bookmarks** (`AllBookmarks`) across Quran, Hadith and Duas.
- **Islamic event celebrations** — 10 recognised occasions (both Eids, Ramadan start/end, Laylat
  al-Qadr, Arafah, Ashura, Mawlid, Hijri New Year, Jumu'ah).
- **Offline adhan audio** — downloadable adhan files with a progress notification, so the call to
  prayer plays with no connection.

---

## 4. Data the site could carry but doesn't

The site's stats strip is four numbers, three of which are wrong or unfalsifiable. Every number
below is verifiable from source and can be pinned by a unit test in `src/data/__tests__/`, which
is how they stop rotting:

| Number                 | Value                       | Source of truth                   |
| ---------------------- | --------------------------- | --------------------------------- |
| Calculation methods    | **11**                      | `CalculationMethod` enum          |
| Hadith collections     | **6**                       | `HadithCollectionScreen` book ids |
| Quran translations     | **15**                      | `QuranTranslation` enum           |
| Translation languages  | **11**                      | `TranslationLanguage` enum        |
| Reciters               | **13**                      | `QuranReciter` enum               |
| Tafsir sources         | **2**                       | `TafseerSource` enum              |
| Arabic fonts           | **3**                       | `QuranArabicFont` enum            |
| Home-screen widgets    | **6**                       | `SUBSYSTEMS.md` §0.4              |
| Worship reminder types | **11**                      | `WorshipReminderType` enum        |
| Adhan sounds           | **4** (3 muezzins + a beep) | `AdhanSound` enum                 |
| App languages          | **6**                       | `res/values-*`                    |
| Screens / destinations | **93**                      | `NAVIGATION.md` §3                |
| Minimum Android        | **10** (API 29)             | `minSdk`                          |

Suggested replacement stats strip: **6 Hadith collections · 15 Quran translations · 13 reciters ·
11 calculation methods** — all true, all more impressive than "99.9% accuracy", and none of them
a claim a reviewer can dispute.

Beyond numbers, the site carries **no**:

- screenshots or real app UI (the phone frame is a hand-built HTML mock; feature art is
  decorative SVG);
- feature comparison or "what's new" / changelog;
- support or help page (the in-app help centre content could seed one, and it would rank);
- per-feature landing pages — `/features` is one long scroll of six items, so there is nothing to
  rank for "islamic zakat calculator", "tasbih counter app", "quran khatam tracker", etc.

---

## 5. Legal pages vs. what the app actually does

The privacy policy is the most out-of-date artefact on the site, and the divergences are
substantive rather than cosmetic.

**Undisclosed processing:**

1. **Firebase Performance Monitoring** and **Firebase Cloud Messaging** are both in the app
   (`build.gradle.kts`: `firebase-perf`, `firebase-messaging`; `NimazMessagingService` in
   `data/announcement/`). The policy lists only Analytics and Crashlytics. FCM in particular means
   the app holds a push token and can receive server-sent announcements — a disclosure obligation.
2. **"Ask with Proof" AI.** When enabled, the question text goes over TLS to a Cloudflare Worker
   and on to **Anthropic's Claude API**, accompanied by a rotating pseudonymous device id stored
   in the `nimaz_ai_device` DataStore. The in-app disclosure string is excellent
   (`R.string.ai_disclosure_full`) — the website's policy says nothing. Third-party sub-processors
   (Cloudflare, Anthropic) are not named anywhere on the site.
3. **Device-to-device sync** requires `ACCESS_FINE_LOCATION`, the full `BLUETOOTH_*` set,
   `ACCESS_WIFI_STATE`, `CHANGE_WIFI_STATE` and `NEARBY_WIFI_DEVICES`. The policy's location
   section says location is used "solely for calculating prayer times and Qibla" — which is no
   longer the whole truth, since Nearby Connections needs it too. Worth stating plainly that this
   transfer is peer-to-peer with no server involved; it's a selling point, not a liability.
4. **Camera** is requested for AR Qibla and is not mentioned in the policy at all.
5. **Adhan audio downloads** fetch from third-party hosts (`media.assabile.com`,
   `archive.org`) — an outbound request to a third party that the policy doesn't cover.

**Claims that are no longer true:**

6. The **analytics opt-out** (§2) — promised, not implemented.
7. _"Nimaz does not track or analyze your individual prayer habits"_ — literally true about the
   server, but the app now has prayer/fast/tasbih/khatam trackers with statistics. Reword to what
   you actually mean: tracking happens, and it happens **only on the device**. As written it will
   read as contradicted by the app's own feature list once the site starts advertising trackers.
8. _"Data Storage & Security … stored securely with proper encryption"_ and _"regular security
   audits"_ server-side — the app's architecture is offline-first with no user-data backend.
   Claiming server-side storage and audits you don't perform is worse than saying "we don't have
   a server for your data", which is the stronger and truer statement.
9. `src/data/terms.ts` → "Restrictions" forbids reverse engineering and decompilation, while the
   app's source is on GitHub. Worth aligning with reality (and the app repo carries no LICENSE
   file, so its licensing status should be settled either way).

Also: `public/legal/Privacy-Policy.pdf` and `public/legal/Terms-and-Conditions.pdf` are shipped
statically and were not regenerated as part of this audit — they will need updating alongside
`src/data/privacy.ts` and `src/data/terms.ts`, or they become a second, contradictory source of
truth.

---

## 6. Structural gaps in the site itself

- **`/features` cannot scale.** `FeatureShowcase.astro` maps over a flat `features[]` array in
  alternating rows. Six items works; twenty does not. The feature model needs a category
  (`Prayer`, `Quran`, `Worship`, `Knowledge`, `Tools`, `Privacy`) and the page needs grouping —
  probably with per-category anchors, and eventually per-feature routes.
- **JSON-LD is minimal.** `Seo.astro` emits a `SoftwareApplication` with no
  `aggregateRating`, `featureList`, `screenshot`, `softwareVersion` or `datePublished`. Given the
  app already claims a 4.8 rating, `featureList` and `aggregateRating` are free rich-result wins.
- **The FAQ answer** _"What else does Nimaz include besides prayer times?"_ names five things. It
  should name fifteen — this is the single highest-leverage string on the site for both users and
  FAQ rich results.
- **The footer's "Features" column** hardcodes four items and is not derived from
  `features.ts`, so it will drift the moment the array changes.
- **`site.description`** ("prayer times, Qibla direction, Quran and Hadith") is the meta
  description on every page. It is the same four-feature framing, propagated site-wide.
- **No screenshots** means no `screenshot` in JSON-LD, no visual proof of the six widgets, and no
  Play-Store-adjacent imagery anywhere.

---

## 7. Recommended order of work

**P0 — correctness (small diffs, mostly `src/data/`)**

1. Fix `stats.ts`: 18 → 11 calculation methods, 9 → 6 hadith collections; replace the two
   unfalsifiable accuracy figures.
2. Resolve the analytics opt-out contradiction — ship the toggle in the app, or correct
   `privacy.ts` and `faq.ts`.
3. Re-verify `site.app.rating` and `site.app.size` against the live Play listing.
4. Add Ma'arif al-Qur'an to the Quran feature copy.

**P1 — legal accuracy**

5. Rewrite `privacy.ts`: add Firebase Performance + Cloud Messaging, the AI feature with
   Cloudflare/Anthropic named as sub-processors, sync's Bluetooth/Wi-Fi/location use, camera for
   AR Qibla, and third-party adhan audio hosts. Reframe the server-side security claims around
   "there is no user-data server". Bump `updated`.
6. Reword the "we don't track prayer habits" FAQ to "tracking is on-device only".
7. Review the terms' reverse-engineering clause against the app's actual licensing; bump
   `effective`.
8. Regenerate `public/legal/*.pdf` to match.

**P2 — the actual parity work**

9. Restructure `features.ts` into categories and extend it to cover: worship tracking (prayer,
   fasting, qada, khatam), Tasbih, Duas, Zakat, the knowledge library (Asma ul Husna, Asma un
   Nabi, Prophets, Qaida), widgets, night worship & extended reminders, device-to-device sync,
   AR Qibla, Ask-with-Proof, and offline-first personalisation (6 languages, 3 Arabic fonts,
   theming, tablet layouts).
10. Regroup `/features` by category; add anchors.
11. Rewrite the "what else does Nimaz include" FAQ answer; add FAQs for sync, AI, and widgets.
12. Derive the footer's feature column from `features.ts`.

**P3 — growth**

13. Capture real screenshots (including widgets on a home screen) and use them in `PhoneFrame`,
    the showcase, and JSON-LD `screenshot`.
14. Enrich JSON-LD with `featureList`, `aggregateRating`, `softwareVersion`.
15. Consider per-feature pages for the high-intent standalone tools (Zakat calculator, Tasbih,
    Khatam, Qaida).
16. Add a support/help page seeded from the in-app help centre, and a changelog.

Wherever a number lands in `src/data/`, pin it with a test in `src/data/__tests__/content.test.ts`
and cite the app-side source of truth in a comment. That is what keeps this audit from needing to
be repeated in another two years.

---

## 8. Appendix — verified app numbers

Everything asserted above, with where it was read from.

| Fact                            | Value                                          | Read from                                                     |
| ------------------------------- | ---------------------------------------------- | ------------------------------------------------------------- |
| versionName / versionCode       | 3.0.96 / 396                                   | `app/build.gradle.kts`                                        |
| minSdk / targetSdk / compileSdk | 29 / 36 / 37                                   | `app/build.gradle.kts`                                        |
| Navigable destinations          | 93                                             | `docs/NAVIGATION.md` §3                                       |
| Calculation methods             | 11                                             | `domain/model/PrayerModels.kt`                                |
| Asr juristic methods            | 2 (Standard, Hanafi)                           | `AsrJuristicMethod`                                           |
| Hadith collections              | 6                                              | `presentation/screens/hadith/HadithCollectionScreen.kt`       |
| Quran translations              | 15, across 11 languages                        | `domain/model/QuranTranslation.kt`                            |
| Reciters                        | 13                                             | `domain/model/QuranReciter.kt`                                |
| Tafsir sources                  | 2 (Ibn Kathir, Ma'arif al-Qur'an)              | `domain/model/TafseerModels.kt`                               |
| Arabic fonts                    | 3                                              | `presentation/theme/Type.kt`                                  |
| Adhan sounds                    | 4                                              | `data/audio/AdhanSound.kt`                                    |
| UI languages                    | 6                                              | `app/src/main/res/values-*`                                   |
| Themes                          | System / Light / Dark + dynamic colour         | `AppTheme`, `presentation/theme/Theme.kt`                     |
| Widgets                         | 6                                              | `docs/SUBSYSTEMS.md` §0.4                                     |
| Workers                         | 7                                              | `docs/SUBSYSTEMS.md` §0.3                                     |
| Foreground services             | 4                                              | `docs/SUBSYSTEMS.md` §0.2                                     |
| Notification channels           | 12                                             | `docs/SUBSYSTEMS.md` §0.6                                     |
| Worship reminder types          | 11                                             | `domain/model/WorshipReminder.kt`                             |
| Celebration events              | 10 named + generic                             | `domain/model/Announcement.kt`                                |
| Sync tables                     | 14 DAOs + full preferences dump                | `docs/SUBSYSTEMS.md` §10                                      |
| Firebase SDKs                   | Crashlytics, Analytics, Performance, Messaging | `app/build.gradle.kts`                                        |
| Analytics opt-out               | **none**                                       | no `analyticsEnabled` pref; `core/monitoring/AppAnalytics.kt` |
| Offline out of the box          | yes — content DB ships in the APK              | `docs/SUBSYSTEMS.md` §7                                       |

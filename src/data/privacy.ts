export interface PrivacySection {
  title: string;
  body: string;
  highlights: string[];
}
export interface Faq {
  q: string;
  a: string;
}

/**
 * The privacy policy.
 *
 * Rewritten August 2026 against the shipping app (versionCode 396) after an audit found the
 * March 2024 text described a much narrower app. What changed, and why:
 *
 * - Added Firebase Performance Monitoring and Cloud Messaging to the third-party list; only
 *   Analytics and Crashlytics had been disclosed.
 * - Added the opt-in "Ask with Proof" AI search, naming Cloudflare and Anthropic as the
 *   sub-processors that see a question.
 * - Added device-to-device sync, which is why the app asks for Bluetooth, Wi-Fi and location
 *   beyond prayer times, and added the camera, which AR Qibla uses.
 * - Added the third-party hosts that adhan audio downloads come from.
 * - Removed the promised "analytics opt-out": the app has no such setting. Saying so plainly
 *   is the only honest option until one ships.
 * - Reframed the server-side storage and "regular security audits" claims. There is no
 *   user-data backend to secure, which is a stronger statement than the one being made.
 * - Reworded "we do not track your prayer habits": the app now has prayer, fast, dhikr and
 *   khatam trackers. They exist, and they are on-device only.
 *
 * Keep `updated` in step with any edit here, and regenerate `public/legal/Privacy-Policy.pdf`.
 */
export const privacy = {
  updated: 'August 2026',
  glance: [
    'No account, and no server holding your data',
    'Works fully offline, straight out of the box',
    'Location used only for prayer times, Qibla & nearby sync',
    'Sync goes phone-to-phone, never through the cloud',
    'AI search is optional and off by default',
    'No personal data sold or shared, ever',
  ],
  sections: [
    {
      title: 'Our privacy commitment',
      body: 'Nimaz is designed so that your religious practice stays your business. It is a free personal project, it has no user accounts, and it has no backend database holding your information. The Quran, the hadith collections, the duas and the prayer-time engine all ship inside the app, so the ordinary way to use Nimaz involves no network traffic at all. Everything described below is the exception rather than the rule.',
      highlights: [
        'Offline-first by design',
        'No account, no user-data server',
        'Free, with no data selling',
      ],
    },
    {
      title: 'What stays on your device',
      body: 'Your bookmarks, notes and highlights, your prayer and fasting records, your qada ledger, tasbih sessions, khatam plans, zakat calculations, Qaida progress, saved locations and every app setting are written to storage on your phone and stay there. They are not uploaded, not backed up to us, and not readable by us — there is nowhere for them to go. Uninstalling the app removes them, so use the phone-to-phone sync described below before switching devices.',
      highlights: [
        'Trackers, notes and bookmarks stored locally',
        'Settings and saved locations stored locally',
        'Nothing uploaded to the developer',
      ],
    },
    {
      title: 'Location, sensors and the camera',
      body: 'Location is used to calculate prayer times and the Qibla direction, and — only while you are running a phone-to-phone sync — to satisfy the Android requirement behind nearby-device discovery. Nimaz does not hold background-location permission and cannot follow you when it is closed. The magnetometer powers the Qibla compass. The camera is used by one screen only, the AR Qibla view, and only while that screen is open; no image is recorded, stored or transmitted. You can decline any of these permissions and enter a location by hand instead.',
      highlights: [
        'No background location tracking',
        'Camera only for AR Qibla, never recorded',
        'Manual location entry always available',
      ],
    },
    {
      title: 'What we do collect',
      body: 'Nimaz sends anonymous usage events, crash reports and performance traces to Google Firebase. These tell the developer which screens are used and where the app is crashing or running slowly. They do not contain your name, your location, the verses you read, your prayer records, or the contents of any note or bookmark. This is the only routine, non-optional network traffic the app produces, and it exists solely to fix bugs and improve the app.',
      highlights: [
        'Anonymous usage and crash data',
        'No personal content, ever',
        'Used only for fixing and improving',
      ],
    },
    {
      title: 'Ask with Proof — the optional AI search',
      body: 'Nimaz includes an AI-assisted search that stays switched off until you turn it on in Search Settings. When it is on and you ask a question, only the question text is sent over an encrypted connection to the Nimaz worker hosted on Cloudflare, and from there to Anthropic’s Claude API, which generates the answer. A rotating, pseudonymous device identifier accompanies the request purely to enforce fair-use limits; it is not tied to you or to your Google account. Nothing else leaves your phone: the verses and hadiths the answer cites are matched against the library already on your device. Your questions are not used for analytics. AI answers can be wrong and are not religious rulings — verify them against the cited sources.',
      highlights: [
        'Off by default, opt-in only',
        'Only your question text is sent',
        'Cloudflare and Anthropic process it',
      ],
    },
    {
      title: 'Moving data between your own phones',
      body: 'Nimaz can transfer your data from one phone to another directly, using Google’s Nearby Connections. The two devices form a temporary encrypted link over Bluetooth and Wi-Fi and you confirm a matching code on both — which is why the app requests Bluetooth, Wi-Fi and location permissions. Your data travels straight between the two handsets. It is not uploaded to any server, ours or anyone else’s, and no copy is retained anywhere once the transfer finishes.',
      highlights: [
        'Direct device-to-device transfer',
        'No cloud and no server copy',
        'Confirmed with a code on both phones',
      ],
    },
    {
      title: 'Third-party services',
      body: 'Nimaz relies on a small set of external services. Google Play Services provides core Android functionality and the nearby-device transport. Firebase provides Analytics, Crashlytics, Performance Monitoring and Cloud Messaging — the last of which delivers occasional announcements such as Eid greetings, and means your device holds a push token. Cloudflare and Anthropic are involved only if you enable Ask with Proof. Adhan audio, when you choose to download it, is fetched from Assabile and the Internet Archive. Each of these has its own privacy policy, which we encourage you to read.',
      highlights: [
        'Google Play Services · Firebase',
        'Cloudflare + Anthropic (AI only)',
        'Assabile · Internet Archive (adhan audio)',
      ],
    },
    {
      title: 'Security',
      body: 'The strongest thing we can say about the security of your data is that there is no central store of it to breach: Nimaz keeps no user database and issues no accounts. On your phone, your data sits in the app’s private storage, protected by Android’s own sandbox and by whatever device encryption you have enabled. The network requests the app does make — analytics, announcements, the optional AI search, adhan downloads — all travel over encrypted connections.',
      highlights: [
        'No central store of user data',
        'Android sandbox + device encryption',
        'Encrypted connections in transit',
      ],
    },
    {
      title: 'Your control and your rights',
      body: 'Location, notification and camera permissions can be granted or revoked at any time in Android’s settings, and Nimaz keeps working — with a manually entered location — if you refuse location entirely. The AI search is opt-in and can be switched off again at any point. Announcement notifications can be turned off in the app or in Android. There is currently no in-app switch for the anonymous Firebase analytics and crash reporting; if you would rather send none, Android’s per-app settings and Google’s own usage-data controls are the available route, and adding an in-app toggle is on the backlog. Because your data lives on your device, clearing the app’s storage or uninstalling it deletes it — there is no server-side copy for us to remove, and no deletion request to file.',
      highlights: [
        'Revoke any permission at any time',
        'AI search opt-in and reversible',
        'Delete everything by clearing app data',
      ],
    },
    {
      title: 'Children',
      body: 'Nimaz is a general-audience app, and it includes a Qaida reader intended for children learning Arabic. It does not ask for a name, an email address, an account or any other identifying information from anyone, so it does not knowingly collect personal information from children. The AI search is off by default, which means a child using the app touches no network feature unless an adult enables one.',
      highlights: [
        'No account or personal details requested',
        'Child-facing features are fully offline',
        'AI search disabled unless enabled',
      ],
    },
    {
      title: 'Policy updates',
      body: 'This privacy policy is updated when the app’s behaviour changes — a new third-party service, a new permission, or a new optional feature that sends anything off the device. The date at the top of this page reflects the most recent revision. Significant changes will also be communicated in the app, and we encourage you to look over this page occasionally.',
      highlights: [
        'Revised with app behaviour',
        'Dated at the top of the page',
        'Changes announced in-app',
      ],
    },
  ] satisfies PrivacySection[],
  faqs: [
    {
      q: 'Does Nimaz track my location when the app is closed?',
      a: 'No. Nimaz does not hold Android’s background-location permission, so it is not technically able to. Location is read while you are using the app, to calculate prayer times and the Qibla, and during a phone-to-phone sync because Android requires it for nearby-device discovery. Your position is not logged or transmitted.',
    },
    {
      q: 'Does Nimaz share my data with third parties?',
      a: 'Your personal content is never sold or shared for marketing. The external services involved are Google Play Services and Firebase (anonymous analytics, crash reports, performance traces and announcement notifications) and — only if you turn on Ask with Proof — Cloudflare and Anthropic, which see the text of your question and nothing else. Downloading adhan audio fetches files from Assabile and the Internet Archive.',
    },
    {
      q: 'What exactly leaves my phone when I use the AI search?',
      a: 'Only the words of your question, plus a rotating pseudonymous device identifier used to enforce fair-use limits. Your location, your bookmarks, your reading history and your trackers are never included. The verses and hadiths the answer cites are matched against the library already on your device rather than fetched from anywhere. And the whole feature stays off until you switch it on.',
    },
    {
      q: 'Can I use Nimaz without granting location permissions?',
      a: 'Yes. You can enter your location by hand and everything else works normally — prayer times, Qibla, notifications and the whole library. Only automatic updating as you travel, and the phone-to-phone sync, need the permission.',
    },
    {
      q: 'How can I delete my data from Nimaz?',
      a: 'Clear the app’s storage in Android settings, or uninstall it. That is genuinely all there is to it: your bookmarks, trackers, notes and settings live on your device, and there is no server-side copy for us to hold or to delete. If you are switching phones, run the device-to-device sync before you uninstall.',
    },
    {
      q: 'How accurate are prayer times without location services?',
      a: 'A manually entered location gives just as accurate a result — it is the same astronomical calculation either way, and it happens entirely on your device. Automatic location simply saves you from updating it yourself when you travel.',
    },
    {
      q: 'Does Nimaz collect data about my prayer habits?',
      a: 'Nimaz records exactly as much as you ask it to — prayers you tick off, fasts you mark, dhikr you count, khatam progress — and every bit of it stays on your phone. None of it is uploaded, and the anonymous analytics the app does send contain no prayer, fasting or reading records of any kind.',
    },
    {
      q: 'Can I turn off analytics?',
      a: 'Not from inside the app today — there is no analytics switch in Nimaz’s settings, and we would rather say so than imply one exists. What is sent is anonymous usage, crash and performance data with no personal content. Android’s per-app settings and Google’s own usage-data controls are the available route in the meantime, and an in-app toggle is on the backlog.',
    },
  ] satisfies Faq[],
} as const;

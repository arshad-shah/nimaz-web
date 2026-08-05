export interface TermsItem {
  heading: string;
  body: string;
}
export interface TermsTab {
  id: string;
  title: string;
  description: string;
  items: TermsItem[];
}

/**
 * The terms of service.
 *
 * Revised August 2026 alongside `privacy.ts`, to cover behaviour the March 2024 text predated:
 * the optional AI search (and that its answers are not religious rulings), phone-to-phone
 * sync, and the licensing of the Quran, hadith and dua content the app ships.
 *
 * Deliberately left alone: the "Intellectual Property" and "Restrictions" clauses, which
 * forbid reverse engineering while the app's source sits on GitHub. That tension is real —
 * see `docs/audits/2026-08-05-app-site-parity-audit.md` §5 — but resolving it is a licensing
 * decision for the developer to make, not a copy fix.
 *
 * Keep `effective` in step with any edit here, and regenerate
 * `public/legal/Terms-and-Conditions.pdf`.
 */
export const terms = {
  effective: 'August 5, 2026',
  tabs: [
    {
      id: 'general',
      title: 'General Terms of Use',
      description:
        'These Terms of Service govern your use of the Nimaz mobile application, a personal project created by Arshad Shah. By downloading or using Nimaz, you agree to these terms.',
      items: [
        {
          heading: 'Personal Project Status',
          body: "Nimaz is a free application developed as a personal project to serve the Muslim community. It is not associated with any commercial entity or organization and is provided on an 'as is' basis without warranty of any kind.",
        },
        {
          heading: 'Service Description',
          body: 'Nimaz provides Islamic prayer times, Qibla direction, Quran reading, and other Islamic tools. While we strive for accuracy, the information provided should be verified with your local mosque or Islamic authority, especially for significant religious practices.',
        },
        {
          heading: 'Free Service',
          body: 'Nimaz is provided free of charge. There are no subscription fees or hidden costs for using the core features of the application.',
        },
        {
          heading: 'User Responsibility',
          body: 'Users are responsible for ensuring their device meets the minimum system requirements for running Nimaz. Users should also verify prayer times with local authorities, particularly during Ramadan or for important religious observances.',
        },
        {
          heading: 'Not Religious Guidance',
          body: 'Nimaz is a tool, not a scholar. Prayer times, Qibla bearings, calendar dates, zakat figures and the answers produced by the optional AI search are all calculated or generated output, offered to help you rather than to rule on anything. None of it is a fatwa. For any matter of religious consequence, consult a qualified scholar or your local masjid.',
        },
        {
          heading: 'Optional Connected Features',
          body: 'Two features reach beyond your device, and both are your choice. The AI-assisted search is disabled until you enable it, and sends only your question text to be answered. Device-to-device sync transfers your data directly between two phones you control. Using either is entirely optional, and the app is fully functional without them.',
        },
      ],
    },
    {
      id: 'license',
      title: 'License Agreement',
      description: 'The terms of license under which you may use Nimaz and its content.',
      items: [
        {
          heading: 'App Usage License',
          body: 'When you download and use Nimaz, you are granted a limited, non-exclusive, non-transferable license to use the application on your personal devices. This license is solely for your personal, non-commercial use.',
        },
        {
          heading: 'Intellectual Property',
          body: 'All rights, title, and interest in and to Nimaz (including code, graphics, text, logos, and sounds) are owned by the developer. The Quran text, translations, and recitations are provided under their respective licenses and copyrights.',
        },
        {
          heading: 'Restrictions',
          body: 'You may not modify, reverse engineer, decompile, or attempt to extract the source code of the application. Redistribution, selling, or leasing any part of the app is prohibited without explicit permission.',
        },
        {
          heading: 'User Content',
          body: 'Any notes, bookmarks, or customizations you create within the app remain your property. However, you grant the app the necessary rights to store and display this content as part of providing the service.',
        },
      ],
    },
    {
      id: 'limitations',
      title: 'Limitations & Liability',
      description: 'Understanding the limitations of the service and liability boundaries.',
      items: [
        {
          heading: 'Accuracy of Information',
          body: 'While we strive to provide accurate prayer times and Qibla directions, many factors can affect accuracy including location services, calculation methods, and device sensors. Users should verify critical information with local authorities.',
        },
        {
          heading: 'AI-Generated Answers',
          body: 'The optional AI search can be wrong, incomplete, or misleading, and it may cite sources that do not support the point being made. It is provided as a starting point for your own reading, which is why every answer shows the verses and hadiths it relies on so you can check them. Do not act on an AI answer alone in any matter of religious practice.',
        },
        {
          heading: 'Service Availability',
          body: 'Nimaz does not guarantee uninterrupted or error-free service. Occasional disruptions may occur due to technical issues, updates, or maintenance. As a personal project, support response times may vary.',
        },
        {
          heading: 'Disclaimer of Warranties',
          body: "The app is provided 'as is' without warranties of any kind, whether express or implied. We do not warrant that the app will meet your requirements or be available on an uninterrupted, secure, or error-free basis.",
        },
        {
          heading: 'Limitation of Liability',
          body: 'To the fullest extent permitted by applicable law, in no event will the developer be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the app.',
        },
      ],
    },
    {
      id: 'updates',
      title: 'Updates & Modifications',
      description: 'How updates are handled and changes to terms are communicated.',
      items: [
        {
          heading: 'App Updates',
          body: 'Periodic updates may be released to improve functionality, add features, or fix bugs. Updates are recommended but typically optional. Your device settings may affect how updates are delivered and installed.',
        },
        {
          heading: 'Feature Changes',
          body: "As a personal project, features may be added, modified, or removed at the developer's discretion. We strive to communicate significant changes through app notifications or update notes.",
        },
        {
          heading: 'Terms Modifications',
          body: 'These Terms of Service may be updated periodically. Continued use of Nimaz after changes constitutes acceptance of the updated terms. Significant changes will be communicated through app notifications.',
        },
        {
          heading: 'Service Discontinuation',
          body: 'While we aim to provide Nimaz indefinitely, as a personal project, the service may be discontinued at any time without prior notice. User data stored locally on devices will remain accessible even if the service is discontinued.',
        },
      ],
    },
  ] satisfies TermsTab[],
  permitted: [
    {
      heading: 'Personal, non-commercial use',
      body: 'Use the app for your personal spiritual needs',
    },
    {
      heading: 'Installation on personal devices',
      body: 'Install on your phones, tablets, and other personal devices',
    },
    {
      heading: 'Creating personal customizations',
      body: 'Customize and personalize settings within the app interface',
    },
    {
      heading: 'Sharing app recommendations',
      body: 'Recommend the app to friends, family and community members',
    },
  ] satisfies TermsItem[],
  prohibited: [
    {
      heading: 'Modification or reverse engineering',
      body: "Attempting to modify, decompile or extract the app's source code",
    },
    {
      heading: 'Commercial exploitation',
      body: 'Using the app for commercial purposes or monetary gain',
    },
    {
      heading: 'Redistribution or reselling',
      body: 'Redistributing, reselling, or repackaging the app in any form',
    },
    {
      heading: 'Using for unlawful purposes',
      body: 'Using the app to conduct any unauthorized or illegal activities',
    },
  ] satisfies TermsItem[],
} as const;

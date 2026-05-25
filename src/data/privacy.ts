export interface PrivacySection {
  title: string;
  body: string;
  highlights: string[];
}
export interface Faq {
  q: string;
  a: string;
}

export const privacy = {
  updated: 'March 2024',
  glance: [
    'Most data stays on your device',
    'Location used only for prayer times & Qibla',
    'No personal data sold or shared',
    'Minimal, anonymous analytics',
    'Full control over your permissions',
    'Simple, transparent data practices',
  ],
  sections: [
    {
      title: 'Our Privacy Commitment',
      body: 'Nimaz is designed with your privacy as a top priority. As a personal project created to serve the Muslim community, this app is provided at no cost and uses minimal personal information. Most data stays on your device, with limited information collected solely to improve app functionality and user experience.',
      highlights: [
        'Privacy-first approach',
        'Free service with no data selling',
        'Minimal data collection',
      ],
    },
    {
      title: 'Information We Collect',
      body: 'The Nimaz app primarily uses on-device storage for your preferences and settings. Location data (when permitted) is used solely for calculating accurate prayer times and determining Qibla direction, and is not stored on our servers. We collect limited anonymous usage statistics to improve app functionality.',
      highlights: [
        'Location data (for prayer times & Qibla)',
        'App preferences and settings',
        'Anonymous usage statistics',
      ],
    },
    {
      title: 'How We Use Your Information',
      body: 'Your information is used exclusively to provide accurate prayer times, show correct Qibla direction, and offer personalized app experiences. Anonymous usage data helps us identify areas for improvement and ensure optimal performance. We do not use your data for advertising or share it with third parties for marketing purposes.',
      highlights: [
        'Providing accurate prayer times',
        'Determining Qibla direction',
        'App improvement and optimization',
      ],
    },
    {
      title: 'Data Storage & Security',
      body: 'We prioritize the security of your limited data through industry-standard protocols. Most user data remains locally on your device rather than on our servers. The minimal data we do collect is stored securely with proper encryption and access controls to prevent unauthorized access.',
      highlights: [
        'Local storage on your device',
        'Secure transmission protocols',
        'Limited server-side storage',
      ],
    },
    {
      title: 'Third-Party Services',
      body: 'Nimaz uses select third-party services that are essential for core functionality. These include Google Play Services for core Android functionality and Firebase for analytics and crash reporting. Each service has its own privacy policy that we encourage you to review. We carefully select providers that align with our privacy values.',
      highlights: ['Google Play Services', 'Firebase Analytics', 'Firebase Crashlytics'],
    },
    {
      title: 'User Control & Rights',
      body: 'You maintain control over your data with Nimaz. Location permissions can be granted or revoked at any time through your device settings. You can disable anonymous analytics collection through the app settings. We respect your right to privacy and provide clear options for managing how your information is used.',
      highlights: [
        'Location permission controls',
        'Analytics opt-out option',
        'Clear data management',
      ],
    },
    {
      title: 'Policy Updates',
      body: 'This privacy policy may be updated periodically to reflect app improvements or regulatory changes. Significant changes will be communicated through app notifications. We encourage you to review the privacy policy occasionally to stay informed about how your information is protected.',
      highlights: ['Periodic updates', 'Change notifications', 'Last updated: March 2024'],
    },
  ] satisfies PrivacySection[],
  faqs: [
    {
      q: 'Does Nimaz track my location when the app is closed?',
      a: "No, Nimaz only accesses your location when the app is open and you've granted permission. Location data is used solely for calculating accurate prayer times and Qibla direction. The app does not perform background location tracking, which helps conserve your device's battery life as well.",
    },
    {
      q: 'Does Nimaz share my data with third parties?',
      a: "Nimaz does not share or sell your personal data with third parties for marketing purposes. The only third-party services we use are essential for app functionality, such as Google Play Services and Firebase for analytics and crash reporting. These services help us improve the app's performance and stability.",
    },
    {
      q: 'Can I use Nimaz without granting location permissions?',
      a: "Yes, you can still use Nimaz without location permissions. You'll need to manually enter your location for prayer time calculations, and some features like automatic Qibla direction may have limited functionality. We've designed the app to be functional even without access to your device's location services.",
    },
    {
      q: 'How can I delete my data from Nimaz?',
      a: 'Since most data is stored locally on your device, you can clear app data through your device settings. For the minimal information stored on our servers, you can contact us directly for data deletion requests. We process all data deletion requests promptly and in accordance with applicable privacy laws.',
    },
    {
      q: 'How accurate are the prayer times without location services?',
      a: "Prayer times calculated with manually entered locations are still highly accurate. Our calculations use standard astronomical methods approved by Islamic scholars. However, for the most precise times, especially if you're traveling, allowing location access will provide automatic updates based on your current position.",
    },
    {
      q: 'Does Nimaz collect data about my prayer habits?',
      a: "No, Nimaz does not track or analyze your individual prayer habits. While the app provides prayer time notifications, we don't monitor whether you interact with these notifications or use the app's prayer tracking features. All prayer tracking functionality is processed locally on your device.",
    },
    {
      q: 'Is my data encrypted when stored or transmitted?',
      a: "Yes, we implement industry-standard encryption for the limited data that is transmitted between your device and our servers. For local storage, we utilize your device's built-in security mechanisms. Server-side data is protected with modern encryption standards and regular security audits.",
    },
  ] satisfies Faq[],
} as const;

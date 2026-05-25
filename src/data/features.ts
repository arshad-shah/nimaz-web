export interface Feature {
  icon: string; // lucide icon name
  title: string;
  body: string;
  accent: 'primary' | 'gold' | 'purple';
}

export const features: Feature[] = [
  {
    icon: 'clock',
    title: 'Accurate Prayer Times',
    body: 'Get precise prayer times based on your location using advanced astronomical calculations. Supports multiple calculation methods including Muslim World League, ISNA, Egyptian, Umm Al-Qura, and more.',
    accent: 'primary',
  },
  {
    icon: 'compass',
    title: 'Qibla Direction',
    body: "Find the direction of the Kaaba in Mecca with our precise Qibla compass. Uses your device's location and magnetometer for accurate readings anywhere in the world.",
    accent: 'gold',
  },
  {
    icon: 'calendar',
    title: 'Islamic Calendar',
    body: 'Track important Islamic dates and events with our Hijri calendar. Easily convert between Gregorian and Hijri dates, and receive notifications for significant Islamic events.',
    accent: 'purple',
  },
  {
    icon: 'book-open',
    title: 'Quran Reader with Tafsir',
    body: 'Read, listen, and search the Holy Quran with translations in multiple languages and comprehensive Tafsir (exegesis). Access renowned interpretations by Ibn Kathir. Includes bookmarking, note-taking, and audio recitation.',
    accent: 'primary',
  },
  {
    icon: 'bell',
    title: 'Adhan Notifications',
    body: 'Receive beautiful adhan notifications for each prayer time. Customize your adhan notification settings according to your preferences.',
    accent: 'gold',
  },
  {
    icon: 'scroll-text',
    title: 'Hadith Collection',
    body: "Access all major authentic Hadith collections including Sahih Bukhari, Sahih Muslim, Sunan Abu Dawood, Jami' at-Tirmidhi, Sunan an-Nasa'i, and Sunan Ibn Majah. Save favorites, and share inspirational sayings of Prophet Muhammad (PBUH) with loved ones.",
    accent: 'purple',
  },
];

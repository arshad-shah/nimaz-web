export interface Stat {
  value: string;
  label: string;
}

export const stats: Stat[] = [
  { value: '99.9%', label: 'Prayer Time Accuracy' },
  { value: '±0.5°', label: 'Qibla Precision' },
  { value: '18', label: 'Calculation Methods' },
  { value: '9', label: 'Hadith Collections' },
];

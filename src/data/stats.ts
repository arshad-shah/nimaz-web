export interface Stat {
  value: string;
  label: string;
}

export const stats: Stat[] = [
  { value: '99.9%', label: 'Prayer time accuracy' },
  { value: '±0.5°', label: 'Qibla precision' },
  { value: '18', label: 'Calculation methods' },
  { value: '6', label: 'Hadith collections' },
];

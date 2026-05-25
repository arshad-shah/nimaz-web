import { describe, it, expect } from 'vitest';
import { getPrayerSchedule, DEFAULT_LOCATION, type PrayerKey } from '../prayer';

describe('getPrayerSchedule', () => {
  const date = new Date('2024-04-01T09:00:00Z');

  it('returns the six prayers in order with the default location', () => {
    const s = getPrayerSchedule({ location: DEFAULT_LOCATION, date });
    expect(s.prayers.map((p) => p.key)).toEqual<PrayerKey[]>([
      'fajr',
      'sunrise',
      'dhuhr',
      'asr',
      'maghrib',
      'isha',
    ]);
    s.prayers.forEach((p) => expect(p.time).toBeInstanceOf(Date));
  });

  it('marks exactly one prayer as next', () => {
    const s = getPrayerSchedule({ location: DEFAULT_LOCATION, date });
    expect(s.prayers.filter((p) => p.isNext)).toHaveLength(1);
  });

  it('assigns each prayer its accent color token', () => {
    const s = getPrayerSchedule({ location: DEFAULT_LOCATION, date });
    expect(s.prayers.find((p) => p.key === 'fajr')?.color).toBe('var(--c-fajr)');
  });

  it('identifies the correct next prayer for the given date/time', () => {
    const s = getPrayerSchedule({ location: DEFAULT_LOCATION, date });
    expect(s.next?.key).toBe('asr');
  });
});

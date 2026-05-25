import { Coordinates, CalculationMethod, PrayerTimes } from 'adhan';

export type PrayerKey = 'fajr' | 'sunrise' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';

export interface GeoLocation {
  latitude: number;
  longitude: number;
  label: string;
}

export interface PrayerEntry {
  key: PrayerKey;
  name: string;
  time: Date;
  color: string;
  isNext: boolean;
}

export interface PrayerSchedule {
  location: GeoLocation;
  date: Date;
  prayers: PrayerEntry[];
  next: PrayerEntry | null;
}

export const DEFAULT_LOCATION: GeoLocation = {
  latitude: 25.276987,
  longitude: 55.296249,
  label: 'Dubai, UAE',
};

const META: Record<PrayerKey, { name: string; color: string }> = {
  fajr: { name: 'Fajr', color: 'var(--c-fajr)' },
  sunrise: { name: 'Sunrise', color: 'var(--c-sunrise)' },
  dhuhr: { name: 'Dhuhr', color: 'var(--c-dhuhr)' },
  asr: { name: 'Asr', color: 'var(--c-asr)' },
  maghrib: { name: 'Maghrib', color: 'var(--c-maghrib)' },
  isha: { name: 'Isha', color: 'var(--c-isha)' },
};

export function getPrayerSchedule(opts: { location?: GeoLocation; date?: Date }): PrayerSchedule {
  const location = opts.location ?? DEFAULT_LOCATION;
  const date = opts.date ?? new Date();
  const coords = new Coordinates(location.latitude, location.longitude);
  const params = CalculationMethod.MoonsightingCommittee();
  const pt = new PrayerTimes(coords, date, params);

  const times: Record<PrayerKey, Date> = {
    fajr: pt.fajr,
    sunrise: pt.sunrise,
    dhuhr: pt.dhuhr,
    asr: pt.asr,
    maghrib: pt.maghrib,
    isha: pt.isha,
  };

  const order: PrayerKey[] = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];

  // nextPrayer() returns lowercase strings matching PrayerKey, or 'none' after Isha.
  // Verified against adhan 4.4.3 Prayer enum: { Fajr: "fajr", Sunrise: "sunrise", ... None: "none" }
  const nextName = pt.nextPrayer();
  const nextKey = order.find((k) => k === nextName) ?? null;

  const prayers: PrayerEntry[] = order.map((key) => ({
    key,
    name: META[key].name,
    time: times[key],
    color: META[key].color,
    isNext: key === nextKey,
  }));

  // If nextPrayer() returns "none" (after Isha), the next is tomorrow's Fajr — mark Fajr.
  if (!prayers.some((p) => p.isNext)) {
    const fajr = prayers.find((p) => p.key === 'fajr');
    if (fajr) fajr.isNext = true;
  }

  return { location, date, prayers, next: prayers.find((p) => p.isNext) ?? null };
}

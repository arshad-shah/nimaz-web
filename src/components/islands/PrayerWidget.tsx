import { useEffect, useMemo, useState } from 'react';
import { getPrayerSchedule, DEFAULT_LOCATION, type GeoLocation } from '../../lib/prayer';

function useNow(active: boolean) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    if (!active) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const id = setInterval(() => setNow(new Date()), reduce ? 60_000 : 1000);
    return () => clearInterval(id);
  }, [active]);
  return now;
}

function fmt(d: Date) {
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function countdown(target: Date, now: Date) {
  let diff = Math.max(0, Math.floor((target.getTime() - now.getTime()) / 1000));
  const h = Math.floor(diff / 3600);
  diff %= 3600;
  const m = Math.floor(diff / 60);
  const s = diff % 60;
  return [h, m, s].map((n) => String(n).padStart(2, '0')).join(':');
}

export default function PrayerWidget() {
  const [location, setLocation] = useState<GeoLocation>(DEFAULT_LOCATION);
  const [status, setStatus] = useState<'idle' | 'locating' | 'denied'>('idle');
  const now = useNow(true);
  const schedule = useMemo(() => getPrayerSchedule({ location, date: now }), [location, now]);
  const next = schedule.next;

  function useMyLocation() {
    if (!('geolocation' in navigator)) return setStatus('denied');
    setStatus('locating');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          label: 'Your location',
        });
        setStatus('idle');
      },
      () => setStatus('denied'),
      { enableHighAccuracy: false, timeout: 8000 },
    );
  }

  return (
    <div className="rounded-2xl border border-[var(--outline)] bg-[var(--surface)] p-5">
      <div className="mb-4 flex items-baseline justify-between">
        <p className="text-xs font-semibold text-[var(--muted)]">
          {next ? `NEXT · ${next.name.toUpperCase()} IN` : 'PRAYER TIMES'}
        </p>
        {next && (
          <p className="font-display text-2xl font-bold text-[var(--c-accent-text)]">
            {countdown(next.time, now)}
          </p>
        )}
      </div>
      <ul aria-label="Prayer times" className="space-y-2">
        {schedule.prayers.map((p) => (
          <li
            key={p.key}
            className="flex items-center justify-between rounded-xl bg-[var(--surface-2)] px-3.5 py-2.5 text-sm"
            style={{
              borderLeft: `3px solid ${p.color}`,
              ...(p.isNext ? { background: 'var(--c-highlight)' } : {}),
            }}
          >
            <span className="font-semibold">{p.name}</span>
            <span className="font-display font-bold">{fmt(p.time)}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-xs text-[var(--muted)]">{location.label}</p>
        <button
          type="button"
          onClick={useMyLocation}
          className="rounded-full border border-[var(--outline)] px-3 py-1.5 text-xs font-semibold hover:bg-[var(--surface-2)]"
        >
          {status === 'locating' ? 'Locating…' : 'Use my location'}
        </button>
      </div>
      {status === 'denied' && (
        <p className="mt-2 text-xs text-[var(--c-maghrib)]">
          Couldn't get location — showing {location.label}.
        </p>
      )}
      <p className="mt-2 text-xs text-[var(--muted)]">
        Your location is used only in your browser. Nothing is stored or sent.
      </p>
    </div>
  );
}

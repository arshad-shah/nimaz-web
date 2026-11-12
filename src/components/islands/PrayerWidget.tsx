import { useEffect, useMemo, useState } from 'react';
import { Button, Card, Inline, Notice, Stack, Text } from '@arshad-shah/cynosure';
import { locate } from '@arshad-shah/cynosure/icons';
import { PrayerList } from '../PrayerList';
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

  function requestLocation() {
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
    <Card padding="lg">
      <Stack gap="5">
        <Inline justify="between" align="center">
          <Text variant="eyebrow">{next ? `Next · ${next.name} in` : 'Prayer times'}</Text>
          {next && (
            <Text numeric weight="bold" size="2xl" tone="accent">
              {countdown(next.time, now)}
            </Text>
          )}
        </Inline>
        <PrayerList prayers={schedule.prayers} />
        <Inline justify="between" align="center">
          <Text variant="caption">{location.label}</Text>
          <Button size="sm" icon={locate} loading={status === 'locating'} onClick={requestLocation}>
            Use my location
          </Button>
        </Inline>
        {status === 'denied' && (
          <Notice tone="danger">Couldn't get location — showing {location.label}.</Notice>
        )}
        <Text variant="caption">
          Your location is used only in your browser. Nothing is stored or sent.
        </Text>
      </Stack>
    </Card>
  );
}

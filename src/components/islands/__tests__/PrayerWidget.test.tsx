import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import PrayerWidget from '../PrayerWidget';

describe('PrayerWidget', () => {
  it('renders the default location and all six prayers', () => {
    render(<PrayerWidget />);
    expect(screen.getByText(/Dubai/i)).toBeInTheDocument();
    const list = screen.getByRole('list', { name: /prayer times/i });
    ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].forEach((n) =>
      expect(within(list).getByText(n)).toBeInTheDocument(),
    );
  });

  it('exposes a button to use device location', () => {
    render(<PrayerWidget />);
    expect(screen.getByRole('button', { name: /use my location/i })).toBeInTheDocument();
  });
});

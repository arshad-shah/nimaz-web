import { describe, it, expect } from 'vitest';
import { site, PLAY_STORE_URL } from '../site';

describe('site config', () => {
  it('points at the real Play Store listing', () => {
    expect(PLAY_STORE_URL).toBe(
      'https://play.google.com/store/apps/details?id=com.arshadshah.nimaz',
    );
  });
  it('exposes contact + nav', () => {
    expect(site.email).toBe('info@arshadshah.com');
    expect(site.nav.map((n) => n.href)).toContain('/features');
  });
});

import { describe, it, expect } from 'vitest';
import { resolveTheme, nextTheme, type Theme } from '../theme';

describe('theme resolution', () => {
  it('prefers a stored value', () => {
    expect(resolveTheme('dark', false)).toBe('dark');
    expect(resolveTheme('light', true)).toBe('light');
  });
  it('falls back to system preference', () => {
    expect(resolveTheme(null, true)).toBe('dark');
    expect(resolveTheme(null, false)).toBe('light');
  });
  it('toggles', () => {
    expect(nextTheme('light')).toBe<Theme>('dark');
    expect(nextTheme('dark')).toBe<Theme>('light');
  });
});

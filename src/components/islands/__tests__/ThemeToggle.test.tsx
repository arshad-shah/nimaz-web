import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeToggle from '../ThemeToggle';
import { THEME_STORAGE_KEY } from '../../../lib/theme';

beforeEach(() => {
  localStorage.clear();
  document.documentElement.dataset.theme = 'light';
});

describe('ThemeToggle', () => {
  it('toggles the html data-theme and persists', async () => {
    render(<ThemeToggle />);
    const btn = screen.getByRole('button', { name: /theme/i });
    await userEvent.click(btn);
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
    await userEvent.click(btn);
    expect(document.documentElement.dataset.theme).toBe('light');
  });
});

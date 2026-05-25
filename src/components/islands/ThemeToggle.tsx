import { useEffect, useState } from 'react';
import { nextTheme, THEME_STORAGE_KEY, type Theme } from '../../lib/theme';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const current = (document.documentElement.dataset.theme as Theme) ?? 'light';
    setTheme(current);
  }, []);

  function toggle() {
    const value = nextTheme(theme);
    setTheme(value);
    document.documentElement.dataset.theme = value;
    localStorage.setItem(THEME_STORAGE_KEY, value);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      className="grid size-9 place-items-center rounded-full border border-[var(--outline)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--text)]"
    >
      {theme === 'dark' ? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />
        </svg>
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      )}
    </button>
  );
}

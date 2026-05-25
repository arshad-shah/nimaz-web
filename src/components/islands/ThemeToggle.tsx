import { nextTheme, THEME_STORAGE_KEY, type Theme } from '../../lib/theme';

/**
 * Stateless theme toggle. The current theme lives on <html data-theme> (set
 * before paint by the inline bootstrap in the base layout), so the icon is
 * driven purely by CSS (`dark:` variant) — no React state, no hydration flash.
 */
export default function ThemeToggle() {
  function toggle() {
    const current: Theme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    const value = nextTheme(current);
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
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
        className="dark:hidden"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
        className="hidden dark:block"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />
      </svg>
    </button>
  );
}

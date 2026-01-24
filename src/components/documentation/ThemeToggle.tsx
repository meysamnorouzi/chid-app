/**
 * ThemeToggle Component
 * 
 * Toggle component for switching between light and dark themes in documentation
 * Designed with accessibility, SEO, and modular structure in mind
 */

import { useDocumentationTheme } from '../../theme';

const ThemeToggle = () => {
  const { themeMode, toggleTheme, theme } = useDocumentationTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
      style={{
        border: `1px solid ${theme.colors.gray[300]}`,
        color: theme.colors.gray[600],
        backgroundColor: theme.background.body,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = theme.colors.gray[200];
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = theme.background.body;
      }}
      aria-label={`Switch to ${themeMode === 'light' ? 'dark' : 'light'} theme`}
      title={`Switch to ${themeMode === 'light' ? 'dark' : 'light'} theme`}
    >
      {themeMode === 'light' ? (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      ) : (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      )}
      <kbd
        className="px-1.5 py-0.5 text-xs font-medium rounded"
        style={{
          backgroundColor: theme.colors.gray[200],
          color: theme.colors.gray[700],
          border: `1px solid ${theme.colors.gray[300]}`,
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {navigator.platform.toLowerCase().includes('mac') ? '⌥⌘T' : 'Alt+Ctrl+T'}
      </kbd>
    </button>
  );
};

export default ThemeToggle;


/**
 * DocumentationThemeProvider Component
 * 
 * Special theme provider for documentation section
 * Applies documentation theme when in documentation routes
 * Supports light and dark theme modes
 */

import { useEffect, useLayoutEffect, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { DocumentationThemeContext, documentationThemes, type DocumentationThemeMode } from './DocumentationThemeContext';
import type { ThemeConfig } from './themeConfig';

interface DocumentationThemeProviderProps {
  children: ReactNode;
}

/**
 * DocumentationThemeProvider Component
 * 
 * Applies documentation theme CSS variables with light/dark mode support
 * Persists theme selection across page refreshes
 */
export const DocumentationThemeProvider = ({ children }: DocumentationThemeProviderProps) => {
  const [themeMode, setThemeMode] = useLocalStorage<DocumentationThemeMode>('documentation-theme-mode', 'light');
  const theme: ThemeConfig = documentationThemes[themeMode];

  // Use useLayoutEffect to apply theme synchronously before browser paint
  // This ensures theme is applied immediately on mount and refresh
  // Theme is persisted in localStorage and will be restored on page refresh
  useLayoutEffect(() => {
    const root = document.documentElement;
    
    // Add or remove dark class based on theme mode
    if (themeMode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Apply CSS variables for gray colors
    Object.entries(theme.colors.gray).forEach(([key, value]) => {
      root.style.setProperty(`--tw-gray-${key}`, value);
    });

    // Apply CSS variables for primary colors
    Object.entries(theme.colors.primary).forEach(([key, value]) => {
      root.style.setProperty(`--tw-primary${key === 'default' ? '' : `-${key}`}`, value);
    });

    // Apply CSS variables for success colors
    Object.entries(theme.colors.success).forEach(([key, value]) => {
      root.style.setProperty(`--tw-success${key === 'default' ? '' : `-${key}`}`, value);
    });

    // Apply CSS variables for warning colors
    Object.entries(theme.colors.warning).forEach(([key, value]) => {
      root.style.setProperty(`--tw-warning${key === 'default' ? '' : `-${key}`}`, value);
    });

    // Apply CSS variables for danger colors
    Object.entries(theme.colors.danger).forEach(([key, value]) => {
      root.style.setProperty(`--tw-danger${key === 'default' ? '' : `-${key}`}`, value);
    });

    // Apply CSS variables for info colors
    Object.entries(theme.colors.info).forEach(([key, value]) => {
      root.style.setProperty(`--tw-info${key === 'default' ? '' : `-${key}`}`, value);
    });

    // Apply CSS variables for dark colors
    Object.entries(theme.colors.dark).forEach(([key, value]) => {
      root.style.setProperty(`--tw-dark${key === 'default' ? '' : `-${key}`}`, value);
    });

    // Apply CSS variables for secondary colors
    Object.entries(theme.colors.secondary).forEach(([key, value]) => {
      root.style.setProperty(`--tw-secondary${key === 'default' ? '' : `-${key}`}`, value);
    });

    // Apply CSS variables for light colors
    Object.entries(theme.colors.light).forEach(([key, value]) => {
      root.style.setProperty(`--tw-light${key === 'default' ? '' : `-${key}`}`, value);
    });

    // Apply CSS variables for brand colors
    Object.entries(theme.colors.brand).forEach(([key, value]) => {
      root.style.setProperty(`--tw-brand${key === 'default' ? '' : `-${key}`}`, value);
    });

    // Apply CSS variables for box shadows
    Object.entries(theme.boxShadows).forEach(([key, value]) => {
      root.style.setProperty(`--tw-${key}-box-shadow`, value);
    });

    // Apply background color to root and body
    root.style.setProperty('--tw-body-bg', theme.background.body);
    root.style.backgroundColor = theme.background.body;
    
    // Also apply to body element
    const body = document.body;
    if (body) {
      body.style.backgroundColor = theme.background.body;
    }

    // Dispatch event to notify that documentation theme is active
    window.dispatchEvent(new CustomEvent('documentation-theme-active'));
  }, [themeMode, theme]);

  // Cleanup function to restore original theme when component unmounts
  useEffect(() => {
    return () => {
      // Dispatch event to notify that documentation theme should be removed
      window.dispatchEvent(new CustomEvent('documentation-theme-inactive'));
    };
  }, []);

  const setTheme = (mode: DocumentationThemeMode) => {
    setThemeMode(mode);
  };

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const value = {
    theme,
    themeMode,
    setTheme,
    toggleTheme,
  };

  return (
    <DocumentationThemeContext.Provider value={value}>
      {children}
    </DocumentationThemeContext.Provider>
  );
};


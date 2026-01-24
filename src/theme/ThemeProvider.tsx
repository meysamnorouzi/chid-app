/**
 * ThemeProvider Component
 * 
 * Context Provider for managing project theme
 * With localStorage persistence capability
 */

import { createContext, useContext, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { defaultTheme, themes } from './themeConfig';
import type { ThemeMode, ThemeConfig } from './themeConfig';

interface ThemeContextType {
  theme: ThemeConfig;
  themeMode: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * ThemeProvider Component
 * 
 * Manages theme state and applies CSS variable changes
 */
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [themeMode, setThemeMode] = useLocalStorage<ThemeMode>(
    'theme-mode',
    defaultTheme
  );

  const theme = themes[themeMode];

  /**
   * Apply CSS variables based on selected theme
   */
  const applyTheme = useCallback(() => {
    const root = document.documentElement;
    
    // Apply dark class for Tailwind
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

    // Apply background color
    root.style.setProperty('--tw-body-bg', theme.background.body);
    root.style.backgroundColor = theme.background.body;
  }, [theme, themeMode]);

  useEffect(() => {
    applyTheme();
  }, [applyTheme]);

  // Listen for documentation theme events to restore original theme
  useEffect(() => {
    const handleDocumentationThemeInactive = () => {
      // Small delay to ensure DocumentationThemeProvider cleanup is done
      setTimeout(() => {
        applyTheme();
      }, 0);
    };

    window.addEventListener('documentation-theme-inactive', handleDocumentationThemeInactive);

    return () => {
      window.removeEventListener('documentation-theme-inactive', handleDocumentationThemeInactive);
    };
  }, [applyTheme]);

  const setTheme = (mode: ThemeMode) => {
    setThemeMode(mode);
  };

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const value: ThemeContextType = {
    theme,
    themeMode,
    setTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook for using ThemeContext
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};


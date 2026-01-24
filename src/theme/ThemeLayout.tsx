/**
 * ThemeLayout Component
 * 
 * Layout component for applying theme to content
 * This component is a wrapper for main content
 */

import type { ReactNode } from 'react';
import { useTheme } from './ThemeProvider';

interface ThemeLayoutProps {
  children: ReactNode;
}

/**
 * ThemeLayout Component
 * 
 * Applies theme to main content
 * Includes background color and transition for theme changes
 */
const ThemeLayout = ({ children }: ThemeLayoutProps) => {
  const { theme } = useTheme();

  return (
    <div className="desktop-wrapper">
      <div
        className="app-shell transition-colors duration-300"
        style={{
          backgroundColor: theme.background.body,
          color: theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.dark.default,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ThemeLayout;


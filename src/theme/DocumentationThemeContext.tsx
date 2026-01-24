/**
 * Documentation Theme Context
 * 
 * Context for managing documentation theme (light/dark)
 */

import { createContext, useContext } from 'react';
import { documentationTheme } from './themes/documentationTheme';
import { documentationDarkTheme } from './themes/documentationDarkTheme';
import type { ThemeConfig } from './themeConfig';

export type DocumentationThemeMode = 'light' | 'dark';

interface DocumentationThemeContextType {
  theme: ThemeConfig;
  themeMode: DocumentationThemeMode;
  setTheme: (mode: DocumentationThemeMode) => void;
  toggleTheme: () => void;
}

export const DocumentationThemeContext = createContext<DocumentationThemeContextType | undefined>(undefined);

export const useDocumentationTheme = () => {
  const context = useContext(DocumentationThemeContext);
  if (!context) {
    throw new Error('useDocumentationTheme must be used within DocumentationThemeProvider');
  }
  return context;
};

export const documentationThemes: Record<DocumentationThemeMode, ThemeConfig> = {
  light: documentationTheme,
  dark: documentationDarkTheme,
};

export type { DocumentationThemeContextType };


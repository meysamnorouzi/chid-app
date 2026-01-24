/**
 * Theme Configuration
 * 
 * Project theme settings
 * Includes two themes: light (white) and dark (black)
 */

import { lightTheme, darkTheme } from './themes';

export type ThemeMode = 'light' | 'dark';

export interface ThemeConfig {
  mode: ThemeMode;
  name: string;
  label: string;
  colors: {
    gray: {
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    primary: {
      default: string;
      active: string;
      light: string;
      clarity: string;
      inverse: string;
    };
    success: {
      default: string;
      active: string;
      light: string;
      clarity: string;
      inverse: string;
    };
    warning: {
      default: string;
      active: string;
      light: string;
      clarity: string;
      inverse: string;
    };
    danger: {
      default: string;
      active: string;
      light: string;
      clarity: string;
      inverse: string;
    };
    info: {
      default: string;
      active: string;
      light: string;
      clarity: string;
      inverse: string;
    };
    dark: {
      default: string;
      active: string;
      light: string;
      clarity: string;
      inverse: string;
    };
    secondary: {
      default: string;
      active: string;
      light: string;
      clarity: string;
      inverse: string;
    };
    light: {
      default: string;
      active: string;
      light: string;
      clarity: string;
      inverse: string;
    };
    brand: {
      default: string;
      active: string;
      light: string;
      clarity: string;
      inverse: string;
    };
  };
  boxShadows: {
    default: string;
    light: string;
    primary: string;
    success: string;
    danger: string;
    info: string;
    warning: string;
    dark: string;
  };
  background: {
    body: string;
    card: string;
  };
}

/**
 * All available themes
 */
export const themes: Record<ThemeMode, ThemeConfig> = {
  light: lightTheme,
  dark: darkTheme,
};

/**
 * Default theme (dark/black)
 */
export const defaultTheme: ThemeMode = 'dark';


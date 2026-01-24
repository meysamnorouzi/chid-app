/**
 * Documentation Theme Configuration
 * 
 * Special theme for documentation section
 * Optimized for reading and documentation display
 */

import type { ThemeConfig } from '../themeConfig';

export const documentationTheme: ThemeConfig = {
  mode: 'light',
  name: 'light',
  label: 'Documentation',
  colors: {
    gray: {
      100: '#F9F9F9',
      200: '#F1F1F4',
      300: '#DBDFE9',
      400: '#C4CADA',
      500: '#99A1B7',
      600: '#78829D',
      700: '#4B5675',
      800: '#252F4A',
      900: '#071437',
    },
    primary: {
      default: '#2e65e2',
      active: '#1d4ed8',
      light: '#DBEAFE',
      clarity: 'rgba(46, 101, 226, 0.20)',
      inverse: '#ffffff',
    },
    success: {
      default: '#17C653',
      active: '#04B440',
      light: '#EAFFF1',
      clarity: 'rgba(23, 198, 83, 0.20)',
      inverse: '#ffffff',
    },
    warning: {
      default: '#F6B100',
      active: '#DFA000',
      light: '#FFF8DD',
      clarity: 'rgba(246, 177, 0, 0.20)',
      inverse: '#ffffff',
    },
    danger: {
      default: '#F8285A',
      active: '#D81A48',
      light: '#FFEEF3',
      clarity: 'rgba(248, 40, 90, 0.20)',
      inverse: '#ffffff',
    },
    info: {
      default: '#7239EA',
      active: '#5014D0',
      light: '#F8F5FF',
      clarity: 'rgba(114, 57, 234, 0.20)',
      inverse: '#ffffff',
    },
    dark: {
      default: '#1E2129',
      active: '#111318',
      light: '#F9F9F9',
      clarity: 'rgba(30, 33, 41, 0.20)',
      inverse: '#ffffff',
    },
    secondary: {
      default: '#F9F9F9',
      active: '#F9F9F9',
      light: '#F9F9F9',
      clarity: 'rgba(249, 249, 249, 0.20)',
      inverse: '#4B5675',
    },
    light: {
      default: '#ffffff',
      active: '#FCFCFC',
      light: '#ffffff',
      clarity: 'rgba(255, 255, 255, 0.20)',
      inverse: '#4B5675',
    },
    brand: {
      default: '#FF6F1E',
      active: '#F15700',
      light: '#FFF5EF',
      clarity: 'rgba(255, 111, 30, 0.20)',
      inverse: '#ffffff',
    },
  },
  boxShadows: {
    default: '0px 4px 12px 0px rgba(0, 0, 0, 0.09)',
    light: '0px 3px 4px 0px rgba(0, 0, 0, 0.03)',
    primary: '0px 4px 12px 0px rgba(46, 101, 226, 0.35)',
    success: '0px 4px 12px 0px rgba(53, 189, 100, 0.35)',
    danger: '0px 4px 12px 0px rgba(241, 65, 108, 0.35)',
    info: '0px 4px 12px 0px rgba(114, 57, 234, 0.35)',
    warning: '0px 4px 12px 0px rgba(246, 192, 0, 0.35)',
    dark: '0px 4px 12px 0px rgba(37, 47, 74, 0.35)',
  },
  background: {
    body: '#ffffff',
    card: '#ffffff',
  },
};


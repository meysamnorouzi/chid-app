/**
 * Documentation Dark Theme Configuration
 * 
 * Dark theme for documentation section
 * Optimized for reading and documentation display in dark mode
 */

import type { ThemeConfig } from '../themeConfig';

export const documentationDarkTheme: ThemeConfig = {
  mode: 'dark',
  name: 'dark',
  label: 'Dark',
  colors: {
    gray: {
      100: '#1B1C22',
      200: '#26272F',
      300: '#363843',
      400: '#464852',
      500: '#636674',
      600: '#808290',
      700: '#9A9CAE',
      800: '#B5B7C8',
      900: '#F5F5F5',
    },
    primary: {
      default: '#2e65e2',
      active: '#4d7ff0',
      light: '#1a3d8f',
      clarity: 'rgba(46, 101, 226, 0.20)',
      inverse: '#ffffff',
    },
    success: {
      default: '#17C653',
      active: '#1dd95e',
      light: '#0f7a33',
      clarity: 'rgba(23, 198, 83, 0.20)',
      inverse: '#ffffff',
    },
    warning: {
      default: '#F6B100',
      active: '#ffc220',
      light: '#8f6900',
      clarity: 'rgba(246, 177, 0, 0.20)',
      inverse: '#ffffff',
    },
    danger: {
      default: '#F8285A',
      active: '#ff4d7a',
      light: '#941836',
      clarity: 'rgba(248, 40, 90, 0.20)',
      inverse: '#ffffff',
    },
    info: {
      default: '#7239EA',
      active: '#8d5aed',
      light: '#43228c',
      clarity: 'rgba(114, 57, 234, 0.20)',
      inverse: '#ffffff',
    },
    dark: {
      default: '#1E2129',
      active: '#111318',
      light: '#1B1C22',
      clarity: 'rgba(30, 33, 41, 0.20)',
      inverse: '#ffffff',
    },
    secondary: {
      default: '#363843',
      active: '#464852',
      light: '#363843',
      clarity: 'rgba(54, 56, 67, 0.20)',
      inverse: '#9A9CAE',
    },
    light: {
      default: '#1F212A',
      active: '#1F212A',
      light: '#1F212A',
      clarity: 'rgba(31, 33, 42, 0.20)',
      inverse: '#9A9CAE',
    },
    brand: {
      default: '#FF6F1E',
      active: '#ff8d4d',
      light: '#994211',
      clarity: 'rgba(255, 111, 30, 0.20)',
      inverse: '#ffffff',
    },
  },
  boxShadows: {
    default: '0px 4px 12px 0px rgba(0, 0, 0, 0.30)',
    light: '0px 3px 4px 0px rgba(0, 0, 0, 0.20)',
    primary: '0px 4px 12px 0px rgba(46, 101, 226, 0.40)',
    success: '0px 4px 12px 0px rgba(23, 198, 83, 0.40)',
    danger: '0px 4px 12px 0px rgba(248, 40, 90, 0.40)',
    info: '0px 4px 12px 0px rgba(114, 57, 234, 0.40)',
    warning: '0px 4px 12px 0px rgba(246, 177, 0, 0.40)',
    dark: '0px 4px 12px 0px rgba(0, 0, 0, 0.50)',
  },
  background: {
    body: '#15171C',
    card: '#1B1C22',
  },
};


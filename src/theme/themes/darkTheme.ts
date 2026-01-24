/**
 * Dark Theme Configuration
 * 
 * Dark (black) theme configuration
 */

import type { ThemeConfig } from '../themeConfig';

export const darkTheme: ThemeConfig = {
  mode: 'dark',
  name: 'dark',
  label: 'سیاه',
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
      default: '#7653AE',
      active: '#58318D',
      light: '#D9D4F2',
      clarity: 'rgba(118, 83, 174, 1)',
      inverse: '#ffffff',
    },
    success: {
      default: '#00A261',
      active: '#01BF73',
      light: '#1F2623',
      clarity: 'rgba(0, 162, 97, 0.20)',
      inverse: '#ffffff',
    },
    warning: {
      default: '#C59A00',
      active: '#D9AA00',
      light: '#242320',
      clarity: 'rgba(197, 154, 0, 0.20)',
      inverse: '#ffffff',
    },
    danger: {
      default: '#E42855',
      active: '#FF3767',
      light: '#302024',
      clarity: 'rgba(228, 40, 85, 0.20)',
      inverse: '#ffffff',
    },
    info: {
      default: '#883FFF',
      active: '#9E63FF',
      light: '#272134',
      clarity: 'rgba(136, 63, 255, 0.20)',
      inverse: '#ffffff',
    },
    dark: {
      default: '#272A34',
      active: '#2D2F39',
      light: '#1E2027',
      clarity: 'rgba(39, 42, 52, 0.20)',
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
      default: '#D74E00',
      active: '#F35700',
      light: '#272320',
      clarity: 'rgba(215, 78, 0, 0.20)',
      inverse: '#ffffff',
    },
  },
  boxShadows: {
    default: 'none',
    light: 'none',
    primary: 'none',
    success: 'none',
    danger: 'none',
    info: 'none',
    warning: 'none',
    dark: 'none',
  },
  background: {
    body: '#15171C',
    card: '#1B1C22',
  },
};


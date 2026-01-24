/**
 * Icon Utilities
 * 
 * Utilities for working with icon font
 */

// @ts-ignore - JSON import
import iconData from '../icon/mon-icon.json';

export interface IconInfo {
  name: string;
  codePoint: number;
  unicode: string;
  className: string;
}

/**
 * Extract icon information from mon-icon.json
 */
export const getIcons = (): IconInfo[] => {
  if (!iconData || !iconData.glyphs) {
    return [];
  }

  return iconData.glyphs.map((glyph: any) => {
    const name = glyph.extras?.name || '';
    const codePoint = glyph.extras?.codePoint || 0;
    const unicode = String.fromCharCode(codePoint);
    
    // Generate class name from icon name
    // Convert "GenericsettingsTypestrokeSize16px" to "icon-genericsettings"
    const className = name
      .replace(/TypestrokeSize\d+px/gi, '')
      .replace(/Generic/gi, '')
      .toLowerCase()
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase();

    return {
      name,
      codePoint,
      unicode,
      className: `icon-${className}`,
    };
  });
};

/**
 * Get icon by name
 */
export const getIconByName = (name: string): IconInfo | undefined => {
  const icons = getIcons();
  return icons.find(icon => icon.name.toLowerCase() === name.toLowerCase());
};

/**
 * Format icon name for display
 */
export const formatIconName = (name: string): string => {
  return name
    .replace(/TypestrokeSize\d+px/gi, '')
    .replace(/Generic/gi, '')
    .replace(/([A-Z])/g, ' $1')
    .trim();
};


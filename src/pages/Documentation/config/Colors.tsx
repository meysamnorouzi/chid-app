/**
 * Colors Config Page
 * 
 * Documentation page for color configuration
 */

import { useState } from 'react';
import { useDocumentationTheme } from '../../../theme';

interface ColorInfo {
  name: string;
  value: string;
  path: string;
}

const Colors = () => {
  const { theme } = useDocumentationTheme();
  const [selectedColor, setSelectedColor] = useState<ColorInfo | null>(null);

  // Extract all colors from theme
  const colorGroups = [
    {
      name: 'Gray Scale',
      colors: Object.entries(theme.colors.gray).map(([key, value]) => ({
        name: `gray.${key}`,
        value,
        path: `theme.colors.gray.${key}`,
      })),
    },
    {
      name: 'Primary',
      colors: Object.entries(theme.colors.primary).map(([key, value]) => ({
        name: `primary.${key}`,
        value,
        path: `theme.colors.primary.${key}`,
      })),
    },
    {
      name: 'Success',
      colors: Object.entries(theme.colors.success).map(([key, value]) => ({
        name: `success.${key}`,
        value,
        path: `theme.colors.success.${key}`,
      })),
    },
    {
      name: 'Warning',
      colors: Object.entries(theme.colors.warning).map(([key, value]) => ({
        name: `warning.${key}`,
        value,
        path: `theme.colors.warning.${key}`,
      })),
    },
    {
      name: 'Danger',
      colors: Object.entries(theme.colors.danger).map(([key, value]) => ({
        name: `danger.${key}`,
        value,
        path: `theme.colors.danger.${key}`,
      })),
    },
    {
      name: 'Info',
      colors: Object.entries(theme.colors.info).map(([key, value]) => ({
        name: `info.${key}`,
        value,
        path: `theme.colors.info.${key}`,
      })),
    },
    {
      name: 'Dark',
      colors: Object.entries(theme.colors.dark).map(([key, value]) => ({
        name: `dark.${key}`,
        value,
        path: `theme.colors.dark.${key}`,
      })),
    },
    {
      name: 'Secondary',
      colors: Object.entries(theme.colors.secondary).map(([key, value]) => ({
        name: `secondary.${key}`,
        value,
        path: `theme.colors.secondary.${key}`,
      })),
    },
    {
      name: 'Light',
      colors: Object.entries(theme.colors.light).map(([key, value]) => ({
        name: `light.${key}`,
        value,
        path: `theme.colors.light.${key}`,
      })),
    },
    {
      name: 'Brand',
      colors: Object.entries(theme.colors.brand).map(([key, value]) => ({
        name: `brand.${key}`,
        value,
        path: `theme.colors.brand.${key}`,
      })),
    },
  ];

  // Helper to determine if color is light or dark
  const isLightColor = (color: string): boolean => {
    // Remove rgba/rgb and extract values
    const rgbMatch = color.match(/\d+/g);
    if (!rgbMatch) return false;
    
    const r = parseInt(rgbMatch[0] || '0');
    const g = parseInt(rgbMatch[1] || '0');
    const b = parseInt(rgbMatch[2] || '0');
    
    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5;
  };

  return (
    <div className="w-full mb-8">
      <h1 
        className="text-4xl font-bold mb-4"
        style={{ color: theme.colors.light.inverse }}
      >
        Colors
      </h1>
      <p 
        className="text-lg mb-8"
        style={{ color: theme.colors.gray[600] }}
      >
        Guide for using colors in the project
      </p>
      
      <div className="flex gap-6">
        {/* Colors Grid */}
        <div className="flex-1 space-y-8">
          {colorGroups.map((group) => (
            <section 
              key={group.name}
              className="p-6 rounded-lg"
              style={{ 
                backgroundColor: theme.background.body,
                border: `1px solid ${theme.colors.gray[300]}`,
                boxShadow: theme.boxShadows.default 
              }}
            >
              <h2 
                className="text-xl font-semibold mb-4"
                style={{ color: theme.colors.light.inverse }}
              >
                {group.name}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {group.colors.map((color) => {
                  const isSelected = selectedColor?.name === color.name;
                  const isLight = isLightColor(color.value);
                  
                  return (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className="p-3 rounded-lg border transition-all hover:scale-105 text-left"
                      style={{
                        backgroundColor: isSelected ? theme.colors.primary.clarity : theme.background.card,
                        borderColor: isSelected ? theme.colors.primary.default : theme.colors.gray[300],
                        borderWidth: isSelected ? '2px' : '1px',
                      }}
                    >
                      <div 
                        className="w-full aspect-square rounded-lg mb-2 flex items-center justify-center"
                        style={{ backgroundColor: color.value }}
                      >
                        <span 
                          className="text-xs font-medium px-2 py-1 rounded"
                          style={{
                            backgroundColor: isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.9)',
                            color: isLight ? theme.colors.gray[900] : theme.colors.gray[100],
                          }}
                        >
                          {color.name.split('.').pop()}
                        </span>
                      </div>
                      <p 
                        className="text-xs font-medium truncate"
                        style={{ color: theme.colors.gray[700] }}
                      >
                        {color.name}
                      </p>
                      <p 
                        className="text-xs truncate font-mono"
                        style={{ color: theme.colors.gray[500] }}
                      >
                        {color.value}
                      </p>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Detail Box */}
        {selectedColor && (
          <div 
            className="w-96 shrink-0 p-6 rounded-lg border sticky top-6 h-fit"
            style={{
              backgroundColor: theme.background.card,
              borderColor: theme.colors.gray[300],
              boxShadow: theme.boxShadows.default,
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 
                className="text-xl font-semibold"
                style={{ color: theme.colors.light.inverse }}
              >
                {selectedColor.name}
              </h3>
              <button
                onClick={() => setSelectedColor(null)}
                className="p-1 rounded hover:bg-gray-100"
                style={{ color: theme.colors.gray[600] }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Color Preview */}
            <div 
              className="w-full aspect-square rounded-lg mb-4 flex items-center justify-center"
              style={{ backgroundColor: selectedColor.value }}
            >
              <span 
                className="text-lg font-semibold px-4 py-2 rounded"
                style={{
                  backgroundColor: isLightColor(selectedColor.value) 
                    ? 'rgba(0,0,0,0.1)' 
                    : 'rgba(255,255,255,0.9)',
                  color: isLightColor(selectedColor.value) 
                    ? theme.colors.gray[900] 
                    : theme.colors.gray[100],
                }}
              >
                {selectedColor.value}
              </span>
            </div>

            {/* Color Info */}
            <div className="space-y-3">
              <div>
                <span 
                  className="text-sm font-medium block mb-1"
                  style={{ color: theme.colors.gray[600] }}
                >
                  Color Name:
                </span>
                <code 
                  className="block px-3 py-2 rounded text-sm"
                  style={{
                    backgroundColor: theme.colors.gray[200],
                    color: theme.colors.gray[900],
                  }}
                >
                  {selectedColor.name}
                </code>
              </div>

              <div>
                <span 
                  className="text-sm font-medium block mb-1"
                  style={{ color: theme.colors.gray[600] }}
                >
                  Hex/RGBA Value:
                </span>
                <code 
                  className="block px-3 py-2 rounded text-sm break-all"
                  style={{
                    backgroundColor: theme.colors.gray[200],
                    color: theme.colors.gray[900],
                  }}
                >
                  {selectedColor.value}
                </code>
              </div>

              <div>
                <span 
                  className="text-sm font-medium block mb-1"
                  style={{ color: theme.colors.gray[600] }}
                >
                  Usage:
                </span>
                <code 
                  className="block px-3 py-2 rounded text-xs break-all"
                  style={{
                    backgroundColor: theme.colors.gray[200],
                    color: theme.colors.gray[900],
                    fontFamily: 'monospace',
                  }}
                >
                  {selectedColor.path}
                </code>
              </div>

              <div>
                <span 
                  className="text-sm font-medium block mb-1"
                  style={{ color: theme.colors.gray[600] }}
                >
                  CSS Usage:
                </span>
                <code 
                  className="block px-3 py-2 rounded text-xs break-all"
                  style={{
                    backgroundColor: theme.colors.gray[200],
                    color: theme.colors.gray[900],
                    fontFamily: 'monospace',
                  }}
                >
                  {`style={{ color: '${selectedColor.value}' }}`}
                </code>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Colors;


/**
 * Icon Config Page
 * 
 * Documentation page for icon configuration
 */

import { useState, useMemo } from 'react';
import { useDocumentationTheme } from '../../../theme';
import { getIcons, formatIconName, type IconInfo } from '../../../utils/iconUtils';
import '../../../icon/font/style.css';

const Icon = () => {
  const { theme } = useDocumentationTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<{ baseName: string; icons: IconInfo[] } | null>(null);
  const icons = useMemo(() => getIcons(), []);

  const filteredIcons = useMemo(() => {
    if (!searchQuery.trim()) return icons;
    const query = searchQuery.toLowerCase();
    return icons.filter(icon => 
      icon.name.toLowerCase().includes(query) ||
      formatIconName(icon.name).toLowerCase().includes(query)
    );
  }, [icons, searchQuery]);

  // Group icons by base name (remove size suffix)
  const groupedIcons = useMemo(() => {
    const groups: { [key: string]: IconInfo[] } = {};
    filteredIcons.forEach(icon => {
      const baseName = icon.name.replace(/TypestrokeSize\d+px/gi, '');
      if (!groups[baseName]) {
        groups[baseName] = [];
      }
      groups[baseName].push(icon);
    });
    return groups;
  }, [filteredIcons]);

  return (
    <div className="w-full mb-8">
      <h1 
        className="text-4xl font-bold mb-4"
        style={{ color: theme.colors.light.inverse }}
      >
        Icon
      </h1>
      <p 
        className="text-lg mb-8"
        style={{ color: theme.colors.gray[600] }}
      >
        Guide for using icons in the project
      </p>
      
      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search icons..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border"
          style={{
            backgroundColor: theme.background.body,
            borderColor: theme.colors.gray[300],
            color: theme.colors.light.inverse,
          }}
        />
      </div>

      <div className="flex gap-6">
        {/* Icons Grid */}
        <div className="flex-1">
          <div className={`grid gap-4 ${
            selectedIcon 
              ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7'
              : 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 2xl:grid-cols-11'
          }`}>
            {Object.entries(groupedIcons).map(([baseName, iconGroup]) => {
              const displayName = formatIconName(baseName);
              const mainIcon = iconGroup[0]; // Use first icon as main
              const isSelected = selectedIcon?.baseName === baseName;

              return (
                <button
                  key={baseName}
                  onClick={() => setSelectedIcon({ baseName, icons: iconGroup })}
                  className="p-4 rounded-lg border transition-all cursor-pointer hover:scale-105"
                  style={{
                    backgroundColor: isSelected ? theme.colors.primary.clarity : theme.background.body,
                    borderColor: isSelected ? theme.colors.primary.default : theme.colors.gray[300],
                    borderWidth: isSelected ? '2px' : '1px',
                  }}
                >
                  <div 
                    className="w-full aspect-square rounded-lg flex items-center justify-center text-4xl mb-2"
                    style={{
                      backgroundColor: theme.colors.gray[100],
                      color: theme.colors.gray[900],
                    }}
                  >
                    <span 
                      className="icon"
                      style={{ fontFamily: 'Untitled' }}
                    >
                      {mainIcon.unicode}
                    </span>
                  </div>
                  <p 
                    className="text-xs text-center truncate"
                    style={{ color: theme.colors.gray[700] }}
                    title={displayName}
                  >
                    {displayName}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detail Box */}
        {selectedIcon && (
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
                {formatIconName(selectedIcon.baseName)}
              </h3>
              <button
                onClick={() => setSelectedIcon(null)}
                className="p-1 rounded hover:bg-gray-100"
                style={{ color: theme.colors.gray[600] }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Icon Preview */}
            <div 
              className="w-full h-32 rounded-lg flex items-center justify-center text-5xl mb-4"
              style={{
                backgroundColor: theme.colors.gray[100],
                color: theme.colors.gray[900],
              }}
            >
              <span 
                className="icon"
                style={{ fontFamily: 'Untitled' }}
              >
                {selectedIcon.icons[0].unicode}
              </span>
            </div>

            {/* Icon Info */}
            <div className="space-y-3 mb-4">
              <div>
                <span 
                  className="text-sm font-medium block mb-1"
                  style={{ color: theme.colors.gray[600] }}
                >
                  Name:
                </span>
                <code 
                  className="block px-3 py-2 rounded text-sm break-all"
                  style={{
                    backgroundColor: theme.colors.gray[200],
                    color: theme.colors.gray[900],
                  }}
                >
                  {selectedIcon.icons[0].name}
                </code>
              </div>

              <div>
                <span 
                  className="text-sm font-medium block mb-1"
                  style={{ color: theme.colors.gray[600] }}
                >
                  Font Class:
                </span>
                <code 
                  className="block px-3 py-2 rounded text-sm"
                  style={{
                    backgroundColor: theme.colors.gray[200],
                    color: theme.colors.gray[900],
                  }}
                >
                  .icon
                </code>
              </div>

              <div>
                <span 
                  className="text-sm font-medium block mb-1"
                  style={{ color: theme.colors.gray[600] }}
                >
                  Unicode:
                </span>
                <code 
                  className="block px-3 py-2 rounded text-sm"
                  style={{
                    backgroundColor: theme.colors.gray[200],
                    color: theme.colors.gray[900],
                  }}
                >
                  {selectedIcon.icons[0].unicode} (U+{selectedIcon.icons[0].codePoint.toString(16).toUpperCase()})
                </code>
              </div>

              <div>
                <span 
                  className="text-sm font-medium block mb-1"
                  style={{ color: theme.colors.gray[600] }}
                >
                  Font Family:
                </span>
                <code 
                  className="block px-3 py-2 rounded text-sm"
                  style={{
                    backgroundColor: theme.colors.gray[200],
                    color: theme.colors.gray[900],
                  }}
                >
                  "Untitled"
                </code>
              </div>
            </div>

            {/* Usage Example */}
            <div className="mb-4 p-4 rounded-lg" style={{ backgroundColor: theme.colors.gray[100] }}>
              <p 
                className="text-sm font-medium mb-2"
                style={{ color: theme.colors.gray[700] }}
              >
                Usage:
              </p>
              <code 
                className="block text-xs p-3 rounded break-all"
                style={{
                  backgroundColor: theme.background.card,
                  color: theme.colors.gray[900],
                  fontFamily: 'monospace',
                }}
              >
                {`<span class="icon" style="font-family: 'Untitled'">${selectedIcon.icons[0].unicode}</span>`}
              </code>
            </div>

            {/* Available Sizes */}
            {selectedIcon.icons.length > 1 && (
              <div>
                <p 
                  className="text-sm font-medium mb-2"
                  style={{ color: theme.colors.gray[700] }}
                >
                  Available Sizes:
                </p>
                <div className="flex gap-2 flex-wrap">
                  {selectedIcon.icons.map((icon) => {
                    const size = icon.name.match(/Size(\d+)px/)?.[1] || '16';
                    return (
                      <div 
                        key={icon.name}
                        className="flex items-center gap-2 px-3 py-2 rounded"
                        style={{ backgroundColor: theme.colors.gray[200] }}
                      >
                        <span 
                          className="icon"
                          style={{ fontFamily: 'Untitled', fontSize: `${size}px` }}
                        >
                          {icon.unicode}
                        </span>
                        <span 
                          className="text-xs"
                          style={{ color: theme.colors.gray[700] }}
                        >
                          {size}px
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {filteredIcons.length === 0 && (
        <div 
          className="p-8 text-center rounded-lg"
          style={{ backgroundColor: theme.background.body }}
        >
          <p style={{ color: theme.colors.gray[600] }}>
            No icons found matching "{searchQuery}"
          </p>
        </div>
      )}
    </div>
  );
};

export default Icon;


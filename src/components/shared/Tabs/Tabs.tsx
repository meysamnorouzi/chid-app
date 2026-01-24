/**
 * Tabs Component
 * 
 * Display tabs for switching between different views
 * Designed with SEO, accessibility, security, and modular structure in mind
 */

import { useState, useContext } from 'react';
import { DocumentationThemeContext } from '../../../theme/DocumentationThemeContext';
import { documentationTheme } from '../../../theme/themes/documentationTheme';
import type { TabsProps } from './types';

const Tabs = ({
  items,
  value: controlledValue,
  defaultValue,
  variant = 'default',
  size = 'md',
  disabled = false,
  fullWidth = false,
  onChange,
  className = '',
  style,
  'aria-label': ariaLabel,
}: TabsProps) => {
  // Get theme from context, fallback to default theme if not in documentation context
  const themeContext = useContext(DocumentationThemeContext);
  const theme = themeContext?.theme || documentationTheme;

  const isDark = theme.mode === 'dark';
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<string | number>(
    defaultValue ?? items[0]?.value ?? ''
  );
  const [hoveredTab, setHoveredTab] = useState<string | number | null>(null);

  const currentValue = isControlled ? controlledValue : internalValue;

  // Size mappings
  const sizeMap = {
    sm: {
      padding: 'px-3 py-1.5',
      text: 'text-sm',
      iconSize: 'w-4 h-4',
      gap: 'gap-1.5',
      badgeText: 'text-xs',
      badgePadding: 'px-1.5 py-0.5',
    },
    md: {
      padding: 'px-4 py-2',
      text: 'text-base',
      iconSize: 'w-5 h-5',
      gap: 'gap-2',
      badgeText: 'text-xs',
      badgePadding: 'px-2 py-0.5',
    },
    lg: {
      padding: 'px-5 py-3',
      text: 'text-lg',
      iconSize: 'w-6 h-6',
      gap: 'gap-2.5',
      badgeText: 'text-sm',
      badgePadding: 'px-2.5 py-1',
    },
  };

  const sizeClasses = sizeMap[size];

  // Handle tab click
  const handleTabClick = (tabValue: string | number) => {
    if (disabled) return;
    
    if (!isControlled) {
      setInternalValue(tabValue);
    }
    onChange?.(tabValue);
  };

  // Get variant styles for tab
  const getTabStyles = (item: typeof items[0], isActive: boolean): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      transition: 'all 0.2s ease-in-out',
      cursor: disabled || item.disabled ? 'not-allowed' : 'pointer',
      opacity: disabled || item.disabled ? 0.6 : 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: isActive ? 600 : 500,
      outline: 'none',
      border: 'none',
    };

    const isHovered = hoveredTab === item.value && !disabled && !item.disabled;

    switch (variant) {
      case 'underlined':
        return {
          ...baseStyles,
          backgroundColor: 'transparent',
          color: isActive
            ? theme.colors.primary.default
            : (isDark ? theme.colors.gray[800] : theme.colors.gray[700]),
          borderBottom: isActive || isHovered
            ? `2px solid ${theme.colors.primary.default}`
            : '2px solid transparent',
        };
      case 'pills':
        return {
          ...baseStyles,
          backgroundColor: isActive
            ? theme.colors.primary.default
            : (isHovered
                ? (isDark ? theme.colors.gray[300] : theme.colors.gray[100])
                : 'transparent'),
          color: isActive
            ? theme.colors.primary.inverse
            : (isDark ? theme.colors.gray[800] : theme.colors.gray[700]),
          borderRadius: '0.5rem',
        };
      default:
        return {
          ...baseStyles,
          backgroundColor: isActive
            ? theme.colors.primary.default
            : (isHovered
                ? (isDark ? theme.colors.gray[300] : theme.colors.gray[100])
                : 'transparent'),
          color: isActive
            ? theme.colors.primary.inverse
            : (isDark ? theme.colors.gray[800] : theme.colors.gray[700]),
          borderRadius: '0.5rem',
        };
    }
  };

  // Get container styles
  const getContainerStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'underlined':
        return {
          borderBottom: `1px solid ${isDark ? theme.colors.gray[400] : theme.colors.gray[300]}`,
        };
      default:
        return {};
    }
  };

  const activeTab = items.find(item => item.value === currentValue);
  const activeContent = activeTab?.content;

  return (
    <div className={`w-full ${className}`} style={style}>
      {/* Tabs List */}
      <div
        className={`flex ${fullWidth ? 'w-full' : ''} ${variant === 'underlined' ? 'border-b' : 'gap-1'}`}
        style={getContainerStyles()}
        role="tablist"
        aria-label={ariaLabel || 'Tabs'}
      >
        {items.map((item) => {
          const isActive = currentValue === item.value;

          return (
            <button
              key={item.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-disabled={disabled || item.disabled}
              onClick={() => handleTabClick(item.value)}
              onMouseEnter={() => !disabled && !item.disabled && setHoveredTab(item.value)}
              onMouseLeave={() => setHoveredTab(null)}
              className={`${sizeClasses.padding} ${sizeClasses.text} ${sizeClasses.gap} ${
                fullWidth ? 'flex-1' : ''
              } transition-all duration-200`}
              style={getTabStyles(item, isActive)}
            >
              {item.icon && (
                <span className="flex items-center justify-center">
                  {item.icon}
                </span>
              )}
              <span>{item.label}</span>
              {item.badge !== undefined && (
                <span
                  className={`${sizeClasses.badgeText} ${sizeClasses.badgePadding} rounded-full font-medium`}
                  style={{
                    backgroundColor: isActive
                      ? (variant === 'underlined' 
                          ? theme.colors.primary.light 
                          : theme.colors.primary.inverse)
                      : (isDark ? theme.colors.gray[300] : theme.colors.gray[200]),
                    color: isActive
                      ? (variant === 'underlined'
                          ? theme.colors.primary.default
                          : theme.colors.primary.default)
                      : (isDark ? theme.colors.gray[800] : theme.colors.gray[700]),
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Panel */}
      {activeContent && (
        <div
          role="tabpanel"
          className="mt-4"
          aria-labelledby={`tab-${currentValue}`}
        >
          {activeContent}
        </div>
      )}
    </div>
  );
};

export default Tabs;


/**
 * Menu Component
 * 
 * Display a menu with items, submenus, and dividers
 * Designed with SEO, accessibility, security, and modular structure in mind
 */

import { useState } from 'react';
import { useContext } from 'react';
import { DocumentationThemeContext } from '../../../theme/DocumentationThemeContext';
import { documentationTheme } from '../../../theme/themes/documentationTheme';
import type { MenuProps, MenuItem } from './types';

const Menu = ({
  items,
  variant = 'default',
  size = 'md',
  showIcons = true,
  className = '',
  style,
  onItemClick,
  'aria-label': ariaLabel,
}: MenuProps) => {
  // Get theme from context, fallback to default theme if not in documentation context
  const themeContext = useContext(DocumentationThemeContext);
  const theme = themeContext?.theme || documentationTheme;

  const isDark = theme.mode === 'dark';
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Size mappings
  const sizeMap = {
    sm: {
      padding: 'px-2 py-1',
      text: 'text-xs',
      iconSize: 'w-3.5 h-3.5',
      gap: 'gap-1.5',
      minWidth: '120px',
    },
    md: {
      padding: 'px-3 py-2',
      text: 'text-sm',
      iconSize: 'w-4 h-4',
      gap: 'gap-2',
      minWidth: '160px',
    },
    lg: {
      padding: 'px-4 py-2.5',
      text: 'text-base',
      iconSize: 'w-5 h-5',
      gap: 'gap-2.5',
      minWidth: '200px',
    },
  };

  const sizeClasses = sizeMap[size];

  // Variant styles
  const getVariantStyles = () => {
    const baseStyles: React.CSSProperties = {
      backgroundColor: isDark ? theme.colors.gray[200] : theme.colors.light.inverse,
      borderRadius: '8px',
      minWidth: sizeClasses.minWidth,
      boxShadow: theme.boxShadows.light,
      padding: '4px',
    };

    switch (variant) {
      case 'bordered':
        return {
          ...baseStyles,
          border: `1px solid ${isDark ? theme.colors.gray[400] : theme.colors.gray[300]}`,
        };
      case 'shadow':
        return {
          ...baseStyles,
          boxShadow: theme.boxShadows.default,
        };
      default:
        return baseStyles;
    }
  };

  const toggleSubmenu = (itemId: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const handleItemClick = (item: MenuItem) => {
    if (item.disabled) return;

    if (item.submenu && item.submenu.length > 0) {
      toggleSubmenu(item.id);
    } else {
      item.onClick?.();
      onItemClick?.(item.id);
    }
  };

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    // Divider
    if (item.type === 'divider') {
      return (
        <div
          key={item.id}
          className="my-1"
          style={{
            borderTop: `1px solid ${isDark ? theme.colors.gray[400] : theme.colors.gray[300]}`,
          }}
        />
      );
    }

    // Header
    if (item.type === 'header') {
      return (
        <div
          key={item.id}
          className={`${sizeClasses.padding} ${sizeClasses.text} font-semibold`}
          style={{
            color: isDark ? theme.colors.gray[600] : theme.colors.gray[500],
            textTransform: 'uppercase',
            fontSize: '0.75rem',
            letterSpacing: '0.05em',
            marginTop: '4px',
            marginBottom: '4px',
          }}
        >
          {item.label}
        </div>
      );
    }

    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isExpanded = expandedItems.has(item.id);
    const isActive = item.active;
    const isDisabled = item.disabled;

    return (
      <div key={item.id} className="relative">
        <button
          onClick={() => handleItemClick(item)}
          disabled={isDisabled}
          className={`w-full flex items-center ${sizeClasses.padding} ${sizeClasses.gap} ${sizeClasses.text} rounded-lg transition-all duration-200 ${
            isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
          style={{
            backgroundColor: isActive
              ? (isDark ? theme.colors.primary.default : theme.colors.primary.light)
              : 'transparent',
            color: isActive
              ? (isDark ? theme.colors.primary.inverse : theme.colors.primary.default)
              : (isDark ? theme.colors.gray[800] : theme.colors.gray[700]),
            paddingLeft: level > 0 ? `${level * 16 + 12}px` : undefined,
          }}
          onMouseEnter={(e) => {
            if (!isDisabled && !isActive) {
              e.currentTarget.style.backgroundColor = isDark ? theme.colors.gray[300] : theme.colors.gray[100];
            }
          }}
          onMouseLeave={(e) => {
            if (!isDisabled && !isActive) {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
          aria-label={item.label}
          aria-expanded={hasSubmenu ? isExpanded : undefined}
          aria-disabled={isDisabled}
        >
          {showIcons && item.icon && (
            <span className={`flex items-center ${sizeClasses.iconSize} shrink-0`}>
              {item.icon}
            </span>
          )}
          <span className="flex-1 text-left">{item.label}</span>
          {item.badge !== undefined && (
            <span
              className="px-1.5 py-0.5 rounded-full text-xs font-semibold min-w-[20px] text-center shrink-0"
              style={{
                backgroundColor: isActive
                  ? (isDark ? theme.colors.primary.inverse : theme.colors.primary.default)
                  : theme.colors.primary.default,
                color: isActive
                  ? (isDark ? theme.colors.primary.default : theme.colors.primary.inverse)
                  : theme.colors.primary.inverse,
              }}
            >
              {item.badge}
            </span>
          )}
          {hasSubmenu && (
            <span className={`flex items-center ${sizeClasses.iconSize} shrink-0 transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
              {item.rightIcon || (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </span>
          )}
        </button>
        {hasSubmenu && isExpanded && (
          <div
            className="mt-1"
            style={{
              paddingLeft: '8px',
              borderLeft: `2px solid ${isDark ? theme.colors.gray[400] : theme.colors.gray[300]}`,
            }}
          >
            {item.submenu!.map((subItem) => renderMenuItem(subItem, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`flex flex-col ${className}`}
      style={{
        ...getVariantStyles(),
        ...style,
      }}
      role="menu"
      aria-label={ariaLabel || 'Menu'}
    >
      {items.map((item) => renderMenuItem(item))}
    </div>
  );
};

export default Menu;


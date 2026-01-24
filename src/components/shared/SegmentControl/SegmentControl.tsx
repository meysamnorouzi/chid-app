/**
 * Segment Control Component
 * 
 * Display a segmented control for selecting between multiple options
 * Designed with SEO, accessibility, security, and modular structure in mind
 */

import { useState, useContext } from 'react';
import { DocumentationThemeContext } from '../../../theme/DocumentationThemeContext';
import { documentationTheme } from '../../../theme/themes/documentationTheme';
import type { SegmentControlProps } from './types';

const SegmentControl = ({
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
}: SegmentControlProps) => {
  // Get theme from context, fallback to default theme if not in documentation context
  const themeContext = useContext(DocumentationThemeContext);
  const theme = themeContext?.theme || documentationTheme;

  const isDark = theme.mode === 'dark';
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<string | number>(
    defaultValue ?? items[0]?.value ?? ''
  );

  const currentValue = isControlled ? controlledValue : internalValue;

  // Size mappings
  const sizeMap = {
    sm: {
      padding: 'px-3 py-1.5',
      text: 'text-sm',
      iconSize: 'w-4 h-4',
      height: 'h-7',
      gap: 'gap-1.5',
    },
    md: {
      padding: 'px-4 py-2',
      text: 'text-base',
      iconSize: 'w-5 h-5',
      height: 'h-9',
      gap: 'gap-2',
    },
    lg: {
      padding: 'px-5 py-2.5',
      text: 'text-lg',
      iconSize: 'w-6 h-6',
      height: 'h-11',
      gap: 'gap-2.5',
    },
  };

  const sizeClasses = sizeMap[size];

  // Handle item click
  const handleItemClick = (itemValue: string | number) => {
    if (disabled) return;
    
    if (!isControlled) {
      setInternalValue(itemValue);
    }
    onChange?.(itemValue);
  };

  // Get variant styles for container
  const getContainerStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      transition: 'all 0.2s ease-in-out',
    };

    switch (variant) {
      case 'filled':
        return {
          ...baseStyles,
          backgroundColor: disabled
            ? (isDark ? theme.colors.gray[200] : theme.colors.gray[100])
            : (isDark ? theme.colors.gray[200] : theme.colors.gray[100]),
          padding: '0.25rem',
          borderRadius: '0.5rem',
        };
      case 'outlined':
        return {
          ...baseStyles,
          backgroundColor: 'transparent',
          border: `1px solid ${
            disabled
              ? (isDark ? theme.colors.gray[400] : theme.colors.gray[300])
              : (isDark ? theme.colors.gray[400] : theme.colors.gray[300])
          }`,
          padding: '0.25rem',
          borderRadius: '0.5rem',
        };
      default:
        return {
          ...baseStyles,
          backgroundColor: disabled
            ? (isDark ? theme.colors.gray[200] : theme.colors.gray[100])
            : (isDark ? theme.colors.gray[200] : theme.colors.light.inverse),
          padding: '0.25rem',
          borderRadius: '0.5rem',
          border: `1px solid ${
            isDark ? theme.colors.gray[300] : theme.colors.gray[200]
          }`,
        };
    }
  };

  // Get variant styles for item
  const getItemStyles = (item: typeof items[0], isSelected: boolean): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      transition: 'all 0.2s ease-in-out',
      cursor: disabled || item.disabled ? 'not-allowed' : 'pointer',
      opacity: disabled || item.disabled ? 0.6 : 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: isSelected ? 600 : 500,
      borderRadius: '0.375rem',
      outline: 'none',
      border: 'none',
    };

    if (isSelected) {
      return {
        ...baseStyles,
        backgroundColor: isDark ? theme.colors.gray[800] : theme.colors.gray[900],
        color: isDark ? theme.colors.gray[200] : theme.colors.gray[300],
        boxShadow: theme.boxShadows.light,
      };
    }

    return {
      ...baseStyles,
      backgroundColor: 'transparent',
      color: disabled || item.disabled
        ? (isDark ? theme.colors.gray[500] : theme.colors.gray[400])
        : (isDark ? theme.colors.gray[600] : theme.colors.gray[700]),
      border: `1px solid ${isDark ? theme.colors.gray[400] : theme.colors.gray[300]}`,
    };
  };

  return (
    <div
      className={`inline-flex gap-2 ${fullWidth ? 'w-full' : ''} ${className}`}
      style={{
        ...getContainerStyles(),
        ...style,
      }}
      role="tablist"
      aria-label={ariaLabel || 'Segment control'}
    >
      {items.map((item, index) => {
        const isSelected = currentValue === item.value;
        const isFirst = index === 0;
        const isLast = index === items.length - 1;

        return (
          <button
            key={item.value}
            type="button"
            onClick={() => handleItemClick(item.value)}
            disabled={disabled || item.disabled}
            className={`${sizeClasses.padding} ${sizeClasses.text} ${sizeClasses.height} ${
              item.icon ? sizeClasses.gap : ''
            } ${fullWidth ? 'flex-1' : ''} transition-all duration-200`}
            style={getItemStyles(item, isSelected)}
            role="tab"
            aria-selected={isSelected}
            aria-disabled={disabled || item.disabled}
          >
            {item.icon && (
              <span className="flex items-center justify-center">
                {item.icon}
              </span>
            )}
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default SegmentControl;


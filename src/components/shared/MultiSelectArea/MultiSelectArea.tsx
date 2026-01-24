/**
 * Multi Select Area Component
 * 
 * Display a multi-select area with tags/chips and copy functionality
 * Designed with SEO, accessibility, security, and modular structure in mind
 */

import { useState, useContext, useRef, useEffect } from 'react';
import { DocumentationThemeContext } from '../../../theme/DocumentationThemeContext';
import { documentationTheme } from '../../../theme/themes/documentationTheme';
import type { MultiSelectAreaItem, MultiSelectAreaProps } from './types';

const MultiSelectArea = ({
  items,
  variant = 'default',
  size = 'md',
  label,
  helperText,
  copyable = true,
  copyText,
  disabled = false,
  maxHeight,
  onItemClick,
  onCopy,
  className = '',
  style,
  'aria-label': ariaLabel,
}: MultiSelectAreaProps) => {
  // Get theme from context, fallback to default theme if not in documentation context
  const themeContext = useContext(DocumentationThemeContext);
  const theme = themeContext?.theme || documentationTheme;

  const isDark = theme.mode === 'dark';
  const [showCopied, setShowCopied] = useState(false);
  const copyButtonRef = useRef<HTMLButtonElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Size mappings
  const sizeMap = {
    sm: {
      padding: 'p-3',
      gap: 'gap-2',
      tagPadding: 'px-2 py-0.5',
      tagText: 'text-xs',
      labelText: 'text-sm',
      helperText: 'text-xs',
      iconSize: 'w-4 h-4',
    },
    md: {
      padding: 'p-4',
      gap: 'gap-2.5',
      tagPadding: 'px-2.5 py-1',
      tagText: 'text-sm',
      labelText: 'text-base',
      helperText: 'text-sm',
      iconSize: 'w-5 h-5',
    },
    lg: {
      padding: 'p-5',
      gap: 'gap-3',
      tagPadding: 'px-3 py-1.5',
      tagText: 'text-base',
      labelText: 'text-lg',
      helperText: 'text-base',
      iconSize: 'w-6 h-6',
    },
  };

  const sizeClasses = sizeMap[size];

  // Get text to copy
  const getCopyText = (): string => {
    if (copyText) return copyText;
    return items.map(item => 
      typeof item.label === 'string' ? item.label : item.value
    ).join(', ');
  };

  // Handle copy
  const handleCopy = async () => {
    if (disabled || !copyable) return;

    const text = getCopyText();
    
    try {
      await navigator.clipboard.writeText(text);
      setShowCopied(true);
      onCopy?.(text);
      
      // Clear previous timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Hide tooltip after 2 seconds
      timeoutRef.current = setTimeout(() => {
        setShowCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

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
          border: 'none',
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
        };
      default:
        return {
          ...baseStyles,
          backgroundColor: disabled
            ? (isDark ? theme.colors.gray[200] : theme.colors.gray[100])
            : (isDark ? theme.colors.gray[200] : theme.colors.light.inverse),
          border: `1px solid ${
            isDark ? theme.colors.gray[300] : theme.colors.gray[200]
          }`,
        };
    }
  };

  // Get tag color styles
  const getTagColorStyles = (color: MultiSelectAreaItem['color'] = 'primary') => {
    const colorKey = color ?? 'primary';
    const colorMap: Record<NonNullable<MultiSelectAreaItem['color']>, { backgroundColor: string; color: string }> = {
      primary: {
        backgroundColor: theme.colors.primary.light,
        color: theme.colors.primary.default,
      },
      secondary: {
        backgroundColor: theme.colors.secondary.light,
        color: theme.colors.secondary.default,
      },
      success: {
        backgroundColor: theme.colors.success.light,
        color: theme.colors.success.default,
      },
      warning: {
        backgroundColor: theme.colors.warning.light,
        color: theme.colors.warning.default,
      },
      danger: {
        backgroundColor: theme.colors.danger.light,
        color: theme.colors.danger.default,
      },
      info: {
        backgroundColor: theme.colors.info.light,
        color: theme.colors.info.default,
      },
      gray: {
        backgroundColor: isDark ? theme.colors.gray[300] : theme.colors.gray[200],
        color: isDark ? theme.colors.gray[800] : theme.colors.gray[700],
      },
    };

    return colorMap[colorKey];
  };

  // Copy icon
  const CopyIcon = (
    <svg
      className={sizeClasses.iconSize}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    </svg>
  );

  return (
    <div className={`w-full ${className}`} style={style}>
      {/* Label */}
      {label && (
        <label
          className={`block ${sizeClasses.labelText} font-medium mb-2`}
          style={{
            color: isDark ? theme.colors.gray[800] : theme.colors.gray[700],
          }}
        >
          {label}
        </label>
      )}

      {/* Container */}
      <div
        className={`relative rounded-lg ${sizeClasses.padding} ${sizeClasses.gap} flex flex-wrap`}
        style={{
          ...getContainerStyles(),
          maxHeight: maxHeight ? (typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight) : undefined,
          overflowY: maxHeight ? 'auto' : undefined,
          opacity: disabled ? 0.6 : 1,
        }}
        role="group"
        aria-label={ariaLabel || label || 'Multi select area'}
      >
        {/* Items */}
        {items.map((item) => (
          <div
            key={item.value}
            className={`inline-flex items-center ${sizeClasses.tagPadding} ${sizeClasses.tagText} rounded-lg font-medium transition-all duration-200 ${
              onItemClick && !disabled ? 'cursor-pointer hover:opacity-80' : ''
            }`}
            style={getTagColorStyles(item.color)}
            onClick={() => !disabled && onItemClick?.(item)}
            role="button"
            tabIndex={onItemClick && !disabled ? 0 : undefined}
            onKeyDown={(e) => {
              if ((e.key === 'Enter' || e.key === ' ') && onItemClick && !disabled) {
                e.preventDefault();
                onItemClick(item);
              }
            }}
          >
            {item.label}
          </div>
        ))}

        {/* Copy Button */}
        {copyable && (
          <div className="absolute top-2 right-2">
            <button
              ref={copyButtonRef}
              type="button"
              onClick={handleCopy}
              disabled={disabled}
              className={`flex items-center justify-center transition-all duration-200 ${
                disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:opacity-70'
              }`}
              style={{
                color: isDark ? theme.colors.gray[600] : theme.colors.gray[500],
              }}
              aria-label="Copy to clipboard"
            >
              {CopyIcon}
            </button>

            {/* Copied Tooltip */}
            {showCopied && (
              <div
                className="absolute bottom-full right-0 mb-2 px-2 py-1 rounded text-xs whitespace-nowrap"
                style={{
                  backgroundColor: isDark ? theme.colors.gray[300] : theme.colors.gray[800],
                  color: isDark ? theme.colors.gray[800] : theme.colors.light.inverse,
                  boxShadow: theme.boxShadows.default,
                }}
              >
                Copied
                <div
                  className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4"
                  style={{
                    borderLeftColor: 'transparent',
                    borderRightColor: 'transparent',
                    borderTopColor: isDark ? theme.colors.gray[300] : theme.colors.gray[800],
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Helper Text */}
      {helperText && (
        <div
          className={`mt-1 ${sizeClasses.helperText}`}
          style={{
            color: isDark ? theme.colors.gray[600] : theme.colors.gray[500],
          }}
        >
          {helperText}
        </div>
      )}
    </div>
  );
};

export default MultiSelectArea;


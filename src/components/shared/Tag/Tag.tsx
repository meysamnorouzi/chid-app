/**
 * Tag Component
 * 
 * Display a tag/label component with multiple variants and colors
 * Designed with SEO, accessibility, security, and modular structure in mind
 */

import { useContext } from 'react';
import { DocumentationThemeContext } from '../../../theme/DocumentationThemeContext';
import { documentationTheme } from '../../../theme/themes/documentationTheme';
import type { TagProps } from './types';

const Tag = ({
  children,
  variant = 'default',
  size = 'md',
  color = 'primary',
  closable = false,
  onClose,
  leftIcon,
  rightIcon,
  disabled = false,
  className = '',
  style,
  'aria-label': ariaLabel,
}: TagProps) => {
  // Get theme from context, fallback to default theme if not in documentation context
  const themeContext = useContext(DocumentationThemeContext);
  const theme = themeContext?.theme || documentationTheme;

  const isDark = theme.mode === 'dark';

  // Size mappings
  const sizeMap = {
    sm: {
      padding: 'px-2 py-0.5',
      text: 'text-xs',
      iconSize: 'w-3 h-3',
      gap: 'gap-1',
      closeButtonSize: 'w-3 h-3',
    },
    md: {
      padding: 'px-2.5 py-1',
      text: 'text-sm',
      iconSize: 'w-4 h-4',
      gap: 'gap-1.5',
      closeButtonSize: 'w-4 h-4',
    },
    lg: {
      padding: 'px-3 py-1.5',
      text: 'text-base',
      iconSize: 'w-5 h-5',
      gap: 'gap-2',
      closeButtonSize: 'w-5 h-5',
    },
  };

  const sizeClasses = sizeMap[size];

  // Get color styles
  const getColorStyles = () => {
    const colorMap = {
      primary: {
        default: theme.colors.primary.default,
        light: theme.colors.primary.light,
        inverse: theme.colors.primary.inverse,
      },
      secondary: {
        default: theme.colors.secondary.default,
        light: theme.colors.secondary.light,
        inverse: theme.colors.secondary.inverse,
      },
      success: {
        default: theme.colors.success.default,
        light: theme.colors.success.light,
        inverse: theme.colors.success.inverse,
      },
      warning: {
        default: theme.colors.warning.default,
        light: theme.colors.warning.light,
        inverse: theme.colors.warning.inverse,
      },
      danger: {
        default: theme.colors.danger.default,
        light: theme.colors.danger.light,
        inverse: theme.colors.danger.inverse,
      },
      info: {
        default: theme.colors.info.default,
        light: theme.colors.info.light,
        inverse: theme.colors.info.inverse,
      },
      gray: {
        default: theme.colors.gray[500],
        light: theme.colors.gray[200],
        inverse: isDark ? theme.colors.gray[700] : theme.colors.gray[800],
      },
    };

    return colorMap[color];
  };

  const colorStyles = getColorStyles();

  // Variant styles
  const getVariantStyles = () => {
    const baseStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      borderRadius: '6px',
      fontWeight: 500,
      transition: 'all 0.2s ease-in-out',
      border: 'none',
      outline: 'none',
      opacity: disabled ? 0.6 : 1,
      cursor: disabled ? 'not-allowed' : 'default',
    };

    switch (variant) {
      case 'solid':
        return {
          ...baseStyles,
          backgroundColor: colorStyles.default,
          color: colorStyles.inverse,
        };
      case 'outline':
        return {
          ...baseStyles,
          backgroundColor: 'transparent',
          color: colorStyles.default,
          border: `1px solid ${colorStyles.default}`,
        };
      case 'subtle':
        return {
          ...baseStyles,
          backgroundColor: isDark ? colorStyles.light : colorStyles.light,
          color: colorStyles.default,
        };
      default:
        return {
          ...baseStyles,
          backgroundColor: isDark ? theme.colors.gray[200] : colorStyles.light,
          color: colorStyles.default,
        };
    }
  };

  const variantStyles = getVariantStyles();

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled && onClose) {
      onClose();
    }
  };

  return (
    <span
      className={`inline-flex items-center ${sizeClasses.padding} ${sizeClasses.text} ${sizeClasses.gap} ${className}`}
      style={{
        ...variantStyles,
        ...style,
      }}
      role="status"
      aria-label={ariaLabel}
      aria-disabled={disabled}
    >
      {leftIcon && (
        <span className={`flex items-center ${sizeClasses.iconSize}`} style={{ display: 'inline-flex' }}>
          {leftIcon}
        </span>
      )}
      <span>{children}</span>
      {rightIcon && !closable && (
        <span className={`flex items-center ${sizeClasses.iconSize}`} style={{ display: 'inline-flex' }}>
          {rightIcon}
        </span>
      )}
      {closable && (
        <button
          type="button"
          onClick={handleClose}
          disabled={disabled}
          className={`flex items-center justify-center ${sizeClasses.closeButtonSize} rounded-full transition-all duration-200 ml-1 ${
            disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:opacity-70'
          }`}
          style={{
            backgroundColor: variant === 'solid' 
              ? 'rgba(255, 255, 255, 0.2)' 
              : variant === 'outline'
              ? colorStyles.default
              : 'rgba(0, 0, 0, 0.1)',
            color: variant === 'solid' 
              ? colorStyles.inverse 
              : colorStyles.default,
          }}
          aria-label="Close tag"
          onMouseEnter={(e) => {
            if (!disabled) {
              e.currentTarget.style.opacity = '0.8';
            }
          }}
          onMouseLeave={(e) => {
            if (!disabled) {
              e.currentTarget.style.opacity = '1';
            }
          }}
        >
          <svg
            className={sizeClasses.closeButtonSize}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </span>
  );
};

export default Tag;


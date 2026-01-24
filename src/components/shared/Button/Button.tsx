/**
 * Button Component
 * 
 * Reusable button component with multiple variants, sizes, and states
 * Designed with SEO, accessibility, security, and modular structure in mind
 */

import { useContext } from 'react';
import { DocumentationThemeContext } from '../../../theme/DocumentationThemeContext';
import { documentationTheme } from '../../../theme/themes/documentationTheme';
import type { ButtonProps } from './types';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  shape = 'default',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  badge,
  className = '',
  style,
  type = 'button',
  onClick,
  'aria-label': ariaLabel,
  ...rest
}: ButtonProps) => {
  // Get theme from context, fallback to default theme if not in documentation context
  const themeContext = useContext(DocumentationThemeContext);
  const theme = themeContext?.theme || documentationTheme;

  const isDisabled = disabled || loading;

  // Size mappings
  const sizeMap = {
    xs: { 
      padding: 'px-2 py-1', 
      text: 'text-xs', 
      iconSize: 'w-3 h-3',
      height: 'h-5',
      gap: 'gap-1',
    },
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
      padding: 'px-6 py-3', 
      text: 'text-lg', 
      iconSize: 'w-6 h-6',
      height: 'h-11',
      gap: 'gap-2.5',
    },
  };

  const sizeClasses = sizeMap[size];

  // Shape mappings
  const shapeMap = {
    default: 'rounded-lg',
    rounded: 'rounded-xl',
    pill: 'rounded-full',
  };

  const shapeClass = shapeMap[shape];

  // Variant styles
  const getVariantStyles = () => {
    const baseStyles: React.CSSProperties = {
      transition: 'all 0.2s ease-in-out',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      opacity: isDisabled ? 0.6 : 1,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 500,
      border: 'none',
      outline: 'none',
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyles,
          backgroundColor: theme.colors.primary.default,
          color: theme.colors.primary.inverse,
          boxShadow: theme.boxShadows.light,
        };
      case 'secondary':
        return {
          ...baseStyles,
          backgroundColor: theme.colors.secondary.default,
          color: theme.colors.secondary.inverse,
          boxShadow: theme.boxShadows.light,
        };
      case 'outline':
        return {
          ...baseStyles,
          backgroundColor: 'transparent',
          color: theme.colors.primary.default,
          border: `1px solid ${theme.colors.primary.default}`,
        };
      case 'ghost':
        return {
          ...baseStyles,
          backgroundColor: 'transparent',
          color: theme.colors.primary.default,
        };
      case 'danger':
        return {
          ...baseStyles,
          backgroundColor: theme.colors.danger.default,
          color: theme.colors.danger.inverse,
          boxShadow: theme.boxShadows.light,
        };
      case 'success':
        return {
          ...baseStyles,
          backgroundColor: theme.colors.success.default,
          color: theme.colors.success.inverse,
          boxShadow: theme.boxShadows.light,
        };
      case 'warning':
        return {
          ...baseStyles,
          backgroundColor: theme.colors.warning.default,
          color: theme.colors.warning.inverse,
          boxShadow: theme.boxShadows.light,
        };
      case 'info':
        return {
          ...baseStyles,
          backgroundColor: theme.colors.info.default,
          color: theme.colors.info.inverse,
          boxShadow: theme.boxShadows.light,
        };
      default:
        return baseStyles;
    }
  };

  const variantStyles = getVariantStyles();

  // Hover styles
  const getHoverStyles = () => {
    if (isDisabled) return {};

    switch (variant) {
      case 'primary':
        return { backgroundColor: theme.colors.primary.active };
      case 'secondary':
        return { backgroundColor: theme.colors.secondary.active };
      case 'outline':
        return { 
          backgroundColor: theme.colors.primary.light,
          borderColor: theme.colors.primary.active,
        };
      case 'ghost':
        return { backgroundColor: theme.colors.gray[100] };
      case 'danger':
        return { backgroundColor: theme.colors.danger.active };
      case 'success':
        return { backgroundColor: theme.colors.success.active };
      case 'warning':
        return { backgroundColor: theme.colors.warning.active };
      case 'info':
        return { backgroundColor: theme.colors.info.active };
      default:
        return {};
    }
  };

  const hoverStyles = getHoverStyles();

  // Loading spinner
  const loadingSpinner = (
    <svg
      className={`animate-spin ${sizeClasses.iconSize}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={`${sizeClasses.padding} ${sizeClasses.text} ${sizeClasses.height} ${sizeClasses.gap} ${shapeClass} ${fullWidth ? 'w-full' : ''} ${className}`}
      style={{
        ...variantStyles,
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!isDisabled) {
          Object.assign(e.currentTarget.style, hoverStyles);
        }
      }}
      onMouseLeave={(e) => {
        if (!isDisabled) {
          Object.assign(e.currentTarget.style, variantStyles);
        }
      }}
      aria-label={ariaLabel}
      aria-disabled={isDisabled}
      {...rest}
    >
      {loading && (
        <span className="mr-2">
          {loadingSpinner}
        </span>
      )}
      {!loading && leftIcon && (
        <span className="flex items-center">
          {leftIcon}
        </span>
      )}
      <span className="flex items-center">
        {children}
      </span>
      {!loading && rightIcon && (
        <span className="flex items-center">
          {rightIcon}
        </span>
      )}
      {badge && (
        <span
          className="ml-2 px-1.5 py-0.5 rounded-full text-xs font-semibold"
          style={{
            backgroundColor: theme.colors.gray[200],
            color: theme.colors.gray[700],
          }}
        >
          {badge}
        </span>
      )}
    </button>
  );
};

export default Button;


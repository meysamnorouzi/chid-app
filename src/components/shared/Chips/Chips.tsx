/**
 * Chips Component
 * 
 * Reusable chip component with multiple variants, sizes, and states
 * Designed with SEO, accessibility, security, and modular structure in mind
 */

import { useContext } from 'react';
import { DocumentationThemeContext } from '../../../theme/DocumentationThemeContext';
import { documentationTheme } from '../../../theme/themes/documentationTheme';
import type { ChipProps } from './types';

const Chips = ({
  children,
  variant = 'primary',
  size = 'md',
  shape = 'default',
  disabled = false,
  leftIcon,
  rightIcon,
  deletable = false,
  onDelete,
  clickable = false,
  onClick,
  className = '',
  style,
  'aria-label': ariaLabel,
  ...rest
}: ChipProps) => {
  // Get theme from context, fallback to default theme if not in documentation context
  const themeContext = useContext(DocumentationThemeContext);
  const theme = themeContext?.theme || documentationTheme;

  // Size mappings
  const sizeMap = {
    xs: { 
      padding: 'px-2 py-0.5', 
      text: 'text-xs', 
      iconSize: 'w-3 h-3',
      height: 'h-5',
      gap: 'gap-1',
      deleteIconSize: 'w-2.5 h-2.5',
    },
    sm: { 
      padding: 'px-2.5 py-1', 
      text: 'text-sm', 
      iconSize: 'w-3.5 h-3.5',
      height: 'h-6',
      gap: 'gap-1.5',
      deleteIconSize: 'w-3 h-3',
    },
    md: { 
      padding: 'px-3 py-1.5', 
      text: 'text-sm', 
      iconSize: 'w-4 h-4',
      height: 'h-7',
      gap: 'gap-2',
      deleteIconSize: 'w-3.5 h-3.5',
    },
    lg: { 
      padding: 'px-4 py-2', 
      text: 'text-base', 
      iconSize: 'w-5 h-5',
      height: 'h-9',
      gap: 'gap-2',
      deleteIconSize: 'w-4 h-4',
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
      cursor: disabled ? 'not-allowed' : (clickable || deletable ? 'pointer' : 'default'),
      opacity: disabled ? 0.6 : 1,
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
    if (disabled) return {};

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

  // Delete icon
  const deleteIcon = (
    <svg
      className={sizeClasses.deleteIconSize}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled && onDelete) {
      onDelete();
    }
  };

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <div
      role={clickable ? 'button' : undefined}
      tabIndex={clickable && !disabled ? 0 : undefined}
      onClick={clickable ? handleClick : undefined}
      onKeyDown={(e) => {
        if (clickable && !disabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleClick();
        }
      }}
      className={`${sizeClasses.padding} ${sizeClasses.text} ${sizeClasses.height} ${sizeClasses.gap} ${shapeClass} ${className}`}
      style={{
        ...variantStyles,
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled && (clickable || deletable)) {
          Object.assign(e.currentTarget.style, hoverStyles);
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && (clickable || deletable)) {
          Object.assign(e.currentTarget.style, variantStyles);
        }
      }}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      {...rest}
    >
      {leftIcon && (
        <span className="flex items-center">
          {leftIcon}
        </span>
      )}
      <span className="flex items-center">
        {children}
      </span>
      {rightIcon && !deletable && (
        <span className="flex items-center">
          {rightIcon}
        </span>
      )}
      {deletable && (
        <button
          type="button"
          onClick={handleDelete}
          disabled={disabled}
          className="flex items-center ml-1 hover:opacity-70 transition-opacity"
          aria-label="Delete chip"
          style={{
            color: 'inherit',
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
        >
          {deleteIcon}
        </button>
      )}
    </div>
  );
};

export default Chips;


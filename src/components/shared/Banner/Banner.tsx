/**
 * Banner Component
 * 
 * Display informational banners with different types and variants
 * Designed with SEO, accessibility, security, and modular structure in mind
 */

import { useContext } from 'react';
import { DocumentationThemeContext } from '../../../theme/DocumentationThemeContext';
import { documentationTheme } from '../../../theme/themes/documentationTheme';
import type { BannerProps } from './types';

const Banner = ({
  title,
  description,
  children,
  type = 'info',
  variant = 'default',
  size = 'md',
  icon,
  closable = false,
  onClose,
  action,
  visible = true,
  className = '',
  style,
  'aria-label': ariaLabel,
}: BannerProps) => {
  // Get theme from context, fallback to default theme if not in documentation context
  const themeContext = useContext(DocumentationThemeContext);
  const theme = themeContext?.theme || documentationTheme;

  if (!visible) return null;

  // Size mappings
  const sizeMap = {
    sm: { padding: 'p-3', text: 'text-sm', title: 'text-sm', iconSize: 'w-4 h-4' },
    md: { padding: 'p-4', text: 'text-base', title: 'text-base', iconSize: 'w-5 h-5' },
    lg: { padding: 'p-5', text: 'text-lg', title: 'text-lg', iconSize: 'w-6 h-6' },
  };

  const sizeClasses = sizeMap[size];

  // Type color mappings
  const typeColorMap = {
    info: {
      bg: theme.colors.info.light,
      border: theme.colors.info.default,
      text: theme.colors.info.default,
      icon: theme.colors.info.default,
    },
    success: {
      bg: theme.colors.success.light,
      border: theme.colors.success.default,
      text: theme.colors.success.default,
      icon: theme.colors.success.default,
    },
    warning: {
      bg: theme.colors.warning.light,
      border: theme.colors.warning.default,
      text: theme.colors.warning.default,
      icon: theme.colors.warning.default,
    },
    error: {
      bg: theme.colors.danger.light,
      border: theme.colors.danger.default,
      text: theme.colors.danger.default,
      icon: theme.colors.danger.default,
    },
    neutral: {
      bg: theme.colors.gray[100],
      border: theme.colors.gray[300],
      text: theme.colors.gray[700],
      icon: theme.colors.gray[600],
    },
  };

  const colors = typeColorMap[type];

  // Variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'filled':
        return {
          backgroundColor: type === 'info' ? theme.colors.info.default :
            type === 'success' ? theme.colors.success.default :
            type === 'warning' ? theme.colors.warning.default :
            type === 'error' ? theme.colors.danger.default :
            theme.colors.gray[200],
          color: type === 'neutral' ? theme.colors.gray[700] : theme.colors.light.inverse,
          border: 'none',
        };
      case 'outlined':
        return {
          backgroundColor: 'transparent',
          color: colors.text,
          border: `2px solid ${colors.border}`,
        };
      case 'subtle':
        return {
          backgroundColor: theme.colors.gray[100],
          color: theme.colors.gray[700],
          border: `1px solid ${theme.colors.gray[200]}`,
        };
      default:
        return {
          backgroundColor: colors.bg,
          color: colors.text,
          border: `1px solid ${colors.border}`,
        };
    }
  };

  // Default icons for each type
  const getDefaultIcon = () => {
    if (icon) return icon;
    
    const iconColor = variant === 'filled' && type !== 'neutral' 
      ? theme.colors.light.inverse 
      : colors.icon;

    switch (type) {
      case 'info':
        return (
          <svg className={sizeClasses.iconSize} fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: iconColor }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'success':
        return (
          <svg className={sizeClasses.iconSize} fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: iconColor }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'warning':
        return (
          <svg className={sizeClasses.iconSize} fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: iconColor }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'error':
        return (
          <svg className={sizeClasses.iconSize} fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: iconColor }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const defaultIcon = getDefaultIcon();

  return (
    <div
      className={`flex items-start gap-3 ${sizeClasses.padding} rounded-lg ${className}`}
      style={{
        ...getVariantStyles(),
        ...style,
      }}
      role="alert"
      aria-label={ariaLabel || title || 'Banner'}
    >
      {/* Icon */}
      {defaultIcon && (
        <div className="shrink-0 mt-0.5">
          {defaultIcon}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        {title && (
          <h3 
            className={`${sizeClasses.title} font-semibold mb-1`}
            style={{ color: variant === 'filled' && type !== 'neutral' ? theme.colors.light.inverse : colors.text }}
          >
            {title}
          </h3>
        )}
        {description && (
          <p 
            className={sizeClasses.text}
            style={{ color: variant === 'filled' && type !== 'neutral' ? theme.colors.light.inverse : colors.text }}
          >
            {description}
          </p>
        )}
        {children && (
          <div 
            className={sizeClasses.text}
            style={{ color: variant === 'filled' && type !== 'neutral' ? theme.colors.light.inverse : colors.text }}
          >
            {children}
          </div>
        )}
        {action && (
          <div className="mt-3">
            {action}
          </div>
        )}
      </div>

      {/* Close Button */}
      {closable && onClose && (
        <button
          onClick={onClose}
          className="shrink-0 p-1 rounded transition-colors"
          style={{
            color: variant === 'filled' && type !== 'neutral' ? theme.colors.light.inverse : colors.text,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = variant === 'filled' && type !== 'neutral'
              ? 'rgba(255, 255, 255, 0.2)'
              : theme.colors.gray[200];
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
          aria-label="Close banner"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Banner;


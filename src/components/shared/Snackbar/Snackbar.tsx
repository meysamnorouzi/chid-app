/**
 * Snackbar Component
 * 
 * Display a snackbar notification
 * Designed with SEO, accessibility, security, and modular structure in mind
 */

import { useEffect, useContext } from 'react';
import { DocumentationThemeContext } from '../../../theme/DocumentationThemeContext';
import { documentationTheme } from '../../../theme/themes/documentationTheme';
import type { SnackbarProps } from './types';

const Snackbar = ({
  message,
  type = 'info',
  variant = 'default',
  size = 'md',
  position = 'bottom-center',
  icon,
  action,
  closable = true,
  duration = 5000,
  visible = true,
  onClose,
  className = '',
  style,
  'aria-label': ariaLabel,
}: SnackbarProps) => {
  // Get theme from context, fallback to default theme if not in documentation context
  const themeContext = useContext(DocumentationThemeContext);
  const theme = themeContext?.theme || documentationTheme;

  const isDark = theme.mode === 'dark';

  // Auto-dismiss after duration
  useEffect(() => {
    if (visible && duration && duration > 0 && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, duration, onClose]);

  if (!visible) return null;

  // Size mappings
  const sizeMap = {
    sm: {
      padding: 'px-3 py-2',
      text: 'text-sm',
      iconSize: 'w-4 h-4',
      gap: 'gap-2',
    },
    md: {
      padding: 'px-4 py-3',
      text: 'text-base',
      iconSize: 'w-5 h-5',
      gap: 'gap-3',
    },
    lg: {
      padding: 'px-5 py-4',
      text: 'text-lg',
      iconSize: 'w-6 h-6',
      gap: 'gap-4',
    },
  };

  const sizeClasses = sizeMap[size];

  // Position mappings
  const positionMap = {
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4',
  };

  const positionClass = positionMap[position];

  // Type color mappings
  const typeColorMap = {
    info: {
      bg: theme.colors.info.light,
      border: theme.colors.info.default,
      text: theme.colors.info.default,
      icon: theme.colors.info.default,
      filledBg: theme.colors.info.default,
      filledText: theme.colors.info.inverse,
    },
    success: {
      bg: theme.colors.success.light,
      border: theme.colors.success.default,
      text: theme.colors.success.default,
      icon: theme.colors.success.default,
      filledBg: theme.colors.success.default,
      filledText: theme.colors.success.inverse,
    },
    warning: {
      bg: theme.colors.warning.light,
      border: theme.colors.warning.default,
      text: theme.colors.warning.default,
      icon: theme.colors.warning.default,
      filledBg: theme.colors.warning.default,
      filledText: theme.colors.warning.inverse,
    },
    error: {
      bg: theme.colors.danger.light,
      border: theme.colors.danger.default,
      text: theme.colors.danger.default,
      icon: theme.colors.danger.default,
      filledBg: theme.colors.danger.default,
      filledText: theme.colors.danger.inverse,
    },
  };

  const colors = typeColorMap[type];

  // Get variant styles
  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'filled':
        return {
          backgroundColor: colors.filledBg,
          color: colors.filledText,
          border: 'none',
        };
      case 'outlined':
        return {
          backgroundColor: isDark ? theme.colors.gray[200] : theme.colors.light.inverse,
          color: colors.text,
          border: `1px solid ${colors.border}`,
        };
      default:
        return {
          backgroundColor: isDark ? theme.colors.gray[200] : theme.colors.light.inverse,
          color: colors.text,
          border: `1px solid ${colors.border}`,
        };
    }
  };

  // Default icons for each type
  const getDefaultIcon = () => {
    if (icon) return icon;

    switch (type) {
      case 'info':
        return (
          <svg className={sizeClasses.iconSize} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'success':
        return (
          <svg className={sizeClasses.iconSize} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'warning':
        return (
          <svg className={sizeClasses.iconSize} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'error':
        return (
          <svg className={sizeClasses.iconSize} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  // Close icon
  const CloseIcon = (
    <svg className={sizeClasses.iconSize} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  return (
    <div
      className={`fixed ${positionClass} z-50 min-w-[300px] max-w-md rounded-lg shadow-lg transition-all duration-300 ${className}`}
      style={{
        ...getVariantStyles(),
        ...style,
      }}
      role="alert"
      aria-live="polite"
      aria-label={ariaLabel || `Snackbar: ${type}`}
    >
      <div className={`flex items-center ${sizeClasses.padding} ${sizeClasses.gap}`}>
        {/* Icon */}
        <div style={{ color: variant === 'filled' ? colors.filledText : colors.icon }}>
          {getDefaultIcon()}
        </div>

        {/* Message */}
        <div className={`flex-1 ${sizeClasses.text}`}>
          {message}
        </div>

        {/* Action */}
        {action && (
          <div className="flex items-center">
            {action}
          </div>
        )}

        {/* Close Button */}
        {closable && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center hover:opacity-70 transition-opacity ml-2"
            style={{
              color: variant === 'filled' ? colors.filledText : colors.text,
            }}
            aria-label="Close snackbar"
          >
            {CloseIcon}
          </button>
        )}
      </div>
    </div>
  );
};

export default Snackbar;


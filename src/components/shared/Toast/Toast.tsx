/**
 * Toast Component
 * 
 * Display toast notifications with different types
 * Designed with SEO, accessibility, security, and modular structure in mind
 */

import { useEffect, useContext } from 'react';
import { DocumentationThemeContext } from '../../../theme/DocumentationThemeContext';
import { documentationTheme } from '../../../theme/themes/documentationTheme';
import type { ToastProps } from './types';

const Toast = ({
  message,
  title,
  type = 'info',
  icon,
  duration = 5000,
  closable = true,
  onClose,
  action,
  className = '',
  style,
  'aria-label': ariaLabel,
}: ToastProps) => {
  // Get theme from context, fallback to default theme if not in documentation context
  const themeContext = useContext(DocumentationThemeContext);
  const theme = themeContext?.theme || documentationTheme;

  // Auto-dismiss after duration
  useEffect(() => {
    if (duration && duration > 0 && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

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
  };

  const colors = typeColorMap[type];

  // Default icons for each type
  const getDefaultIcon = () => {
    if (icon) return icon;

    switch (type) {
      case 'info':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: colors.icon }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'success':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: colors.icon }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: colors.icon }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: colors.icon }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const defaultIcon = getDefaultIcon();

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-lg shadow-lg min-w-[300px] max-w-[500px] ${className}`}
      style={{
        backgroundColor: theme.background.card,
        border: `1px solid ${colors.border}`,
        boxShadow: theme.boxShadows.default,
        ...style,
      }}
      role="alert"
      aria-label={ariaLabel || title || message}
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
          <h4 
            className="text-sm font-semibold mb-1"
            style={{ color: colors.text }}
          >
            {title}
          </h4>
        )}
        <p 
          className="text-sm"
          style={{ color: theme.colors.gray[700] }}
        >
          {message}
        </p>
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
            color: theme.colors.gray[500],
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = theme.colors.gray[200];
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
          aria-label="Close toast"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Toast;


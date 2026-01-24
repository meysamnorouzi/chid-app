/**
 * Loader Component
 * 
 * Display a loading indicator with multiple variants
 * Designed with SEO, accessibility, security, and modular structure in mind
 */

import { useContext } from 'react';
import { DocumentationThemeContext } from '../../../theme/DocumentationThemeContext';
import { documentationTheme } from '../../../theme/themes/documentationTheme';
import type { LoaderProps } from './types';

const Loader = ({
  variant = 'spinner',
  size = 'md',
  color = 'primary',
  label,
  fullScreen = false,
  className = '',
  style,
  'aria-label': ariaLabel,
}: LoaderProps) => {
  // Get theme from context, fallback to default theme if not in documentation context
  const themeContext = useContext(DocumentationThemeContext);
  const theme = themeContext?.theme || documentationTheme;

  const isDark = theme.mode === 'dark';

  // Size mappings
  const sizeMap = {
    xs: {
      size: 'w-3 h-3',
      text: 'text-xs',
      gap: 'gap-1',
    },
    sm: {
      size: 'w-4 h-4',
      text: 'text-sm',
      gap: 'gap-1.5',
    },
    md: {
      size: 'w-6 h-6',
      text: 'text-base',
      gap: 'gap-2',
    },
    lg: {
      size: 'w-8 h-8',
      text: 'text-lg',
      gap: 'gap-2.5',
    },
    xl: {
      size: 'w-12 h-12',
      text: 'text-xl',
      gap: 'gap-3',
    },
  };

  const sizeClasses = sizeMap[size];

  // Get color styles
  const getColorStyles = () => {
    const colorMap = {
      primary: theme.colors.primary.default,
      secondary: theme.colors.secondary.default,
      success: theme.colors.success.default,
      warning: theme.colors.warning.default,
      danger: theme.colors.danger.default,
      info: theme.colors.info.default,
      gray: theme.colors.gray[500],
      white: '#ffffff',
    };

    return colorMap[color];
  };

  const loaderColor = getColorStyles();

  // Render different variants
  const renderSpinner = () => (
    <svg
      className={`animate-spin ${sizeClasses.size}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      style={{ color: loaderColor }}
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

  const renderDots = () => (
    <div className="flex items-center gap-1.5">
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={`rounded-full ${size === 'xs' ? 'w-1.5 h-1.5' : size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-2.5 h-2.5' : size === 'lg' ? 'w-3 h-3' : 'w-4 h-4'}`}
          style={{
            backgroundColor: loaderColor,
            animation: `pulse 1.4s ease-in-out ${index * 0.16}s infinite both`,
          }}
        />
      ))}
    </div>
  );

  const renderBars = () => (
    <div className="flex items-end gap-1">
      {[0, 1, 2, 3].map((index) => (
        <div
          key={index}
          className={`${size === 'xs' ? 'w-1' : size === 'sm' ? 'w-1.5' : size === 'md' ? 'w-2' : size === 'lg' ? 'w-2.5' : 'w-3'}`}
          style={{
            backgroundColor: loaderColor,
            height: size === 'xs' ? '12px' : size === 'sm' ? '16px' : size === 'md' ? '20px' : size === 'lg' ? '24px' : '32px',
            animation: `loaderBars 1.2s ease-in-out ${index * 0.1}s infinite`,
          }}
        />
      ))}
    </div>
  );

  const renderPulse = () => (
    <div
      className={`rounded-full ${sizeClasses.size}`}
      style={{
        backgroundColor: loaderColor,
        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }}
    />
  );

  const renderRing = () => (
    <div
      className={`rounded-full border-2 ${sizeClasses.size}`}
      style={{
        borderColor: `${loaderColor}40`,
        borderTopColor: loaderColor,
        animation: 'spin 1s linear infinite',
      }}
    />
  );

  const renderLoader = () => {
    switch (variant) {
      case 'dots':
        return renderDots();
      case 'bars':
        return renderBars();
      case 'pulse':
        return renderPulse();
      case 'ring':
        return renderRing();
      default:
        return renderSpinner();
    }
  };

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    ...(fullScreen && {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999,
      backgroundColor: isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)',
    }),
    ...style,
  };

  return (
    <div
      className={`${fullScreen ? '' : 'inline-flex'} ${sizeClasses.gap} ${className}`}
      style={containerStyles}
      role="status"
      aria-label={ariaLabel || label || 'Loading'}
      aria-live="polite"
    >
      {renderLoader()}
      {label && (
        <span
          className={sizeClasses.text}
          style={{
            color: isDark ? theme.colors.gray[700] : theme.colors.gray[600],
            marginTop: '8px',
          }}
        >
          {label}
        </span>
      )}
      <style>{`
        @keyframes loaderBars {
          0%, 40%, 100% {
            transform: scaleY(0.4);
          }
          20% {
            transform: scaleY(1);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;


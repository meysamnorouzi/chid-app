/**
 * Progress Component
 * 
 * Display a progress bar with multiple variants and colors
 * Designed with SEO, accessibility, security, and modular structure in mind
 */

import { useContext } from 'react';
import { DocumentationThemeContext } from '../../../theme/DocumentationThemeContext';
import { documentationTheme } from '../../../theme/themes/documentationTheme';
import type { ProgressProps } from './types';

const Progress = ({
  value = 0,
  max = 100,
  variant = 'default',
  size = 'md',
  color = 'primary',
  showLabel = false,
  label,
  labelPosition = 'inside',
  indeterminate = false,
  className = '',
  style,
  'aria-label': ariaLabel,
}: ProgressProps) => {
  // Get theme from context, fallback to default theme if not in documentation context
  const themeContext = useContext(DocumentationThemeContext);
  const theme = themeContext?.theme || documentationTheme;

  const isDark = theme.mode === 'dark';

  // Size mappings
  const sizeMap = {
    sm: {
      height: 'h-1',
      text: 'text-xs',
      padding: 'px-2',
    },
    md: {
      height: 'h-2',
      text: 'text-sm',
      padding: 'px-3',
    },
    lg: {
      height: 'h-3',
      text: 'text-base',
      padding: 'px-4',
    },
  };

  const sizeClasses = sizeMap[size];

  // Calculate percentage
  const percentage = indeterminate ? undefined : Math.min(Math.max((value / max) * 100, 0), 100);

  // Get color styles
  const getColorStyles = () => {
    const colorMap = {
      primary: {
        backgroundColor: theme.colors.primary.default,
        textColor: theme.colors.primary.inverse,
      },
      secondary: {
        backgroundColor: theme.colors.secondary.default,
        textColor: theme.colors.secondary.inverse,
      },
      success: {
        backgroundColor: theme.colors.success.default,
        textColor: theme.colors.success.inverse,
      },
      warning: {
        backgroundColor: theme.colors.warning.default,
        textColor: theme.colors.warning.inverse,
      },
      danger: {
        backgroundColor: theme.colors.danger.default,
        textColor: theme.colors.danger.inverse,
      },
      info: {
        backgroundColor: theme.colors.info.default,
        textColor: theme.colors.info.inverse,
      },
    };

    return colorMap[color];
  };

  const colorStyles = getColorStyles();

  // Variant styles
  const getVariantStyles = () => {
    const baseStyles: React.CSSProperties = {
      backgroundColor: colorStyles.backgroundColor,
    };

    switch (variant) {
      case 'striped':
        return {
          ...baseStyles,
          backgroundImage: `linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent)`,
          backgroundSize: '1rem 1rem',
        };
      case 'animated':
        return {
          ...baseStyles,
          backgroundImage: `linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent)`,
          backgroundSize: '1rem 1rem',
          animation: 'progressStripes 1s linear infinite',
        };
      default:
        return baseStyles;
    }
  };

  const variantStyles = getVariantStyles();

  // Get label text
  const getLabelText = () => {
    if (label) return label;
    if (showLabel && percentage !== undefined) {
      return `${Math.round(percentage)}%`;
    }
    return null;
  };

  const labelText = getLabelText();
  const showLabelInside = labelText && labelPosition === 'inside';
  const showLabelOutside = labelText && labelPosition === 'outside';

  return (
    <div className={`w-full ${className}`} style={style}>
      {/* Outside Label */}
      {showLabelOutside && (
        <div className="flex justify-between items-center mb-1">
          <span
            className={sizeClasses.text}
            style={{
              color: isDark ? theme.colors.gray[700] : theme.colors.gray[600],
            }}
          >
            {labelText}
          </span>
        </div>
      )}

      {/* Progress Bar Container */}
      <div
        className={`w-full ${sizeClasses.height} rounded-full overflow-hidden relative`}
        style={{
          backgroundColor: isDark ? theme.colors.gray[300] : theme.colors.gray[200],
        }}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={ariaLabel || `Progress: ${percentage !== undefined ? `${Math.round(percentage)}%` : 'indeterminate'}`}
      >
        {/* Progress Bar Fill */}
        {indeterminate ? (
          <div
            className={`${sizeClasses.height} rounded-full`}
            style={{
              ...variantStyles,
              width: '30%',
              animation: 'progressIndeterminate 1.5s ease-in-out infinite',
            }}
          />
        ) : (
          <div
            className={`${sizeClasses.height} rounded-full transition-all duration-300 relative`}
            style={{
              ...variantStyles,
              width: `${percentage}%`,
            }}
          >
            {/* Inside Label */}
            {showLabelInside && (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  color: colorStyles.textColor,
                  fontWeight: 600,
                }}
              >
                <span className={sizeClasses.text}>{labelText}</span>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes progressStripes {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 1rem 0;
          }
        }
        @keyframes progressIndeterminate {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(400%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
};

export default Progress;


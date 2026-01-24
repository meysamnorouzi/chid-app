/**
 * Radio Component
 * 
 * Display a radio button input
 * Designed with SEO, accessibility, security, and modular structure in mind
 */

import { useContext } from 'react';
import { DocumentationThemeContext } from '../../../theme/DocumentationThemeContext';
import { documentationTheme } from '../../../theme/themes/documentationTheme';
import type { RadioProps } from './types';

const Radio = ({
  label,
  value,
  checked = false,
  disabled = false,
  variant = 'default',
  size = 'md',
  name,
  onChange,
  className = '',
  style,
  'aria-label': ariaLabel,
}: RadioProps) => {
  // Get theme from context, fallback to default theme if not in documentation context
  const themeContext = useContext(DocumentationThemeContext);
  const theme = themeContext?.theme || documentationTheme;

  const isDark = theme.mode === 'dark';

  // Size mappings
  const sizeMap = {
    sm: {
      radioSize: 'w-3.5 h-3.5',
      dotSize: 'w-1.5 h-1.5',
      text: 'text-xs',
      gap: 'gap-1.5',
    },
    md: {
      radioSize: 'w-4 h-4',
      dotSize: 'w-2 h-2',
      text: 'text-sm',
      gap: 'gap-2',
    },
    lg: {
      radioSize: 'w-5 h-5',
      dotSize: 'w-2.5 h-2.5',
      text: 'text-base',
      gap: 'gap-2.5',
    },
  };

  const sizeClasses = sizeMap[size];

  // Variant styles
  const getVariantStyles = () => {
    const baseStyles: React.CSSProperties = {
      borderRadius: '50%',
      border: `2px solid ${isDark ? theme.colors.gray[400] : theme.colors.gray[300]}`,
      backgroundColor: 'transparent',
      transition: 'all 0.2s ease-in-out',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1,
    };

    if (checked) {
      switch (variant) {
        case 'outline':
          return {
            ...baseStyles,
            borderColor: theme.colors.primary.default,
            backgroundColor: 'transparent',
          };
        case 'filled':
          return {
            ...baseStyles,
            borderColor: theme.colors.primary.default,
            backgroundColor: theme.colors.primary.default,
          };
        default:
          return {
            ...baseStyles,
            borderColor: theme.colors.primary.default,
            backgroundColor: 'transparent',
          };
      }
    }

    return baseStyles;
  };

  const handleChange = () => {
    if (!disabled && onChange) {
      onChange(value);
    }
  };

  const radioStyles = getVariantStyles();

  return (
    <label
      className={`inline-flex items-center ${sizeClasses.gap} ${className} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      style={style}
    >
      <div className="relative">
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
          className="sr-only"
          aria-label={ariaLabel || (typeof label === 'string' ? label : undefined)}
          aria-disabled={disabled}
        />
        <div
          className={`${sizeClasses.radioSize} rounded-full flex items-center justify-center`}
          style={radioStyles}
          onClick={handleChange}
          onMouseEnter={(e) => {
            if (!disabled && !checked) {
              e.currentTarget.style.borderColor = isDark ? theme.colors.gray[500] : theme.colors.gray[400];
            }
          }}
          onMouseLeave={(e) => {
            if (!disabled && !checked) {
              e.currentTarget.style.borderColor = radioStyles.border as string;
            }
          }}
        >
          {checked && (
            <div
              className={`${sizeClasses.dotSize} rounded-full`}
              style={{
                backgroundColor: variant === 'filled' 
                  ? theme.colors.primary.inverse 
                  : theme.colors.primary.default,
              }}
            />
          )}
        </div>
      </div>
      {label && (
        <span
          className={sizeClasses.text}
          style={{
            color: disabled
              ? (isDark ? theme.colors.gray[500] : theme.colors.gray[400])
              : (isDark ? theme.colors.gray[800] : theme.colors.gray[700]),
          }}
        >
          {label}
        </span>
      )}
    </label>
  );
};

export default Radio;


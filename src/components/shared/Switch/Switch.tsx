/**
 * Switch Component
 * 
 * Display a switch/toggle button
 * Designed with SEO, accessibility, security, and modular structure in mind
 */

import { useState, useContext } from 'react';
import { DocumentationThemeContext } from '../../../theme/DocumentationThemeContext';
import { documentationTheme } from '../../../theme/themes/documentationTheme';
import type { SwitchProps } from './types';

const Switch = ({
  checked: controlledChecked,
  defaultChecked = false,
  disabled = false,
  variant = 'default',
  size = 'md',
  label,
  description,
  labelPosition = 'right',
  onChange,
  className = '',
  style,
  'aria-label': ariaLabel,
  name,
  value,
  id,
}: SwitchProps) => {
  // Get theme from context, fallback to default theme if not in documentation context
  const themeContext = useContext(DocumentationThemeContext);
  const theme = themeContext?.theme || documentationTheme;

  const isDark = theme.mode === 'dark';
  const isControlled = controlledChecked !== undefined;
  const [internalChecked, setInternalChecked] = useState<boolean>(defaultChecked);

  const checked = isControlled ? controlledChecked : internalChecked;

  // Size mappings
  const sizeMap = {
    sm: {
      trackWidth: 'w-8',
      trackHeight: 'h-4',
      thumbSize: 'w-3 h-3',
      thumbTranslate: 'translate-x-4',
      labelText: 'text-sm',
      descriptionText: 'text-xs',
      gap: 'gap-2',
    },
    md: {
      trackWidth: 'w-11',
      trackHeight: 'h-6',
      thumbSize: 'w-5 h-5',
      thumbTranslate: 'translate-x-5',
      labelText: 'text-base',
      descriptionText: 'text-sm',
      gap: 'gap-2.5',
    },
    lg: {
      trackWidth: 'w-14',
      trackHeight: 'h-7',
      thumbSize: 'w-6 h-6',
      thumbTranslate: 'translate-x-7',
      labelText: 'text-lg',
      descriptionText: 'text-base',
      gap: 'gap-3',
    },
  };

  const sizeClasses = sizeMap[size];

  // Handle change
  const handleChange = () => {
    if (disabled) return;

    const newChecked = !checked;
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    onChange?.(newChecked);
  };

  // Get variant styles
  const getTrackStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      transition: 'all 0.2s ease-in-out',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1,
    };

    if (checked) {
      switch (variant) {
        case 'filled':
          return {
            ...baseStyles,
            backgroundColor: disabled
              ? (isDark ? theme.colors.gray[400] : theme.colors.gray[300])
              : theme.colors.primary.default,
          };
        default:
          return {
            ...baseStyles,
            backgroundColor: disabled
              ? (isDark ? theme.colors.gray[400] : theme.colors.gray[300])
              : theme.colors.primary.default,
          };
      }
    }

    return {
      ...baseStyles,
      backgroundColor: disabled
        ? (isDark ? theme.colors.gray[300] : theme.colors.gray[200])
        : (isDark ? theme.colors.gray[400] : theme.colors.gray[300]),
    };
  };

  const getThumbStyles = (): React.CSSProperties => {
    return {
      transition: 'all 0.2s ease-in-out',
      backgroundColor: checked
        ? theme.colors.light.inverse
        : (isDark ? theme.colors.gray[200] : theme.colors.light.inverse),
      boxShadow: theme.boxShadows.light,
    };
  };

  const switchElement = (
    <div className="flex items-center">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-disabled={disabled}
        aria-label={ariaLabel || label || 'Switch'}
        onClick={handleChange}
        disabled={disabled}
        className={`relative ${sizeClasses.trackWidth} ${sizeClasses.trackHeight} rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2`}
        style={{
          ...getTrackStyles(),
        }}
      >
        {/* Hidden input for form submission */}
        <input
          type="checkbox"
          checked={checked}
          onChange={() => {}}
          name={name}
          value={value}
          id={id}
          disabled={disabled}
          className="sr-only"
          aria-hidden="true"
        />

        {/* Thumb */}
        <span
          className={`absolute top-0.5 left-0.5 ${sizeClasses.thumbSize} rounded-full transform transition-transform duration-200 ${
            checked ? sizeClasses.thumbTranslate : 'translate-x-0'
          }`}
          style={getThumbStyles()}
        />
      </button>
    </div>
  );

  if (!label && !description) {
    return (
      <div className={`inline-flex ${className}`} style={style}>
        {switchElement}
      </div>
    );
  }

  return (
    <label
      className={`inline-flex items-start ${sizeClasses.gap} ${className} ${
        disabled ? 'cursor-not-allowed' : 'cursor-pointer'
      }`}
      style={style}
    >
      {labelPosition === 'left' && (
        <div className="flex flex-col">
          {label && (
            <span
              className={sizeClasses.labelText}
              style={{
                color: disabled
                  ? (isDark ? theme.colors.gray[500] : theme.colors.gray[400])
                  : (isDark ? theme.colors.gray[800] : theme.colors.gray[700]),
                fontWeight: 500,
              }}
            >
              {label}
            </span>
          )}
          {description && (
            <span
              className={`${sizeClasses.descriptionText} mt-0.5`}
              style={{
                color: disabled
                  ? (isDark ? theme.colors.gray[400] : theme.colors.gray[300])
                  : (isDark ? theme.colors.gray[600] : theme.colors.gray[500]),
              }}
            >
              {description}
            </span>
          )}
        </div>
      )}
      
      {switchElement}
      
      {labelPosition === 'right' && (
        <div className="flex flex-col">
          {label && (
            <span
              className={sizeClasses.labelText}
              style={{
                color: disabled
                  ? (isDark ? theme.colors.gray[500] : theme.colors.gray[400])
                  : (isDark ? theme.colors.gray[800] : theme.colors.gray[700]),
                fontWeight: 500,
              }}
            >
              {label}
            </span>
          )}
          {description && (
            <span
              className={`${sizeClasses.descriptionText} mt-0.5`}
              style={{
                color: disabled
                  ? (isDark ? theme.colors.gray[400] : theme.colors.gray[300])
                  : (isDark ? theme.colors.gray[600] : theme.colors.gray[500]),
              }}
            >
              {description}
            </span>
          )}
        </div>
      )}
    </label>
  );
};

export default Switch;


/**
 * Checkbox Component
 * 
 * Reusable checkbox component with multiple variants, sizes, and states
 * Designed with SEO, accessibility, security, and modular structure in mind
 */

import { useRef, useEffect, useContext } from 'react';
import { DocumentationThemeContext } from '../../../theme/DocumentationThemeContext';
import { documentationTheme } from '../../../theme/themes/documentationTheme';
import type { CheckboxProps } from './types';

const Checkbox = ({
  checked,
  defaultChecked = false,
  disabled = false,
  indeterminate = false,
  label,
  description,
  variant = 'default',
  size = 'md',
  shape = 'square',
  className = '',
  style,
  onChange,
  name,
  value,
  'aria-label': ariaLabel,
  id,
}: CheckboxProps) => {
  // Get theme from context, fallback to default theme if not in documentation context
  const themeContext = useContext(DocumentationThemeContext);
  const theme = themeContext?.theme || documentationTheme;

  const inputRef = useRef<HTMLInputElement>(null);
  const isControlled = checked !== undefined;

  // Handle indeterminate state
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  // Size mappings
  const sizeMap = {
    sm: {
      checkboxSize: 'w-[1.125rem] h-[1.125rem]',
      iconSize: 'w-2.5 h-2.5',
      labelText: 'text-sm',
      descriptionText: 'text-xs',
      gap: 'gap-2',
      padding: 'p-0.5',
    },
    md: {
      checkboxSize: 'w-[1.375rem] h-[1.375rem]',
      iconSize: 'w-3 h-3',
      labelText: 'text-base',
      descriptionText: 'text-sm',
      gap: 'gap-2.5',
      padding: 'p-0.5',
    },
    lg: {
      checkboxSize: 'w-[1.625rem] h-[1.625rem]',
      iconSize: 'w-3.5 h-3.5',
      labelText: 'text-lg',
      descriptionText: 'text-base',
      gap: 'gap-3',
      padding: 'p-0.5',
    },
  };

  const sizeClasses = sizeMap[size];

  // Shape mappings
  const shapeMap = {
    square: 'rounded',
    rounded: 'rounded-lg',
  };

  const shapeClass = shapeMap[shape];

  // Variant styles
  const getVariantStyles = (isChecked: boolean, isIndeterminate: boolean) => {
    const isActive = isChecked || isIndeterminate;

    switch (variant) {
      case 'filled':
        return {
          backgroundColor: disabled
            ? theme.colors.gray[200]
            : isActive
              ? theme.colors.primary.default
              : theme.colors.gray[100],
          border: `2px solid ${
            disabled
              ? theme.colors.gray[300]
              : isActive
                ? theme.colors.primary.default
                : theme.colors.gray[300]
          }`,
        };
      case 'outlined':
        return {
          backgroundColor: 'transparent',
          border: `2px solid ${
            disabled
              ? theme.colors.gray[300]
              : isActive
                ? theme.colors.primary.default
                : theme.colors.gray[400]
          }`,
        };
      default:
        return {
          backgroundColor: disabled
            ? theme.colors.gray[100]
            : isActive
              ? theme.colors.primary.default
              : theme.colors.light.inverse,
          border: `2px solid ${
            disabled
              ? theme.colors.gray[300]
              : isActive
                ? theme.colors.primary.default
                : theme.colors.gray[400]
          }`,
        };
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    onChange?.(e.target.checked, e);
  };

  const isChecked = isControlled ? checked : undefined;
  const checkboxValue = isChecked ?? defaultChecked;
  const activeStyles = getVariantStyles(checkboxValue, indeterminate);

  // Check icon
  const renderCheckIcon = () => {
    if (indeterminate) {
      const iconColor = variant === 'filled' || variant === 'outlined'
        ? theme.colors.primary.default
        : theme.colors.primary.inverse;
      
      return (
        <svg
          className={sizeClasses.iconSize}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          style={{ color: iconColor }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M5 12h14"
          />
        </svg>
      );
    }

    if (!checkboxValue) return null;

    const iconColor = variant === 'filled' || variant === 'outlined'
      ? theme.colors.primary.default
      : theme.colors.primary.inverse;

    return (
      <svg
        className={sizeClasses.iconSize}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        style={{ color: iconColor }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
          d="M5 13l4 4L19 7"
        />
      </svg>
    );
  };

  return (
    <label
      className={`inline-flex items-start ${sizeClasses.gap} cursor-pointer ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
      style={style}
    >
      {/* Checkbox Input (hidden, for form submission) */}
      <input
        ref={inputRef}
        type="checkbox"
        checked={isChecked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={handleChange}
        name={name}
        value={value}
        id={id}
        aria-label={ariaLabel || (typeof label === 'string' ? label : 'Checkbox')}
        className="sr-only"
      />

      {/* Visual Checkbox */}
      <div
        className={`relative flex items-center justify-center ${sizeClasses.checkboxSize} ${shapeClass} transition-all duration-200 ${sizeClasses.padding}`}
        style={{
          ...activeStyles,
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
      >
        {renderCheckIcon()}
      </div>

      {/* Label and Description */}
      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <span
              className={sizeClasses.labelText}
              style={{
                color: disabled
                  ? theme.colors.gray[500]
                  : theme.colors.gray[700],
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
                  ? theme.colors.gray[400]
                  : theme.colors.gray[600],
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

export default Checkbox;


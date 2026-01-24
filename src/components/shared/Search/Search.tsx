/**
 * Search Component
 * 
 * Display a search input field
 * Designed with SEO, accessibility, security, and modular structure in mind
 */

import { useState, useRef, useContext } from 'react';
import { DocumentationThemeContext } from '../../../theme/DocumentationThemeContext';
import { documentationTheme } from '../../../theme/themes/documentationTheme';
import type { SearchProps } from './types';

const Search = ({
  variant = 'default',
  size = 'md',
  label,
  helperText,
  errorText,
  disabled = false,
  loading = false,
  clearable = true,
  leftIcon,
  rightIcon,
  value: controlledValue,
  defaultValue,
  onChange,
  onSearch,
  placeholder = 'Search...',
  className = '',
  style,
  'aria-label': ariaLabel,
  ...rest
}: SearchProps) => {
  // Get theme from context, fallback to default theme if not in documentation context
  const themeContext = useContext(DocumentationThemeContext);
  const theme = themeContext?.theme || documentationTheme;

  const isDark = theme.mode === 'dark';
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<string>(defaultValue?.toString() || '');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentValue = isControlled ? controlledValue?.toString() || '' : internalValue;

  // Size mappings
  const sizeMap = {
    sm: {
      padding: 'px-3 py-1.5',
      text: 'text-sm',
      iconSize: 'w-4 h-4',
      height: 'h-8',
      gap: 'gap-2',
      labelText: 'text-sm',
      helperText: 'text-xs',
    },
    md: {
      padding: 'px-4 py-2',
      text: 'text-base',
      iconSize: 'w-5 h-5',
      height: 'h-10',
      gap: 'gap-3',
      labelText: 'text-base',
      helperText: 'text-sm',
    },
    lg: {
      padding: 'px-5 py-3',
      text: 'text-lg',
      iconSize: 'w-6 h-6',
      height: 'h-12',
      gap: 'gap-3',
      labelText: 'text-lg',
      helperText: 'text-base',
    },
  };

  const sizeClasses = sizeMap[size];

  // Handle value change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  // Handle search
  const handleSearch = () => {
    onSearch?.(currentValue);
  };

  // Handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
    rest.onKeyDown?.(e);
  };

  // Default search icon
  const defaultLeftIcon = (
    <svg
      className={sizeClasses.iconSize}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );

  // Loading spinner
  const loadingSpinner = (
    <svg
      className={`${sizeClasses.iconSize} animate-spin`}
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

  // Get variant styles
  const getVariantStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      transition: 'all 0.2s ease-in-out',
      outline: 'none',
    };

    const isError = !!errorText;
    const focused = isFocused;

    switch (variant) {
      case 'filled':
        return {
          ...baseStyles,
          backgroundColor: 'transparent',
          border: `1px solid ${
            isError
              ? theme.colors.danger.default
              : focused
              ? theme.colors.primary.default
              : 'transparent'
          }`,
          color: disabled
            ? (isDark ? theme.colors.gray[500] : theme.colors.gray[400])
            : (isDark ? theme.colors.gray[800] : theme.colors.gray[700]),
        };
      case 'outlined':
        return {
          ...baseStyles,
          backgroundColor: 'transparent',
          border: `1px solid ${
            isError
              ? theme.colors.danger.default
              : focused
              ? theme.colors.primary.default
              : isDark
              ? theme.colors.gray[400]
              : theme.colors.gray[300]
          }`,
          color: disabled
            ? (isDark ? theme.colors.gray[500] : theme.colors.gray[400])
            : (isDark ? theme.colors.gray[800] : theme.colors.gray[700]),
        };
      default:
        return {
          ...baseStyles,
          backgroundColor: 'transparent',
          border: `1px solid ${
            isError
              ? theme.colors.danger.default
              : focused
              ? theme.colors.primary.default
              : isDark
              ? theme.colors.gray[300]
              : theme.colors.gray[200]
          }`,
          color: disabled
            ? (isDark ? theme.colors.gray[500] : theme.colors.gray[400])
            : (isDark ? theme.colors.gray[800] : theme.colors.gray[700]),
        };
    }
  };

  return (
    <div className={`w-full ${className}`} style={style}>
      {/* Label */}
      {label && (
        <label
          className={`block ${sizeClasses.labelText} font-medium mb-2`}
          style={{
            color: isDark ? theme.colors.gray[800] : theme.colors.gray[700],
          }}
        >
          {label}
        </label>
      )}

      {/* Search Input Container */}
      <div className="relative w-full">
        {/* Left Icon - Single Search Icon */}
        <div
          className="absolute left-0 top-0 bottom-0 flex items-center pointer-events-none"
          style={{
            paddingLeft: size === 'sm' ? '0.75rem' : size === 'md' ? '1rem' : '1.25rem',
            color: disabled
              ? (isDark ? theme.colors.gray[500] : theme.colors.gray[400])
              : (isDark ? theme.colors.gray[600] : theme.colors.gray[500]),
          }}
        >
          {loading ? loadingSpinner : (leftIcon || defaultLeftIcon)}
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={currentValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={disabled || loading}
          className={`w-full ${sizeClasses.text} ${sizeClasses.height} rounded-lg ${sizeClasses.padding}`}
          style={{
            ...getVariantStyles(),
            paddingLeft: size === 'sm' ? '2.25rem' : size === 'md' ? '2.75rem' : '3.5rem',
            paddingRight: size === 'sm' ? '0.75rem' : size === 'md' ? '1rem' : '1.25rem',
          }}
          aria-label={ariaLabel || label || 'Search input'}
          aria-disabled={disabled}
          aria-invalid={!!errorText}
          {...rest}
        />
      </div>

      {/* Helper Text / Error Text */}
      {(helperText || errorText) && (
        <div
          className={`mt-1 ${sizeClasses.helperText}`}
          style={{
            color: errorText
              ? theme.colors.danger.default
              : isDark
              ? theme.colors.gray[600]
              : theme.colors.gray[500],
          }}
        >
          {errorText || helperText}
        </div>
      )}
    </div>
  );
};

export default Search;


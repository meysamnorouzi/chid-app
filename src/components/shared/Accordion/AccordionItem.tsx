/**
 * AccordionItem Component
 * 
 * Single accordion item with expand/collapse functionality
 * Designed with SEO, accessibility, security, and modular structure in mind
 */

import { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { DocumentationThemeContext } from '../../../theme/DocumentationThemeContext';
import { documentationTheme } from '../../../theme/themes/documentationTheme';
import type { AccordionItemProps, AccordionVariant } from './types';

const AccordionItem = ({
  id,
  title,
  children,
  defaultExpanded = false,
  expanded: controlledExpanded,
  onToggle,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  badge,
  variant = 'default',
  size = 'md',
  className = '',
  style,
  'aria-label': ariaLabel,
}: AccordionItemProps) => {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const [contentHeight, setContentHeight] = useState<number | 'auto'>(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const isControlled = controlledExpanded !== undefined;
  const expanded = isControlled ? controlledExpanded : internalExpanded;
  
  // Get theme from context, fallback to default theme if not in documentation context
  const themeContext = useContext(DocumentationThemeContext);
  const theme = themeContext?.theme || documentationTheme;

  // Calculate content height for smooth animation
  useEffect(() => {
    if (contentRef.current) {
      if (expanded) {
        setContentHeight(contentRef.current.scrollHeight);
      } else {
        setContentHeight(0);
      }
    }
  }, [expanded, children]);

  // Handle toggle
  const handleToggle = useCallback(() => {
    if (disabled || loading) return;

    const newExpanded = !expanded;
    
    if (!isControlled) {
      setInternalExpanded(newExpanded);
    }
    
    onToggle?.(newExpanded, id);
  }, [disabled, loading, expanded, isControlled, onToggle, id]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (disabled || loading) return;
    
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  }, [disabled, loading, handleToggle]);

  // Size configurations
  const sizeConfig = {
    sm: {
      headerPadding: 'px-4 py-2.5',
      contentPadding: 'px-4 py-2.5',
      titleSize: 'text-sm',
      iconSize: 'w-4 h-4',
      chevronSize: 'w-4 h-4',
    },
    md: {
      headerPadding: 'px-4 py-3',
      contentPadding: 'px-4 py-3',
      titleSize: 'text-base',
      iconSize: 'w-5 h-5',
      chevronSize: 'w-5 h-5',
    },
    lg: {
      headerPadding: 'px-5 py-4',
      contentPadding: 'px-5 py-4',
      titleSize: 'text-lg',
      iconSize: 'w-6 h-6',
      chevronSize: 'w-6 h-6',
    },
  };

  const currentSize = sizeConfig[size];

  // Variant styles
  const variantStyles: {
    [key in AccordionVariant]: {
      header: {
        backgroundColor?: string;
        border?: string;
        borderRadius?: string;
        borderBottom?: string;
      };
      content: {
        backgroundColor?: string;
        border?: string;
        borderTop?: string;
        borderBottomLeftRadius?: string;
        borderBottomRightRadius?: string;
      };
    };
  } = {
    default: {
      header: {
        backgroundColor: theme.background.card,
        border: `1px solid ${theme.colors.gray[300]}`,
        borderRadius: '8px',
        borderBottom: `1px solid ${theme.colors.gray[300]}`,
      },
      content: {
        backgroundColor: theme.background.card,
        border: `1px solid ${theme.colors.gray[300]}`,
        borderTop: 'none',
        borderBottomLeftRadius: '8px',
        borderBottomRightRadius: '8px',
      },
    },
    bordered: {
      header: {
        backgroundColor: theme.background.card,
        border: `1px solid ${theme.colors.gray[300]}`,
        borderRadius: '8px',
        borderBottom: `1px solid ${theme.colors.gray[300]}`,
      },
      content: {
        backgroundColor: theme.colors.gray[100],
        border: `1px solid ${theme.colors.gray[300]}`,
        borderTop: 'none',
        borderBottomLeftRadius: '8px',
        borderBottomRightRadius: '8px',
      },
    },
    ghost: {
      header: {
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: undefined,
        borderBottom: undefined,
      },
      content: {
        backgroundColor: 'transparent',
        border: undefined,
        borderTop: undefined,
        borderBottomLeftRadius: undefined,
        borderBottomRightRadius: undefined,
      },
    },
    filled: {
      header: {
        backgroundColor: theme.colors.gray[100],
        border: `1px solid ${theme.colors.gray[300]}`,
        borderRadius: '8px',
        borderBottom: `1px solid ${theme.colors.gray[300]}`,
      },
      content: {
        backgroundColor: theme.colors.gray[100],
        border: `1px solid ${theme.colors.gray[300]}`,
        borderTop: 'none',
        borderBottomLeftRadius: '8px',
        borderBottomRightRadius: '8px',
      },
    },
  };

  const currentVariant = variantStyles[variant];

  // Default icon (if not provided)
  const defaultIcon = (
    <svg
      className={currentSize.iconSize}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
      />
    </svg>
  );

  const displayIcon = icon !== undefined ? icon : defaultIcon;

  // Chevron icon
  const chevronIcon = (
    <svg
      className={`${currentSize.chevronSize} transition-transform duration-200 ${
        expanded ? 'rotate-180' : ''
      }`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );

  const itemId = id || `accordion-${Math.random().toString(36).substr(2, 9)}`;
  const headerId = `${itemId}-header`;
  const contentId = `${itemId}-content`;

  return (
    <div
      className={`accordion-item ${className}`}
      style={style}
      data-accordion-id={itemId}
      data-accordion-state={expanded ? 'expanded' : 'collapsed'}
      data-accordion-disabled={disabled}
      data-accordion-loading={loading}
    >
      {/* Header */}
      <button
        id={headerId}
        type="button"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        disabled={disabled || loading}
        className={`accordion-header flex items-center gap-3 ${currentSize.headerPadding} ${currentSize.titleSize} font-medium transition-all duration-200 w-full text-left ${
          disabled || loading ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
        }`}
        style={{
          ...currentVariant.header,
          ...(expanded ? {
            borderRadius: undefined,
            borderTopLeftRadius: currentVariant.header.borderRadius,
            borderTopRightRadius: currentVariant.header.borderRadius,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            borderBottom: 'none',
          } : {
            borderRadius: currentVariant.header.borderRadius,
            borderBottom: currentVariant.header.borderBottom || currentVariant.header.border,
          }),
          color: disabled || loading
            ? theme.colors.gray[500]
            : theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.dark.default,
        }}
        aria-expanded={expanded}
        aria-controls={contentId}
        aria-disabled={disabled || loading}
        aria-label={ariaLabel || title}
        aria-busy={loading}
        role="button"
        tabIndex={disabled || loading ? -1 : 0}
        onMouseEnter={(e) => {
          if (!disabled && !loading) {
            e.currentTarget.style.backgroundColor =
              variant === 'ghost'
                ? theme.colors.gray[100]
                : variant === 'filled'
                  ? theme.colors.gray[200]
                  : theme.colors.gray[100];
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled && !loading) {
            e.currentTarget.style.backgroundColor = currentVariant.header.backgroundColor || 'transparent';
          }
        }}
      >
        {/* Left Icon */}
        {iconPosition === 'left' && displayIcon && (
          <span
            className="flex-shrink-0"
            style={{
              color: disabled || loading
                ? theme.colors.gray[400]
                : theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700],
            }}
          >
            {displayIcon}
          </span>
        )}

        {/* Title */}
        <span 
          className="flex-1"
          style={{
            color: disabled || loading
              ? theme.colors.gray[500]
              : theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.dark.default,
          }}
        >
          {title}
        </span>

        {/* Badge */}
        {badge && (
          <span
            className="px-2 py-0.5 rounded-full text-xs font-semibold flex-shrink-0"
            style={{
              backgroundColor: theme.colors.primary.light,
              color: theme.colors.primary.default,
            }}
          >
            {badge}
          </span>
        )}

        {/* Loading Spinner */}
        {loading && (
          <span className="flex-shrink-0" aria-label="Loading">
            <svg
              className={`${currentSize.iconSize} animate-spin`}
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
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
          </span>
        )}

        {/* Chevron Icon */}
        {!loading && (
          <span
            className="flex-shrink-0"
            style={{
              color: disabled || loading
                ? theme.colors.gray[400]
                : theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700],
            }}
          >
            {chevronIcon}
          </span>
        )}

        {/* Right Icon */}
        {iconPosition === 'right' && displayIcon && !loading && (
          <span
            className="flex-shrink-0"
            style={{
              color: disabled || loading
                ? theme.colors.gray[400]
                : theme.mode === 'dark' ? theme.colors.light.inverse : theme.colors.gray[700],
            }}
          >
            {displayIcon}
          </span>
        )}
      </button>

      {/* Content */}
      <div
        id={contentId}
        ref={contentRef}
        className="accordion-content overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: expanded ? `${contentHeight}px` : '0px',
          ...currentVariant.content,
          border: expanded && currentVariant.content.border ? currentVariant.content.border : 'none',
          borderTop: expanded && currentVariant.content.border 
            ? `1px solid ${theme.colors.gray[300]}` 
            : 'none',
          borderTopLeftRadius: expanded && currentVariant.content.border ? 0 : undefined,
          borderTopRightRadius: expanded && currentVariant.content.border ? 0 : undefined,
          borderBottomLeftRadius: expanded && currentVariant.content.border ? currentVariant.content.borderBottomLeftRadius : undefined,
          borderBottomRightRadius: expanded && currentVariant.content.border ? currentVariant.content.borderBottomRightRadius : undefined,
        }}
        aria-labelledby={headerId}
        aria-hidden={!expanded}
        role="region"
      >
        <div
          className={currentSize.contentPadding}
          style={{
            color: theme.colors.gray[700],
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;


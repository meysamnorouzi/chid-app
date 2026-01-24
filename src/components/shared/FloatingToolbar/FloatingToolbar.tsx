/**
 * FloatingToolbar Component
 * 
 * Display a floating toolbar with action buttons
 * Designed with SEO, accessibility, security, and modular structure in mind
 */

import { useContext } from 'react';
import { DocumentationThemeContext } from '../../../theme/DocumentationThemeContext';
import { documentationTheme } from '../../../theme/themes/documentationTheme';
import type { FloatingToolbarProps } from './types';

const FloatingToolbar = ({
  actions,
  variant = 'default',
  position = 'bottom',
  size = 'md',
  visible = true,
  offset = {},
  showLabels = false,
  showTooltips = true,
  orientation = 'horizontal',
  className = '',
  style,
  onActionClick,
  'aria-label': ariaLabel,
}: FloatingToolbarProps) => {
  // Get theme from context, fallback to default theme if not in documentation context
  const themeContext = useContext(DocumentationThemeContext);
  const theme = themeContext?.theme || documentationTheme;

  if (!visible) return null;

  // Size mappings
  const sizeMap = {
    sm: {
      padding: 'p-2',
      gap: 'gap-1',
      iconSize: 'w-4 h-4',
      text: 'text-xs',
      buttonPadding: 'px-2.5 py-1.5',
    },
    md: {
      padding: 'p-2.5',
      gap: 'gap-1',
      iconSize: 'w-5 h-5',
      text: 'text-sm',
      buttonPadding: 'px-3 py-2',
    },
    lg: {
      padding: 'p-3',
      gap: 'gap-1.5',
      iconSize: 'w-6 h-6',
      text: 'text-base',
      buttonPadding: 'px-4 py-2.5',
    },
  };

  const sizeClasses = sizeMap[size];

  // Variant styles
  const getVariantStyles = () => {
    const isDark = theme.mode === 'dark';
    const baseStyles: React.CSSProperties = {
      backgroundColor: isDark ? theme.colors.gray[200] : theme.colors.light.inverse,
      borderRadius: '12px',
      transition: 'all 0.2s ease-in-out',
      zIndex: 1000,
    };

    switch (variant) {
      case 'bordered':
        return {
          ...baseStyles,
          border: `1px solid ${isDark ? theme.colors.gray[400] : theme.colors.gray[300]}`,
          boxShadow: theme.boxShadows.light,
        };
      case 'shadow':
        return {
          ...baseStyles,
          boxShadow: theme.boxShadows.default,
        };
      default:
        return {
          ...baseStyles,
          boxShadow: theme.boxShadows.light,
        };
    }
  };

  // Position styles
  const getPositionStyles = () => {
    const positionStyles: React.CSSProperties = {
      position: 'fixed',
    };

    const defaultOffset = 24;

    switch (position) {
      case 'top':
        positionStyles.top = offset.top ?? defaultOffset;
        positionStyles.left = '50%';
        positionStyles.transform = 'translateX(-50%)';
        break;
      case 'bottom':
        positionStyles.bottom = offset.bottom ?? defaultOffset;
        positionStyles.left = '50%';
        positionStyles.transform = 'translateX(-50%)';
        break;
      case 'left':
        positionStyles.left = offset.left ?? defaultOffset;
        positionStyles.top = '50%';
        positionStyles.transform = 'translateY(-50%)';
        break;
      case 'right':
        positionStyles.right = offset.right ?? defaultOffset;
        positionStyles.top = '50%';
        positionStyles.transform = 'translateY(-50%)';
        break;
      case 'top-left':
        positionStyles.top = offset.top ?? defaultOffset;
        positionStyles.left = offset.left ?? defaultOffset;
        positionStyles.transform = 'none';
        break;
      case 'top-right':
        positionStyles.top = offset.top ?? defaultOffset;
        positionStyles.right = offset.right ?? defaultOffset;
        positionStyles.transform = 'none';
        break;
      case 'bottom-left':
        positionStyles.bottom = offset.bottom ?? defaultOffset;
        positionStyles.left = offset.left ?? defaultOffset;
        positionStyles.transform = 'none';
        break;
      case 'bottom-right':
        positionStyles.bottom = offset.bottom ?? defaultOffset;
        positionStyles.right = offset.right ?? defaultOffset;
        positionStyles.transform = 'none';
        break;
    }

    return positionStyles;
  };

  const handleActionClick = (actionId: string, onClick?: () => void) => {
    if (onClick) {
      onClick();
    }
    onActionClick?.(actionId);
  };

  const isDark = theme.mode === 'dark';

  return (
    <div
      className={`flex ${orientation === 'horizontal' ? 'flex-row' : 'flex-col'} ${sizeClasses.padding} ${sizeClasses.gap} ${className}`}
      style={{
        ...getVariantStyles(),
        ...getPositionStyles(),
        ...style,
      }}
      role="toolbar"
      aria-label={ariaLabel || 'Floating toolbar'}
    >
      {actions.map((action, index) => {
        const isDisabled = action.disabled;
        const isActive = action.active;

        return (
          <div key={action.id} className="flex items-center">
            <button
              onClick={() => !isDisabled && handleActionClick(action.id, action.onClick)}
              disabled={isDisabled}
              className={`flex items-center ${sizeClasses.gap} ${sizeClasses.buttonPadding} rounded-lg transition-all duration-200 ${
                isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              } ${isActive ? 'opacity-100' : ''}`}
              style={{
                backgroundColor: isActive 
                  ? (isDark ? theme.colors.primary.default : theme.colors.primary.light)
                  : 'transparent',
                color: isActive 
                  ? (isDark ? theme.colors.primary.inverse : theme.colors.primary.default)
                  : (isDark ? theme.colors.gray[700] : theme.colors.gray[700]),
              }}
              onMouseEnter={(e) => {
                if (!isDisabled && !isActive) {
                  e.currentTarget.style.backgroundColor = isDark ? theme.colors.gray[300] : theme.colors.gray[100];
                }
              }}
              onMouseLeave={(e) => {
                if (!isDisabled && !isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
              aria-label={action.tooltip || action.label || action.id}
              title={showTooltips ? (action.tooltip || action.label || action.id) : undefined}
              aria-pressed={isActive}
              aria-disabled={isDisabled}
            >
              {action.icon && (
                <span className={`flex items-center ${sizeClasses.iconSize}`}>
                  {action.icon}
                </span>
              )}
              {showLabels && action.label && (
                <span className={sizeClasses.text} style={{ fontWeight: 500 }}>
                  {action.label}
                </span>
              )}
              {action.badge !== undefined && (
                <span
                  className="ml-1 px-1.5 py-0.5 rounded-full text-xs font-semibold min-w-[20px] text-center"
                  style={{
                    backgroundColor: theme.colors.primary.default,
                    color: theme.colors.primary.inverse,
                  }}
                >
                  {action.badge}
                </span>
              )}
            </button>
            {index < actions.length - 1 && (
              <div
                className="mx-1 h-6 w-px"
                style={{
                  backgroundColor: isDark ? theme.colors.gray[400] : theme.colors.gray[300],
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FloatingToolbar;


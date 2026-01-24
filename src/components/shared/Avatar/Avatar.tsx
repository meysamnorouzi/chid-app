/**
 * Avatar Component
 * 
 * Display user avatars with images, initials, or icons
 * Designed with SEO, accessibility, security, and modular structure in mind
 */

import { useState, useContext } from 'react';
import { DocumentationThemeContext } from '../../../theme/DocumentationThemeContext';
import { documentationTheme } from '../../../theme/themes/documentationTheme';
import type { AvatarProps } from './types';

const Avatar = ({
  src,
  alt = '',
  fallback,
  icon,
  variant = 'default',
  size = 'md',
  shape = 'circle',
  disabled = false,
  loading = false,
  badge,
  badgePosition = 'bottom-right',
  className = '',
  style,
  'aria-label': ariaLabel,
  onClick,
  status,
  statusPosition = 'bottom-right',
}: AvatarProps) => {
  const [imageError, setImageError] = useState(false);
  
  // Get theme from context, fallback to default theme if not in documentation context
  const themeContext = useContext(DocumentationThemeContext);
  const theme = themeContext?.theme || documentationTheme;

  // Size mappings
  const sizeMap = {
    xs: { size: 'w-6 h-6', text: 'text-xs', iconSize: 'w-3 h-3', badgeSize: 'w-2 h-2', statusSize: 'w-1.5 h-1.5' },
    sm: { size: 'w-8 h-8', text: 'text-sm', iconSize: 'w-4 h-4', badgeSize: 'w-2.5 h-2.5', statusSize: 'w-2 h-2' },
    md: { size: 'w-10 h-10', text: 'text-base', iconSize: 'w-5 h-5', badgeSize: 'w-3 h-3', statusSize: 'w-2.5 h-2.5' },
    lg: { size: 'w-12 h-12', text: 'text-lg', iconSize: 'w-6 h-6', badgeSize: 'w-3.5 h-3.5', statusSize: 'w-3 h-3' },
    xl: { size: 'w-16 h-16', text: 'text-xl', iconSize: 'w-8 h-8', badgeSize: 'w-4 h-4', statusSize: 'w-3.5 h-3.5' },
  };

  const sizeClasses = sizeMap[size];
  
  // Shape mappings
  const shapeMap = {
    circle: 'rounded-full',
    square: 'rounded-none',
    rounded: 'rounded-lg',
  };

  // Variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'bordered':
        return {
          border: `2px solid ${theme.colors.gray[300]}`,
        };
      case 'ring':
        return {
          boxShadow: `0 0 0 2px ${theme.background.card}, 0 0 0 4px ${theme.colors.primary.default}`,
        };
      case 'solid':
        return {
          backgroundColor: theme.colors.primary.default,
          color: theme.colors.primary.inverse,
        };
      default:
        return {};
    }
  };

  // Status color mapping
  const statusColorMap = {
    online: theme.colors.success.default,
    offline: theme.colors.gray[400],
    away: theme.colors.warning.default,
    busy: theme.colors.danger.default,
  };

  // Badge position classes
  const badgePositionMap = {
    'top-right': 'top-0 right-0',
    'top-left': 'top-0 left-0',
    'bottom-right': 'bottom-0 right-0',
    'bottom-left': 'bottom-0 left-0',
  };

  const showImage = src && !imageError && !loading;
  const showFallback = !showImage && (fallback || icon);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center ${sizeClasses.size} ${shapeMap[shape]} ${className}`}
      style={{
        backgroundColor: variant === 'solid' 
          ? theme.colors.primary.default 
          : showImage 
            ? 'transparent' 
            : theme.colors.gray[200],
        color: variant === 'solid' 
          ? theme.colors.primary.inverse 
          : theme.colors.gray[700],
        opacity: disabled ? 0.5 : 1,
        cursor: onClick && !disabled ? 'pointer' : 'default',
        ...getVariantStyles(),
        ...style,
      }}
      onClick={onClick && !disabled ? onClick : undefined}
      role={onClick ? 'button' : 'img'}
      aria-label={ariaLabel || alt || fallback || 'Avatar'}
      tabIndex={onClick && !disabled ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && !disabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Loading State */}
      {loading && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ backgroundColor: theme.colors.gray[200] }}
        >
          <div
            className={`${sizeClasses.iconSize} animate-spin rounded-full border-2`}
            style={{
              borderColor: theme.colors.gray[300],
              borderTopColor: theme.colors.primary.default,
            }}
          />
        </div>
      )}

      {/* Image */}
      {showImage && !loading && (
        <img
          src={src}
          alt={alt}
          className={`${sizeClasses.size} ${shapeMap[shape]} object-cover`}
          onError={handleImageError}
          loading="lazy"
        />
      )}

      {/* Fallback (Initials or Icon) */}
      {showFallback && !loading && (
        <div className={`${sizeClasses.text} font-semibold flex items-center justify-center`}>
          {icon ? (
            <span className={sizeClasses.iconSize}>{icon}</span>
          ) : (
            <span>{fallback}</span>
          )}
        </div>
      )}

      {/* Status Indicator */}
      {status && !loading && (
        <div
          className={`absolute ${badgePositionMap[statusPosition]} ${sizeClasses.statusSize} rounded-full border-2`}
          style={{
            backgroundColor: statusColorMap[status],
            borderColor: theme.background.card,
          }}
          aria-label={`Status: ${status}`}
        />
      )}

      {/* Badge */}
      {badge && !loading && (
        <div
          className={`absolute ${badgePositionMap[badgePosition]} flex items-center justify-center ${sizeClasses.badgeSize} rounded-full`}
          style={{
            backgroundColor: theme.colors.danger.default,
            color: theme.colors.danger.inverse,
            fontSize: size === 'xs' ? '8px' : size === 'sm' ? '10px' : '12px',
            padding: size === 'xs' ? '2px 4px' : size === 'sm' ? '2px 5px' : '2px 6px',
            border: `2px solid ${theme.background.card}`,
            minWidth: size === 'xs' ? '8px' : size === 'sm' ? '10px' : size === 'md' ? '12px' : size === 'lg' ? '14px' : '16px',
          }}
          aria-label={`Badge: ${badge}`}
        >
          {typeof badge === 'string' || typeof badge === 'number' ? (
            <span className="font-semibold leading-none">
              {typeof badge === 'number' && badge > 99 ? '99+' : badge}
            </span>
          ) : (
            badge
          )}
        </div>
      )}
    </div>
  );
};

export default Avatar;


/**
 * AvatarGroup Component
 * 
 * Display multiple avatars in a group with overflow indicator
 * Designed with SEO, accessibility, security, and modular structure in mind
 */

import { useContext } from 'react';
import { DocumentationThemeContext } from '../../../theme/DocumentationThemeContext';
import { documentationTheme } from '../../../theme/themes/documentationTheme';
import Avatar from './Avatar';
import type { AvatarGroupProps } from './types';

const AvatarGroup = ({
  avatars,
  max = 3,
  size = 'md',
  spacing = 'sm',
  className = '',
  style,
}: AvatarGroupProps) => {
  // Get theme from context, fallback to default theme if not in documentation context
  const themeContext = useContext(DocumentationThemeContext);
  const theme = themeContext?.theme || documentationTheme;

  // Spacing mappings
  const spacingMap = {
    none: 'space-x-0',
    xs: '-space-x-1',
    sm: '-space-x-2',
    md: '-space-x-3',
    lg: '-space-x-4',
  };

  const displayedAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;

  return (
    <div
      className={`flex items-center ${spacingMap[spacing]} ${className}`}
      style={style}
      role="group"
      aria-label={`Avatar group with ${avatars.length} members`}
    >
      {displayedAvatars.map((avatar, index) => (
        <div
          key={index}
          className="relative"
          style={{
            zIndex: displayedAvatars.length - index,
          }}
        >
          <Avatar
            {...avatar}
            size={size}
          />
        </div>
      ))}
      
      {remainingCount > 0 && (
        <div
          className={`relative flex items-center justify-center rounded-full font-semibold border-2`}
          style={{
            width: size === 'xs' ? '24px' : size === 'sm' ? '32px' : size === 'md' ? '40px' : size === 'lg' ? '48px' : '64px',
            height: size === 'xs' ? '24px' : size === 'sm' ? '32px' : size === 'md' ? '40px' : size === 'lg' ? '48px' : '64px',
            backgroundColor: theme.colors.gray[200],
            color: theme.colors.gray[700],
            borderColor: theme.background.card,
            fontSize: size === 'xs' ? '10px' : size === 'sm' ? '12px' : size === 'md' ? '14px' : size === 'lg' ? '16px' : '18px',
            zIndex: 0,
          }}
          aria-label={`${remainingCount} more members`}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;


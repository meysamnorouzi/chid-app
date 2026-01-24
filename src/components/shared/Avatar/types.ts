/**
 * Avatar Component Types
 * 
 * Type definitions for Avatar components
 * Designed with modularity, scalability, and type safety in mind
 */

import type { ReactNode } from 'react';

/**
 * Avatar variant styles
 */
export type AvatarVariant = 'default' | 'bordered' | 'ring' | 'solid';

/**
 * Avatar size options
 */
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Avatar shape options
 */
export type AvatarShape = 'circle' | 'square' | 'rounded';

/**
 * Single Avatar Props
 */
export interface AvatarProps {
  /**
   * Image source URL
   */
  src?: string;
  
  /**
   * Alternative text for the image
   */
  alt?: string;
  
  /**
   * Fallback text (usually initials)
   */
  fallback?: string;
  
  /**
   * Custom icon to display when no image or fallback
   */
  icon?: ReactNode;
  
  /**
   * Variant style
   * @default 'default'
   */
  variant?: AvatarVariant;
  
  /**
   * Size of the avatar
   * @default 'md'
   */
  size?: AvatarSize;
  
  /**
   * Shape of the avatar
   * @default 'circle'
   */
  shape?: AvatarShape;
  
  /**
   * Whether the avatar is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Whether the avatar is in loading state
   * @default false
   */
  loading?: boolean;
  
  /**
   * Badge to display on avatar
   */
  badge?: number | string | ReactNode;
  
  /**
   * Badge position
   * @default 'bottom-right'
   */
  badgePosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Additional inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
  
  /**
   * Click handler
   */
  onClick?: () => void;
  
  /**
   * Status indicator (online, offline, away, etc.)
   */
  status?: 'online' | 'offline' | 'away' | 'busy';
  
  /**
   * Status position
   * @default 'bottom-right'
   */
  statusPosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

/**
 * Avatar Group Props
 */
export interface AvatarGroupProps {
  /**
   * Array of avatar items
   */
  avatars: Omit<AvatarProps, 'badge' | 'status'>[];
  
  /**
   * Maximum number of avatars to display before showing "+X"
   * @default 3
   */
  max?: number;
  
  /**
   * Size applied to all avatars
   * @default 'md'
   */
  size?: AvatarSize;
  
  /**
   * Spacing between avatars
   * @default 'sm'
   */
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg';
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Additional inline styles
   */
  style?: React.CSSProperties;
}


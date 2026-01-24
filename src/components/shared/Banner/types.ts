/**
 * Banner Component Types
 * 
 * Type definitions for Banner components
 * Designed with modularity, scalability, and type safety in mind
 */

import type { ReactNode } from 'react';

/**
 * Banner variant styles
 */
export type BannerVariant = 'default' | 'filled' | 'outlined' | 'subtle';

/**
 * Banner type/color options
 */
export type BannerType = 'info' | 'success' | 'warning' | 'error' | 'neutral';

/**
 * Banner size options
 */
export type BannerSize = 'sm' | 'md' | 'lg';

/**
 * Banner position options
 */
export type BannerPosition = 'top' | 'bottom' | 'inline';

/**
 * Single Banner Props
 */
export interface BannerProps {
  /**
   * Banner title
   */
  title?: string;
  
  /**
   * Banner description/content
   */
  description?: string;
  
  /**
   * Custom content (overrides description)
   */
  children?: ReactNode;
  
  /**
   * Banner type/color
   * @default 'info'
   */
  type?: BannerType;
  
  /**
   * Variant style
   * @default 'default'
   */
  variant?: BannerVariant;
  
  /**
   * Size of the banner
   * @default 'md'
   */
  size?: BannerSize;
  
  /**
   * Custom icon to display
   */
  icon?: ReactNode;
  
  /**
   * Whether to show close button
   * @default false
   */
  closable?: boolean;
  
  /**
   * Callback fired when banner is closed
   */
  onClose?: () => void;
  
  /**
   * Action button
   */
  action?: ReactNode;
  
  /**
   * Whether the banner is visible
   * @default true
   */
  visible?: boolean;
  
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
}


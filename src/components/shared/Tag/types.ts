/**
 * Tag Component Types
 * 
 * Type definitions for Tag components
 * Designed with modularity, scalability, and type safety in mind
 */

import type { ReactNode } from 'react';

/**
 * Tag variant styles
 */
export type TagVariant = 'default' | 'outline' | 'solid' | 'subtle';

/**
 * Tag size
 */
export type TagSize = 'sm' | 'md' | 'lg';

/**
 * Tag color scheme
 */
export type TagColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'gray';

/**
 * Tag Props
 */
export interface TagProps {
  /**
   * Tag content
   */
  children: ReactNode;
  
  /**
   * Variant style
   * @default 'default'
   */
  variant?: TagVariant;
  
  /**
   * Size of the tag
   * @default 'md'
   */
  size?: TagSize;
  
  /**
   * Color scheme
   * @default 'primary'
   */
  color?: TagColor;
  
  /**
   * Show close/delete button
   * @default false
   */
  closable?: boolean;
  
  /**
   * Callback fired when close button is clicked
   */
  onClose?: () => void;
  
  /**
   * Left icon
   */
  leftIcon?: ReactNode;
  
  /**
   * Right icon
   */
  rightIcon?: ReactNode;
  
  /**
   * Whether the tag is disabled
   * @default false
   */
  disabled?: boolean;
  
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


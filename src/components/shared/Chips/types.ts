/**
 * Chips Component Types
 * 
 * Type definitions for Chips components
 * Designed with modularity, scalability, and type safety in mind
 */

import type { ReactNode, HTMLAttributes } from 'react';

/**
 * Chip variant options
 */
export type ChipVariant = 
  | 'primary' 
  | 'secondary' 
  | 'outline' 
  | 'ghost' 
  | 'danger' 
  | 'success' 
  | 'warning' 
  | 'info';

/**
 * Chip size options
 */
export type ChipSize = 'xs' | 'sm' | 'md' | 'lg';

/**
 * Chip shape options
 */
export type ChipShape = 'default' | 'rounded' | 'pill';

/**
 * Chip Props
 */
export interface ChipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'size'> {
  /**
   * Chip content/children
   */
  children: ReactNode;
  
  /**
   * Chip variant
   * @default 'primary'
   */
  variant?: ChipVariant;
  
  /**
   * Chip size
   * @default 'md'
   */
  size?: ChipSize;
  
  /**
   * Chip shape
   * @default 'default'
   */
  shape?: ChipShape;
  
  /**
   * Whether chip is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Icon to display before text
   */
  leftIcon?: ReactNode;
  
  /**
   * Icon to display after text
   */
  rightIcon?: ReactNode;
  
  /**
   * Whether chip is deletable (shows close icon)
   * @default false
   */
  deletable?: boolean;
  
  /**
   * Callback when delete icon is clicked
   */
  onDelete?: () => void;
  
  /**
   * Whether chip is clickable
   * @default false
   */
  clickable?: boolean;
  
  /**
   * Callback when chip is clicked
   */
  onClick?: () => void;
  
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


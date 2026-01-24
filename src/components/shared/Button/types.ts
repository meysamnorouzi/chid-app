/**
 * Button Component Types
 * 
 * Type definitions for Button components
 * Designed with modularity, scalability, and type safety in mind
 */

import type { ReactNode, ButtonHTMLAttributes } from 'react';

/**
 * Button variant options
 */
export type ButtonVariant = 
  | 'primary' 
  | 'secondary' 
  | 'outline' 
  | 'ghost' 
  | 'danger' 
  | 'success' 
  | 'warning' 
  | 'info';

/**
 * Button size options
 */
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

/**
 * Button shape options
 */
export type ButtonShape = 'default' | 'rounded' | 'pill';

/**
 * Button Props
 */
export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  /**
   * Button content/children
   */
  children?: ReactNode;
  
  /**
   * Button variant
   * @default 'primary'
   */
  variant?: ButtonVariant;
  
  /**
   * Button size
   * @default 'md'
   */
  size?: ButtonSize;
  
  /**
   * Button shape
   * @default 'default'
   */
  shape?: ButtonShape;
  
  /**
   * Whether button is in loading state
   * @default false
   */
  loading?: boolean;
  
  /**
   * Whether button is disabled
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
   * Whether button should take full width
   * @default false
   */
  fullWidth?: boolean;
  
  /**
   * Badge to display on button
   */
  badge?: number | string;
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Additional inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Button type
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset';
  
  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
}


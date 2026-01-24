/**
 * Checkbox Component Types
 * 
 * Type definitions for Checkbox components
 * Designed with modularity, scalability, and type safety in mind
 */

import type { ReactNode } from 'react';

/**
 * Checkbox variant styles
 */
export type CheckboxVariant = 'default' | 'filled' | 'outlined';

/**
 * Checkbox size options
 */
export type CheckboxSize = 'sm' | 'md' | 'lg';

/**
 * Checkbox shape options
 */
export type CheckboxShape = 'square' | 'rounded';

/**
 * Single Checkbox Props
 */
export interface CheckboxProps {
  /**
   * Whether the checkbox is checked
   */
  checked?: boolean;
  
  /**
   * Whether the checkbox is checked by default (uncontrolled)
   */
  defaultChecked?: boolean;
  
  /**
   * Whether the checkbox is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Whether the checkbox is in an indeterminate state
   * @default false
   */
  indeterminate?: boolean;
  
  /**
   * Label text or content
   */
  label?: ReactNode;
  
  /**
   * Description text below label
   */
  description?: string;
  
  /**
   * Variant style
   * @default 'default'
   */
  variant?: CheckboxVariant;
  
  /**
   * Size of the checkbox
   * @default 'md'
   */
  size?: CheckboxSize;
  
  /**
   * Shape of the checkbox
   * @default 'square'
   */
  shape?: CheckboxShape;
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Additional inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Callback fired when checkbox state changes
   */
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  
  /**
   * HTML input name attribute
   */
  name?: string;
  
  /**
   * HTML input value attribute
   */
  value?: string;
  
  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
  
  /**
   * HTML id attribute
   */
  id?: string;
}


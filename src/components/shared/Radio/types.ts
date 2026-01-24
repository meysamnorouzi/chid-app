/**
 * Radio Component Types
 * 
 * Type definitions for Radio components
 * Designed with modularity, scalability, and type safety in mind
 */

import type { ReactNode } from 'react';

/**
 * Radio variant styles
 */
export type RadioVariant = 'default' | 'outline' | 'filled';

/**
 * Radio size
 */
export type RadioSize = 'sm' | 'md' | 'lg';

/**
 * Radio Props
 */
export interface RadioProps {
  /**
   * Radio label
   */
  label?: ReactNode;
  
  /**
   * Radio value
   */
  value: string | number;
  
  /**
   * Whether the radio is checked
   */
  checked?: boolean;
  
  /**
   * Whether the radio is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Variant style
   * @default 'default'
   */
  variant?: RadioVariant;
  
  /**
   * Size of the radio
   * @default 'md'
   */
  size?: RadioSize;
  
  /**
   * Radio name (for grouping)
   */
  name?: string;
  
  /**
   * Change handler
   */
  onChange?: (value: string | number) => void;
  
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

/**
 * Radio Group Props
 */
export interface RadioGroupProps {
  /**
   * Radio options
   */
  options: Array<{
    label: ReactNode;
    value: string | number;
    disabled?: boolean;
  }>;
  
  /**
   * Selected value
   */
  value?: string | number;
  
  /**
   * Default selected value
   */
  defaultValue?: string | number;
  
  /**
   * Radio name (for grouping)
   */
  name?: string;
  
  /**
   * Variant style
   * @default 'default'
   */
  variant?: RadioVariant;
  
  /**
   * Size of the radios
   * @default 'md'
   */
  size?: RadioSize;
  
  /**
   * Orientation
   * @default 'vertical'
   */
  orientation?: 'horizontal' | 'vertical';
  
  /**
   * Change handler
   */
  onChange?: (value: string | number) => void;
  
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


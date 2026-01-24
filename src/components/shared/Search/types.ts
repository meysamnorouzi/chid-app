/**
 * Search Component Types
 * 
 * Type definitions for Search components
 * Designed with modularity, scalability, and type safety in mind
 */

import { ReactNode, InputHTMLAttributes } from 'react';

/**
 * Search variant styles
 */
export type SearchVariant = 'default' | 'filled' | 'outlined';

/**
 * Search size
 */
export type SearchSize = 'sm' | 'md' | 'lg';

/**
 * Search Props
 */
export interface SearchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  /**
   * Variant style
   * @default 'default'
   */
  variant?: SearchVariant;
  
  /**
   * Size of the search input
   * @default 'md'
   */
  size?: SearchSize;
  
  /**
   * Label text
   */
  label?: string;
  
  /**
   * Helper text
   */
  helperText?: string;
  
  /**
   * Error text
   */
  errorText?: string;
  
  /**
   * Whether the search is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Whether the search is in loading state
   * @default false
   */
  loading?: boolean;
  
  /**
   * Show clear button
   * @default true
   */
  clearable?: boolean;
  
  /**
   * Left icon (search icon by default)
   */
  leftIcon?: ReactNode;
  
  /**
   * Right icon (replaces clear button if provided)
   */
  rightIcon?: ReactNode;
  
  /**
   * Value change handler
   */
  onChange?: (value: string) => void;
  
  /**
   * Search handler (called on Enter or icon click)
   */
  onSearch?: (value: string) => void;
  
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


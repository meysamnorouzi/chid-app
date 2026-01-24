/**
 * Multi Select Area Component Types
 * 
 * Type definitions for Multi Select Area components
 * Designed with modularity, scalability, and type safety in mind
 */

import { ReactNode } from 'react';

/**
 * Multi Select Area variant styles
 */
export type MultiSelectAreaVariant = 'default' | 'filled' | 'outlined';

/**
 * Multi Select Area size
 */
export type MultiSelectAreaSize = 'sm' | 'md' | 'lg';

/**
 * Multi Select Area Item
 */
export interface MultiSelectAreaItem {
  /**
   * Item value
   */
  value: string | number;
  
  /**
   * Item label
   */
  label: ReactNode;
  
  /**
   * Item color (optional)
   */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'gray';
}

/**
 * Multi Select Area Props
 */
export interface MultiSelectAreaProps {
  /**
   * Array of items to display
   */
  items: MultiSelectAreaItem[];
  
  /**
   * Variant style
   * @default 'default'
   */
  variant?: MultiSelectAreaVariant;
  
  /**
   * Size of the multi select area
   * @default 'md'
   */
  size?: MultiSelectAreaSize;
  
  /**
   * Label text
   */
  label?: string;
  
  /**
   * Helper text
   */
  helperText?: string;
  
  /**
   * Whether to show copy button
   * @default true
   */
  copyable?: boolean;
  
  /**
   * Custom copy text (default: items joined by comma)
   */
  copyText?: string;
  
  /**
   * Whether the area is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Maximum height (in pixels or CSS value)
   */
  maxHeight?: string | number;
  
  /**
   * Change handler (when items are clicked)
   */
  onItemClick?: (item: MultiSelectAreaItem) => void;
  
  /**
   * Copy handler
   */
  onCopy?: (text: string) => void;
  
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


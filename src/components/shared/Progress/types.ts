/**
 * Progress Component Types
 * 
 * Type definitions for Progress components
 * Designed with modularity, scalability, and type safety in mind
 */

/**
 * Progress variant styles
 */
export type ProgressVariant = 'default' | 'striped' | 'animated';

/**
 * Progress size
 */
export type ProgressSize = 'sm' | 'md' | 'lg';

/**
 * Progress color
 */
export type ProgressColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

/**
 * Progress Props
 */
export interface ProgressProps {
  /**
   * Progress value (0-100)
   */
  value?: number;
  
  /**
   * Maximum value
   * @default 100
   */
  max?: number;
  
  /**
   * Variant style
   * @default 'default'
   */
  variant?: ProgressVariant;
  
  /**
   * Size of the progress bar
   * @default 'md'
   */
  size?: ProgressSize;
  
  /**
   * Color scheme
   * @default 'primary'
   */
  color?: ProgressColor;
  
  /**
   * Show percentage label
   * @default false
   */
  showLabel?: boolean;
  
  /**
   * Custom label text
   */
  label?: string;
  
  /**
   * Label position
   * @default 'inside'
   */
  labelPosition?: 'inside' | 'outside' | 'none';
  
  /**
   * Whether the progress is indeterminate
   * @default false
   */
  indeterminate?: boolean;
  
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


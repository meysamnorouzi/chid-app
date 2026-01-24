/**
 * Loader Component Types
 * 
 * Type definitions for Loader components
 * Designed with modularity, scalability, and type safety in mind
 */

/**
 * Loader variant styles
 */
export type LoaderVariant = 'spinner' | 'dots' | 'bars' | 'pulse' | 'ring';

/**
 * Loader size
 */
export type LoaderSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Loader color
 */
export type LoaderColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'gray' | 'white';

/**
 * Loader Props
 */
export interface LoaderProps {
  /**
   * Variant style
   * @default 'spinner'
   */
  variant?: LoaderVariant;
  
  /**
   * Size of the loader
   * @default 'md'
   */
  size?: LoaderSize;
  
  /**
   * Color scheme
   * @default 'primary'
   */
  color?: LoaderColor;
  
  /**
   * Show text label below loader
   */
  label?: string;
  
  /**
   * Whether the loader is full screen overlay
   * @default false
   */
  fullScreen?: boolean;
  
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


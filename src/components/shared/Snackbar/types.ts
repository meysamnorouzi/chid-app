/**
 * Snackbar Component Types
 * 
 * Type definitions for Snackbar components
 * Designed with modularity, scalability, and type safety in mind
 */

import { ReactNode } from 'react';

/**
 * Snackbar variant styles
 */
export type SnackbarVariant = 'default' | 'filled' | 'outlined';

/**
 * Snackbar type
 */
export type SnackbarType = 'info' | 'success' | 'warning' | 'error';

/**
 * Snackbar position
 */
export type SnackbarPosition = 
  | 'top-left' 
  | 'top-center' 
  | 'top-right' 
  | 'bottom-left' 
  | 'bottom-center' 
  | 'bottom-right';

/**
 * Snackbar size
 */
export type SnackbarSize = 'sm' | 'md' | 'lg';

/**
 * Snackbar Props
 */
export interface SnackbarProps {
  /**
   * Message to display
   */
  message: ReactNode;
  
  /**
   * Snackbar type
   * @default 'info'
   */
  type?: SnackbarType;
  
  /**
   * Variant style
   * @default 'default'
   */
  variant?: SnackbarVariant;
  
  /**
   * Size of the snackbar
   * @default 'md'
   */
  size?: SnackbarSize;
  
  /**
   * Position of the snackbar
   * @default 'bottom-center'
   */
  position?: SnackbarPosition;
  
  /**
   * Custom icon
   */
  icon?: ReactNode;
  
  /**
   * Action button
   */
  action?: ReactNode;
  
  /**
   * Whether snackbar is closable
   * @default true
   */
  closable?: boolean;
  
  /**
   * Auto-dismiss duration in milliseconds (0 = no auto-dismiss)
   * @default 5000
   */
  duration?: number;
  
  /**
   * Whether snackbar is visible
   * @default true
   */
  visible?: boolean;
  
  /**
   * Close handler
   */
  onClose?: () => void;
  
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


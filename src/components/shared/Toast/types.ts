/**
 * Toast Component Types
 * 
 * Type definitions for Toast components
 * Designed with modularity, scalability, and type safety in mind
 */

import type { ReactNode } from 'react';

/**
 * Toast type/color options
 */
export type ToastType = 'info' | 'success' | 'warning' | 'error';

/**
 * Toast position options
 */
export type ToastPosition = 
  | 'top-left' 
  | 'top-center' 
  | 'top-right' 
  | 'bottom-left' 
  | 'bottom-center' 
  | 'bottom-right';

/**
 * Single Toast Props
 */
export interface ToastProps {
  /**
   * Toast message/content
   */
  message: string;
  
  /**
   * Toast title (optional)
   */
  title?: string;
  
  /**
   * Toast type
   * @default 'info'
   */
  type?: ToastType;
  
  /**
   * Custom icon to display
   */
  icon?: ReactNode;
  
  /**
   * Duration in milliseconds before auto-dismiss
   * Set to 0 or null to disable auto-dismiss
   * @default 5000
   */
  duration?: number | null;
  
  /**
   * Whether to show close button
   * @default true
   */
  closable?: boolean;
  
  /**
   * Callback fired when toast is closed
   */
  onClose?: () => void;
  
  /**
   * Action button
   */
  action?: ReactNode;
  
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
  
  /**
   * Make toast full width
   */
  fullWidth?: boolean;
}

/**
 * Toast Container Props
 */
export interface ToastContainerProps {
  /**
   * Position of toast container
   * @default 'top-right'
   */
  position?: ToastPosition;
  
  /**
   * Maximum number of toasts to display
   * @default 5
   */
  maxToasts?: number;
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Additional inline styles
   */
  style?: React.CSSProperties;
}

/**
 * Toast Context Type
 */
export interface ToastContextType {
  showToast: (toast: Omit<ToastProps, 'onClose'>) => void;
  removeToast: (id: string) => void;
  clearAll: () => void;
}

/**
 * Internal Toast Item (with id)
 */
export interface ToastItem extends ToastProps {
  id: string;
}


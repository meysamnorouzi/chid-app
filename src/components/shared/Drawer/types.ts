/**
 * Drawer Component Types
 * 
 * Type definitions for Drawer components
 * Designed with modularity, scalability, and type safety in mind
 */

import type { ReactNode, HTMLAttributes } from 'react';

/**
 * Drawer position options
 */
export type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';

/**
 * Drawer size options
 */
export type DrawerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * Drawer Props
 */
export interface DrawerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'size' | 'title'> {
  /**
   * Whether drawer is open
   */
  open: boolean;
  
  /**
   * Callback when drawer should close
   */
  onClose: () => void;
  
  /**
   * Drawer position
   * @default 'right'
   */
  position?: DrawerPosition;
  
  /**
   * Drawer size
   * @default 'md'
   */
  size?: DrawerSize;
  
  /**
   * Whether to show backdrop
   * @default true
   */
  showBackdrop?: boolean;
  
  /**
   * Whether backdrop is closable
   * @default true
   */
  backdropClosable?: boolean;
  
  /**
   * Whether to show close button
   * @default true
   */
  closable?: boolean;
  
  /**
   * Drawer title
   */
  title?: ReactNode;
  
  /**
   * Drawer footer content
   */
  footer?: ReactNode;
  
  /**
   * Drawer content
   */
  children: ReactNode;
  
  /**
   * Additional CSS class name for drawer
   */
  className?: string;
  
  /**
   * Additional inline styles for drawer
   */
  style?: React.CSSProperties;
  
  /**
   * Additional CSS class name for backdrop
   */
  backdropClassName?: string;
  
  /**
   * Additional inline styles for backdrop
   */
  backdropStyle?: React.CSSProperties;
  
  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
  
  /**
   * Whether to lock body scroll when drawer is open
   * @default true
   */
  lockScroll?: boolean;
}


/**
 * Breadcrumb Component Types
 * 
 * Type definitions for Breadcrumb components
 * Designed with modularity, scalability, and type safety in mind
 */

import type { ReactNode } from 'react';

/**
 * Breadcrumb item
 */
export interface BreadcrumbItem {
  /**
   * Item label/text
   */
  label: string;
  
  /**
   * Item URL/path (optional, if not provided, item is not clickable)
   */
  href?: string;
  
  /**
   * Custom onClick handler (optional)
   */
  onClick?: () => void;
  
  /**
   * Icon to display before label (optional)
   */
  icon?: ReactNode;
  
  /**
   * Whether item is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
}

/**
 * Breadcrumb separator options
 */
export type BreadcrumbSeparator = '/' | '>' | '→' | '•' | ReactNode;

/**
 * Breadcrumb Props
 */
export interface BreadcrumbProps {
  /**
   * Breadcrumb items
   */
  items: BreadcrumbItem[];
  
  /**
   * Separator between items
   * @default '/'
   */
  separator?: BreadcrumbSeparator;
  
  /**
   * Custom separator component
   */
  separatorComponent?: ReactNode;
  
  /**
   * Whether to show home icon for first item
   * @default false
   */
  showHomeIcon?: boolean;
  
  /**
   * Maximum number of items to show (rest will be collapsed)
   * @default undefined (show all)
   */
  maxItems?: number;
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Additional inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * ARIA label for the breadcrumb
   */
  'aria-label'?: string;
}


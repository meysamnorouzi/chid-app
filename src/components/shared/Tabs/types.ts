/**
 * Tabs Component Types
 * 
 * Type definitions for Tabs components
 * Designed with modularity, scalability, and type safety in mind
 */

import { ReactNode } from 'react';

/**
 * Tabs variant styles
 */
export type TabsVariant = 'default' | 'underlined' | 'pills';

/**
 * Tabs size
 */
export type TabsSize = 'sm' | 'md' | 'lg';

/**
 * Tab Item
 */
export interface TabItem {
  /**
   * Tab value
   */
  value: string | number;
  
  /**
   * Tab label
   */
  label: ReactNode;
  
  /**
   * Tab icon (optional)
   */
  icon?: ReactNode;
  
  /**
   * Tab badge (optional)
   */
  badge?: number | string;
  
  /**
   * Tab content/panel
   */
  content?: ReactNode;
  
  /**
   * Whether tab is disabled
   */
  disabled?: boolean;
}

/**
 * Tabs Props
 */
export interface TabsProps {
  /**
   * Array of tab items
   */
  items: TabItem[];
  
  /**
   * Selected tab value
   */
  value?: string | number;
  
  /**
   * Default selected tab value (uncontrolled)
   */
  defaultValue?: string | number;
  
  /**
   * Variant style
   * @default 'default'
   */
  variant?: TabsVariant;
  
  /**
   * Size of the tabs
   * @default 'md'
   */
  size?: TabsSize;
  
  /**
   * Whether tabs are disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Full width tabs
   * @default false
   */
  fullWidth?: boolean;
  
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


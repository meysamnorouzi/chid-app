/**
 * Menu Component Types
 * 
 * Type definitions for Menu components
 * Designed with modularity, scalability, and type safety in mind
 */

import type { ReactNode } from 'react';

/**
 * Menu variant styles
 */
export type MenuVariant = 'default' | 'bordered' | 'shadow';

/**
 * Menu size
 */
export type MenuSize = 'sm' | 'md' | 'lg';

/**
 * Menu item type
 */
export type MenuItemType = 'item' | 'divider' | 'header';

/**
 * Menu item
 */
export interface MenuItem {
  /**
   * Unique identifier for the item
   */
  id: string;
  
  /**
   * Item label/text
   */
  label?: string;
  
  /**
   * Item icon
   */
  icon?: ReactNode;
  
  /**
   * Right icon (e.g., arrow for submenu)
   */
  rightIcon?: ReactNode;
  
  /**
   * Whether the item is disabled
   */
  disabled?: boolean;
  
  /**
   * Whether the item is active/selected
   */
  active?: boolean;
  
  /**
   * Badge count
   */
  badge?: number | string;
  
  /**
   * Click handler
   */
  onClick?: () => void;
  
  /**
   * Submenu items
   */
  submenu?: MenuItem[];
  
  /**
   * Item type
   */
  type?: MenuItemType;
  
  /**
   * Custom className for item
   */
  className?: string;
}

/**
 * Menu Props
 */
export interface MenuProps {
  /**
   * Array of menu items
   */
  items: MenuItem[];
  
  /**
   * Variant style
   * @default 'default'
   */
  variant?: MenuVariant;
  
  /**
   * Size of the menu
   * @default 'md'
   */
  size?: MenuSize;
  
  /**
   * Whether to show icons
   * @default true
   */
  showIcons?: boolean;
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Additional inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Callback fired when item is clicked
   */
  onItemClick?: (itemId: string) => void;
  
  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
}


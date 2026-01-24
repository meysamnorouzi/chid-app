/**
 * BottomNavigation Component Types
 * 
 * Type definitions for BottomNavigation components
 * Designed with modularity, scalability, and type safety in mind
 */

import type { ReactNode } from 'react';

/**
 * BottomNavigation item
 */
export interface BottomNavigationItem {
  /**
   * Unique identifier for the item
   */
  id: string;
  
  /**
   * Item label/text
   */
  label: string;
  
  /**
   * Icon to display
   */
  icon: ReactNode;
  
  /**
   * Active icon (optional, if not provided, uses icon)
   */
  activeIcon?: ReactNode;
  
  /**
   * Badge to display on item
   */
  badge?: number | string;
  
  /**
   * Whether item is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Custom onClick handler
   */
  onClick?: () => void;
  
  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
}

/**
 * BottomNavigation Props
 */
export interface BottomNavigationProps {
  /**
   * Navigation items
   */
  items: BottomNavigationItem[];
  
  /**
   * Currently active item id
   */
  activeId?: string;
  
  /**
   * Callback fired when item is clicked
   */
  onItemClick?: (itemId: string) => void;
  
  /**
   * Whether to show labels
   * @default true
   */
  showLabels?: boolean;
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Additional inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * ARIA label for the navigation
   */
  'aria-label'?: string;
}


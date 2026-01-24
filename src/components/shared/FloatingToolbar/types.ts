/**
 * FloatingToolbar Component Types
 * 
 * Type definitions for FloatingToolbar components
 * Designed with modularity, scalability, and type safety in mind
 */

import type { ReactNode } from 'react';

/**
 * FloatingToolbar variant styles
 */
export type FloatingToolbarVariant = 'default' | 'bordered' | 'shadow';

/**
 * FloatingToolbar position
 */
export type FloatingToolbarPosition = 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

/**
 * FloatingToolbar size
 */
export type FloatingToolbarSize = 'sm' | 'md' | 'lg';

/**
 * FloatingToolbar action item
 */
export interface FloatingToolbarAction {
  /**
   * Unique identifier for the action
   */
  id: string;
  
  /**
   * Icon or content to display
   */
  icon?: ReactNode;
  
  /**
   * Label text
   */
  label?: string;
  
  /**
   * Tooltip text
   */
  tooltip?: string;
  
  /**
   * Click handler
   */
  onClick?: () => void;
  
  /**
   * Whether the action is disabled
   */
  disabled?: boolean;
  
  /**
   * Whether the action is active/selected
   */
  active?: boolean;
  
  /**
   * Badge count
   */
  badge?: number | string;
}

/**
 * FloatingToolbar Props
 */
export interface FloatingToolbarProps {
  /**
   * Array of action items
   */
  actions: FloatingToolbarAction[];
  
  /**
   * Variant style
   * @default 'default'
   */
  variant?: FloatingToolbarVariant;
  
  /**
   * Position on screen
   * @default 'bottom'
   */
  position?: FloatingToolbarPosition;
  
  /**
   * Size of the toolbar
   * @default 'md'
   */
  size?: FloatingToolbarSize;
  
  /**
   * Whether the toolbar is visible
   * @default true
   */
  visible?: boolean;
  
  /**
   * Custom offset from position edge
   */
  offset?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  
  /**
   * Show labels alongside icons
   * @default false
   */
  showLabels?: boolean;
  
  /**
   * Show tooltips on hover
   * @default true
   */
  showTooltips?: boolean;
  
  /**
   * Orientation of toolbar
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Additional inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Callback fired when action is clicked
   */
  onActionClick?: (actionId: string) => void;
  
  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
}


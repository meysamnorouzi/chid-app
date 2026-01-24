/**
 * Tooltip Component Types
 * 
 * Type definitions for Tooltip components
 * Designed with modularity, scalability, and type safety in mind
 */

import { ReactNode } from 'react';

/**
 * Tooltip position
 */
export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

/**
 * Tooltip size
 */
export type TooltipSize = 'sm' | 'md' | 'lg';

/**
 * Tooltip Props
 */
export interface TooltipProps {
  /**
   * Tooltip content
   */
  content: ReactNode;
  
  /**
   * Trigger element (the element that shows the tooltip on hover)
   */
  children: ReactNode;
  
  /**
   * Position of the tooltip
   * @default 'top'
   */
  position?: TooltipPosition;
  
  /**
   * Size of the tooltip
   * @default 'md'
   */
  size?: TooltipSize;
  
  /**
   * Whether tooltip is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Delay before showing tooltip (in milliseconds)
   * @default 0
   */
  delay?: number;
  
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


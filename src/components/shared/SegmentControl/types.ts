/**
 * Segment Control Component Types
 * 
 * Type definitions for Segment Control components
 * Designed with modularity, scalability, and type safety in mind
 */

import { ReactNode } from 'react';

/**
 * Segment Control variant styles
 */
export type SegmentControlVariant = 'default' | 'filled' | 'outlined';

/**
 * Segment Control size
 */
export type SegmentControlSize = 'sm' | 'md' | 'lg';

/**
 * Segment Control Item
 */
export interface SegmentControlItem {
  /**
   * Item value
   */
  value: string | number;
  
  /**
   * Item label
   */
  label: ReactNode;
  
  /**
   * Item icon (optional)
   */
  icon?: ReactNode;
  
  /**
   * Whether item is disabled
   */
  disabled?: boolean;
}

/**
 * Segment Control Props
 */
export interface SegmentControlProps {
  /**
   * Array of segment items
   */
  items: SegmentControlItem[];
  
  /**
   * Selected value
   */
  value?: string | number;
  
  /**
   * Default selected value (uncontrolled)
   */
  defaultValue?: string | number;
  
  /**
   * Variant style
   * @default 'default'
   */
  variant?: SegmentControlVariant;
  
  /**
   * Size of the segment control
   * @default 'md'
   */
  size?: SegmentControlSize;
  
  /**
   * Whether the segment control is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Full width
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


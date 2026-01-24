/**
 * Range Component Types
 * 
 * Type definitions for Range components
 * Designed with modularity, scalability, and type safety in mind
 */

/**
 * Range variant styles
 */
export type RangeVariant = 'default' | 'filled';

/**
 * Range size
 */
export type RangeSize = 'sm' | 'md' | 'lg';

/**
 * Range Props
 */
export interface RangeProps {
  /**
   * Current value (for single range)
   */
  value?: number;
  
  /**
   * Current values (for range with min and max)
   */
  values?: [number, number];
  
  /**
   * Minimum value
   * @default 0
   */
  min?: number;
  
  /**
   * Maximum value
   * @default 100
   */
  max?: number;
  
  /**
   * Step value
   * @default 1
   */
  step?: number;
  
  /**
   * Whether to show range (two thumbs)
   * @default false
   */
  range?: boolean;
  
  /**
   * Variant style
   * @default 'default'
   */
  variant?: RangeVariant;
  
  /**
   * Size of the range
   * @default 'md'
   */
  size?: RangeSize;
  
  /**
   * Show value labels
   * @default false
   */
  showLabels?: boolean;
  
  /**
   * Show value tooltip on thumb
   * @default true
   */
  showTooltip?: boolean;
  
  /**
   * Show marks/steps
   * @default false
   */
  showMarks?: boolean;
  
  /**
   * Custom marks (array of numbers or objects with value and label)
   */
  marks?: Array<number | { value: number; label?: string }>;
  
  /**
   * Label text
   */
  label?: string;
  
  /**
   * Helper text
   */
  helperText?: string;
  
  /**
   * Whether the range is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Change handler
   */
  onChange?: (value: number | [number, number]) => void;
  
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


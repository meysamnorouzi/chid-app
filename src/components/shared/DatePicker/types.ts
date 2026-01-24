/**
 * DatePicker Component Types
 * 
 * Type definitions for DatePicker components
 * Designed with modularity, scalability, and type safety in mind
 */

import type { HTMLAttributes } from 'react';

/**
 * DatePicker variant options
 */
export type DatePickerVariant = 
  | 'primary' 
  | 'secondary' 
  | 'outline' 
  | 'ghost';

/**
 * DatePicker size options
 */
export type DatePickerSize = 'sm' | 'md' | 'lg';

/**
 * Date format options
 */
export type DateFormat = 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY/MM/DD' | 'DD MMM YYYY' | 'MMM DD, YYYY';

/**
 * DatePicker Props
 */
export interface DatePickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'size' | 'onChange' | 'defaultValue'> {
  /**
   * Selected date value
   */
  value?: Date | null;
  
  /**
   * Default selected date
   */
  defaultValue?: Date | null;
  
  /**
   * Callback when date changes
   */
  onChange?: (date: Date | null) => void;
  
  /**
   * Placeholder text
   * @default 'Select date'
   */
  placeholder?: string;
  
  /**
   * DatePicker variant
   * @default 'outline'
   */
  variant?: DatePickerVariant;
  
  /**
   * DatePicker size
   * @default 'md'
   */
  size?: DatePickerSize;
  
  /**
   * Whether DatePicker is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Minimum selectable date
   */
  minDate?: Date;
  
  /**
   * Maximum selectable date
   */
  maxDate?: Date;
  
  /**
   * Date format for display
   * @default 'DD MMM YYYY'
   */
  dateFormat?: DateFormat;
  
  /**
   * Whether to show calendar icon
   * @default true
   */
  showIcon?: boolean;
  
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
   * Name attribute for form submission
   */
  name?: string;
}


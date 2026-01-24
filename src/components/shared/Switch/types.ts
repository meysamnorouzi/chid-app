/**
 * Switch Component Types
 * 
 * Type definitions for Switch components
 * Designed with modularity, scalability, and type safety in mind
 */

/**
 * Switch variant styles
 */
export type SwitchVariant = 'default' | 'filled';

/**
 * Switch size
 */
export type SwitchSize = 'sm' | 'md' | 'lg';

/**
 * Switch Props
 */
export interface SwitchProps {
  /**
   * Whether switch is checked
   */
  checked?: boolean;
  
  /**
   * Default checked state (uncontrolled)
   */
  defaultChecked?: boolean;
  
  /**
   * Whether switch is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Variant style
   * @default 'default'
   */
  variant?: SwitchVariant;
  
  /**
   * Size of the switch
   * @default 'md'
   */
  size?: SwitchSize;
  
  /**
   * Label text
   */
  label?: string;
  
  /**
   * Description text
   */
  description?: string;
  
  /**
   * Label position
   * @default 'right'
   */
  labelPosition?: 'left' | 'right';
  
  /**
   * Change handler
   */
  onChange?: (checked: boolean) => void;
  
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
  
  /**
   * Value attribute for form submission
   */
  value?: string;
  
  /**
   * ID attribute
   */
  id?: string;
}


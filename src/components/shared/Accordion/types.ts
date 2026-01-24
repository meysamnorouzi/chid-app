/**
 * Accordion Component Types
 * 
 * Type definitions for Accordion components
 * Designed with modularity, scalability, and type safety in mind
 */

import { ReactNode } from 'react';

/**
 * Accordion item state
 */
export type AccordionState = 'expanded' | 'collapsed' | 'disabled' | 'loading';

/**
 * Accordion variant styles
 */
export type AccordionVariant = 'default' | 'bordered' | 'ghost' | 'filled';

/**
 * Accordion size options
 */
export type AccordionSize = 'sm' | 'md' | 'lg';

/**
 * Icon position in accordion header
 */
export type IconPosition = 'left' | 'right' | 'none';

/**
 * Single Accordion Item Props
 */
export interface AccordionItemProps {
  /**
   * Unique identifier for the accordion item
   */
  id?: string;
  
  /**
   * Title text displayed in the header
   */
  title: string;
  
  /**
   * Content displayed when expanded
   */
  children: ReactNode;
  
  /**
   * Initial expanded state
   * @default false
   */
  defaultExpanded?: boolean;
  
  /**
   * Controlled expanded state
   */
  expanded?: boolean;
  
  /**
   * Callback fired when accordion is toggled
   */
  onToggle?: (expanded: boolean, id?: string) => void;
  
  /**
   * Whether the accordion is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Whether the accordion is in loading state
   * @default false
   */
  loading?: boolean;
  
  /**
   * Custom icon displayed in header
   */
  icon?: ReactNode;
  
  /**
   * Position of the icon
   * @default 'left'
   */
  iconPosition?: IconPosition;
  
  /**
   * Badge or count displayed in header
   */
  badge?: number | string | ReactNode;
  
  /**
   * Variant style
   * @default 'default'
   */
  variant?: AccordionVariant;
  
  /**
   * Size of the accordion
   * @default 'md'
   */
  size?: AccordionSize;
  
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
   * Whether to allow multiple items expanded in group
   * Only used in AccordionGroup context
   */
  allowMultiple?: boolean;
}

/**
 * Accordion Group Props
 */
export interface AccordionGroupProps {
  /**
   * Accordion items to render
   */
  items: Omit<AccordionItemProps, 'onToggle' | 'expanded' | 'defaultExpanded'>[];
  
  /**
   * Whether multiple items can be expanded simultaneously
   * @default false
   */
  allowMultiple?: boolean;
  
  /**
   * IDs of initially expanded items
   */
  defaultExpandedIds?: string[];
  
  /**
   * Controlled expanded IDs
   */
  expandedIds?: string[];
  
  /**
   * Callback fired when any accordion is toggled
   */
  onToggle?: (expandedIds: string[]) => void;
  
  /**
   * Variant style applied to all items
   * @default 'default'
   */
  variant?: AccordionVariant;
  
  /**
   * Size applied to all items
   * @default 'md'
   */
  size?: AccordionSize;
  
  /**
   * Spacing between accordion items
   * @default 'sm'
   */
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Additional inline styles
   */
  style?: React.CSSProperties;
}

/**
 * Accordion Context Type
 */
export interface AccordionContextType {
  variant: AccordionVariant;
  size: AccordionSize;
  allowMultiple: boolean;
  expandedIds: Set<string>;
  toggleItem: (id: string) => void;
}


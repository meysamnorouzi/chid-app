/**
 * Pagination Component Types
 * 
 * Type definitions for Pagination components
 * Designed with modularity, scalability, and type safety in mind
 */

/**
 * Pagination variant styles
 */
export type PaginationVariant = 'default' | 'outline' | 'ghost';

/**
 * Pagination size
 */
export type PaginationSize = 'sm' | 'md' | 'lg';

/**
 * Pagination Props
 */
export interface PaginationProps {
  /**
   * Current page number (1-based)
   */
  currentPage: number;
  
  /**
   * Total number of pages
   */
  totalPages: number;
  
  /**
   * Number of pages to show on each side of current page
   * @default 1
   */
  siblingCount?: number;
  
  /**
   * Variant style
   * @default 'default'
   */
  variant?: PaginationVariant;
  
  /**
   * Size of the pagination
   * @default 'md'
   */
  size?: PaginationSize;
  
  /**
   * Show first/last page buttons
   * @default true
   */
  showFirstLast?: boolean;
  
  /**
   * Show previous/next buttons
   * @default true
   */
  showPrevNext?: boolean;
  
  /**
   * Show page numbers
   * @default true
   */
  showPageNumbers?: boolean;
  
  /**
   * Callback fired when page changes
   */
  onPageChange: (page: number) => void;
  
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


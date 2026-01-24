/**
 * Carousel Component Types
 * 
 * Type definitions for Carousel components
 * Designed with modularity, scalability, and type safety in mind
 */

import type { ReactNode } from 'react';

/**
 * Carousel variant styles
 */
export type CarouselVariant = 'default' | 'bordered' | 'shadow';

/**
 * Carousel navigation position
 */
export type CarouselNavigationPosition = 'inside' | 'outside';

/**
 * Carousel indicator position
 */
export type CarouselIndicatorPosition = 'bottom' | 'top' | 'left' | 'right';

/**
 * Carousel autoplay direction
 */
export type CarouselDirection = 'left' | 'right';

/**
 * Single Carousel Props
 */
export interface CarouselProps {
  /**
   * Array of carousel items/slides
   */
  items: ReactNode[];
  
  /**
   * Number of items to show per slide
   * @default 1
   */
  itemsPerSlide?: number;
  
  /**
   * Variant style
   * @default 'default'
   */
  variant?: CarouselVariant;
  
  /**
   * Show navigation arrows
   * @default true
   */
  showArrows?: boolean;
  
  /**
   * Show indicator dots
   * @default true
   */
  showIndicators?: boolean;
  
  /**
   * Navigation arrows position
   * @default 'inside'
   */
  navigationPosition?: CarouselNavigationPosition;
  
  /**
   * Indicator position
   * @default 'bottom'
   */
  indicatorPosition?: CarouselIndicatorPosition;
  
  /**
   * Enable autoplay
   * @default false
   */
  autoplay?: boolean;
  
  /**
   * Autoplay interval in milliseconds
   * @default 3000
   */
  autoplayInterval?: number;
  
  /**
   * Autoplay direction
   * @default 'right'
   */
  autoplayDirection?: CarouselDirection;
  
  /**
   * Enable infinite loop
   * @default true
   */
  infinite?: boolean;
  
  /**
   * Enable swipe/ touch gestures
   * @default true
   */
  swipeable?: boolean;
  
  /**
   * Transition duration in milliseconds
   * @default 300
   */
  transitionDuration?: number;
  
  /**
   * Gap between items in pixels
   * @default 16
   */
  gap?: number;
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Additional inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Callback fired when slide changes
   */
  onSlideChange?: (index: number) => void;
  
  /**
   * Initial slide index
   * @default 0
   */
  defaultIndex?: number;
  
  /**
   * Controlled slide index
   */
  currentIndex?: number;
  
  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
}


/**
 * Carousel Component
 * 
 * Display a carousel/slider with navigation controls and indicators
 * Designed with SEO, accessibility, security, and modular structure in mind
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { useContext } from 'react';
import { DocumentationThemeContext } from '../../../theme/DocumentationThemeContext';
import { documentationTheme } from '../../../theme/themes/documentationTheme';
import type { CarouselProps } from './types';

const Carousel = ({
  items,
  itemsPerSlide = 1,
  variant = 'default',
  showArrows = true,
  showIndicators = true,
  navigationPosition = 'inside',
  indicatorPosition = 'bottom',
  autoplay = false,
  autoplayInterval = 3000,
  autoplayDirection = 'right',
  infinite = true,
  swipeable = true,
  transitionDuration = 300,
  gap = 16,
  className = '',
  style,
  onSlideChange,
  defaultIndex = 0,
  currentIndex: controlledIndex,
  'aria-label': ariaLabel,
}: CarouselProps) => {
  // Get theme from context, fallback to default theme if not in documentation context
  const themeContext = useContext(DocumentationThemeContext);
  const theme = themeContext?.theme || documentationTheme;

  const [currentIndex, setCurrentIndex] = useState(defaultIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoplayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isControlled = controlledIndex !== undefined;
  const activeIndex = isControlled ? controlledIndex : currentIndex;

  const totalSlides = Math.ceil(items.length / itemsPerSlide);

  // Handle slide change
  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;

    let newIndex = index;
    
    if (infinite) {
      if (index < 0) {
        newIndex = totalSlides - 1;
      } else if (index >= totalSlides) {
        newIndex = 0;
      }
    } else {
      newIndex = Math.max(0, Math.min(totalSlides - 1, index));
    }

    if (!isControlled) {
      setCurrentIndex(newIndex);
    }

    setIsTransitioning(true);
    onSlideChange?.(newIndex);

    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
    }

    transitionTimerRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, transitionDuration);
  }, [isTransitioning, infinite, totalSlides, isControlled, onSlideChange, transitionDuration]);

  // Navigation functions
  const goToNext = useCallback(() => {
    goToSlide(activeIndex + 1);
  }, [activeIndex, goToSlide]);

  const goToPrevious = useCallback(() => {
    goToSlide(activeIndex - 1);
  }, [activeIndex, goToSlide]);

  // Touch handlers
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    if (!swipeable) return;
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!swipeable) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!swipeable || !touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // Autoplay effect
  useEffect(() => {
    if (!autoplay || isTransitioning) return;

    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }

    autoplayTimerRef.current = setInterval(() => {
      if (autoplayDirection === 'right') {
        goToNext();
      } else {
        goToPrevious();
      }
    }, autoplayInterval);

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [autoplay, autoplayInterval, autoplayDirection, isTransitioning, goToNext, goToPrevious]);

  // Sync controlled index
  useEffect(() => {
    if (isControlled && controlledIndex !== currentIndex) {
      goToSlide(controlledIndex);
    }
  }, [controlledIndex, isControlled, currentIndex, goToSlide]);

  // Variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'bordered':
        return {
          border: `1px solid ${theme.colors.gray[300]}`,
          borderRadius: '8px',
        };
      case 'shadow':
        return {
          boxShadow: theme.boxShadows.default,
          borderRadius: '8px',
        };
      default:
        return {};
    }
  };

  // Calculate transform
  const getTransform = () => {
    // Calculate the width of one slide (including gap)
    const slideWidth = 100 / totalSlides;
    const translateX = -(activeIndex * slideWidth);
    return `translateX(${translateX}%)`;
  };

  // Navigation button styles
  const getNavButtonStyles = () => {
    const baseStyles: React.CSSProperties = {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 10,
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      border: 'none',
      backgroundColor: theme.colors.light.inverse,
      color: theme.colors.gray[700],
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s ease-in-out',
      boxShadow: theme.boxShadows.light,
    };

    if (navigationPosition === 'inside') {
      return {
        ...baseStyles,
        opacity: 0.9,
      };
    }

    return baseStyles;
  };

  const navButtonStyles = getNavButtonStyles();

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{
        ...getVariantStyles(),
        ...style,
      }}
      role="region"
      aria-label={ariaLabel || 'Carousel'}
      ref={carouselRef}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Carousel Container */}
      <div
        className="flex"
        style={{
          width: `${totalSlides * 100}%`,
          transform: getTransform(),
          transition: isTransitioning ? `transform ${transitionDuration}ms ease-in-out` : 'none',
          gap: `${gap}px`,
        }}
      >
        {items.map((item, index) => {
          // Calculate item width: each slide is 100% of viewport, items per slide should fit
          // Container is totalSlides * 100%, so relative to container: (100% / totalSlides) / itemsPerSlide
          const slideWidthPercent = 100 / totalSlides;
          const itemWidthPercent = slideWidthPercent / itemsPerSlide;
          
          return (
            <div
              key={index}
              className="shrink-0"
              style={{
                width: `${itemWidthPercent}%`,
              }}
            >
              {item}
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      {showArrows && totalSlides > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="carousel-nav-button-prev"
            style={{
              ...navButtonStyles,
              left: navigationPosition === 'inside' ? '10px' : '-50px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme.colors.gray[100];
              e.currentTarget.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = theme.colors.light.inverse;
              e.currentTarget.style.opacity = navigationPosition === 'inside' ? '0.9' : '1';
            }}
            aria-label="Previous slide"
            disabled={!infinite && activeIndex === 0}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="carousel-nav-button-next"
            style={{
              ...navButtonStyles,
              right: navigationPosition === 'inside' ? '10px' : '-50px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme.colors.gray[100];
              e.currentTarget.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = theme.colors.light.inverse;
              e.currentTarget.style.opacity = navigationPosition === 'inside' ? '0.9' : '1';
            }}
            aria-label="Next slide"
            disabled={!infinite && activeIndex === totalSlides - 1}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && totalSlides > 1 && (
        <div
          className="absolute flex gap-2"
          style={{
            ...(indicatorPosition === 'bottom' && {
              bottom: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
            }),
            ...(indicatorPosition === 'top' && {
              top: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
            }),
            ...(indicatorPosition === 'left' && {
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              flexDirection: 'column',
            }),
            ...(indicatorPosition === 'right' && {
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              flexDirection: 'column',
            }),
          }}
          role="tablist"
          aria-label="Slide indicators"
        >
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="transition-all duration-200 rounded-full"
              style={{
                width: index === activeIndex ? '24px' : '8px',
                height: '8px',
                backgroundColor: index === activeIndex ? theme.colors.primary.default : theme.colors.gray[300],
                cursor: 'pointer',
              }}
              aria-label={`Go to slide ${index + 1}`}
              aria-selected={index === activeIndex}
              role="tab"
              onMouseEnter={(e) => {
                if (index !== activeIndex) {
                  e.currentTarget.style.backgroundColor = theme.colors.gray[400];
                }
              }}
              onMouseLeave={(e) => {
                if (index !== activeIndex) {
                  e.currentTarget.style.backgroundColor = theme.colors.gray[300];
                }
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;


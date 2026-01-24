/**
 * Tooltip Component
 * 
 * Display a tooltip on hover
 * Designed with SEO, accessibility, security, and modular structure in mind
 */

import { useState, useContext, useRef, useEffect } from 'react';
import { DocumentationThemeContext } from '../../../theme/DocumentationThemeContext';
import { documentationTheme } from '../../../theme/themes/documentationTheme';
import type { TooltipProps } from './types';

const Tooltip = ({
  content,
  children,
  position = 'top',
  size = 'md',
  disabled = false,
  delay = 0,
  className = '',
  style,
  'aria-label': ariaLabel,
}: TooltipProps) => {
  // Get theme from context, fallback to default theme if not in documentation context
  const themeContext = useContext(DocumentationThemeContext);
  const theme = themeContext?.theme || documentationTheme;

  const isDark = theme.mode === 'dark';
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<{ top: number; left: number } | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Size mappings
  const sizeMap = {
    sm: {
      padding: 'px-2 py-1',
      text: 'text-xs',
      iconSize: 'w-3 h-3',
      gap: 'gap-1.5',
      pointerSize: 'w-2 h-2',
    },
    md: {
      padding: 'px-3 py-2',
      text: 'text-sm',
      iconSize: 'w-4 h-4',
      gap: 'gap-2',
      pointerSize: 'w-2.5 h-2.5',
    },
    lg: {
      padding: 'px-4 py-3',
      text: 'text-base',
      iconSize: 'w-5 h-5',
      gap: 'gap-2.5',
      pointerSize: 'w-3 h-3',
    },
  };

  const sizeClasses = sizeMap[size];

  // Get pointer size in pixels
  const getPointerSize = (): number => {
    switch (size) {
      case 'sm': return 8;
      case 'md': return 10;
      case 'lg': return 12;
    }
  };

  // Calculate tooltip position
  const calculatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const spacing = 8;
    const pointerSize = getPointerSize();

    let top = 0;
    let left = 0;

    switch (position) {
      case 'top':
        top = triggerRect.top + window.scrollY - tooltipRect.height - spacing - pointerSize;
        left = triggerRect.left + window.scrollX + (triggerRect.width / 2) - (tooltipRect.width / 2);
        break;
      case 'bottom':
        top = triggerRect.bottom + window.scrollY + spacing + pointerSize;
        left = triggerRect.left + window.scrollX + (triggerRect.width / 2) - (tooltipRect.width / 2);
        break;
      case 'left':
        top = triggerRect.top + window.scrollY + (triggerRect.height / 2) - (tooltipRect.height / 2);
        left = triggerRect.left + window.scrollX - tooltipRect.width - spacing - pointerSize;
        break;
      case 'right':
        top = triggerRect.top + window.scrollY + (triggerRect.height / 2) - (tooltipRect.height / 2);
        left = triggerRect.right + window.scrollX + spacing + pointerSize;
        break;
    }

    setTooltipPosition({ top, left });
  };

  // Handle mouse enter
  const handleMouseEnter = () => {
    if (disabled) return;

    if (delay > 0) {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
        setTimeout(calculatePosition, 0);
      }, delay);
    } else {
      setIsVisible(true);
      setTimeout(calculatePosition, 0);
    }
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsVisible(false);
    setTooltipPosition(null);
  };

  // Update position on scroll/resize
  useEffect(() => {
    if (isVisible) {
      const updatePosition = () => {
        calculatePosition();
      };

      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);

      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [isVisible, position]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const pointerSize = getPointerSize();
  const pointerColor = isDark ? theme.colors.gray[300] : theme.colors.gray[800];

  // Get pointer styles
  const getPointerStyles = (): React.CSSProperties => {
    switch (position) {
      case 'top':
        return {
          bottom: `-${pointerSize}px`,
          left: '50%',
          transform: 'translateX(-50%)',
          borderTopColor: pointerColor,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: 'transparent',
          borderWidth: `${pointerSize}px ${pointerSize}px 0 ${pointerSize}px`,
        };
      case 'bottom':
        return {
          top: `-${pointerSize}px`,
          left: '50%',
          transform: 'translateX(-50%)',
          borderBottomColor: pointerColor,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderTopColor: 'transparent',
          borderWidth: `0 ${pointerSize}px ${pointerSize}px ${pointerSize}px`,
        };
      case 'left':
        return {
          right: `-${pointerSize}px`,
          top: '50%',
          transform: 'translateY(-50%)',
          borderLeftColor: pointerColor,
          borderTopColor: 'transparent',
          borderBottomColor: 'transparent',
          borderRightColor: 'transparent',
          borderWidth: `${pointerSize}px 0 ${pointerSize}px ${pointerSize}px`,
        };
      case 'right':
        return {
          left: `-${pointerSize}px`,
          top: '50%',
          transform: 'translateY(-50%)',
          borderRightColor: pointerColor,
          borderTopColor: 'transparent',
          borderBottomColor: 'transparent',
          borderLeftColor: 'transparent',
          borderWidth: `${pointerSize}px ${pointerSize}px ${pointerSize}px 0`,
        };
    }
  };

  return (
    <div
      ref={triggerRef}
      className={`inline-block ${className}`}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {/* Tooltip */}
      {isVisible && !disabled && (
        <div
          ref={tooltipRef}
          className="fixed z-50 rounded-lg shadow-lg transition-opacity duration-200"
          style={{
            top: tooltipPosition?.top ?? 0,
            left: tooltipPosition?.left ?? 0,
            backgroundColor: isDark ? theme.colors.gray[300] : theme.colors.gray[800],
            color: isDark ? theme.colors.gray[800] : theme.colors.light.inverse,
            opacity: tooltipPosition ? 1 : 0,
            pointerEvents: 'none',
          }}
          role="tooltip"
          aria-label={ariaLabel || 'Tooltip'}
        >
          {/* Content */}
          <div className={`flex items-center ${sizeClasses.gap} ${sizeClasses.padding} ${sizeClasses.text}`}>
            {content}
          </div>

          {/* Pointer */}
          <div
            className="absolute w-0 h-0"
            style={getPointerStyles()}
          />
        </div>
      )}
    </div>
  );
};

export default Tooltip;


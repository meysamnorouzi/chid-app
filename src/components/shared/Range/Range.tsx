/**
 * Range Component
 * 
 * Display a range slider input
 * Designed with SEO, accessibility, security, and modular structure in mind
 */

import { useState, useRef, useCallback, useContext, useEffect } from 'react';
import React from 'react';
import { DocumentationThemeContext } from '../../../theme/DocumentationThemeContext';
import { documentationTheme } from '../../../theme/themes/documentationTheme';
import type { RangeProps } from './types';

const Range = ({
  value: controlledValue,
  values: controlledValues,
  min = 0,
  max = 100,
  step = 1,
  range = false,
  variant = 'default',
  size = 'md',
  showLabels = false,
  showTooltip = true,
  showMarks = false,
  marks,
  label,
  helperText,
  disabled = false,
  onChange,
  className = '',
  style,
  'aria-label': ariaLabel,
}: RangeProps) => {
  // Get theme from context, fallback to default theme if not in documentation context
  const themeContext = useContext(DocumentationThemeContext);
  const theme = themeContext?.theme || documentationTheme;

  const isDark = theme.mode === 'dark';
  const [internalValue, setInternalValue] = useState<number>(controlledValue ?? min);
  const [internalValues, setInternalValues] = useState<[number, number]>(
    controlledValues ?? [min, max]
  );
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
  const [hoveredThumb, setHoveredThumb] = useState<'min' | 'max' | null>(null);
  
  const sliderRef = useRef<HTMLDivElement>(null);
  const minThumbRef = useRef<HTMLDivElement>(null);
  const maxThumbRef = useRef<HTMLDivElement>(null);

  const isControlled = range ? controlledValues !== undefined : controlledValue !== undefined;
  const currentValue = isControlled ? (range ? undefined : controlledValue) : internalValue;
  const currentValues = isControlled ? (range ? controlledValues : undefined) : internalValues;

  // Size mappings
  const sizeMap = {
    sm: {
      trackHeight: 'h-1',
      thumbSize: 'w-4 h-4',
      tooltipText: 'text-xs',
      labelText: 'text-sm',
      helperText: 'text-xs',
    },
    md: {
      trackHeight: 'h-1.5',
      thumbSize: 'w-5 h-5',
      tooltipText: 'text-sm',
      labelText: 'text-base',
      helperText: 'text-sm',
    },
    lg: {
      trackHeight: 'h-2',
      thumbSize: 'w-6 h-6',
      tooltipText: 'text-base',
      labelText: 'text-lg',
      helperText: 'text-base',
    },
  };

  const sizeClasses = sizeMap[size];

  // Calculate percentage
  const getPercentage = (val: number) => {
    return ((val - min) / (max - min)) * 100;
  };

  // Clamp value
  const clamp = (val: number) => {
    return Math.min(Math.max(val, min), max);
  };

  // Round to step
  const roundToStep = (val: number) => {
    return Math.round((val - min) / step) * step + min;
  };

  // Get position from event
  const getPositionFromEvent = useCallback((e: MouseEvent | TouchEvent) => {
    if (!sliderRef.current) return 0;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const position = (clientX - rect.left) / rect.width;
    const rawValue = min + position * (max - min);
    return clamp(roundToStep(rawValue));
  }, [min, max, step]);

  // Handle mouse/touch move
  const handleMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;

    const newValue = getPositionFromEvent(e);

    if (range) {
      const [minVal, maxVal] = currentValues!;
      
      if (isDragging === 'min') {
        const newMin = Math.min(newValue, maxVal);
        const newValues: [number, number] = [newMin, maxVal];
        if (!isControlled) {
          setInternalValues(newValues);
        }
        onChange?.(newValues);
      } else {
        const newMax = Math.max(newValue, minVal);
        const newValues: [number, number] = [minVal, newMax];
        if (!isControlled) {
          setInternalValues(newValues);
        }
        onChange?.(newValues);
      }
    } else {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    }
  }, [isDragging, range, currentValues, isControlled, getPositionFromEvent, onChange]);

  // Handle mouse/touch end
  const handleEnd = useCallback(() => {
    setIsDragging(null);
  }, []);

  // Set up event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchmove', handleMove);
      document.addEventListener('touchend', handleEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('mouseup', handleEnd);
        document.removeEventListener('touchmove', handleMove);
        document.removeEventListener('touchend', handleEnd);
      };
    }
  }, [isDragging, handleMove, handleEnd]);

  // Handle thumb mouse down
  const handleThumbDown = (thumb: 'min' | 'max', e: React.MouseEvent | React.TouchEvent) => {
    if (disabled) return;
    e.preventDefault();
    setIsDragging(thumb);
  };

  // Handle track click
  const handleTrackClick = (e: React.MouseEvent) => {
    if (disabled || range) return;
    
    const newValue = getPositionFromEvent(e.nativeEvent);
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  // Get display value
  const getDisplayValue = () => {
    if (range && currentValues) {
      return currentValues;
    }
    return currentValue ?? internalValue;
  };

  const displayValue = getDisplayValue();
  const minValue = range ? (displayValue as [number, number])[0] : min;
  const currentSingleValue = range ? undefined : (displayValue as number);
  const maxValue = range ? (displayValue as [number, number])[1] : (displayValue as number);
  const minPercent = range ? getPercentage(minValue) : 0;
  const maxPercent = range ? getPercentage(maxValue) : getPercentage(currentSingleValue!);

  // Render marks
  const renderMarks = () => {
    if (!showMarks && !marks) return null;

    const marksToRender = marks || (showMarks ? Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i) => min + i * step) : []);

    return (
      <div className="relative w-full mt-2">
        {marksToRender.map((mark, index) => {
          const markValue = typeof mark === 'number' ? mark : mark.value;
          const markLabel = typeof mark === 'object' ? mark.label : undefined;
          const position = getPercentage(markValue);
          
          return (
            <div
              key={index}
              className="absolute transform -translate-x-1/2"
              style={{ left: `${position}%` }}
            >
              <div
                className="w-0.5 h-2"
                style={{
                  backgroundColor: isDark ? theme.colors.gray[400] : theme.colors.gray[300],
                }}
              />
              {markLabel && (
                <div
                  className={`${sizeClasses.helperText} mt-1 whitespace-nowrap`}
                  style={{
                    color: isDark ? theme.colors.gray[600] : theme.colors.gray[500],
                  }}
                >
                  {markLabel}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // Render thumb
  const renderThumb = (
    value: number,
    thumbType: 'min' | 'max',
    ref: React.RefObject<HTMLDivElement | null>
  ) => {
    const percent = getPercentage(value);
    const isHovered = hoveredThumb === thumbType;
    const isActive = isDragging === thumbType;

    return (
      <div
        ref={ref}
        className={`absolute ${sizeClasses.thumbSize} rounded-full transition-all duration-200 transform -translate-x-1/2 ${
          disabled ? 'cursor-not-allowed' : 'cursor-grab active:cursor-grabbing'
        }`}
        style={{
          left: `${percent}%`,
          backgroundColor: disabled
            ? (isDark ? theme.colors.gray[400] : theme.colors.gray[300])
            : theme.colors.primary.default,
          boxShadow: isActive || isHovered
            ? theme.boxShadows.default
            : theme.boxShadows.light,
          zIndex: isActive ? 20 : 10,
          transform: `translateX(-50%) ${isActive ? 'scale(1.1)' : 'scale(1)'}`,
        }}
        onMouseDown={(e) => handleThumbDown(thumbType, e)}
        onTouchStart={(e) => handleThumbDown(thumbType, e)}
        onMouseEnter={() => !disabled && setHoveredThumb(thumbType)}
        onMouseLeave={() => setHoveredThumb(null)}
      >
        {showTooltip && (isHovered || isActive) && (
          <div
            className={`absolute bottom-full mb-2 ${sizeClasses.tooltipText} px-2 py-1 rounded whitespace-nowrap`}
            style={{
              backgroundColor: isDark ? theme.colors.gray[300] : theme.colors.gray[800],
              color: isDark ? theme.colors.gray[800] : theme.colors.light.inverse,
              transform: 'translateX(-50%)',
            }}
          >
            {value}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`w-full ${className}`} style={style}>
      {/* Label */}
      {label && (
        <label
          className={`block ${sizeClasses.labelText} font-medium mb-2`}
          style={{
            color: isDark ? theme.colors.gray[800] : theme.colors.gray[700],
          }}
        >
          {label}
        </label>
      )}

      {/* Slider Container */}
      <div
        ref={sliderRef}
        className={`relative ${sizeClasses.trackHeight} w-full rounded-full cursor-pointer`}
        style={{
          backgroundColor: disabled
            ? (isDark ? theme.colors.gray[300] : theme.colors.gray[200])
            : (isDark ? theme.colors.gray[300] : theme.colors.gray[200]),
        }}
        onClick={handleTrackClick}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={range ? undefined : (displayValue as number)}
        aria-disabled={disabled}
        aria-label={ariaLabel || label || 'Range slider'}
      >
        {/* Track Fill */}
        {variant === 'filled' && (
          <div
            className={`absolute ${sizeClasses.trackHeight} rounded-full`}
            style={{
              left: range ? `${minPercent}%` : '0%',
              width: range ? `${maxPercent - minPercent}%` : `${maxPercent}%`,
              backgroundColor: disabled
                ? (isDark ? theme.colors.gray[400] : theme.colors.gray[300])
                : theme.colors.primary.default,
              transition: isDragging ? 'none' : 'all 0.2s ease-in-out',
            }}
          />
        )}

        {/* Thumbs */}
        {range ? (
          <>
            {renderThumb(currentValues![0], 'min', minThumbRef)}
            {renderThumb(currentValues![1], 'max', maxThumbRef)}
          </>
        ) : (
          renderThumb(displayValue as number, 'min', minThumbRef)
        )}
      </div>

      {/* Marks */}
      {renderMarks()}

      {/* Value Labels */}
      {showLabels && (
        <div className="flex justify-between mt-2">
          <span
            className={sizeClasses.helperText}
            style={{
              color: isDark ? theme.colors.gray[600] : theme.colors.gray[500],
            }}
          >
            {range ? currentValues![0] : displayValue}
          </span>
          {range && (
            <span
              className={sizeClasses.helperText}
              style={{
                color: isDark ? theme.colors.gray[600] : theme.colors.gray[500],
              }}
            >
              {currentValues![1]}
            </span>
          )}
        </div>
      )}

      {/* Helper Text */}
      {helperText && (
        <div
          className={`mt-1 ${sizeClasses.helperText}`}
          style={{
            color: isDark ? theme.colors.gray[600] : theme.colors.gray[500],
          }}
        >
          {helperText}
        </div>
      )}
    </div>
  );
};

export default Range;


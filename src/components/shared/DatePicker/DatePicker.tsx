/**
 * DatePicker Component
 * 
 * Reusable date picker component with calendar view
 * Designed with SEO, accessibility, security, and modular structure in mind
 */

import { useState, useRef, useEffect, useContext } from 'react';
import { DocumentationThemeContext } from '../../../theme/DocumentationThemeContext';
import { documentationTheme } from '../../../theme/themes/documentationTheme';
import type { DatePickerProps, DateFormat } from './types';

const DatePicker = ({
  value,
  defaultValue = null,
  onChange,
  placeholder = 'Select date',
  variant = 'outline',
  size = 'md',
  disabled = false,
  minDate,
  maxDate,
  dateFormat = 'DD MMM YYYY',
  showIcon = true,
  className = '',
  style,
  'aria-label': ariaLabel,
  name,
  ...rest
}: DatePickerProps) => {
  // Get theme from context, fallback to default theme if not in documentation context
  const themeContext = useContext(DocumentationThemeContext);
  const theme = themeContext?.theme || documentationTheme;

  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'day' | 'month' | 'year'>('day');
  const [currentDate, setCurrentDate] = useState<Date>(value || defaultValue || new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || defaultValue);
  const [yearRange, setYearRange] = useState({ start: currentDate.getFullYear() - 6, end: currentDate.getFullYear() + 5 });

  const datePickerRef = useRef<HTMLDivElement>(null);
  const isControlled = value !== undefined;

  // Update selected date when controlled value changes
  useEffect(() => {
    if (isControlled && value !== selectedDate) {
      setSelectedDate(value);
      if (value) {
        setCurrentDate(value);
      }
    }
  }, [value, isControlled]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setViewMode('day');
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Size mappings
  const sizeMap = {
    sm: {
      padding: 'px-3 py-1.5',
      text: 'text-sm',
      iconSize: 'w-4 h-4',
      height: 'h-8',
      gap: 'gap-2',
    },
    md: {
      padding: 'px-4 py-2',
      text: 'text-base',
      iconSize: 'w-5 h-5',
      height: 'h-10',
      gap: 'gap-2',
    },
    lg: {
      padding: 'px-5 py-2.5',
      text: 'text-lg',
      iconSize: 'w-6 h-6',
      height: 'h-12',
      gap: 'gap-3',
    },
  };

  const sizeClasses = sizeMap[size];

  // Variant styles
  const getVariantStyles = () => {
    const baseStyles: React.CSSProperties = {
      transition: 'all 0.2s ease-in-out',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontWeight: 500,
      outline: 'none',
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyles,
          backgroundColor: theme.colors.primary.default,
          color: theme.colors.primary.inverse,
          border: 'none',
          boxShadow: theme.boxShadows.light,
        };
      case 'secondary':
        return {
          ...baseStyles,
          backgroundColor: theme.colors.secondary.default,
          color: theme.colors.secondary.inverse,
          border: 'none',
          boxShadow: theme.boxShadows.light,
        };
      case 'outline':
        return {
          ...baseStyles,
          backgroundColor: 'transparent',
          color: theme.colors.gray[700],
          border: `1px solid ${theme.colors.gray[300]}`,
        };
      case 'ghost':
        return {
          ...baseStyles,
          backgroundColor: 'transparent',
          color: theme.colors.gray[700],
          border: 'none',
        };
      default:
        return baseStyles;
    }
  };

  const variantStyles = getVariantStyles();

  // Format date
  const formatDate = (date: Date | null): string => {
    if (!date) return placeholder;

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthNamesFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    switch (dateFormat) {
      case 'DD/MM/YYYY':
        return `${String(day).padStart(2, '0')}/${String(month + 1).padStart(2, '0')}/${year}`;
      case 'MM/DD/YYYY':
        return `${String(month + 1).padStart(2, '0')}/${String(day).padStart(2, '0')}/${year}`;
      case 'YYYY/MM/DD':
        return `${year}/${String(month + 1).padStart(2, '0')}/${String(day).padStart(2, '0')}`;
      case 'DD MMM YYYY':
        return `${day} ${monthNames[month]} ${year}`;
      case 'MMM DD, YYYY':
        return `${monthNamesFull[month]} ${day}, ${year}`;
      default:
        return `${day} ${monthNames[month]} ${year}`;
    }
  };

  // Get days in month
  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Get first day of month
  const getFirstDayOfMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Check if date is disabled
  const isDateDisabled = (date: Date): boolean => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  // Check if date is selected
  const isDateSelected = (date: Date): boolean => {
    if (!selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  // Check if date is today
  const isToday = (date: Date): boolean => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    if (isDateDisabled(date)) return;
    
    setSelectedDate(date);
    if (!isControlled) {
      onChange?.(date);
    } else {
      onChange?.(date);
    }
    setIsOpen(false);
    setViewMode('day');
  };

  // Handle month selection
  const handleMonthSelect = (month: number) => {
    const newDate = new Date(currentDate.getFullYear(), month, 1);
    setCurrentDate(newDate);
    setViewMode('day');
  };

  // Handle year selection
  const handleYearSelect = (year: number) => {
    const newDate = new Date(year, currentDate.getMonth(), 1);
    setCurrentDate(newDate);
    setViewMode('month');
  };

  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToPreviousYear = () => {
    setCurrentDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1));
  };

  const goToNextYear = () => {
    setCurrentDate(new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1));
  };

  const goToPreviousYearRange = () => {
    setYearRange({ start: yearRange.start - 12, end: yearRange.end - 12 });
  };

  const goToNextYearRange = () => {
    setYearRange({ start: yearRange.start + 12, end: yearRange.end + 12 });
  };

  // Render calendar days
  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days: (Date | null)[] = [];

    // Add previous month days
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 0);
    const prevMonthDays = prevMonth.getDate();
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, prevMonthDays - i));
    }

    // Add current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
    }

    // Add next month days to fill grid
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i));
    }

    return days;
  };

  // Render year grid
  const renderYearGrid = () => {
    const years: number[] = [];
    for (let year = yearRange.start; year <= yearRange.end; year++) {
      years.push(year);
    }
    return years;
  };

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div
      ref={datePickerRef}
      className={`relative inline-block ${className}`}
      style={style}
      {...rest}
    >
      {/* Input Button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`${sizeClasses.padding} ${sizeClasses.text} ${sizeClasses.height} ${sizeClasses.gap} rounded-lg w-full flex items-center justify-between ${isOpen ? 'ring-2 ring-offset-2' : ''}`}
        style={{
          ...variantStyles,
          ...(isOpen && variant === 'outline' ? { borderColor: theme.colors.primary.default } : {}),
          ...(isOpen ? { ringColor: theme.colors.primary.default } : {}),
        }}
        aria-label={ariaLabel || 'Select date'}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        <div className="flex items-center gap-2">
          {showIcon && (
            <svg
              className={sizeClasses.iconSize}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          )}
          <span>{formatDate(selectedDate)}</span>
        </div>
        <svg
          className={`${sizeClasses.iconSize} transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Hidden input for form submission */}
      {name && (
        <input
          type="hidden"
          name={name}
          value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
        />
      )}

      {/* Calendar Popup */}
      {isOpen && (
        <div
          className="absolute z-50 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-[280px]"
          style={{
            boxShadow: theme.boxShadows.default,
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Calendar"
        >
          {/* Year View */}
          {viewMode === 'year' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <button
                  type="button"
                  onClick={goToPreviousYearRange}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Previous year range"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span className="font-semibold text-gray-700">
                  {yearRange.start} - {yearRange.end}
                </span>
                <button
                  type="button"
                  onClick={goToNextYearRange}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Next year range"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {renderYearGrid().map((year) => {
                  const isDisabled = (minDate && year < minDate.getFullYear()) || (maxDate && year > maxDate.getFullYear());
                  const isSelected = currentDate.getFullYear() === year;
                  return (
                    <button
                      key={year}
                      type="button"
                      onClick={() => !isDisabled && handleYearSelect(year)}
                      disabled={isDisabled}
                      className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                        isSelected
                          ? 'text-white'
                          : isDisabled
                          ? 'text-gray-300 cursor-not-allowed'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                      style={{
                        ...(isSelected && {
                          backgroundColor: theme.colors.primary.default,
                          color: theme.colors.primary.inverse,
                        }),
                      }}
                    >
                      {year}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Month View */}
          {viewMode === 'month' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <button
                  type="button"
                  onClick={goToPreviousYear}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Previous year"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('year')}
                  className="font-semibold text-gray-700 hover:text-gray-900 px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {currentDate.getFullYear()}
                  <svg className="w-4 h-4 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={goToNextYear}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Next year"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {monthNames.map((month, index) => {
                  const testDate = new Date(currentDate.getFullYear(), index, 1);
                  const isDisabled = isDateDisabled(testDate);
                  const isSelected = currentDate.getMonth() === index;
                  return (
                    <button
                      key={month}
                      type="button"
                      onClick={() => !isDisabled && handleMonthSelect(index)}
                      disabled={isDisabled}
                      className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                        isSelected
                          ? 'text-white'
                          : isDisabled
                          ? 'text-gray-300 cursor-not-allowed'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                      style={{
                        ...(isSelected && {
                          backgroundColor: theme.colors.primary.default,
                          color: theme.colors.primary.inverse,
                        }),
                      }}
                    >
                      {month}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Day View */}
          {viewMode === 'day' && (
            <div>
              {/* Header with month/year navigation */}
              <div className="flex items-center justify-between mb-4">
                <button
                  type="button"
                  onClick={goToPreviousMonth}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Previous month"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setViewMode('month')}
                    className="font-semibold text-gray-700 hover:text-gray-900 px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    {monthNames[currentDate.getMonth()]}
                    <svg className="w-4 h-4 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('year')}
                    className="font-semibold text-gray-700 hover:text-gray-900 px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    {currentDate.getFullYear()}
                    <svg className="w-4 h-4 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                <button
                  type="button"
                  onClick={goToNextMonth}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Next month"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Day names */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map((day) => (
                  <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1">
                {renderCalendarDays().map((date, index) => {
                  if (!date) return <div key={index} />;
                  
                  const isCurrentMonth = date.getMonth() === currentDate.getMonth();
                  const isSelected = isDateSelected(date);
                  const isTodayDate = isToday(date);
                  const isDisabledDate = isDateDisabled(date);

                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleDateSelect(date)}
                      disabled={isDisabledDate}
                      className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                        isSelected
                          ? 'bg-primary text-white'
                          : isTodayDate && !isSelected
                          ? 'bg-gray-100 text-gray-900 font-semibold'
                          : isCurrentMonth
                          ? isDisabledDate
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'hover:bg-gray-100 text-gray-700'
                          : isDisabledDate
                          ? 'text-gray-200 cursor-not-allowed'
                          : 'text-gray-400 hover:bg-gray-50'
                      }`}
                      style={{
                        ...(isSelected && {
                          backgroundColor: theme.colors.primary.default,
                          color: theme.colors.primary.inverse,
                        }),
                      }}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DatePicker;


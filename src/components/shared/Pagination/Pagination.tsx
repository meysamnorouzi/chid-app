/**
 * Pagination Component
 * 
 * Display pagination controls with page numbers and navigation
 * Designed with SEO, accessibility, security, and modular structure in mind
 */

import { useContext } from 'react';
import { DocumentationThemeContext } from '../../../theme/DocumentationThemeContext';
import { documentationTheme } from '../../../theme/themes/documentationTheme';
import type { PaginationProps } from './types';

const Pagination = ({
  currentPage,
  totalPages,
  siblingCount = 1,
  variant = 'default',
  size = 'md',
  showFirstLast = true,
  showPrevNext = true,
  showPageNumbers = true,
  onPageChange,
  className = '',
  style,
  'aria-label': ariaLabel,
}: PaginationProps) => {
  // Get theme from context, fallback to default theme if not in documentation context
  const themeContext = useContext(DocumentationThemeContext);
  const theme = themeContext?.theme || documentationTheme;

  const isDark = theme.mode === 'dark';

  // Size mappings
  const sizeMap = {
    sm: {
      padding: 'px-2 py-1',
      text: 'text-xs',
      iconSize: 'w-3.5 h-3.5',
      minWidth: '28px',
      height: '28px',
    },
    md: {
      padding: 'px-3 py-1.5',
      text: 'text-sm',
      iconSize: 'w-4 h-4',
      minWidth: '36px',
      height: '36px',
    },
    lg: {
      padding: 'px-4 py-2',
      text: 'text-base',
      iconSize: 'w-5 h-5',
      minWidth: '44px',
      height: '44px',
    },
  };

  const sizeClasses = sizeMap[size];

  // Calculate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const totalNumbers = siblingCount * 2 + 5; // siblingCount on each side + current + first + last + 2 ellipsis
    const totalBlocks = totalNumbers + 2; // +2 for prev/next buttons

    if (totalPages <= totalBlocks) {
      // Show all pages if total is less than calculated blocks
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
      const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

      const shouldShowLeftEllipsis = leftSiblingIndex > 2;
      const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 1;

      if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
        const leftItemCount = 3 + 2 * siblingCount;
        const leftRange: number[] = [];
        for (let i = 1; i <= leftItemCount; i++) {
          leftRange.push(i);
        }
        pages.push(...leftRange, 'ellipsis', totalPages);
      } else if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
        const rightItemCount = 3 + 2 * siblingCount;
        const rightRange: number[] = [];
        for (let i = totalPages - rightItemCount + 1; i <= totalPages; i++) {
          rightRange.push(i);
        }
        pages.push(1, 'ellipsis', ...rightRange);
      } else if (shouldShowLeftEllipsis && shouldShowRightEllipsis) {
        const middleRange: number[] = [];
        for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
          middleRange.push(i);
        }
        pages.push(1, 'ellipsis', ...middleRange, 'ellipsis', totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  // Variant styles
  const getButtonStyles = (isActive: boolean = false, isDisabled: boolean = false) => {
    const baseStyles: React.CSSProperties = {
      minWidth: sizeClasses.minWidth,
      height: sizeClasses.height,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '6px',
      fontWeight: isActive ? 600 : 500,
      transition: 'all 0.2s ease-in-out',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      opacity: isDisabled ? 0.5 : 1,
      border: 'none',
      outline: 'none',
    };

    if (isActive) {
      switch (variant) {
        case 'outline':
          return {
            ...baseStyles,
            backgroundColor: 'transparent',
            color: theme.colors.primary.default,
            border: `1px solid ${theme.colors.primary.default}`,
          };
        case 'ghost':
          return {
            ...baseStyles,
            backgroundColor: isDark ? theme.colors.gray[300] : theme.colors.gray[100],
            color: theme.colors.primary.default,
          };
        default:
          return {
            ...baseStyles,
            backgroundColor: theme.colors.primary.default,
            color: theme.colors.primary.inverse,
          };
      }
    }

    switch (variant) {
      case 'outline':
        return {
          ...baseStyles,
          backgroundColor: 'transparent',
          color: isDark ? theme.colors.gray[700] : theme.colors.gray[700],
          border: `1px solid ${isDark ? theme.colors.gray[400] : theme.colors.gray[300]}`,
        };
      case 'ghost':
        return {
          ...baseStyles,
          backgroundColor: 'transparent',
          color: isDark ? theme.colors.gray[700] : theme.colors.gray[700],
        };
      default:
        return {
          ...baseStyles,
          backgroundColor: 'transparent',
          color: isDark ? theme.colors.gray[700] : theme.colors.gray[700],
        };
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const renderButton = (
    onClick: () => void,
    content: React.ReactNode,
    isActive: boolean = false,
    isDisabled: boolean = false,
    ariaLabel?: string
  ) => {
    const buttonStyles = getButtonStyles(isActive, isDisabled);

    return (
      <button
        type="button"
        onClick={onClick}
        disabled={isDisabled}
        className={`${sizeClasses.padding} ${sizeClasses.text} ${className}`}
        style={buttonStyles}
        onMouseEnter={(e) => {
          if (!isDisabled && !isActive) {
            e.currentTarget.style.backgroundColor = isDark ? theme.colors.gray[300] : theme.colors.gray[100];
            if (variant === 'outline') {
              e.currentTarget.style.borderColor = isDark ? theme.colors.gray[500] : theme.colors.gray[400];
            }
          }
        }}
        onMouseLeave={(e) => {
          if (!isDisabled && !isActive) {
            e.currentTarget.style.backgroundColor = buttonStyles.backgroundColor as string;
            if (variant === 'outline') {
              e.currentTarget.style.borderColor = buttonStyles.border as string;
            }
          }
        }}
        aria-label={ariaLabel}
        aria-current={isActive ? 'page' : undefined}
        aria-disabled={isDisabled}
      >
        {content}
      </button>
    );
  };

  if (totalPages <= 1) return null;

  return (
    <nav
      className={`flex items-center gap-1 ${className}`}
      style={style}
      role="navigation"
      aria-label={ariaLabel || 'Pagination'}
    >
      {/* First Page Button */}
      {showFirstLast && (
        <>
          {renderButton(
            () => handlePageChange(1),
            (
              <svg className={sizeClasses.iconSize} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            ),
            false,
            currentPage === 1,
            'Go to first page'
          )}
        </>
      )}

      {/* Previous Button */}
      {showPrevNext && (
        <>
          {renderButton(
            () => handlePageChange(currentPage - 1),
            (
              <svg className={sizeClasses.iconSize} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            ),
            false,
            currentPage === 1,
            'Go to previous page'
          )}
        </>
      )}

      {/* Page Numbers */}
      {showPageNumbers &&
        pageNumbers.map((page, index) => {
          if (page === 'ellipsis') {
            return (
              <span
                key={`ellipsis-${index}`}
                className={`${sizeClasses.padding} ${sizeClasses.text}`}
                style={{
                  color: isDark ? theme.colors.gray[600] : theme.colors.gray[500],
                }}
              >
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return (
            <div key={pageNum}>
              {renderButton(
                () => handlePageChange(pageNum),
                pageNum,
                isActive,
                false,
                `Go to page ${pageNum}`
              )}
            </div>
          );
        })}

      {/* Next Button */}
      {showPrevNext && (
        <>
          {renderButton(
            () => handlePageChange(currentPage + 1),
            (
              <svg className={sizeClasses.iconSize} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            ),
            false,
            currentPage === totalPages,
            'Go to next page'
          )}
        </>
      )}

      {/* Last Page Button */}
      {showFirstLast && (
        <>
          {renderButton(
            () => handlePageChange(totalPages),
            (
              <svg className={sizeClasses.iconSize} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            ),
            false,
            currentPage === totalPages,
            'Go to last page'
          )}
        </>
      )}
    </nav>
  );
};

export default Pagination;


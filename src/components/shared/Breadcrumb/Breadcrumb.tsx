/**
 * Breadcrumb Component
 * 
 * Navigation breadcrumb component for showing current page location
 * Designed with SEO, accessibility, security, and modular structure in mind
 */

import { useContext, useState } from 'react';
import { DocumentationThemeContext } from '../../../theme/DocumentationThemeContext';
import { documentationTheme } from '../../../theme/themes/documentationTheme';
import type { BreadcrumbItem, BreadcrumbProps } from './types';

const Breadcrumb = ({
  items,
  separator = '/',
  separatorComponent,
  showHomeIcon = false,
  maxItems,
  className = '',
  style,
  'aria-label': ariaLabel,
}: BreadcrumbProps) => {
  // Get theme from context, fallback to default theme if not in documentation context
  const themeContext = useContext(DocumentationThemeContext);
  const theme = themeContext?.theme || documentationTheme;
  const [showAll, setShowAll] = useState(false);

  // Handle item click
  const handleItemClick = (item: BreadcrumbItem, index: number) => {
    if (item.disabled) return;
    
    if (item.onClick) {
      item.onClick();
    } else if (item.href && index < items.length - 1) {
      // Only navigate if not the last item
      window.location.href = item.href;
    }
  };

  // Get separator element
  const getSeparator = () => {
    if (separatorComponent) {
      return separatorComponent;
    }
    
    if (typeof separator === 'string') {
      return (
        <span
          className="mx-2"
          style={{ color: theme.colors.gray[400] }}
          aria-hidden="true"
        >
          {separator}
        </span>
      );
    }
    
    return separator;
  };

  // Get items to display
  const getDisplayItems = () => {
    if (!maxItems || showAll || items.length <= maxItems) {
      return items;
    }

    // Show first item, ellipsis, and last (maxItems - 1) items
    const firstItem = items[0];
    const lastItems = items.slice(-(maxItems - 1));
    
    return [firstItem, { label: '...', disabled: true } as BreadcrumbItem, ...lastItems];
  };

  const displayItems = getDisplayItems();
  const hasMoreItems = maxItems && items.length > maxItems && !showAll;

  // Home icon
  const homeIcon = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );

  return (
    <nav
      className={`flex items-center flex-wrap ${className}`}
      style={style}
      role="navigation"
      aria-label={ariaLabel || 'Breadcrumb'}
    >
      <ol className="flex items-center flex-wrap list-none p-0 m-0" itemScope itemType="https://schema.org/BreadcrumbList">
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          const isEllipsis = item.label === '...';
          const isClickable = !isLast && !item.disabled && (item.href || item.onClick);

          return (
            <li
              key={index}
              className="flex items-center"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {index > 0 && getSeparator()}
              
              {isEllipsis ? (
                <span
                  className="px-2 cursor-pointer"
                  style={{ color: theme.colors.gray[500] }}
                  onClick={() => setShowAll(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setShowAll(true);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label="Show more items"
                >
                  {item.label}
                </span>
              ) : (
                <span
                  className={`flex items-center gap-1 ${
                    isClickable ? 'cursor-pointer' : 'cursor-default'
                  } ${item.disabled ? 'opacity-50' : ''}`}
                  style={{
                    color: isLast
                      ? theme.colors.gray[700]
                      : isClickable
                      ? theme.colors.primary.default
                      : theme.colors.gray[600],
                  }}
                  onClick={() => {
                    const originalIndex = items.findIndex(i => i.label === item.label && i.href === item.href);
                    handleItemClick(item, originalIndex >= 0 ? originalIndex : displayItems.indexOf(item));
                  }}
                  onMouseEnter={(e) => {
                    if (isClickable) {
                      e.currentTarget.style.textDecoration = 'underline';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (isClickable) {
                      e.currentTarget.style.textDecoration = 'none';
                    }
                  }}
                  itemProp="name"
                  aria-current={isLast ? 'page' : undefined}
                  aria-disabled={item.disabled}
                >
                  {showHomeIcon && index === 0 && !item.icon && (
                    <span style={{ color: 'inherit' }}>
                      {homeIcon}
                    </span>
                  )}
                  {item.icon && (
                    <span style={{ color: 'inherit' }}>
                      {item.icon}
                    </span>
                  )}
                  <span>{item.label}</span>
                </span>
              )}
              
              <meta itemProp="position" content={String(index + 1)} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;


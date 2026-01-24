/**
 * BottomNavigation Component
 * 
 * Bottom navigation bar component for mobile and desktop
 * Designed with SEO, accessibility, security, and modular structure in mind
 */

import { useContext } from 'react';
import { DocumentationThemeContext } from '../../../theme/DocumentationThemeContext';
import { documentationTheme } from '../../../theme/themes/documentationTheme';
import type { BottomNavigationProps } from './types';

const BottomNavigation = ({
  items,
  activeId,
  onItemClick,
  showLabels = true,
  className = '',
  style,
  'aria-label': ariaLabel,
}: BottomNavigationProps) => {
  // Get theme from context, fallback to default theme if not in documentation context
  const themeContext = useContext(DocumentationThemeContext);
  const theme = themeContext?.theme || documentationTheme;

  const handleItemClick = (itemId: string, onClick?: () => void) => {
    if (onClick) {
      onClick();
    }
    if (onItemClick) {
      onItemClick(itemId);
    }
  };

  return (
    <nav
      className={`flex items-center justify-around rounded-t-lg bg-white py-2.5 `}
      role="navigation"
      aria-label={ariaLabel || 'Bottom navigation'}
    >
      {items.map((item) => {
        const isActive = activeId === item.id;
        const isDisabled = item.disabled || false;

        return (
          <button
            key={item.id}
            onClick={() => !isDisabled && handleItemClick(item.id, item.onClick)}
            disabled={isDisabled}
            className={`flex flex-col items-center justify-center gap-1 px-1 py-2 rounded-lg transition-all duration-200 relative`}
            aria-label={item['aria-label'] || item.label}
            aria-current={isActive ? 'page' : undefined}
            aria-disabled={isDisabled}
          >
            {/* Icon */}
            <div className="relative px-2 py-1 rounded-[100px]"  style={{
              backgroundColor: isActive ? '#B258C9' : 'transparent',
            }}>
              {isActive && item.activeIcon ? item.activeIcon : item.icon}
            </div>

            {/* Label */}
            {showLabels && (
              <span
                className="text-xs font-medium"
                style={{
                  color: isActive
                    ? '#B258C9'
                    : theme.colors.gray[600],
                }}
              >
                {item.label}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNavigation;


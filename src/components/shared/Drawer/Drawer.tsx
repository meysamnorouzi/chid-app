/**
 * Drawer Component
 * 
 * Reusable drawer component that slides in from different positions
 * Designed with SEO, accessibility, security, and modular structure in mind
 */

import { useEffect, useContext } from 'react';
import { createPortal } from 'react-dom';
import { DocumentationThemeContext } from '../../../theme/DocumentationThemeContext';
import { documentationTheme } from '../../../theme/themes/documentationTheme';
import type { DrawerProps, DrawerPosition, DrawerSize } from './types';

const Drawer = ({
  open,
  onClose,
  position = 'right',
  size = 'md',
  showBackdrop = true,
  backdropClosable = true,
  closable = true,
  title,
  footer,
  children,
  className = '',
  style,
  backdropClassName = '',
  backdropStyle,
  'aria-label': ariaLabel,
  lockScroll = true,
  ...rest
}: DrawerProps) => {
  // Get theme from context, fallback to default theme if not in documentation context
  const themeContext = useContext(DocumentationThemeContext);
  const theme = themeContext?.theme || documentationTheme;

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (lockScroll && open) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [open, lockScroll]);

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (backdropClosable && e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open && closable) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [open, closable, onClose]);

  // Position classes
  const getPositionClasses = (): string => {
    const baseClasses = 'fixed z-50 bg-white transition-transform duration-300 ease-in-out';
    
    switch (position) {
      case 'left':
        return `${baseClasses} top-0 left-0 h-full ${size === 'full' ? 'w-full' : size === 'sm' ? 'w-64' : size === 'md' ? 'w-80' : size === 'lg' ? 'w-96' : 'w-[32rem]'} ${open ? 'translate-x-0' : '-translate-x-full'}`;
      case 'right':
        return `${baseClasses} top-0 right-0 h-full ${size === 'full' ? 'w-full' : size === 'sm' ? 'w-64' : size === 'md' ? 'w-80' : size === 'lg' ? 'w-96' : 'w-[32rem]'} ${open ? 'translate-x-0' : 'translate-x-full'}`;
      case 'top':
        return `${baseClasses} top-0 left-0 w-full ${size === 'full' ? 'h-full' : size === 'sm' ? 'h-64' : size === 'md' ? 'h-80' : size === 'lg' ? 'h-96' : 'h-[32rem]'} ${open ? 'translate-y-0' : '-translate-y-full'}`;
      case 'bottom':
        return `${baseClasses} bottom-0 left-0 w-full ${size === 'full' ? 'h-full' : size === 'sm' ? 'h-64' : size === 'md' ? 'h-80' : size === 'lg' ? 'h-96' : 'h-[32rem]'} ${open ? 'translate-y-0' : 'translate-y-full'}`;
      default:
        return baseClasses;
    }
  };

  // Backdrop classes
  const backdropClasses = `fixed inset-0 z-40 transition-opacity duration-300 ${
    open ? 'opacity-100' : 'opacity-0 pointer-events-none'
  } ${backdropClassName}`;

  const drawerContent = (
    <>
      {/* Backdrop */}
      {showBackdrop && (
        <div
          className={backdropClasses}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            ...backdropStyle,
          }}
          onClick={handleBackdropClick}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`${getPositionClasses()} flex flex-col shadow-xl ${className}`}
        style={{
          boxShadow: theme.boxShadows.default,
          ...style,
        }}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel || (typeof title === 'string' ? title : 'Drawer')}
        aria-hidden={!open}
        {...rest}
      >
        {/* Header */}
        {(title || closable) && (
          <div
            className="flex items-center justify-between px-6 py-4 border-b"
            style={{
              borderColor: theme.colors.gray[200],
            }}
          >
            {title && (
              <h2
                className="text-lg font-semibold flex-1"
                style={{
                  color: theme.colors.gray[900],
                }}
              >
                {title}
              </h2>
            )}
            {closable && (
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-lg transition-colors ml-4"
                style={{
                  color: theme.colors.gray[500],
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = theme.colors.gray[100];
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                aria-label="Close drawer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div
          className="flex-1 overflow-y-auto px-6 py-4"
          style={{
            backgroundColor: theme.background.card,
          }}
        >
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div
            className="px-6 py-4 border-t"
            style={{
              borderColor: theme.colors.gray[200],
              backgroundColor: theme.background.card,
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </>
  );

  // Render using portal
  if (typeof window !== 'undefined') {
    return createPortal(drawerContent, document.body);
  }

  return null;
};

export default Drawer;


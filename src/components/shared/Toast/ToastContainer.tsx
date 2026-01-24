/**
 * ToastContainer Component
 * 
 * Container for managing multiple toast notifications
 * Designed with SEO, accessibility, security, and modular structure in mind
 */

import { useContext } from 'react';
import { DocumentationThemeContext } from '../../../theme/DocumentationThemeContext';
import { documentationTheme } from '../../../theme/themes/documentationTheme';
import Toast from './Toast';
import type { ToastContainerProps, ToastItem } from './types';

interface ToastContainerInternalProps extends ToastContainerProps {
  toasts: ToastItem[];
  onRemove: (id: string) => void;
}

const ToastContainer = ({
  toasts,
  onRemove,
  position = 'top-right',
  maxToasts = 5,
  className = '',
  style,
}: ToastContainerInternalProps) => {
  // Get theme from context, fallback to default theme if not in documentation context
  const themeContext = useContext(DocumentationThemeContext);
  const theme = themeContext?.theme || documentationTheme;

  // Position mappings
  const positionMap = {
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4',
  };

  const displayedToasts = toasts.slice(0, maxToasts);

  if (displayedToasts.length === 0) return null;

  return (
    <div
      className={`fixed z-50 flex flex-col gap-3 ${positionMap[position]} ${className}`}
      style={style}
      role="region"
      aria-label="Toast notifications"
      aria-live="polite"
    >
      {displayedToasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={() => {
            onRemove(toast.id);
            toast.onClose?.();
          }}
        />
      ))}
    </div>
  );
};

export default ToastContainer;


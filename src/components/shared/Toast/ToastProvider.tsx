/**
 * ToastProvider Component
 * 
 * Context provider for managing toast notifications globally
 * Designed with SEO, accessibility, security, and modular structure in mind
 */

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import ToastContainer from './ToastContainer';
import type { ToastProps, ToastItem, ToastPosition } from './types';

interface ToastContextType {
  showToast: (toast: Omit<ToastProps, 'onClose'>) => void;
  removeToast: (id: string) => void;
  clearAll: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
  position?: ToastPosition;
  maxToasts?: number;
}

export const ToastProvider = ({ 
  children, 
  position = 'top-right',
  maxToasts = 5 
}: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((toast: Omit<ToastProps, 'onClose'>) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: ToastItem = {
      ...toast,
      id,
    };
    
    setToasts((prev) => [...prev, newToast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, removeToast, clearAll }}>
      {children}
      <ToastContainer
        toasts={toasts}
        onRemove={removeToast}
        position={position}
        maxToasts={maxToasts}
      />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};


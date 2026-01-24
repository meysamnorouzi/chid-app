/**
 * Documentation Layout Component
 * 
 * Protected layout for documentation section
 * Redirects to login if user is not authenticated
 * Designed with SEO, security, and modular structure in mind
 */

import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { DocumentationThemeProvider, useDocumentationTheme } from '../theme';
import { DocumentationModeProvider } from '../theme/DocumentationModeContext';
import { DocumentationSidebar, Header } from '../components/documentation';

interface DocumentationLayoutProps {
  children?: ReactNode;
}

/**
 * Inner component that uses theme context
 * Must be inside DocumentationThemeProvider
 */
const DocumentationContent = ({ children }: DocumentationLayoutProps) => {
  const { theme } = useDocumentationTheme();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on mobile when clicking outside
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);

  return (
    <div className="desktop-wrapper">
      <div 
        className="app-shell transition-colors duration-300"
        style={{ backgroundColor: theme.background.body }}
      >
        <div className="flex flex-col w-full min-h-full overflow-hidden">
          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="fixed top-4 left-4 z-20 p-2 rounded-lg transition-colors"
            style={{
              backgroundColor: theme.background.card,
              color: theme.colors.gray[700],
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            }}
            aria-label="Open sidebar"
            aria-expanded={sidebarOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Sidebar Drawer */}
          <DocumentationSidebar 
            isOpen={sidebarOpen}
            onToggle={() => setSidebarOpen(!sidebarOpen)}
          />

          {/* Overlay for sidebar */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-30"
              onClick={() => setSidebarOpen(false)}
              aria-hidden="true"
            />
          )}

          {/* Main Content */}
          <main 
            className="transition-all duration-300 flex flex-col w-full flex-1"
            role="main"
          >
            <div className="w-full flex flex-col min-h-0 gap-4 p-4">
              {/* Header */}
              <Header />

              {/* Content Box with Scroll */}
              <div
                className="overflow-y-auto rounded-xl border w-full flex-1"
                style={{
                  backgroundColor: theme.background.card,
                  borderColor: theme.colors.gray[300],
                  boxShadow: theme.boxShadows.light,
                }}
              >
                <div className="p-4 w-full">
                  {children || <Outlet />}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

/**
 * Inner component for login page that uses theme context
 * Must be inside DocumentationThemeProvider
 */
const DocumentationLoginContent = ({ children }: DocumentationLayoutProps) => {
  const { theme } = useDocumentationTheme();

  return (
    <div className="desktop-wrapper">
      <div
        className="app-shell transition-colors duration-300"
        dir="ltr"
        style={{ backgroundColor: theme.background.body }}
      >
        <main className="w-full min-h-full flex items-center justify-center" role="main">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

const DocumentationLayout = ({ children }: DocumentationLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [docAuthToken] = useLocalStorage<string | null>('docAuthToken', null);
  const isLoginPage = location.pathname === '/documentation/login';

  useEffect(() => {
    // If not authenticated and trying to access protected route, redirect to login
    if (!docAuthToken && !isLoginPage) {
      navigate('/documentation/login', { replace: true });
    }
    // If authenticated and on login page, redirect to documentation
    else if (docAuthToken && isLoginPage) {
      navigate('/documentation', { replace: true });
    }
  }, [docAuthToken, isLoginPage, navigate]);

  // Render login page if not authenticated
  if (!docAuthToken && isLoginPage) {
    return (
      <DocumentationThemeProvider>
        <DocumentationLoginContent>
          {children}
        </DocumentationLoginContent>
      </DocumentationThemeProvider>
    );
  }

  // Don't render protected content if not authenticated
  if (!docAuthToken) {
    return null;
  }

  // Render protected content
  return (
    <DocumentationThemeProvider>
      <DocumentationModeProvider>
      <DocumentationContent>
        {children}
      </DocumentationContent>
      </DocumentationModeProvider>
    </DocumentationThemeProvider>
  );
};

export default DocumentationLayout;


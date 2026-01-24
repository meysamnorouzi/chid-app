import type { ReactNode } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ThemeLayout } from "../theme";
import BottomNavigationApp from "../components/shared/BottomNavigationApp";
import { ToastProvider } from "../components/shared/Toast";

interface MainLayoutProps {
  children?: ReactNode;
}

/**
 * MainLayout Component
 *
 * Main application layout that includes Header, Main Content, and Footer
 * This component is designed for SEO, security, and modular structure
 */
const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();
  const shouldHideBottomNav = 
    location.pathname.startsWith('/digifun') || 
    /^\/shop\/[^/]+$/.test(location.pathname) ||
    location.pathname === '/cart' ||
    location.pathname === '/order-receipt';

  return (
    <ThemeLayout>
      <ToastProvider position="top-center" maxToasts={3}>
        <div className="min-h-full flex flex-col" dir="rtl">
          {/* Header */}

          {/* Main Content */}
          <main className="flex-1" role="main">
            {children || <Outlet />}
          </main>

          {!shouldHideBottomNav && <BottomNavigationApp />}
        </div>
      </ToastProvider>
    </ThemeLayout>
  );
};

export default MainLayout;

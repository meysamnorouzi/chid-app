import type { ReactNode } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ThemeLayout } from "../theme";
import BottomNavigationApp from "../components/shared/BottomNavigationApp";

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
    /^\/shop\/[^/]+$/.test(location.pathname);

  return (
    <ThemeLayout>
      <div className="min-h-screen flex flex-col" dir="rtl">
        {/* Header */}

        {/* Main Content */}
        <main className="flex-1 bg-gray-50" role="main">
          {children || <Outlet />}
        </main>

        {!shouldHideBottomNav && <BottomNavigationApp />}
      </div>
    </ThemeLayout>
  );
};

export default MainLayout;

import type { ReactNode } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ThemeLayout } from "../theme";
import BottomNavigationApp from "../components/shared/BottomNavigationApp";
import SidebarNavigation from "../components/shared/SidebarNavigation";
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
    location.pathname === '/shahr-farang' ||
    /^\/shop\/[^/]+$/.test(location.pathname) ||
    location.pathname === '/cart' ||
    location.pathname === '/order-receipt' ||
    /^\/digibook\/[^/]+\/part\//.test(location.pathname);

  return (
    <ThemeLayout>
      <ToastProvider position="top-center" maxToasts={3}>
        <div className="min-h-screen flex flex-col" dir="rtl">
          {/* Sidebar for desktop/tablet */}
          {!shouldHideBottomNav && <SidebarNavigation />}

          {/* Main Content */}
          <main className={`flex-1 bg-white ${!shouldHideBottomNav ? 'md:mr-64' : ''}`} role="main">
            {children || <Outlet />}
          </main>

          {/* Bottom Navigation for mobile */}
          {!shouldHideBottomNav && <BottomNavigationApp />}
        </div>
      </ToastProvider>
    </ThemeLayout>
  );
};

export default MainLayout;

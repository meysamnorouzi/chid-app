import type { ReactNode } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ThemeLayout } from "../theme";
import BottomNavigationApp from "../components/shared/BottomNavigationApp";
import SidebarNavigation from "../components/shared/SidebarNavigation";
import WalletHeader from "../components/shared/Wallet/WalletHeader";
import { ToastProvider } from "../components/shared/Toast";
import { PageHeaderProvider, usePageHeader } from "../contexts/PageHeaderContext";
import { lineIconPaths } from "../utils/lineIcons";

interface MainLayoutProps {
  children?: ReactNode;
}

function MainLayoutInner({ children }: { children?: ReactNode }) {
  const location = useLocation();
  const headerConfig = usePageHeader();
  const shopIcon = (location.pathname === "/shop" || location.pathname.startsWith("/shop/")) ? (
    <img src={lineIconPaths.store} className="w-5 h-5" alt="فروشگاه" />
  ) : undefined;
  return (
    <ThemeLayout>
      <ToastProvider position="top-center" maxToasts={3}>
        <div className="min-h-screen flex flex-col" dir="rtl">
          {/* Fixed profile bar — always on top */}
          <div className="fixed top-0 left-0 right-0 md:right-64 z-40 bg-white border-b border-gray-100">
            <WalletHeader
              greeting={headerConfig.greeting}
              subtitle={headerConfig.subtitle}
              showCartBadge={headerConfig.showCartBadge}
              icon={headerConfig.icon ?? shopIcon}
            />
          </div>

          {/* Sidebar for desktop/tablet */}
          <SidebarNavigation />

          {/* Main Content — pt for fixed header (h ~80px) */}
          <main className="flex-1 bg-white md:mr-64 pt-20" role="main">
            {children || <Outlet />}
          </main>

          {/* Bottom Navigation for mobile — shown on all non-home pages */}
          <BottomNavigationApp />
        </div>
      </ToastProvider>
    </ThemeLayout>
  );
}

/**
 * MainLayout Component
 *
 * Main application layout that includes Header, Main Content, and Footer.
 * All pages using this layout (everything except home) show the bottom menu
 * and a fixed profile bar at the top.
 */
const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();
  return (
    <PageHeaderProvider pathname={location.pathname}>
      <MainLayoutInner>{children}</MainLayoutInner>
    </PageHeaderProvider>
  );
};

export default MainLayout;

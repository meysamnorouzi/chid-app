import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { ThemeLayout } from "../theme";
import { ToastProvider } from "../components/shared/Toast";

interface AuthLayoutProps {
  children?: ReactNode;
}

/**
 * AuthLayout Component
 *
 * Main application layout that includes Header, Main Content, and Footer
 * This component is designed for SEO, security, and modular structure
 */
const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <ThemeLayout>
      <ToastProvider position="top-center" maxToasts={3}>
        {/* Single viewport on mobile (100dvh = dynamic viewport, accounts for browser UI/address bar); no page scroll */}
        <div
          className="flex flex-col bg-white h-[100dvh] max-h-[100dvh] md:h-auto md:min-h-screen md:max-h-none"
          dir="rtl"
        >
          <main className="flex-1 min-h-0 flex flex-col overflow-hidden" role="main">
            {children || <Outlet />}
          </main>
        </div>
      </ToastProvider>
    </ThemeLayout>
  );
};

export default AuthLayout;

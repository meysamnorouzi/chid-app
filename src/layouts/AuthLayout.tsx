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
        <div className="min-h-screen flex flex-col" dir="rtl">
          {/* Header */}

          {/* Main Content */}
          <main className="flex-1 bg-white" role="main">
            {children || <Outlet />}
          </main>

        </div>
      </ToastProvider>
    </ThemeLayout>
  );
};

export default AuthLayout;

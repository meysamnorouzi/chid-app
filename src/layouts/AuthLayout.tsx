import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { ThemeLayout } from "../theme";

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
      <div className="min-h-screen flex flex-col" dir="rtl">
        {/* Header */}

        {/* Main Content */}
        <main className="flex-1 bg-gray-50" role="main">
          {children || <Outlet />}
        </main>

      </div>
    </ThemeLayout>
  );
};

export default AuthLayout;

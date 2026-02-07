import type { ReactNode } from "react";
import { createContext, useCallback, useContext, useRef } from "react";
import { Outlet } from "react-router-dom";
import { ThemeLayout } from "../theme";
import { ToastProvider } from "../components/shared/Toast";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { lineIconPaths } from "../utils/lineIcons";
import { LineHomeIcon } from "../components/shared/LineHomeIcon";
import ProfileMenuModal from "../components/shared/Wallet/ProfileMenuModal";

/** Register a callback to run when the Boz (bottom-left) image is tapped. Used by Home to show first-welcome onboarding. */
const BozClickContext = createContext<{
  registerBozClick: (handler: (() => void) | null) => void;
} | null>(null);

export function useBozClick() {
  const ctx = useContext(BozClickContext);
  return ctx;
}

interface HomeLayoutProps {
  children?: ReactNode;
}

/**
 * HomeLayout Component
 *
 * Special layout for the home page that includes a menu icon button
 * instead of the bottom navigation bar
 */
const HomeLayout = ({ children }: HomeLayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const navigate = useNavigate();
  const bozClickRef = useRef<(() => void) | null>(null);
  const registerBozClick = useCallback((handler: (() => void) | null) => {
    bozClickRef.current = handler;
  }, []);

  /* Same icons and order as bottom nav (wallet, store, goals, cafe) + profile */
  const menuItems = [
    { path: '/wallet-money', label: 'کیف پول', iconSrc: lineIconPaths.wallet },
    { path: '/shop', label: 'فروشگاه', iconSrc: lineIconPaths.store },
    { path: '/digiteen/goals', label: 'اهداف', iconSrc: lineIconPaths.ahduff },
    { path: '/friends', label: 'کافه', iconSrc: lineIconPaths.cafe },
    { path: '/user-info', label: 'پروفایل', iconSrc: lineIconPaths.profile },
  ];

  return (
    <ThemeLayout>
      <BozClickContext.Provider value={{ registerBozClick }}>
        <ToastProvider position="top-center" maxToasts={3}>
          {/* 100dvh on mobile keeps bottom menu/boz in view; 100vh fallback from h-screen */}
          <div
            className="flex flex-col relative w-full overflow-hidden min-h-0 h-screen max-h-screen"
            style={{ height: '100dvh', maxHeight: '100dvh' }}
            dir="rtl"
          >
            {/* Main Content - fills remaining space, no overflow */}
            <main className="flex-1 min-h-0 overflow-hidden flex flex-col" role="main">
              {children || <Outlet />}
            </main>

            {/* Boz icon - bottom left; tap shows default onboarding (first-welcome) */}
            <div
              className="absolute bottom-0 left-0 z-40 p-4 cursor-pointer touch-manipulation"
              onClick={() => bozClickRef.current?.()}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); bozClickRef.current?.(); } }}
              role="button"
              tabIndex={0}
              aria-label="نمایش راهنمای خوش‌آمد"
            >
              <img
                src="/icons/boz.svg"
                className="w-32 h-62 object-contain pointer-events-none select-none"
                alt="Boz"
              />
            </div>

          {/* Menu Button - Bottom Right, inside viewport */}
          <div className="absolute bottom-6 right-6 z-50">
            {/* Menu Icons - Appear above the menu button */}
            <AnimatePresence>
              {isMenuOpen && (
                <>
                  {/* Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm -z-10"
                    onClick={() => setIsMenuOpen(false)}
                  />
                  
                  {/* Menu Items Container */}
                  <div className="relative flex flex-col items-end gap-3 mb-3">
                    {menuItems.map((item, index) => {
                      return (
                        <div
                          key={item.path}
                          className="relative"
                        >
                          {/* Icon Button */}
                          <motion.button
                            initial={{ 
                              opacity: 0, 
                              scale: 0,
                              y: 30,
                              rotate: -180
                            }}
                            animate={{ 
                              opacity: 1, 
                              scale: 1, 
                              y: 0,
                              rotate: 0
                            }}
                            exit={{ 
                              opacity: 0, 
                              scale: 0, 
                              y: 30,
                              rotate: 180
                            }}
                            transition={{ 
                              type: "spring",
                              stiffness: 300,
                              damping: 25,
                              delay: index * 0.08,
                              mass: 0.8
                            }}
                            onClick={() => {
                              if (item.path === "/user-info") {
                                setIsProfileModalOpen(true);
                                setIsMenuOpen(false);
                              } else {
                                navigate(item.path);
                                setIsMenuOpen(false);
                              }
                            }}
                            className="relative w-14 h-14 bg-white rounded-xl shadow-xl flex items-center justify-center overflow-visible"
                            aria-label={item.label}
                            whileHover={{ 
                              scale: 1.15,
                              y: -5,
                              transition: { duration: 0.2 }
                            }}
                            whileTap={{ 
                              scale: 0.9,
                              transition: { duration: 0.1 }
                            }}
                          >
                            {/* Ripple effect background */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-br from-[#7e4bd0]/10 to-[#7e4bd0]/5 rounded-xl"
                              initial={{ scale: 0, opacity: 0 }}
                              whileHover={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            />
                            
                            {/* Icon - mask + background for exact purple on all devices (avoids iOS filter→pink shift) */}
                            <motion.div
                              className="w-7 h-7 relative z-10 shrink-0"
                              role="img"
                              aria-hidden
                              style={{
                                backgroundColor: "#7e4bd0",
                                maskImage: `url(${item.iconSrc})`,
                                maskSize: "contain",
                                maskRepeat: "no-repeat",
                                maskPosition: "center",
                                WebkitMaskImage: `url(${item.iconSrc})`,
                                WebkitMaskSize: "contain",
                                WebkitMaskRepeat: "no-repeat",
                                WebkitMaskPosition: "center",
                              }}
                              whileHover={{
                                rotate: [0, -10, 10, -10, 0],
                                transition: { duration: 0.5 },
                              }}
                            />
                          </motion.button>

                          {/* Label Box - Positioned absolutely to the left */}
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ 
                              delay: index * 0.08 + 0.1,
                              duration: 0.3
                            }}
                            className="absolute right-full mr-2 top-1/2 -translate-y-1/2 w-24 px-3 py-2 bg-white rounded-lg shadow-lg border border-gray-100 flex items-center justify-center"
                          >
                            <span className="text-sm font-medium text-gray-700 text-center">
                              {item.label}
                            </span>
                          </motion.div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </AnimatePresence>

            {/* Main Menu Button - Only aligned with icons */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative w-14 h-14 bg-[#7e4bd0] rounded-xl shadow-xl flex items-center justify-center overflow-hidden group"
              aria-label="منو"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#7e4bd0] to-[#6a3fb8]"
                animate={isMenuOpen ? {
                  background: "linear-gradient(135deg, #6a3fb8 0%, #7e4bd0 100%)"
                } : {
                  background: "linear-gradient(135deg, #7e4bd0 0%, #6a3fb8 100%)"
                }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Icon - same as bottom nav "خانه" */}
              <motion.div
                className="w-8 h-8 relative z-10 text-white flex items-center justify-center"
                animate={isMenuOpen ? { 
                  rotate: 90,
                  scale: [1, 1.2, 1]
                } : { 
                  rotate: 0,
                  scale: 1
                }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  duration: 0.4
                }}
              >
                <LineHomeIcon className="w-8 h-8" />
              </motion.div>
              
              {/* Ripple effect on click */}
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-xl"
                    initial={{ scale: 0, opacity: 0.8 }}
                    animate={{ scale: 2, opacity: 0 }}
                    exit={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  />
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Profile popover - same as profile avatar on other pages */}
        <ProfileMenuModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
        />
      </ToastProvider>
      </BozClickContext.Provider>
    </ThemeLayout>
  );
};

export default HomeLayout;


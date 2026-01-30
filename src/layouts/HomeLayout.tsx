import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { ThemeLayout } from "../theme";
import { ToastProvider } from "../components/shared/Toast";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { lineIconPaths } from "../utils/lineIcons";

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
  const navigate = useNavigate();

  const menuItems = [
    { path: '/wallet-money', label: 'کیف پول', icon: lineIconPaths.wallet },
    { path: '/shop', label: 'فروشگاه', icon: lineIconPaths.store },
    { path: '/digibook', label: 'دیجی بوک', icon: lineIconPaths.book },
    { path: '/shahr-farang', label: 'شهر فرنگ', icon: lineIconPaths.shahreFarang },
    { path: '/radioteen', label: 'رادیو تین', icon: lineIconPaths.podcast },
    { path: '/digiteen/goals', label: 'اهداف', icon: lineIconPaths.like },
    { path: '/friends', label: 'دوستان', icon: lineIconPaths.gift },
    { path: '/messages', label: 'پیام‌ها', icon: lineIconPaths.notif },
    { path: '/user-info', label: 'پروفایل', icon: lineIconPaths.profile },
  ];

  return (
    <ThemeLayout>
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

          {/* Boz icon - bottom left, inside viewport */}
          <div className="absolute bottom-0 left-0 z-40 p-4 pointer-events-none">
            <img
              src="/icons/boz.svg"
              className="w-32 h-62 object-contain "
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
                              navigate(item.path);
                              setIsMenuOpen(false);
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
                            
                            {/* Icon */}
                            <motion.img
                              src={item.icon}
                              alt={item.label}
                              className="w-7 h-7 relative z-10"
                              style={{ 
                                filter: 'brightness(0) saturate(100%) invert(32%) sepia(95%) saturate(3000%) hue-rotate(245deg) brightness(0.95) contrast(1.1)',
                                WebkitFilter: 'brightness(0) saturate(100%) invert(32%) sepia(95%) saturate(3000%) hue-rotate(245deg) brightness(0.95) contrast(1.1)'
                              }}
                              whileHover={{ 
                                rotate: [0, -10, 10, -10, 0],
                                transition: { duration: 0.5 }
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
              
              {/* Icon */}
              <motion.img
                src={lineIconPaths.menu}
                alt="منو"
                className="w-7 h-7 relative z-10 brightness-0 invert"
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
              />
              
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
      </ToastProvider>
    </ThemeLayout>
  );
};

export default HomeLayout;


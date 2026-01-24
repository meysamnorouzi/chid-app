import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  HomeIcon, 
  WalletIcon, 
  ShoppingBagIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline'

interface NavItem {
  path: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
 
  { path: '/wallet-money', label: 'کیف پول', icon: WalletIcon },
  { path: '/shop', label: 'فروشگاه', icon: ShoppingBagIcon },
  { path: '/', label: 'خانه', icon: HomeIcon },
  { path: '/friends', label: 'دوستان', icon: UserGroupIcon },
  { path: '/messages', label: 'پیام‌ها', icon: ChatBubbleLeftRightIcon },
]

function BottomNavigationApp() {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path: string) => {
    // If it's wallet path, check if current location is any wallet page
    if (path === '/wallet-money') {
      return location.pathname === '/wallet-money' || 
             location.pathname === '/wallet-saving' || 
             location.pathname === '/wallet-digit'
    }
    return location.pathname === path
  }

  return (
    <nav className="fixed bottom-0 left-1/2 w-full max-w-[430px] -translate-x-1/2 bg-white border-t border-gray-200 px-4 pb-6 pt-3" dir="rtl">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.path)
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="relative flex items-center gap-2 px-4 py-2 transition-all duration-300"
            >
              {active && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-[#7e4bd0] rounded-full"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30
                  }}
                />
              )}
              <motion.div
                animate={active ? {
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                } : {
                  scale: 1,
                  rotate: 0
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut"
                }}
                className="relative z-10"
              >
                <Icon className={`w-6 h-6 ${active ? 'text-white' : 'text-gray-500'}`} />
              </motion.div>
              {active && (
                <motion.span 
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="text-sm font-medium text-white relative z-10"
                >
                  {item.label}
                </motion.span>
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default BottomNavigationApp


import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  HomeIcon, 
  WalletIcon, 
  ShoppingBagIcon,
  UserGroupIcon,
  SpeakerWaveIcon
} from '@heroicons/react/24/outline'

interface NavItem {
  path: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  { path: '/', label: 'خانه', icon: HomeIcon },
  { path: '/wallet-money', label: 'کیف پول', icon: WalletIcon },
  { path: '/shop', label: 'فروشگاه', icon: ShoppingBagIcon },
  { path: '/radioteen', label: 'رادیو تین', icon: SpeakerWaveIcon },
  { path: '/friends', label: 'دوستان', icon: UserGroupIcon },
]

function SidebarNavigation() {
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
    <aside className="hidden md:flex fixed right-0 top-0 bottom-0 w-64 bg-white border-l border-gray-200 shadow-lg z-40 flex-col" dir="rtl">
      <div className="flex flex-col h-full py-6">
        <div className="px-4 mb-6">
          <h2 className="text-lg font-bold text-gray-800">منو</h2>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)
            
            return (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`relative w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  active 
                    ? 'bg-[#7e4bd0] text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {active && (
                  <motion.div
                    layoutId="sidebarActiveTab"
                    className="absolute inset-0 bg-[#7e4bd0] rounded-xl"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30
                    }}
                  />
                )}
                <motion.div
                  animate={active ? {
                    scale: [1, 1.1, 1],
                  } : {
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut"
                  }}
                  className="relative z-10"
                >
                  <Icon className={`w-6 h-6 ${active ? 'text-white' : 'text-gray-500'}`} />
                </motion.div>
                <span className={`text-sm font-medium relative z-10 ${active ? 'text-white' : 'text-gray-700'}`}>
                  {item.label}
                </span>
              </motion.button>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}

export default SidebarNavigation


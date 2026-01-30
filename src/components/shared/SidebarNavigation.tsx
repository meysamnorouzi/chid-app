import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { lineIconPaths } from '../../utils/lineIcons'
import { LineHomeIcon } from './LineHomeIcon'

interface NavItemWithIcon {
  path: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  iconSrc?: never
}
interface NavItemWithSrc {
  path: string
  label: string
  icon?: never
  iconSrc: string
}
type NavItem = NavItemWithIcon | NavItemWithSrc

const navItems: NavItem[] = [
  { path: '/', label: 'خانه', icon: LineHomeIcon },
  { path: '/wallet-money', label: 'کیف پول', iconSrc: lineIconPaths.wallet },
  { path: '/shop', label: 'فروشگاه', iconSrc: lineIconPaths.store },
  { path: '/radioteen', label: 'رادیو تین', iconSrc: lineIconPaths.podcast },
  { path: '/friends', label: 'دوستان', iconSrc: lineIconPaths.like },
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
                  className="relative z-10 flex items-center justify-center"
                >
                  {'iconSrc' in item ? (
                    <img
                      src={item.iconSrc}
                      alt=""
                      className={`w-6 h-6 object-contain ${active ? 'brightness-0 invert' : 'opacity-60'}`}
                    />
                  ) : (
                    <item.icon className={`w-6 h-6 ${active ? 'text-white' : 'text-gray-500'}`} />
                  )}
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


import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useModal } from '../../contexts/ModalContext'
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
  { path: '/wallet-money', label: 'کیف پول', iconSrc: lineIconPaths.wallet },
  { path: '/shop', label: 'فروشگاه', iconSrc: lineIconPaths.store },
  { path: '/', label: 'خانه', icon: LineHomeIcon },
  { path: '/digiteen/goals', label: 'اهداف', iconSrc: lineIconPaths.ahduff },
  { path: '/friends', label: 'کافه', iconSrc: lineIconPaths.cafe },
]

function BottomNavigationApp() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isModalOpen } = useModal()

  const isActive = (path: string) => {
    // Wallet path: active on any wallet page
    if (path === '/wallet-money') {
      return location.pathname === '/wallet-money' ||
             location.pathname === '/wallet-saving' ||
             location.pathname === '/wallet-digit'
    }
    // اهداف (Goals): active on any digiteen page
    if (path === '/digiteen/goals') {
      return location.pathname.startsWith('/digiteen')
    }
    return location.pathname === path
  }

  if (isModalOpen) {
    return null
  }

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 w-full bg-white border-t border-gray-200 px-4 pb-6 pt-3" dir="rtl">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
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
                className="relative z-10 flex items-center justify-center"
              >
                {'iconSrc' in item ? (
                  <img
                    src={item.iconSrc}
                    alt=""
                    className={`w-6 h-6 object-contain ${active ? 'brightness-0 invert' : 'opacity-60'}`}
                  />
                ) : (
                  <item.icon className={`${item.path === '/' ? 'w-8 h-8' : 'w-6 h-6'} ${active ? 'text-white' : 'text-gray-500'}`} />
                )}
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


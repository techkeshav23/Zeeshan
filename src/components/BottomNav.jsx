import { Home, Image, Film, Heart, User } from 'lucide-react'
import { motion } from 'framer-motion'
import { soundManager } from '../utils/sounds'

const navItems = [
  { id: 'home', icon: Home },
  { id: 'photos', icon: Image },
  { id: 'movies', icon: Film },
  { id: 'messages', icon: Heart },
  { id: 'about', icon: User },
]

function BottomNav({ activePage, onNavigate }) {
  const handleNavigate = (id) => {
    if (activePage !== id) {
      soundManager.playClick()
      onNavigate(id)
    }
  }

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-christmas-dark/95 backdrop-blur-md border-t border-christmas-green/20 z-40 pb-[env(safe-area-inset-bottom)]">
      <nav className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activePage === item.id
          
          return (
            <motion.button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className="flex-1 h-full flex items-center justify-center relative"
              whileTap={{ scale: 0.9 }}
            >
              {isActive && (
                <motion.div
                  className="absolute top-0 w-8 h-0.5 bg-christmas-red rounded-full"
                  layoutId="activeTab"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <motion.div
                animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <Icon 
                  size={22} 
                  strokeWidth={isActive ? 2 : 1.5}
                  className={`transition-colors duration-200 ${
                    isActive ? 'text-christmas-red' : 'text-white/40'
                  }`}
                />
              </motion.div>
            </motion.button>
          )
        })}
      </nav>
    </div>
  )
}

export default BottomNav

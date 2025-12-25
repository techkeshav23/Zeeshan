import { motion, AnimatePresence } from 'framer-motion'
import { Gift, Sparkles } from 'lucide-react'

function WelcomePopup({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="bg-gradient-to-b from-christmas-card to-christmas-dark border border-christmas-gold/30 rounded-3xl p-6 max-w-sm w-full shadow-2xl shadow-christmas-red/20"
        >
          {/* Decorative elements */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Gift size={32} className="text-christmas-gold" />
            </motion.div>
          </div>

          {/* Zeeshan's Image */}
          <div className="relative mb-4 mt-2">
            <motion.div
              className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-christmas-gold/50 shadow-lg shadow-christmas-gold/20"
              animate={{ 
                boxShadow: [
                  '0 0 20px rgba(212, 175, 55, 0.3)',
                  '0 0 40px rgba(212, 175, 55, 0.5)',
                  '0 0 20px rgba(212, 175, 55, 0.3)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <img
                src="/images/WhatsApp Image 2025-12-25 at 12.21.18 PM.jpeg"
                alt="Zeeshan"
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            {/* Sparkle decorations */}
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles size={20} className="text-christmas-gold" />
            </motion.div>
            <motion.div
              className="absolute -bottom-2 -left-2"
              animate={{ scale: [1, 1.2, 1], rotate: [360, 180, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            >
              <Sparkles size={16} className="text-christmas-red" />
            </motion.div>
          </div>

          {/* Title */}
          <motion.h2
            className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-christmas-gold via-yellow-200 to-christmas-gold bg-clip-text text-transparent"
            animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🎄 Merry Christmas! 🎄
          </motion.h2>

          {/* Subtitle */}
          <p className="text-center text-white/70 text-sm mb-6">
            A special gift just for you, <span className="text-christmas-gold font-semibold">Zeeshan</span> ❤️
          </p>

          {/* OK Button */}
          <motion.button
            onClick={onClose}
            className="w-full py-3 px-6 bg-gradient-to-r from-christmas-red to-red-700 text-white font-semibold rounded-xl shadow-lg shadow-christmas-red/30 flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(196, 30, 58, 0.5)' }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Open My Gift</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              🎁
            </motion.span>
          </motion.button>

          {/* Snow decoration */}
          <div className="text-center mt-4 text-white/40 text-xs">
            ❄️ Click to start the magic ❄️
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default WelcomePopup

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Gift } from 'lucide-react'
import { soundManager } from '../utils/sounds'

// Christmas Tree Component with Lights
function ChristmasTree({ isSmall = false }) {
  const lights = [
    { x: 50, y: 25, color: 'bg-yellow-400', delay: 0 },
    { x: 30, y: 40, color: 'bg-christmas-red', delay: 0.3 },
    { x: 70, y: 38, color: 'bg-blue-400', delay: 0.6 },
    { x: 25, y: 55, color: 'bg-christmas-gold', delay: 0.2 },
    { x: 75, y: 53, color: 'bg-green-400', delay: 0.5 },
    { x: 40, y: 65, color: 'bg-pink-400', delay: 0.4 },
    { x: 60, y: 63, color: 'bg-christmas-red', delay: 0.1 },
    { x: 20, y: 75, color: 'bg-blue-400', delay: 0.7 },
    { x: 80, y: 73, color: 'bg-yellow-400', delay: 0.8 },
  ]

  return (
    <div className={`relative ${isSmall ? 'w-16 h-20 scale-75' : 'w-28 h-36'} transition-all duration-300`}>
      {/* Star on top */}
      <motion.div 
        className={`absolute top-0 left-1/2 -translate-x-1/2 text-christmas-gold ${isSmall ? 'text-lg' : 'text-2xl'}`}
        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        ⭐
      </motion.div>
      
      {/* Tree layers */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2">
        <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-b-[30px] border-l-transparent border-r-transparent border-b-christmas-green" />
      </div>
      <div className="absolute top-8 left-1/2 -translate-x-1/2">
        <div className="w-0 h-0 border-l-[30px] border-r-[30px] border-b-[35px] border-l-transparent border-r-transparent border-b-christmas-greenLight" />
      </div>
      <div className="absolute top-12 left-1/2 -translate-x-1/2">
        <div className="w-0 h-0 border-l-[40px] border-r-[40px] border-b-[40px] border-l-transparent border-r-transparent border-b-christmas-green" />
      </div>
      <div className="absolute top-[70px] left-1/2 -translate-x-1/2">
        <div className="w-0 h-0 border-l-[50px] border-r-[50px] border-b-[45px] border-l-transparent border-r-transparent border-b-christmas-greenLight" />
      </div>
      
      {/* Tree trunk */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-amber-800 rounded-sm" />
      
      {/* Lights */}
      {lights.map((light, i) => (
        <motion.div
          key={i}
          className={`absolute w-2 h-2 rounded-full ${light.color} shadow-lg`}
          style={{ left: `${light.x}%`, top: `${light.y}%` }}
          animate={{ 
            opacity: [0.4, 1, 0.4],
            scale: [0.8, 1.2, 0.8],
            boxShadow: ['0 0 2px currentColor', '0 0 8px currentColor', '0 0 2px currentColor']
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: light.delay }}
        />
      ))}
    </div>
  )
}

// Santa Claus Component
function SantaClaus({ isSmall = false }) {
  return (
    <motion.div 
      className={`relative ${isSmall ? 'w-12 h-14 scale-75' : 'w-20 h-24'} transition-all duration-300`}
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Santa Hat */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2">
        <div className="w-0 h-0 border-l-[16px] border-r-[16px] border-b-[20px] border-l-transparent border-r-transparent border-b-christmas-red" />
        <motion.div 
          className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
      
      {/* Hat brim */}
      <div className="absolute top-[18px] left-1/2 -translate-x-1/2 w-12 h-2 bg-white rounded-full" />
      
      {/* Face */}
      <div className="absolute top-[22px] left-1/2 -translate-x-1/2 w-10 h-10 bg-[#ffdbac] rounded-full">
        {/* Eyes */}
        <motion.div 
          className="absolute top-3 left-2 w-1.5 h-1.5 bg-gray-800 rounded-full"
          animate={{ scaleY: [1, 0.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
        />
        <motion.div 
          className="absolute top-3 right-2 w-1.5 h-1.5 bg-gray-800 rounded-full"
          animate={{ scaleY: [1, 0.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
        />
        {/* Nose */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#ffb6b6] rounded-full" />
        {/* Cheeks */}
        <div className="absolute top-6 left-0.5 w-2 h-1.5 bg-[#ffb6b6] rounded-full opacity-60" />
        <div className="absolute top-6 right-0.5 w-2 h-1.5 bg-[#ffb6b6] rounded-full opacity-60" />
      </div>
      
      {/* Beard */}
      <div className="absolute top-[45px] left-1/2 -translate-x-1/2 w-12 h-10 bg-white rounded-b-full" />
      
      {/* Body */}
      <div className="absolute top-[70px] left-1/2 -translate-x-1/2 w-14 h-10 bg-christmas-red rounded-t-lg">
        {/* Belt */}
        <div className="absolute top-3 left-0 w-full h-2 bg-gray-900">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-christmas-gold rounded-sm" />
        </div>
      </div>
    </motion.div>
  )
}

function HomePage({ onNavigate }) {
  const [isRevealed, setIsRevealed] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  // Detect screen size
  useEffect(() => {
    const checkSize = () => setIsSmallScreen(window.innerWidth < 400)
    checkSize()
    window.addEventListener('resize', checkSize)
    return () => window.removeEventListener('resize', checkSize)
  }, [])

  // Track scroll position
  useEffect(() => {
    const container = document.querySelector('.overflow-y-auto')
    if (!container) return
    
    const handleScroll = () => setScrollY(container.scrollTop)
    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle gift reveal with sound
  const [showExplosion, setShowExplosion] = useState(false)
  
  const handleReveal = () => {
    if (!isRevealed) {
      soundManager.playUnwrap()
      setShowExplosion(true)
      
      // Show the revealed content after explosion
      setTimeout(() => {
        setIsRevealed(true)
      }, 800)
      
      // Hide explosion after animation
      setTimeout(() => {
        setShowExplosion(false)
      }, 1500)
    }
  }

  // Hide decorations after scrolling
  const hideDecorations = scrollY > 50

  return (
    <div className="min-h-full flex flex-col px-6 pt-8 pb-32 relative overflow-hidden">
      
      {/* Christmas Decorations - hide on scroll */}
      <motion.div 
        className="absolute top-4 right-2 z-10"
        animate={{ 
          opacity: hideDecorations ? 0 : 1,
          scale: hideDecorations ? 0.5 : 1,
          y: hideDecorations ? -20 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <ChristmasTree isSmall={isSmallScreen} />
      </motion.div>
      
      <motion.div 
        className="absolute top-6 left-1 z-10"
        animate={{ 
          opacity: hideDecorations ? 0 : 1,
          scale: hideDecorations ? 0.5 : 1,
          y: hideDecorations ? -20 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <SantaClaus isSmall={isSmallScreen} />
      </motion.div>

      {/* Hanging Ornaments */}
      <div className="absolute top-0 left-1/4">
        <motion.div 
          className="w-1 h-8 bg-christmas-gold/50"
          style={{ transformOrigin: 'top' }}
        />
        <motion.div 
          className="w-4 h-4 bg-christmas-red rounded-full -ml-1.5 shadow-lg"
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      
      <div className="absolute top-0 left-[45%]">
        <motion.div className="w-1 h-12 bg-christmas-gold/50" />
        <motion.div 
          className="w-5 h-5 bg-christmas-gold rounded-full -ml-2 shadow-lg"
          animate={{ rotate: [5, -5, 5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
      </div>

      {/* Header */}
      <motion.div 
        className="mb-6 mt-28 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.p 
          className="text-christmas-gold text-sm tracking-widest uppercase mb-2"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🎄 December 2025 🎄
        </motion.p>
        <h1 className="text-3xl font-bold text-white leading-tight">
          Merry Christmas,<br />
          <span className="text-christmas-red">Zeeshan</span> 🎅
        </h1>
      </motion.div>

      {/* Main Card */}
      <motion.div 
        onClick={handleReveal}
        className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden cursor-pointer"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          x: showExplosion ? [0, -10, 10, -10, 10, -5, 5, 0] : 0,
          y: showExplosion ? [0, -5, 5, -5, 5, 0] : 0
        }}
        transition={{ 
          duration: showExplosion ? 0.5 : 0.5, 
          delay: showExplosion ? 0 : 0.2 
        }}
        whileHover={!isRevealed ? { scale: 1.02 } : {}}
        whileTap={!isRevealed ? { scale: 0.98 } : {}}
      >
        {/* BOOM Explosion Effect */}
        <AnimatePresence>
          {showExplosion && (
            <>
              {/* Screen Flash */}
              <motion.div
                className="fixed inset-0 z-[200] bg-white pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.8, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Central Explosion */}
              <motion.div
                className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Explosion rings */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full border-4 border-christmas-gold"
                    initial={{ width: 0, height: 0, opacity: 1 }}
                    animate={{ 
                      width: [0, 300 + i * 100], 
                      height: [0, 300 + i * 100], 
                      opacity: [1, 0],
                      borderWidth: [8, 0]
                    }}
                    transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
                  />
                ))}
                
                {/* Fire burst */}
                <motion.div
                  className="absolute w-40 h-40 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, #ff6b35 0%, #f7c59f 30%, #ff8c42 60%, transparent 70%)'
                  }}
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: [0, 3, 4], opacity: [1, 0.8, 0] }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
                
                {/* Sparks/Particles */}
                {[...Array(20)].map((_, i) => {
                  const angle = (i / 20) * 360
                  const distance = 150 + Math.random() * 100
                  const x = Math.cos(angle * Math.PI / 180) * distance
                  const y = Math.sin(angle * Math.PI / 180) * distance
                  const colors = ['#ff6b35', '#f7c59f', '#ffd700', '#ff4444', '#ffaa00']
                  const color = colors[Math.floor(Math.random() * colors.length)]
                  
                  return (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 rounded-full"
                      style={{ backgroundColor: color }}
                      initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                      animate={{ 
                        x: x, 
                        y: y, 
                        scale: [1, 1.5, 0],
                        opacity: [1, 1, 0],
                        rotate: Math.random() * 720
                      }}
                      transition={{ 
                        duration: 0.8 + Math.random() * 0.4, 
                        ease: 'easeOut',
                        delay: Math.random() * 0.1
                      }}
                    />
                  )
                })}
                
                {/* Confetti pieces */}
                {[...Array(30)].map((_, i) => {
                  const angle = Math.random() * 360
                  const distance = 100 + Math.random() * 150
                  const x = Math.cos(angle * Math.PI / 180) * distance
                  const y = Math.sin(angle * Math.PI / 180) * distance - 50
                  const colors = ['#c41e3a', '#1d4d2b', '#d4af37', '#ff6b6b', '#4ecdc4', '#ffe66d']
                  const color = colors[Math.floor(Math.random() * colors.length)]
                  const size = 4 + Math.random() * 8
                  
                  return (
                    <motion.div
                      key={`confetti-${i}`}
                      className="absolute"
                      style={{ 
                        backgroundColor: color,
                        width: size,
                        height: size * 1.5,
                        borderRadius: '2px'
                      }}
                      initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                      animate={{ 
                        x: x, 
                        y: [y, y + 100], 
                        rotate: Math.random() * 720,
                        opacity: [1, 1, 0]
                      }}
                      transition={{ 
                        duration: 1.2 + Math.random() * 0.5, 
                        ease: 'easeOut',
                        delay: 0.2 + Math.random() * 0.2
                      }}
                    />
                  )
                })}
                
                {/* BOOM Text */}
                <motion.div
                  className="absolute text-6xl font-black text-transparent bg-clip-text"
                  style={{
                    background: 'linear-gradient(135deg, #ffd700 0%, #ff6b35 50%, #ff4444 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 40px rgba(255, 107, 53, 0.8)'
                  }}
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: [0, 1.5, 1.2], rotate: [-20, 10, 0], opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                  🎉 SURPRISE! 🎉
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Cover State */}
        <AnimatePresence>
          {!isRevealed && (
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-christmas-red/20 via-christmas-card to-christmas-green/20 rounded-2xl flex flex-col items-center justify-center border-2 border-christmas-gold/30"
              exit={{ opacity: 0, scale: 1.1, rotateY: 90 }}
              transition={{ duration: 0.5 }}
            >
              {/* Twinkling lights border effect */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-2 h-2 rounded-full ${i % 3 === 0 ? 'bg-christmas-red' : i % 3 === 1 ? 'bg-christmas-green' : 'bg-christmas-gold'}`}
                  style={{
                    top: i < 3 ? '8px' : i < 6 ? `${20 + (i-3) * 30}%` : i < 9 ? 'auto' : `${20 + (i-9) * 30}%`,
                    bottom: i >= 6 && i < 9 ? '8px' : 'auto',
                    left: i < 3 ? `${15 + i * 30}%` : i >= 6 && i < 9 ? `${15 + (i-6) * 30}%` : i < 6 ? '8px' : 'auto',
                    right: i >= 9 ? '8px' : 'auto',
                  }}
                  animate={{ 
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}

              <motion.div 
                className="w-28 h-28 rounded-full bg-gradient-to-br from-christmas-red to-christmas-redLight flex items-center justify-center mb-6 shadow-xl shadow-christmas-red/30"
                animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Gift size={50} className="text-white" strokeWidth={1.5} />
              </motion.div>
              
              <p className="text-white/80 text-base font-medium">🎁 Tap to unwrap 🎁</p>
              
              {/* Ribbon Effect */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-full bg-gradient-to-b from-christmas-gold/60 via-christmas-gold/30 to-christmas-gold/60" />
              <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-10 bg-gradient-to-r from-christmas-gold/60 via-christmas-gold/30 to-christmas-gold/60" />
              
              {/* Bow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <motion.div 
                  className="text-5xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🎀
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Revealed State */}
        <AnimatePresence>
          {isRevealed && (
            <motion.div 
              className="absolute inset-0"
              initial={{ opacity: 0, rotateY: -90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img 
                src="/images/WhatsApp Image 2025-12-25 at 12.21.20 PM (1).jpeg" 
                alt="Zeeshan"
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-christmas-dark via-christmas-dark/40 to-transparent rounded-2xl" />
              
              <motion.div 
                className="absolute bottom-0 left-0 right-0 p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🎅</span>
                  <p className="text-christmas-gold text-sm font-medium">From Your Secret Santa</p>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">Hey Zeeshan! 🎄</h3>
                <p className="text-white/70 text-sm">Wishing you a magical holiday season! ✨</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* CTA Button */}
      <AnimatePresence>
        {isRevealed && (
          <motion.button
            onClick={() => onNavigate('photos')}
            className="mt-8 w-full py-4 px-6 bg-gradient-to-r from-christmas-red to-christmas-redLight rounded-xl flex items-center justify-between shadow-lg shadow-christmas-red/30 border border-christmas-gold/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(196, 30, 58, 0.4)' }}
            whileTap={{ scale: 0.98 }}
          >
            <div>
              <p className="text-white font-semibold text-left">🎁 Explore Your Gift</p>
              <p className="text-white/70 text-sm text-left">Photos, movies & heartfelt messages</p>
            </div>
            <ChevronRight className="text-white" size={22} />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  )
}

export default HomePage

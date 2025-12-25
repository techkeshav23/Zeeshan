import { motion } from 'framer-motion'
import { useMemo, useEffect, useState } from 'react'

function Snowfall() {
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference or slow devices
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mediaQuery.matches)
    
    // Also reduce on mobile for better performance
    const isMobile = window.innerWidth < 768
    if (isMobile) {
      setIsReducedMotion(true)
    }
  }, [])

  const snowflakeCount = isReducedMotion ? 12 : 25

  const snowflakes = useMemo(() => {
    return Array.from({ length: snowflakeCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 12 + Math.random() * 8,
      size: 2 + Math.random() * 3,
      opacity: 0.15 + Math.random() * 0.35,
    }))
  }, [snowflakeCount])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute rounded-full bg-white/80"
          style={{
            left: `${flake.x}%`,
            width: flake.size,
            height: flake.size,
          }}
          initial={{ y: -20, opacity: 0 }}
          animate={{
            y: '100vh',
            opacity: [0, flake.opacity, flake.opacity, 0],
            x: [0, 20, -15, 10, 0],
          }}
          transition={{
            duration: flake.duration,
            delay: flake.delay,
            repeat: Infinity,
            ease: 'linear',
            x: {
              duration: flake.duration / 3,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        />
      ))}
    </div>
  )
}

export default Snowfall

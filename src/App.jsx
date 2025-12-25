import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import HomePage from './components/HomePage'
import PhotosPage from './components/PhotosPage'
import MoviesPage from './components/MoviesPage'
import MessagesPage from './components/MessagesPage'
import AboutPage from './components/AboutPage'
import BottomNav from './components/BottomNav'
import Snowfall from './components/Snowfall'
import { soundManager } from './utils/sounds'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

function App() {
  const [activePage, setActivePage] = useState('home')

  useEffect(() => {
    let hasStarted = false
    
    const enableAudio = async () => {
      if (hasStarted || soundManager.isMusicOn()) return
      hasStarted = true
      
      try {
        await soundManager.playPageMusic('home')
      } catch (e) {
        console.log('Audio autostart failed:', e)
      }
    }

    // Listen for any user interaction to start audio
    const events = ['click', 'touchstart', 'keydown', 'scroll', 'mousemove', 'mousedown', 'pointerdown']
    
    const handleInteraction = () => {
      enableAudio()
      events.forEach(event => window.removeEventListener(event, handleInteraction))
    }

    events.forEach(event => window.addEventListener(event, handleInteraction, { passive: true }))

    // Restart music from beginning when tab becomes visible again
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Always restart from beginning when coming back to tab
        soundManager.playPageMusic(activePage)
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      events.forEach(event => window.removeEventListener(event, handleInteraction))
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [activePage])

  const handleNavigate = (page) => {
    setActivePage(page)
    soundManager.changePage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderPage = () => {
    const pages = {
      home: <HomePage onNavigate={handleNavigate} />,
      photos: <PhotosPage />,
      movies: <MoviesPage />,
      messages: <MessagesPage />,
      about: <AboutPage />
    }
    return pages[activePage]
  }

  return (
    <div className="h-[100dvh] bg-christmas-dark text-white flex justify-center relative overflow-hidden">
      <Snowfall />
      
      {/* Ambient Christmas Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-christmas-red/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-0 left-1/4 w-64 h-64 bg-christmas-green/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Mobile Container */}
      <div className="w-full max-w-md h-full bg-christmas-dark/80 backdrop-blur-sm relative flex flex-col border-x border-christmas-green/20 overflow-hidden">
        
        {/* Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide pb-safe">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <BottomNav activePage={activePage} onNavigate={handleNavigate} />
      </div>
    </div>
  )
}

export default App

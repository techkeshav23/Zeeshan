import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

function PhotoLightbox({ photos, initialIndex, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  
  const goNext = (e) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev + 1) % photos.length)
  }
  
  const goPrev = (e) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Close Button */}
        <motion.button
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"
          onClick={onClose}
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={20} className="text-white" />
        </motion.button>

        {/* Previous Button */}
        <motion.button
          className="absolute left-2 z-10 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"
          onClick={goPrev}
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft size={24} className="text-white" />
        </motion.button>

        {/* Next Button */}
        <motion.button
          className="absolute right-2 z-10 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"
          onClick={goNext}
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight size={24} className="text-white" />
        </motion.button>

        {/* Image */}
        <motion.div
          key={currentIndex}
          className="max-w-[90vw] max-h-[80vh] relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={photos[currentIndex].src}
            alt={photos[currentIndex].caption}
            className="max-w-full max-h-[80vh] object-contain rounded-lg"
          />
          <motion.p 
            className="text-white text-center mt-4 text-lg font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {photos[currentIndex].caption}
          </motion.p>
        </motion.div>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {photos.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full cursor-pointer ${
                index === currentIndex ? 'bg-christmas-gold' : 'bg-white/30'
              }`}
              whileHover={{ scale: 1.3 }}
              onClick={(e) => {
                e.stopPropagation()
                setCurrentIndex(index)
              }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default PhotoLightbox

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ZoomIn } from 'lucide-react'
import PhotoLightbox from './PhotoLightbox'
import { soundManager } from '../utils/sounds'

const photos = [
  { id: 1, src: '/images/WhatsApp Image 2025-12-25 at 12.21.18 PM.jpeg', caption: 'Special moments ❤️' },
  { id: 2, src: '/images/WhatsApp Image 2025-12-25 at 12.21.19 PM.jpeg', caption: 'Good times together' },
  { id: 3, src: '/images/WhatsApp Image 2025-12-25 at 12.21.19 PM (1).jpeg', caption: 'Memories to cherish' },
  { id: 4, src: '/images/WhatsApp Image 2025-12-25 at 12.21.19 PM (2).jpeg', caption: 'Unforgettable moments' },
  { id: 5, src: '/images/WhatsApp Image 2025-12-25 at 12.21.20 PM.jpeg', caption: 'Always smiling' },
  { id: 6, src: '/images/WhatsApp Image 2025-12-25 at 12.21.20 PM (1).jpeg', caption: 'Making memories' },
  { id: 7, src: '/images/WhatsApp Image 2025-12-25 at 12.21.21 PM.jpeg', caption: 'Best times' },
  { id: 8, src: '/images/WhatsApp Image 2025-12-25 at 12.21.21 PM (1).jpeg', caption: 'Forever grateful' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: 'spring', stiffness: 100 }
  }
}

// Lazy loading image component
function LazyImage({ src, alt, className }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)

  return (
    <div className={`relative ${className}`}>
      {/* Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-christmas-card animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-christmas-gold/30 border-t-christmas-gold rounded-full animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  )
}

function PhotosPage({ onNavigate }) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = (index) => {
    soundManager.playClick()
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <div className="min-h-full px-6 pt-12 pb-24">
      {/* Header */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={14} className="text-christmas-gold" />
          <p className="text-christmas-gold/80 text-sm tracking-widest uppercase">Gallery</p>
        </div>
        <h2 className="text-3xl font-bold text-white">
          Precious <span className="text-christmas-red">Memories</span>
        </h2>
        <p className="text-white/50 text-sm mt-2">Tap any photo to view full screen</p>
      </motion.div>

      {/* Grid */}
      <motion.div 
        className="grid grid-cols-2 gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => openLightbox(index)}
            className={`relative rounded-xl overflow-hidden cursor-pointer group ${
              index === 0 || index === 3 ? 'col-span-2 aspect-video' : 'aspect-square'
            }`}
          >
            <LazyImage
              src={photo.src}
              alt={photo.caption}
              className="w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-christmas-dark via-transparent to-transparent" />
            
            {/* Zoom indicator on hover */}
            <motion.div 
              className="absolute top-3 right-3 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              whileHover={{ scale: 1.1 }}
            >
              <ZoomIn size={16} className="text-white" />
            </motion.div>
            
            <motion.p 
              className="absolute bottom-3 left-3 text-white text-sm font-medium flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="w-1.5 h-1.5 bg-christmas-red rounded-full" />
              {photo.caption}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox */}
      {lightboxOpen && (
        <PhotoLightbox
          photos={photos}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  )
}

export default PhotosPage

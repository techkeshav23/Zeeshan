import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Film, ExternalLink } from 'lucide-react'
import { soundManager } from '../utils/sounds'

const movies = [
  {
    id: 1,
    title: 'Fight Club',
    year: '1999',
    poster: 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
    rating: '8.8',
    note: 'Mind-bending storytelling at its finest',
    imdbId: 'tt0137523',
    letterboxdSlug: 'fight-club'
  },
  {
    id: 2,
    title: 'Parasite',
    year: '2019',
    poster: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
    rating: '8.5',
    note: 'A masterpiece of modern cinema',
    imdbId: 'tt6751668',
    letterboxdSlug: 'parasite-2019'
  },
  {
    id: 3,
    title: 'The Shawshank Redemption',
    year: '1994',
    poster: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
    rating: '9.3',
    note: 'The timeless story of hope',
    imdbId: 'tt0111161',
    letterboxdSlug: 'the-shawshank-redemption'
  },
  {
    id: 4,
    title: 'Goodfellas',
    year: '1990',
    poster: 'https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg',
    rating: '8.7',
    note: 'Scorsese at his very best',
    imdbId: 'tt0099685',
    letterboxdSlug: 'goodfellas'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { type: 'spring', stiffness: 100 }
  }
}

// Lazy loading poster component
function LazyPoster({ src, alt }) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className="w-full h-full relative">
      {!isLoaded && (
        <div className="absolute inset-0 bg-christmas-card animate-pulse flex items-center justify-center">
          <Film size={20} className="text-white/20" />
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

function MoviesPage({ onNavigate }) {
  const openLink = (url) => {
    soundManager.playClick()
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="min-h-screen px-6 py-12 pb-24">
      {/* Header */}
      <motion.div 
        className="mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Film size={14} className="text-christmas-gold" />
          <p className="text-christmas-gold/80 text-sm tracking-widest uppercase">Curated Collection</p>
        </div>
        <h2 className="text-3xl font-bold text-white">
          Film <span className="text-christmas-red">Picks</span>
        </h2>
        <p className="text-white/50 text-sm mt-2">Tap to open on IMDb or Letterboxd</p>
      </motion.div>

      {/* Movies List */}
      <motion.div 
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {movies.map((movie) => (
          <motion.div
            key={movie.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            className="bg-christmas-card rounded-xl overflow-hidden border border-christmas-green/20"
          >
            <div className="flex">
              {/* Poster */}
              <div className="w-24 h-36 flex-shrink-0 relative overflow-hidden">
                <LazyPoster src={movie.poster} alt={movie.title} />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-christmas-card/50" />
              </div>

              {/* Content */}
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base font-semibold text-white">{movie.title}</h3>
                    <motion.div 
                      className="flex items-center gap-1 bg-christmas-gold/20 px-2 py-0.5 rounded"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Star size={12} className="text-christmas-gold fill-christmas-gold" />
                      <span className="text-christmas-gold text-sm font-medium">{movie.rating}</span>
                    </motion.div>
                  </div>
                  <p className="text-white/40 text-xs mb-2">{movie.year}</p>
                  <p className="text-white/60 text-sm leading-relaxed">{movie.note}</p>
                </div>
                
                {/* Links */}
                <div className="flex gap-2 mt-3">
                  <motion.button
                    onClick={() => openLink(`https://www.imdb.com/title/${movie.imdbId}`)}
                    className="flex items-center gap-1 px-2 py-1 bg-yellow-500/20 rounded text-yellow-500 text-xs font-medium"
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(234, 179, 8, 0.3)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    IMDb <ExternalLink size={10} />
                  </motion.button>
                  <motion.button
                    onClick={() => openLink(`https://letterboxd.com/film/${movie.letterboxdSlug}`)}
                    className="flex items-center gap-1 px-2 py-1 bg-orange-500/20 rounded text-orange-400 text-xs font-medium"
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(249, 115, 22, 0.3)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Letterboxd <ExternalLink size={10} />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default MoviesPage

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Film, ExternalLink } from 'lucide-react'
import { soundManager } from '../utils/sounds'

const movies = [
  {
    id: 1,
    title: 'Dhurandhar',
    year: '2024',
    poster: 'https://a.ltrbxd.com/resized/film-poster/1/1/7/4/5/8/2/1174582-dhurandhar-0-140-0-210-crop.jpg?v=179b5169d5',
    rating: '4',
    note: 'Intense action thriller',
    imdbId: 'tt27914893',
    letterboxdSlug: 'dhurandhar'
  },
  {
    id: 2,
    title: 'Regretting You',
    year: '2025',
    poster: 'https://a.ltrbxd.com/resized/film-poster/1/2/0/8/0/7/6/1208076-regretting-you-0-140-0-210-crop.jpg?v=31e7573220',
    rating: '3',
    note: 'Emotional drama',
    imdbId: 'tt21059498',
    letterboxdSlug: 'regretting-you'
  },
  {
    id: 3,
    title: 'Sisu',
    year: '2022',
    poster: 'https://a.ltrbxd.com/resized/film-poster/1/1/0/7/2/1/8/1107218-sisu-road-to-revenge-0-460-0-690-crop.jpg?v=c2827208fd',
    rating: '5',
    note: 'Road to Revenge - Epic action',
    imdbId: 'tt14846026',
    letterboxdSlug: 'sisu'
  },
  {
    id: 4,
    title: 'Chainsaw Man',
    year: '2022',
    poster: 'https://a.ltrbxd.com/resized/film-poster/1/1/0/2/6/7/3/1102673-chainsaw-man-the-movie-reze-arc-0-140-0-210-crop.jpg?v=d9227a11bd',
    rating: '5',
    note: 'Anime masterpiece',
    imdbId: 'tt13223398',
    letterboxdSlug: 'chainsaw-man'
  },
  {
    id: 5,
    title: 'One Battle After Another',
    year: '2024',
    poster: 'https://a.ltrbxd.com/resized/film-poster/9/5/1/2/7/7/951277-one-battle-after-another-0-140-0-210-crop.jpg?v=d27c4cc662',
    rating: '4',
    note: 'Intense survival action',
    imdbId: 'tt26446278',
    letterboxdSlug: 'one-battle-after-another'
  },
  {
    id: 6,
    title: 'The Conjuring: Last Rites',
    year: '2025',
    poster: 'https://a.ltrbxd.com/resized/film-poster/9/3/6/0/6/5/936065-the-conjuring-last-rites-0-140-0-210-crop.jpg?v=597eedcd06',
    rating: '5',
    note: 'Terrifying horror experience',
    imdbId: 'tt15513040',
    letterboxdSlug: 'the-conjuring-last-rites'
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

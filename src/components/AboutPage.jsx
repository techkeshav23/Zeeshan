import { motion } from 'framer-motion'
import { ExternalLink, Star } from 'lucide-react'

// Favorite films data from Letterboxd profile
const favoriteFilms = [
  { id: 1, title: 'Coco', poster: 'https://image.tmdb.org/t/p/w300/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg' },
  { id: 2, title: 'The Pianist', poster: 'https://image.tmdb.org/t/p/w300/2hFvxCCWrTmCYwfy7yum0GKRi3Y.jpg' },
  { id: 3, title: 'Django Unchained', poster: 'https://image.tmdb.org/t/p/w300/7oWY8VDWW7thTzWh3OKYRkWUlD5.jpg' },
  { id: 4, title: 'Drishyam', poster: 'https://a.ltrbxd.com/resized/film-poster/1/0/7/4/3/0/7/1074307-182-beyond-youthful-days-0-300-0-450-crop.jpg?v=f6c0936797' },
]

// Recent activity films
const recentActivity = [
  { id: 1, title: 'One Battle After Another', poster: 'https://a.ltrbxd.com/resized/film-poster/9/5/1/2/7/7/951277-one-battle-after-another-0-300-0-450-crop.jpg?v=d27c4cc662', rating: 4 },
  { id: 2, title: 'Madaari', poster: 'https://a.ltrbxd.com/resized/film-poster/3/3/1/7/0/6/331706-madaari-0-300-0-450-crop.jpg?v=b430829bae', rating: 5 },
  { id: 3, title: 'M', poster: 'https://a.ltrbxd.com/resized/film-poster/1/1/9/2/2/9/0/1192290-demon-slayer-kimetsu-no-yaiba-infinity-castle-0-300-0-450-crop.jpg?v=186ff42e55', rating: 4 },
  { id: 4, title: 'Sinners', poster: 'https://a.ltrbxd.com/resized/film-poster/1/1/1/7/9/2/6/1117926-jurassic-world-rebirth-0-300-0-450-crop.jpg?v=1dbc19cf2f', rating: 4 },
]

// Recent reviews
const recentReviews = [
  {
    id: 1,
    title: 'One Battle After Another',
    year: '2025',
    rating: 4,
    review: 'Yo soy un mal hombre',
    date: '26 Nov 2025',
    poster: 'https://a.ltrbxd.com/resized/film-poster/9/5/1/2/7/7/951277-one-battle-after-another-0-300-0-450-crop.jpg?v=d27c4cc662'
  },
  {
    id: 2,
    title: 'Madaari',
    year: '2016',
    rating: 5,
    review: "After watching this movie now I understand why this movie is underrated. Why it's not on any famous OTT platforms and they never often telecasted this on television...",
    date: '17 Oct 2025',
    poster: 'https://a.ltrbxd.com/resized/film-poster/3/3/1/7/0/6/331706-madaari-0-300-0-450-crop.jpg?v=b430829bae'
  },
]

// Stats
const stats = {
  films: 910,
  thisYear: 61,
  lists: 2,
  following: 28,
  followers: 24
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 100 }
  }
}

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={12}
          className={i < rating ? 'text-[#00e054] fill-[#00e054]' : 'text-[#456]'}
        />
      ))}
    </div>
  )
}

function AboutPage() {
  return (
    <div className="min-h-screen bg-[#14181c] pb-24">
      {/* Profile Header */}
      <motion.div 
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Banner */}
        <div className="h-24 bg-gradient-to-r from-[#00e054]/30 via-[#40bcf4]/30 to-[#ff8000]/30" />
        
        {/* Profile Info */}
        <div className="px-4 -mt-10">
          <div className="flex items-end gap-4">
            {/* Avatar */}
            <motion.div 
              className="w-20 h-20 rounded-full bg-gradient-to-br from-[#2c3440] to-[#1a1e24] border-4 border-[#14181c] flex items-center justify-center overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src="https://a.ltrbxd.com/resized/avatar/upload/1/5/7/3/9/2/6/9/shard/avtr-0-1000-0-1000-crop.jpg?v=0fd71c4071" 
                alt="Mohammad Zeeshan"
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            {/* Name & Handle */}
            <div className="mb-2">
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
                Mohammad Zeeshan
                <span className="text-[#00e054]">✓</span>
              </h1>
              <a 
                href="https://letterboxd.com/zeeshan777/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#9ab] text-sm hover:text-[#00e054] transition-colors flex items-center gap-1"
              >
                @zeeshan777 <ExternalLink size={12} />
              </a>
            </div>
          </div>
          
          {/* Stats Row */}
          <motion.div 
            className="flex justify-around mt-6 py-4 border-y border-[#456]/30"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-center">
              <p className="text-white font-bold text-lg">{stats.films}</p>
              <p className="text-[#9ab] text-xs">FILMS</p>
            </div>
            <div className="text-center">
              <p className="text-white font-bold text-lg">{stats.thisYear}</p>
              <p className="text-[#9ab] text-xs">THIS YEAR</p>
            </div>
            <div className="text-center">
              <p className="text-white font-bold text-lg">{stats.lists}</p>
              <p className="text-[#9ab] text-xs">LISTS</p>
            </div>
            <div className="text-center">
              <p className="text-white font-bold text-lg">{stats.followers}</p>
              <p className="text-[#9ab] text-xs">FOLLOWERS</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Favorite Films */}
      <motion.div 
        className="px-4 mt-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[#9ab] text-xs font-semibold tracking-wider uppercase">Favorite Films</h2>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          {favoriteFilms.map((film) => (
            <motion.div
              key={film.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative aspect-[2/3] rounded-md overflow-hidden border border-[#456]/30"
            >
              <img 
                src={film.poster} 
                alt={film.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-1">
                <p className="text-white text-[8px] font-medium truncate">{film.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div 
        className="px-4 mt-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[#9ab] text-xs font-semibold tracking-wider uppercase">Recent Activity</h2>
          <span className="text-[#456] text-xs">ALL</span>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          {recentActivity.map((film) => (
            <motion.div
              key={film.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <div className="aspect-[2/3] rounded-md overflow-hidden border border-[#456]/30">
                <img 
                  src={film.poster} 
                  alt={film.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="mt-1 flex justify-center">
                <StarRating rating={film.rating} />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Reviews */}
      <motion.div 
        className="px-4 mt-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[#9ab] text-xs font-semibold tracking-wider uppercase">Recent Reviews</h2>
          <span className="text-[#456] text-xs">MORE</span>
        </div>
        
        <div className="space-y-4">
          {recentReviews.map((review) => (
            <motion.div
              key={review.id}
              variants={itemVariants}
              className="bg-[#1c2228] rounded-lg p-3 border border-[#456]/20"
            >
              <div className="flex gap-3">
                <img 
                  src={review.poster} 
                  alt={review.title}
                  className="w-12 h-18 rounded object-cover flex-shrink-0"
                  loading="lazy"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-white font-semibold text-sm">{review.title}</h3>
                      <p className="text-[#9ab] text-xs">{review.year}</p>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>
                  <p className="text-[#9ab] text-xs mt-2 line-clamp-2">{review.review}</p>
                  <p className="text-[#456] text-[10px] mt-2">Watched {review.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* View Full Profile Button */}
      <motion.div 
        className="px-4 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <motion.a
          href="https://letterboxd.com/zeeshan777/"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-3 bg-gradient-to-r from-[#00e054] to-[#40bcf4] rounded-lg text-center text-black font-bold text-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="flex items-center justify-center gap-2">
            View Full Profile on Letterboxd
            <ExternalLink size={14} />
          </span>
        </motion.a>
      </motion.div>

      {/* Letterboxd Footer */}
      <motion.div 
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex justify-center gap-1 mb-2">
          <div className="w-4 h-4 rounded-full bg-[#00e054]" />
          <div className="w-4 h-4 rounded-full bg-[#40bcf4] -ml-1.5" />
          <div className="w-4 h-4 rounded-full bg-[#ff8000] -ml-1.5" />
        </div>
      </motion.div>

      {/* Christmas Credits */}
      <motion.div 
        className="mt-8 text-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="bg-christmas-card/50 rounded-xl p-4 border border-christmas-green/20">
          <motion.div 
            className="flex justify-center gap-3 mb-3"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-lg">🎄</span>
            <span className="text-lg">🎅</span>
            <span className="text-lg">🎁</span>
          </motion.div>
          <p className="text-white/60 text-sm">Made with ❤️ by Your Secret Santa</p>
          <p className="text-white/30 text-xs mt-1">Merry Christmas 2025</p>
        </div>
      </motion.div>
    </div>
  )
}

export default AboutPage

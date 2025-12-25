import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

const messages = [
  {
    id: 1,
    title: 'To a Fellow Cinephile',
    message: 'Your passion for films is truly inspiring. May you discover countless more masterpieces in 2025. Keep watching, keep feeling, keep living through stories.'
  },
  {
    id: 2,
    title: 'Merry Christmas',
    message: 'Wishing you a year full of amazing stories, both on screen and in real life. May your watchlist shrink a little and your heart grow with every movie.'
  },
  {
    id: 3,
    title: 'From Your Secret Santa',
    message: 'Hope this little web app brings a smile to your face. Made with care, a bit of code, and a lot of appreciation for you.'
  },
  {
    id: 4,
    title: 'A New Year Wish',
    message: '2025 is going to be your year. New adventures, new films to discover, and new memories to make. Cheers to an amazing journey ahead.'
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
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 100 }
  }
}

function MessagesPage() {
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
          <Heart size={14} className="text-christmas-red" />
          <p className="text-christmas-gold/80 text-sm tracking-widest uppercase">Personal Notes</p>
        </div>
        <h2 className="text-3xl font-bold text-white">
          Heartfelt <span className="text-christmas-red">Messages</span>
        </h2>
      </motion.div>

      {/* Messages */}
      <motion.div 
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-christmas-card rounded-xl p-6 border border-christmas-green/20 relative overflow-hidden"
          >
            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-christmas-red/10 to-transparent" />
            
            <div className="flex items-center gap-3 mb-4">
              <motion.div 
                className="w-1.5 h-8 bg-gradient-to-b from-christmas-red to-christmas-gold rounded-full"
                animate={{ scaleY: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <h3 className="text-lg font-semibold text-white">{msg.title}</h3>
            </div>
            <p className="text-white/60 text-sm leading-relaxed pl-5">{msg.message}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default MessagesPage

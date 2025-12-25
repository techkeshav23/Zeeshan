// Sound utility for Christmas effects
// Using Web Audio API for lightweight sound effects

// Page-specific songs - add your downloaded songs to public/music folder
const pageSongs = {
  home: '/music/home.mp3',
  photos: '/music/photos.mp3',
  movies: '/music/movies.mp3',
  messages: '/music/messages.mp3',
  about: '/music/about.mp3'
}

// Preloaded audio cache
const audioCache = {}

// Preload all songs on page load for faster playback
function preloadAllSongs() {
  Object.entries(pageSongs).forEach(([page, src]) => {
    const audio = new Audio()
    audio.preload = 'auto'
    audio.src = src
    audio.load()
    audioCache[page] = audio
  })
}

// Start preloading immediately
if (typeof window !== 'undefined') {
  preloadAllSongs()
}

class SoundManager {
  constructor() {
    this.audioContext = null
    this.isMuted = false
    this.currentAudio = null
    this.currentPage = 'home'
    this.isMusicPlaying = false
  }

  init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
    }
  }

  // Play a simple beep/click sound
  playClick() {
    if (this.isMuted) return
    this.init()
    
    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)
    
    oscillator.frequency.value = 800
    oscillator.type = 'sine'
    
    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1)
    
    oscillator.start(this.audioContext.currentTime)
    oscillator.stop(this.audioContext.currentTime + 0.1)
  }

  // Play unwrap sound (ascending tones) with explosion effect
  playUnwrap() {
    if (this.isMuted) return
    this.init()
    
    // Explosion boom sound
    const createNoise = () => {
      const bufferSize = this.audioContext.sampleRate * 0.5
      const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate)
      const data = buffer.getChannelData(0)
      
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.1))
      }
      
      const noise = this.audioContext.createBufferSource()
      noise.buffer = buffer
      
      const noiseGain = this.audioContext.createGain()
      const noiseFilter = this.audioContext.createBiquadFilter()
      
      noiseFilter.type = 'lowpass'
      noiseFilter.frequency.value = 500
      
      noise.connect(noiseFilter)
      noiseFilter.connect(noiseGain)
      noiseGain.connect(this.audioContext.destination)
      
      noiseGain.gain.setValueAtTime(0.4, this.audioContext.currentTime)
      noiseGain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5)
      
      noise.start()
    }
    
    // Low frequency boom
    const boom = this.audioContext.createOscillator()
    const boomGain = this.audioContext.createGain()
    
    boom.connect(boomGain)
    boomGain.connect(this.audioContext.destination)
    
    boom.frequency.setValueAtTime(150, this.audioContext.currentTime)
    boom.frequency.exponentialRampToValueAtTime(30, this.audioContext.currentTime + 0.3)
    boom.type = 'sine'
    
    boomGain.gain.setValueAtTime(0.5, this.audioContext.currentTime)
    boomGain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.4)
    
    boom.start()
    boom.stop(this.audioContext.currentTime + 0.4)
    
    createNoise()
    
    // Celebration tones after explosion
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51] // C5, E5, G5, C6, E6
    
    notes.forEach((freq, i) => {
      setTimeout(() => {
        const oscillator = this.audioContext.createOscillator()
        const gainNode = this.audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(this.audioContext.destination)
        
        oscillator.frequency.value = freq
        oscillator.type = 'sine'
        
        gainNode.gain.setValueAtTime(0.15, this.audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3)
        
        oscillator.start(this.audioContext.currentTime)
        oscillator.stop(this.audioContext.currentTime + 0.3)
      }, i * 100)
    })
  }

  // Play jingle bells pattern
  playJingle() {
    if (this.isMuted) return
    this.init()
    
    const pattern = [
      { freq: 659.25, duration: 0.15 }, // E
      { freq: 659.25, duration: 0.15 }, // E
      { freq: 659.25, duration: 0.3 },  // E (longer)
      { freq: 659.25, duration: 0.15 }, // E
      { freq: 659.25, duration: 0.15 }, // E
      { freq: 659.25, duration: 0.3 },  // E (longer)
      { freq: 659.25, duration: 0.15 }, // E
      { freq: 783.99, duration: 0.15 }, // G
      { freq: 523.25, duration: 0.15 }, // C
      { freq: 587.33, duration: 0.15 }, // D
      { freq: 659.25, duration: 0.5 },  // E (long)
    ]
    
    let time = 0
    pattern.forEach(({ freq, duration }) => {
      setTimeout(() => {
        const oscillator = this.audioContext.createOscillator()
        const gainNode = this.audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(this.audioContext.destination)
        
        oscillator.frequency.value = freq
        oscillator.type = 'triangle'
        
        gainNode.gain.setValueAtTime(0.12, this.audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration)
        
        oscillator.start(this.audioContext.currentTime)
        oscillator.stop(this.audioContext.currentTime + duration)
      }, time * 1000)
      time += duration
    })
  }

  // Christmas background music - plays page-specific songs
  async toggleMusic() {
    if (this.isMusicPlaying) {
      this.stopMusic()
      return false
    } else {
      await this.playPageMusic(this.currentPage)
      return true
    }
  }

  async playPageMusic(page) {
    if (this.isMuted) return false
    
    // Stop current audio if playing
    if (this.currentAudio) {
      this.currentAudio.pause()
      this.currentAudio.currentTime = 0
      this.currentAudio.removeEventListener('ended', this.handleLoop)
    }
    
    this.currentPage = page
    
    // Use preloaded audio from cache if available, otherwise create new
    if (audioCache[page] && audioCache[page].readyState >= 2) {
      this.currentAudio = audioCache[page]
      this.currentAudio.currentTime = 0
    } else {
      const songPath = pageSongs[page] || pageSongs.home
      this.currentAudio = new Audio(songPath)
      this.currentAudio.preload = 'auto'
    }
    
    this.currentAudio.loop = true
    this.currentAudio.volume = 0.5
    
    // Explicit loop handler as fallback
    this.handleLoop = () => {
      if (this.isMusicPlaying && this.currentAudio) {
        this.currentAudio.currentTime = 0
        this.currentAudio.play().catch(() => {})
      }
    }
    this.currentAudio.addEventListener('ended', this.handleLoop)
    
    try {
      await this.currentAudio.play()
      this.isMusicPlaying = true
      return true
    } catch (error) {
      console.log('Audio playback failed:', error)
      this.isMusicPlaying = false
      return false
    }
  }

  async changePage(page) {
    this.currentPage = page
    if (this.isMusicPlaying) {
      await this.playPageMusic(page)
    }
  }

  stopMusic() {
    this.isMusicPlaying = false
    if (this.currentAudio) {
      this.currentAudio.pause()
      this.currentAudio.currentTime = 0
      this.currentAudio.removeEventListener('ended', this.handleLoop)
    }
  }

  isMusicOn() {
    return this.isMusicPlaying || false
  }

  toggleMute() {
    this.isMuted = !this.isMuted
    if (this.isMuted) this.stopMusic()
    return this.isMuted
  }

  getMuteState() {
    return this.isMuted
  }
}

export const soundManager = new SoundManager()

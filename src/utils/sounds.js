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

  // Play unwrap sound (ascending tones)
  playUnwrap() {
    if (this.isMuted) return
    this.init()
    
    const notes = [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6
    
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
    if (this.isMuted) return
    
    // Stop current audio if playing
    if (this.currentAudio) {
      this.currentAudio.pause()
      this.currentAudio.currentTime = 0
    }
    
    this.currentPage = page
    const songPath = pageSongs[page] || pageSongs.home
    
    this.currentAudio = new Audio(songPath)
    this.currentAudio.loop = true
    this.currentAudio.volume = 0.5
    
    try {
      await this.currentAudio.play()
      this.isMusicPlaying = true
    } catch (error) {
      console.log('Audio playback failed:', error)
      this.isMusicPlaying = false
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

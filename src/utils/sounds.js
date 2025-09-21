const SOUNDS = {
  background: '/src/assets/sounds/background-sound.mp3',
  flipcard: '/src/assets/sounds/flipcard.mp3',
  victory: '/src/assets/sounds/victory.mp3',
  fail: '/src/assets/sounds/fail.mp3'
};

const initSounds = () => {
  if (!window.sounds) {
    window.sounds = {};
    Object.entries(SOUNDS).forEach(([key, url]) => {
      window.sounds[key] = new Audio(url);
      if (key === 'background') {
        window.sounds[key].loop = true;
        window.sounds[key].volume = 0.15;
      } else {
        window.sounds[key].volume = 0.35;
      }
    });
  }
};

export const playSound = (soundName) => {
  if (!window.sounds) {
    initSounds();
  }
  
  const sound = window.sounds[soundName];
  if (sound) {
    if (soundName !== 'background') {
      sound.currentTime = 0;
    }
    
    const playPromise = sound.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  }
};

// Initialize sounds on module load
initSounds();

// Export sound control functions
export const setVolume = (soundName, volume) => {
  if (window.sounds?.[soundName]) {
    window.sounds[soundName].volume = volume;
  }
};

export const stopSound = (soundName) => {
  if (window.sounds?.[soundName]) {
    window.sounds[soundName].pause();
    window.sounds[soundName].currentTime = 0;
  }
};

export const pauseSound = (soundName) => {
  if (window.sounds?.[soundName]) {
    window.sounds[soundName].pause();
  }
};

export const muteAll = (muted) => {
  if (window.sounds) {
    Object.values(window.sounds).forEach(sound => {
      sound.muted = muted;
    });
  }
};

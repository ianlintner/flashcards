export class SoundManager {
  private sounds: Map<string, HTMLAudioElement>;
  private enabled: boolean;
  private volume: number;

  constructor() {
    this.sounds = new Map();
    this.enabled = true;
    this.volume = 0.7;
  }

  load(name: string, url: string): void {
    const audio = new Audio(url);
    audio.preload = "auto";
    audio.volume = this.volume;
    this.sounds.set(name, audio);
  }

  play(name: string): void {
    if (!this.enabled) return;

    const audio = this.sounds.get(name);
    if (!audio) return;

    // Clone and play to allow overlapping sounds
    const clone = audio.cloneNode(true) as HTMLAudioElement;
    clone.volume = this.volume;
    clone.play().catch((err) => {
      console.warn(`Failed to play sound ${name}:`, err);
    });
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume / 100));
    for (const audio of this.sounds.values()) {
      audio.volume = this.volume;
    }
  }

  preloadAll(): void {
    // Attempt to load all sounds
    for (const audio of this.sounds.values()) {
      audio.load();
    }
  }
}

// Singleton instance
export const soundManager = new SoundManager();

// Sound URLs (these would need to be actual audio files in production)
// For now, using data URIs or you can replace with actual file paths
const SOUND_URLS = {
  flip: "", // Add sound file path
  correct: "",
  easy: "",
  incorrect: "",
  "streak-5": "",
  "streak-10": "",
  "streak-20": "",
  "streak-50": "",
  complete: "",
};

export function initializeSounds(): void {
  // In production, load actual sound files
  // For MVP, sounds are optional (silently fail if not found)
  for (const [name, url] of Object.entries(SOUND_URLS)) {
    if (url) {
      soundManager.load(name, url);
    }
  }
}

export function playFlipSound(): void {
  soundManager.play("flip");
}

export function playCorrectSound(): void {
  soundManager.play("correct");
}

export function playEasySound(): void {
  soundManager.play("easy");
}

export function playIncorrectSound(): void {
  soundManager.play("incorrect");
}

export function playStreakSound(streak: number): void {
  if (streak === 50) {
    soundManager.play("streak-50");
  } else if (streak === 20) {
    soundManager.play("streak-20");
  } else if (streak === 10) {
    soundManager.play("streak-10");
  } else if (streak === 5) {
    soundManager.play("streak-5");
  }
}

export function playCompleteSound(): void {
  soundManager.play("complete");
}

class AudioManager {
  private bgm = new Audio("/audio/bgm.mp3");
  private success = new Audio("/audio/success.mp3");
  private wrong = new Audio("/audio/wrong.mp3");
  private isMuted = false;

  constructor() {
    this.bgm.loop = true;
    this.bgm.volume = 0.4;
  }

  playBGM() {
    if (!this.isMuted) this.bgm.play().catch(() => {});
  }

  stopBGM() {
    this.bgm.pause();
    this.bgm.currentTime = 0;
  }

  playSuccess() {
    if (!this.isMuted) {
        this.success.currentTime = 0;
        this.success.play().catch(() => {});
    }
  }

  playWrong() {
    if (!this.isMuted) {
        this.wrong.currentTime = 0;
        this.wrong.play().catch(() => {});
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.bgm.muted = this.isMuted;
    this.success.muted = this.isMuted;
    this.wrong.muted = this.isMuted;
  }
  
  getMuted() {
    return this.isMuted;
  }
}

export const audioManager = new AudioManager();

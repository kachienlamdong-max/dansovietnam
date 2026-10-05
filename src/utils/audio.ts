/**
 * Audio Synthesizer utilizing Web Audio API
 * Provides high-impact Congratulations/Clapping and Explosion/Boom sounds
 * without needing external audio files.
 */

let audioCtx: AudioContext | null = null;
let isAudioMuted = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function isMuted(): boolean {
  return isAudioMuted;
}

export function setMuted(muted: boolean) {
  isAudioMuted = muted;
}

export function toggleMute(): boolean {
  isAudioMuted = !isAudioMuted;
  return isAudioMuted;
}

/**
 * Generates white noise audio buffer
 */
function createNoiseBuffer(ctx: AudioContext, durationSeconds: number): AudioBuffer {
  const bufferSize = ctx.sampleRate * durationSeconds;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

/**
 * Play a single hand clap sound effect
 */
function playSingleClap(ctx: AudioContext, time: number, gainValue = 0.35) {
  const noiseBuffer = createNoiseBuffer(ctx, 0.15);
  const noiseSource = ctx.createBufferSource();
  noiseSource.buffer = noiseBuffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(1100, time);
  filter.Q.setValueAtTime(2.5, time);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(gainValue, time + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);

  noiseSource.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noiseSource.start(time);
  noiseSource.stop(time + 0.13);
}

/**
 * Play Joyful "Congratulations" Sound Effect + Clapping Applause
 */
export function playSuccessSound() {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // 1. Joyful Fanfare Chords (C5 - E5 - G5 - C6 - E6)
  const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = idx % 2 === 0 ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(freq, now + idx * 0.08);

    gain.gain.setValueAtTime(0, now + idx * 0.08);
    gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.08 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.55);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + idx * 0.08);
    osc.stop(now + idx * 0.08 + 0.6);
  });

  // 2. High Shimmer Chime
  const chime = ctx.createOscillator();
  const chimeGain = ctx.createGain();
  chime.type = 'sine';
  chime.frequency.setValueAtTime(1567.98, now + 0.35); // G6
  chime.frequency.exponentialRampToValueAtTime(2093.00, now + 0.65); // C7
  chimeGain.gain.setValueAtTime(0, now + 0.35);
  chimeGain.gain.linearRampToValueAtTime(0.18, now + 0.38);
  chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);
  chime.connect(chimeGain);
  chimeGain.connect(ctx.destination);
  chime.start(now + 0.35);
  chime.stop(now + 0.95);

  // 3. Multi-Hand Clapping Sequence (cheering crowd effect)
  const clapTimes = [0.25, 0.32, 0.38, 0.44, 0.52, 0.59, 0.68, 0.76, 0.85, 0.95];
  clapTimes.forEach((offset, index) => {
    const jitter = (Math.random() - 0.5) * 0.03;
    const vol = 0.2 + (index % 3) * 0.06;
    playSingleClap(ctx, now + offset + jitter, vol);
  });
}

/**
 * Play Dramatic Explosion Sound Effect (Sub-bass boom + filtered blast noise + rumble)
 */
export function playExplosionSound() {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // 1. Initial Punch Transient
  const punchOsc = ctx.createOscillator();
  const punchGain = ctx.createGain();
  punchOsc.type = 'sine';
  punchOsc.frequency.setValueAtTime(220, now);
  punchOsc.frequency.exponentialRampToValueAtTime(45, now + 0.12);
  punchGain.gain.setValueAtTime(0.5, now);
  punchGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
  punchOsc.connect(punchGain);
  punchGain.connect(ctx.destination);
  punchOsc.start(now);
  punchOsc.stop(now + 0.2);

  // 2. Deep Sub-Bass Boom Drop
  const boomOsc = ctx.createOscillator();
  const boomGain = ctx.createGain();
  boomOsc.type = 'triangle';
  boomOsc.frequency.setValueAtTime(140, now);
  boomOsc.frequency.exponentialRampToValueAtTime(24, now + 0.9);
  boomGain.gain.setValueAtTime(0, now);
  boomGain.gain.linearRampToValueAtTime(0.65, now + 0.03);
  boomGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
  boomOsc.connect(boomGain);
  boomGain.connect(ctx.destination);
  boomOsc.start(now);
  boomOsc.stop(now + 1.3);

  // 3. Lowpass Noise Blast
  const blastBuffer = createNoiseBuffer(ctx, 1.4);
  const blastSource = ctx.createBufferSource();
  blastSource.buffer = blastBuffer;

  const blastFilter = ctx.createBiquadFilter();
  blastFilter.type = 'lowpass';
  blastFilter.frequency.setValueAtTime(900, now);
  blastFilter.frequency.exponentialRampToValueAtTime(90, now + 1.2);

  const blastGain = ctx.createGain();
  blastGain.gain.setValueAtTime(0.6, now);
  blastGain.gain.exponentialRampToValueAtTime(0.001, now + 1.25);

  blastSource.connect(blastFilter);
  blastFilter.connect(blastGain);
  blastGain.connect(ctx.destination);

  blastSource.start(now);
  blastSource.stop(now + 1.3);
}

/**
 * Subtle button click sound
 */
export function playClickSound() {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, now);
  osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);

  gain.gain.setValueAtTime(0.12, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.06);
}

/**
 * Region hover subtle hum/tick
 */
export function playHoverSound() {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(440, now);
  osc.frequency.linearRampToValueAtTime(520, now + 0.03);

  gain.gain.setValueAtTime(0.04, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.05);
}

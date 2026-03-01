const STORAGE_KEY = "turboplay-arcade-v4";

const GAME_DEFS = [
  {
    id: "merge",
    name: "Neon Merge",
    kicker: "Puzzle",
    blurb: "Swipe matching tiles.",
    currentLabel: "Score",
    bestLabel: "Best Tile"
  },
  {
    id: "pulse",
    name: "Pulse Pads",
    kicker: "Memory",
    blurb: "Watch. Repeat. Extend.",
    currentLabel: "Round",
    bestLabel: "Best Round"
  },
  {
    id: "radar",
    name: "Radar Rush",
    kicker: "Reaction",
    blurb: "Tap the moving target.",
    currentLabel: "Hits",
    bestLabel: "Best Hits"
  },
  {
    id: "comet",
    name: "Comet Destroyer",
    kicker: "Defense",
    blurb: "Missile battery guards the skyline.",
    currentLabel: "Time",
    bestLabel: "Best Time"
  },
  {
    id: "snake",
    name: "Snake Byte",
    kicker: "Arcade",
    blurb: "Swipe to survive.",
    currentLabel: "Length",
    bestLabel: "Best Length"
  },
  {
    id: "lane",
    name: "Lane Split",
    kicker: "Runner",
    blurb: "Jump lanes and dodge traffic.",
    currentLabel: "Meters",
    bestLabel: "Best Run"
  },
  {
    id: "stacker",
    name: "Grid Stacker",
    kicker: "Timing",
    blurb: "Drop blocks with perfect overlap.",
    currentLabel: "Floors",
    bestLabel: "Best Tower"
  },
  {
    id: "lock",
    name: "Lock Pick",
    kicker: "Timing",
    blurb: "Tap inside the hot zone.",
    currentLabel: "Chain",
    bestLabel: "Best Chain"
  },
  {
    id: "dice",
    name: "Poker Dice",
    kicker: "Classic",
    blurb: "Roll, hold, and bank the best hand.",
    currentLabel: "Score",
    bestLabel: "Best Run"
  },
  {
    id: "domino",
    name: "Dominoes",
    kicker: "Classic",
    blurb: "Play the chain and empty your hand.",
    currentLabel: "Score",
    bestLabel: "Best Match"
  },
  {
    id: "sweep",
    name: "Mine Sweep",
    kicker: "Classic",
    blurb: "Clear the grid and flag the bombs.",
    currentLabel: "Safe",
    bestLabel: "Best Safe"
  },
  {
    id: "solitaire",
    name: "Solitaire",
    kicker: "Classic",
    blurb: "Clear the deck to the foundations.",
    currentLabel: "Home",
    bestLabel: "Best Home"
  },
  {
    id: "checkers",
    name: "Checkers",
    kicker: "Board",
    blurb: "Force jumps and beat the CPU.",
    currentLabel: "Moves",
    bestLabel: "Wins"
  },
  {
    id: "ludo",
    name: "Ludo",
    kicker: "Board",
    blurb: "Race two pawns home against the CPU.",
    currentLabel: "Moves",
    bestLabel: "Wins"
  },
  {
    id: "connect4",
    name: "Connect Four",
    kicker: "Board",
    blurb: "Drop four before the CPU does.",
    currentLabel: "Moves",
    bestLabel: "Wins"
  },
  {
    id: "battleship",
    name: "Battleship",
    kicker: "Strategy",
    blurb: "Scan the grid and sink the fleet.",
    currentLabel: "Hits",
    bestLabel: "Wins"
  },
  {
    id: "hangman",
    name: "Hangman",
    kicker: "Word",
    blurb: "Guess the word before the line goes cold.",
    currentLabel: "Streak",
    bestLabel: "Best Streak"
  },
  {
    id: "ttt",
    name: "Tic-Tac-Toe",
    kicker: "Board",
    blurb: "Beat the CPU in quick 3x3 rounds.",
    currentLabel: "Moves",
    bestLabel: "Wins"
  },
  {
    id: "reversi",
    name: "Reversi",
    kicker: "Strategy",
    blurb: "Flip the field and own the corners.",
    currentLabel: "Moves",
    bestLabel: "Wins"
  },
  {
    id: "slide",
    name: "Sliding Puzzle",
    kicker: "Puzzle",
    blurb: "Rebuild the board tile by tile.",
    currentLabel: "Moves",
    bestLabel: "Solves"
  },
  {
    id: "dots",
    name: "Dots and Boxes",
    kicker: "Board",
    blurb: "Draw lines, claim boxes, beat the CPU.",
    currentLabel: "Boxes",
    bestLabel: "Wins"
  },
  {
    id: "brick",
    name: "Brick Pop",
    kicker: "Arcade",
    blurb: "Drag the paddle, clear the wall.",
    currentLabel: "Score",
    bestLabel: "Best Score"
  },
  {
    id: "orbit",
    name: "Orbit Match",
    kicker: "Rhythm",
    blurb: "Tap when the top segment matches.",
    currentLabel: "Hits",
    bestLabel: "Best Hits"
  }
];

const GAME_PILL_ART = {
  merge: '<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="5" y="7" width="10" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><rect x="17" y="7" width="10" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><rect x="11" y="18" width="10" height="10" rx="2" fill="currentColor" fill-opacity=".18" stroke="currentColor" stroke-width="2"/></svg>',
  pulse: '<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="5" y="5" width="9" height="9" rx="3" fill="currentColor" fill-opacity=".18" stroke="currentColor" stroke-width="2"/><rect x="18" y="5" width="9" height="9" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><rect x="5" y="18" width="9" height="9" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><rect x="18" y="18" width="9" height="9" rx="3" fill="currentColor" fill-opacity=".38" stroke="currentColor" stroke-width="2"/></svg>',
  radar: '<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="10" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="16" cy="16" r="5" fill="none" stroke="currentColor" stroke-width="2" opacity=".8"/><path d="M16 16 L24 10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M16 5v4M5 16h4M23 16h4M16 23v4" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".7"/></svg>',
  comet: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M7 12c6 0 9-3 12-7-1 5 1 9 6 11-6 1-10 4-12 11-1-5-3-9-6-15Z" fill="currentColor" fill-opacity=".2" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="22" cy="10" r="3" fill="currentColor"/></svg>',
  snake: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M7 23c0-5 4-8 9-8h3c3 0 5-2 5-5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><circle cx="24" cy="10" r="3" fill="currentColor"/><circle cx="25" cy="9" r="0.8" fill="#0b1020"/></svg>',
  lane: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M10 4h12l4 24H6L10 4Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M16 7v5M16 15v4M16 22v3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  stacker: '<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="6" y="20" width="20" height="6" rx="2" fill="currentColor" fill-opacity=".22" stroke="currentColor" stroke-width="2"/><rect x="9" y="13" width="14" height="6" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><rect x="12" y="6" width="8" height="6" rx="2" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
  lock: '<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="10" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="16" cy="16" r="4" fill="currentColor" fill-opacity=".22" stroke="currentColor" stroke-width="2"/><path d="M16 6v3M26 16h-3M16 26v-3M6 16h3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  dice: '<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="6" y="6" width="20" height="20" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="11" cy="11" r="1.6" fill="currentColor"/><circle cx="21" cy="11" r="1.6" fill="currentColor"/><circle cx="16" cy="16" r="1.6" fill="currentColor"/><circle cx="11" cy="21" r="1.6" fill="currentColor"/><circle cx="21" cy="21" r="1.6" fill="currentColor"/></svg>',
  domino: '<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="7" y="5" width="18" height="22" rx="4" fill="none" stroke="currentColor" stroke-width="2"/><path d="M7 16h18" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="10" r="1.6" fill="currentColor"/><circle cx="20" cy="10" r="1.6" fill="currentColor"/><circle cx="16" cy="21" r="1.6" fill="currentColor"/><circle cx="12" cy="24" r="1.6" fill="currentColor"/><circle cx="20" cy="24" r="1.6" fill="currentColor"/></svg>',
  sweep: '<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="17" r="6" fill="currentColor"/><path d="M16 4v4M16 26v3M4 17h4M24 17h4M7 8l3 3M22 23l3 3M25 8l-3 3M7 26l3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M20 9c1 0 2-1 2-2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  solitaire: '<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="7" y="6" width="13" height="18" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 12c1.6-2.2 4.8-1.6 4.8.9 0 1.2-.7 2-1.8 2.8l-2.2 1.6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M13 20h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><rect x="15" y="9" width="10" height="15" rx="3" fill="currentColor" fill-opacity=".16" stroke="currentColor" stroke-width="2"/></svg>',
  checkers: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M8 8h16v16H8z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 8h8v8H8zM16 16h8v8h-8z" fill="currentColor" fill-opacity=".18"/><circle cx="12" cy="20" r="3" fill="currentColor"/><circle cx="20" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
  ludo: '<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="7" y="7" width="18" height="18" rx="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="2.4" fill="currentColor"/><circle cx="20" cy="12" r="2.4" fill="currentColor" fill-opacity=".3"/><circle cx="12" cy="20" r="2.4" fill="currentColor" fill-opacity=".3"/><circle cx="20" cy="20" r="2.4" fill="currentColor"/></svg>',
  connect4: '<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="6" y="8" width="20" height="18" rx="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="14" r="2.2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="20" cy="14" r="2.2" fill="currentColor" fill-opacity=".24" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="21" r="2.2" fill="currentColor" fill-opacity=".24" stroke="currentColor" stroke-width="2"/><circle cx="20" cy="21" r="2.2" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
  battleship: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M7 20h18l-2 4H9l-2-4Z" fill="currentColor" fill-opacity=".16" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M12 20v-6l4-2 4 2v6" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M5 11h4M23 11h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  hangman: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M8 26V6h12v4" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><circle cx="20" cy="14" r="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M20 17v5M20 19l-3 3M20 19l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  ttt: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M11 6v20M21 6v20M6 11h20M6 21h20" stroke="currentColor" stroke-width="2"/><circle cx="11" cy="11" r="2.7" fill="none" stroke="currentColor" stroke-width="2"/><path d="M18 18l5 5M23 18l-5 5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>',
  reversi: '<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="7" y="7" width="18" height="18" rx="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="13" cy="13" r="3.2" fill="currentColor"/><circle cx="19" cy="13" r="3.2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="13" cy="19" r="3.2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="19" cy="19" r="3.2" fill="currentColor"/></svg>',
  slide: '<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="6" y="6" width="20" height="20" rx="4" fill="none" stroke="currentColor" stroke-width="2"/><path d="M6 16h20M16 6v20" stroke="currentColor" stroke-width="2"/><path d="M21 11l3 3-3 3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  dots: '<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="8" cy="8" r="2" fill="currentColor"/><circle cx="24" cy="8" r="2" fill="currentColor"/><circle cx="8" cy="24" r="2" fill="currentColor"/><circle cx="24" cy="24" r="2" fill="currentColor"/><path d="M10 8h12M24 10v12M10 24h12M8 10v12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><rect x="12" y="12" width="8" height="8" rx="2" fill="currentColor" fill-opacity=".18"/></svg>',
  brick: '<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="5" y="8" width="22" height="16" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M16 8v5M10.5 13h11M10.5 19h11M10 19v5M22 19v5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  orbit: '<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="4" fill="currentColor"/><ellipse cx="16" cy="16" rx="11" ry="6.5" fill="none" stroke="currentColor" stroke-width="2"/><ellipse cx="16" cy="16" rx="6.5" ry="11" fill="none" stroke="currentColor" stroke-width="2" opacity=".75"/><circle cx="24" cy="12" r="1.6" fill="currentColor"/></svg>'
};

const state = {
  store: loadObject(STORAGE_KEY, { bests: {}, plays: {}, settings: { audioEnabled: true } }),
  activeGameId: GAME_DEFS[0].id,
  activeTypeFilter: null,
  controller: null,
  installPrompt: null,
  primaryHandler: null,
  secondaryHandler: null
};

const els = {
  gameTypes: document.querySelector("[data-game-types]"),
  railWrap: document.querySelector("[data-game-rail-wrap]"),
  rail: document.querySelector("[data-game-rail]"),
  railLeft: document.querySelector("[data-rail-left]"),
  railRight: document.querySelector("[data-rail-right]"),
  cabinet: document.querySelector("[data-cabinet]"),
  kicker: document.querySelector("[data-game-kicker]"),
  title: document.querySelector("[data-game-title]"),
  currentLabel: document.querySelector("[data-current-label]"),
  currentValue: document.querySelector("[data-current-value]"),
  bestLabel: document.querySelector("[data-best-label]"),
  bestValue: document.querySelector("[data-best-value]"),
  hint: document.querySelector("[data-game-hint]"),
  stage: document.querySelector("[data-stage]"),
  primaryAction: document.querySelector("[data-primary-action]"),
  secondaryAction: document.querySelector("[data-secondary-action]"),
  audioToggle: document.querySelector("[data-audio-toggle]"),
  installButton: document.querySelector("[data-install]"),
  gameCount: document.querySelector("[data-game-count]"),
  offlineStatus: document.querySelector("[data-offline-status]"),
  installStatus: document.querySelector("[data-install-status]")
};

function loadObject(key, fallback) {
  const cloneFallback = () => ({
    bests: { ...(fallback.bests || {}) },
    plays: { ...(fallback.plays || {}) },
    settings: { ...(fallback.settings || {}) }
  });

  try {
    const value = localStorage.getItem(key);
    if (!value) return cloneFallback();
    const parsed = JSON.parse(value);
    return {
      bests: { ...(fallback.bests || {}), ...(parsed.bests || {}) },
      plays: { ...(fallback.plays || {}), ...(parsed.plays || {}) },
      settings: { ...(fallback.settings || {}), ...(parsed.settings || {}) }
    };
  } catch {
    return cloneFallback();
  }
}

function saveStore() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.store));
  } catch {
    // Ignore storage failures.
  }
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function choice(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function createAudioEngine() {
  const AudioCtor = window.AudioContext || window.webkitAudioContext;
  let context = null;
  let master = null;
  let enabled = state.store.settings.audioEnabled !== false;
  let armed = false;

  function ensureContext() {
    if (!AudioCtor) return null;
    if (!context) {
      context = new AudioCtor();
      master = context.createGain();
      const compressor = context.createDynamicsCompressor();
      compressor.threshold.value = -14;
      compressor.knee.value = 14;
      compressor.ratio.value = 5;
      compressor.attack.value = 0.002;
      compressor.release.value = 0.12;
      master.gain.value = enabled ? 0.28 : 0;
      master.connect(compressor);
      compressor.connect(context.destination);
    }

    if (context.state === "suspended") {
      context.resume().catch(() => {});
    }

    return context;
  }

  function saveEnabled() {
    state.store.settings.audioEnabled = enabled;
    saveStore();
  }

  function setEnabled(next) {
    enabled = Boolean(next);
    saveEnabled();
    if (context && master) {
      const now = context.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setTargetAtTime(enabled ? 0.28 : 0.0001, now, 0.02);
      if (!enabled) {
        master.gain.setValueAtTime(0, now + 0.08);
      }
    }
    updateAudioToggle();
  }

  function tone({
    time,
    freq = 440,
    endFreq = freq,
    duration = 0.09,
    type = "square",
    gain = 0.075,
    attack = 0.0015,
    filter = 7600,
    q = 0.18
  }) {
    const ctx = ensureContext();
    if (!ctx || !enabled || !master) return;
    const startTime = time ?? ctx.currentTime;
    const oscillator = ctx.createOscillator();
    const filterNode = ctx.createBiquadFilter();
    const envelope = ctx.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(Math.max(24, freq), startTime);
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(24, endFreq), startTime + duration);
    filterNode.type = "lowpass";
    filterNode.frequency.setValueAtTime(filter, startTime);
    filterNode.Q.value = q;

    envelope.gain.setValueAtTime(0.0001, startTime);
    envelope.gain.linearRampToValueAtTime(gain, startTime + attack);
    envelope.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    oscillator.connect(filterNode);
    filterNode.connect(envelope);
    envelope.connect(master);
    oscillator.start(startTime);
    oscillator.stop(startTime + duration + 0.03);
  }

  function beep({
    time,
    freq,
    endFreq = freq,
    duration = 0.075,
    gain = 0.075
  }) {
    tone({
      time,
      freq,
      endFreq,
      duration,
      gain,
      type: "square",
      attack: 0.0012,
      filter: 8200,
      q: 0.12
    });
  }

  function burst({
    time,
    freq = 420,
    duration = 0.16,
    gain = 0.08,
    spread = 1.35
  }) {
    const ctx = ensureContext();
    if (!ctx || !enabled) return;
    const startTime = time ?? ctx.currentTime;
    beep({ time: startTime, freq, endFreq: freq / spread, duration: duration * 0.45, gain });
    beep({ time: startTime + 0.03, freq: freq * 0.78, endFreq: (freq * 0.78) / spread, duration: duration * 0.42, gain: gain * 0.82 });
    beep({ time: startTime + 0.06, freq: freq * 0.58, endFreq: (freq * 0.58) / spread, duration: duration * 0.4, gain: gain * 0.68 });
  }

  function sequence(steps) {
    const ctx = ensureContext();
    if (!ctx || !enabled) return;
    const now = ctx.currentTime + 0.005;
    steps.forEach((step, index) => {
      beep({ ...step, time: now + (step.delay ?? index * 0.05) });
    });
  }

  function play(name, detail = {}) {
    if (!armed) return;
    const ctx = ensureContext();
    if (!ctx || !enabled) return;
    const now = ctx.currentTime + 0.005;
    const padFrequencies = [392, 523.25, 659.25, 783.99];

    switch (name) {
      case "ui":
        beep({ time: now, freq: 988, endFreq: 784, duration: 0.05, gain: 0.065 });
        break;
      case "start":
        sequence([
          { freq: 523.25, duration: 0.06, gain: 0.07 },
          { freq: 659.25, duration: 0.06, gain: 0.075, delay: 0.07 },
          { freq: 783.99, duration: 0.08, gain: 0.08, delay: 0.14 }
        ]);
        break;
      case "deny":
        sequence([
          { freq: 220, endFreq: 200, duration: 0.06, gain: 0.07 },
          { freq: 165, endFreq: 150, duration: 0.08, gain: 0.075, delay: 0.06 }
        ]);
        break;
      case "slide":
        beep({ time: now, freq: 392, endFreq: 330, duration: 0.055, gain: 0.06 });
        break;
      case "merge":
        beep({ time: now, freq: 660 + clamp((detail.value || 0) / 2, 0, 240), duration: 0.06, gain: 0.075 });
        beep({ time: now + 0.04, freq: 880 + clamp((detail.value || 0) / 3, 0, 220), duration: 0.07, gain: 0.082 });
        break;
      case "pad":
        beep({ time: now, freq: padFrequencies[detail.index] || 440, endFreq: (padFrequencies[detail.index] || 440) * 0.98, duration: 0.11, gain: 0.08 });
        break;
      case "round":
        sequence([
          { freq: 659.25, duration: 0.05, gain: 0.065 },
          { freq: 783.99, duration: 0.06, gain: 0.072, delay: 0.06 },
          { freq: 988, duration: 0.08, gain: 0.08, delay: 0.12 }
        ]);
        break;
      case "hit":
        beep({ time: now, freq: 1174, endFreq: 988, duration: 0.05, gain: 0.082 });
        break;
      case "collect":
        sequence([
          { freq: 783.99, duration: 0.05, gain: 0.07 },
          { freq: 988, duration: 0.06, gain: 0.078, delay: 0.05 }
        ]);
        break;
      case "launch":
        sequence([
          { freq: 392, endFreq: 440, duration: 0.05, gain: 0.072 },
          { freq: 523.25, endFreq: 587.33, duration: 0.05, gain: 0.078, delay: 0.04 }
        ]);
        break;
      case "explosion":
        burst({ time: now, freq: detail.freq || 420, duration: detail.duration || 0.16, gain: detail.gain || 0.085, spread: 1.4 });
        break;
      case "crash":
        burst({ time: now, freq: 330, duration: 0.18, gain: 0.09, spread: 1.5 });
        beep({ time: now + 0.07, freq: 165, endFreq: 110, duration: 0.11, gain: 0.08 });
        break;
      case "scrape":
        sequence([
          { freq: 294, duration: 0.025, gain: 0.05 },
          { freq: 262, duration: 0.025, gain: 0.05, delay: 0.03 },
          { freq: 247, duration: 0.03, gain: 0.055, delay: 0.06 }
        ]);
        break;
      case "lane":
        beep({ time: now, freq: 440, endFreq: 523.25, duration: 0.05, gain: 0.065 });
        break;
      case "stack":
        beep({ time: now, freq: detail.perfect ? 988 : 659.25, endFreq: detail.perfect ? 1174 : 783.99, duration: 0.07, gain: 0.078 });
        if (detail.perfect) {
          beep({ time: now + 0.045, freq: 1318.51, duration: 0.06, gain: 0.072 });
        }
        break;
      case "lock":
        beep({ time: now, freq: 988, endFreq: 1174, duration: 0.055, gain: 0.08 });
        break;
      case "brick":
        beep({ time: now, freq: 784, endFreq: 659.25, duration: 0.05, gain: 0.072 });
        break;
      case "paddle":
        beep({ time: now, freq: 330, endFreq: 392, duration: 0.045, gain: 0.07 });
        break;
      case "orbit":
        beep({ time: now, freq: 880 + randomInt(0, 80), endFreq: 988 + randomInt(0, 90), duration: 0.06, gain: 0.078 });
        break;
      case "level":
        sequence([
          { freq: 659.25, duration: 0.06, gain: 0.072 },
          { freq: 880, duration: 0.06, gain: 0.078, delay: 0.06 },
          { freq: 1174, duration: 0.1, gain: 0.085, delay: 0.12 }
        ]);
        break;
      case "fail":
        sequence([
          { freq: 262, endFreq: 247, duration: 0.06, gain: 0.075 },
          { freq: 196, endFreq: 185, duration: 0.07, gain: 0.078, delay: 0.06 },
          { freq: 147, endFreq: 131, duration: 0.09, gain: 0.082, delay: 0.13 }
        ]);
        break;
      default:
        beep({ time: now, freq: 784, endFreq: 659.25, duration: 0.05, gain: 0.07 });
        break;
    }
  }

  return {
    prime() {
      armed = true;
      ensureContext();
    },
    play,
    toggle() {
      setEnabled(!enabled);
    },
    isEnabled() {
      return enabled;
    },
    setEnabled
  };
}

const audio = createAudioEngine();

function updateAudioToggle() {
  if (!els.audioToggle) return;
  const enabled = audio.isEnabled();
  els.audioToggle.textContent = enabled ? "Audio On" : "Audio Off";
  els.audioToggle.setAttribute("aria-pressed", enabled ? "true" : "false");
}

function getFilteredGames() {
  if (!state.activeTypeFilter) return GAME_DEFS;
  return GAME_DEFS.filter((game) => game.kicker === state.activeTypeFilter);
}

function renderRail() {
  const visibleGames = getFilteredGames();
  els.rail.innerHTML = "";
  visibleGames.forEach((game) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "game-pill";
    button.dataset.gameId = game.id;
    button.innerHTML = `
      <span class="game-pill-art" aria-hidden="true">${GAME_PILL_ART[game.id] || ""}</span>
      <span class="game-pill-copy">
        <span class="game-pill-type">${game.kicker}</span>
        <strong>${game.name}</strong>
      </span>
    `;
    button.classList.toggle("is-active", game.id === state.activeGameId);
    button.addEventListener("click", () => switchGame(game.id));
    els.rail.appendChild(button);
  });
  if (els.gameCount) {
    els.gameCount.textContent = `${GAME_DEFS.length} games`;
    els.gameCount.classList.toggle("is-active", !state.activeTypeFilter);
    els.gameCount.setAttribute("aria-pressed", state.activeTypeFilter ? "false" : "true");
  }
  if (els.gameTypes) {
    const byType = GAME_DEFS.reduce((map, game) => {
      map.set(game.kicker, (map.get(game.kicker) || 0) + 1);
      return map;
    }, new Map());
    els.gameTypes.innerHTML = `${Array.from(byType.entries())
      .map(([type, count]) => `<button class="game-type-pill${state.activeTypeFilter === type ? " is-active" : ""}" type="button" data-game-type="${type}"><strong>${type}</strong><em>${count}</em></button>`)
      .join("")}`;
    els.gameTypes.querySelectorAll("[data-game-type]").forEach((button) => {
      button.addEventListener("click", () => {
        const nextFilter = button.dataset.gameType || null;
        state.activeTypeFilter = nextFilter;
        renderRail();
        const nextVisibleGames = getFilteredGames();
        const hasActiveVisible = nextVisibleGames.some((game) => game.id === state.activeGameId);
        if (!hasActiveVisible && nextVisibleGames[0]) {
          switchGame(nextVisibleGames[0].id);
          return;
        }
        revealActiveGame(state.activeGameId);
      });
    });
  }
  syncRailControls();
}

function showAllGames() {
  state.activeTypeFilter = null;
  renderRail();
  revealActiveGame(state.activeGameId);
}

function syncRailControls() {
  if (!els.rail || !els.railWrap || !els.railLeft || !els.railRight) return;

  const maxScroll = Math.max(0, els.rail.scrollWidth - els.rail.clientWidth);
  const canScrollLeft = els.rail.scrollLeft > 8;
  const canScrollRight = els.rail.scrollLeft < maxScroll - 8;
  const hasOverflow = maxScroll > 8;

  els.railWrap.classList.toggle("can-scroll-left", hasOverflow && canScrollLeft);
  els.railWrap.classList.toggle("can-scroll-right", hasOverflow && canScrollRight);
  els.railLeft.disabled = !hasOverflow || !canScrollLeft;
  els.railRight.disabled = !hasOverflow || !canScrollRight;
}

function scrollRail(direction) {
  if (!els.rail) return;
  const delta = Math.max(180, Math.round(els.rail.clientWidth * 0.72)) * direction;
  els.rail.scrollBy({ left: delta, behavior: "smooth" });
}

function revealActiveGame(gameId) {
  const activePill = els.rail?.querySelector(`[data-game-id="${gameId}"]`);
  if (!activePill) return;
  activePill.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
    inline: "center"
  });
  window.setTimeout(syncRailControls, 180);
}

function setupRailControls() {
  if (!els.rail || !els.railLeft || !els.railRight) return;

  els.railLeft.addEventListener("click", () => {
    scrollRail(-1);
  });

  els.railRight.addEventListener("click", () => {
    scrollRail(1);
  });

  els.rail.addEventListener("scroll", syncRailControls, { passive: true });
  window.addEventListener("resize", syncRailControls);
  window.addEventListener("load", syncRailControls);
  window.setTimeout(syncRailControls, 0);
}

function setupGameCountButton() {
  if (!els.gameCount) return;
  els.gameCount.addEventListener("click", () => {
    if (!state.activeTypeFilter) return;
    showAllGames();
    audio.play("ui");
  });
}

function setPrimaryAction(label, handler) {
  state.primaryHandler = handler;
  els.primaryAction.hidden = false;
  els.primaryAction.textContent = label;
}

function setSecondaryAction(label, handler) {
  if (!handler) {
    state.secondaryHandler = null;
    els.secondaryAction.hidden = true;
    els.secondaryAction.textContent = "";
    return;
  }
  state.secondaryHandler = handler;
  els.secondaryAction.hidden = false;
  els.secondaryAction.textContent = label;
}

function runCabinetAction(handler) {
  try {
    audio.prime();
  } catch {
    // Keep the game controls responsive even if audio init fails on a device.
  }
  if (handler) handler();
}

function bindCabinetAction(button, getHandler) {
  let pointerTriggered = false;

  button.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    pointerTriggered = true;
    runCabinetAction(getHandler());
  });

  button.addEventListener("click", () => {
    if (pointerTriggered) {
      pointerTriggered = false;
      return;
    }
    runCabinetAction(getHandler());
  });

  button.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    runCabinetAction(getHandler());
  });
}

function updateBestValue(gameId, value) {
  const next = Math.max(state.store.bests[gameId] || 0, value);
  state.store.bests[gameId] = next;
  saveStore();
  if (state.activeGameId === gameId) {
    els.bestValue.textContent = String(next);
  }
  return next;
}

function incrementPlay(gameId) {
  state.store.plays[gameId] = (state.store.plays[gameId] || 0) + 1;
  saveStore();
}

function setHint(text) {
  els.hint.textContent = text;
}

function setCurrentValue(value) {
  els.currentValue.textContent = String(value);
}

function getBestValue(gameId) {
  return state.store.bests[gameId] || 0;
}

function makeCanvas(width, height) {
  const canvas = document.createElement("canvas");
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = `${width}px`;
  canvas.style.maxWidth = "100%";
  canvas.style.aspectRatio = `${width} / ${height}`;
  const ctx = canvas.getContext("2d");
  ctx.scale(ratio, ratio);
  return { canvas, ctx, width, height };
}

function mapPointer(event, node, width, height) {
  const rect = node.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * width,
    y: ((event.clientY - rect.top) / rect.height) * height
  };
}

function bindSwipe(node, callbacks) {
  let start = null;

  const onStart = (event) => {
    const touch = event.changedTouches[0];
    start = { x: touch.clientX, y: touch.clientY };
  };

  const onEnd = (event) => {
    if (!start) return;
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    start = null;

    if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) < 24) return;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0 && callbacks.right) callbacks.right();
      if (deltaX < 0 && callbacks.left) callbacks.left();
    } else {
      if (deltaY > 0 && callbacks.down) callbacks.down();
      if (deltaY < 0 && callbacks.up) callbacks.up();
    }
  };

  node.addEventListener("touchstart", onStart, { passive: true });
  node.addEventListener("touchend", onEnd, { passive: true });

  return () => {
    node.removeEventListener("touchstart", onStart);
    node.removeEventListener("touchend", onEnd);
  };
}

function buildTouchControls(rows) {
  const wrap = document.createElement("div");
  wrap.className = "touch-controls";

  rows.forEach((row) => {
    const rowEl = document.createElement("div");
    rowEl.className = "touch-row";

    row.forEach((config) => {
      if (!config) {
        const spacer = document.createElement("div");
        spacer.className = "touch-spacer";
        rowEl.appendChild(spacer);
        return;
      }

      const button = document.createElement("button");
      button.type = "button";
      button.className = `touch-button${config.accent ? " is-accent" : ""}`;
      button.textContent = config.label;
      button.setAttribute("aria-label", config.ariaLabel || config.label);
      button.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        audio.prime();
        config.onPress();
      });
      button.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        audio.prime();
        config.onPress();
      });
      rowEl.appendChild(button);
    });

    wrap.appendChild(rowEl);
  });

  return wrap;
}

function createGameApi(game) {
  return {
    setCurrentLabel(label) {
      els.currentLabel.textContent = label;
    },
    setBestLabel(label) {
      els.bestLabel.textContent = label;
    },
    setCurrent(value) {
      setCurrentValue(value);
    },
    setHint,
    getBest() {
      return getBestValue(game.id);
    },
    updateBest(value) {
      return updateBestValue(game.id, value);
    },
    countPlay() {
      incrementPlay(game.id);
    },
    sound(name, detail) {
      audio.play(name, detail);
    },
    setPrimary(label, handler) {
      setPrimaryAction(label, handler);
    },
    setSecondary(label, handler) {
      setSecondaryAction(label, handler);
    }
  };
}

function switchGame(gameId) {
  if (state.activeGameId === gameId && state.controller) return;
  const hadController = Boolean(state.controller);

  if (state.controller && state.controller.destroy) {
    state.controller.destroy();
  }

  state.activeGameId = gameId;
  const game = GAME_DEFS.find((entry) => entry.id === gameId);
  const api = createGameApi(game);

  document.querySelectorAll(".game-pill").forEach((pill) => {
    pill.classList.toggle("is-active", pill.dataset.gameId === gameId);
  });
  revealActiveGame(gameId);

  els.kicker.textContent = game.kicker;
  els.title.textContent = game.name;
  els.currentLabel.textContent = game.currentLabel;
  els.bestLabel.textContent = game.bestLabel;
  els.currentValue.textContent = "0";
  els.bestValue.textContent = String(getBestValue(game.id));
  setHint(game.blurb);
  els.stage.innerHTML = "";
  setSecondaryAction("", null);
  setPrimaryAction("Start", () => {});

  state.controller = GAME_CREATORS[game.id](els.stage, api);
  if (hadController) {
    audio.play("ui");
  }
}

function registerOffline() {
  if (!("serviceWorker" in navigator)) {
    els.offlineStatus.textContent = "Offline cache unavailable.";
    return;
  }

  window.addEventListener("load", async () => {
    try {
      let reloading = false;
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (reloading) return;
        reloading = true;
        els.offlineStatus.textContent = "Updating app...";
        window.location.reload();
      });

      const registration = await navigator.serviceWorker.register("./sw.js", {
        updateViaCache: "none"
      });
      await registration.update();
      els.offlineStatus.textContent = "Offline ready.";
    } catch {
      els.offlineStatus.textContent = "Offline setup failed.";
    }
  });
}

function setupInstall() {
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    state.installPrompt = event;
    els.installStatus.textContent = "Install available.";
  });

  window.addEventListener("appinstalled", () => {
    els.installStatus.textContent = "Installed.";
    state.installPrompt = null;
  });

  els.installButton.addEventListener("click", async () => {
    audio.prime();
    if (state.installPrompt) {
      state.installPrompt.prompt();
      const outcome = await state.installPrompt.userChoice;
      els.installStatus.textContent =
        outcome.outcome === "accepted" ? "Installed." : "Install canceled.";
      state.installPrompt = null;
      return;
    }
    els.installStatus.textContent = "Use Add to Home Screen.";
  });
}

function setupAudio() {
  updateAudioToggle();

  if (els.audioToggle) {
    els.audioToggle.addEventListener("click", () => {
      audio.prime();
      const wasEnabled = audio.isEnabled();
      audio.toggle();
      if (!wasEnabled && audio.isEnabled()) {
        audio.play("ui");
      }
    });
  }

  window.addEventListener("pointerdown", () => audio.prime(), { once: true });
  window.addEventListener("keydown", () => audio.prime(), { once: true });
}

bindCabinetAction(els.primaryAction, () => state.primaryHandler);
bindCabinetAction(els.secondaryAction, () => state.secondaryHandler);

window.addEventListener("keydown", (event) => {
  audio.prime();
  if (state.controller && state.controller.onKey) {
    state.controller.onKey(event);
  }
});

const GAME_CREATORS = {
  merge: createNeonMerge,
  pulse: createPulsePads,
  radar: createRadarRush,
  comet: createCometDestroyer,
  snake: createSnakeByte,
  lane: createLaneSplit,
  stacker: createGridStacker,
  lock: createLockPick,
  dice: createPokerDice,
  domino: createDominoes,
  sweep: createMineSweep,
  solitaire: createSolitaire,
  checkers: createCheckers,
  ludo: createLudo,
  connect4: createConnectFour,
  battleship: createBattleship,
  hangman: createHangman,
  ttt: createTicTacToe,
  reversi: createReversi,
  slide: createSlidingPuzzle,
  dots: createDotsAndBoxes,
  brick: createBrickPop,
  orbit: createOrbitMatch
};

function createNeonMerge(root, api) {
  api.setCurrentLabel("Score");
  api.setBestLabel("Best Tile");

  const stage = document.createElement("div");
  stage.className = "dom-stage";
  stage.innerHTML = `
    <div class="score-row">
      <div class="score-pill">Board <strong>4x4</strong></div>
      <div class="score-pill">Moves <strong>Swipe / Tap</strong></div>
    </div>
    <div class="merge-grid"></div>
  `;
  root.appendChild(stage);

  const boardEl = stage.querySelector(".merge-grid");
  const cells = Array.from({ length: 16 }, () => {
    const cell = document.createElement("div");
    cell.className = "merge-cell";
    cell.dataset.value = "0";
    boardEl.appendChild(cell);
    return cell;
  });
  const controls = buildTouchControls([
    [{ label: "Up", onPress: () => move("up") }],
    [
      { label: "Left", onPress: () => move("left") },
      { label: "Down", onPress: () => move("down"), accent: true },
      { label: "Right", onPress: () => move("right") }
    ]
  ]);
  stage.appendChild(controls);

  let game = null;
  const removeSwipe = bindSwipe(boardEl, {
    left: () => move("left"),
    right: () => move("right"),
    up: () => move("up"),
    down: () => move("down")
  });

  function createGrid() {
    return Array.from({ length: 4 }, () => Array(4).fill(0));
  }

  function cloneGrid(grid) {
    return grid.map((row) => [...row]);
  }

  function transpose(grid) {
    return grid[0].map((_, column) => grid.map((row) => row[column]));
  }

  function addRandom(grid) {
    const empty = [];
    grid.forEach((row, rowIndex) => {
      row.forEach((value, columnIndex) => {
        if (!value) empty.push([rowIndex, columnIndex]);
      });
    });
    if (!empty.length) return false;
    const [rowIndex, columnIndex] = choice(empty);
    grid[rowIndex][columnIndex] = Math.random() < 0.9 ? 2 : 4;
    return true;
  }

  function highest(grid) {
    return Math.max(...grid.flat());
  }

  function slideRow(row) {
    const compact = row.filter(Boolean);
    const next = [];
    let gained = 0;
    for (let index = 0; index < compact.length; index += 1) {
      if (compact[index] === compact[index + 1]) {
        const merged = compact[index] * 2;
        next.push(merged);
        gained += merged;
        index += 1;
      } else {
        next.push(compact[index]);
      }
    }
    while (next.length < 4) next.push(0);
    return {
      row: next,
      moved: next.some((value, index) => value !== row[index]),
      gained
    };
  }

  function applyMove(grid, direction) {
    let working = cloneGrid(grid);

    if (direction === "up" || direction === "down") {
      working = transpose(working);
    }

    if (direction === "right" || direction === "down") {
      working = working.map((row) => [...row].reverse());
    }

    let moved = false;
    let gained = 0;

    working = working.map((row) => {
      const result = slideRow(row);
      moved = moved || result.moved;
      gained += result.gained;
      return result.row;
    });

    if (direction === "right" || direction === "down") {
      working = working.map((row) => [...row].reverse());
    }

    if (direction === "up" || direction === "down") {
      working = transpose(working);
    }

    return { grid: working, moved, gained };
  }

  function hasMove(grid) {
    for (let row = 0; row < 4; row += 1) {
      for (let column = 0; column < 4; column += 1) {
        const value = grid[row][column];
        if (!value) return true;
        if (row < 3 && grid[row + 1][column] === value) return true;
        if (column < 3 && grid[row][column + 1] === value) return true;
      }
    }
    return false;
  }

  function render() {
    game.grid.flat().forEach((value, index) => {
      cells[index].dataset.value = String(value);
      cells[index].textContent = value ? String(value) : "";
    });
    api.setCurrent(game.score);
    api.updateBest(highest(game.grid));
    api.setHint(game.message);
  }

  function start() {
    api.countPlay();
    api.sound("start");
    game = {
      grid: createGrid(),
      score: 0,
      message: "Swipe or tap arrows."
    };
    addRandom(game.grid);
    addRandom(game.grid);
    render();
  }

  function move(direction) {
    if (!game) return;
    const result = applyMove(game.grid, direction);
    if (!result.moved) {
      game.message = "No move.";
      api.sound("deny");
      render();
      return;
    }

    game.grid = result.grid;
    game.score += result.gained;
    addRandom(game.grid);
    game.message = result.gained > 0 ? `+${result.gained}.` : "Shifted.";
    api.sound(result.gained > 0 ? "merge" : "slide", { value: result.gained });

    if (!hasMove(game.grid)) {
      game.message = "Game over.";
      api.sound("fail");
    }

    render();
  }

  api.setPrimary("New Run", start);
  start();

  return {
    destroy() {
      removeSwipe();
    },
    onKey(event) {
      const directions = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right"
      };

      if (!directions[event.key]) return;
      event.preventDefault();
      move(directions[event.key]);
    }
  };
}

function createPulsePads(root, api) {
  api.setCurrentLabel("Round");
  api.setBestLabel("Best Round");

  const stage = document.createElement("div");
  stage.className = "dom-stage";
  stage.innerHTML = `
    <div class="score-row">
      <div class="score-pill">Memory <strong>4 pads</strong></div>
      <div class="score-pill">Watch <strong>Then repeat</strong></div>
    </div>
    <div class="pulse-cue" aria-live="polite">Press Start</div>
    <div class="pixel-pads">
      <button class="pixel-pad" type="button" data-color="pink" data-index="0" aria-label="Pink"></button>
      <button class="pixel-pad" type="button" data-color="cyan" data-index="1" aria-label="Cyan"></button>
      <button class="pixel-pad" type="button" data-color="amber" data-index="2" aria-label="Amber"></button>
      <button class="pixel-pad" type="button" data-color="mint" data-index="3" aria-label="Mint"></button>
    </div>
  `;
  root.appendChild(stage);

  const pads = Array.from(stage.querySelectorAll(".pixel-pad"));
  const cue = stage.querySelector(".pulse-cue");

  const memory = {
    sequence: [],
    index: 0,
    round: 0,
    locked: true,
    flashing: null,
    displayStep: 0,
    timers: []
  };

  function clearTimers() {
    memory.timers.forEach((timer) => clearTimeout(timer));
    memory.timers = [];
  }

  function renderPads() {
    pads.forEach((pad, index) => {
      pad.classList.toggle("is-lit", memory.flashing === index);
      pad.classList.toggle("is-dim", memory.flashing !== null && memory.flashing !== index);
      pad.disabled = memory.locked;
    });
    api.setCurrent(memory.round);
  }

  function setFlash(index) {
    memory.flashing = index;
    if (index !== null) {
      api.sound("pad", { index });
    }
    renderPads();
  }

  function playSequence() {
    clearTimers();
    memory.locked = true;
    renderPads();

    let step = 0;

    const flash = () => {
      if (step >= memory.sequence.length) {
        memory.locked = false;
        memory.flashing = null;
        memory.displayStep = 0;
        cue.textContent = "Your turn";
        api.setHint("Your turn.");
        renderPads();
        return;
      }

      memory.displayStep = step + 1;
      cue.textContent = `Watch ${memory.displayStep} / ${memory.sequence.length}`;
      setFlash(memory.sequence[step]);
      const offTimer = window.setTimeout(() => {
        memory.flashing = null;
        renderPads();
        step += 1;
        const nextTimer = window.setTimeout(flash, 260);
        memory.timers.push(nextTimer);
      }, 560);
      memory.timers.push(offTimer);
    };

    const startTimer = window.setTimeout(flash, 420);
    memory.timers.push(startTimer);
  }

  function nextRound() {
    memory.sequence.push(randomInt(0, 3));
    memory.index = 0;
    memory.round = memory.sequence.length;
    if (memory.round > 1) {
      api.sound("round");
    }
    api.setCurrent(memory.round);
    api.setHint(`Round ${memory.round}.`);
    cue.textContent = `Round ${memory.round}`;
    playSequence();
  }

  function start() {
    api.countPlay();
    api.sound("start");
    clearTimers();
    memory.sequence = [];
    memory.index = 0;
    memory.round = 0;
    memory.locked = true;
    memory.flashing = null;
    memory.displayStep = 0;
    api.setCurrent(0);
    api.setHint("Loading...");
    cue.textContent = "Loading";
    renderPads();
    nextRound();
  }

  function press(index) {
    if (memory.locked) return;

    setFlash(index);
    cue.textContent = `Input ${memory.index + 1} / ${memory.sequence.length}`;
    const resetTimer = window.setTimeout(() => {
      memory.flashing = null;
      renderPads();
    }, 120);
    memory.timers.push(resetTimer);

    if (memory.sequence[memory.index] !== index) {
      api.sound("fail");
      api.updateBest(Math.max(0, memory.round - 1));
      memory.locked = true;
      cue.textContent = "Missed";
      api.setHint("Missed.");
      return;
    }

    memory.index += 1;

    if (memory.index === memory.sequence.length) {
      api.sound("round");
      api.updateBest(memory.round);
      memory.locked = true;
      cue.textContent = "Perfect";
      api.setHint("Correct.");
      const nextTimer = window.setTimeout(nextRound, 840);
      memory.timers.push(nextTimer);
    } else {
      cue.textContent = `Input ${memory.index + 1} / ${memory.sequence.length}`;
      api.setHint(`${memory.sequence.length - memory.index} left.`);
    }
  }

  pads.forEach((pad) => {
    pad.addEventListener("click", () => press(Number(pad.dataset.index)));
  });

  api.setPrimary("Start", start);
  renderPads();

  return {
    destroy() {
      clearTimers();
    }
  };
}

function createRadarRush(root, api) {
  api.setCurrentLabel("Hits");
  api.setBestLabel("Best Hits");

  const stage = document.createElement("div");
  stage.className = "target-stage radar-stage";
  const badge = document.createElement("div");
  badge.className = "stage-chip";
  badge.textContent = "24s";
  const status = document.createElement("div");
  status.className = "stage-chip radar-status";
  status.textContent = "Scan";
  const grid = document.createElement("div");
  grid.className = "radar-grid";
  const sweep = document.createElement("div");
  sweep.className = "radar-sweep";
  const crosshair = document.createElement("div");
  crosshair.className = "radar-crosshair";
  const blips = document.createElement("div");
  blips.className = "radar-blips";
  const target = document.createElement("button");
  target.type = "button";
  target.className = "target-dot radar-lock";
  target.setAttribute("aria-label", "Target");
  target.innerHTML = `
    <span class="radar-lock__ring radar-lock__ring--outer"></span>
    <span class="radar-lock__ring radar-lock__ring--mid"></span>
    <span class="radar-lock__core"></span>
    <span class="radar-lock__spark"></span>
  `;
  stage.appendChild(grid);
  stage.appendChild(sweep);
  stage.appendChild(crosshair);
  stage.appendChild(blips);
  stage.appendChild(badge);
  stage.appendChild(status);
  stage.appendChild(target);
  root.appendChild(stage);

  const radar = {
    score: 0,
    timeLeft: 24,
    active: false,
    size: 78,
    tickTimer: null,
    moveTimer: null
  };

  function seedBlips() {
    blips.innerHTML = "";
    for (let index = 0; index < 8; index += 1) {
      const blip = document.createElement("span");
      blip.className = "radar-blip";
      blip.style.setProperty("--x", `${randomInt(8, 88)}%`);
      blip.style.setProperty("--y", `${randomInt(16, 92)}%`);
      blip.style.setProperty("--delay", `${(index * 0.31).toFixed(2)}s`);
      blip.style.setProperty("--scale", `${(0.7 + Math.random() * 0.9).toFixed(2)}`);
      blips.appendChild(blip);
    }
  }

  function spawnPing(x, y) {
    const ping = document.createElement("span");
    ping.className = "radar-ping";
    ping.style.left = `${x}px`;
    ping.style.top = `${y}px`;
    stage.appendChild(ping);
    window.setTimeout(() => ping.remove(), 520);
  }

  function moveTarget() {
    const width = stage.clientWidth || 320;
    const height = stage.clientHeight || 380;
    const x = randomInt(14, Math.max(14, width - radar.size - 14));
    const y = randomInt(54, Math.max(54, height - radar.size - 18));
    target.style.left = `${x}px`;
    target.style.top = `${y}px`;
    target.style.width = `${radar.size}px`;
    target.style.height = `${radar.size}px`;
    target.style.setProperty("--target-tilt", `${randomInt(-14, 14)}deg`);
  }

  function stop(message) {
    radar.active = false;
    clearInterval(radar.tickTimer);
    clearInterval(radar.moveTimer);
    radar.tickTimer = null;
    radar.moveTimer = null;
    api.updateBest(radar.score);
    api.sound(radar.score > 0 ? "round" : "fail");
    api.setHint(message);
    api.setPrimary("Start", start);
    status.textContent = "Idle";
    stage.classList.remove("is-live");
  }

  function start() {
    api.countPlay();
    api.sound("start");
    radar.score = 0;
    radar.timeLeft = 24;
    radar.active = true;
    radar.size = 78;
    api.setCurrent(0);
    api.setHint("Tap the beacon.");
    badge.textContent = "24s";
    status.textContent = "Live";
    stage.classList.add("is-live");
    seedBlips();
    moveTarget();

    radar.tickTimer = window.setInterval(() => {
      radar.timeLeft -= 1;
      badge.textContent = `${radar.timeLeft}s`;
      if (radar.timeLeft <= 0) {
        badge.textContent = "0s";
        stop(`${radar.score} hits.`);
      }
    }, 1000);

    radar.moveTimer = window.setInterval(() => {
      if (!radar.active) return;
      moveTarget();
    }, 760);

    api.setPrimary("Restart", start);
  }

  target.addEventListener("pointerdown", () => {
    if (!radar.active) return;
    audio.prime();
    radar.score += 1;
    radar.size = Math.max(52, 78 - Math.floor(radar.score / 2) * 2);
    api.setCurrent(radar.score);
    api.setHint(`${radar.score} hits.`);
    status.textContent = "Lock";
    api.sound("hit");
    const x = parseFloat(target.style.left || "0") + radar.size / 2;
    const y = parseFloat(target.style.top || "0") + radar.size / 2;
    spawnPing(x, y);
    moveTarget();
  });

  seedBlips();
  moveTarget();
  api.setPrimary("Start", start);

  return {
    destroy() {
      clearInterval(radar.tickTimer);
      clearInterval(radar.moveTimer);
    }
  };
}

function createCometDestroyer(root, api) {
  api.setCurrentLabel("Time");
  api.setBestLabel("Best Time");

  const stage = document.createElement("div");
  stage.className = "canvas-stage";
  const { canvas, ctx, width, height } = makeCanvas(320, 420);
  const leftBadge = document.createElement("div");
  const rightBadge = document.createElement("div");

  [leftBadge, rightBadge].forEach((badge, index) => {
    badge.className = "stage-chip";
    badge.style.position = "absolute";
    badge.style.top = "12px";
    badge.style.zIndex = "2";
    if (index === 0) {
      badge.style.left = "12px";
    } else {
      badge.style.right = "12px";
    }
  });

  stage.appendChild(canvas);
  stage.appendChild(leftBadge);
  stage.appendChild(rightBadge);
  root.appendChild(stage);

  const batteryBase = { x: 28, y: 346 };
  const batterySlots = [
    { x: 18, y: 326 },
    { x: 30, y: 316 },
    { x: 30, y: 338 },
    { x: 42, y: 328 }
  ];

  const skylineTargets = [
    { x: 48, y: 292 },
    { x: 72, y: 316 },
    { x: 96, y: 286 },
    { x: 112, y: 334 },
    { x: 132, y: 308 }
  ];

  const game = {
    active: false,
    time: 0,
    destroyed: 0,
    shields: 10,
    level: 0,
    cadence: 0,
    spawnTick: 0,
    lastTime: 0,
    raf: 0,
    flash: 0,
    nextTube: 0,
    missiles: Array.from({ length: 4 }, () => ({ reload: 0, flash: 0 })),
    salvos: [],
    comets: [],
    explosions: [],
    target: { x: 240, y: 150, show: 0.55 }
  };

  function currentDelay() {
    const ramp = clamp(game.time / 300, 0, 1);
    return Math.max(680, 1320 - ramp * 340 - game.level * 28);
  }

  function currentCometSpeed() {
    const ramp = clamp(game.time / 300, 0, 1);
    return 72 + ramp * 24 + game.level * 2;
  }

  function normalize(dx, dy) {
    const distance = Math.hypot(dx, dy) || 1;
    return { x: dx / distance, y: dy / distance };
  }

  function drawPolygon(points, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let index = 1; index < points.length; index += 1) {
      ctx.lineTo(points[index].x, points[index].y);
    }
    ctx.closePath();
    ctx.fill();
  }

  function lerpPoint(a, b, t) {
    return {
      x: a.x + (b.x - a.x) * t,
      y: a.y + (b.y - a.y) * t
    };
  }

  function tubeMuzzle(slotIndex) {
    const slot = batterySlots[slotIndex];
    return { x: slot.x + 48, y: slot.y - 30 };
  }

  function updateHud() {
    const ready = game.missiles.filter((missile) => missile.reload <= 0).length;
    leftBadge.textContent = `${game.shields} shields`;
    rightBadge.textContent = `${ready}/4 ready • Lv ${game.level + 1}`;
    api.setCurrent(Math.floor(game.time));
  }

  function spawnExplosion(x, y, radius, color) {
    game.explosions.push({
      x,
      y,
      life: 0.26,
      maxLife: 0.26,
      radius,
      hitRadius: radius,
      color
    });
  }

  function missilePoint(salvo, t) {
    const point = lerpPoint(salvo.start, salvo.target, t);
    point.y -= Math.sin(Math.PI * t) * 18;
    return point;
  }

  function spawnComet(spread = 0) {
    const anchor = choice(skylineTargets);
    const target = {
      x: anchor.x + spread * 12 + randomInt(-8, 8),
      y: anchor.y + randomInt(-10, 10)
    };
    const crossPoint = {
      x: randomInt(228, 286),
      y: randomInt(112, 208)
    };
    const directionOut = normalize(crossPoint.x - target.x, crossPoint.y - target.y);
    let travel = randomInt(220, 304);
    let start = {
      x: crossPoint.x + directionOut.x * travel,
      y: crossPoint.y + directionOut.y * travel
    };

    while (start.x < width + 56) {
      travel += 20;
      start = {
        x: crossPoint.x + directionOut.x * travel,
        y: crossPoint.y + directionOut.y * travel
      };
    }

    const velocity = normalize(target.x - start.x, target.y - start.y);
    const speed = currentCometSpeed() + randomInt(0, 12);
    game.comets.push({
      x: start.x,
      y: start.y,
      vx: velocity.x * speed,
      vy: velocity.y * speed,
      target,
      radius: randomInt(11, 15),
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 3,
      tail: randomInt(36, 56),
      active: true
    });
  }

  function nextReadyTube() {
    for (let offset = 0; offset < game.missiles.length; offset += 1) {
      const index = (game.nextTube + offset) % game.missiles.length;
      if (game.missiles[index].reload <= 0) return index;
    }
    return -1;
  }

  function fireAt(x, y) {
    game.target = {
      x: clamp(x, 116, width - 10),
      y: clamp(y, 66, height - 22),
      show: 0.85
    };

    if (!game.active) return;
    if (game.cadence > 0) {
      api.setHint("Launcher cycling.");
      api.sound("deny");
      return;
    }

    const tubeIndex = nextReadyTube();
    if (tubeIndex < 0) {
      api.setHint("Missile rack reloading.");
      api.sound("deny");
      return;
    }

    const start = tubeMuzzle(tubeIndex);
    const target = { x: game.target.x, y: game.target.y };
    const distance = Math.hypot(target.x - start.x, target.y - start.y);

    game.salvos.push({
      slot: tubeIndex,
      start,
      target,
      travel: 0,
      duration: clamp(distance / 240, 0.5, 0.92),
      active: true
    });
    game.missiles[tubeIndex].reload = 1.4;
    game.missiles[tubeIndex].flash = 0.18;
    game.cadence = 0.5;
    game.nextTube = (tubeIndex + 1) % game.missiles.length;
    api.setHint("Missile away.");
    api.sound("launch");
    updateHud();
  }

  function stop(message) {
    game.active = false;
    cancelAnimationFrame(game.raf);
    api.updateBest(Math.floor(game.time));
    updateHud();
    api.sound("fail");
    api.setHint(message);
    api.setPrimary("Start", start);
  }

  function start() {
    api.countPlay();
    api.sound("start");
    game.active = true;
    game.time = 0;
    game.destroyed = 0;
    game.shields = 10;
    game.level = 0;
    game.cadence = 0;
    game.spawnTick = 0;
    game.flash = 0;
    game.nextTube = 0;
    game.missiles = Array.from({ length: 4 }, () => ({ reload: 0, flash: 0 }));
    game.salvos = [];
    game.comets = [];
    game.explosions = [];
    game.target = { x: 240, y: 150, show: 0.55 };
    game.lastTime = performance.now();
    updateHud();
    api.setHint("Tap the sky to launch a missile.");
    api.setPrimary("Restart", start);
    cancelAnimationFrame(game.raf);
    draw();
    game.raf = requestAnimationFrame(loop);
  }

  function drawSky() {
    const sky = ctx.createLinearGradient(0, 0, width, height);
    sky.addColorStop(0, "#07142a");
    sky.addColorStop(0.42, "#1c3468");
    sky.addColorStop(0.72, "#593f7b");
    sky.addColorStop(1, "#111728");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "rgba(255,255,255,0.08)";
    for (let index = 0; index < 18; index += 1) {
      ctx.fillRect((index * 37) % width, 18 + ((index * 29) % 120), 2, 2);
    }
  }

  function drawCity() {
    ctx.fillStyle = "rgba(255, 174, 91, 0.1)";
    ctx.fillRect(0, 156, width, 56);

    const mountains = [
      [0, 202, 34, 154, 78, 208],
      [62, 208, 116, 142, 184, 214],
      [154, 214, 208, 164, 272, 210],
      [246, 210, 302, 152, 360, 212]
    ];
    mountains.forEach(([x1, y1, x2, y2, x3, y3], index) => {
      ctx.fillStyle = index % 2 === 0 ? "#243259" : "#1a2848";
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineTo(x3, y3);
      ctx.lineTo(x3, 238);
      ctx.lineTo(x1, 238);
      ctx.closePath();
      ctx.fill();
    });

    ctx.fillStyle = "#0f1830";
    ctx.fillRect(0, 238, width, 182);

    const skyline = [
      [8, 204, 14, 216],
      [20, 178, 20, 242],
      [40, 168, 16, 252],
      [56, 144, 24, 276],
      [78, 196, 18, 248],
      [94, 156, 22, 286],
      [118, 136, 18, 304],
      [138, 188, 14, 248],
      [154, 166, 20, 288]
    ];

    skyline.forEach(([x, y, w, h], index) => {
      ctx.fillStyle = index % 2 === 0 ? "#1a2b50" : "#223866";
      ctx.fillRect(x, y, w, h);
      ctx.fillStyle = "rgba(255, 215, 122, 0.22)";
      for (let row = 0; row < 4; row += 1) {
        for (let column = 0; column < 2; column += 1) {
          ctx.fillRect(x + 3 + column * 6, y + 12 + row * 18, 3, 5);
        }
      }
    });

    ctx.fillStyle = "#10182d";
    ctx.fillRect(0, 304, width, 116);
    ctx.fillStyle = "#20304f";
    ctx.beginPath();
    ctx.moveTo(0, 318);
    ctx.lineTo(126, 286);
    ctx.lineTo(204, 304);
    ctx.lineTo(width, 286);
    ctx.lineTo(width, 420);
    ctx.lineTo(0, 420);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#1d3d6d";
    ctx.fillRect(0, 330, width, 90);
  }

  function drawBattery() {
    ctx.fillStyle = "rgba(0,0,0,0.28)";
    ctx.beginPath();
    ctx.ellipse(batteryBase.x + 30, batteryBase.y + 12, 56, 14, -0.28, 0, Math.PI * 2);
    ctx.fill();

    drawPolygon(
      [
        { x: batteryBase.x - 14, y: batteryBase.y + 16 },
        { x: batteryBase.x + 8, y: batteryBase.y + 2 },
        { x: batteryBase.x + 54, y: batteryBase.y + 20 },
        { x: batteryBase.x + 24, y: batteryBase.y + 38 }
      ],
      "#172338"
    );

    drawPolygon(
      [
        { x: batteryBase.x - 2, y: batteryBase.y + 4 },
        { x: batteryBase.x + 20, y: batteryBase.y - 12 },
        { x: batteryBase.x + 70, y: batteryBase.y + 8 },
        { x: batteryBase.x + 46, y: batteryBase.y + 24 }
      ],
      "#2e476b"
    );

    drawPolygon(
      [
        { x: batteryBase.x + 2, y: batteryBase.y + 14 },
        { x: batteryBase.x + 20, y: batteryBase.y + 1 },
        { x: batteryBase.x + 58, y: batteryBase.y + 16 },
        { x: batteryBase.x + 42, y: batteryBase.y + 28 }
      ],
      "#415d86"
    );

    drawPolygon(
      [
        { x: batteryBase.x + 6, y: batteryBase.y + 22 },
        { x: batteryBase.x + 18, y: batteryBase.y + 14 },
        { x: batteryBase.x + 36, y: batteryBase.y + 22 },
        { x: batteryBase.x + 22, y: batteryBase.y + 30 }
      ],
      "#f2c158"
    );

    batterySlots.forEach((slot, index) => {
      const muzzle = tubeMuzzle(index);
      const readyRatio = 1 - game.missiles[index].reload / 1.4;
      const flash = game.missiles[index].flash;

      drawPolygon(
        [
          { x: slot.x, y: slot.y },
          { x: slot.x + 10, y: slot.y - 8 },
          { x: muzzle.x + 5, y: muzzle.y + 4 },
          { x: muzzle.x - 7, y: muzzle.y + 12 }
        ],
        "#d4deeb"
      );

      drawPolygon(
        [
          { x: slot.x + 2, y: slot.y + 2 },
          { x: slot.x + 10, y: slot.y - 4 },
          { x: muzzle.x - 2, y: muzzle.y + 7 },
          { x: muzzle.x - 11, y: muzzle.y + 13 }
        ],
        "#40536f"
      );

      drawPolygon(
        [
          { x: slot.x + 6, y: slot.y + 1 },
          { x: slot.x + 14, y: slot.y - 4 },
          { x: slot.x + 27, y: slot.y - 12 },
          { x: slot.x + 23, y: slot.y - 6 }
        ],
        game.missiles[index].reload <= 0 ? "#ff6c83" : "#273548"
      );

      ctx.fillStyle = "#11182b";
      ctx.fillRect(slot.x - 1, slot.y + 4, 24, 10);
      ctx.fillStyle = "rgba(94, 225, 255, 0.12)";
      ctx.fillRect(slot.x + 1, slot.y + 7, 22, 3);
      ctx.fillStyle = "rgba(94, 225, 255, 0.78)";
      ctx.fillRect(slot.x + 1, slot.y + 7, 22 * clamp(readyRatio, 0, 1), 3);

      ctx.fillStyle = "rgba(255,255,255,0.2)";
      ctx.fillRect(slot.x + 3, slot.y + 5, 9, 1.5);

      if (flash > 0) {
        ctx.fillStyle = `rgba(255, 235, 166, ${flash * 4})`;
        ctx.beginPath();
        ctx.arc(muzzle.x, muzzle.y + 7, 4 + flash * 12, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    drawPolygon(
      [
        { x: batteryBase.x + 18, y: batteryBase.y - 2 },
        { x: batteryBase.x + 28, y: batteryBase.y - 9 },
        { x: batteryBase.x + 34, y: batteryBase.y - 5 },
        { x: batteryBase.x + 24, y: batteryBase.y + 2 }
      ],
      "#f4c554"
    );

    ctx.strokeStyle = "rgba(255,255,255,0.16)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(batteryBase.x + 2, batteryBase.y + 10);
    ctx.lineTo(batteryBase.x + 40, batteryBase.y + 24);
    ctx.stroke();
  }

  function drawTargetMarker() {
    if (game.target.show <= 0) return;
    const alpha = Math.min(1, game.target.show);
    ctx.strokeStyle = `rgba(255, 214, 126, ${0.18 + alpha * 0.72})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(game.target.x, game.target.y, 10 + (1 - alpha) * 8, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(game.target.x - 14, game.target.y);
    ctx.lineTo(game.target.x - 6, game.target.y);
    ctx.moveTo(game.target.x + 6, game.target.y);
    ctx.lineTo(game.target.x + 14, game.target.y);
    ctx.moveTo(game.target.x, game.target.y - 14);
    ctx.lineTo(game.target.x, game.target.y - 6);
    ctx.moveTo(game.target.x, game.target.y + 6);
    ctx.lineTo(game.target.x, game.target.y + 14);
    ctx.stroke();
  }

  function drawComet(comet) {
    const direction = normalize(-comet.vx, -comet.vy);
    const tailX = comet.x + direction.x * comet.tail;
    const tailY = comet.y + direction.y * comet.tail;
    const tail = ctx.createLinearGradient(comet.x, comet.y, tailX, tailY);
    tail.addColorStop(0, "rgba(255, 228, 148, 0.92)");
    tail.addColorStop(0.4, "rgba(255, 126, 76, 0.48)");
    tail.addColorStop(1, "rgba(255, 126, 76, 0)");
    ctx.strokeStyle = tail;
    ctx.lineWidth = comet.radius * 0.92;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(comet.x, comet.y);
    ctx.lineTo(tailX, tailY);
    ctx.stroke();

    ctx.fillStyle = "#7b6250";
    ctx.beginPath();
    for (let index = 0; index < 8; index += 1) {
      const angle = comet.angle + (Math.PI * 2 * index) / 8;
      const radius = comet.radius * (0.78 + ((index % 2) * 0.18));
      const px = comet.x + Math.cos(angle) * radius;
      const py = comet.y + Math.sin(angle) * radius;
      if (index === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#ffd36f";
    ctx.beginPath();
    ctx.arc(comet.x - comet.radius * 0.18, comet.y - comet.radius * 0.12, comet.radius * 0.32, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawMissile(salvo) {
    const t = clamp(salvo.travel / salvo.duration, 0, 1);
    const point = missilePoint(salvo, t);
    const trailBack = missilePoint(salvo, Math.max(0, t - 0.08));
    const angle = Math.atan2(point.y - trailBack.y, point.x - trailBack.x);

    ctx.strokeStyle = "rgba(255, 222, 142, 0.52)";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(trailBack.x, trailBack.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();

    ctx.save();
    ctx.translate(point.x, point.y);
    ctx.rotate(angle);
    ctx.fillStyle = "#f3f6fd";
    ctx.fillRect(-10, -2.5, 14, 5);
    ctx.fillStyle = "#ff6677";
    ctx.beginPath();
    ctx.moveTo(5, 0);
    ctx.lineTo(-1, -4);
    ctx.lineTo(-1, 4);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#f7c55a";
    ctx.fillRect(-12, -1.5, 4, 3);
    ctx.restore();
  }

  function drawExplosions() {
    game.explosions.forEach((explosion) => {
      const lifeRatio = explosion.life / explosion.maxLife;
      ctx.fillStyle = `rgba(255, 196, 108, ${lifeRatio * 0.18})`;
      ctx.beginPath();
      ctx.arc(explosion.x, explosion.y, explosion.radius * (1.1 + (1 - lifeRatio)), 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = explosion.color;
      ctx.lineWidth = 2 + (1 - lifeRatio) * 4;
      ctx.beginPath();
      ctx.arc(explosion.x, explosion.y, explosion.radius * (1.6 - lifeRatio), 0, Math.PI * 2);
      ctx.stroke();
    });
  }

  function draw() {
    drawSky();
    drawCity();
    drawTargetMarker();
    game.comets.forEach(drawComet);
    game.salvos.forEach(drawMissile);
    drawBattery();
    drawExplosions();

    if (game.flash > 0) {
      ctx.fillStyle = `rgba(255, 96, 96, ${game.flash * 0.22})`;
      ctx.fillRect(0, 0, width, height);
    }
  }

  function impactCity(comet) {
    comet.active = false;
    game.shields -= 1;
    game.flash = 1;
    spawnExplosion(comet.target.x, comet.target.y, 22, "rgba(255, 145, 92, 0.92)");
    api.sound("explosion", { freq: 120, duration: 0.28, gain: 0.09 });
    updateHud();

    if (game.shields <= 0) {
      stop(`City lost after ${Math.floor(game.time)}s.`);
      return;
    }

    api.setHint(`${game.shields} shields left.`);
  }

  function resolveExplosion(explosion) {
    let hits = 0;
    game.comets.forEach((comet) => {
      if (!comet.active) return;
      if (Math.hypot(comet.x - explosion.x, comet.y - explosion.y) > explosion.hitRadius + comet.radius) {
        return;
      }
      comet.active = false;
      hits += 1;
      game.destroyed += 1;
      spawnExplosion(comet.x, comet.y, 12, "rgba(94, 225, 255, 0.92)");
    });

    if (hits > 0) {
      api.sound("explosion", { freq: 210 + hits * 20, duration: 0.18, gain: 0.055 + hits * 0.01 });
      api.setHint(`${hits} comet${hits > 1 ? "s" : ""} destroyed.`);
      updateHud();
    }
  }

  function loop(timestamp) {
    if (!game.active) return;
    const delta = Math.min(32, timestamp - game.lastTime || 16);
    const deltaSeconds = delta / 1000;
    game.lastTime = timestamp;
    game.time += deltaSeconds;
    game.cadence = Math.max(0, game.cadence - deltaSeconds);
    game.flash = Math.max(0, game.flash - deltaSeconds * 2.8);
    game.target.show = Math.max(0, game.target.show - deltaSeconds * 1.8);
    game.missiles.forEach((missile) => {
      missile.reload = Math.max(0, missile.reload - deltaSeconds);
      missile.flash = Math.max(0, missile.flash - deltaSeconds * 5);
    });

    const nextLevel = Math.floor(game.time / 50);
    if (nextLevel > game.level) {
      game.level = nextLevel;
      api.sound("level");
      api.setHint(`Level ${game.level + 1}. Sky gets busier.`);
    }

    game.spawnTick += delta;
    while (game.spawnTick >= currentDelay()) {
      game.spawnTick -= currentDelay();
      spawnComet();
      if (game.time > 135 && Math.random() < 0.1 + clamp((game.time - 135) / 300, 0, 0.16)) {
        spawnComet(Math.random() > 0.5 ? 1 : -1);
      }
    }

    game.salvos.forEach((salvo) => {
      if (!salvo.active) return;
      salvo.travel += deltaSeconds;
      if (salvo.travel < salvo.duration) return;
      salvo.active = false;
      spawnExplosion(salvo.target.x, salvo.target.y, 26, "rgba(255, 182, 118, 0.92)");
    });

    game.comets.forEach((comet) => {
      if (!comet.active) return;
      comet.x += comet.vx * deltaSeconds;
      comet.y += comet.vy * deltaSeconds;
      comet.angle += comet.spin * deltaSeconds;

      if (Math.hypot(comet.x - comet.target.x, comet.y - comet.target.y) < 14) {
        impactCity(comet);
      }
    });

    game.explosions.forEach((explosion) => {
      if (!explosion.hitRadius) return;
      resolveExplosion(explosion);
      explosion.hitRadius = 0;
    });

    game.salvos = game.salvos.filter((salvo) => salvo.active);
    game.comets = game.comets.filter((comet) => comet.active && comet.x > -40 && comet.y < height + 40);
    game.explosions = game.explosions.filter((explosion) => {
      explosion.life -= deltaSeconds;
      return explosion.life > 0;
    });

    updateHud();
    draw();
    game.raf = requestAnimationFrame(loop);
  }

  canvas.addEventListener("pointerdown", (event) => {
    const point = mapPointer(event, canvas, width, height);
    fireAt(point.x, point.y);
  });

  api.setPrimary("Start", start);
  updateHud();
  api.setHint("Tap the sky to launch a missile.");
  draw();

  return {
    destroy() {
      cancelAnimationFrame(game.raf);
    },
    onKey(event) {
      const step = 12;
      if (event.key === "ArrowUp") {
        event.preventDefault();
        game.target.y = clamp(game.target.y - step, 66, height - 22);
        game.target.show = 0.8;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        game.target.y = clamp(game.target.y + step, 66, height - 22);
        game.target.show = 0.8;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        game.target.x = clamp(game.target.x - step, 116, width - 10);
        game.target.show = 0.8;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        game.target.x = clamp(game.target.x + step, 116, width - 10);
        game.target.show = 0.8;
      }
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        fireAt(game.target.x, game.target.y);
      }
    }
  };
}

function createSnakeByte(root, api) {
  api.setCurrentLabel("Length");
  api.setBestLabel("Best Length");

  const stage = document.createElement("div");
  stage.className = "canvas-stage";
  const { canvas, ctx, width, height } = makeCanvas(320, 320);
  stage.appendChild(canvas);
  stage.appendChild(
    buildTouchControls([
      [{ label: "Up", onPress: () => turn(0, -1) }],
      [
        { label: "Left", onPress: () => turn(-1, 0) },
        { label: "Down", onPress: () => turn(0, 1), accent: true },
        { label: "Right", onPress: () => turn(1, 0) }
      ]
    ])
  );
  root.appendChild(stage);

  const gridSize = 16;
  const cell = width / gridSize;
  const game = {
    snake: [],
    food: null,
    direction: { x: 1, y: 0 },
    nextDirection: { x: 1, y: 0 },
    accumulator: 0,
    speed: 170,
    running: false,
    raf: 0,
    lastTime: 0
  };

  const removeSwipe = bindSwipe(canvas, {
    left: () => turn(-1, 0),
    right: () => turn(1, 0),
    up: () => turn(0, -1),
    down: () => turn(0, 1)
  });

  function spawnFood() {
    while (true) {
      const food = { x: randomInt(0, gridSize - 1), y: randomInt(0, gridSize - 1) };
      if (!game.snake.some((node) => node.x === food.x && node.y === food.y)) {
        game.food = food;
        return;
      }
    }
  }

  function reset() {
    api.countPlay();
    api.sound("start");
    game.snake = [
      { x: 8, y: 8 },
      { x: 7, y: 8 },
      { x: 6, y: 8 }
    ];
    game.direction = { x: 1, y: 0 };
    game.nextDirection = { x: 1, y: 0 };
    game.accumulator = 0;
    game.speed = 170;
    game.running = true;
    game.lastTime = performance.now();
    api.setCurrent(game.snake.length);
    api.setHint("Swipe or tap the pad.");
    spawnFood();
    api.setPrimary("Restart", reset);
    cancelAnimationFrame(game.raf);
    game.raf = requestAnimationFrame(loop);
  }

  function turn(x, y) {
    if (game.direction.x === -x && game.direction.y === -y) return;
    game.nextDirection = { x, y };
  }

  function step() {
    game.direction = { ...game.nextDirection };
    const head = {
      x: game.snake[0].x + game.direction.x,
      y: game.snake[0].y + game.direction.y
    };

    if (
      head.x < 0 ||
      head.y < 0 ||
      head.x >= gridSize ||
      head.y >= gridSize ||
      game.snake.some((node) => node.x === head.x && node.y === head.y)
    ) {
      game.running = false;
      api.sound("crash");
      api.updateBest(game.snake.length);
      api.setHint("Crash.");
      api.setPrimary("Start", reset);
      return;
    }

    game.snake.unshift(head);

    if (head.x === game.food.x && head.y === game.food.y) {
      api.sound("collect");
      api.setCurrent(game.snake.length);
      api.updateBest(game.snake.length);
      game.speed = Math.max(110, game.speed - 1.5);
      spawnFood();
      api.setHint("Byte collected.");
    } else {
      game.snake.pop();
      api.setCurrent(game.snake.length);
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#07101f";
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(120, 238, 190, 0.07)";
    for (let line = 0; line <= gridSize; line += 1) {
      ctx.beginPath();
      ctx.moveTo(line * cell, 0);
      ctx.lineTo(line * cell, height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, line * cell);
      ctx.lineTo(width, line * cell);
      ctx.stroke();
    }

    function centerOf(node) {
      return {
        x: node.x * cell + cell / 2,
        y: node.y * cell + cell / 2
      };
    }

    function drawOrb(x, y, radius, fill, glow) {
      ctx.beginPath();
      ctx.fillStyle = glow;
      ctx.arc(x, y, radius * 1.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.fillStyle = fill;
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.fillStyle = "rgba(255,255,255,0.34)";
      ctx.arc(x - radius * 0.28, y - radius * 0.28, radius * 0.32, 0, Math.PI * 2);
      ctx.fill();
    }

    if (game.food) {
      const foodX = game.food.x * cell + cell / 2;
      const foodY = game.food.y * cell + cell / 2;
      drawOrb(foodX, foodY, cell * 0.24, "#ffcb54", "rgba(255, 190, 75, 0.18)");
      ctx.beginPath();
      ctx.strokeStyle = "rgba(255, 224, 140, 0.85)";
      ctx.lineWidth = 1.5;
      ctx.moveTo(foodX + cell * 0.08, foodY - cell * 0.08);
      ctx.lineTo(foodX + cell * 0.22, foodY - cell * 0.22);
      ctx.stroke();
    }

    const bodyRadius = cell * 0.28;
    for (let index = game.snake.length - 1; index >= 1; index -= 1) {
      const current = centerOf(game.snake[index]);
      const previous = centerOf(game.snake[index - 1]);
      const widthScale = Math.max(0.62, 1 - index * 0.035);
      ctx.beginPath();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = bodyRadius * 2 * widthScale;
      ctx.strokeStyle = index === 1 ? "#4de39c" : "#37c987";
      ctx.moveTo(current.x, current.y);
      ctx.lineTo(previous.x, previous.y);
      ctx.stroke();
    }

    for (let index = game.snake.length - 1; index >= 1; index -= 1) {
      const node = centerOf(game.snake[index]);
      const radius = Math.max(cell * 0.14, bodyRadius * (1 - index * 0.03));
      ctx.beginPath();
      ctx.fillStyle = "rgba(8, 18, 28, 0.34)";
      ctx.arc(node.x, node.y + 2, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.fillStyle = index === game.snake.length - 1 ? "#31b675" : "#3ad98f";
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.fillStyle = "rgba(180, 255, 212, 0.28)";
      ctx.arc(node.x - radius * 0.24, node.y - radius * 0.24, radius * 0.32, 0, Math.PI * 2);
      ctx.fill();
    }

    if (game.snake.length) {
      const head = centerOf(game.snake[0]);
      const direction = game.direction.x === 0 && game.direction.y === 0 ? { x: 1, y: 0 } : game.direction;
      const headAngle =
        direction.x === 1 ? 0 :
        direction.x === -1 ? Math.PI :
        direction.y === 1 ? Math.PI / 2 :
        -Math.PI / 2;
      const headRadius = bodyRadius * 1.22;

      ctx.save();
      ctx.translate(head.x, head.y);
      ctx.rotate(headAngle);

      ctx.beginPath();
      ctx.fillStyle = "rgba(8, 18, 28, 0.42)";
      ctx.ellipse(0, 2, headRadius * 1.12, headRadius * 0.94, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = "#55efab";
      ctx.ellipse(0, 0, headRadius * 1.1, headRadius * 0.92, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = "#b9ffd9";
      ctx.ellipse(-headRadius * 0.28, -headRadius * 0.24, headRadius * 0.36, headRadius * 0.22, -0.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = "#051018";
      ctx.arc(headRadius * 0.28, -headRadius * 0.28, headRadius * 0.12, 0, Math.PI * 2);
      ctx.arc(headRadius * 0.28, headRadius * 0.28, headRadius * 0.12, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = "#ffffff";
      ctx.arc(headRadius * 0.23, -headRadius * 0.32, headRadius * 0.04, 0, Math.PI * 2);
      ctx.arc(headRadius * 0.23, headRadius * 0.24, headRadius * 0.04, 0, Math.PI * 2);
      ctx.fill();

      if (game.running) {
        ctx.beginPath();
        ctx.strokeStyle = "#ff6d74";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.moveTo(headRadius * 0.98, 0);
        ctx.lineTo(headRadius * 1.4, -3);
        ctx.moveTo(headRadius * 0.98, 0);
        ctx.lineTo(headRadius * 1.4, 3);
        ctx.stroke();
      }

      ctx.restore();
    }
  }

  function loop(timestamp) {
    draw();
    if (!game.running) return;
    const delta = timestamp - game.lastTime;
    game.lastTime = timestamp;
    game.accumulator += delta;
    while (game.accumulator >= game.speed) {
      game.accumulator -= game.speed;
      step();
      if (!game.running) break;
    }
    game.raf = requestAnimationFrame(loop);
  }

  api.setPrimary("Start", reset);
  draw();

  return {
    destroy() {
      cancelAnimationFrame(game.raf);
      removeSwipe();
    },
    onKey(event) {
      const map = {
        ArrowUp: [0, -1],
        ArrowDown: [0, 1],
        ArrowLeft: [-1, 0],
        ArrowRight: [1, 0]
      };
      if (!map[event.key]) return;
      event.preventDefault();
      turn(...map[event.key]);
    }
  };
}

function createLaneSplit(root, api) {
  api.setCurrentLabel("Meters");
  api.setBestLabel("Best Run");

  const stage = document.createElement("div");
  stage.className = "canvas-stage";
  const { canvas, ctx, width, height } = makeCanvas(320, 420);
  stage.appendChild(canvas);
  stage.appendChild(
    buildTouchControls([
      [
        { label: "Left", onPress: () => changeLane(-1) },
        { label: "Right", onPress: () => changeLane(1), accent: true }
      ]
    ])
  );
  root.appendChild(stage);

  const game = {
    lane: 1,
    lanePosition: 1,
    obstacles: [],
    score: 0,
    spawnTimer: 0,
    running: false,
    speed: 172,
    level: 0,
    graceUsed: false,
    raf: 0,
    lastTime: 0
  };

  const removeSwipe = bindSwipe(canvas, {
    left: () => changeLane(-1),
    right: () => changeLane(1)
  });

  const road = {
    horizon: 112,
    playerBaseY: height - 28
  };

  const trafficPalettes = [
    { body: "#d61f2c", roof: "#ff6b76", glass: "#17365e", accent: "#ffe8ea" },
    { body: "#f0bf1f", roof: "#ffe17a", glass: "#1e3f63", accent: "#fff8d8" },
    { body: "#f6f0e3", roof: "#ffffff", glass: "#264766", accent: "#fffdf8" },
    { body: "#14161f", roof: "#4c5266", glass: "#2c4d71", accent: "#f0f3ff" }
  ];

  const playerPalette = {
    body: "#ea1d2d",
    roof: "#ff7c86",
    glass: "#15365c",
    accent: "#fff1f1"
  };

  function getCarDimensions(carWidth) {
    return {
      width: carWidth,
      height: carWidth * 1.62
    };
  }

  function getCarCollisionShape(centerX, baseY, carWidth) {
    const dimensions = getCarDimensions(carWidth);
    const wingHalf = carWidth * 0.26;
    const coreHalf = carWidth * 0.15;
    const noseHalf = carWidth * 0.08;
    const rearHalf = carWidth * 0.22;

    return {
      bounds: {
        left: centerX - wingHalf,
        right: centerX + wingHalf,
        top: baseY - dimensions.height * 0.96,
        bottom: baseY - dimensions.height * 0.06
      },
      nose: {
        left: centerX - noseHalf,
        right: centerX + noseHalf,
        top: baseY - dimensions.height * 0.96,
        bottom: baseY - dimensions.height * 0.58
      },
      core: {
        left: centerX - coreHalf,
        right: centerX + coreHalf,
        top: baseY - dimensions.height * 0.7,
        bottom: baseY - dimensions.height * 0.18
      },
      rear: {
        left: centerX - rearHalf,
        right: centerX + rearHalf,
        top: baseY - dimensions.height * 0.2,
        bottom: baseY - dimensions.height * 0.06
      }
    };
  }

  function intersectsRect(a, b) {
    return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
  }

  function roadMetrics(y) {
    const depth = clamp((y - road.horizon) / (height - road.horizon), 0, 1);
    const roadWidth = 92 + depth * 210;
    const lookAhead = game.score + depth * 1240;
    const sectionLength = 920;
    const section = Math.floor(lookAhead / sectionLength);
    const sectionProgress = (lookAhead % sectionLength) / sectionLength;
    const curveDirection = section % 2 === 0 ? -1 : 1;
    const curveStrength = Math.sin(sectionProgress * Math.PI) * curveDirection;
    const bend = curveStrength * depth * (18 + depth * 24);
    const center = width / 2 + bend;
    const laneWidth = roadWidth / 3;

    return {
      depth,
      roadWidth,
      left: center - roadWidth / 2,
      right: center + roadWidth / 2,
      laneWidth
    };
  }

  function laneCenterAt(lane, y) {
    const metrics = roadMetrics(y);
    return metrics.left + metrics.laneWidth * (lane + 0.5);
  }

  function drawQuad(points, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (let index = 1; index < points.length; index += 1) {
      ctx.lineTo(points[index][0], points[index][1]);
    }
    ctx.closePath();
    ctx.fill();
  }

  function drawPalm(x, baseY, scale) {
    ctx.save();
    ctx.translate(x, baseY);
    ctx.strokeStyle = "#152f3a";
    ctx.lineCap = "round";
    ctx.lineWidth = Math.max(2, scale * 4);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -28 * scale);
    ctx.stroke();

    const fronds = [
      [-18, -32, -2, -26],
      [18, -32, 2, -26],
      [-24, -16, -4, -24],
      [24, -16, 4, -24],
      [0, -42, 0, -24]
    ];

    fronds.forEach(([x1, y1, x2, y2]) => {
      ctx.beginPath();
      ctx.moveTo(x2 * scale, y2 * scale);
      ctx.lineTo(x1 * scale, y1 * scale);
      ctx.stroke();
    });

    ctx.restore();
  }

  function drawRoadScene() {
    const sky = ctx.createLinearGradient(0, 0, 0, road.horizon + 80);
    sky.addColorStop(0, "#10204f");
    sky.addColorStop(0.45, "#243a7a");
    sky.addColorStop(0.78, "#ff5ca3");
    sky.addColorStop(1, "#ffb36b");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, road.horizon + 80);

    const sunY = road.horizon - 18;
    ctx.fillStyle = "#ffd56c";
    ctx.beginPath();
    ctx.arc(width / 2, sunY, 34, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(255, 165, 86, 0.5)";
    ctx.lineWidth = 3;
    for (let line = -22; line <= 22; line += 10) {
      ctx.beginPath();
      ctx.moveTo(width / 2 - 30, sunY + line);
      ctx.lineTo(width / 2 + 30, sunY + line);
      ctx.stroke();
    }

    drawQuad(
      [
        [0, road.horizon + 10],
        [48, road.horizon - 20],
        [108, road.horizon + 12],
        [166, road.horizon - 8],
        [220, road.horizon + 18],
        [272, road.horizon - 14],
        [width, road.horizon + 14],
        [width, road.horizon + 64],
        [0, road.horizon + 64]
      ],
      "#352a68"
    );

    drawQuad(
      [
        [0, road.horizon + 26],
        [84, road.horizon + 10],
        [142, road.horizon + 34],
        [194, road.horizon + 8],
        [250, road.horizon + 30],
        [width, road.horizon + 18],
        [width, height],
        [0, height]
      ],
      "#159b6d"
    );

    for (let y = road.horizon; y < height; y += 8) {
      const nextY = Math.min(height, y + 8);
      const current = roadMetrics(y);
      const next = roadMetrics(nextY);
      const stripe = Math.floor((y + game.score * 0.36) / 24);
      const roadColor = stripe % 2 === 0 ? "#464d61" : "#353b4e";
      const grassColor = stripe % 2 === 0 ? "#159b6d" : "#12885f";
      const shoulderColor = stripe % 2 === 0 ? "#ffe9f2" : "#ff4f7f";
      const shoulderCurrent = 8 + current.depth * 12;
      const shoulderNext = 8 + next.depth * 12;

      drawQuad(
        [
          [0, y],
          [current.left - shoulderCurrent, y],
          [next.left - shoulderNext, nextY],
          [0, nextY]
        ],
        grassColor
      );
      drawQuad(
        [
          [current.right + shoulderCurrent, y],
          [width, y],
          [width, nextY],
          [next.right + shoulderNext, nextY]
        ],
        grassColor
      );

      drawQuad(
        [
          [current.left - shoulderCurrent, y],
          [current.left, y],
          [next.left, nextY],
          [next.left - shoulderNext, nextY]
        ],
        shoulderColor
      );
      drawQuad(
        [
          [current.right, y],
          [current.right + shoulderCurrent, y],
          [next.right + shoulderNext, nextY],
          [next.right, nextY]
        ],
        shoulderColor
      );

      drawQuad(
        [
          [current.left, y],
          [current.right, y],
          [next.right, nextY],
          [next.left, nextY]
        ],
        roadColor
      );

      if (stripe % 2 === 0) {
        [1, 2].forEach((divider) => {
          const topX = current.left + current.laneWidth * divider;
          const bottomX = next.left + next.laneWidth * divider;
          const markerTop = 2 + current.depth * 3;
          const markerBottom = 2 + next.depth * 3;

          drawQuad(
            [
              [topX - markerTop, y],
              [topX + markerTop, y],
              [bottomX + markerBottom, nextY],
              [bottomX - markerBottom, nextY]
            ],
            "rgba(255,255,255,0.82)"
          );
        });
      }
    }

    for (let index = 0; index < 5; index += 1) {
      const depth = ((index * 0.19) + (game.score * 0.0009)) % 1;
      if (depth < 0.12) continue;
      const y = road.horizon + depth * (height - road.horizon);
      const metrics = roadMetrics(y);
      const offset = 18 + depth * 38;
      const scale = 0.45 + depth * 0.9;
      drawPalm(metrics.left - offset, y + 8, scale);
      drawPalm(metrics.right + offset, y + 8, scale);
    }
  }

  function drawCar(centerX, baseY, carWidth, palette, player = false, steer = 0) {
    const carHeight = getCarDimensions(carWidth).height;
    const x = centerX - carWidth / 2;
    const y = baseY - carHeight;
    const lean = steer * carWidth * 0.1;

    ctx.fillStyle = "rgba(8, 10, 20, 0.34)";
    ctx.beginPath();
    ctx.ellipse(centerX, baseY + 5, carWidth * 0.52, carHeight * 0.1, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#0f1117";
    ctx.fillRect(x + carWidth * 0.08, y + carHeight * 0.2, carWidth * 0.11, carHeight * 0.17);
    ctx.fillRect(x + carWidth * 0.81, y + carHeight * 0.2, carWidth * 0.11, carHeight * 0.17);
    ctx.fillRect(x + carWidth * 0.01, y + carHeight * 0.59, carWidth * 0.17, carHeight * 0.23);
    ctx.fillRect(x + carWidth * 0.82, y + carHeight * 0.59, carWidth * 0.17, carHeight * 0.23);

    ctx.fillStyle = palette.accent;
    ctx.fillRect(x + carWidth * 0.24 + lean, y + carHeight * 0.13, carWidth * 0.52, carHeight * 0.042);
    ctx.fillRect(x + carWidth * 0.13 + lean, y + carHeight * 0.85, carWidth * 0.74, carHeight * 0.06);

    ctx.fillStyle = palette.body;
    ctx.beginPath();
    ctx.moveTo(x + carWidth * 0.5 + lean, y + carHeight * 0.13);
    ctx.lineTo(x + carWidth * 0.45 + lean, y + carHeight * 0.24);
    ctx.lineTo(x + carWidth * 0.39 + lean, y + carHeight * 0.41);
    ctx.lineTo(x + carWidth * 0.26 + lean, y + carHeight * 0.58);
    ctx.lineTo(x + carWidth * 0.19 + lean, y + carHeight * 0.78);
    ctx.lineTo(x + carWidth * 0.22 + lean, y + carHeight * 0.89);
    ctx.lineTo(x + carWidth * 0.78 + lean, y + carHeight * 0.89);
    ctx.lineTo(x + carWidth * 0.81 + lean, y + carHeight * 0.78);
    ctx.lineTo(x + carWidth * 0.74 + lean, y + carHeight * 0.58);
    ctx.lineTo(x + carWidth * 0.61 + lean, y + carHeight * 0.41);
    ctx.lineTo(x + carWidth * 0.55 + lean, y + carHeight * 0.24);
    ctx.lineTo(x + carWidth * 0.5 + lean, y + carHeight * 0.13);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = palette.roof;
    ctx.beginPath();
    ctx.moveTo(x + carWidth * 0.29 + lean, y + carHeight * 0.76);
    ctx.lineTo(x + carWidth * 0.33 + lean, y + carHeight * 0.55);
    ctx.lineTo(x + carWidth * 0.42 + lean, y + carHeight * 0.34);
    ctx.lineTo(x + carWidth * 0.58 + lean, y + carHeight * 0.34);
    ctx.lineTo(x + carWidth * 0.67 + lean, y + carHeight * 0.55);
    ctx.lineTo(x + carWidth * 0.71 + lean, y + carHeight * 0.76);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = palette.glass;
    ctx.beginPath();
    ctx.moveTo(x + carWidth * 0.35 + lean, y + carHeight * 0.69);
    ctx.lineTo(x + carWidth * 0.4 + lean, y + carHeight * 0.42);
    ctx.lineTo(x + carWidth * 0.6 + lean, y + carHeight * 0.42);
    ctx.lineTo(x + carWidth * 0.65 + lean, y + carHeight * 0.69);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "rgba(255,255,255,0.22)";
    ctx.fillRect(x + carWidth * 0.488 + lean, y + carHeight * 0.3, carWidth * 0.024, carHeight * 0.47);

    ctx.fillStyle = palette.accent;
    ctx.beginPath();
    ctx.moveTo(x + carWidth * 0.47 + lean, y + carHeight * 0.14);
    ctx.lineTo(x + carWidth * 0.44 + lean, y + carHeight * 0.24);
    ctx.lineTo(x + carWidth * 0.56 + lean, y + carHeight * 0.24);
    ctx.lineTo(x + carWidth * 0.53 + lean, y + carHeight * 0.14);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = player ? "#ffe47b" : "#ffeb95";
    ctx.fillRect(x + carWidth * 0.25 + lean, y + carHeight * 0.14, carWidth * 0.06, Math.max(2, carHeight * 0.02));
    ctx.fillRect(x + carWidth * 0.69 + lean, y + carHeight * 0.14, carWidth * 0.06, Math.max(2, carHeight * 0.02));

    ctx.fillStyle = player ? "#ffbd4d" : "#ff6b8a";
    ctx.fillRect(x + carWidth * 0.475 + lean, y + carHeight * 0.88, carWidth * 0.05, Math.max(2, carHeight * 0.034));
    ctx.fillRect(x + carWidth * 0.41 + lean, y + carHeight * 0.87, carWidth * 0.05, Math.max(2, carHeight * 0.026));
    ctx.fillRect(x + carWidth * 0.54 + lean, y + carHeight * 0.87, carWidth * 0.05, Math.max(2, carHeight * 0.026));

    if (player) {
      ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(x + carWidth * 0.27 + lean, y + carHeight * 0.8);
      ctx.lineTo(x + carWidth * 0.73 + lean, y + carHeight * 0.8);
      ctx.stroke();
    }
  }

  function changeLane(delta) {
    if (!game.running) return;
    const nextLane = clamp(game.lane + delta, 0, 2);
    if (nextLane === game.lane) return;
    game.lane = nextLane;
    api.sound("lane");
  }

  function start() {
    api.countPlay();
    api.sound("start");
    game.lane = 1;
    game.lanePosition = 1;
    game.obstacles = [];
    game.score = 0;
    game.spawnTimer = 0;
    game.running = true;
    game.speed = 172;
    game.level = 0;
    game.graceUsed = false;
    game.lastTime = performance.now();
    api.setCurrent(0);
    api.setHint("Tap sides or swipe lanes.");
    api.setPrimary("Restart", start);
    cancelAnimationFrame(game.raf);
    game.raf = requestAnimationFrame(loop);
  }

  function stop() {
    game.running = false;
    api.sound("crash");
    api.updateBest(Math.floor(game.score));
    api.setHint("Crashed.");
    api.setPrimary("Start", start);
  }

  function registerSoftCrash() {
    if (game.graceUsed) {
      stop("Second hit.");
      return;
    }

    game.graceUsed = true;
    api.sound("scrape");
    api.setHint("Side scrape. Next hit ends the run.");
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    drawRoadScene();

    game.obstacles
      .slice()
      .sort((a, b) => a.y - b.y)
      .forEach((obstacle) => {
        const metrics = roadMetrics(obstacle.y);
        const carWidth = 14 + metrics.depth * 26;
        drawCar(laneCenterAt(obstacle.lane, obstacle.y), obstacle.y, carWidth, obstacle.palette);
      });

    drawCar(
      laneCenterAt(game.lanePosition, road.playerBaseY),
      road.playerBaseY,
      46,
      playerPalette,
      true,
      game.lane - game.lanePosition
    );
  }

  function loop(timestamp) {
    if (!game.running) return;
    const delta = Math.min(32, timestamp - game.lastTime || 16);
    game.lastTime = timestamp;
    const distanceGain = (delta / 1000) * 96;
    game.score += distanceGain;
    game.spawnTimer += delta;
    game.lanePosition += (game.lane - game.lanePosition) * Math.min(1, delta * 0.012);

    const level = Math.floor(game.score / 2000);
    const progress = (game.score % 2000) / 2000;
    if (level > game.level) {
      game.level = level;
      api.sound("level");
      api.setHint(`${level * 2} km. Traffic speeds up.`);
    }

    game.speed = 172 + level * 22 + progress * 18;
    api.setCurrent(Math.floor(game.score));

    const spawnEvery = Math.max(460, 940 - level * 90 - progress * 80);

    if (game.spawnTimer > spawnEvery) {
      game.spawnTimer = 0;
      game.obstacles.push({
        lane: randomInt(0, 2),
        y: road.horizon - 16,
        palette: choice(trafficPalettes),
        hit: false
      });
    }

    game.obstacles = game.obstacles.filter((obstacle) => {
      obstacle.y += (game.speed * delta) / 1000;

      const playerY = road.playerBaseY;
      if (!obstacle.hit) {
        const obstacleWidth = 14 + roadMetrics(obstacle.y).depth * 26;
        const obstacleCenter = laneCenterAt(obstacle.lane, obstacle.y);
        const playerCenter = laneCenterAt(game.lanePosition, playerY);
        const playerShape = getCarCollisionShape(playerCenter, playerY, 46);
        const obstacleShape = getCarCollisionShape(obstacleCenter, obstacle.y, obstacleWidth);
        const isChanging = Math.abs(game.lane - game.lanePosition) > 0.08;

        if (intersectsRect(playerShape.bounds, obstacleShape.bounds)) {
          const directHit =
            intersectsRect(playerShape.core, obstacleShape.core) ||
            intersectsRect(playerShape.core, obstacleShape.nose) ||
            intersectsRect(playerShape.nose, obstacleShape.core);
          const wingScrape =
            intersectsRect(playerShape.nose, obstacleShape.nose) ||
            intersectsRect(playerShape.rear, obstacleShape.rear) ||
            intersectsRect(playerShape.rear, obstacleShape.nose) ||
            intersectsRect(playerShape.nose, obstacleShape.rear);

          if (directHit || (!isChanging && wingScrape)) {
            obstacle.hit = true;
            stop("Direct crash.");
            return false;
          }

          if (wingScrape) {
            obstacle.hit = true;
            registerSoftCrash();
            return false;
          }
        }
      }

      return obstacle.y < height + 56;
    });

    if (game.running) {
      draw();
      game.raf = requestAnimationFrame(loop);
    }
  }

  canvas.addEventListener("pointerdown", (event) => {
    if (!game.running) return;
    const point = mapPointer(event, canvas, width, height);
    changeLane(point.x < width / 2 ? -1 : 1);
  });

  api.setPrimary("Start", start);
  draw();

  return {
    destroy() {
      cancelAnimationFrame(game.raf);
      removeSwipe();
    },
    onKey(event) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        changeLane(-1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        changeLane(1);
      }
    }
  };
}

function createGridStacker(root, api) {
  api.setCurrentLabel("Floors");
  api.setBestLabel("Best Tower");

  const stage = document.createElement("div");
  stage.className = "canvas-stage";
  const { canvas, ctx, width, height } = makeCanvas(320, 400);
  stage.appendChild(canvas);
  stage.appendChild(
    buildTouchControls([
      [{ label: "Drop", onPress: drop, accent: true }]
    ])
  );
  root.appendChild(stage);

  const blockHeight = 20;
  const stackStep = 24;
  const stackBaseY = height - 36;
  const movingStartY = stackBaseY - stackStep;
  const scrollAnchorY = 76;
  const blockColors = ["#ffbf47", "#5ee1ff", "#ff6ca8", "#76f0c2"];

  const game = {
    placed: [],
    moving: null,
    falling: [],
    floors: 0,
    direction: 1,
    running: false,
    raf: 0,
    lastTime: 0
  };

  function reset() {
    api.countPlay();
    api.sound("start");
    game.placed = [{ x: 70, y: stackBaseY, width: 180, color: "#5ee1ff" }];
    game.moving = { x: 0, y: movingStartY, width: 180, color: "#ffbf47" };
    game.falling = [];
    game.floors = 0;
    game.direction = 1;
    game.running = true;
    game.lastTime = performance.now();
    api.setCurrent(0);
    api.setHint("Tap the stage or Drop.");
    api.setPrimary("Restart", reset);
    cancelAnimationFrame(game.raf);
    game.raf = requestAnimationFrame(loop);
  }

  function nextBlockColor() {
    return choice(blockColors);
  }

  function spawnFallingPiece(x, y, pieceWidth, color, drift) {
    if (pieceWidth <= 0) return;
    game.falling.push({
      x,
      y,
      width: pieceWidth,
      color,
      drift,
      vy: 0,
      angle: 0,
      spin: drift * 0.018
    });
  }

  function drawBlockRect(x, y, blockWidth, color, alpha = 1) {
    if (blockWidth <= 0) return;
    ctx.save();
    ctx.globalAlpha = alpha;

    ctx.fillStyle = "rgba(0,0,0,0.28)";
    ctx.fillRect(x + 3, y + 4, blockWidth, blockHeight);

    ctx.fillStyle = color;
    ctx.fillRect(x, y, blockWidth, blockHeight);

    ctx.fillStyle = "rgba(255,255,255,0.18)";
    ctx.fillRect(x + 2, y + 2, Math.max(0, blockWidth - 4), 4);

    ctx.fillStyle = "rgba(8, 14, 28, 0.18)";
    ctx.fillRect(x + 2, y + blockHeight - 5, Math.max(0, blockWidth - 4), 3);

    ctx.strokeStyle = "rgba(255,255,255,0.26)";
    ctx.lineWidth = 1;
    ctx.strokeRect(x + 0.5, y + 0.5, Math.max(0, blockWidth - 1), blockHeight - 1);
    ctx.restore();
  }

  function drop() {
    if (!game.running || !game.moving) return;

    const last = game.placed[game.placed.length - 1];
    const overlapStart = Math.max(last.x, game.moving.x);
    const overlapEnd = Math.min(last.x + last.width, game.moving.x + game.moving.width);
    const overlap = overlapEnd - overlapStart;
    const movingRight = game.moving.x + game.moving.width;

    if (overlap <= 0) {
      spawnFallingPiece(game.moving.x, game.moving.y, game.moving.width, game.moving.color, game.direction * 72);
      game.moving = null;
      game.running = false;
      api.sound("fail");
      api.updateBest(game.floors);
      api.setHint("Missed.");
      api.setPrimary("Start", reset);
      return;
    }

    if (overlapStart > game.moving.x) {
      spawnFallingPiece(
        game.moving.x,
        game.moving.y,
        overlapStart - game.moving.x,
        game.moving.color,
        -64
      );
    }

    if (overlapEnd < movingRight) {
      spawnFallingPiece(
        overlapEnd,
        game.moving.y,
        movingRight - overlapEnd,
        game.moving.color,
        64
      );
    }

    game.floors += 1;
    api.sound("stack", { perfect: overlap === last.width });
    api.setCurrent(game.floors);
    api.updateBest(game.floors);
    game.placed.push({
      x: overlapStart,
      y: game.moving.y,
      width: overlap,
      color: nextBlockColor()
    });

    if (game.moving.y <= scrollAnchorY) {
      game.placed = game.placed.map((block) => ({ ...block, y: block.y + stackStep }));
      game.falling = game.falling.map((piece) => ({ ...piece, y: piece.y + stackStep }));
      game.moving = {
        x: 0,
        y: scrollAnchorY,
        width: overlap,
        color: nextBlockColor()
      };
    } else {
      game.moving = {
        x: 0,
        y: game.moving.y - stackStep,
        width: overlap,
        color: nextBlockColor()
      };
    }
    api.setHint("Stack it.");
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#0f1730";
    ctx.fillRect(0, 0, width, height);

    game.placed.forEach((block) => {
      drawBlockRect(block.x, block.y, block.width, block.color);
    });

    if (game.moving) {
      drawBlockRect(game.moving.x, game.moving.y, game.moving.width, game.moving.color);
    }

    game.falling.forEach((piece) => {
      const alpha = piece.y > height - 40 ? clamp((height + 36 - piece.y) / 76, 0, 1) : 1;
      ctx.save();
      ctx.translate(piece.x + piece.width / 2, piece.y + blockHeight / 2);
      ctx.rotate(piece.angle);
      drawBlockRect(-piece.width / 2, -blockHeight / 2, piece.width, piece.color, alpha);
      ctx.restore();
    });
  }

  function updateFalling(delta) {
    const seconds = delta / 1000;
    game.falling = game.falling.filter((piece) => {
      piece.vy += 860 * seconds;
      piece.x += piece.drift * seconds;
      piece.y += piece.vy * seconds;
      piece.angle += piece.spin * seconds;
      return piece.y < height + 64;
    });
  }

  function updateMoving(delta) {
    if (!game.moving) return;
    game.moving.x += game.direction * delta * 0.14;

    if (game.moving.x <= 0) {
      game.direction = 1;
      game.moving.x = 0;
    } else if (game.moving.x + game.moving.width >= width) {
      game.direction = -1;
      game.moving.x = width - game.moving.width;
    }
  }

  function loop(timestamp) {
    const delta = Math.min(32, timestamp - game.lastTime || 16);
    game.lastTime = timestamp;
    updateFalling(delta);
    if (game.running) updateMoving(delta);
    draw();

    if (!game.running && game.falling.length === 0) return;

    game.raf = requestAnimationFrame(loop);
  }

  canvas.addEventListener("click", drop);
  api.setPrimary("Start", reset);
  draw();

  return {
    destroy() {
      cancelAnimationFrame(game.raf);
    }
  };
}

function createLockPick(root, api) {
  api.setCurrentLabel("Chain");
  api.setBestLabel("Best Chain");

  const stage = document.createElement("div");
  stage.className = "meter-stage";
  stage.innerHTML = `
    <div class="meter-wrap">
      <div class="score-row">
        <div class="score-pill">Timing <strong>Tap</strong></div>
        <div class="score-pill">Zone <strong>Forgiving</strong></div>
      </div>
      <div class="meter-track">
        <div class="meter-target"></div>
        <div class="meter-cursor"></div>
      </div>
    </div>
  `;
  stage.appendChild(
    buildTouchControls([
      [{ label: "Lock", onPress: tapLock, accent: true }]
    ])
  );
  root.appendChild(stage);

  const track = stage.querySelector(".meter-track");
  const target = stage.querySelector(".meter-target");
  const cursor = stage.querySelector(".meter-cursor");
  const infoValues = stage.querySelectorAll(".score-pill strong");
  const tempoValue = infoValues[0];
  const zoneValue = infoValues[1];

  const game = {
    running: false,
    chain: 0,
    speed: 138,
    targetWidth: 152,
    targetLeft: 84,
    cursorX: 0,
    direction: 1,
    raf: 0,
    lastTime: 0
  };

  function trackWidth() {
    return track.clientWidth || 320;
  }

  function updateMeters() {
    const widthRatio = game.targetWidth / Math.max(1, trackWidth());
    let zoneLabel = "Wide";
    if (widthRatio < 0.34) zoneLabel = "Steady";
    if (widthRatio < 0.28) zoneLabel = "Tight";
    if (widthRatio < 0.22) zoneLabel = "Sharp";

    let tempoLabel = "Calm";
    if (game.speed >= 170) tempoLabel = "Focus";
    if (game.speed >= 215) tempoLabel = "Quick";
    if (game.speed >= 265) tempoLabel = "Fast";

    if (tempoValue) tempoValue.textContent = tempoLabel;
    if (zoneValue) zoneValue.textContent = zoneLabel;
  }

  function applyDifficulty() {
    const phase = Math.floor(game.chain / 3);
    game.speed = Math.min(308, 138 + phase * 16 + Math.floor(game.chain / 8) * 8);
    game.targetWidth = Math.max(74, 152 - phase * 8 - Math.floor(game.chain / 6) * 3);
    updateMeters();
  }

  function positionTarget() {
    const maxLeft = trackWidth() - game.targetWidth;
    game.targetLeft = randomInt(0, Math.max(0, maxLeft));
    target.style.width = `${game.targetWidth}px`;
    target.style.left = `${game.targetLeft}px`;
  }

  function renderCursor() {
    cursor.style.left = `${game.cursorX}px`;
    return game.cursorX;
  }

  function start() {
    api.countPlay();
    api.sound("start");
    game.running = true;
    game.chain = 0;
    game.cursorX = 0;
    game.direction = 1;
    applyDifficulty();
    positionTarget();
    renderCursor();
    game.lastTime = performance.now();
    api.setCurrent(0);
    api.setHint("Start wide. Every few locks the pace tightens.");
    api.setPrimary("Restart", start);
    cancelAnimationFrame(game.raf);
    game.raf = requestAnimationFrame(loop);
  }

  function stop(message) {
    game.running = false;
    api.updateBest(game.chain);
    api.setHint(message);
    api.setPrimary("Start", start);
  }

  function tapLock() {
    if (!game.running) return;
    const center = game.cursorX + 9;
    const targetStart = game.targetLeft;
    const targetEnd = game.targetLeft + game.targetWidth;
    const missDistance = center < targetStart ? targetStart - center : center > targetEnd ? center - targetEnd : 0;
    const inside = missDistance === 0;
    const grace = Math.max(4, Math.round(game.targetWidth * 0.06));

    if (!inside && missDistance > grace) {
      api.sound("fail");
      stop("Lock missed.");
      return;
    }

    game.chain += 1;
    api.sound("lock");
    applyDifficulty();
    api.setCurrent(game.chain);
    api.updateBest(game.chain);
    if (!inside) {
      api.setHint(`${game.chain} locks. Close call.`);
    } else if (game.chain < 4) {
      api.setHint(`${game.chain} clean locks.`);
    } else {
      api.setHint(`${game.chain} locks. Pace rising.`);
    }
    positionTarget();
  }

  function updateCursor(delta) {
    const distance = (game.speed * delta) / 1000;
    const maxX = Math.max(0, trackWidth() - 18);
    game.cursorX += distance * game.direction;

    if (game.cursorX <= 0) {
      game.cursorX = 0;
      game.direction = 1;
    } else if (game.cursorX >= maxX) {
      game.cursorX = maxX;
      game.direction = -1;
    }
  }

  function loop(timestamp) {
    const delta = Math.min(32, timestamp - (game.lastTime || timestamp - 16));
    game.lastTime = timestamp;
    if (game.running) {
      updateCursor(delta);
    }
    renderCursor();
    if (!game.running) return;
    game.raf = requestAnimationFrame(loop);
  }

  stage.addEventListener("pointerdown", (event) => {
    if (event.target.closest(".touch-controls")) return;
    event.preventDefault();
    tapLock();
  });
  api.setPrimary("Start", start);
  updateMeters();
  positionTarget();
  renderCursor();

  return {
    destroy() {
      cancelAnimationFrame(game.raf);
    }
  };
}

function createPokerDice(root, api) {
  api.setCurrentLabel("Score");
  api.setBestLabel("Best Run");

  const TOTAL_ROUNDS = 8;
  const HOLD_BONUS = 2;
  const PIP_MAP = {
    1: [4],
    2: [0, 8],
    3: [0, 4, 8],
    4: [0, 2, 6, 8],
    5: [0, 2, 4, 6, 8],
    6: [0, 2, 3, 5, 6, 8]
  };
  const PAYTABLE = [
    { name: "Five Kind", score: 50 },
    { name: "Straight", score: 40 },
    { name: "Four Kind", score: 32 },
    { name: "Full House", score: 28 },
    { name: "Three Kind", score: 18 },
    { name: "Two Pair", score: 14 },
    { name: "Pair", score: 8 },
    { name: "High Dice", score: "sum" }
  ];

  const stage = document.createElement("div");
  stage.className = "dom-stage dice-stage";
  stage.innerHTML = `
    <div class="score-row">
      <div class="score-pill">Round <strong data-dice-round>1 / ${TOTAL_ROUNDS}</strong></div>
      <div class="score-pill">Rolls <strong data-dice-rolls>2</strong></div>
      <div class="score-pill">Preview <strong data-dice-preview>0</strong></div>
    </div>
    <div class="dice-grid" data-dice-grid></div>
    <div class="dice-hand-panel">
      <div class="dice-hand-copy">
        <strong data-dice-hand>High Dice</strong>
        <span data-dice-bonus>Hold bonus +0</span>
      </div>
      <p data-dice-note>Roll up to three times. Hold what you like, then bank the hand.</p>
    </div>
    <div class="dice-paytable">
      ${PAYTABLE.map((entry) => `<div class="dice-paytable-row"><span>${entry.name}</span><strong>${entry.score}</strong></div>`).join("")}
    </div>
  `;
  root.appendChild(stage);

  const roundValue = stage.querySelector("[data-dice-round]");
  const rollsValue = stage.querySelector("[data-dice-rolls]");
  const previewValue = stage.querySelector("[data-dice-preview]");
  const handValue = stage.querySelector("[data-dice-hand]");
  const bonusValue = stage.querySelector("[data-dice-bonus]");
  const noteValue = stage.querySelector("[data-dice-note]");
  const diceGrid = stage.querySelector("[data-dice-grid]");

  const diceButtons = Array.from({ length: 5 }, (_, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "dice-tile";
    button.dataset.index = String(index);
    button.innerHTML = `
      <span class="dice-hold-tag">Hold</span>
      <span class="die-face" aria-hidden="true">
        ${Array.from({ length: 9 }, () => '<span class="die-spot"></span>').join("")}
      </span>
      <span class="dice-value"></span>
    `;
    button.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      toggleHold(index);
    });
    diceGrid.appendChild(button);
    return button;
  });

  const game = {
    running: false,
    round: 1,
    score: 0,
    rollsLeft: 0,
    dice: [1, 1, 1, 1, 1],
    holds: [false, false, false, false, false],
    raf: 0
  };

  function rollOne() {
    return randomInt(1, 6);
  }

  function handFromDice(dice, rollsLeft) {
    const countsMap = new Map();
    dice.forEach((value) => {
      countsMap.set(value, (countsMap.get(value) || 0) + 1);
    });
    const counts = Array.from(countsMap.values()).sort((a, b) => b - a);
    const unique = Array.from(countsMap.keys()).sort((a, b) => a - b);
    const straight = unique.length === 5 && unique[4] - unique[0] === 4;
    const total = dice.reduce((sum, value) => sum + value, 0);
    let name = "High Dice";
    let base = total;

    if (counts[0] === 5) {
      name = "Five Kind";
      base = 50;
    } else if (straight) {
      name = "Straight";
      base = 40;
    } else if (counts[0] === 4) {
      name = "Four Kind";
      base = 32;
    } else if (counts[0] === 3 && counts[1] === 2) {
      name = "Full House";
      base = 28;
    } else if (counts[0] === 3) {
      name = "Three Kind";
      base = 18;
    } else if (counts[0] === 2 && counts[1] === 2) {
      name = "Two Pair";
      base = 14;
    } else if (counts[0] === 2) {
      name = "Pair";
      base = 8;
    }

    const bonus = rollsLeft * HOLD_BONUS;
    return {
      name,
      base,
      bonus,
      total: base + bonus
    };
  }

  function updatePreview() {
    const preview = handFromDice(game.dice, game.rollsLeft);
    roundValue.textContent = `${game.round} / ${TOTAL_ROUNDS}`;
    rollsValue.textContent = String(game.rollsLeft);
    previewValue.textContent = String(preview.total);
    handValue.textContent = preview.name;
    bonusValue.textContent = preview.bonus > 0 ? `Hold bonus +${preview.bonus}` : "Hold bonus +0";
    noteValue.textContent = game.rollsLeft > 0 ? "Tap dice to hold. Roll again or bank now." : "No rolls left. Bank this hand.";
    return preview;
  }

  function syncDice() {
    diceButtons.forEach((button, index) => {
      const value = game.dice[index];
      const held = game.holds[index];
      button.classList.toggle("is-held", held);
      button.setAttribute("aria-pressed", held ? "true" : "false");
      button.setAttribute("aria-label", `Die ${index + 1}, ${value}${held ? ", held" : ""}`);
      button.querySelector(".dice-value").textContent = String(value);

      const spots = button.querySelectorAll(".die-spot");
      const active = new Set(PIP_MAP[value]);
      spots.forEach((spot, spotIndex) => {
        spot.classList.toggle("is-on", active.has(spotIndex));
      });
    });
  }

  function syncActions() {
    if (!game.running) {
      api.setPrimary("Start", start);
      api.setSecondary("", null);
      return;
    }

    if (game.rollsLeft > 0) {
      api.setPrimary(`Roll ${game.rollsLeft}`, () => rollDice(true));
      api.setSecondary("Bank", bankRound);
      return;
    }

    api.setPrimary("Bank", bankRound);
    api.setSecondary("", null);
  }

  function startRound(isFreshRun = false) {
    game.holds = game.holds.map(() => false);
    game.rollsLeft = 3;
    rollDice(false);
    if (!isFreshRun) {
      api.sound("round");
    }
    api.setHint(`Round ${game.round}. Build the best hand.`);
  }

  function start() {
    api.countPlay();
    api.sound("start");
    game.running = true;
    game.round = 1;
    game.score = 0;
    game.dice = [1, 1, 1, 1, 1];
    game.holds = [false, false, false, false, false];
    api.setCurrent(0);
    startRound(true);
    syncActions();
    api.setHint("Roll up to three times, hold useful dice, then bank the hand.");
  }

  function stop(message) {
    game.running = false;
    api.updateBest(game.score);
    api.setHint(message);
    syncActions();
  }

  function rollDice(playSound = true) {
    if (!game.running || game.rollsLeft <= 0) return;
    game.dice = game.dice.map((value, index) => (game.holds[index] ? value : rollOne()));
    game.rollsLeft -= 1;
    syncDice();
    const preview = updatePreview();
    syncActions();
    if (playSound) {
      api.sound("launch");
    }
    if (game.rollsLeft === 0) {
      api.setHint(`${preview.name} ready. Bank this hand.`);
    }
  }

  function toggleHold(index) {
    if (!game.running || game.rollsLeft === 3 || game.rollsLeft === 0) return;
    game.holds[index] = !game.holds[index];
    syncDice();
    updatePreview();
    api.sound(game.holds[index] ? "collect" : "slide");
  }

  function bankRound() {
    if (!game.running) return;
    const preview = handFromDice(game.dice, game.rollsLeft);
    game.score += preview.total;
    api.setCurrent(game.score);

    if (game.round === TOTAL_ROUNDS) {
      api.sound("level");
      stop(`Run complete. ${preview.name} for ${preview.total}.`);
      return;
    }

    game.round += 1;
    startRound(false);
    syncActions();
    api.setHint(`${preview.name} banked for ${preview.total}. Round ${game.round}.`);
  }

  syncDice();
  updatePreview();
  syncActions();

  return {
    destroy() {
      cancelAnimationFrame(game.raf);
    },
    onKey(event) {
      if (event.key >= "1" && event.key <= "5") {
        event.preventDefault();
        toggleHold(Number(event.key) - 1);
      }
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        if (!game.running) {
          start();
          return;
        }
        if (game.rollsLeft > 0) {
          rollDice(true);
          return;
        }
        bankRound();
      }
      if (event.key.toLowerCase() === "b") {
        event.preventDefault();
        bankRound();
      }
      if (event.key.toLowerCase() === "r") {
        event.preventDefault();
        rollDice(true);
      }
    }
  };
}

function createDominoes(root, api) {
  api.setCurrentLabel("Score");
  api.setBestLabel("Best Match");

  const PIP_MAP = {
    0: [],
    1: [4],
    2: [0, 8],
    3: [0, 4, 8],
    4: [0, 2, 6, 8],
    5: [0, 2, 4, 6, 8],
    6: [0, 2, 3, 5, 6, 8]
  };

  const stage = document.createElement("div");
  stage.className = "dom-stage domino-stage";
  stage.innerHTML = `
    <div class="score-row">
      <div class="score-pill">Round <strong data-domino-round>1</strong></div>
      <div class="score-pill">Boneyard <strong data-domino-boneyard>0</strong></div>
      <div class="score-pill">CPU <strong data-domino-cpu-count>0</strong></div>
    </div>
    <div class="domino-board">
      <div class="domino-rack domino-rack-cpu" data-domino-cpu></div>
      <div class="domino-chain-panel">
        <div class="domino-ends">
          <div class="domino-end-chip">Left <strong data-domino-left>-</strong></div>
          <div class="domino-end-chip">Right <strong data-domino-right>-</strong></div>
        </div>
        <div class="domino-chain" data-domino-chain></div>
        <p class="domino-note" data-domino-note>Tap a tile to play it.</p>
      </div>
      <div class="domino-controls">
        <button class="touch-button" type="button" data-domino-draw>Draw</button>
        <button class="touch-button" type="button" data-domino-pass>Pass</button>
        <button class="touch-button is-accent" type="button" data-domino-left-play hidden>Left</button>
        <button class="touch-button is-accent" type="button" data-domino-right-play hidden>Right</button>
      </div>
      <div class="domino-rack domino-rack-player" data-domino-player></div>
    </div>
  `;
  root.appendChild(stage);

  const roundValue = stage.querySelector("[data-domino-round]");
  const boneyardValue = stage.querySelector("[data-domino-boneyard]");
  const cpuCountValue = stage.querySelector("[data-domino-cpu-count]");
  const leftValue = stage.querySelector("[data-domino-left]");
  const rightValue = stage.querySelector("[data-domino-right]");
  const cpuRack = stage.querySelector("[data-domino-cpu]");
  const chainNode = stage.querySelector("[data-domino-chain]");
  const playerRack = stage.querySelector("[data-domino-player]");
  const noteValue = stage.querySelector("[data-domino-note]");
  const drawButton = stage.querySelector("[data-domino-draw]");
  const passButton = stage.querySelector("[data-domino-pass]");
  const leftPlayButton = stage.querySelector("[data-domino-left-play]");
  const rightPlayButton = stage.querySelector("[data-domino-right-play]");

  const game = {
    running: false,
    round: 1,
    score: 0,
    playerHand: [],
    cpuHand: [],
    boneyard: [],
    chain: [],
    leftEnd: null,
    rightEnd: null,
    selectedId: null,
    turn: "player",
    passCount: 0,
    cpuTimer: 0
  };

  function tileId(a, b) {
    const low = Math.min(a, b);
    const high = Math.max(a, b);
    return `${low}-${high}`;
  }

  function createDeck() {
    const deck = [];
    for (let left = 0; left <= 6; left += 1) {
      for (let right = left; right <= 6; right += 1) {
        deck.push({ id: tileId(left, right), a: left, b: right });
      }
    }
    return deck;
  }

  function shuffle(list) {
    const next = [...list];
    for (let index = next.length - 1; index > 0; index -= 1) {
      const swapIndex = randomInt(0, index);
      [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
    }
    return next;
  }

  function sortHand(hand) {
    hand.sort((first, second) => {
      const firstDouble = first.a === first.b ? 1 : 0;
      const secondDouble = second.a === second.b ? 1 : 0;
      if (secondDouble !== firstDouble) return secondDouble - firstDouble;
      return (second.a + second.b) - (first.a + first.b);
    });
  }

  function pipTotal(hand) {
    return hand.reduce((sum, tile) => sum + tile.a + tile.b, 0);
  }

  function getPlayableSides(tile) {
    if (!game.chain.length) return ["start"];
    const sides = [];
    if (tile.a === game.leftEnd || tile.b === game.leftEnd) sides.push("left");
    if (tile.a === game.rightEnd || tile.b === game.rightEnd) sides.push("right");
    return sides;
  }

  function playerHasPlayable() {
    return game.playerHand.some((tile) => getPlayableSides(tile).length > 0);
  }

  function cpuHasPlayable() {
    return game.cpuHand.some((tile) => getPlayableSides(tile).length > 0);
  }

  function chooseRandomStarter() {
    const owner = Math.random() < 0.5 ? "player" : "cpu";
    const hand = owner === "player" ? game.playerHand : game.cpuHand;
    const tile = hand[randomInt(0, hand.length - 1)];
    return { owner, tile };
  }

  function removeTile(hand, id) {
    const index = hand.findIndex((tile) => tile.id === id);
    if (index === -1) return null;
    return hand.splice(index, 1)[0];
  }

  function orientTile(tile, side) {
    if (side === "start" || !game.chain.length) {
      return { id: tile.id, left: tile.a, right: tile.b };
    }

    if (side === "left") {
      if (tile.b === game.leftEnd) {
        return { id: tile.id, left: tile.a, right: tile.b };
      }
      return { id: tile.id, left: tile.b, right: tile.a };
    }

    if (tile.a === game.rightEnd) {
      return { id: tile.id, left: tile.a, right: tile.b };
    }
    return { id: tile.id, left: tile.b, right: tile.a };
  }

  function buildTileMarkup(tile, faceDown = false) {
    const halfMarkup = (value) => `
      <span class="domino-half" data-value="${value}" aria-hidden="true">
        ${Array.from({ length: 9 }, (_, index) => `<span class="domino-pip${PIP_MAP[value].includes(index) ? " is-on" : ""}"></span>`).join("")}
      </span>
    `;

    if (faceDown) {
      return `
        <span class="domino-half domino-half-back"></span>
        <span class="domino-divider" aria-hidden="true"></span>
        <span class="domino-half domino-half-back"></span>
      `;
    }

    return `
      ${halfMarkup(tile.a ?? tile.left)}
      <span class="domino-divider" aria-hidden="true"></span>
      ${halfMarkup(tile.b ?? tile.right)}
    `;
  }

  function createRackPlaceholder(text, extraClass = "") {
    const node = document.createElement("div");
    node.className = `domino-empty ${extraClass}`.trim();
    node.textContent = text;
    return node;
  }

  function renderCpuRack() {
    cpuRack.innerHTML = "";
    if (!game.running) {
      cpuRack.appendChild(createRackPlaceholder("CPU hand waiting", "is-cpu"));
      return;
    }
    game.cpuHand.forEach((tile, index) => {
      const back = document.createElement("div");
      back.className = "domino-tile domino-tile-back";
      back.setAttribute("aria-label", `CPU tile ${index + 1}`);
      back.innerHTML = buildTileMarkup(tile, true);
      cpuRack.appendChild(back);
    });
  }

  function renderChain() {
    chainNode.innerHTML = "";
    if (!game.chain.length) {
      chainNode.appendChild(createRackPlaceholder("Chain waiting for first tile"));
      return;
    }

    const boardWidth = chainNode.clientWidth || root.clientWidth || window.innerWidth - 96;
    const tilesPerRow = clamp(Math.floor(boardWidth / 72), 4, 7);

    for (let start = 0; start < game.chain.length; start += tilesPerRow) {
      const row = document.createElement("div");
      const rowIndex = Math.floor(start / tilesPerRow);
      row.className = `domino-chain-row${rowIndex % 2 === 1 ? " is-reverse" : ""}`;
      const segment = game.chain
        .slice(start, start + tilesPerRow)
        .map((tile, offset) => ({ tile, chainIndex: start + offset }));
      const visibleTiles = rowIndex % 2 === 1 ? [...segment].reverse() : segment;

      visibleTiles.forEach(({ tile, chainIndex }) => {
        const node = document.createElement("div");
        node.className = `domino-tile domino-tile-board${tile.left === tile.right ? " is-double" : ""}`;
        node.innerHTML = buildTileMarkup({ a: tile.left, b: tile.right });
        if (chainIndex === 0) {
          node.classList.add("is-open-left");
          node.setAttribute("data-open-label", String(game.leftEnd));
        }
        if (chainIndex === game.chain.length - 1) {
          node.classList.add("is-open-right");
          node.setAttribute("data-open-label", String(game.rightEnd));
        }
        row.appendChild(node);
      });

      chainNode.appendChild(row);
    }
  }

  function renderPlayerRack() {
    playerRack.innerHTML = "";
    if (!game.running) {
      playerRack.appendChild(createRackPlaceholder("Press Start to deal your hand"));
      return;
    }
    sortHand(game.playerHand);
    game.playerHand.forEach((tile, index) => {
      const playableSides = getPlayableSides(tile);
      const button = document.createElement("button");
      button.type = "button";
      button.className = "domino-tile domino-tile-player";
      if (game.selectedId === tile.id) button.classList.add("is-selected");
      if (playableSides.length) button.classList.add("is-playable");
      if (!game.running || game.turn !== "player") button.classList.add("is-disabled");
      button.setAttribute("aria-label", `Tile ${index + 1}: ${tile.a}-${tile.b}`);
      button.innerHTML = buildTileMarkup(tile);
      button.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        selectPlayerTile(tile.id);
      });
      playerRack.appendChild(button);
    });
  }

  function renderControls() {
    const selectedTile = game.playerHand.find((tile) => tile.id === game.selectedId);
    const selectedSides = selectedTile ? getPlayableSides(selectedTile) : [];
    const canDraw = game.running && game.turn === "player" && !playerHasPlayable() && game.boneyard.length > 0;
    const canPass = game.running && game.turn === "player" && !playerHasPlayable() && game.boneyard.length === 0;

    drawButton.disabled = !canDraw;
    passButton.disabled = !canPass;

    leftPlayButton.hidden = !(selectedSides.includes("left") && selectedSides.length > 1);
    rightPlayButton.hidden = !(selectedSides.includes("right") && selectedSides.length > 1);
  }

  function renderStatus() {
    roundValue.textContent = String(game.round);
    boneyardValue.textContent = String(game.boneyard.length);
    cpuCountValue.textContent = String(game.cpuHand.length);
    leftValue.textContent = game.leftEnd ?? "-";
    rightValue.textContent = game.rightEnd ?? "-";
  }

  function render() {
    renderStatus();
    renderCpuRack();
    renderChain();
    renderPlayerRack();
    renderControls();
  }

  function clearCpuTimer() {
    if (game.cpuTimer) {
      window.clearTimeout(game.cpuTimer);
      game.cpuTimer = 0;
    }
  }

  function updateNote(text) {
    noteValue.textContent = text;
  }

  function playTile(owner, id, side) {
    const hand = owner === "player" ? game.playerHand : game.cpuHand;
    const tile = removeTile(hand, id);
    if (!tile) return null;

    const oriented = orientTile(tile, side);
    if (!game.chain.length || side === "start") {
      game.chain = [oriented];
    } else if (side === "left") {
      game.chain.unshift(oriented);
    } else {
      game.chain.push(oriented);
    }

    game.leftEnd = game.chain[0].left;
    game.rightEnd = game.chain[game.chain.length - 1].right;
    game.selectedId = null;
    game.passCount = 0;
    sortHand(game.playerHand);
    sortHand(game.cpuHand);
    api.sound(tile.a === tile.b ? "lock" : "brick");
    render();
    return {
      tile,
      oriented,
      isDouble: tile.a === tile.b
    };
  }

  function scoreRound(message, gained) {
    game.score += gained;
    api.setCurrent(game.score);
    api.updateBest(game.score);
    api.sound("level");
    api.setHint(`${message} +${gained} points.`);
    game.round += 1;
    startRound(false);
  }

  function stop(message) {
    game.running = false;
    clearCpuTimer();
    api.updateBest(game.score);
    api.sound("fail");
    api.setHint(message);
    api.setPrimary("Start", start);
    api.setSecondary("", null);
    render();
  }

  function maybeResolveRound() {
    if (!game.running) return true;

    if (game.playerHand.length === 0) {
      scoreRound("Hand cleared", pipTotal(game.cpuHand));
      return true;
    }

    if (game.cpuHand.length === 0) {
      stop("CPU emptied its hand.");
      return true;
    }

    if (game.passCount >= 2 && game.boneyard.length === 0) {
      const playerPips = pipTotal(game.playerHand);
      const cpuPips = pipTotal(game.cpuHand);
      if (playerPips < cpuPips) {
        scoreRound("Blocked round won", cpuPips - playerPips);
        return true;
      }
      if (playerPips === cpuPips) {
        api.sound("round");
        api.setHint("Blocked draw. Redealing.");
        game.round += 1;
        startRound(false);
        return true;
      }
      stop("Blocked round lost. CPU held fewer pips.");
      return true;
    }

    return false;
  }

  function chooseCpuMove() {
    const playable = game.cpuHand
      .map((tile) => ({ tile, sides: getPlayableSides(tile) }))
      .filter((entry) => entry.sides.length > 0);
    if (!playable.length) return null;

    const supportCount = (value, tileIdToSkip) =>
      game.cpuHand.filter((tile) => tile.id !== tileIdToSkip && (tile.a === value || tile.b === value)).length;

    let best = null;
    playable.forEach((entry) => {
      entry.sides.forEach((side) => {
        const oriented = orientTile(entry.tile, side);
        const openValue = side === "left" ? oriented.left : oriented.right;
        const score =
          (entry.tile.a + entry.tile.b) * 3 +
          (entry.tile.a === entry.tile.b ? 5 : 0) +
          supportCount(openValue, entry.tile.id) * 4;
        if (!best || score > best.score) {
          best = { id: entry.tile.id, side, score };
        }
      });
    });

    return best;
  }

  function beginPlayerTurn(message) {
    if (!game.running) return;
    game.turn = "player";
    updateNote(message || (playerHasPlayable() ? "Tap a playable tile. If both ends fit, choose a side." : "No match in hand. Draw from the boneyard."));
    render();
  }

  function cpuTurn() {
    clearCpuTimer();
    if (!game.running || game.turn !== "cpu") return;

    while (!cpuHasPlayable() && game.boneyard.length > 0) {
      game.cpuHand.push(game.boneyard.pop());
      api.sound("launch");
    }
    sortHand(game.cpuHand);

    const move = chooseCpuMove();
    if (!move) {
      game.passCount += 1;
      updateNote("CPU passes.");
      render();
      if (maybeResolveRound()) return;
      beginPlayerTurn("CPU passed. Your turn.");
      return;
    }

    const played = playTile("cpu", move.id, move.side);
    if (!played) return;
    updateNote(played.isDouble ? "CPU dropped a double." : `CPU played ${move.side}.`);
    if (maybeResolveRound()) return;
    if (played.isDouble) {
      queueCpuTurn("CPU played a double and goes again.");
      return;
    }
    beginPlayerTurn("Your turn.");
  }

  function queueCpuTurn(message = "CPU turn.") {
    if (!game.running) return;
    game.turn = "cpu";
    updateNote(message);
    render();
    clearCpuTimer();
    game.cpuTimer = window.setTimeout(cpuTurn, 520);
  }

  function startRound(isNewMatch) {
    clearCpuTimer();
    let deck = shuffle(createDeck());
    game.playerHand = deck.splice(0, 7);
    game.cpuHand = deck.splice(0, 7);
    game.boneyard = deck;
    game.chain = [];
    game.leftEnd = null;
    game.rightEnd = null;
    game.selectedId = null;
    game.passCount = 0;
    sortHand(game.playerHand);
    sortHand(game.cpuHand);

    const starter = chooseRandomStarter();
    if (starter) {
      const opening = playTile(starter.owner, starter.tile.id, "start");
      if (!opening) return;
      if (starter.owner === "player") {
        if (opening.isDouble) {
          beginPlayerTurn(isNewMatch ? `You opened with a double ${starter.tile.a}-${starter.tile.b}. Play again.` : `Round ${game.round}. Double opening, your turn again.`);
          api.setHint("Doubles give you another move.");
        } else {
          queueCpuTurn(isNewMatch ? `You opened with ${starter.tile.a}-${starter.tile.b}. CPU turn.` : `Round ${game.round}. You opened. CPU turn.`);
          api.setHint("Match ends when you lose a hand. Keep scoring while you survive.");
        }
      } else {
        if (opening.isDouble) {
          queueCpuTurn(isNewMatch ? `CPU opened with double ${starter.tile.a}-${starter.tile.b}. CPU goes again.` : `Round ${game.round}. CPU opened with a double.`);
          api.setHint("Doubles grant another turn, so wait for the next CPU move.");
        } else {
          beginPlayerTurn(isNewMatch ? `CPU opened with ${starter.tile.a}-${starter.tile.b}.` : `Round ${game.round}. CPU opened.`);
          api.setHint("Tap a tile to play it. Draw only when you have no move.");
        }
      }
    }
  }

  function start() {
    api.countPlay();
    api.sound("start");
    game.running = true;
    game.round = 1;
    game.score = 0;
    api.setCurrent(0);
    api.setPrimary("Restart", start);
    api.setSecondary("", null);
    startRound(true);
  }

  function selectPlayerTile(id) {
    if (!game.running || game.turn !== "player") return;
    if (game.selectedId === id) {
      game.selectedId = null;
      updateNote("Selection cleared.");
      render();
      return;
    }
    const tile = game.playerHand.find((entry) => entry.id === id);
    if (!tile) return;
    const sides = getPlayableSides(tile);

    if (!sides.length) {
      api.sound("deny");
      updateNote(`That tile does not fit. Open ends are ${game.leftEnd} and ${game.rightEnd}.`);
      render();
      return;
    }

    if (sides.length === 1) {
      const played = playTile("player", id, sides[0]);
      if (!played) return;
      updateNote(played.isDouble ? "Double played. Go again." : `You played ${sides[0]}.`);
      if (maybeResolveRound()) return;
      if (played.isDouble) {
        beginPlayerTurn("Double down. Play one more tile.");
        api.setHint("Doubles keep the turn.");
        return;
      }
      queueCpuTurn("CPU turn.");
      return;
    }

    game.selectedId = id;
    updateNote("That tile fits both ends. Choose left or right.");
    api.sound("ui");
    render();
  }

  function playSelectedSide(side) {
    if (!game.running || game.turn !== "player" || !game.selectedId) return;
    const played = playTile("player", game.selectedId, side);
    if (!played) return;
    updateNote(played.isDouble ? `Double on ${side}. Go again.` : `You played ${side}.`);
    if (maybeResolveRound()) return;
    if (played.isDouble) {
      beginPlayerTurn("Double down. Play one more tile.");
      api.setHint("Doubles keep the turn.");
      return;
    }
    queueCpuTurn("CPU turn.");
  }

  function drawForPlayer() {
    if (!game.running || game.turn !== "player") return;
    if (playerHasPlayable()) {
      updateNote("You already have a playable tile.");
      api.sound("deny");
      return;
    }
    if (!game.boneyard.length) {
      updateNote("Boneyard is empty. Pass if you still cannot play.");
      api.sound("deny");
      render();
      return;
    }

    const drawn = game.boneyard.pop();
    game.playerHand.push(drawn);
    sortHand(game.playerHand);
    api.sound("launch");
    const playable = getPlayableSides(drawn).length > 0;
    updateNote(playable ? `Drew ${drawn.a}-${drawn.b}. It can play.` : `Drew ${drawn.a}-${drawn.b}. Still no fit.`);
    render();
  }

  function passPlayer() {
    if (!game.running || game.turn !== "player") return;
    if (playerHasPlayable()) {
      updateNote("You can still play a tile.");
      api.sound("deny");
      return;
    }
    if (game.boneyard.length > 0) {
      updateNote("Draw first. The boneyard still has tiles.");
      api.sound("deny");
      return;
    }

    game.passCount += 1;
    updateNote("You pass.");
    render();
    if (maybeResolveRound()) return;
    queueCpuTurn("CPU turn after your pass.");
  }

  drawButton.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    drawForPlayer();
  });
  passButton.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    passPlayer();
  });
  leftPlayButton.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    playSelectedSide("left");
  });
  rightPlayButton.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    playSelectedSide("right");
  });

  api.setPrimary("Start", start);
  api.setSecondary("", null);
  api.setHint("Start a match, then tap a tile to play the chain.");
  updateNote("Press Start to deal seven tiles.");
  render();

  return {
    destroy() {
      clearCpuTimer();
    },
    onKey(event) {
      if (event.key.toLowerCase() === "d") {
        event.preventDefault();
        drawForPlayer();
      }
      if (event.key.toLowerCase() === "p") {
        event.preventDefault();
        passPlayer();
      }
      if (event.key.toLowerCase() === "l") {
        event.preventDefault();
        playSelectedSide("left");
      }
      if (event.key.toLowerCase() === "r") {
        event.preventDefault();
        playSelectedSide("right");
      }
      if (/^[1-7]$/.test(event.key)) {
        const index = Number(event.key) - 1;
        const tile = game.playerHand[index];
        if (tile) {
          event.preventDefault();
          selectPlayerTile(tile.id);
        }
      }
    }
  };
}

function createMineSweep(root, api) {
  api.setCurrentLabel("Safe");
  api.setBestLabel("Best Safe");

  const GRID_SIZE = 9;
  const MINE_COUNT = 10;
  const SAFE_TOTAL = GRID_SIZE * GRID_SIZE - MINE_COUNT;

  const stage = document.createElement("div");
  stage.className = "dom-stage sweep-stage";
  stage.innerHTML = `
    <div class="score-row">
      <div class="score-pill">Grid <strong>${GRID_SIZE} x ${GRID_SIZE}</strong></div>
      <div class="score-pill">Mines <strong data-sweep-mines-left>${MINE_COUNT}</strong></div>
      <div class="score-pill">Mode <strong data-sweep-mode>Reveal</strong></div>
    </div>
    <div class="sweep-shell">
      <div class="sweep-board" data-sweep-board></div>
    </div>
    <p class="sweep-note" data-sweep-note>Press Start to arm the field.</p>
  `;
  root.appendChild(stage);

  const minesLeftValue = stage.querySelector("[data-sweep-mines-left]");
  const modeValue = stage.querySelector("[data-sweep-mode]");
  const boardNode = stage.querySelector("[data-sweep-board]");
  const noteValue = stage.querySelector("[data-sweep-note]");

  const game = {
    running: false,
    started: false,
    mode: "reveal",
    board: [],
    revealed: 0,
    flags: 0,
    locked: false
  };

  const cells = Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "sweep-cell";
    button.dataset.index = String(index);
    button.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      pressCell(index);
    });
    boardNode.appendChild(button);
    return button;
  });

  function toRow(index) {
    return Math.floor(index / GRID_SIZE);
  }

  function toColumn(index) {
    return index % GRID_SIZE;
  }

  function inBounds(row, column) {
    return row >= 0 && row < GRID_SIZE && column >= 0 && column < GRID_SIZE;
  }

  function neighbors(index) {
    const row = toRow(index);
    const column = toColumn(index);
    const list = [];

    for (let rowOffset = -1; rowOffset <= 1; rowOffset += 1) {
      for (let columnOffset = -1; columnOffset <= 1; columnOffset += 1) {
        if (rowOffset === 0 && columnOffset === 0) continue;
        const nextRow = row + rowOffset;
        const nextColumn = column + columnOffset;
        if (!inBounds(nextRow, nextColumn)) continue;
        list.push(nextRow * GRID_SIZE + nextColumn);
      }
    }

    return list;
  }

  function createCells() {
    return Array.from({ length: GRID_SIZE * GRID_SIZE }, () => ({
      mine: false,
      revealed: false,
      flagged: false,
      exploded: false,
      adjacent: 0
    }));
  }

  function buildBoard(firstIndex) {
    const board = createCells();
    const banned = new Set([firstIndex, ...neighbors(firstIndex)]);
    const pool = [];

    for (let index = 0; index < board.length; index += 1) {
      if (!banned.has(index)) pool.push(index);
    }

    for (let placed = 0; placed < MINE_COUNT; placed += 1) {
      const pick = randomInt(0, pool.length - 1);
      const mineIndex = pool.splice(pick, 1)[0];
      board[mineIndex].mine = true;
    }

    board.forEach((cell, index) => {
      if (cell.mine) return;
      cell.adjacent = neighbors(index).reduce((count, neighborIndex) => count + (board[neighborIndex].mine ? 1 : 0), 0);
    });

    return board;
  }

  function updateNote(text) {
    noteValue.textContent = text;
  }

  function updateMode() {
    modeValue.textContent = game.mode === "flag" ? "Flag" : "Reveal";
  }

  function syncActions() {
    if (!game.running) {
      api.setPrimary("Start", start);
      api.setSecondary("", null);
      return;
    }

    api.setPrimary("Restart", start);
    api.setSecondary(game.mode === "flag" ? "Flag Off" : "Flag On", toggleMode);
  }

  function syncScore() {
    api.setCurrent(game.revealed);
    minesLeftValue.textContent = String(MINE_COUNT - game.flags);
    updateMode();
  }

  function setMode(nextMode) {
    game.mode = nextMode;
    updateMode();
    syncActions();
  }

  function toggleMode() {
    if (!game.running) return;
    setMode(game.mode === "flag" ? "reveal" : "flag");
    api.sound("ui");
    api.setHint(game.mode === "flag" ? "Flag mode on. Tap cells to mark bombs." : "Reveal mode on. Tap cells to clear.");
  }

  function revealAllMines() {
    game.board.forEach((cell) => {
      if (cell.mine) cell.revealed = true;
    });
  }

  function floodReveal(startIndex) {
    const queue = [startIndex];

    while (queue.length) {
      const index = queue.shift();
      const cell = game.board[index];
      if (!cell || cell.revealed || cell.flagged) continue;
      cell.revealed = true;
      game.revealed += 1;

      if (cell.adjacent !== 0) continue;

      neighbors(index).forEach((neighborIndex) => {
        const neighbor = game.board[neighborIndex];
        if (!neighbor || neighbor.revealed || neighbor.flagged || neighbor.mine) return;
        queue.push(neighborIndex);
      });
    }
  }

  function stop(message, soundName = "fail") {
    game.running = false;
    game.locked = true;
    api.updateBest(game.revealed);
    api.sound(soundName);
    api.setHint(message);
    updateNote(message);
    api.setPrimary("Restart", start);
    api.setSecondary("", null);
    render();
  }

  function checkWin() {
    if (game.revealed !== SAFE_TOTAL) return false;
    game.running = false;
    game.locked = true;
    api.updateBest(game.revealed);
    api.sound("level");
    api.setHint("Board clear. Perfect sweep.");
    updateNote("Field clear. Restart for another sweep.");
    api.setPrimary("Restart", start);
    api.setSecondary("", null);
    render();
    return true;
  }

  function revealCell(index) {
    if (!game.running) return;
    if (!game.started) {
      game.board = buildBoard(index);
      game.started = true;
    }

    const cell = game.board[index];
    if (!cell || cell.revealed || cell.flagged) return;

    if (cell.mine) {
      cell.exploded = true;
      revealAllMines();
      stop("Mine hit. Restart the field.", "crash");
      return;
    }

    floodReveal(index);
    api.sound("collect");
    api.updateBest(game.revealed);
    if (!checkWin()) {
      api.setHint(cell.adjacent === 0 ? "Open lane." : `${cell.adjacent} mine${cell.adjacent === 1 ? "" : "s"} nearby.`);
      updateNote(game.mode === "flag" ? "Flag mode is still on." : "Reveal safe cells and avoid the mines.");
      render();
    }
  }

  function toggleFlagAt(index) {
    if (!game.running) return;
    const cell = game.board[index];
    if (!cell || cell.revealed) return;
    if (!cell.flagged && game.flags >= MINE_COUNT) {
      api.sound("deny");
      updateNote("All flags are already in use.");
      return;
    }
    cell.flagged = !cell.flagged;
    game.flags += cell.flagged ? 1 : -1;
    api.sound(cell.flagged ? "lock" : "slide");
    api.setHint(cell.flagged ? "Flag planted." : "Flag cleared.");
    updateNote(cell.flagged ? "Bomb marked." : "Marker removed.");
    render();
  }

  function pressCell(index) {
    if (!game.running || game.locked) return;
    const cell = game.board[index];
    if (!cell) return;

    if (game.mode === "flag") {
      toggleFlagAt(index);
      return;
    }

    if (cell.flagged) {
      api.sound("deny");
      updateNote("Cell is flagged. Toggle flag mode to remove it.");
      return;
    }

    revealCell(index);
  }

  function start() {
    api.countPlay();
    api.sound("start");
    game.running = true;
    game.started = false;
    game.mode = "reveal";
    game.board = createCells();
    game.revealed = 0;
    game.flags = 0;
    game.locked = false;
    api.setCurrent(0);
    api.setHint("First tap is always safe.");
    updateNote("Reveal cells. Toggle flag mode when you spot a bomb.");
    syncActions();
    render();
  }

  function render() {
    syncScore();

    cells.forEach((button, index) => {
      const cell = game.board[index];
      const text = !game.running && !game.started ? "" : cell.flagged ? "F" : cell.revealed && cell.mine ? "" : cell.revealed && cell.adjacent > 0 ? String(cell.adjacent) : "";
      button.textContent = text;
      button.className = "sweep-cell";
      button.dataset.value = cell.revealed && !cell.mine ? String(cell.adjacent) : "";
      button.disabled = !game.running;
      button.classList.toggle("is-hidden", !cell.revealed && !cell.flagged);
      button.classList.toggle("is-revealed", cell.revealed);
      button.classList.toggle("is-flagged", cell.flagged);
      button.classList.toggle("is-mine", cell.revealed && cell.mine);
      button.classList.toggle("is-exploded", cell.exploded);
      button.setAttribute("aria-label", cell.flagged ? `Cell ${index + 1}, flagged` : cell.revealed ? `Cell ${index + 1}, ${cell.mine ? "mine" : `${cell.adjacent} nearby`}` : `Cell ${index + 1}, hidden`);
    });
  }

  game.board = createCells();
  syncActions();
  render();

  return {
    destroy() {
      // No persistent listeners outside the local board buttons.
    },
    onKey(event) {
      if (event.key.toLowerCase() === "f") {
        event.preventDefault();
        toggleMode();
      }
      if (event.key.toLowerCase() === "r") {
        event.preventDefault();
        start();
      }
    }
  };
}

function createSolitaire(root, api) {
  api.setCurrentLabel("Home");
  api.setBestLabel("Best Home");

  const SUITS = ["hearts", "diamonds", "clubs", "spades"];
  const SUIT_SYMBOL = {
    hearts: "♥",
    diamonds: "♦",
    clubs: "♣",
    spades: "♠"
  };
  const TABLEAU_COUNT = 7;
  const FOUNDATION_COUNT = 4;
  const COMPLETE_FOUNDATION = 52;
  const doc = root.ownerDocument;
  const view = doc.defaultView || window;
  const viewportWidth = Math.min(root.clientWidth || view.innerWidth || 0, view.innerWidth || Infinity);
  const compactViewport = viewportWidth <= 520;
  const CARD_WIDTH = compactViewport ? 50 : 56;
  const CARD_HEIGHT = compactViewport ? 88 : 98;
  const EMPTY_HEIGHT = CARD_HEIGHT + 10;
  const FACE_UP_STEP = compactViewport ? 18 : 21;
  const FACE_DOWN_STEP = compactViewport ? 10 : 12;
  const DRAG_STEP = compactViewport ? 16 : 18;
  const COLUMN_FOOT = compactViewport ? 62 : 70;

  const stage = document.createElement("div");
  stage.className = "dom-stage solitaire-stage";
  stage.style.setProperty("--sol-card-width", `${CARD_WIDTH}px`);
  stage.style.setProperty("--sol-card-height", `${CARD_HEIGHT}px`);
  stage.innerHTML = `
    <div class="score-row">
      <div class="score-pill">Stock <strong data-sol-stock-count>24</strong></div>
      <div class="score-pill">Waste <strong data-sol-waste-count>0</strong></div>
      <div class="score-pill">Mode <strong data-sol-mode>Select</strong></div>
    </div>
    <div class="solitaire-top">
      <button class="sol-slot sol-stock" type="button" data-sol-stock aria-label="Stock pile"></button>
      <button class="sol-slot sol-waste" type="button" data-sol-waste aria-label="Waste pile"></button>
      <div class="solitaire-foundations" data-sol-foundations></div>
    </div>
    <div class="solitaire-tableau" data-sol-tableau></div>
    <p class="solitaire-note" data-sol-note>Press Start to deal a new game.</p>
  `;
  root.appendChild(stage);

  const stockCountValue = stage.querySelector("[data-sol-stock-count]");
  const wasteCountValue = stage.querySelector("[data-sol-waste-count]");
  const modeValue = stage.querySelector("[data-sol-mode]");
  const stockButton = stage.querySelector("[data-sol-stock]");
  const wasteButton = stage.querySelector("[data-sol-waste]");
  const foundationsNode = stage.querySelector("[data-sol-foundations]");
  const tableauNode = stage.querySelector("[data-sol-tableau]");
  const noteValue = stage.querySelector("[data-sol-note]");

  const foundationButtons = Array.from({ length: FOUNDATION_COUNT }, (_, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "sol-slot sol-foundation";
    button.dataset.foundation = String(index);
    button.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      handleFoundationTap(index);
    });
    foundationsNode.appendChild(button);
    return button;
  });

  const tableauColumns = Array.from({ length: TABLEAU_COUNT }, (_, index) => {
    const column = document.createElement("div");
    column.className = "sol-column";
    column.dataset.column = String(index);
    column.addEventListener("pointerdown", (event) => {
      if (event.target !== column) return;
      event.preventDefault();
      handleColumnTap(index);
    });
    tableauNode.appendChild(column);
    return column;
  });

  const game = {
    running: false,
    stock: [],
    waste: [],
    foundations: Array.from({ length: FOUNDATION_COUNT }, () => []),
    tableaus: Array.from({ length: TABLEAU_COUNT }, () => []),
    selection: null
  };
  const drag = {
    pointerId: null,
    source: null,
    originNode: null,
    preview: null,
    started: false,
    hover: null,
    offsetX: 0,
    offsetY: 0,
    startX: 0,
    startY: 0
  };

  function rankLabel(rank) {
    if (rank === 1) return "A";
    if (rank === 11) return "J";
    if (rank === 12) return "Q";
    if (rank === 13) return "K";
    return String(rank);
  }

  function cardColor(suit) {
    return suit === "hearts" || suit === "diamonds" ? "red" : "black";
  }

  function makeDeck() {
    const deck = [];
    SUITS.forEach((suit) => {
      for (let rank = 1; rank <= 13; rank += 1) {
        deck.push({
          id: `${suit}-${rank}`,
          suit,
          rank,
          color: cardColor(suit),
          faceUp: false
        });
      }
    });
    return deck;
  }

  function shuffle(list) {
    const next = [...list];
    for (let index = next.length - 1; index > 0; index -= 1) {
      const swapIndex = randomInt(0, index);
      [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
    }
    return next;
  }

  function updateNote(text) {
    noteValue.textContent = text;
  }

  function syncActions() {
    if (!game.running) {
      api.setPrimary("Start", start);
      api.setSecondary("", null);
      return;
    }

    api.setPrimary("Restart", start);
    api.setSecondary("Auto", autoHome);
  }

  function foundationTotal() {
    return game.foundations.reduce((sum, pile) => sum + pile.length, 0);
  }

  function syncScore() {
    stockCountValue.textContent = String(game.stock.length);
    wasteCountValue.textContent = String(game.waste.length);
    modeValue.textContent = drag.started ? "Drag" : game.selection ? "Move" : "Select";
    const total = foundationTotal();
    api.setCurrent(total);
    api.updateBest(total);
  }

  function buildCardMarkup(card, faceDown = false) {
    if (faceDown) {
      return `<span class="sol-card-back" aria-hidden="true"></span>`;
    }

    return `
      <span class="sol-card-corner is-top"><strong>${rankLabel(card.rank)}</strong><em>${SUIT_SYMBOL[card.suit]}</em></span>
      <span class="sol-card-center">${SUIT_SYMBOL[card.suit]}</span>
      <span class="sol-card-corner is-bottom"><strong>${rankLabel(card.rank)}</strong><em>${SUIT_SYMBOL[card.suit]}</em></span>
    `;
  }

  function setSlotCard(node, card, options = {}) {
    const faceDown = options.faceDown ?? false;
    node.className = options.className;
    node.innerHTML = card
      ? buildCardMarkup(card, faceDown)
      : `<span class="sol-slot-mark">${options.placeholder || ""}</span>`;
    node.classList.toggle("is-empty", !card);
    node.classList.toggle("is-face-down", Boolean(card && faceDown));
    node.classList.toggle("is-red", Boolean(card && !faceDown && card.color === "red"));
    node.classList.toggle("is-black", Boolean(card && !faceDown && card.color === "black"));
  }

  function flipTopHidden(columnIndex) {
    const column = game.tableaus[columnIndex];
    const top = column[column.length - 1];
    if (top && !top.faceUp) {
      top.faceUp = true;
      api.sound("collect");
    }
  }

  function clearSelection() {
    game.selection = null;
  }

  function isSameSelection(nextSelection) {
    if (!game.selection) return false;
    if (game.selection.type !== nextSelection.type) return false;
    if (game.selection.type === "waste") return true;
    return game.selection.column === nextSelection.column && game.selection.cardIndex === nextSelection.cardIndex;
  }

  function currentSelectionCards(selection = game.selection) {
    if (!selection) return [];
    if (selection.type === "waste") {
      const top = game.waste[game.waste.length - 1];
      return top ? [top] : [];
    }
    return game.tableaus[selection.column].slice(selection.cardIndex);
  }

  function canMoveToFoundation(card, foundationIndex) {
    const foundation = game.foundations[foundationIndex];
    const top = foundation[foundation.length - 1];
    if (!top) return card.rank === 1;
    return top.suit === card.suit && top.rank + 1 === card.rank;
  }

  function canMoveToTableau(card, columnIndex) {
    const column = game.tableaus[columnIndex];
    const top = column[column.length - 1];
    if (!top) return card.rank === 13;
    if (!top.faceUp) return false;
    return top.color !== card.color && top.rank === card.rank + 1;
  }

  function findFoundationTarget(selection = game.selection) {
    const cards = currentSelectionCards(selection);
    if (cards.length !== 1) return -1;
    const [card] = cards;
    for (let foundationIndex = 0; foundationIndex < FOUNDATION_COUNT; foundationIndex += 1) {
      if (canMoveToFoundation(card, foundationIndex)) {
        return foundationIndex;
      }
    }
    return -1;
  }

  function takeSelection(selection = game.selection) {
    if (!selection) return [];
    if (selection.type === "waste") {
      const card = game.waste.pop();
      return card ? [card] : [];
    }
    return game.tableaus[selection.column].splice(selection.cardIndex);
  }

  function finishMove(message) {
    const total = foundationTotal();
    syncScore();
    render();

    if (total === COMPLETE_FOUNDATION) {
      game.running = false;
      api.sound("level");
      api.setHint("Foundations complete. You cleared the deck.");
      updateNote("Solitaire clear. Restart for a new deal.");
      syncActions();
      return true;
    }

    api.setHint(message);
    updateNote(message);
    return false;
  }

  function moveSelectionToFoundation(foundationIndex) {
    const cards = currentSelectionCards();
    if (cards.length !== 1) return false;
    const [card] = cards;
    if (!canMoveToFoundation(card, foundationIndex)) return false;

    const source = game.selection;
    const moved = takeSelection();
    if (!moved.length) return false;
    game.foundations[foundationIndex].push(moved[0]);
    if (source.type === "tableau") flipTopHidden(source.column);
    clearSelection();
    api.sound("lock");
    finishMove("Card moved home.");
    return true;
  }

  function moveSelectionToTableau(columnIndex) {
    if (!game.selection) return false;
    if (game.selection.type === "tableau" && game.selection.column === columnIndex) return false;
    const cards = currentSelectionCards();
    if (!cards.length) return false;
    const leadCard = cards[0];
    if (!canMoveToTableau(leadCard, columnIndex)) return false;

    const source = game.selection;
    const moved = takeSelection();
    if (!moved.length) return false;
    game.tableaus[columnIndex].push(...moved);
    if (source.type === "tableau") flipTopHidden(source.column);
    clearSelection();
    api.sound("slide");
    finishMove("Stack moved.");
    return true;
  }

  function drawStock() {
    if (!game.running) return;
    clearSelection();
    if (game.stock.length > 0) {
      const card = game.stock.pop();
      card.faceUp = true;
      game.waste.push(card);
      api.sound("launch");
      render();
      api.setHint("Card drawn.");
      updateNote("Tap the waste or a tableau card to move it.");
      return;
    }

    if (game.waste.length > 0) {
      game.stock = game.waste.reverse().map((card) => ({ ...card, faceUp: false }));
      game.waste = [];
      api.sound("round");
      render();
      api.setHint("Waste recycled into stock.");
      updateNote("Deck reset. Tap stock to draw again.");
      return;
    }

    api.sound("deny");
    updateNote("No cards left in stock or waste.");
  }

  function handleWasteTap() {
    if (!game.running) return;
    if (!game.waste.length) {
      drawStock();
      return;
    }

    const nextSelection = { type: "waste" };
    if (!game.selection) {
      const foundationIndex = findFoundationTarget(nextSelection);
      if (foundationIndex !== -1) {
        game.selection = nextSelection;
        moveSelectionToFoundation(foundationIndex);
        return;
      }
    }
    if (isSameSelection(nextSelection)) {
      clearSelection();
      render();
      updateNote("Selection cleared.");
      return;
    }

    game.selection = nextSelection;
    api.sound("ui");
    render();
    updateNote("Waste selected. Tap a foundation or tableau column.");
  }

  function handleFoundationTap(foundationIndex) {
    if (!game.running || !game.selection) return;
    if (!moveSelectionToFoundation(foundationIndex)) {
      api.sound("deny");
      updateNote("That move does not fit the foundation.");
    }
  }

  function handleTableauCardTap(columnIndex, cardIndex) {
    if (!game.running) return;
    const card = game.tableaus[columnIndex][cardIndex];
    if (!card?.faceUp) return;
    const nextSelection = { type: "tableau", column: columnIndex, cardIndex };

    if (game.selection && moveSelectionToTableau(columnIndex)) {
      return;
    }

    if (!game.selection && cardIndex === game.tableaus[columnIndex].length - 1) {
      const foundationIndex = findFoundationTarget(nextSelection);
      if (foundationIndex !== -1) {
        game.selection = nextSelection;
        moveSelectionToFoundation(foundationIndex);
        return;
      }
    }

    if (isSameSelection(nextSelection)) {
      clearSelection();
      render();
      updateNote("Selection cleared.");
      return;
    }

    game.selection = nextSelection;
    api.sound("ui");
    render();
    updateNote("Stack selected. Tap a target column or foundation.");
  }

  function handleColumnTap(columnIndex) {
    if (!game.running || !game.selection) return;
    if (!moveSelectionToTableau(columnIndex)) {
      api.sound("deny");
      updateNote("That stack does not fit this column.");
    }
  }

  function autoHome() {
    if (!game.running) return;
    let moved = 0;
    let searching = true;

    while (searching) {
      searching = false;

      if (game.waste.length) {
        const wasteCard = game.waste[game.waste.length - 1];
        for (let foundationIndex = 0; foundationIndex < FOUNDATION_COUNT; foundationIndex += 1) {
          if (!canMoveToFoundation(wasteCard, foundationIndex)) continue;
          game.selection = { type: "waste" };
          moveSelectionToFoundation(foundationIndex);
          moved += 1;
          searching = true;
          break;
        }
        if (searching) continue;
      }

      for (let columnIndex = 0; columnIndex < TABLEAU_COUNT; columnIndex += 1) {
        const column = game.tableaus[columnIndex];
        const topCard = column[column.length - 1];
        if (!topCard || !topCard.faceUp) continue;
        for (let foundationIndex = 0; foundationIndex < FOUNDATION_COUNT; foundationIndex += 1) {
          if (!canMoveToFoundation(topCard, foundationIndex)) continue;
          game.selection = { type: "tableau", column: columnIndex, cardIndex: column.length - 1 };
          moveSelectionToFoundation(foundationIndex);
          moved += 1;
          searching = true;
          break;
        }
        if (searching) break;
      }
    }

    clearSelection();
    render();
    if (!moved) {
      api.sound("deny");
      updateNote("No home moves available.");
      return;
    }
    api.sound("round");
    api.setHint(`${moved} auto move${moved === 1 ? "" : "s"} to foundation.`);
    updateNote("Auto-home played the available cards.");
  }

  function sameHover(a, b) {
    return Boolean(a && b && a.kind === b.kind && a.index === b.index);
  }

  function setDragHover(nextHover) {
    if (sameHover(drag.hover, nextHover)) return;

    if (drag.hover) {
      if (drag.hover.kind === "foundation") {
        foundationButtons[drag.hover.index]?.classList.remove("is-drop-target");
      } else {
        tableauColumns[drag.hover.index]?.classList.remove("is-drop-target");
      }
    }

    drag.hover = nextHover;

    if (drag.hover) {
      if (drag.hover.kind === "foundation") {
        foundationButtons[drag.hover.index]?.classList.add("is-drop-target");
      } else {
        tableauColumns[drag.hover.index]?.classList.add("is-drop-target");
      }
    }
  }

  function buildDragPreview(selection) {
    const cards = currentSelectionCards(selection).slice(0, 5);
    const preview = doc.createElement("div");
    preview.className = "sol-drag-preview";
    const originWidth = drag.originNode?.getBoundingClientRect().width || CARD_WIDTH;
    const previewWidth = Math.round(originWidth);
    preview.style.setProperty("--sol-card-width", `${previewWidth}px`);
    preview.style.setProperty("--sol-card-height", `${CARD_HEIGHT}px`);
    preview.style.width = `${previewWidth}px`;
    preview.style.height = `${CARD_HEIGHT + Math.max(0, cards.length - 1) * DRAG_STEP}px`;

    cards.forEach((card, index) => {
      const node = doc.createElement("div");
      node.className = `sol-card sol-drag-card${card.color === "red" ? " is-red" : ""}`;
      node.innerHTML = buildCardMarkup(card, false);
      node.style.width = `${previewWidth}px`;
      node.style.height = `${CARD_HEIGHT}px`;
      node.style.top = `${index * DRAG_STEP}px`;
      preview.appendChild(node);
    });

    if (currentSelectionCards(selection).length > cards.length) {
      const badge = doc.createElement("span");
      badge.className = "sol-drag-badge";
      badge.textContent = `+${currentSelectionCards(selection).length - cards.length}`;
      preview.appendChild(badge);
    }

    doc.body.appendChild(preview);
    return preview;
  }

  function findDropTarget(clientX, clientY) {
    const element = doc.elementFromPoint(clientX, clientY);
    if (!element) return null;

    const foundation = element.closest("[data-foundation]");
    if (foundation && foundationsNode.contains(foundation)) {
      return {
        kind: "foundation",
        index: Number(foundation.dataset.foundation)
      };
    }

    const column = element.closest("[data-column]");
    if (column && tableauNode.contains(column)) {
      return {
        kind: "tableau",
        index: Number(column.dataset.column)
      };
    }

    return null;
  }

  function updateDragPreview(clientX, clientY) {
    if (!drag.preview) return;
    drag.preview.style.transform = `translate(${clientX - drag.offsetX}px, ${clientY - drag.offsetY}px)`;
    setDragHover(findDropTarget(clientX, clientY));
  }

  function removeDragPreview() {
    if (drag.preview) {
      drag.preview.remove();
      drag.preview = null;
    }
  }

  function clearDragState() {
    setDragHover(null);
    removeDragPreview();
    stage.classList.remove("is-dragging");
    drag.pointerId = null;
    drag.source = null;
    drag.originNode = null;
    drag.started = false;
    drag.offsetX = 0;
    drag.offsetY = 0;
    drag.startX = 0;
    drag.startY = 0;
  }

  function unbindDragEvents() {
    view.removeEventListener("pointermove", handleDragMove);
    view.removeEventListener("pointerup", handleDragEnd);
    view.removeEventListener("pointercancel", handleDragCancel);
  }

  function startDrag() {
    if (drag.started || !drag.source) return;
    drag.started = true;
    game.selection = drag.source;
    stage.classList.add("is-dragging");
    render();
    drag.preview = buildDragPreview(drag.source);
    updateDragPreview(drag.startX, drag.startY);
    api.sound("ui");
    updateNote("Drag the card or stack to a column or foundation.");
  }

  function completeDrag(clientX, clientY) {
    const target = findDropTarget(clientX, clientY);
    const source = drag.source;

    if (!source) return;

    if (!target) {
      clearSelection();
      render();
      updateNote("Move cancelled.");
      return;
    }

    if (target.kind === "tableau" && source.type === "tableau" && source.column === target.index) {
      clearSelection();
      render();
      updateNote("Move cancelled.");
      return;
    }

    game.selection = source;
    const moved = target.kind === "foundation"
      ? moveSelectionToFoundation(target.index)
      : moveSelectionToTableau(target.index);

    if (!moved) {
      clearSelection();
      render();
      api.sound("deny");
      updateNote(target.kind === "foundation" ? "That card does not fit the foundation." : "That stack does not fit this column.");
    }
  }

  function handleDragMove(event) {
    if (event.pointerId !== drag.pointerId || !drag.source) return;

    if (!drag.started) {
      const deltaX = event.clientX - drag.startX;
      const deltaY = event.clientY - drag.startY;
      if (Math.hypot(deltaX, deltaY) < 9) return;
      startDrag();
    }

    event.preventDefault();
    updateDragPreview(event.clientX, event.clientY);
  }

  function finishPointerInteraction(event) {
    if (event.pointerId !== drag.pointerId) return;
    unbindDragEvents();

    const source = drag.source;
    const didDrag = drag.started;

    if (didDrag) {
      completeDrag(event.clientX, event.clientY);
    } else if (source) {
      if (source.type === "waste") {
        handleWasteTap();
      } else {
        handleTableauCardTap(source.column, source.cardIndex);
      }
    }

    clearDragState();
  }

  function handleDragEnd(event) {
    finishPointerInteraction(event);
  }

  function handleDragCancel(event) {
    if (event.pointerId !== drag.pointerId) return;
    unbindDragEvents();
    clearSelection();
    render();
    clearDragState();
    updateNote("Move cancelled.");
  }

  function beginDrag(event, source) {
    if (!game.running) return;
    if (source.type === "waste" && !game.waste.length) return;
    if (source.type === "tableau" && !game.tableaus[source.column]?.[source.cardIndex]?.faceUp) return;

    drag.pointerId = event.pointerId;
    drag.source = source;
    drag.originNode = event.currentTarget;
    drag.startX = event.clientX;
    drag.startY = event.clientY;

    const rect = event.currentTarget.getBoundingClientRect();
    drag.offsetX = clamp(event.clientX - rect.left, 12, Math.max(12, rect.width - 12));
    drag.offsetY = clamp(event.clientY - rect.top, 12, Math.max(12, rect.height - 12));

    view.addEventListener("pointermove", handleDragMove, { passive: false });
    view.addEventListener("pointerup", handleDragEnd);
    view.addEventListener("pointercancel", handleDragCancel);
  }

  function start() {
    const deck = shuffle(makeDeck());
    game.running = true;
    game.selection = null;
    unbindDragEvents();
    clearDragState();
    game.stock = [];
    game.waste = [];
    game.foundations = Array.from({ length: FOUNDATION_COUNT }, () => []);
    game.tableaus = Array.from({ length: TABLEAU_COUNT }, () => []);

    for (let columnIndex = 0; columnIndex < TABLEAU_COUNT; columnIndex += 1) {
      for (let dealIndex = 0; dealIndex <= columnIndex; dealIndex += 1) {
        const card = deck.pop();
        card.faceUp = dealIndex === columnIndex;
        game.tableaus[columnIndex].push(card);
      }
    }

    game.stock = deck.map((card) => ({ ...card, faceUp: false }));
    api.countPlay();
    api.sound("start");
    syncActions();
    syncScore();
    render();
    api.setHint("Tap stock to draw. Tap a card, then a destination.");
    updateNote("Build alternating runs and move every suit home.");
  }

  function render() {
    syncScore();
    stage.classList.toggle("is-dragging", drag.started);

    setSlotCard(stockButton, game.stock[game.stock.length - 1], {
      faceDown: true,
      className: "sol-slot sol-stock",
      placeholder: "↺"
    });
    stockButton.classList.toggle("is-empty", game.stock.length === 0);
    stockButton.setAttribute("aria-label", game.stock.length ? `Stock pile, ${game.stock.length} cards` : "Recycle waste to stock");

    setSlotCard(wasteButton, game.waste[game.waste.length - 1], {
      className: "sol-slot sol-waste",
      placeholder: ""
    });
    wasteButton.classList.toggle("is-selected", Boolean(game.selection?.type === "waste"));

    foundationButtons.forEach((button, foundationIndex) => {
      const top = game.foundations[foundationIndex][game.foundations[foundationIndex].length - 1];
      setSlotCard(button, top, {
        className: "sol-slot sol-foundation",
        placeholder: "A"
      });
      button.classList.toggle("is-drop-target", Boolean(drag.hover?.kind === "foundation" && drag.hover.index === foundationIndex));
      button.setAttribute("aria-label", top ? `Foundation ${foundationIndex + 1}, top ${rankLabel(top.rank)} of ${top.suit}` : `Foundation ${foundationIndex + 1}, empty`);
    });

    tableauColumns.forEach((columnNode, columnIndex) => {
      columnNode.innerHTML = "";
      columnNode.classList.toggle("is-drop-target", Boolean(drag.hover?.kind === "tableau" && drag.hover.index === columnIndex));
      const column = game.tableaus[columnIndex];
      let offset = 0;

      if (!column.length) {
        const empty = document.createElement("button");
        empty.type = "button";
        empty.className = "sol-empty-column";
        empty.textContent = "K";
        empty.addEventListener("pointerdown", (event) => {
          event.preventDefault();
          handleColumnTap(columnIndex);
        });
        columnNode.appendChild(empty);
        columnNode.style.height = `${EMPTY_HEIGHT}px`;
        return;
      }

      column.forEach((card, cardIndex) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = `sol-card${card.faceUp ? "" : " is-face-down"}${card.color === "red" && card.faceUp ? " is-red" : ""}`;
        button.innerHTML = buildCardMarkup(card, !card.faceUp);
        button.style.top = `${offset}px`;
        button.classList.toggle(
          "is-selected",
          Boolean(game.selection?.type === "tableau" && game.selection.column === columnIndex && game.selection.cardIndex === cardIndex)
        );
        button.classList.toggle(
          "is-selected-stack",
          Boolean(game.selection?.type === "tableau" && game.selection.column === columnIndex && cardIndex >= game.selection.cardIndex)
        );
        button.setAttribute("aria-label", card.faceUp ? `${rankLabel(card.rank)} of ${card.suit}` : "Face down card");
        button.addEventListener("pointerdown", (event) => {
          event.preventDefault();
          beginDrag(event, { type: "tableau", column: columnIndex, cardIndex });
        });
        columnNode.appendChild(button);
        offset += card.faceUp ? FACE_UP_STEP : FACE_DOWN_STEP;
      });

      columnNode.style.height = `${offset + COLUMN_FOOT}px`;
    });
  }

  stockButton.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    drawStock();
  });

  wasteButton.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    beginDrag(event, { type: "waste" });
  });

  syncActions();
  render();

  return {
    destroy() {
      unbindDragEvents();
      clearDragState();
    },
    onKey(event) {
      if (event.key.toLowerCase() === "d") {
        event.preventDefault();
        drawStock();
      }
      if (event.key.toLowerCase() === "a") {
        event.preventDefault();
        autoHome();
      }
      if (event.key.toLowerCase() === "r") {
        event.preventDefault();
        start();
      }
    }
  };
}

function createBrickPop(root, api) {
  api.setCurrentLabel("Score");
  api.setBestLabel("Best Score");

  const stage = document.createElement("div");
  stage.className = "canvas-stage brick-pop-stage";
  const availableStageWidth = Math.min(root.clientWidth || window.innerWidth - 32, window.innerWidth - 32, 420);
  const playfieldWidth = clamp(Math.round(availableStageWidth), 300, 420);
  const playfieldHeight = clamp(Math.round(playfieldWidth * 1.2), 400, 500);
  const { canvas, ctx, width, height } = makeCanvas(playfieldWidth, playfieldHeight);
  canvas.classList.add("brick-pop-canvas");
  const nudgeAmount = Math.round(width * 0.08);
  const controls = buildTouchControls([
    [
      { label: "Left", onPress: () => nudgePaddle(-nudgeAmount) },
      { label: "Right", onPress: () => nudgePaddle(nudgeAmount), accent: true }
    ]
  ]);
  const legend = document.createElement("div");
  legend.className = "brick-legend brick-legend--compact";
  legend.innerHTML = `
    <div class="brick-legend-item"><span class="brick-item-icon" data-item="extra" aria-hidden="true"></span><div class="brick-legend-copy"><strong>Extra</strong><span>+ ball</span></div></div>
    <div class="brick-legend-item"><span class="brick-item-icon" data-item="power" aria-hidden="true"></span><div class="brick-legend-copy"><strong>Power</strong><span>2 hits</span></div></div>
    <div class="brick-legend-item"><span class="brick-item-icon" data-item="wide" aria-hidden="true"></span><div class="brick-legend-copy"><strong>Wide</strong><span>+15%</span></div></div>
    <div class="brick-legend-item"><span class="brick-item-icon" data-item="narrow" aria-hidden="true"></span><div class="brick-legend-copy"><strong>Narrow</strong><span>-15%</span></div></div>
    <div class="brick-legend-item"><span class="brick-item-icon" data-item="slow" aria-hidden="true"></span><div class="brick-legend-copy"><strong>Slow</strong><span>pace</span></div></div>
    <div class="brick-legend-item"><span class="brick-item-icon" data-item="magnet" aria-hidden="true"></span><div class="brick-legend-copy"><strong>Magnet</strong><span>pull</span></div></div>
  `;
  stage.appendChild(canvas);
  stage.appendChild(legend);
  stage.appendChild(controls);
  root.appendChild(stage);

  const paddleBaseWidth = clamp(Math.round(width * 0.3), 92, 118);
  const paddleY = height - clamp(Math.round(height * 0.07), 28, 34);
  const brickStartY = clamp(Math.round(height * 0.035), 14, 18);
  const brickRowStep = clamp(Math.round(height * 0.055), 22, 28);
  const brickColumns = 5;
  const dropTable = [
    { type: "extra", weight: 0.18 },
    { type: "power", weight: 0.2 },
    { type: "wide", weight: 0.22 },
    { type: "narrow", weight: 0.18 },
    { type: "slow", weight: 0.12 },
    { type: "magnet", weight: 0.1 }
  ];
  const patternLibrary = [
    ["11111", "11111", "10101", "11111", "01110", "11111", "10101"],
    ["00100", "01110", "11111", "01110", "00100", "01110", "11111"],
    ["11111", "10001", "11111", "01110", "11111", "10001", "11111"],
    ["10101", "11111", "01010", "11111", "10101", "11111", "01010"],
    ["11011", "01110", "00100", "01110", "11011", "01110", "00100"],
    ["11111", "11011", "10101", "01110", "10101", "11011", "11111"]
  ];

  const game = {
    paddleX: width / 2 - paddleBaseWidth / 2,
    paddleWidth: paddleBaseWidth,
    balls: [],
    bricks: [],
    items: [],
    effects: [],
    score: 0,
    round: 1,
    roundDelay: 0,
    powerHitsRemaining: 0,
    slowTime: 0,
    magnetTime: 0,
    running: false,
    raf: 0,
    lastTime: 0
  };

  function phaseLabel(phase = game.round) {
    return `Phase ${phase}`;
  }

  function clampPaddle() {
    game.paddleX = clamp(game.paddleX, 10, width - game.paddleWidth - 10);
  }

  function weightedItemType() {
    const total = dropTable.reduce((sum, item) => sum + item.weight, 0);
    let roll = Math.random() * total;
    for (const item of dropTable) {
      roll -= item.weight;
      if (roll <= 0) return item.type;
    }
    return "wide";
  }

  function maybeDropItem(brick) {
    const chance = Math.min(0.16, 0.08 + game.round * 0.012);
    if (Math.random() > chance) return null;
    return {
      x: brick.x + brick.width / 2,
      y: brick.y + brick.height / 2,
      vy: 88 + game.round * 10,
      type: weightedItemType(),
      size: 18
    };
  }

  function getBrickMetrics() {
    const side = clamp(Math.round(width * 0.055), 14, 24);
    const gap = clamp(Math.round(width * 0.022), 6, 10);
    const brickWidth = Math.floor((width - side * 2 - gap * (brickColumns - 1)) / brickColumns);
    const brickHeight = clamp(Math.round(height * 0.042), 17, 20);
    return { side, gap, brickWidth, brickHeight };
  }

  function createBrick({
    x,
    y,
    width: brickWidth,
    height: brickHeight,
    color,
    kind = "standard",
    hp = 1,
    drop = undefined
  }) {
    return {
      x,
      y,
      width: brickWidth,
      height: brickHeight,
      color,
      alive: true,
      kind,
      hp,
      maxHp: hp,
      flash: 0,
      drop
    };
  }

  function makeBricks() {
    const { side, gap, brickWidth, brickHeight } = getBrickMetrics();
    const colors = ["#ffbf47", "#ff6ca8", "#5ee1ff", "#76f0c2"];

    if (game.round % 10 === 0) {
      const bossHp = game.round + 10;
      const bossWidth = brickWidth * 2 + gap - 8;
      const bossHeight = brickHeight + 6;
      const topY = brickStartY;
      const middleY = brickStartY + brickRowStep;
      const bottomY = brickStartY + brickRowStep * 2;
      const bricks = [];

      for (let column = 0; column < brickColumns; column += 1) {
        bricks.push(
          createBrick({
            x: side + column * (brickWidth + gap),
            y: topY,
            width: brickWidth,
            height: brickHeight,
            color: colors[(column + game.round) % colors.length]
          })
        );
      }

      bricks.push(
        createBrick({
          x: side,
          y: middleY,
          width: brickWidth,
          height: brickHeight,
          color: colors[(game.round + 1) % colors.length]
        }),
        createBrick({
          x: side + (brickWidth + gap) * 4,
          y: middleY,
          width: brickWidth,
          height: brickHeight,
          color: colors[(game.round + 2) % colors.length]
        })
      );

      for (let column = 1; column <= 3; column += 1) {
        bricks.push(
          createBrick({
            x: side + column * (brickWidth + gap),
            y: bottomY,
            width: brickWidth,
            height: brickHeight,
            color: colors[(column + game.round + 2) % colors.length]
          })
        );
      }

      const boss = createBrick({
        x: width / 2 - bossWidth / 2,
        y: middleY - 4,
        width: bossWidth,
        height: bossHeight,
        color: "#ff6c88",
        kind: "boss",
        hp: bossHp,
        drop: {
          x: width / 2,
          y: middleY + bossHeight / 2,
          vy: 96 + game.round * 8,
          type: "narrow",
          size: 20
        }
      });
      bricks.push(boss);
      return bricks;
    }

    const bricks = [];
    const rows = Math.min(7, 5 + Math.floor((game.round - 1) / 2));
    const pattern = patternLibrary[(game.round - 1) % patternLibrary.length];
    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < brickColumns; column += 1) {
        if (pattern[row][column] !== "1") continue;
        const brick = createBrick({
          x: side + column * (brickWidth + gap),
          y: brickStartY + row * brickRowStep,
          width: brickWidth,
          height: brickHeight,
          color: colors[(row + game.round - 1) % colors.length],
        });
        bricks.push(brick);
      }
    }

    if (game.round >= 3 && bricks.length > 0) {
      const hardCount = Math.min(
        Math.max(1, 1 + Math.floor((game.round - 3) * 0.7)),
        Math.max(1, Math.floor(bricks.length * 0.42))
      );
      const used = new Set();
      let cursor = (game.round * 3) % bricks.length;
      while (used.size < hardCount) {
        const index = cursor % bricks.length;
        if (!used.has(index)) {
          const brick = bricks[index];
          brick.kind = "hard";
          brick.hp = 2;
          brick.maxHp = 2;
          used.add(index);
        }
        cursor += 2 + ((game.round + used.size) % 4);
      }
    }

    bricks.forEach((brick) => {
      brick.drop = maybeDropItem(brick);
    });
    return bricks;
  }

  function targetBallSpeed() {
    const base = 196 + (game.round - 1) * 14;
    return base * (game.slowTime > 0 ? 0.82 : 1);
  }

  function createBall(x = width / 2, y = height - 74, direction = 1) {
    const speed = targetBallSpeed();
    const horizontal = clamp((82 + game.round * 8) * direction, -220, 220);
    const vertical = -Math.sqrt(Math.max(speed * speed - horizontal * horizontal, 12000));
    return {
      x,
      y,
      vx: horizontal,
      vy: vertical,
      radius: 8
    };
  }

  function retuneBallSpeeds() {
    const speed = targetBallSpeed();
    game.balls.forEach((ball) => {
      const angle = Math.atan2(ball.vy, ball.vx);
      ball.vx = Math.cos(angle) * speed;
      ball.vy = Math.sin(angle) * speed;
    });
  }

  function startRound(firstRound = false) {
    game.bricks = makeBricks();
    game.items = [];
    game.roundDelay = 0;
    retuneBallSpeeds();

    if (firstRound || game.balls.length === 0) {
      game.balls = [createBall()];
    }

    api.sound(firstRound ? "start" : "round");
    if (firstRound) {
      api.setHint(`${phaseLabel()}. Drag or tap the controls.`);
      return;
    }

    if (game.round % 10 === 0) {
      api.setHint(`${phaseLabel()}. Break the shield, then the boss.`);
      return;
    }

    api.setHint(`${phaseLabel()}. Speed and armor increase.`);
  }

  function reset() {
    api.countPlay();
    game.paddleWidth = paddleBaseWidth;
    game.paddleX = width / 2 - game.paddleWidth / 2;
    game.balls = [];
    game.items = [];
    game.effects = [];
    game.score = 0;
    game.round = 1;
    game.roundDelay = 0;
    game.powerHitsRemaining = 0;
    game.slowTime = 0;
    game.magnetTime = 0;
    game.running = true;
    game.lastTime = performance.now();
    api.setCurrent(0);
    api.setPrimary("Restart", reset);
    startRound(true);
    cancelAnimationFrame(game.raf);
    game.raf = requestAnimationFrame(loop);
  }

  function stop(message) {
    game.running = false;
    api.sound("fail");
    api.updateBest(game.score);
    api.setHint(message);
    api.setPrimary("Start", reset);
  }

  function drawBrick(brick) {
    const flash = clamp((brick.flash || 0) / 0.14, 0, 1);
    ctx.fillStyle = brick.kind === "boss" ? "rgba(0,0,0,0.32)" : "rgba(0,0,0,0.22)";
    ctx.fillRect(brick.x + 2, brick.y + 3, brick.width, brick.height);

    if (brick.kind === "boss") {
      ctx.fillStyle = "#59162d";
      ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
      ctx.fillStyle = "#ff5e88";
      ctx.fillRect(brick.x + 3, brick.y + 3, brick.width - 6, brick.height - 6);
      ctx.fillStyle = `rgba(255, 236, 184, ${0.18 + flash * 0.24})`;
      ctx.fillRect(brick.x + 8, brick.y + 5, brick.width - 16, 7);
      ctx.fillStyle = "rgba(60, 6, 18, 0.35)";
      ctx.fillRect(brick.x + 8, brick.y + brick.height - 12, brick.width - 16, 6);

      const hpRatio = brick.maxHp > 0 ? brick.hp / brick.maxHp : 0;
      ctx.fillStyle = "rgba(8, 10, 22, 0.6)";
      ctx.fillRect(brick.x + 14, brick.y + brick.height - 10, brick.width - 28, 4);
      ctx.fillStyle = "#ffd86c";
      ctx.fillRect(brick.x + 14, brick.y + brick.height - 10, (brick.width - 28) * hpRatio, 4);
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.26 + flash * 0.3})`;
      ctx.lineWidth = 2;
      ctx.strokeRect(brick.x + 1, brick.y + 1, brick.width - 2, brick.height - 2);
      ctx.fillStyle = "#fff4d4";
      ctx.font = '700 10px "SFMono-Regular", "Roboto Mono", monospace';
      ctx.textAlign = "left";
      ctx.fillText(`BOSS ${brick.hp}`, brick.x + 12, brick.y + 15);
      return;
    }

    if (brick.kind === "hard") {
      ctx.fillStyle = "#5f6877";
      ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
      ctx.fillStyle = brick.hp === 2 ? "#8a94a6" : "#b0bacf";
      ctx.fillRect(brick.x + 2, brick.y + 2, brick.width - 4, brick.height - 4);
      ctx.fillStyle = `rgba(255,255,255,${0.18 + flash * 0.26})`;
      ctx.fillRect(brick.x + 2, brick.y + 2, brick.width - 4, 4);
      ctx.strokeStyle = "rgba(255,255,255,0.18)";
      ctx.lineWidth = 1;
      ctx.strokeRect(brick.x + 3.5, brick.y + 3.5, brick.width - 7, brick.height - 7);
      ctx.fillStyle = "#101722";
      ctx.fillRect(brick.x + 9, brick.y + 6, brick.width - 18, brick.height - 12);
      ctx.fillStyle = "#ffe8b0";
      ctx.font = '700 9px "SFMono-Regular", "Roboto Mono", monospace';
      ctx.textAlign = "center";
      ctx.fillText(`${brick.hp}`, brick.x + brick.width / 2, brick.y + brick.height - 5);
      return;
    }

    ctx.fillStyle = brick.color;
    ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
    ctx.fillStyle = `rgba(255,255,255,${0.18 + flash * 0.26})`;
    ctx.fillRect(brick.x + 2, brick.y + 2, brick.width - 4, 4);
    ctx.fillStyle = "rgba(6, 12, 24, 0.16)";
    ctx.fillRect(brick.x + 2, brick.y + brick.height - 5, brick.width - 4, 3);
  }

  function drawItem(item) {
    const palette = {
      extra: { shell: "#76f0c2", core: "#ffffff" },
      power: { shell: "#ffbf47", core: "#fff0ad" },
      wide: { shell: "#5ee1ff", core: "#eaf9ff" },
      narrow: { shell: "#ff6ca8", core: "#ffe5f0" },
      slow: { shell: "#8f93ff", core: "#eef0ff" },
      magnet: { shell: "#ff8f63", core: "#fff0de" }
    }[item.type];

    ctx.save();
    ctx.translate(item.x, item.y);
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.beginPath();
    ctx.ellipse(0, 4, item.size * 0.56, item.size * 0.28, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = palette.shell;
    ctx.beginPath();
    ctx.arc(0, 0, item.size * 0.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = palette.core;
    if (item.type === "extra") {
      ctx.fillRect(-2, -7, 4, 14);
      ctx.fillRect(-7, -2, 14, 4);
    } else if (item.type === "power") {
      ctx.beginPath();
      ctx.moveTo(-3, -8);
      ctx.lineTo(3, -1);
      ctx.lineTo(0, -1);
      ctx.lineTo(4, 8);
      ctx.lineTo(-3, 1);
      ctx.lineTo(0, 1);
      ctx.closePath();
      ctx.fill();
    } else if (item.type === "wide") {
      ctx.beginPath();
      ctx.moveTo(-8, 0);
      ctx.lineTo(-1, -5);
      ctx.lineTo(-1, -2);
      ctx.lineTo(8, -2);
      ctx.lineTo(8, 2);
      ctx.lineTo(-1, 2);
      ctx.lineTo(-1, 5);
      ctx.closePath();
      ctx.fill();
    } else if (item.type === "slow") {
      ctx.fillRect(-6, -7, 4, 14);
      ctx.fillRect(2, -7, 4, 14);
      ctx.beginPath();
      ctx.moveTo(-8, -6);
      ctx.lineTo(8, -6);
      ctx.moveTo(-8, 6);
      ctx.lineTo(8, 6);
      ctx.lineWidth = 2;
      ctx.strokeStyle = palette.core;
      ctx.stroke();
    } else {
      if (item.type === "narrow") {
        ctx.beginPath();
        ctx.moveTo(8, 0);
        ctx.lineTo(1, -5);
        ctx.lineTo(1, -2);
        ctx.lineTo(-8, -2);
        ctx.lineTo(-8, 2);
        ctx.lineTo(1, 2);
        ctx.lineTo(1, 5);
        ctx.closePath();
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(-4, 0, 4, Math.PI * 0.5, Math.PI * 1.5);
        ctx.arc(4, 0, 4, -Math.PI * 0.5, Math.PI * 0.5);
        ctx.lineWidth = 3;
        ctx.strokeStyle = palette.core;
        ctx.stroke();
      }
    }
    ctx.restore();
  }

  function drawPaddle() {
    ctx.fillStyle = "rgba(0,0,0,0.24)";
    ctx.fillRect(game.paddleX + 3, paddleY + 4, game.paddleWidth, 10);
    ctx.fillStyle = game.powerHitsRemaining > 0 ? "#ffd86c" : "#ffbf47";
    ctx.fillRect(game.paddleX, paddleY, game.paddleWidth, 10);
    ctx.fillStyle = "rgba(255,255,255,0.18)";
    ctx.fillRect(game.paddleX + 3, paddleY + 2, Math.max(0, game.paddleWidth - 6), 3);
  }

  function drawBall(ball) {
    ctx.fillStyle = game.powerHitsRemaining > 0 ? "#ffd86c" : "#ffffff";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
    if (game.powerHitsRemaining > 0) {
      ctx.strokeStyle = "rgba(255, 216, 108, 0.34)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius + 3, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  function drawHud() {
    ctx.fillStyle = "rgba(255,255,255,0.78)";
    ctx.font = '700 12px "SFMono-Regular", "Roboto Mono", monospace';
    ctx.textAlign = "left";
    ctx.fillText(`PH ${game.round}`, 18, height - 12);
    ctx.fillText(`${game.balls.length}B`, 74, height - 12);
    if (game.powerHitsRemaining > 0) {
      ctx.fillStyle = "#ffd86c";
      ctx.fillText(`P${game.powerHitsRemaining}`, 118, height - 12);
    }
    if (game.slowTime > 0) {
      ctx.fillStyle = "#aab0ff";
      ctx.fillText("S", 160, height - 12);
    }
    if (game.magnetTime > 0) {
      ctx.fillStyle = "#ffb18d";
      ctx.fillText("M", 178, height - 12);
    }
  }

  function drawEffects() {
    game.effects.forEach((effect) => {
      const lifeRatio = effect.life / effect.maxLife;
      if (effect.kind === "spark") {
        ctx.fillStyle = effect.color.replace("ALPHA", String(lifeRatio));
        ctx.beginPath();
        ctx.arc(effect.x, effect.y, effect.size * (0.6 + lifeRatio * 0.5), 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.strokeStyle = effect.color.replace("ALPHA", String(lifeRatio * 0.9));
        ctx.lineWidth = 2 + (1 - lifeRatio) * 2;
        ctx.beginPath();
        ctx.arc(effect.x, effect.y, effect.radius * (1.2 - lifeRatio * 0.25), 0, Math.PI * 2);
        ctx.stroke();
      }
    });
  }

  function spawnBurst(x, y, tint) {
    for (let index = 0; index < 6; index += 1) {
      const angle = (Math.PI * 2 * index) / 6 + Math.random() * 0.34;
      const speed = 26 + Math.random() * 54;
      game.effects.push({
        kind: "spark",
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 3 + Math.random() * 2,
        life: 0.32,
        maxLife: 0.32,
        color: tint
      });
    }
    game.effects.push({
      kind: "ring",
      x,
      y,
      radius: 14,
      life: 0.24,
      maxLife: 0.24,
      color: tint
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#0f1730";
    ctx.fillRect(0, 0, width, height);

    game.bricks.forEach((brick) => {
      if (!brick.alive) return;
      drawBrick(brick);
    });

    game.items.forEach(drawItem);
    drawEffects();
    drawPaddle();
    game.balls.forEach(drawBall);
    drawHud();

    if (game.roundDelay > 0) {
      ctx.fillStyle = "rgba(15, 23, 48, 0.46)";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.font = '800 26px "Avenir Next Condensed", "Franklin Gothic Medium", "Arial Narrow", sans-serif';
      ctx.fillText(phaseLabel(), width / 2, height / 2 - 4);
      ctx.font = '700 12px "SFMono-Regular", "Roboto Mono", monospace';
      ctx.fillStyle = "#ffd86c";
      ctx.fillText(game.round % 10 === 0 ? "boss incoming" : "incoming", width / 2, height / 2 + 20);
    }
  }

  function movePaddle(clientX) {
    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * width;
    game.paddleX = x - game.paddleWidth / 2;
    clampPaddle();
  }

  function nudgePaddle(delta) {
    if (!game.running) return;
    game.paddleX += delta;
    clampPaddle();
  }

  function bounceOffPaddle(ball) {
    api.sound("paddle");
    ball.vy = -Math.abs(ball.vy);
    ball.vx = (ball.x - (game.paddleX + game.paddleWidth / 2)) * 4;
  }

  function handleBrickHit(ball, brick, previousX, previousY) {
    const poweredHit = game.powerHitsRemaining > 0;
    const wasAlive = brick.alive;
    if (!wasAlive) return;

    brick.flash = 0.14;
    brick.hp -= 1;

    const hitTint = brick.kind === "boss"
      ? "rgba(255, 108, 148, ALPHA)"
      : brick.kind === "hard"
        ? "rgba(190, 204, 232, ALPHA)"
        : "rgba(255, 214, 132, ALPHA)";
    spawnBurst(brick.x + brick.width / 2, brick.y + brick.height / 2, hitTint);

    if (brick.hp <= 0) {
      brick.alive = false;
      brick.flash = 0;
      if (brick.drop) {
        game.items.push({ ...brick.drop });
      }
      api.sound(brick.kind === "boss" ? "level" : "brick");
      game.score += brick.kind === "boss" ? 70 + game.round * 2 : brick.kind === "hard" ? 18 : 10;
    } else {
      api.sound(brick.kind === "boss" ? "lock" : "deny");
      game.score += brick.kind === "boss" ? 4 : 2;
    }

    api.setCurrent(game.score);
    api.updateBest(game.score);

    const fromLeft = previousX + ball.radius <= brick.x;
    const fromRight = previousX - ball.radius >= brick.x + brick.width;
    const fromTop = previousY + ball.radius <= brick.y;
    const fromBottom = previousY - ball.radius >= brick.y + brick.height;

    if (poweredHit) {
      game.powerHitsRemaining -= 1;
      if (Math.abs(ball.vx) > Math.abs(ball.vy)) {
        ball.x = ball.vx > 0 ? brick.x + brick.width + ball.radius + 1 : brick.x - ball.radius - 1;
      } else {
        ball.y = ball.vy > 0 ? brick.y + brick.height + ball.radius + 1 : brick.y - ball.radius - 1;
      }
      return;
    }

    if ((fromLeft || fromRight) && !fromTop && !fromBottom) {
      ball.vx *= -1;
      ball.x = fromLeft ? brick.x - ball.radius - 1 : brick.x + brick.width + ball.radius + 1;
      return;
    }

    ball.vy *= -1;
    if (fromTop) {
      ball.y = brick.y - ball.radius - 1;
    } else if (fromBottom) {
      ball.y = brick.y + brick.height + ball.radius + 1;
    }
  }

  function applyItem(item) {
    if (item.type === "extra") {
      const direction = game.balls.length % 2 === 0 ? -1 : 1;
      game.balls.push(createBall(game.paddleX + game.paddleWidth / 2, paddleY - 14, direction));
      api.sound("collect");
      api.setHint("Extra ball online.");
      return;
    }

    if (item.type === "power") {
      game.powerHitsRemaining += 2;
      spawnBurst(item.x, item.y, "rgba(255, 214, 132, ALPHA)");
      api.sound("collect");
      api.setHint(`Power shot x${game.powerHitsRemaining}.`);
      return;
    }

    if (item.type === "slow") {
      game.slowTime = Math.max(game.slowTime, 9);
      retuneBallSpeeds();
      spawnBurst(item.x, item.y, "rgba(168, 176, 255, ALPHA)");
      api.sound("collect");
      api.setHint("Ball speed reduced.");
      return;
    }

    if (item.type === "magnet") {
      game.magnetTime = Math.max(game.magnetTime, 10);
      spawnBurst(item.x, item.y, "rgba(255, 177, 141, ALPHA)");
      api.sound("collect");
      api.setHint("Magnet paddle active.");
      return;
    }

    const factor = item.type === "wide" ? 1.15 : 0.85;
    const center = game.paddleX + game.paddleWidth / 2;
    game.paddleWidth = clamp(game.paddleWidth * factor, paddleBaseWidth * 0.7, paddleBaseWidth * 1.5);
    game.paddleX = center - game.paddleWidth / 2;
    clampPaddle();
    spawnBurst(item.x, item.y, item.type === "wide" ? "rgba(123, 233, 255, ALPHA)" : "rgba(255, 131, 182, ALPHA)");
    api.sound(item.type === "wide" ? "collect" : "deny");
    api.setHint(item.type === "wide" ? "Paddle widened." : "Paddle reduced.");
  }

  function updateItems(delta) {
    const seconds = delta / 1000;
    game.items = game.items.filter((item) => {
      item.y += item.vy * seconds;

      if (
        item.y + item.size * 0.5 >= paddleY &&
        item.y - item.size * 0.5 <= paddleY + 10 &&
        item.x >= game.paddleX &&
        item.x <= game.paddleX + game.paddleWidth
      ) {
        applyItem(item);
        return false;
      }

      return item.y < height + 30;
    });
  }

  function updateBalls(delta) {
    const seconds = delta / 1000;
    game.balls = game.balls.filter((ball) => {
      if (game.magnetTime > 0 && ball.vy > 0 && ball.y >= paddleY - 96) {
        ball.vx += (game.paddleX + game.paddleWidth / 2 - ball.x) * 4.8 * seconds;
      }

      const previousX = ball.x;
      const previousY = ball.y;
      ball.x += (ball.vx * seconds);
      ball.y += (ball.vy * seconds);

      if (ball.x <= ball.radius) {
        ball.x = ball.radius;
        ball.vx = Math.abs(ball.vx);
      } else if (ball.x >= width - ball.radius) {
        ball.x = width - ball.radius;
        ball.vx = -Math.abs(ball.vx);
      }

      if (ball.y <= ball.radius) {
        ball.y = ball.radius;
        ball.vy = Math.abs(ball.vy);
      }

      if (
        ball.y + ball.radius >= paddleY &&
        ball.y - ball.radius <= paddleY + 10 &&
        ball.x >= game.paddleX - (game.magnetTime > 0 ? 10 : 0) &&
        ball.x <= game.paddleX + game.paddleWidth + (game.magnetTime > 0 ? 10 : 0) &&
        ball.vy > 0
      ) {
        bounceOffPaddle(ball);
      }

      for (const brick of game.bricks) {
        if (!brick.alive) continue;
        if (
          ball.x + ball.radius > brick.x &&
          ball.x - ball.radius < brick.x + brick.width &&
          ball.y + ball.radius > brick.y &&
          ball.y - ball.radius < brick.y + brick.height
        ) {
          handleBrickHit(ball, brick, previousX, previousY);
          break;
        }
      }

      return ball.y <= height + 24;
    });
  }

  function updateEffects(delta) {
    const seconds = delta / 1000;
    game.effects = game.effects.filter((effect) => {
      effect.life -= seconds;
      if (effect.kind === "spark") {
        effect.x += effect.vx * seconds;
        effect.y += effect.vy * seconds;
        effect.vx *= 0.97;
        effect.vy = effect.vy * 0.97 + 12 * seconds;
      }
      return effect.life > 0;
    });
  }

  function update(delta) {
    const seconds = delta / 1000;
    const hadSlow = game.slowTime > 0;
    game.slowTime = Math.max(0, game.slowTime - seconds);
    game.magnetTime = Math.max(0, game.magnetTime - seconds);
    game.bricks.forEach((brick) => {
      brick.flash = Math.max(0, (brick.flash || 0) - seconds);
    });
    if (hadSlow && game.slowTime === 0) {
      retuneBallSpeeds();
    }
    updateEffects(delta);

    if (game.roundDelay > 0) {
      game.roundDelay = Math.max(0, game.roundDelay - delta / 1000);
      updateItems(delta);
      if (game.roundDelay === 0) {
        startRound(false);
      }
      return;
    }

    updateItems(delta);
    updateBalls(delta);

    if (game.bricks.every((brick) => !brick.alive)) {
      game.round += 1;
      game.roundDelay = 0.8;
      api.sound("level");
      api.setHint(game.round % 10 === 0 ? `${phaseLabel(game.round - 1)} clear. ${phaseLabel()} boss incoming.` : `${phaseLabel(game.round - 1)} clear. ${phaseLabel()} incoming.`);
      return;
    }

    if (game.balls.length === 0) {
      stop(`Ball lost on ${phaseLabel().toLowerCase()}.`);
    }
  }

  function loop(timestamp) {
    const delta = Math.min(32, timestamp - game.lastTime || 16);
    game.lastTime = timestamp;
    update(delta);
    draw();
    if (game.running) {
      game.raf = requestAnimationFrame(loop);
    }
  }

  canvas.addEventListener("pointermove", (event) => {
    movePaddle(event.clientX);
  });
  canvas.addEventListener("pointerdown", (event) => {
    movePaddle(event.clientX);
  });

  api.setPrimary("Start", reset);
  draw();

  return {
    destroy() {
      cancelAnimationFrame(game.raf);
    }
  };
}

function createOrbitMatch(root, api) {
  api.setCurrentLabel("Hits");
  api.setBestLabel("Best Hits");

  const stage = document.createElement("div");
  stage.className = "canvas-stage";
  const { canvas, ctx, width, height } = makeCanvas(320, 380);
  stage.appendChild(canvas);
  stage.appendChild(
    buildTouchControls([
      [{ label: "Match", onPress: tap, accent: true }]
    ])
  );
  root.appendChild(stage);

  const colors = ["#ffbf47", "#5ee1ff", "#ff6ca8", "#76f0c2"];
  const lockCenter = Math.PI * 1.5;
  const segmentSweep = Math.PI / 2;
  const wedgeGap = 0.06;
  const maxLockTolerance = segmentSweep / 2 - wedgeGap - 0.08;
  const minLockTolerance = 0.28;
  const game = {
    rotation: 0,
    speed: 0.00102,
    targetIndex: 0,
    score: 0,
    lockFlash: 0,
    ripple: 0,
    cooldown: 0,
    running: false,
    raf: 0,
    lastTime: 0
  };

  function signedAngleDistance(a, b) {
    const full = Math.PI * 2;
    let diff = (a - b) % full;
    if (diff > Math.PI) diff -= full;
    if (diff < -Math.PI) diff += full;
    return diff;
  }

  function targetCenterAngle(index = game.targetIndex) {
    return game.rotation + index * segmentSweep + segmentSweep / 2;
  }

  function alignmentError() {
    return signedAngleDistance(targetCenterAngle(), lockCenter);
  }

  function alignmentDistance() {
    return Math.abs(alignmentError());
  }

  function currentTolerance() {
    return Math.max(minLockTolerance, maxLockTolerance - game.score * 0.008);
  }

  function chooseNextTarget() {
    const nextOffset = randomInt(1, 3);
    game.targetIndex = (game.targetIndex + nextOffset) % 4;
  }

  function drawRing(centerX, centerY, radius, innerRadius) {
    const targetGlow = 1 - clamp(alignmentDistance() / (currentTolerance() + 0.18), 0, 1);

    colors.forEach((color, index) => {
      const start = game.rotation + index * segmentSweep + wedgeGap;
      const end = start + segmentSweep - wedgeGap * 2;
      const isTarget = index === game.targetIndex;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, start, end);
      ctx.arc(centerX, centerY, innerRadius, end, start, true);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();

      if (isTarget) {
        ctx.fillStyle = `rgba(255,255,255,${0.08 + targetGlow * 0.16})`;
        ctx.fill();
      }

      ctx.strokeStyle = `rgba(255,255,255,${isTarget ? 0.2 + targetGlow * 0.3 : 0.1})`;
      ctx.lineWidth = isTarget ? 3 : 2;
      ctx.stroke();
    });
  }

  function drawLockZone(centerX, centerY, radius) {
    const tolerance = currentTolerance();
    const pulse = 1 - clamp(alignmentDistance() / (tolerance + 0.12), 0, 1);

    ctx.strokeStyle = "rgba(255,255,255,0.12)";
    ctx.lineWidth = 18;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 14, lockCenter - tolerance, lockCenter + tolerance);
    ctx.stroke();

    ctx.strokeStyle = `rgba(255, 216, 108, ${0.3 + pulse * 0.4 + game.lockFlash * 0.25})`;
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 14, lockCenter - tolerance * 0.82, lockCenter + tolerance * 0.82);
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - radius - 34);
    ctx.lineTo(centerX - 14, centerY - radius - 8);
    ctx.lineTo(centerX + 14, centerY - radius - 8);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "rgba(255,255,255,0.72)";
    ctx.fillRect(centerX - 1.5, centerY - radius - 10, 3, 12);
  }

  function drawTargetChip(centerX, centerY) {
    const ringPulse = Math.sin(game.ripple * 10) * 0.5 + 0.5;

    ctx.fillStyle = "rgba(7, 12, 22, 0.74)";
    ctx.beginPath();
    ctx.arc(centerX, centerY, 52, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 52, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = colors[game.targetIndex];
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = `rgba(255,255,255,${0.18 + ringPulse * 0.18 + game.lockFlash * 0.22})`;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 38, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = "#f5f7fb";
    ctx.font = '700 10px "SFMono-Regular", "Roboto Mono", monospace';
    ctx.textAlign = "center";
    ctx.fillText("TARGET", centerX, centerY - 44);
    ctx.fillStyle = "rgba(255,255,255,0.78)";
    ctx.fillText("MATCH TOP", centerX, centerY + 60);
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#0f1730";
    ctx.fillRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2 + 8;
    const radius = 108;
    const innerRadius = 62;

    ctx.fillStyle = "rgba(94, 225, 255, 0.08)";
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 34, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(255,255,255,0.06)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 22, 0, Math.PI * 2);
    ctx.stroke();

    drawLockZone(centerX, centerY, radius);
    drawRing(centerX, centerY, radius, innerRadius);
    drawTargetChip(centerX, centerY);

    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius - 12, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = "rgba(255,255,255,0.66)";
    ctx.font = '700 11px "SFMono-Regular", "Roboto Mono", monospace';
    ctx.textAlign = "left";
    ctx.fillText(`Window ${Math.round((currentTolerance() / maxLockTolerance) * 100)}%`, 18, height - 18);
  }

  function start() {
    api.countPlay();
    api.sound("start");
    game.rotation = 0;
    game.speed = 0.00102;
    game.targetIndex = randomInt(0, 3);
    game.score = 0;
    game.lockFlash = 0;
    game.ripple = 0;
    game.cooldown = 0;
    game.running = true;
    game.lastTime = performance.now();
    api.setCurrent(0);
    api.setHint("Tap when the target color reaches the top lock.");
    api.setPrimary("Restart", start);
    cancelAnimationFrame(game.raf);
    game.raf = requestAnimationFrame(loop);
  }

  function stop(message) {
    game.running = false;
    api.sound("fail");
    api.updateBest(game.score);
    api.setHint(message);
    api.setPrimary("Start", start);
  }

  function tap() {
    if (!game.running || game.cooldown > 0) return;

    const error = alignmentError();
    const tolerance = currentTolerance();
    if (Math.abs(error) > tolerance) {
      const timing = error < 0 ? "Too early." : "Too late.";
      stop(timing);
      return;
    }

    game.score += 1;
    game.lockFlash = 1;
    game.ripple = 0.42;
    game.cooldown = 0.12;
    api.sound("orbit");
    game.speed = Math.min(0.0021, game.speed + 0.00008);
    chooseNextTarget();
    api.setCurrent(game.score);
    api.updateBest(game.score);
    api.setHint(game.score === 1 ? "Clean hit." : `${game.score} hits. Keep the rhythm.`);
  }

  function loop(timestamp) {
    const delta = Math.min(32, timestamp - game.lastTime || 16);
    game.lastTime = timestamp;
    if (!game.running) {
      draw();
      return;
    }

    const seconds = delta / 1000;
    game.rotation = (game.rotation + delta * game.speed) % (Math.PI * 2);
    game.lockFlash = Math.max(0, game.lockFlash - seconds * 4.5);
    game.ripple = Math.max(0, game.ripple - seconds * 1.2);
    game.cooldown = Math.max(0, game.cooldown - seconds);
    draw();
    game.raf = requestAnimationFrame(loop);
  }

  canvas.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    tap();
  });
  api.setPrimary("Start", start);
  draw();

  return {
    onKey(event) {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      tap();
    },
    destroy() {
      cancelAnimationFrame(game.raf);
    }
  };
}

function incrementWinBest(api) {
  api.updateBest((api.getBest() || 0) + 1);
}

function createMatrix(rows, cols, factory = () => null) {
  return Array.from({ length: rows }, (_, rowIndex) =>
    Array.from({ length: cols }, (_, colIndex) => factory(rowIndex, colIndex))
  );
}

function createTicTacToe(root, api) {
  api.setCurrentLabel("Moves");
  api.setBestLabel("Wins");
  const HUMAN = "X";
  const CPU = "O";

  const stage = document.createElement("div");
  stage.className = "board-stage";
  stage.innerHTML = `
    <div class="score-row">
      <div class="score-pill">Mode <strong>Vs CPU</strong></div>
      <div class="score-pill">Board <strong>3x3</strong></div>
    </div>
    <div class="board-shell">
      <div class="ttt-grid" data-grid></div>
      <p class="board-note" data-note>Press Start for a new round.</p>
    </div>
  `;
  root.appendChild(stage);

  const gridNode = stage.querySelector("[data-grid]");
  const noteNode = stage.querySelector("[data-note]");
  const cells = Array.from({ length: 9 }, (_, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "ttt-cell";
    button.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      play(index);
    });
    gridNode.appendChild(button);
    return button;
  });

  let state = null;
  let cpuTimer = 0;
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  function winner(board) {
    for (const line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { mark: board[a], line };
      }
    }
    return null;
  }

  function render() {
    cells.forEach((cell, index) => {
      const mark = state.board[index];
      cell.textContent = mark || "";
      cell.dataset.mark = mark || "";
      cell.disabled = !state.running || Boolean(mark) || state.turn !== HUMAN;
      cell.classList.toggle("is-win", Boolean(state.winLine?.includes(index)));
    });
    api.setCurrent(state.moves);
    noteNode.textContent = state.note;
  }

  function finish(winnerMark = "") {
    state.running = false;
    clearTimeout(cpuTimer);
    if (!winnerMark) {
      state.note = "Draw board. Restart for another round.";
      api.sound("round");
    } else if (winnerMark === HUMAN) {
      state.note = "You win the round.";
      incrementWinBest(api);
      api.sound("level");
    } else {
      state.note = "CPU wins the round.";
      api.sound("fail");
    }
    render();
  }

  function cpuPick(board) {
    const open = board
      .map((mark, index) => (mark ? -1 : index))
      .filter((value) => value >= 0);

    const findLineMove = (mark) => {
      for (const [a, b, c] of lines) {
        const trio = [board[a], board[b], board[c]];
        const count = trio.filter((value) => value === mark).length;
        const empties = [a, b, c].filter((index) => !board[index]);
        if (count === 2 && empties.length === 1) return empties[0];
      }
      return -1;
    };

    const winMove = findLineMove(CPU);
    if (winMove !== -1) return winMove;
    const blockMove = findLineMove(HUMAN);
    if (blockMove !== -1) return blockMove;
    if (open.includes(4)) return 4;
    const corners = open.filter((index) => [0, 2, 6, 8].includes(index));
    if (corners.length) return choice(corners);
    return choice(open);
  }

  function cpuTurn() {
    cpuTimer = 0;
    if (!state?.running || state.turn !== CPU) return;
    const index = cpuPick(state.board);
    if (index < 0) return;
    state.board[index] = CPU;
    state.moves += 1;
    api.sound("ui");
    const win = winner(state.board);
    if (win) {
      state.winLine = win.line;
      finish(CPU);
      return;
    }
    if (state.moves === 9) {
      finish("");
      return;
    }
    state.turn = HUMAN;
    state.note = "Your move.";
    render();
  }

  function start() {
    clearTimeout(cpuTimer);
    state = {
      board: Array(9).fill(""),
      turn: HUMAN,
      moves: 0,
      running: true,
      winLine: null,
      note: "Your move."
    };
    api.setPrimary("Restart", start);
    render();
  }

  function play(index) {
    if (!state?.running || state.turn !== HUMAN || state.board[index]) return;
    state.board[index] = state.turn;
    state.moves += 1;
    api.sound("ui");
    const win = winner(state.board);
    if (win) {
      state.winLine = win.line;
      finish(HUMAN);
      return;
    }
    if (state.moves === 9) {
      finish("");
      return;
    }
    state.turn = CPU;
    state.note = "CPU is thinking.";
    render();
    cpuTimer = setTimeout(cpuTurn, 360);
  }

  api.setPrimary("Start", start);
  api.setCurrent(0);
  return {
    onKey(event) {
      if (!state?.running || state.turn !== HUMAN) return;
      const value = Number(event.key) - 1;
      if (Number.isInteger(value) && value >= 0 && value < 9) {
        event.preventDefault();
        play(value);
      }
    },
    destroy() {
      clearTimeout(cpuTimer);
    }
  };
}

function createConnectFour(root, api) {
  api.setCurrentLabel("Moves");
  api.setBestLabel("Wins");
  const HUMAN = "red";
  const CPU = "gold";

  const ROWS = 6;
  const COLS = 7;
  const stage = document.createElement("div");
  stage.className = "board-stage";
  stage.innerHTML = `
    <div class="score-row">
      <div class="score-pill">Mode <strong>Vs CPU</strong></div>
      <div class="score-pill">Grid <strong>7x6</strong></div>
    </div>
    <div class="board-shell">
      <div class="connect-controls" data-controls></div>
      <div class="connect-grid" data-grid></div>
      <p class="board-note" data-note>Press Start to begin.</p>
    </div>
  `;
  root.appendChild(stage);

  const controlsNode = stage.querySelector("[data-controls]");
  const gridNode = stage.querySelector("[data-grid]");
  const noteNode = stage.querySelector("[data-note]");

  const dropButtons = Array.from({ length: COLS }, (_, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "connect-drop";
    button.textContent = `${index + 1}`;
    button.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      drop(index);
    });
    controlsNode.appendChild(button);
    return button;
  });

  const cells = Array.from({ length: ROWS * COLS }, () => {
    const cell = document.createElement("div");
    cell.className = "connect-cell";
    cell.innerHTML = '<span class="connect-disc"></span>';
    gridNode.appendChild(cell);
    return cell;
  });

  let state = null;
  let cpuTimer = 0;

  function getCell(row, col) {
    return state.board[row][col];
  }

  function setNote(text) {
    noteNode.textContent = text;
  }

  function checkWin(row, col, color) {
    const dirs = [
      [[0, 1], [0, -1]],
      [[1, 0], [-1, 0]],
      [[1, 1], [-1, -1]],
      [[1, -1], [-1, 1]]
    ];
    for (const pair of dirs) {
      let count = 1;
      for (const [dr, dc] of pair) {
        let r = row + dr;
        let c = col + dc;
        while (r >= 0 && r < ROWS && c >= 0 && c < COLS && getCell(r, c) === color) {
          count += 1;
          r += dr;
          c += dc;
        }
      }
      if (count >= 4) return true;
    }
    return false;
  }

  function render() {
    cells.forEach((cell, index) => {
      const row = Math.floor(index / COLS);
      const col = index % COLS;
      cell.dataset.color = state.board[row][col] || "";
    });
    dropButtons.forEach((button, index) => {
      button.disabled = !state.running || state.board[0][index] || state.turn !== HUMAN;
      button.dataset.turn = state.turn;
    });
    api.setCurrent(state.moves);
  }

  function availableRow(col, board = state.board) {
    let row = ROWS - 1;
    while (row >= 0 && board[row][col]) row -= 1;
    return row;
  }

  function finish(winnerColor = "") {
    state.running = false;
    clearTimeout(cpuTimer);
    if (!winnerColor) {
      setNote("Draw grid. Restart for another round.");
      api.sound("round");
    } else if (winnerColor === HUMAN) {
      setNote("You connect four.");
      incrementWinBest(api);
      api.sound("level");
    } else {
      setNote("CPU connects four.");
      api.sound("fail");
    }
    render();
  }

  function pickCpuColumn() {
    const order = [3, 2, 4, 1, 5, 0, 6];
    const testDrop = (color, col) => {
      const row = availableRow(col);
      if (row < 0) return false;
      state.board[row][col] = color;
      const won = checkWin(row, col, color);
      state.board[row][col] = null;
      return won;
    };

    for (const col of order) {
      if (testDrop(CPU, col)) return col;
    }
    for (const col of order) {
      if (testDrop(HUMAN, col)) return col;
    }
    const valid = order.filter((col) => availableRow(col) >= 0);
    return valid[0] ?? -1;
  }

  function placeDisc(col, color) {
    const row = availableRow(col);
    if (row < 0) return false;
    state.board[row][col] = color;
    state.moves += 1;
    api.sound("drop");
    if (checkWin(row, col, color)) {
      finish(color);
      return true;
    }
    if (state.moves === ROWS * COLS) {
      finish("");
      return true;
    }
    return false;
  }

  function cpuTurn() {
    cpuTimer = 0;
    if (!state?.running || state.turn !== CPU) return;
    const col = pickCpuColumn();
    if (col < 0) return;
    const done = placeDisc(col, CPU);
    if (done) {
      render();
      return;
    }
    state.turn = HUMAN;
    setNote("Your turn. Drop a disc.");
    render();
  }

  function start() {
    clearTimeout(cpuTimer);
    state = {
      board: createMatrix(ROWS, COLS),
      turn: HUMAN,
      moves: 0,
      running: true
    };
    setNote("Your turn. Drop a disc.");
    api.setPrimary("Restart", start);
    render();
  }

  function drop(col) {
    if (!state?.running || state.turn !== HUMAN) return;
    if (availableRow(col) < 0) {
      api.sound("deny");
      return;
    }
    const done = placeDisc(col, HUMAN);
    if (done) {
      render();
      return;
    }
    state.turn = CPU;
    setNote("CPU is thinking.");
    render();
    cpuTimer = setTimeout(cpuTurn, 380);
  }

  api.setPrimary("Start", start);
  api.setCurrent(0);
  return {
    onKey(event) {
      if (!state?.running || state.turn !== HUMAN) return;
      const col = Number(event.key) - 1;
      if (Number.isInteger(col) && col >= 0 && col < COLS) {
        event.preventDefault();
        drop(col);
      }
    },
    destroy() {
      clearTimeout(cpuTimer);
    }
  };
}

function createHangman(root, api) {
  api.setCurrentLabel("Streak");
  api.setBestLabel("Best Streak");

  const words = [
    "arcade", "offline", "flight", "puzzle", "rocket", "signal", "travel", "screen",
    "memory", "ticket", "window", "cabin", "pixel", "engine", "planet", "magnet"
  ];
  const stage = document.createElement("div");
  stage.className = "board-stage";
  stage.innerHTML = `
    <div class="score-row">
      <div class="score-pill">Mode <strong>Word</strong></div>
      <div class="score-pill">Lives <strong data-lives>6</strong></div>
    </div>
    <div class="board-shell hangman-shell">
      <div class="hangman-figure" data-figure>______</div>
      <div class="hangman-word" data-word></div>
      <div class="hangman-keyboard" data-keys></div>
      <p class="board-note" data-note>Press Start to play.</p>
    </div>
  `;
  root.appendChild(stage);

  const livesNode = stage.querySelector("[data-lives]");
  const wordNode = stage.querySelector("[data-word]");
  const keysNode = stage.querySelector("[data-keys]");
  const noteNode = stage.querySelector("[data-note]");
  const figureNode = stage.querySelector("[data-figure]");

  const keyButtons = Array.from({ length: 26 }, (_, index) => {
    const letter = String.fromCharCode(65 + index);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "hangman-key";
    button.textContent = letter;
    button.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      guess(letter.toLowerCase());
    });
    keysNode.appendChild(button);
    return button;
  });

  let state = null;
  const figureFrames = ["______", "_____|", "__O__|", "__O/_|", "__O/\\\\", "_/|_\\\\", "_/|_\\\\_"];

  function chooseWord() {
    return choice(words);
  }

  function renderWord() {
    wordNode.innerHTML = "";
    [...state.word].forEach((letter) => {
      const slot = document.createElement("span");
      slot.className = "hangman-slot";
      slot.textContent = state.guessed.has(letter) ? letter.toUpperCase() : "";
      wordNode.appendChild(slot);
    });
  }

  function render() {
    livesNode.textContent = String(Math.max(0, 6 - state.misses));
    figureNode.textContent = figureFrames[state.misses];
    keyButtons.forEach((button) => {
      const letter = button.textContent.toLowerCase();
      button.disabled = !state.running || state.guessed.has(letter);
      button.classList.toggle("is-hit", state.guessed.has(letter) && state.word.includes(letter));
      button.classList.toggle("is-miss", state.guessed.has(letter) && !state.word.includes(letter));
    });
    renderWord();
    noteNode.textContent = state.note;
    api.setCurrent(state.streak);
    api.updateBest(state.bestStreak);
  }

  function launchRound(resetStreak) {
    const nextStreak = resetStreak ? 0 : state?.streak || 0;
    const bestStreak = Math.max(api.getBest() || 0, state?.bestStreak || 0);
    state = {
      word: chooseWord(),
      guessed: new Set(),
      misses: 0,
      streak: nextStreak,
      bestStreak,
      running: true,
      note: "Pick letters. Wrong calls burn the line."
    };
    api.setPrimary("Restart", () => launchRound(true));
    render();
  }

  function finishRound(won) {
    state.running = false;
    if (won) {
      state.streak += 1;
      state.bestStreak = Math.max(state.bestStreak, state.streak);
      state.note = `Solved: ${state.word.toUpperCase()}. Next word ready.`;
      api.sound("level");
      api.setPrimary("Next", () => launchRound(false));
    } else {
      state.streak = 0;
      state.note = `Missed it. Word was ${state.word.toUpperCase()}.`;
      api.sound("fail");
      api.setPrimary("Retry", () => launchRound(true));
    }
    render();
  }

  function guess(letter) {
    if (!state?.running || state.guessed.has(letter)) return;
    state.guessed.add(letter);
    if (state.word.includes(letter)) {
      api.sound("ui");
      if ([...state.word].every((char) => state.guessed.has(char))) {
        finishRound(true);
        return;
      }
    } else {
      state.misses += 1;
      api.sound("deny");
      if (state.misses >= 6) {
        finishRound(false);
        return;
      }
    }
    render();
  }

  api.setPrimary("Start", () => launchRound(true));
  api.setCurrent(0);
  return {
    onKey(event) {
      const key = event.key.toLowerCase();
      if (key.length === 1 && key >= "a" && key <= "z") {
        event.preventDefault();
        guess(key);
      }
    },
    destroy() {}
  };
}

function createSlidingPuzzle(root, api) {
  api.setCurrentLabel("Moves");
  api.setBestLabel("Solves");

  const size = 4;
  const puzzleArt = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0a1634"/>
          <stop offset="52%" stop-color="#18295d"/>
          <stop offset="100%" stop-color="#071126"/>
        </linearGradient>
        <linearGradient id="sun" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ffd96f"/>
          <stop offset="100%" stop-color="#ff8f5b"/>
        </linearGradient>
        <linearGradient id="road" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1b2248"/>
          <stop offset="100%" stop-color="#090d18"/>
        </linearGradient>
      </defs>
      <rect width="320" height="320" fill="url(#sky)"/>
      <circle cx="238" cy="84" r="56" fill="url(#sun)"/>
      <g opacity="0.25" stroke="#ffbf47" stroke-width="3">
        <line x1="182" y1="84" x2="294" y2="84"/>
        <line x1="188" y1="101" x2="288" y2="101"/>
        <line x1="196" y1="118" x2="280" y2="118"/>
      </g>
      <path d="M0 188 L62 148 L108 174 L154 134 L214 182 L262 146 L320 182 L320 320 L0 320 Z" fill="#101935"/>
      <path d="M0 208 L72 162 L128 194 L196 150 L256 190 L320 154 L320 320 L0 320 Z" fill="#16214a"/>
      <path d="M104 320 L156 198 L164 198 L216 320 Z" fill="url(#road)"/>
      <g opacity="0.35" stroke="#ff5d95" stroke-width="2">
        <line x1="34" y1="212" x2="286" y2="212"/>
        <line x1="18" y1="232" x2="302" y2="232"/>
        <line x1="0" y1="256" x2="320" y2="256"/>
        <line x1="160" y1="198" x2="160" y2="320"/>
        <line x1="160" y1="198" x2="118" y2="320"/>
        <line x1="160" y1="198" x2="202" y2="320"/>
        <line x1="160" y1="198" x2="84" y2="320"/>
        <line x1="160" y1="198" x2="236" y2="320"/>
      </g>
      <g fill="#f5f7fb" font-family="Arial, sans-serif" font-weight="900">
        <text x="34" y="72" font-size="44" letter-spacing="5">TP</text>
        <text x="34" y="104" font-size="18" letter-spacing="4" fill="#ffcf63">SLIDE</text>
      </g>
      <g fill="#76f0c2" opacity="0.95">
        <circle cx="52" cy="134" r="4"/>
        <circle cx="82" cy="152" r="3"/>
        <circle cx="116" cy="126" r="3"/>
        <circle cx="278" cy="46" r="3"/>
        <circle cx="298" cy="64" r="4"/>
      </g>
    </svg>
  `);
  const puzzleImage = `url("data:image/svg+xml;charset=UTF-8,${puzzleArt}")`;
  const stage = document.createElement("div");
  stage.className = "board-stage";
  stage.style.setProperty("--slide-art", puzzleImage);
  stage.innerHTML = `
    <div class="score-row">
      <div class="score-pill">Grid <strong>4x4</strong></div>
      <div class="score-pill">Mode <strong>Tap</strong></div>
    </div>
    <div class="board-shell">
      <div class="slide-head">
        <div class="slide-preview" data-preview aria-label="Solved image reference"></div>
        <p class="slide-copy">Rebuild the picture to match the preview.</p>
      </div>
      <div class="slide-grid" data-grid></div>
      <p class="board-note" data-note>Press Start to shuffle.</p>
    </div>
  `;
  root.appendChild(stage);

  const gridNode = stage.querySelector("[data-grid]");
  const previewNode = stage.querySelector("[data-preview]");
  const noteNode = stage.querySelector("[data-note]");
  previewNode.style.backgroundImage = puzzleImage;
  const cells = Array.from({ length: size * size }, (_, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "slide-cell";
    button.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      move(index);
    });
    gridNode.appendChild(button);
    return button;
  });

  let state = null;

  function solvedBoard() {
    return [...Array(size * size - 1).keys()].map((value) => value + 1).concat(0);
  }

  function neighbors(index) {
    const row = Math.floor(index / size);
    const col = index % size;
    return [
      row > 0 ? index - size : -1,
      row < size - 1 ? index + size : -1,
      col > 0 ? index - 1 : -1,
      col < size - 1 ? index + 1 : -1
    ].filter((value) => value >= 0);
  }

  function shuffleBoard() {
    let board = solvedBoard();
    let blank = board.indexOf(0);
    for (let step = 0; step < 180; step += 1) {
      const target = choice(neighbors(blank));
      [board[blank], board[target]] = [board[target], board[blank]];
      blank = target;
    }
    return board;
  }

  function isSolved() {
    return state.board.every((value, index) => value === (index === size * size - 1 ? 0 : index + 1));
  }

  function render() {
    cells.forEach((cell, index) => {
      const value = state.board[index];
      cell.textContent = "";
      cell.disabled = !state.running || !neighbors(index).includes(state.blank);
      cell.classList.toggle("is-empty", value === 0);
      cell.classList.toggle("has-art", value !== 0);
      if (!value) {
        cell.style.backgroundImage = "";
        cell.style.backgroundSize = "";
        cell.style.backgroundPosition = "";
        return;
      }
      const tileIndex = value - 1;
      const row = Math.floor(tileIndex / size);
      const col = tileIndex % size;
      cell.style.backgroundImage = puzzleImage;
      cell.style.backgroundSize = `${size * 100}% ${size * 100}%`;
      cell.style.backgroundPosition = `${(col / (size - 1)) * 100}% ${(row / (size - 1)) * 100}%`;
    });
    api.setCurrent(state.moves);
    noteNode.textContent = state.note;
  }

  function start() {
    state = {
      board: shuffleBoard(),
      blank: 0,
      moves: 0,
      running: true,
      note: "Match the picture to the preview."
    };
    state.blank = state.board.indexOf(0);
    api.setPrimary("Restart", start);
    render();
  }

  function move(index) {
    if (!state?.running || !neighbors(index).includes(state.blank)) return;
    [state.board[index], state.board[state.blank]] = [state.board[state.blank], state.board[index]];
    state.blank = index;
    state.moves += 1;
    api.sound("slide");
    if (isSolved()) {
      state.running = false;
      state.note = `Solved in ${state.moves} moves.`;
      incrementWinBest(api);
      api.sound("level");
    }
    render();
  }

  api.setPrimary("Start", start);
  api.setCurrent(0);
  return {
    onKey(event) {
      if (!state?.running) return;
      const blank = state.blank;
      if (event.key === "ArrowUp" && blank + size < state.board.length) move(blank + size);
      if (event.key === "ArrowDown" && blank - size >= 0) move(blank - size);
      if (event.key === "ArrowLeft" && blank % size < size - 1) move(blank + 1);
      if (event.key === "ArrowRight" && blank % size > 0) move(blank - 1);
    },
    destroy() {}
  };
}

function createCheckers(root, api) {
  api.setCurrentLabel("Moves");
  api.setBestLabel("Wins");
  const HUMAN = "red";
  const CPU = "black";

  const size = 8;
  const stage = document.createElement("div");
  stage.className = "board-stage";
  stage.innerHTML = `
    <div class="score-row">
      <div class="score-pill">Mode <strong>Vs CPU</strong></div>
      <div class="score-pill">Board <strong>8x8</strong></div>
    </div>
    <div class="board-shell">
      <div class="checker-grid" data-grid></div>
      <p class="board-note" data-note>Press Start to deal the board.</p>
    </div>
  `;
  root.appendChild(stage);

  const gridNode = stage.querySelector("[data-grid]");
  const noteNode = stage.querySelector("[data-note]");
  const cells = Array.from({ length: size * size }, (_, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "checker-cell";
    button.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      tap(Math.floor(index / size), index % size);
    });
    gridNode.appendChild(button);
    return button;
  });

  let state = null;
  let cpuTimer = 0;

  function inBounds(row, col) {
    return row >= 0 && row < size && col >= 0 && col < size;
  }

  function initialBoard() {
    return createMatrix(size, size, (row, col) => {
      if ((row + col) % 2 === 0) return null;
      if (row < 3) return { color: "black", king: false };
      if (row > 4) return { color: "red", king: false };
      return null;
    });
  }

  function dirs(piece) {
    if (piece.king) return [[1, 1], [1, -1], [-1, 1], [-1, -1]];
    return piece.color === "red" ? [[-1, 1], [-1, -1]] : [[1, 1], [1, -1]];
  }

  function movesFor(color, row, col, captureOnly = false, board = state.board) {
    const piece = board[row][col];
    if (!piece || piece.color !== color) return [];
    const moves = [];
    for (const [dr, dc] of dirs(piece)) {
      const stepRow = row + dr;
      const stepCol = col + dc;
      if (!inBounds(stepRow, stepCol)) continue;
      const stepPiece = board[stepRow][stepCol];
      if (!stepPiece && !captureOnly) {
        moves.push({ fromRow: row, fromCol: col, row: stepRow, col: stepCol, capture: null });
        continue;
      }
      if (stepPiece && stepPiece.color !== piece.color) {
        const jumpRow = row + dr * 2;
        const jumpCol = col + dc * 2;
        if (inBounds(jumpRow, jumpCol) && !board[jumpRow][jumpCol]) {
          moves.push({ fromRow: row, fromCol: col, row: jumpRow, col: jumpCol, capture: [stepRow, stepCol] });
        }
      }
    }
    return moves;
  }

  function colorHasCapture(color, board = state.board) {
    for (let row = 0; row < size; row += 1) {
      for (let col = 0; col < size; col += 1) {
        if (movesFor(color, row, col, true, board).some((move) => move.capture)) return true;
      }
    }
    return false;
  }

  function legalMoves(color, source = null, board = state.board) {
    const forceCapture = colorHasCapture(color, board);
    const list = [];
    if (source) {
      return movesFor(color, source.row, source.col, forceCapture, board).filter((move) => !forceCapture || move.capture);
    }
    for (let row = 0; row < size; row += 1) {
      for (let col = 0; col < size; col += 1) {
        list.push(...movesFor(color, row, col, forceCapture, board).filter((move) => !forceCapture || move.capture));
      }
    }
    return list;
  }

  function playerHasMove(color, board = state.board) {
    return legalMoves(color, null, board).length > 0;
  }

  function pieceCount(color, board = state.board) {
    return board.flat().filter((piece) => piece?.color === color).length;
  }

  function render() {
    const legalTargets = new Set(state.legalMoves.map((move) => `${move.row}:${move.col}`));
    cells.forEach((cell, index) => {
      const row = Math.floor(index / size);
      const col = index % size;
      const piece = state.board[row][col];
      const legal = legalTargets.has(`${row}:${col}`);
      cell.className = `checker-cell${(row + col) % 2 ? " is-dark" : ""}`;
      cell.classList.toggle("is-selected", Boolean(state.selected && state.selected.row === row && state.selected.col === col));
      cell.classList.toggle("is-target", legal);
      cell.disabled = !state.running || state.turn !== HUMAN || (!(piece && piece.color === HUMAN) && !legal);
      cell.innerHTML = piece
        ? `<span class="checker-piece is-${piece.color}${piece.king ? " is-king" : ""}"></span>`
        : "";
    });
    api.setCurrent(state.moves);
    noteNode.textContent = state.note;
  }

  function endGame(winner) {
    state.running = false;
    clearTimeout(cpuTimer);
    if (winner === HUMAN) {
      state.note = "You win the board.";
      incrementWinBest(api);
      api.sound("level");
    } else {
      state.note = "CPU wins the board.";
      api.sound("fail");
    }
    render();
  }

  function applyMove(move) {
    const piece = state.board[move.fromRow][move.fromCol];
    state.board[move.fromRow][move.fromCol] = null;
    state.board[move.row][move.col] = piece;
    if (move.capture) {
      const [cr, cc] = move.capture;
      state.board[cr][cc] = null;
    }
    if ((piece.color === HUMAN && move.row === 0) || (piece.color === CPU && move.row === size - 1)) {
      piece.king = true;
    }
    return piece;
  }

  function cpuScore(move) {
    const piece = state.board[move.fromRow][move.fromCol];
    const captured = move.capture ? state.board[move.capture[0]][move.capture[1]] : null;
    const willKing = !piece.king && move.row === size - 1;
    return (
      (move.capture ? 100 : 0) +
      (captured?.king ? 30 : 0) +
      (willKing ? 24 : 0) +
      (piece.king ? 8 : 0) +
      (3.5 - Math.abs(move.col - 3.5))
    );
  }

  function cpuTurn(source = null) {
    cpuTimer = 0;
    if (!state?.running || state.turn !== CPU) return;
    const options = legalMoves(CPU, source);
    if (!options.length) {
      endGame(HUMAN);
      return;
    }
    const ranked = [...options].sort((a, b) => cpuScore(b) - cpuScore(a));
    const bestScore = cpuScore(ranked[0]);
    const move = choice(ranked.filter((entry) => cpuScore(entry) === bestScore));
    applyMove(move);
    state.moves += 1;
    api.sound(move.capture ? "lock" : "slide");
    if (!pieceCount(HUMAN)) {
      endGame(CPU);
      return;
    }
    if (move.capture) {
      const follow = legalMoves(CPU, { row: move.row, col: move.col }).filter((entry) => entry.capture);
      if (follow.length) {
        state.note = "CPU keeps jumping.";
        render();
        cpuTimer = setTimeout(() => cpuTurn({ row: move.row, col: move.col }), 360);
        return;
      }
    }
    if (!playerHasMove(HUMAN)) {
      endGame(CPU);
      return;
    }
    state.turn = HUMAN;
    state.selected = null;
    state.legalMoves = [];
    state.note = "Your turn.";
    render();
  }

  function start() {
    clearTimeout(cpuTimer);
    state = {
      board: initialBoard(),
      turn: HUMAN,
      selected: null,
      legalMoves: [],
      moves: 0,
      running: true,
      note: "Your turn. Captures are forced."
    };
    api.setPrimary("Restart", start);
    render();
  }

  function tap(row, col) {
    if (!state?.running || state.turn !== HUMAN) return;
    const target = state.legalMoves.find((move) => move.row === row && move.col === col);
    if (state.selected && target) {
      applyMove(target);
      state.moves += 1;
      api.sound(target.capture ? "lock" : "slide");
      if (!pieceCount(CPU)) {
        endGame(HUMAN);
        return;
      }
      if (target.capture) {
        state.selected = { row: target.row, col: target.col };
        state.legalMoves = legalMoves(HUMAN, state.selected).filter((move) => move.capture);
        if (state.legalMoves.length) {
          state.note = "Keep jumping.";
          render();
          return;
        }
      }
      state.turn = CPU;
      state.selected = null;
      state.legalMoves = [];
      if (!playerHasMove(CPU)) {
        endGame(HUMAN);
        return;
      }
      state.note = "CPU is thinking.";
      render();
      cpuTimer = setTimeout(() => cpuTurn(), 420);
      return;
    }

    const piece = state.board[row][col];
    if (!piece || piece.color !== HUMAN) return;
    const moves = legalMoves(HUMAN, { row, col });
    if (!moves.length) return;
    state.selected = { row, col };
    state.legalMoves = moves;
    state.note = "Choose a highlighted landing square.";
    api.sound("ui");
    render();
  }

  api.setPrimary("Start", start);
  api.setCurrent(0);
  return {
    destroy() {
      clearTimeout(cpuTimer);
    }
  };
}

function createReversi(root, api) {
  api.setCurrentLabel("Moves");
  api.setBestLabel("Wins");

  const size = 8;
  const stage = document.createElement("div");
  stage.className = "board-stage";
  stage.innerHTML = `
    <div class="score-row">
      <div class="score-pill">Mode <strong>Local</strong></div>
      <div class="score-pill">Board <strong>8x8</strong></div>
    </div>
    <div class="board-shell">
      <div class="reversi-grid" data-grid></div>
      <p class="board-note" data-note>Press Start to begin.</p>
    </div>
  `;
  root.appendChild(stage);

  const gridNode = stage.querySelector("[data-grid]");
  const noteNode = stage.querySelector("[data-note]");
  const cells = Array.from({ length: size * size }, (_, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "reversi-cell";
    button.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      play(Math.floor(index / size), index % size);
    });
    gridNode.appendChild(button);
    return button;
  });

  let state = null;
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];

  function inBounds(row, col) {
    return row >= 0 && row < size && col >= 0 && col < size;
  }

  function flipsFor(turn, row, col) {
    if (state.board[row][col]) return [];
    const enemy = turn === "black" ? "white" : "black";
    const flips = [];
    for (const [dr, dc] of dirs) {
      let r = row + dr;
      let c = col + dc;
      const line = [];
      while (inBounds(r, c) && state.board[r][c] === enemy) {
        line.push([r, c]);
        r += dr;
        c += dc;
      }
      if (line.length && inBounds(r, c) && state.board[r][c] === turn) {
        flips.push(...line);
      }
    }
    return flips;
  }

  function validMoves(turn) {
    const list = [];
    for (let row = 0; row < size; row += 1) {
      for (let col = 0; col < size; col += 1) {
        const flips = flipsFor(turn, row, col);
        if (flips.length) list.push({ row, col, flips });
      }
    }
    return list;
  }

  function scoreOf(color) {
    return state.board.flat().filter((value) => value === color).length;
  }

  function render() {
    const moves = validMoves(state.turn);
    cells.forEach((cell, index) => {
      const row = Math.floor(index / size);
      const col = index % size;
      const piece = state.board[row][col];
      const isMove = moves.some((move) => move.row === row && move.col === col);
      cell.classList.toggle("is-move", isMove);
      cell.innerHTML = piece ? `<span class="reversi-disc is-${piece}"></span>` : isMove ? '<span class="reversi-hint"></span>' : "";
      cell.disabled = !state.running || !isMove;
    });
    api.setCurrent(state.moves);
    noteNode.textContent = `${state.note} Black ${scoreOf("black")} / White ${scoreOf("white")}`;
  }

  function finish() {
    state.running = false;
    const black = scoreOf("black");
    const white = scoreOf("white");
    if (black === white) {
      state.note = "Draw board.";
      api.sound("round");
    } else {
      state.note = `${black > white ? "Black" : "White"} controls the board.`;
      incrementWinBest(api);
      api.sound("level");
    }
    render();
  }

  function start() {
    state = {
      board: createMatrix(size, size),
      turn: "black",
      moves: 0,
      running: true,
      note: "Black opens."
    };
    state.board[3][3] = "white";
    state.board[3][4] = "black";
    state.board[4][3] = "black";
    state.board[4][4] = "white";
    api.setPrimary("Restart", start);
    render();
  }

  function play(row, col) {
    if (!state?.running) return;
    const flips = flipsFor(state.turn, row, col);
    if (!flips.length) return;
    state.board[row][col] = state.turn;
    flips.forEach(([r, c]) => {
      state.board[r][c] = state.turn;
    });
    state.moves += 1;
    api.sound("lock");
    const nextTurn = state.turn === "black" ? "white" : "black";
    if (validMoves(nextTurn).length) {
      state.turn = nextTurn;
      state.note = `${nextTurn === "black" ? "Black" : "White"} to move.`;
      render();
      return;
    }
    if (validMoves(state.turn).length) {
      state.note = `${nextTurn === "black" ? "Black" : "White"} passes.`;
      render();
      return;
    }
    finish();
  }

  api.setPrimary("Start", start);
  api.setCurrent(0);
  return {
    destroy() {}
  };
}

function createDotsAndBoxes(root, api) {
  api.setCurrentLabel("Boxes");
  api.setBestLabel("Wins");
  const HUMAN = "amber";
  const CPU = "mint";

  const size = 4;
  const stage = document.createElement("div");
  stage.className = "board-stage";
  stage.innerHTML = `
    <div class="score-row">
      <div class="score-pill">Mode <strong>Vs CPU</strong></div>
      <div class="score-pill">Board <strong>4x4</strong></div>
    </div>
    <div class="board-shell">
      <div class="dots-board" data-board></div>
      <p class="board-note" data-note>Press Start to draw the first line.</p>
    </div>
  `;
  root.appendChild(stage);

  const boardNode = stage.querySelector("[data-board]");
  const noteNode = stage.querySelector("[data-note]");
  let state = null;
  let cpuTimer = 0;

  function lineCount() {
    return state.hLines.flat().filter(Boolean).length + state.vLines.flat().filter(Boolean).length;
  }

  function ownerLabel(owner) {
    return owner === "amber" ? "Amber" : "Mint";
  }

  function affectedBoxes(kind, row, col) {
    const checks = [];
    if (kind === "h") {
      if (row > 0) checks.push([row - 1, col]);
      if (row < size) checks.push([row, col]);
    } else {
      if (col > 0) checks.push([row, col - 1]);
      if (col < size) checks.push([row, col]);
    }
    return checks.filter(([boxRow, boxCol]) => state.boxes[boxRow]?.[boxCol] !== undefined);
  }

  function claimBoxes(kind, row, col) {
    const claimed = [];
    affectedBoxes(kind, row, col).forEach(([boxRow, boxCol]) => {
      if (state.boxes[boxRow]?.[boxCol]) return;
      if (
        state.hLines[boxRow][boxCol] &&
        state.hLines[boxRow + 1][boxCol] &&
        state.vLines[boxRow][boxCol] &&
        state.vLines[boxRow][boxCol + 1]
      ) {
        state.boxes[boxRow][boxCol] = state.turn;
        state.scores[state.turn] += 1;
        claimed.push([boxRow, boxCol]);
      }
    });
    return claimed;
  }

  function sideCount(boxRow, boxCol, pending = null) {
    let count = 0;
    if (state.hLines[boxRow][boxCol] || (pending?.kind === "h" && pending.row === boxRow && pending.col === boxCol)) count += 1;
    if (state.hLines[boxRow + 1][boxCol] || (pending?.kind === "h" && pending.row === boxRow + 1 && pending.col === boxCol)) count += 1;
    if (state.vLines[boxRow][boxCol] || (pending?.kind === "v" && pending.row === boxRow && pending.col === boxCol)) count += 1;
    if (state.vLines[boxRow][boxCol + 1] || (pending?.kind === "v" && pending.row === boxRow && pending.col === boxCol + 1)) count += 1;
    return count;
  }

  function availableLines() {
    const lines = [];
    for (let row = 0; row < size + 1; row += 1) {
      for (let col = 0; col < size; col += 1) {
        if (!state.hLines[row][col]) lines.push({ kind: "h", row, col });
      }
    }
    for (let row = 0; row < size; row += 1) {
      for (let col = 0; col < size + 1; col += 1) {
        if (!state.vLines[row][col]) lines.push({ kind: "v", row, col });
      }
    }
    return lines;
  }

  function cpuPickLine() {
    const lines = availableLines();
    let best = null;
    let bestScore = -Infinity;
    for (const line of lines) {
      const boxes = affectedBoxes(line.kind, line.row, line.col);
      const claimed = boxes.filter(([boxRow, boxCol]) => sideCount(boxRow, boxCol, line) === 4).length;
      const danger = boxes.reduce((max, [boxRow, boxCol]) => Math.max(max, sideCount(boxRow, boxCol, line)), 0);
      const score = claimed * 100 - danger * 8 + randomInt(0, 4);
      if (score > bestScore) {
        bestScore = score;
        best = line;
      }
    }
    return best;
  }

  function render() {
    boardNode.innerHTML = "";
    boardNode.style.gridTemplateColumns = `repeat(${size * 2 + 1}, minmax(0, 1fr))`;
    for (let row = 0; row < size * 2 + 1; row += 1) {
      for (let col = 0; col < size * 2 + 1; col += 1) {
        if (row % 2 === 0 && col % 2 === 0) {
          const dot = document.createElement("span");
          dot.className = "dots-dot";
          boardNode.appendChild(dot);
          continue;
        }
        if (row % 2 === 0) {
          const line = document.createElement("button");
          line.type = "button";
          line.className = "dots-line is-horizontal";
          const owner = state.hLines[row / 2][(col - 1) / 2];
          if (owner) line.dataset.owner = owner;
          line.disabled = !state.running || Boolean(owner) || state.turn !== HUMAN;
          line.addEventListener("pointerdown", (event) => {
            event.preventDefault();
            playLine("h", row / 2, (col - 1) / 2);
          });
          boardNode.appendChild(line);
          continue;
        }
        if (col % 2 === 0) {
          const line = document.createElement("button");
          line.type = "button";
          line.className = "dots-line is-vertical";
          const owner = state.vLines[(row - 1) / 2][col / 2];
          if (owner) line.dataset.owner = owner;
          line.disabled = !state.running || Boolean(owner) || state.turn !== HUMAN;
          line.addEventListener("pointerdown", (event) => {
            event.preventDefault();
            playLine("v", (row - 1) / 2, col / 2);
          });
          boardNode.appendChild(line);
          continue;
        }
        const box = document.createElement("div");
        const owner = state.boxes[(row - 1) / 2][(col - 1) / 2];
        box.className = "dots-box";
        if (owner) {
          box.dataset.owner = owner;
          box.textContent = owner === "amber" ? "A" : "M";
        }
        boardNode.appendChild(box);
      }
    }
    api.setCurrent(Math.max(state.scores.amber, state.scores.mint));
    noteNode.textContent = `${state.note} Amber ${state.scores.amber} / Mint ${state.scores.mint}`;
  }

  function finish() {
    state.running = false;
    clearTimeout(cpuTimer);
    if (state.scores.amber === state.scores.mint) {
      state.note = "Even board.";
      api.sound("round");
    } else {
      state.note = `${ownerLabel(state.scores.amber > state.scores.mint ? "amber" : "mint")} wins the grid.`;
      if (state.scores.amber > state.scores.mint) {
        incrementWinBest(api);
        api.sound("level");
      } else {
        api.sound("fail");
      }
    }
    render();
  }

  function start() {
    clearTimeout(cpuTimer);
    state = {
      hLines: createMatrix(size + 1, size, () => ""),
      vLines: createMatrix(size, size + 1, () => ""),
      boxes: createMatrix(size, size, () => ""),
      scores: { amber: 0, mint: 0 },
      turn: HUMAN,
      running: true,
      note: "Your line. Claim a box to keep the turn."
    };
    api.setPrimary("Restart", start);
    render();
  }

  function cpuTurn() {
    cpuTimer = 0;
    if (!state?.running || state.turn !== CPU) return;
    const line = cpuPickLine();
    if (!line) return;
    playLine(line.kind, line.row, line.col, true);
  }

  function playLine(kind, row, col, fromCpu = false) {
    if (!state?.running) return;
    if (!fromCpu && state.turn !== HUMAN) return;
    if (kind === "h") state.hLines[row][col] = state.turn;
    else state.vLines[row][col] = state.turn;
    const claimed = claimBoxes(kind, row, col);
    api.sound(claimed.length ? "lock" : "ui");
    if (!claimed.length) {
      state.turn = state.turn === HUMAN ? CPU : HUMAN;
      state.note = state.turn === HUMAN ? "Your line." : "CPU is drawing.";
    } else {
      state.note = `${ownerLabel(state.turn)} claims ${claimed.length} box${claimed.length === 1 ? "" : "es"}.`;
    }
    if (lineCount() === (size + 1) * size * 2) {
      finish();
      return;
    }
    render();
    if (state.running && state.turn === CPU) {
      cpuTimer = setTimeout(cpuTurn, claimed.length ? 280 : 420);
    }
  }

  api.setPrimary("Start", start);
  api.setCurrent(0);
  return {
    destroy() {
      clearTimeout(cpuTimer);
    }
  };
}

function createBattleship(root, api) {
  api.setCurrentLabel("Hits");
  api.setBestLabel("Wins");

  const size = 6;
  const ships = [3, 2, 2];
  const stage = document.createElement("div");
  stage.className = "board-stage";
  stage.innerHTML = `
    <div class="score-row">
      <div class="score-pill">Mode <strong>Vs CPU</strong></div>
      <div class="score-pill">Grid <strong>6x6</strong></div>
    </div>
    <div class="board-shell battle-shell">
      <div class="battle-layout">
        <div class="battle-panel">
          <h4>Your Sea</h4>
          <div class="battle-grid" data-player></div>
        </div>
        <div class="battle-panel">
          <h4>Enemy Sea</h4>
          <div class="battle-grid" data-cpu></div>
        </div>
      </div>
      <p class="board-note" data-note>Press Start to launch.</p>
    </div>
  `;
  root.appendChild(stage);

  const playerNode = stage.querySelector("[data-player]");
  const cpuNode = stage.querySelector("[data-cpu]");
  const noteNode = stage.querySelector("[data-note]");

  const playerCells = Array.from({ length: size * size }, (_, index) => {
    const cell = document.createElement("div");
    cell.className = "battle-cell";
    playerNode.appendChild(cell);
    return cell;
  });

  const cpuCells = Array.from({ length: size * size }, (_, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "battle-cell";
    button.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      fire(Math.floor(index / size), index % size);
    });
    cpuNode.appendChild(button);
    return button;
  });

  let state = null;
  let cpuTimer = 0;

  function emptyBoard() {
    return createMatrix(size, size, () => ({ ship: false, hit: false, miss: false }));
  }

  function randomFleet() {
    const board = emptyBoard();
    for (const length of ships) {
      let placed = false;
      while (!placed) {
        const horizontal = Math.random() < 0.5;
        const row = randomInt(0, horizontal ? size - 1 : size - length);
        const col = randomInt(0, horizontal ? size - length : size - 1);
        const coords = [];
        for (let step = 0; step < length; step += 1) {
          coords.push([row + (horizontal ? 0 : step), col + (horizontal ? step : 0)]);
        }
        if (coords.some(([r, c]) => board[r][c].ship)) continue;
        coords.forEach(([r, c]) => {
          board[r][c].ship = true;
        });
        placed = true;
      }
    }
    return board;
  }

  function fleetDown(board) {
    return board.flat().every((cell) => !cell.ship || cell.hit);
  }

  function render() {
    playerCells.forEach((cell, index) => {
      const row = Math.floor(index / size);
      const col = index % size;
      const slot = state.player[row][col];
      cell.className = "battle-cell";
      if (slot.ship) cell.classList.add("has-ship");
      if (slot.hit) cell.classList.add("is-hit");
      if (slot.miss) cell.classList.add("is-miss");
    });
    cpuCells.forEach((cell, index) => {
      const row = Math.floor(index / size);
      const col = index % size;
      const slot = state.cpu[row][col];
      cell.className = "battle-cell";
      if (slot.hit) cell.classList.add("is-hit");
      if (slot.miss) cell.classList.add("is-miss");
      cell.disabled = !state.running || slot.hit || slot.miss || !state.playerTurn;
    });
    api.setCurrent(state.hits);
    noteNode.textContent = state.note;
  }

  function cpuTurn() {
    cpuTimer = 0;
    if (!state.running) return;
    const choices = [];
    state.player.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (!cell.hit && !cell.miss) choices.push([rowIndex, colIndex]);
      });
    });
    if (!choices.length) return;
    const [row, col] = choice(choices);
    const slot = state.player[row][col];
    if (slot.ship) {
      slot.hit = true;
      state.note = "Enemy scores a hit.";
      api.sound("explosion");
      if (fleetDown(state.player)) {
        state.running = false;
        state.note = "Fleet lost. Restart the battle.";
        api.sound("fail");
        render();
        return;
      }
    } else {
      slot.miss = true;
      state.note = "Enemy misses. Your turn.";
      api.sound("ui");
    }
    state.playerTurn = true;
    render();
  }

  function start() {
    clearTimeout(cpuTimer);
    state = {
      player: randomFleet(),
      cpu: randomFleet(),
      playerTurn: true,
      running: true,
      hits: 0,
      note: "Fire on the enemy grid."
    };
    api.setPrimary("Restart", start);
    render();
  }

  function fire(row, col) {
    if (!state?.running || !state.playerTurn) return;
    const slot = state.cpu[row][col];
    if (slot.hit || slot.miss) return;
    state.playerTurn = false;
    if (slot.ship) {
      slot.hit = true;
      state.hits += 1;
      state.note = "Direct hit.";
      api.sound("explosion");
      if (fleetDown(state.cpu)) {
        state.running = false;
        state.note = "Enemy fleet sunk.";
        incrementWinBest(api);
        api.sound("level");
        render();
        return;
      }
    } else {
      slot.miss = true;
      state.note = "Splash. Enemy turn.";
      api.sound("deny");
    }
    render();
    cpuTimer = setTimeout(cpuTurn, 420);
  }

  api.setPrimary("Start", start);
  api.setCurrent(0);
  return {
    destroy() {
      clearTimeout(cpuTimer);
    }
  };
}

function createLudo(root, api) {
  api.setCurrentLabel("Moves");
  api.setBestLabel("Wins");

  const HUMAN = "red";
  const CPU = "gold";
  const pathLength = 24;
  const finish = 27;
  const safeSpaces = [0, 12];
  const players = [
    { id: HUMAN, label: "You", start: 0 },
    { id: CPU, label: "CPU", start: 12 }
  ];
  const stage = document.createElement("div");
  stage.className = "board-stage";
  stage.innerHTML = `
    <div class="score-row">
      <div class="score-pill">Mode <strong>Vs CPU</strong></div>
      <div class="score-pill">Pawns <strong>2 each</strong></div>
    </div>
    <div class="board-shell ludo-shell">
      <div class="ludo-toolbar">
        <div class="score-pill">Die <strong data-die>-</strong></div>
        <div class="score-pill">Turn <strong data-turn>Red</strong></div>
      </div>
      <div class="ludo-track" data-track></div>
      <div class="ludo-lanes">
        <div class="ludo-lane" data-lane="red"></div>
        <div class="ludo-lane" data-lane="gold"></div>
      </div>
      <div class="ludo-pawns" data-pawns></div>
      <p class="board-note" data-note>Press Start to race.</p>
    </div>
  `;
  root.appendChild(stage);

  const dieNode = stage.querySelector("[data-die]");
  const turnNode = stage.querySelector("[data-turn]");
  const trackNode = stage.querySelector("[data-track]");
  const pawnsNode = stage.querySelector("[data-pawns]");
  const noteNode = stage.querySelector("[data-note]");
  const laneNodes = {
    red: stage.querySelector('[data-lane="red"]'),
    gold: stage.querySelector('[data-lane="gold"]')
  };

  const trackCells = Array.from({ length: pathLength }, (_, index) => {
    const cell = document.createElement("div");
    cell.className = "ludo-space";
    if (index === 0 || index === 12) cell.classList.add("is-safe");
    trackNode.appendChild(cell);
    return cell;
  });

  let state = null;
  let cpuTimer = 0;

  function playerById(id) {
    return players.find((player) => player.id === id);
  }

  function enemyId(id) {
    return id === HUMAN ? CPU : HUMAN;
  }

  function absolutePosition(playerId, progress) {
    return (playerById(playerId).start + progress) % pathLength;
  }

  function movablePawns(playerOrId = state.turn, dice = state.die) {
    const playerId = typeof playerOrId === "string" ? playerOrId : playerOrId.id;
    return state.pawns[playerId]
      .map((progress, index) => ({ progress, index }))
      .filter(({ progress }) => {
        if (progress === finish) return false;
        if (progress === -1) return dice === 6;
        return progress + dice <= finish;
      });
  }

  function pawnChip(playerId, index) {
    return `<span class="ludo-pawn is-${playerId}" data-pawn="${playerId}-${index}"></span>`;
  }

  function nextProgress(progress, dice) {
    return progress === -1 ? 0 : progress + dice;
  }

  function captureTargets(playerId, progress, dice) {
    const next = nextProgress(progress, dice);
    if (next >= pathLength) return [];
    const abs = absolutePosition(playerId, next);
    if (safeSpaces.includes(abs)) return [];
    const enemy = enemyId(playerId);
    return state.pawns[enemy].flatMap((value, index) =>
      value >= 0 && value < pathLength && absolutePosition(enemy, value) === abs ? [index] : []
    );
  }

  function queueCpu(action, delay) {
    clearTimeout(cpuTimer);
    cpuTimer = setTimeout(action, delay);
  }

  function syncActions() {
    if (!state?.running) {
      api.setPrimary("Restart", start);
      api.setSecondary("", null);
      return;
    }
    api.setPrimary("Roll", roll);
    api.setSecondary("Restart", start);
  }

  function render() {
    trackCells.forEach((cell, trackIndex) => {
      cell.innerHTML = "";
      players.forEach((player) => {
        state.pawns[player.id].forEach((progress, pawnIndex) => {
          if (progress >= 0 && progress < pathLength && absolutePosition(player.id, progress) === trackIndex) {
            cell.innerHTML += pawnChip(player.id, pawnIndex);
          }
        });
      });
    });
    players.forEach((player) => {
      laneNodes[player.id].innerHTML = "";
      state.pawns[player.id].forEach((progress, pawnIndex) => {
        if (progress >= pathLength) {
          const slot = document.createElement("div");
          slot.className = `ludo-home-slot is-${player.id}`;
          slot.textContent = progress === finish ? "✓" : String(progress - pathLength + 1);
          laneNodes[player.id].appendChild(slot);
        }
      });
    });
    pawnsNode.innerHTML = "";
    const section = document.createElement("div");
    section.className = "ludo-pawn-row";
    if (state.running && state.turn === HUMAN && state.die > 0) {
      const active = movablePawns(HUMAN);
      if (active.length) {
        active.forEach(({ index, progress }) => {
          const button = document.createElement("button");
          button.type = "button";
          button.className = `ludo-pawn-button is-${state.turn}`;
          button.textContent = progress === -1 ? `Home ${index + 1}` : `Pawn ${index + 1}`;
          button.addEventListener("pointerdown", (event) => {
            event.preventDefault();
            movePawn(index);
          });
          section.appendChild(button);
        });
      } else {
        section.innerHTML = '<div class="ludo-pass">No move on this roll.</div>';
      }
    } else if (state.running && state.turn === CPU && state.die > 0) {
      section.innerHTML = '<div class="ludo-pass">CPU is choosing a pawn.</div>';
    } else if (state.running && state.turn === HUMAN) {
      section.innerHTML = '<div class="ludo-pass">Roll to move a pawn.</div>';
    } else if (state.running) {
      section.innerHTML = '<div class="ludo-pass">CPU is about to roll.</div>';
    }
    pawnsNode.appendChild(section);
    dieNode.textContent = state.die > 0 ? String(state.die) : "-";
    turnNode.textContent = playerById(state.turn).label;
    noteNode.textContent = state.note;
    api.setCurrent(state.moves);
    syncActions();
  }

  function finishRound(winnerId) {
    state.running = false;
    clearTimeout(cpuTimer);
    state.die = 0;
    if (winnerId === HUMAN) {
      state.note = "You win the race.";
      incrementWinBest(api);
      api.sound("level");
    } else {
      state.note = "CPU wins the race.";
      api.sound("fail");
    }
    render();
  }

  function advanceTurn(extra = false, summary = "") {
    state.die = 0;
    if (!extra) {
      state.turn = enemyId(state.turn);
    }
    const prefix = summary ? `${summary} ` : "";
    state.note = `${prefix}${state.turn === HUMAN ? (extra ? "Roll again." : "Your roll.") : (extra ? "CPU rolls again." : "CPU turn.")}`;
    render();
    if (state.running && state.turn === CPU) {
      queueCpu(cpuRoll, extra ? 460 : 640);
    }
  }

  function start() {
    clearTimeout(cpuTimer);
    state = {
      pawns: { red: [-1, -1], gold: [-1, -1] },
      turn: HUMAN,
      die: 0,
      moves: 0,
      running: true,
      note: "Your roll."
    };
    render();
  }

  function roll(fromCpu = false) {
    if (!state?.running || state.die > 0) return;
    if ((!fromCpu && state.turn !== HUMAN) || (fromCpu && state.turn !== CPU)) return;
    state.die = randomInt(1, 6);
    api.sound("ui");
    const moves = movablePawns(state.turn, state.die);
    if (!moves.length) {
      state.note = `${playerById(state.turn).label} rolled ${state.die} and cannot move.`;
      render();
      queueCpu(() => advanceTurn(false), 620);
      return;
    }
    state.note = state.turn === HUMAN ? `You rolled ${state.die}. Choose a pawn.` : `CPU rolled ${state.die}.`;
    render();
    if (state.turn === CPU) {
      queueCpu(cpuMove, 420);
    }
  }

  function scorePawn(playerId, index, dice) {
    const progress = state.pawns[playerId][index];
    const next = nextProgress(progress, dice);
    const abs = next < pathLength ? absolutePosition(playerId, next) : -1;
    const captures = captureTargets(playerId, progress, dice).length;
    let score = next * 4 + progress * 2 + Math.random();
    if (next === finish) score += 220;
    if (captures) score += captures * 140;
    if (progress === -1) score += 80;
    if (next >= pathLength) score += 40 + (next - pathLength) * 18;
    if (abs >= 0 && safeSpaces.includes(abs)) score += 18;
    return score;
  }

  function cpuRoll() {
    cpuTimer = 0;
    if (!state?.running || state.turn !== CPU || state.die > 0) return;
    roll(true);
  }

  function cpuMove() {
    cpuTimer = 0;
    if (!state?.running || state.turn !== CPU || state.die <= 0) return;
    const moves = movablePawns(CPU);
    if (!moves.length) {
      advanceTurn(false);
      return;
    }
    const scored = moves.map(({ index }) => ({ index, score: scorePawn(CPU, index, state.die) }));
    const bestScore = Math.max(...scored.map((entry) => entry.score));
    const options = scored.filter((entry) => entry.score === bestScore);
    movePawn(choice(options).index, true);
  }

  function movePawn(index, fromCpu = false) {
    if (!state?.running || state.die <= 0) return;
    if ((!fromCpu && state.turn !== HUMAN) || (fromCpu && state.turn !== CPU)) return;
    const progress = state.pawns[state.turn][index];
    if (!movablePawns(state.turn).some((move) => move.index === index)) return;
    const next = nextProgress(progress, state.die);
    if (next > finish) return;
    const mover = state.turn;
    const moverLabel = playerById(mover).label;
    state.pawns[mover][index] = next;
    let captures = 0;
    if (next < pathLength) {
      const abs = absolutePosition(mover, next);
      const enemy = enemyId(mover);
      if (!safeSpaces.includes(abs)) {
        state.pawns[enemy] = state.pawns[enemy].map((value) =>
          value >= 0 && value < pathLength && absolutePosition(enemy, value) === abs ? (captures += 1, -1) : value
        );
      }
    }
    state.moves += 1;
    api.sound(captures ? "lock" : "slide");
    if (state.pawns[mover].every((value) => value === finish)) {
      finishRound(mover);
      return;
    }
    const extra = state.die === 6;
    let summary = "";
    if (captures) summary = `${moverLabel} capture${mover === HUMAN ? "" : "s"} a pawn.`;
    else if (next === finish) summary = `${moverLabel} sends a pawn home.`;
    advanceTurn(extra, summary);
  }

  api.setPrimary("Start", start);
  api.setSecondary("", null);
  api.setCurrent(0);
  return {
    onKey(event) {
      if (!state?.running || state.turn !== HUMAN) return;
      if ((event.key === " " || event.key === "Enter") && state.die === 0) {
        event.preventDefault();
        roll();
        return;
      }
      const pawnIndex = Number(event.key) - 1;
      if (Number.isInteger(pawnIndex) && pawnIndex >= 0 && pawnIndex < 2 && state.die > 0) {
        event.preventDefault();
        movePawn(pawnIndex);
      }
    },
    destroy() {
      clearTimeout(cpuTimer);
    }
  };
}

renderRail();
setupRailControls();
setupGameCountButton();
setupAudio();
registerOffline();
setupInstall();
switchGame(state.activeGameId);

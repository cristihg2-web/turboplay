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

const state = {
  store: loadObject(STORAGE_KEY, { bests: {}, plays: {}, settings: { audioEnabled: true } }),
  activeGameId: GAME_DEFS[0].id,
  controller: null,
  installPrompt: null,
  primaryHandler: null,
  secondaryHandler: null
};

const els = {
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

function renderRail() {
  els.rail.innerHTML = "";
  GAME_DEFS.forEach((game) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "game-pill";
    button.dataset.gameId = game.id;
    button.innerHTML = `<span>${game.kicker}</span><strong>${game.name}</strong>`;
    button.addEventListener("click", () => switchGame(game.id));
    els.rail.appendChild(button);
  });
  syncRailControls();
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
      await navigator.serviceWorker.register("./sw.js");
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

els.primaryAction.addEventListener("click", () => {
  audio.prime();
  if (state.primaryHandler) state.primaryHandler();
});

els.secondaryAction.addEventListener("click", () => {
  audio.prime();
  if (state.secondaryHandler) state.secondaryHandler();
});

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

  const game = {
    running: false,
    chain: 0,
    speed: 0.0036,
    targetWidth: 132,
    targetLeft: 90,
    time: 0,
    raf: 0
  };

  function trackWidth() {
    return track.clientWidth || 320;
  }

  function positionTarget() {
    const maxLeft = trackWidth() - game.targetWidth;
    game.targetLeft = randomInt(0, Math.max(0, maxLeft));
    target.style.width = `${game.targetWidth}px`;
    target.style.left = `${game.targetLeft}px`;
  }

  function renderCursor() {
    const x = ((Math.sin(game.time) + 1) / 2) * (trackWidth() - 18);
    cursor.style.left = `${x}px`;
    return x;
  }

  function start() {
    api.countPlay();
    api.sound("start");
    game.running = true;
    game.chain = 0;
    game.speed = 0.0036;
    game.targetWidth = 132;
    game.time = 0;
    positionTarget();
    api.setCurrent(0);
    api.setHint("Tap when the cursor crosses the zone.");
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
    const cursorLeft = parseFloat(cursor.style.left || "0");
    const center = cursorLeft + 9;
    const inside = center >= game.targetLeft && center <= game.targetLeft + game.targetWidth;

    if (!inside) {
      api.sound("fail");
      stop("Lock missed.");
      return;
    }

    game.chain += 1;
    api.sound("lock");
    game.speed += 0.00045;
    game.targetWidth = Math.max(54, game.targetWidth - 6);
    api.setCurrent(game.chain);
    api.updateBest(game.chain);
    api.setHint(`${game.chain} clean locks.`);
    positionTarget();
  }

  function loop() {
    renderCursor();
    if (!game.running) return;
    game.time += game.speed * 16;
    game.raf = requestAnimationFrame(loop);
  }

  stage.addEventListener("click", (event) => {
    if (event.target.closest(".touch-controls")) return;
    tapLock();
  });
  api.setPrimary("Start", start);
  positionTarget();
  renderCursor();

  return {
    destroy() {
      cancelAnimationFrame(game.raf);
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
    return Math.max(0.22, 0.44 - game.score * 0.01);
  }

  function chooseNextTarget() {
    const nextOffset = randomInt(1, 3);
    game.targetIndex = (game.targetIndex + nextOffset) % 4;
  }

  function drawRing(centerX, centerY, radius, innerRadius) {
    const gap = 0.06;
    const targetGlow = 1 - clamp(alignmentDistance() / (currentTolerance() + 0.18), 0, 1);

    colors.forEach((color, index) => {
      const start = game.rotation + index * segmentSweep + gap;
      const end = start + segmentSweep - gap * 2;
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
    ctx.fillText(`Window ${Math.round((currentTolerance() / 0.44) * 100)}%`, 18, height - 18);
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

renderRail();
setupRailControls();
setupAudio();
registerOffline();
setupInstall();
switchGame(state.activeGameId);

const STORAGE_KEYS = {
  stats: "turboplay-stats",
  merge: "turboplay-merge"
};

const defaultStats = {
  sessions: 0,
  mergeBestTile: 0,
  mergeBestScore: 0,
  memoryBest: 0,
  radarBest: 0
};

const stats = loadObject(STORAGE_KEYS.stats, defaultStats);
const state = {
  activeTab: "merge",
  merge: loadMergeGame(),
  memory: {
    sequence: [],
    round: 0,
    playerIndex: 0,
    flashing: null,
    locked: false,
    message: "Pulsa empezar para ver la primera secuencia.",
    timers: []
  },
  radar: {
    score: 0,
    timeLeft: 30,
    playing: false,
    x: 44,
    y: 44,
    size: 62,
    message: "Inicia la ronda y atrapa tantos ecos como puedas.",
    tickTimer: null,
    moveTimer: null
  },
  installPrompt: null,
  touchStart: null
};

const statEls = {
  sessions: document.querySelector('[data-stat="sessions"]'),
  merge: document.querySelector('[data-stat="merge"]'),
  memory: document.querySelector('[data-stat="memory"]'),
  radar: document.querySelector('[data-stat="radar"]')
};

const cacheStatusEl = document.querySelector("[data-cache-status]");
const installStatusEl = document.querySelector("[data-install-status]");
const installButton = document.querySelector("[data-install]");
const jumpButton = document.querySelector("[data-jump]");
const tabButtons = Array.from(document.querySelectorAll("[data-tab]"));
const panels = Array.from(document.querySelectorAll("[data-panel]"));
const mergeCells = Array.from(document.querySelectorAll("[data-cell]"));
const mergeBoardEl = document.querySelector("[data-merge-board]");
const mergeMessageEl = document.querySelector("[data-merge-message]");
const mergeScoreEl = document.querySelector("[data-merge-score]");
const mergeTileEl = document.querySelector("[data-merge-tile]");
const mergeBestEl = document.querySelector("[data-merge-best]");
const mergeResetButton = document.querySelector("[data-merge-reset]");
const memoryMessageEl = document.querySelector("[data-memory-message]");
const memoryRoundEl = document.querySelector("[data-memory-round]");
const memoryBestEl = document.querySelector("[data-memory-best]");
const memoryStartButton = document.querySelector("[data-memory-start]");
const memoryPads = Array.from(document.querySelectorAll("[data-pad]"));
const radarMessageEl = document.querySelector("[data-radar-message]");
const radarTimeEl = document.querySelector("[data-radar-time]");
const radarScoreEl = document.querySelector("[data-radar-score]");
const radarBestEl = document.querySelector("[data-radar-best]");
const radarBoardEl = document.querySelector("[data-radar-board]");
const radarTargetEl = document.querySelector("[data-radar-target]");
const radarStartButton = document.querySelector("[data-radar-start]");

function loadObject(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    if (!value) return { ...fallback };
    return { ...fallback, ...JSON.parse(value) };
  } catch {
    return { ...fallback };
  }
}

function saveObject(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage failures.
  }
}

function recordSession() {
  stats.sessions += 1;
  saveObject(STORAGE_KEYS.stats, stats);
  renderStats();
}

function renderStats() {
  statEls.sessions.textContent = String(stats.sessions);
  statEls.merge.textContent = String(stats.mergeBestTile);
  statEls.memory.textContent = String(stats.memoryBest);
  statEls.radar.textContent = String(stats.radarBest);
}

function setActiveTab(tabId) {
  state.activeTab = tabId;
  tabButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.tab === tabId));
  panels.forEach((panel) => panel.classList.toggle("is-active", panel.dataset.panel === tabId));
}

function createGrid() {
  return Array.from({ length: 4 }, () => Array(4).fill(0));
}

function cloneGrid(grid) {
  return grid.map((row) => [...row]);
}

function transpose(grid) {
  return grid[0].map((_, columnIndex) => grid.map((row) => row[columnIndex]));
}

function addRandomTile(grid) {
  const empty = [];
  grid.forEach((row, rowIndex) => {
    row.forEach((value, columnIndex) => {
      if (!value) empty.push([rowIndex, columnIndex]);
    });
  });
  if (!empty.length) return false;
  const [rowIndex, columnIndex] = empty[Math.floor(Math.random() * empty.length)];
  grid[rowIndex][columnIndex] = Math.random() < 0.9 ? 2 : 4;
  return true;
}

function createMergeGame() {
  const grid = createGrid();
  addRandomTile(grid);
  addRandomTile(grid);
  return {
    grid,
    score: 0,
    over: false,
    won: false,
    message: "Combina fichas iguales para mejorar la cabina."
  };
}

function loadMergeGame() {
  const stored = loadObject(STORAGE_KEYS.merge, createMergeGame());
  if (!Array.isArray(stored.grid) || stored.grid.length !== 4) return createMergeGame();
  return stored;
}

function saveMergeGame() {
  saveObject(STORAGE_KEYS.merge, state.merge);
}

function highestTile(grid) {
  return Math.max(...grid.flat());
}

function slideLeft(row) {
  const compact = row.filter(Boolean);
  const next = [];
  let scoreGain = 0;
  for (let index = 0; index < compact.length; index += 1) {
    if (compact[index] === compact[index + 1]) {
      const merged = compact[index] * 2;
      next.push(merged);
      scoreGain += merged;
      index += 1;
    } else {
      next.push(compact[index]);
    }
  }
  while (next.length < 4) next.push(0);
  return { row: next, moved: next.some((value, index) => value !== row[index]), scoreGain };
}

function moveGrid(grid, direction) {
  let working = cloneGrid(grid);
  if (direction === "up" || direction === "down") working = transpose(working);
  if (direction === "right" || direction === "down") working = working.map((row) => [...row].reverse());

  let moved = false;
  let scoreGain = 0;

  working = working.map((row) => {
    const result = slideLeft(row);
    moved = moved || result.moved;
    scoreGain += result.scoreGain;
    return result.row;
  });

  if (direction === "right" || direction === "down") working = working.map((row) => [...row].reverse());
  if (direction === "up" || direction === "down") working = transpose(working);

  return { grid: working, moved, scoreGain };
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

function syncMergeStats() {
  stats.mergeBestTile = Math.max(stats.mergeBestTile, highestTile(state.merge.grid));
  stats.mergeBestScore = Math.max(stats.mergeBestScore, state.merge.score);
  saveObject(STORAGE_KEYS.stats, stats);
  renderStats();
}

function renderMerge() {
  state.merge.grid.flat().forEach((value, index) => {
    mergeCells[index].dataset.value = String(value);
    mergeCells[index].textContent = value ? String(value) : "";
  });
  mergeMessageEl.textContent = state.merge.message;
  mergeScoreEl.textContent = String(state.merge.score);
  mergeTileEl.textContent = String(highestTile(state.merge.grid));
  mergeBestEl.textContent = String(stats.mergeBestScore);
}

function resetMerge() {
  state.merge = createMergeGame();
  recordSession();
  syncMergeStats();
  saveMergeGame();
  renderMerge();
}

function moveMerge(direction) {
  if (state.merge.over) return;
  const result = moveGrid(state.merge.grid, direction);
  if (!result.moved) {
    state.merge.message = "Ese movimiento no cambia la cabina.";
    renderMerge();
    return;
  }

  state.merge.grid = result.grid;
  state.merge.score += result.scoreGain;
  addRandomTile(state.merge.grid);

  const tile = highestTile(state.merge.grid);
  if (tile >= 2048 && !state.merge.won) {
    state.merge.won = true;
    state.merge.message = "Cabina ejecutiva desbloqueada.";
  } else if (result.scoreGain > 0) {
    state.merge.message = `Has ganado ${result.scoreGain} puntos.`;
  } else {
    state.merge.message = "Cabina reorganizada.";
  }

  if (!hasMove(state.merge.grid)) {
    state.merge.over = true;
    state.merge.message = "Sin movimientos. Reinicia para volver a despegar.";
  }

  syncMergeStats();
  saveMergeGame();
  renderMerge();
}

function clearMemoryTimers() {
  state.memory.timers.forEach((timer) => clearTimeout(timer));
  state.memory.timers = [];
}

function renderMemory() {
  memoryRoundEl.textContent = String(state.memory.round);
  memoryBestEl.textContent = String(stats.memoryBest);
  memoryMessageEl.textContent = state.memory.message;
  memoryPads.forEach((pad) => {
    const index = Number(pad.dataset.pad);
    pad.classList.toggle("is-lit", state.memory.flashing === index);
    pad.disabled = state.memory.locked;
  });
}

function updateMemoryBest(value) {
  if (value > stats.memoryBest) {
    stats.memoryBest = value;
    saveObject(STORAGE_KEYS.stats, stats);
    renderStats();
  }
}

function playSequence() {
  clearMemoryTimers();
  state.memory.locked = true;
  state.memory.flashing = null;
  renderMemory();

  let step = 0;
  const flash = () => {
    if (step >= state.memory.sequence.length) {
      state.memory.locked = false;
      state.memory.flashing = null;
      state.memory.message = "Tu turno.";
      renderMemory();
      return;
    }

    state.memory.flashing = state.memory.sequence[step];
    renderMemory();

    const offTimer = window.setTimeout(() => {
      state.memory.flashing = null;
      renderMemory();
      step += 1;
      const nextTimer = window.setTimeout(flash, 180);
      state.memory.timers.push(nextTimer);
    }, 400);

    state.memory.timers.push(offTimer);
  };

  const startTimer = window.setTimeout(flash, 320);
  state.memory.timers.push(startTimer);
}

function nextRound() {
  state.memory.sequence.push(Math.floor(Math.random() * 4));
  state.memory.round = state.memory.sequence.length;
  state.memory.playerIndex = 0;
  state.memory.message = `Ronda ${state.memory.round}. Memoriza la ruta.`;
  playSequence();
}

function startMemory() {
  clearMemoryTimers();
  recordSession();
  state.memory.sequence = [];
  state.memory.round = 0;
  state.memory.playerIndex = 0;
  state.memory.locked = true;
  state.memory.flashing = null;
  state.memory.message = "Preparando la primera secuencia...";
  renderMemory();
  nextRound();
}

function handlePadPress(index) {
  if (state.memory.locked || !state.memory.sequence.length) return;

  state.memory.flashing = index;
  renderMemory();
  const resetFlashTimer = window.setTimeout(() => {
    state.memory.flashing = null;
    renderMemory();
  }, 120);
  state.memory.timers.push(resetFlashTimer);

  const expected = state.memory.sequence[state.memory.playerIndex];
  if (index !== expected) {
    updateMemoryBest(Math.max(0, state.memory.round - 1));
    state.memory.locked = true;
    state.memory.message = `Fallaste en la ronda ${state.memory.round}.`;
    renderMemory();
    return;
  }

  state.memory.playerIndex += 1;

  if (state.memory.playerIndex === state.memory.sequence.length) {
    updateMemoryBest(state.memory.round);
    state.memory.locked = true;
    state.memory.message = "Perfecto. Vamos con una ruta mas larga.";
    renderMemory();
    const nextTimer = window.setTimeout(nextRound, 760);
    state.memory.timers.push(nextTimer);
  } else {
    const pending = state.memory.sequence.length - state.memory.playerIndex;
    state.memory.message = `Bien. Quedan ${pending} toque${pending === 1 ? "" : "s"}.`;
    renderMemory();
  }
}

function clearRadarTimers() {
  if (state.radar.tickTimer) clearInterval(state.radar.tickTimer);
  if (state.radar.moveTimer) clearInterval(state.radar.moveTimer);
  state.radar.tickTimer = null;
  state.radar.moveTimer = null;
}

function renderRadar() {
  radarMessageEl.textContent = state.radar.message;
  radarTimeEl.textContent = String(state.radar.timeLeft);
  radarScoreEl.textContent = String(state.radar.score);
  radarBestEl.textContent = String(stats.radarBest);
  radarTargetEl.style.left = `${state.radar.x}%`;
  radarTargetEl.style.top = `${state.radar.y}%`;
  radarTargetEl.style.width = `${state.radar.size}px`;
  radarTargetEl.style.height = `${state.radar.size}px`;
  radarTargetEl.disabled = !state.radar.playing;
}

function moveRadarTarget() {
  const boardWidth = radarBoardEl.clientWidth || 320;
  const boardHeight = radarBoardEl.clientHeight || 320;
  const padding = 12;
  const x = padding + Math.random() * Math.max(1, boardWidth - state.radar.size - padding * 2);
  const y = padding + Math.random() * Math.max(1, boardHeight - state.radar.size - padding * 2);
  state.radar.x = (x / boardWidth) * 100;
  state.radar.y = (y / boardHeight) * 100;
}

function endRadar() {
  clearRadarTimers();
  state.radar.playing = false;
  if (state.radar.score > stats.radarBest) {
    stats.radarBest = state.radar.score;
    saveObject(STORAGE_KEYS.stats, stats);
    renderStats();
  }
  state.radar.message = `Tiempo. Has atrapado ${state.radar.score} ecos.`;
  renderRadar();
}

function startRadar() {
  clearRadarTimers();
  recordSession();
  state.radar.score = 0;
  state.radar.timeLeft = 30;
  state.radar.playing = true;
  state.radar.size = 62;
  state.radar.message = "Ronda activa. Toca el eco antes de que cambie de sector.";
  moveRadarTarget();
  renderRadar();

  state.radar.tickTimer = window.setInterval(() => {
    state.radar.timeLeft -= 1;
    if (state.radar.timeLeft <= 0) {
      state.radar.timeLeft = 0;
      endRadar();
      return;
    }
    renderRadar();
  }, 1000);

  state.radar.moveTimer = window.setInterval(() => {
    if (!state.radar.playing) return;
    moveRadarTarget();
    renderRadar();
  }, 820);
}

function hitRadar() {
  if (!state.radar.playing) return;
  state.radar.score += 1;
  state.radar.size = Math.max(38, 62 - state.radar.score);
  state.radar.message = `Eco fijado. Total ${state.radar.score}.`;
  if (state.radar.score > stats.radarBest) {
    stats.radarBest = state.radar.score;
    saveObject(STORAGE_KEYS.stats, stats);
    renderStats();
  }
  moveRadarTarget();
  renderRadar();
}

function registerOffline() {
  if (!("serviceWorker" in navigator)) {
    cacheStatusEl.textContent = "Tu navegador no soporta service worker. El sitio sigue siendo ligero.";
    return;
  }
  window.addEventListener("load", async () => {
    try {
      await navigator.serviceWorker.register("./sw.js");
      cacheStatusEl.textContent = "Cache local lista. Tras esta carga, Turboplay puede abrirse sin red.";
    } catch {
      cacheStatusEl.textContent = "No se pudo registrar el cache offline.";
    }
  });
}

function setupInstall() {
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    state.installPrompt = event;
    installStatusEl.textContent = "Instalacion disponible. Puedes fijar Turboplay en tu pantalla de inicio.";
  });

  window.addEventListener("appinstalled", () => {
    installStatusEl.textContent = "Turboplay instalada correctamente.";
    state.installPrompt = null;
  });

  installButton.addEventListener("click", async () => {
    if (state.installPrompt) {
      state.installPrompt.prompt();
      const outcome = await state.installPrompt.userChoice;
      installStatusEl.textContent =
        outcome.outcome === "accepted"
          ? "Instalada correctamente."
          : "Instalacion cancelada.";
      state.installPrompt = null;
      return;
    }
    installStatusEl.textContent = "En iPhone o iPad usa Compartir y luego Anadir a pantalla de inicio.";
  });
}

function handleMergeKey(event) {
  const directions = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right"
  };
  if (state.activeTab !== "merge" || !directions[event.key]) return;
  event.preventDefault();
  moveMerge(directions[event.key]);
}

function handleTouchStart(event) {
  const touch = event.changedTouches[0];
  state.touchStart = { x: touch.clientX, y: touch.clientY };
}

function handleTouchEnd(event) {
  if (!state.touchStart) return;
  const touch = event.changedTouches[0];
  const deltaX = touch.clientX - state.touchStart.x;
  const deltaY = touch.clientY - state.touchStart.y;
  state.touchStart = null;
  if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) < 24) return;
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    moveMerge(deltaX > 0 ? "right" : "left");
  } else {
    moveMerge(deltaY > 0 ? "down" : "up");
  }
}

function bindEvents() {
  if (jumpButton) {
    jumpButton.addEventListener("click", () => {
      document.getElementById(jumpButton.dataset.jump)?.scrollIntoView({ behavior: "smooth" });
    });
  }

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setActiveTab(button.dataset.tab);
    });
  });

  mergeResetButton.addEventListener("click", resetMerge);
  mergeBoardEl.addEventListener("touchstart", handleTouchStart, { passive: true });
  mergeBoardEl.addEventListener("touchend", handleTouchEnd, { passive: true });
  window.addEventListener("keydown", handleMergeKey);

  memoryStartButton.addEventListener("click", () => {
    setActiveTab("memory");
    startMemory();
  });
  memoryPads.forEach((pad) => {
    pad.addEventListener("click", () => handlePadPress(Number(pad.dataset.pad)));
  });

  radarStartButton.addEventListener("click", () => {
    setActiveTab("radar");
    startRadar();
  });
  radarTargetEl.addEventListener("click", hitRadar);
}

function init() {
  syncMergeStats();
  renderStats();
  setActiveTab("merge");
  renderMerge();
  renderMemory();
  renderRadar();
  bindEvents();
  registerOffline();
  setupInstall();
}

init();

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
    blurb: "Rail cannon shields the city.",
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
  store: loadObject(STORAGE_KEY, { bests: {}, plays: {} }),
  activeGameId: GAME_DEFS[0].id,
  controller: null,
  installPrompt: null,
  primaryHandler: null,
  secondaryHandler: null
};

const els = {
  rail: document.querySelector("[data-game-rail]"),
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
  installButton: document.querySelector("[data-install]"),
  offlineStatus: document.querySelector("[data-offline-status]"),
  installStatus: document.querySelector("[data-install-status]")
};

function loadObject(key, fallback) {
  const cloneFallback = () => ({
    bests: { ...(fallback.bests || {}) },
    plays: { ...(fallback.plays || {}) }
  });

  try {
    const value = localStorage.getItem(key);
    if (!value) return cloneFallback();
    const parsed = JSON.parse(value);
    return {
      bests: { ...(fallback.bests || {}), ...(parsed.bests || {}) },
      plays: { ...(fallback.plays || {}), ...(parsed.plays || {}) }
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
        config.onPress();
      });
      button.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
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

  if (state.controller && state.controller.destroy) {
    state.controller.destroy();
  }

  state.activeGameId = gameId;
  const game = GAME_DEFS.find((entry) => entry.id === gameId);
  const api = createGameApi(game);

  document.querySelectorAll(".game-pill").forEach((pill) => {
    pill.classList.toggle("is-active", pill.dataset.gameId === gameId);
  });

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

els.primaryAction.addEventListener("click", () => {
  if (state.primaryHandler) state.primaryHandler();
});

els.secondaryAction.addEventListener("click", () => {
  if (state.secondaryHandler) state.secondaryHandler();
});

window.addEventListener("keydown", (event) => {
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
      render();
      return;
    }

    game.grid = result.grid;
    game.score += result.gained;
    addRandom(game.grid);
    game.message = result.gained > 0 ? `+${result.gained}.` : "Shifted.";

    if (!hasMove(game.grid)) {
      game.message = "Game over.";
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
    api.setCurrent(memory.round);
    api.setHint(`Round ${memory.round}.`);
    cue.textContent = `Round ${memory.round}`;
    playSequence();
  }

  function start() {
    api.countPlay();
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
      api.updateBest(Math.max(0, memory.round - 1));
      memory.locked = true;
      cue.textContent = "Missed";
      api.setHint("Missed.");
      return;
    }

    memory.index += 1;

    if (memory.index === memory.sequence.length) {
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
  stage.className = "target-stage";
  const badge = document.createElement("div");
  badge.className = "stage-chip";
  badge.textContent = "24s";
  const target = document.createElement("button");
  target.type = "button";
  target.className = "target-dot";
  target.setAttribute("aria-label", "Target");
  stage.appendChild(badge);
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

  function moveTarget() {
    const width = stage.clientWidth || 320;
    const height = stage.clientHeight || 380;
    const x = randomInt(14, Math.max(14, width - radar.size - 14));
    const y = randomInt(36, Math.max(36, height - radar.size - 14));
    target.style.left = `${x}px`;
    target.style.top = `${y}px`;
    target.style.width = `${radar.size}px`;
    target.style.height = `${radar.size}px`;
  }

  function stop(message) {
    radar.active = false;
    clearInterval(radar.tickTimer);
    clearInterval(radar.moveTimer);
    radar.tickTimer = null;
    radar.moveTimer = null;
    api.updateBest(radar.score);
    api.setHint(message);
    api.setPrimary("Start", start);
  }

  function start() {
    api.countPlay();
    radar.score = 0;
    radar.timeLeft = 24;
    radar.active = true;
    radar.size = 78;
    api.setCurrent(0);
    api.setHint("Tap the beacon.");
    badge.textContent = "24s";
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

  target.addEventListener("click", () => {
    if (!radar.active) return;
    radar.score += 1;
    radar.size = Math.max(52, 78 - Math.floor(radar.score / 2) * 2);
    api.setCurrent(radar.score);
    api.setHint(`${radar.score} hits.`);
    moveTarget();
  });

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
  stage.appendChild(
    buildTouchControls([
      [{ label: "Fire", onPress: fire, accent: true }]
    ])
  );
  root.appendChild(stage);

  const cannon = {
    baseX: 56,
    baseY: 316,
    muzzleX: 162,
    muzzleY: 222,
    beamEndX: 350,
    beamEndY: 110
  };

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
    reload: 0,
    charge: 0,
    beam: 0,
    beamWidth: 0,
    spawnTick: 0,
    lastTime: 0,
    raf: 0,
    flash: 0,
    muzzleFlash: 0,
    railGlow: 0,
    comets: [],
    explosions: []
  };

  function currentDelay() {
    const ramp = clamp(game.time / 300, 0, 1);
    return Math.max(620, 1260 - ramp * 260 - game.level * 32);
  }

  function currentCometSpeed() {
    const ramp = clamp(game.time / 300, 0, 1);
    return 76 + ramp * 20 + game.level * 2.1;
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

  function updateHud() {
    leftBadge.textContent = `${game.shields} shields`;
    rightBadge.textContent = `Lv ${game.level + 1} • ${game.destroyed}`;
    api.setCurrent(Math.floor(game.time));
  }

  function spawnExplosion(x, y, color) {
    game.explosions.push({
      x,
      y,
      life: 0.42,
      maxLife: 0.42,
      radius: 14,
      color
    });
  }

  function pointToSegmentDistance(point, start, end) {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const lengthSquared = dx * dx + dy * dy || 1;
    const t = clamp(((point.x - start.x) * dx + (point.y - start.y) * dy) / lengthSquared, 0, 1);
    const px = start.x + dx * t;
    const py = start.y + dy * t;
    return Math.hypot(point.x - px, point.y - py);
  }

  function beamSegment() {
    return {
      start: { x: cannon.muzzleX, y: cannon.muzzleY },
      end: { x: cannon.beamEndX, y: cannon.beamEndY }
    };
  }

  function spawnComet(spread = 0) {
    const anchor = choice(skylineTargets);
    const target = {
      x: anchor.x + spread * 12 + randomInt(-8, 8),
      y: anchor.y + randomInt(-10, 10)
    };
    const { start: beamStart, end: beamEnd } = beamSegment();
    const crossPoint = lerpPoint(beamStart, beamEnd, 0.38 + Math.random() * 0.38);
    const directionOut = normalize(crossPoint.x - target.x, crossPoint.y - target.y);
    let travel = randomInt(154, 224);
    let start = {
      x: crossPoint.x + directionOut.x * travel,
      y: crossPoint.y + directionOut.y * travel
    };

    while (start.x < width + 20) {
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

  function fire() {
    if (!game.active || game.reload > 0 || game.charge > 0 || game.beam > 0) return;
    game.reload = 0.62;
    game.charge = 0.16;
    game.railGlow = 1;
    api.setHint("Charging railgun.");
  }

  function stop(message) {
    game.active = false;
    cancelAnimationFrame(game.raf);
    api.updateBest(Math.floor(game.time));
    updateHud();
    api.setHint(message);
    api.setPrimary("Start", start);
  }

  function start() {
    api.countPlay();
    game.active = true;
    game.time = 0;
    game.destroyed = 0;
    game.shields = 10;
    game.level = 0;
    game.reload = 0;
    game.charge = 0;
    game.beam = 0;
    game.beamWidth = 0;
    game.spawnTick = 0;
    game.flash = 0;
    game.muzzleFlash = 0;
    game.railGlow = 0;
    game.comets = [];
    game.explosions = [];
    game.lastTime = performance.now();
    updateHud();
    api.setHint("Fire when a comet crosses the rail line.");
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

  function drawRailAndCannon() {
    const railGlow = Math.max(game.railGlow, game.beam * 10);
    const glowColor = `rgba(94, 225, 255, ${0.16 + railGlow * 0.26})`;

    ctx.fillStyle = "rgba(0,0,0,0.28)";
    ctx.beginPath();
    ctx.ellipse(cannon.baseX + 34, cannon.baseY + 18, 70, 18, -0.32, 0, Math.PI * 2);
    ctx.fill();

    drawPolygon(
      [
        { x: cannon.baseX - 18, y: cannon.baseY + 26 },
        { x: cannon.baseX + 8, y: cannon.baseY + 4 },
        { x: cannon.baseX + 72, y: cannon.baseY + 34 },
        { x: cannon.baseX + 42, y: cannon.baseY + 58 }
      ],
      "#16233b"
    );

    drawPolygon(
      [
        { x: cannon.baseX + 22, y: cannon.baseY + 6 },
        { x: cannon.baseX + 78, y: cannon.baseY - 48 },
        { x: cannon.baseX + 108, y: cannon.baseY - 32 },
        { x: cannon.baseX + 52, y: cannon.baseY + 20 }
      ],
      "#ced6e4"
    );
    drawPolygon(
      [
        { x: cannon.baseX + 26, y: cannon.baseY + 9 },
        { x: cannon.baseX + 82, y: cannon.baseY - 46 },
        { x: cannon.baseX + 90, y: cannon.baseY - 41 },
        { x: cannon.baseX + 34, y: cannon.baseY + 12 }
      ],
      "#38475f"
    );
    drawPolygon(
      [
        { x: cannon.baseX + 44, y: cannon.baseY + 18 },
        { x: cannon.baseX + 96, y: cannon.baseY - 30 },
        { x: cannon.baseX + 118, y: cannon.baseY - 18 },
        { x: cannon.baseX + 66, y: cannon.baseY + 28 }
      ],
      "#aab7cd"
    );

    ctx.strokeStyle = glowColor;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(cannon.baseX + 47, cannon.baseY + 15);
    ctx.lineTo(cannon.muzzleX - 8, cannon.muzzleY - 10);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cannon.baseX + 55, cannon.baseY + 22);
    ctx.lineTo(cannon.muzzleX - 2, cannon.muzzleY - 2);
    ctx.stroke();

    for (let index = 0; index < 4; index += 1) {
      const x = cannon.baseX - 8 + index * 18;
      const y = cannon.baseY + 10 + index * 4;
      drawPolygon(
        [
          { x, y },
          { x: x + 12, y: y - 10 },
          { x: x + 28, y: y - 2 },
          { x: x + 16, y: y + 10 }
        ],
        index % 2 === 0 ? "#ff4e64" : "#f7c55a"
      );
    }

    if (game.muzzleFlash > 0) {
      ctx.fillStyle = `rgba(255, 234, 164, ${game.muzzleFlash * 0.9})`;
      ctx.beginPath();
      ctx.arc(cannon.muzzleX, cannon.muzzleY, 10 + game.muzzleFlash * 18, 0, Math.PI * 2);
      ctx.fill();
    }

    if (game.charge > 0) {
      const chargeRatio = game.charge / 0.16;
      ctx.strokeStyle = `rgba(94, 225, 255, ${0.28 + (1 - chargeRatio) * 0.6})`;
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.moveTo(cannon.baseX + 52, cannon.baseY + 18);
      ctx.lineTo(cannon.muzzleX - 2, cannon.muzzleY - 6);
      ctx.stroke();
    }

    if (game.beam > 0) {
      const { start, end } = beamSegment();
      ctx.strokeStyle = `rgba(255,255,255,${0.36 + game.beam * 2.6})`;
      ctx.lineWidth = game.beamWidth + 6;
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();

      ctx.strokeStyle = `rgba(94,225,255,${0.52 + game.beam * 4})`;
      ctx.lineWidth = game.beamWidth;
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
    }
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

  function drawExplosions() {
    game.explosions.forEach((explosion) => {
      const lifeRatio = explosion.life / explosion.maxLife;
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
    game.comets.forEach(drawComet);
    drawRailAndCannon();
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
    spawnExplosion(comet.target.x, comet.target.y, "rgba(255, 145, 92, 0.92)");
    updateHud();

    if (game.shields <= 0) {
      stop(`City lost after ${Math.floor(game.time)}s.`);
      return;
    }

    api.setHint(`${game.shields} shields left.`);
  }

  function resolveRailShot() {
    const { start, end } = beamSegment();
    let hits = 0;

    game.comets.forEach((comet) => {
      if (!comet.active) return;
      const distance = pointToSegmentDistance(comet, start, end);
      if (distance > comet.radius + game.beamWidth * 0.5) return;

      comet.active = false;
      hits += 1;
      game.destroyed += 1;
      spawnExplosion(comet.x, comet.y, "rgba(94, 225, 255, 0.92)");
    });

    if (hits > 0) {
      api.setHint(`${hits} comet${hits > 1 ? "s" : ""} destroyed.`);
    } else {
      api.setHint("Missed the firing line.");
    }

    updateHud();
  }

  function loop(timestamp) {
    if (!game.active) return;
    const delta = Math.min(32, timestamp - game.lastTime || 16);
    const deltaSeconds = delta / 1000;
    game.lastTime = timestamp;
    game.time += deltaSeconds;
    game.reload = Math.max(0, game.reload - deltaSeconds);
    const chargeBefore = game.charge;
    game.charge = Math.max(0, game.charge - deltaSeconds);
    if (chargeBefore > 0 && game.charge === 0) {
      game.beam = 0.08;
      game.beamWidth = 10;
      game.muzzleFlash = 1;
      resolveRailShot();
    }

    game.beam = Math.max(0, game.beam - deltaSeconds);
    game.beamWidth = 8 + game.beam * 48;
    game.flash = Math.max(0, game.flash - deltaSeconds * 2.8);
    game.muzzleFlash = Math.max(0, game.muzzleFlash - deltaSeconds * 7);
    game.railGlow = Math.max(0, game.railGlow - deltaSeconds * 3.2);

    const nextLevel = Math.floor(game.time / 50);
    if (nextLevel > game.level) {
      game.level = nextLevel;
      api.setHint(`Level ${game.level + 1}. Comets accelerate.`);
    }

    game.spawnTick += delta;
    while (game.spawnTick >= currentDelay()) {
      game.spawnTick -= currentDelay();
      spawnComet();
      if (game.time > 120 && Math.random() < 0.12 + clamp((game.time - 120) / 300, 0, 0.18)) {
        spawnComet(Math.random() > 0.5 ? 1 : -1);
      }
    }

    game.comets.forEach((comet) => {
      if (!comet.active) return;
      comet.x += comet.vx * deltaSeconds;
      comet.y += comet.vy * deltaSeconds;
      comet.angle += comet.spin * deltaSeconds;

      if (Math.hypot(comet.x - comet.target.x, comet.y - comet.target.y) < 14) {
        impactCity(comet);
      }
    });

    game.comets = game.comets.filter((comet) => comet.active && comet.x > -40 && comet.y < height + 40);
    game.explosions = game.explosions.filter((explosion) => {
      explosion.life -= deltaSeconds;
      return explosion.life > 0;
    });

    updateHud();
    draw();
    game.raf = requestAnimationFrame(loop);
  }

  canvas.addEventListener("pointerdown", fire);

  api.setPrimary("Start", start);
  updateHud();
  api.setHint("Fire when a comet crosses the rail line.");
  draw();

  return {
    destroy() {
      cancelAnimationFrame(game.raf);
    },
    onKey(event) {
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        fire();
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
      api.updateBest(game.snake.length);
      api.setHint("Crash.");
      api.setPrimary("Start", reset);
      return;
    }

    game.snake.unshift(head);

    if (head.x === game.food.x && head.y === game.food.y) {
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
    ctx.fillStyle = "#0f1730";
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(255,255,255,0.06)";
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

    if (game.food) {
      ctx.fillStyle = "#ffbf47";
      ctx.fillRect(game.food.x * cell + 4, game.food.y * cell + 4, cell - 8, cell - 8);
    }

    game.snake.forEach((node, index) => {
      ctx.fillStyle = index === 0 ? "#76f0c2" : "#5ee1ff";
      ctx.fillRect(node.x * cell + 3, node.y * cell + 3, cell - 6, cell - 6);
    });
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

  function roadMetrics(y) {
    const depth = clamp((y - road.horizon) / (height - road.horizon), 0, 1);
    const roadWidth = 92 + depth * 210;
    const bend = Math.sin((game.score / 1000) * 1.4 + depth * 3.8) * 18 * depth;
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
    const carHeight = carWidth * 1.46;
    const x = centerX - carWidth / 2;
    const y = baseY - carHeight;
    const lean = steer * carWidth * 0.06;

    ctx.fillStyle = "rgba(8, 10, 20, 0.34)";
    ctx.beginPath();
    ctx.ellipse(centerX, baseY + 4, carWidth * 0.56, carHeight * 0.12, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#14151d";
    ctx.fillRect(x + carWidth * 0.06, y + carHeight * 0.66, carWidth * 0.15, carHeight * 0.18);
    ctx.fillRect(x + carWidth * 0.79, y + carHeight * 0.66, carWidth * 0.15, carHeight * 0.18);

    ctx.fillStyle = palette.body;
    ctx.beginPath();
    ctx.moveTo(x + carWidth * 0.2 + lean, y + carHeight * 0.98);
    ctx.lineTo(x + carWidth * 0.08 + lean, y + carHeight * 0.66);
    ctx.lineTo(x + carWidth * 0.15 + lean, y + carHeight * 0.22);
    ctx.lineTo(x + carWidth * 0.34 + lean, y + carHeight * 0.08);
    ctx.lineTo(x + carWidth * 0.66 + lean, y + carHeight * 0.08);
    ctx.lineTo(x + carWidth * 0.85 + lean, y + carHeight * 0.22);
    ctx.lineTo(x + carWidth * 0.92 + lean, y + carHeight * 0.66);
    ctx.lineTo(x + carWidth * 0.8 + lean, y + carHeight * 0.98);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = palette.body;
    ctx.fillRect(x + carWidth * 0.12 + lean, y + carHeight * 0.46, carWidth * 0.08, carHeight * 0.23);
    ctx.fillRect(x + carWidth * 0.8 + lean, y + carHeight * 0.46, carWidth * 0.08, carHeight * 0.23);
    ctx.fillRect(x + carWidth * 0.2 + lean, y + carHeight * 0.56, carWidth * 0.1, carHeight * 0.05);
    ctx.fillRect(x + carWidth * 0.7 + lean, y + carHeight * 0.56, carWidth * 0.1, carHeight * 0.05);

    ctx.fillStyle = palette.roof;
    ctx.beginPath();
    ctx.moveTo(x + carWidth * 0.3 + lean, y + carHeight * 0.62);
    ctx.lineTo(x + carWidth * 0.36 + lean, y + carHeight * 0.22);
    ctx.lineTo(x + carWidth * 0.64 + lean, y + carHeight * 0.22);
    ctx.lineTo(x + carWidth * 0.7 + lean, y + carHeight * 0.62);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = palette.glass;
    ctx.beginPath();
    ctx.moveTo(x + carWidth * 0.36 + lean, y + carHeight * 0.58);
    ctx.lineTo(x + carWidth * 0.4 + lean, y + carHeight * 0.28);
    ctx.lineTo(x + carWidth * 0.6 + lean, y + carHeight * 0.28);
    ctx.lineTo(x + carWidth * 0.64 + lean, y + carHeight * 0.58);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = palette.accent;
    ctx.fillRect(x + carWidth * 0.24 + lean, y + carHeight * 0.71, carWidth * 0.52, Math.max(2, carHeight * 0.035));

    ctx.fillStyle = "rgba(255,255,255,0.2)";
    ctx.fillRect(x + carWidth * 0.475 + lean, y + carHeight * 0.23, carWidth * 0.05, carHeight * 0.4);

    ctx.fillStyle = player ? "#fff5a8" : "#ff5d87";
    ctx.fillRect(x + carWidth * 0.13 + lean, y + carHeight * 0.86, carWidth * 0.12, Math.max(2, carHeight * 0.05));
    ctx.fillRect(x + carWidth * 0.75 + lean, y + carHeight * 0.86, carWidth * 0.12, Math.max(2, carHeight * 0.05));

    ctx.fillStyle = player ? "#fff7c9" : "rgba(255,255,255,0.72)";
    ctx.fillRect(x + carWidth * 0.17 + lean, y + carHeight * 0.13, carWidth * 0.11, Math.max(2, carHeight * 0.045));
    ctx.fillRect(x + carWidth * 0.72 + lean, y + carHeight * 0.13, carWidth * 0.11, Math.max(2, carHeight * 0.045));

    if (player) {
      ctx.fillStyle = "#111420";
      ctx.fillRect(x + carWidth * 0.43 + lean, y + carHeight * 0.82, carWidth * 0.14, Math.max(2, carHeight * 0.06));
    }
  }

  function changeLane(delta) {
    if (!game.running) return;
    game.lane = clamp(game.lane + delta, 0, 2);
  }

  function start() {
    api.countPlay();
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
        const carWidth = 18 + metrics.depth * 34;
        drawCar(laneCenterAt(obstacle.lane, obstacle.y), obstacle.y, carWidth, obstacle.palette);
      });

    drawCar(
      laneCenterAt(game.lanePosition, road.playerBaseY),
      road.playerBaseY,
      58,
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
      const verticalOverlap = obstacle.y > playerY - 96 && obstacle.y < playerY + 10;
      if (verticalOverlap && !obstacle.hit) {
        const obstacleWidth = 18 + roadMetrics(obstacle.y).depth * 34;
        const obstacleCenter = laneCenterAt(obstacle.lane, obstacle.y);
        const playerCenter = laneCenterAt(game.lanePosition, playerY);
        const lateralGap = Math.abs(playerCenter - obstacleCenter);
        const totalWidth = (58 + obstacleWidth) / 2;
        const isChanging = Math.abs(game.lane - game.lanePosition) > 0.08;

        if (lateralGap < totalWidth * 0.42) {
          obstacle.hit = true;

          if (isChanging && lateralGap > totalWidth * 0.24) {
            registerSoftCrash();
            return false;
          }

          stop("Direct crash.");
          return false;
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

  const game = {
    placed: [],
    moving: null,
    floors: 0,
    direction: 1,
    running: false,
    raf: 0,
    lastTime: 0
  };

  function reset() {
    api.countPlay();
    game.placed = [{ x: 70, y: height - 36, width: 180, color: "#5ee1ff" }];
    game.moving = { x: 0, y: height - 60, width: 180, color: "#ffbf47" };
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

  function drop() {
    if (!game.running || !game.moving) return;

    const last = game.placed[game.placed.length - 1];
    const overlapStart = Math.max(last.x, game.moving.x);
    const overlapEnd = Math.min(last.x + last.width, game.moving.x + game.moving.width);
    const overlap = overlapEnd - overlapStart;

    if (overlap <= 0) {
      game.running = false;
      api.updateBest(game.floors);
      api.setHint("Missed.");
      api.setPrimary("Start", reset);
      return;
    }

    game.floors += 1;
    api.setCurrent(game.floors);
    api.updateBest(game.floors);
    game.placed.push({
      x: overlapStart,
      y: game.moving.y,
      width: overlap,
      color: choice(["#ffbf47", "#5ee1ff", "#ff6ca8", "#76f0c2"])
    });

    if (game.moving.y < 90) {
      game.placed = game.placed.map((block) => ({ ...block, y: block.y + 24 }));
      game.moving = {
        x: 0,
        y: 90,
        width: overlap,
        color: choice(["#ffbf47", "#5ee1ff", "#ff6ca8", "#76f0c2"])
      };
    } else {
      game.moving = {
        x: 0,
        y: game.moving.y - 24,
        width: overlap,
        color: choice(["#ffbf47", "#5ee1ff", "#ff6ca8", "#76f0c2"])
      };
    }
    api.setHint("Stack it.");
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#0f1730";
    ctx.fillRect(0, 0, width, height);

    game.placed.forEach((block) => {
      ctx.fillStyle = block.color;
      ctx.fillRect(block.x, block.y, block.width, 20);
    });

    if (game.moving) {
      ctx.fillStyle = game.moving.color;
      ctx.fillRect(game.moving.x, game.moving.y, game.moving.width, 20);
    }
  }

  function loop(timestamp) {
    draw();
    if (!game.running) return;
    const delta = Math.min(32, timestamp - game.lastTime || 16);
    game.lastTime = timestamp;
    game.moving.x += game.direction * delta * 0.14;

    if (game.moving.x <= 0) {
      game.direction = 1;
    } else if (game.moving.x + game.moving.width >= width) {
      game.direction = -1;
    }

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
      stop("Lock missed.");
      return;
    }

    game.chain += 1;
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
  stage.className = "canvas-stage";
  const { canvas, ctx, width, height } = makeCanvas(320, 420);
  stage.appendChild(canvas);
  stage.appendChild(
    buildTouchControls([
      [
        { label: "Left", onPress: () => nudgePaddle(-26) },
        { label: "Right", onPress: () => nudgePaddle(26), accent: true }
      ]
    ])
  );
  root.appendChild(stage);

  const game = {
    paddleX: width / 2 - 38,
    ball: null,
    bricks: [],
    score: 0,
    running: false,
    raf: 0,
    lastTime: 0
  };

  function makeBricks() {
    const bricks = [];
    const colors = ["#ffbf47", "#ff6ca8", "#5ee1ff", "#76f0c2"];
    for (let row = 0; row < 5; row += 1) {
      for (let column = 0; column < 5; column += 1) {
        bricks.push({
          x: 18 + column * 58,
          y: 22 + row * 30,
          width: 50,
          height: 18,
          color: colors[row % colors.length],
          alive: true
        });
      }
    }
    return bricks;
  }

  function reset() {
    api.countPlay();
    game.paddleX = width / 2 - 48;
    game.ball = { x: width / 2, y: height - 74, vx: 128, vy: -148, radius: 8 };
    game.bricks = makeBricks();
    game.score = 0;
    game.running = true;
    game.lastTime = performance.now();
    api.setCurrent(0);
    api.setHint("Drag or tap the controls.");
    api.setPrimary("Restart", reset);
    cancelAnimationFrame(game.raf);
    game.raf = requestAnimationFrame(loop);
  }

  function stop(message) {
    game.running = false;
    api.updateBest(game.score);
    api.setHint(message);
    api.setPrimary("Start", reset);
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#0f1730";
    ctx.fillRect(0, 0, width, height);

    game.bricks.forEach((brick) => {
      if (!brick.alive) return;
      ctx.fillStyle = brick.color;
      ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
    });

    ctx.fillStyle = "#ffbf47";
    ctx.fillRect(game.paddleX, height - 28, 96, 10);

    if (!game.ball) return;

    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(game.ball.x, game.ball.y, game.ball.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  function movePaddle(clientX) {
    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * width;
    game.paddleX = clamp(x - 48, 10, width - 106);
  }

  function nudgePaddle(delta) {
    if (!game.running) return;
    game.paddleX = clamp(game.paddleX + delta, 10, width - 106);
  }

  function update(delta) {
    game.ball.x += (game.ball.vx * delta) / 1000;
    game.ball.y += (game.ball.vy * delta) / 1000;

    if (game.ball.x <= game.ball.radius || game.ball.x >= width - game.ball.radius) {
      game.ball.vx *= -1;
    }
    if (game.ball.y <= game.ball.radius) {
      game.ball.vy *= -1;
    }

    if (
      game.ball.y + game.ball.radius >= height - 28 &&
      game.ball.x >= game.paddleX &&
      game.ball.x <= game.paddleX + 96 &&
      game.ball.vy > 0
    ) {
      game.ball.vy *= -1;
      game.ball.vx = (game.ball.x - (game.paddleX + 48)) * 4;
    }

    for (const brick of game.bricks) {
      if (!brick.alive) continue;
      if (
        game.ball.x + game.ball.radius > brick.x &&
        game.ball.x - game.ball.radius < brick.x + brick.width &&
        game.ball.y + game.ball.radius > brick.y &&
        game.ball.y - game.ball.radius < brick.y + brick.height
      ) {
        brick.alive = false;
        game.ball.vy *= -1;
        game.score += 10;
        api.setCurrent(game.score);
        api.updateBest(game.score);
        break;
      }
    }

    if (game.bricks.every((brick) => !brick.alive)) {
      stop("Wall cleared.");
      return;
    }

    if (game.ball.y > height + 20) {
      stop("Ball lost.");
    }
  }

  function loop(timestamp) {
    draw();
    if (!game.running) return;
    const delta = Math.min(32, timestamp - game.lastTime || 16);
    game.lastTime = timestamp;
    update(delta);
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
  const { canvas, ctx, width, height } = makeCanvas(320, 360);
  stage.appendChild(canvas);
  stage.appendChild(
    buildTouchControls([
      [{ label: "Match", onPress: tap, accent: true }]
    ])
  );
  root.appendChild(stage);

  const colors = ["#ffbf47", "#5ee1ff", "#ff6ca8", "#76f0c2"];
  const game = {
    rotation: 0,
    speed: 0.00125,
    targetIndex: 0,
    score: 0,
    running: false,
    raf: 0,
    lastTime: 0
  };

  function angleDistance(a, b) {
    const full = Math.PI * 2;
    const diff = Math.abs(a - b) % full;
    return diff > Math.PI ? full - diff : diff;
  }

  function alignmentError() {
    const segmentCenter = game.rotation + game.targetIndex * (Math.PI / 2) + Math.PI / 4;
    return angleDistance(segmentCenter, Math.PI * 1.5);
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#0f1730";
    ctx.fillRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 106;

    colors.forEach((color, index) => {
      const start = game.rotation + index * (Math.PI / 2);
      const end = start + Math.PI / 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, start, end);
      ctx.arc(centerX, centerY, 62, end, start, true);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    });

    ctx.fillStyle = colors[game.targetIndex];
    ctx.beginPath();
    ctx.arc(centerX, centerY, 42, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - 146);
    ctx.lineTo(centerX - 12, centerY - 118);
    ctx.lineTo(centerX + 12, centerY - 118);
    ctx.closePath();
    ctx.fill();
  }

  function start() {
    api.countPlay();
    game.rotation = 0;
    game.speed = 0.00125;
    game.targetIndex = randomInt(0, 3);
    game.score = 0;
    game.running = true;
    game.lastTime = performance.now();
    api.setCurrent(0);
    api.setHint("Tap when the top wedge matches.");
    api.setPrimary("Restart", start);
    cancelAnimationFrame(game.raf);
    game.raf = requestAnimationFrame(loop);
  }

  function stop(message) {
    game.running = false;
    api.updateBest(game.score);
    api.setHint(message);
    api.setPrimary("Start", start);
  }

  function tap() {
    if (!game.running) return;
    if (alignmentError() > 0.38) {
      stop("Missed.");
      return;
    }

    game.score += 1;
    game.speed += 0.00011;
    game.targetIndex = randomInt(0, 3);
    api.setCurrent(game.score);
    api.updateBest(game.score);
    api.setHint(`${game.score} hits.`);
  }

  function loop(timestamp) {
    draw();
    if (!game.running) return;
    const delta = Math.min(32, timestamp - game.lastTime || 16);
    game.lastTime = timestamp;
    game.rotation += delta * game.speed;
    game.raf = requestAnimationFrame(loop);
  }

  canvas.addEventListener("click", tap);
  api.setPrimary("Start", start);
  draw();

  return {
    destroy() {
      cancelAnimationFrame(game.raf);
    }
  };
}

renderRail();
registerOffline();
setupInstall();
switchGame(state.activeGameId);

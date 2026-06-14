const lanes = [
  {
    name: "Source Gate",
    revealTurn: 1,
    effect: "First IDT card played here gets +2 power.",
    apply(card, owner, laneState) {
      const side = owner === "player" ? laneState.player : laneState.opponent;
      if (card.tags.includes("IDT") && side.length === 0) return 2;
      return 0;
    },
  },
  {
    name: "Linear Core",
    revealTurn: 2,
    effect: "Curve cards played here get +1 power. Display cards get -1.",
    apply(card) {
      if (card.tags.includes("Curve")) return 1;
      if (card.tags.includes("Display")) return -1;
      return 0;
    },
  },
  {
    name: "Review Monitor",
    revealTurn: 3,
    effect: "ODT and Viewer cards get +2 power here.",
    apply(card) {
      if (card.tags.includes("ODT") || card.tags.includes("Viewer")) return 2;
      return 0;
    },
  },
];

const deck = [
  {
    id: "logc4-idt",
    name: "LogC4 IDT",
    type: "Source",
    cost: 1,
    power: 3,
    tags: ["IDT", "Camera"],
    text: "Turns ARRI LogC4 into scene-referred ACES before comp.",
  },
  {
    id: "acescg-core",
    name: "ACEScg Core",
    type: "Primaries",
    cost: 2,
    power: 4,
    tags: ["AP1", "Working"],
    text: "Locks merges and CG elements into AP1 scene-linear space.",
  },
  {
    id: "linear-merge",
    name: "Linear Merge",
    type: "Curve",
    cost: 2,
    power: 5,
    tags: ["Curve", "Light"],
    text: "Adds light energy cleanly. Strong where math stays linear.",
  },
  {
    id: "viewer-lut",
    name: "Viewer LUT",
    type: "View",
    cost: 1,
    power: 2,
    tags: ["Viewer", "Display"],
    text: "Preview the show look without baking it into the comp.",
  },
  {
    id: "rec709-odt",
    name: "Rec.709 ODT",
    type: "View",
    cost: 3,
    power: 6,
    tags: ["ODT", "Display"],
    text: "Maps scene values to the client review display.",
  },
  {
    id: "ap0-archive",
    name: "AP0 Archive",
    type: "Primaries",
    cost: 1,
    power: 1,
    tags: ["AP0"],
    text: "Low power, but doubles lane effect bonuses when played last.",
  },
  {
    id: "ocio-config",
    name: "OCIO Config",
    type: "Utility",
    cost: 3,
    power: 4,
    tags: ["Config"],
    text: "If this wins its lane, all your other lanes get +1.",
  },
  {
    id: "bad-bake",
    name: "Baked LUT Trap",
    type: "Hazard",
    cost: 2,
    power: 1,
    tags: ["Display"],
    text: "Looks tempting. If played outside Review Monitor, loses 2.",
  },
];

const enemyDeck = [
  { name: "Wrong Tag", cost: 1, power: 2, type: "Hazard", tags: ["Display"], text: "Treats log as display pixels." },
  { name: "Clamp Grade", cost: 2, power: 3, type: "Hazard", tags: ["Curve"], text: "Destroys highlight evidence." },
  { name: "sRGB Override", cost: 2, power: 4, type: "Hazard", tags: ["Display"], text: "Fast, wrong, and very confident." },
  { name: "Baked Review LUT", cost: 3, power: 5, type: "Hazard", tags: ["ODT"], text: "Wins short term, haunts finals." },
  { name: "Mystery EXR", cost: 1, power: 1, type: "Hazard", tags: ["Camera"], text: "No metadata, no mercy." },
  { name: "Gamma Sandwich", cost: 3, power: 6, type: "Hazard", tags: ["Curve"], text: "Two wrong curves pretending to help." },
];

const state = {
  turn: 1,
  maxTurns: 6,
  energy: 1,
  cubes: 1,
  snapped: false,
  selectedId: null,
  hand: [],
  playerDeck: [],
  enemyDeck: [],
  lanes: lanes.map(() => ({ player: [], opponent: [] })),
  gameOver: false,
};

const els = {
  canvas: document.querySelector("#arena-canvas"),
  cubeCount: document.querySelector("#cube-count"),
  snapButton: document.querySelector("#snap-button"),
  turnLabel: document.querySelector("#turn-label"),
  missionTitle: document.querySelector("#mission-title"),
  missionCopy: document.querySelector("#mission-copy"),
  hand: document.querySelector("#hand"),
  energyPips: document.querySelector("#energy-pips"),
  selectedReadout: document.querySelector("#selected-readout"),
  endTurnButton: document.querySelector("#end-turn-button"),
  resetButton: document.querySelector("#reset-button"),
  toast: document.querySelector("#toast"),
};

function cloneCard(card) {
  return { ...card, instanceId: `${card.id || card.name}-${crypto.randomUUID()}`, bonus: 0 };
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swap]] = [copy[swap], copy[index]];
  }
  return copy;
}

function newMatch() {
  state.turn = 1;
  state.energy = 1;
  state.cubes = 1;
  state.snapped = false;
  state.selectedId = null;
  state.gameOver = false;
  state.playerDeck = shuffle([...deck, ...deck].map(cloneCard));
  state.enemyDeck = shuffle([...enemyDeck, ...enemyDeck].map(cloneCard));
  state.hand = [];
  state.lanes = lanes.map(() => ({ player: [], opponent: [] }));
  drawCards(4);
  render();
  showToast("New match. Win two lanes before the pipeline collapses.");
}

function drawCards(count) {
  for (let index = 0; index < count; index += 1) {
    const card = state.playerDeck.shift();
    if (card && state.hand.length < 7) state.hand.push(card);
  }
}

function cardTotal(card) {
  return card.power + (card.bonus || 0);
}

function lanePower(laneIndex, owner) {
  return state.lanes[laneIndex][owner].reduce((sum, card) => sum + cardTotal(card), 0);
}

function selectedCard() {
  return state.hand.find((card) => card.instanceId === state.selectedId);
}

function playCard(laneIndex) {
  if (state.gameOver) return;
  const card = selectedCard();
  if (!card) {
    showToast("Select a card first.");
    return;
  }
  if (card.cost > state.energy) {
    showToast("Not enough energy.");
    return;
  }
  if (state.lanes[laneIndex].player.length >= 4) {
    showToast("That lane is full.");
    return;
  }

  state.energy -= card.cost;
  state.hand = state.hand.filter((item) => item.instanceId !== card.instanceId);
  card.bonus = laneBonus(card, "player", laneIndex);
  state.lanes[laneIndex].player.push(card);
  state.selectedId = null;
  showToast(`${card.name} played to ${lanes[laneIndex].name}.`);
  render();
}

function laneBonus(card, owner, laneIndex) {
  const lane = lanes[laneIndex];
  if (state.turn < lane.revealTurn) return 0;
  let bonus = lane.apply(card, owner, state.lanes[laneIndex]);
  if (card.id === "ap0-archive" && state.lanes[laneIndex][owner].length >= 3) bonus += Math.max(0, bonus);
  if (card.id === "bad-bake" && lane.name !== "Review Monitor") bonus -= 2;
  return bonus;
}

function enemyTurn() {
  const playable = state.enemyDeck.filter((card) => card.cost <= Math.min(6, state.turn + 1));
  if (!playable.length) return;
  const card = playable[Math.floor(Math.random() * playable.length)];
  state.enemyDeck = state.enemyDeck.filter((item) => item.instanceId !== card.instanceId);

  const candidates = state.lanes
    .map((laneState, laneIndex) => ({ laneIndex, open: laneState.opponent.length < 4 }))
    .filter((item) => item.open);
  if (!candidates.length) return;

  candidates.sort((a, b) => lanePower(a.laneIndex, "player") - lanePower(b.laneIndex, "player"));
  const target = candidates[Math.floor(Math.random() * Math.min(2, candidates.length))].laneIndex;
  card.bonus = laneBonus(card, "opponent", target);
  state.lanes[target].opponent.push(card);
}

function endTurn() {
  if (state.gameOver) {
    newMatch();
    return;
  }

  enemyTurn();
  resolveOcio();

  if (state.turn >= state.maxTurns) {
    finishMatch();
    return;
  }

  state.turn += 1;
  state.energy = state.turn;
  drawCards(1);
  state.selectedId = null;
  render();
  showToast(`Turn ${state.turn}. ${revealedLaneText()}`);
}

function resolveOcio() {
  const ocioLane = state.lanes.findIndex((laneState, laneIndex) => {
    const hasOcio = laneState.player.some((card) => card.id === "ocio-config");
    return hasOcio && lanePower(laneIndex, "player") > lanePower(laneIndex, "opponent");
  });
  if (ocioLane === -1) return;

  state.lanes.forEach((laneState, laneIndex) => {
    if (laneIndex === ocioLane) return;
    laneState.player.forEach((card) => {
      if (!card.ocioBoosted) {
        card.ocioBoosted = true;
        card.bonus += 1;
      }
    });
  });
}

function revealedLaneText() {
  const revealed = lanes.filter((lane) => lane.revealTurn === state.turn).map((lane) => lane.name);
  return revealed.length ? `${revealed.join(", ")} revealed.` : "Play your best correction.";
}

function finishMatch() {
  state.gameOver = true;
  const wins = lanes.map((_, laneIndex) => Math.sign(lanePower(laneIndex, "player") - lanePower(laneIndex, "opponent")));
  const playerWins = wins.filter((value) => value > 0).length;
  const enemyWins = wins.filter((value) => value < 0).length;
  const tiedPower = wins.filter((value) => value === 0).length;

  if (playerWins > enemyWins) {
    els.missionTitle.textContent = `Victory: +${state.cubes} cubes`;
    els.missionCopy.textContent = "Your ACES pipeline held across the match.";
    showToast("Match won. The grade survives.");
  } else if (enemyWins > playerWins) {
    els.missionTitle.textContent = `Defeat: -${state.cubes} cubes`;
    els.missionCopy.textContent = "The Chromancer found the weak transform.";
    showToast("Match lost. Rebuild the pipeline.");
  } else {
    els.missionTitle.textContent = `Draw: ${tiedPower} tied lanes`;
    els.missionCopy.textContent = "No cube movement. The review room remains unconvinced.";
    showToast("Draw. No cube movement.");
  }
  render();
}

function snap() {
  if (state.snapped || state.gameOver) return;
  state.snapped = true;
  state.cubes = 2;
  showToast("Snapped. Stakes doubled.");
  render();
}

function render() {
  els.cubeCount.textContent = state.cubes;
  els.snapButton.disabled = state.snapped || state.gameOver;
  els.snapButton.textContent = state.snapped ? "Snapped" : "Snap";
  els.turnLabel.textContent = state.gameOver ? "Match Complete" : `Turn ${state.turn} / ${state.maxTurns}`;

  if (!state.gameOver) {
    els.missionTitle.textContent = "Win two lanes by fixing the color pipeline.";
    els.missionCopy.textContent = "Play ACES tactic cards into reveal lanes. Higher power wins the lane when the match ends.";
  }

  renderEnergy();
  renderLanes();
  renderHand();
  renderSelected();
}

function renderEnergy() {
  els.energyPips.innerHTML = "";
  const max = Math.max(1, state.turn);
  for (let index = 0; index < max; index += 1) {
    const pip = document.createElement("i");
    pip.className = `pip ${index < state.energy ? "active" : ""}`;
    els.energyPips.appendChild(pip);
  }
}

function renderLanes() {
  lanes.forEach((lane, laneIndex) => {
    const revealed = state.turn >= lane.revealTurn;
    const laneElement = document.querySelector(`[data-lane="${laneIndex}"].lane`);
    laneElement.classList.toggle("locked", !revealed);
    laneElement.classList.toggle("revealed", revealed);
    laneElement.classList.toggle("winning", lanePower(laneIndex, "player") > lanePower(laneIndex, "opponent"));
    laneElement.classList.toggle("losing", lanePower(laneIndex, "player") < lanePower(laneIndex, "opponent"));
    document.querySelector(`#lane-name-${laneIndex}`).textContent = revealed ? lane.name : "Hidden Node";
    document.querySelector(`#lane-effect-${laneIndex}`).textContent = revealed ? lane.effect : "Unknown pipeline effect.";
    laneElement.querySelector(".lane-status").textContent = revealed ? "Revealed" : `Reveals Turn ${lane.revealTurn}`;
    document.querySelector(`#opponent-score-${laneIndex}`).textContent = lanePower(laneIndex, "opponent");
    document.querySelector(`#player-score-${laneIndex}`).textContent = lanePower(laneIndex, "player");
    renderLaneCards(laneIndex, "opponent");
    renderLaneCards(laneIndex, "player");
  });
}

function renderLaneCards(laneIndex, owner) {
  const container = document.querySelector(`#${owner === "player" ? "player" : "opponent"}-lane-${laneIndex}`);
  container.innerHTML = "";
  state.lanes[laneIndex][owner].forEach((card) => container.appendChild(cardElement(card, owner === "opponent")));
}

function renderHand() {
  els.hand.innerHTML = "";
  state.hand.forEach((card) => els.hand.appendChild(cardElement(card, false, true)));
  document.querySelectorAll(".drop-zone").forEach((zone) => {
    const card = selectedCard();
    zone.classList.toggle("disabled", !card || card.cost > state.energy);
  });
}

function renderSelected() {
  const card = selectedCard();
  els.selectedReadout.textContent = card
    ? `${card.name}: ${card.cost} energy, ${card.power} power. ${card.text}`
    : "Select a card.";
}

function cardElement(card, enemy = false, inHand = false) {
  const button = document.createElement(inHand ? "button" : "article");
  button.className = `card ${enemy ? "enemy" : ""} ${inHand ? "" : "played"} ${
    card.instanceId === state.selectedId ? "selected" : ""
  } ${inHand && card.cost > state.energy ? "unplayable" : ""}`;
  if (inHand) {
    button.type = "button";
    button.addEventListener("click", () => {
      state.selectedId = card.instanceId;
      render();
    });
  }
  button.innerHTML = `
    <div class="card-stats">
      <span class="stat cost">${card.cost}</span>
      <span class="stat power">${cardTotal(card)}</span>
    </div>
    <span class="card-type">${card.type}</span>
    <h3>${card.name}</h3>
    <p>${card.text}</p>
  `;
  return button;
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => els.toast.classList.remove("show"), 2200);
}

function initArena() {
  const canvas = els.canvas;
  const gl = canvas.getContext("webgl", { alpha: true, antialias: true });
  if (!gl) return;

  const vertexSource = `
    attribute vec2 a_position;
    attribute vec3 a_color;
    uniform float u_time;
    varying vec3 v_color;
    void main() {
      vec2 p = a_position;
      p.y += sin(u_time + p.x * 8.0) * 0.015;
      gl_Position = vec4(p, 0.0, 1.0);
      v_color = a_color;
    }
  `;
  const fragmentSource = `
    precision mediump float;
    varying vec3 v_color;
    void main() {
      gl_FragColor = vec4(v_color, 0.48);
    }
  `;

  const compile = (type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
  };
  const program = gl.createProgram();
  gl.attachShader(program, compile(gl.VERTEX_SHADER, vertexSource));
  gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragmentSource));
  gl.linkProgram(program);
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  const position = gl.getAttribLocation(program, "a_position");
  const color = gl.getAttribLocation(program, "a_color");
  const time = gl.getUniformLocation(program, "u_time");
  const stride = 5 * Float32Array.BYTES_PER_ELEMENT;
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, stride, 0);
  gl.enableVertexAttribArray(color);
  gl.vertexAttribPointer(color, 3, gl.FLOAT, false, stride, 2 * Float32Array.BYTES_PER_ELEMENT);

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(innerWidth * ratio);
    canvas.height = Math.floor(innerHeight * ratio);
    gl.viewport(0, 0, canvas.width, canvas.height);
  };
  window.addEventListener("resize", resize);
  resize();

  const start = performance.now();
  const draw = () => {
    const t = (performance.now() - start) / 1000;
    const vertices = [];
    const rect = (x, y, w, h, c, tilt = 0) => {
      const pts = [
        x - tilt, y, x + w - tilt, y, x + tilt, y + h,
        x + tilt, y + h, x + w - tilt, y, x + w + tilt, y + h,
      ];
      for (let i = 0; i < pts.length; i += 2) vertices.push(pts[i], pts[i + 1], c[0], c[1], c[2]);
    };
    for (let i = 0; i < 18; i += 1) {
      const x = -1.1 + i * 0.13;
      rect(x, -0.78 + Math.sin(t + i) * 0.04, 0.08, 0.18, i % 2 ? [1, 0.18, 0.78] : [0.08, 0.96, 1], 0.025);
    }
    rect(-0.8, -0.92, 1.6, 0.04, [0.08, 0.96, 1]);
    rect(-0.64, -0.55, 1.28, 0.03, [1, 0.18, 0.78]);
    gl.clearColor(0.02, 0.025, 0.055, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(time, t);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
    gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 5);
    canvas.dataset.renderer = "native-webgl-lane-battler";
    requestAnimationFrame(draw);
  };
  draw();
}

document.querySelectorAll(".drop-zone").forEach((zone) => {
  zone.addEventListener("click", () => playCard(Number(zone.dataset.lane)));
});
els.endTurnButton.addEventListener("click", endTurn);
els.resetButton.addEventListener("click", newMatch);
els.snapButton.addEventListener("click", snap);

initArena();
newMatch();

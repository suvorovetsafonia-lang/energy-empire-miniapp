function setupGrid() {
  const rows = 4, cols = 6;
  for(let i = 0; i < rows * cols; i++) {
    const tile = document.createElement("div");
    tile.className = "tile empty";
    tile.dataset.idx = i;
    tile.innerHTML = `<div class="icon">＋</div><div class="label">Пусто</div>`;
    tile.addEventListener("click", () => {
      const b = state.buildings[i];
      if(!b) {
        addLog(`Клетка ${i+1} — пустая. Построй здесь.`);
      } else {
        addLog(`Клетка ${i+1}: ${BUILDINGS[b.type].name} • ген ${(b.power*60).toFixed(1)} MWh/мин`);
      }
    });
    ui.grid.appendChild(tile);
    state.buildings.push(null);
  }
}

function setupButtons() {
  document.getElementById("buildSolar").onclick = () => {
    if(build("solar")) updateGridUI();
    updateUI();
  };
  document.getElementById("buildWind").onclick = () => {
    if(build("wind")) updateGridUI();
    updateUI();
  };
  document.getElementById("buildBattery").onclick = () => {
    if(build("battery")) updateGridUI();
    updateUI();
  };
  document.getElementById("sellAll").onclick = () => {
    if(sellEnergy(1)) updateUI();
  };
  document.getElementById("sellHalf").onclick = () => {
    if(sellEnergy(0.5)) updateUI();
  };
  document.getElementById("uSolar").onclick = () => {
    if(upgrade("solarPanel")) updateUI();
  };
  document.getElementById("uWind").onclick = () => {
    if(upgrade("windOpt")) updateUI();
  };
  document.getElementById("uStorage").onclick = () => {
    if(upgrade("storageIncrease")) updateUI();
  };
  document.getElementById("uBuild").onclick = () => {
    if(upgrade("fastBuild")) updateUI();
  };
}

function updateGridUI() {
  for(let i = 0; i < state.buildings.length; i++) {
    const b = state.buildings[i];
    const tile = ui.grid.children[i];
    if(b) {
      tile.classList.remove("empty");
      tile.querySelector(".icon").innerText = BUILDINGS[b.type].icon;
      tile.querySelector(".label").innerText = BUILDINGS[b.type].name;
    } else {
      tile.classList.add("empty");
      tile.querySelector(".icon").innerText = "＋";
      tile.querySelector(".label").innerText = "Пусто";
    }
  }
}

function gameTick() {
  // Производство энергии каждую секунду
  const gen = state.buildings.reduce((s, b) => b ? s + b.power : s, 0);
  state.energy += gen;
  if(state.energy > state.storageMax) state.energy = state.storageMax;
  updateUI();
}

function init() {
  initUI();
  setupGrid();
  setupButtons();
  updateUI();
  addLog("Игра запущена!");

  setInterval(gameTick, 1000);

  // Можно добавить обновление рынка и события
}

window.onload = init;

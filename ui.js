const ui = {
  energy: null,
  money: null,
  storage: null,
  price: null,
  grid: null,
  log: null,
  buildCount: null,
  genNow: null,
  incomeNow: null,
  banner: null
};

function initUI() {
  ui.energy = document.getElementById("ui-energy");
  ui.money = document.getElementById("ui-money");
  ui.storage = document.getElementById("ui-storage");
  ui.price = document.getElementById("price");
  ui.grid = document.getElementById("grid");
  ui.log = document.getElementById("log");
  ui.buildCount = document.getElementById("buildCount");
  ui.genNow = document.getElementById("genNow");
  ui.incomeNow = document.getElementById("incomeNow");
  ui.banner = document.getElementById("banner");
}

function updateUI() {
  tweenNumber(ui.energy, state.energy);
  tweenNumber(ui.money, state.money);
  ui.storage.innerText = `${Math.floor(state.energy)} / ${state.storageMax}`;
  ui.price.innerText = state.price.toFixed(2);
  ui.buildCount.innerText = state.buildings.filter(b => b).length;
  const gen = state.buildings.reduce((sum, b) => b ? sum + b.power : sum, 0);
  ui.genNow.innerText = (gen * 60).toFixed(2) + " MWh/мин";
  ui.incomeNow.innerText = "$" + (gen * state.price * 60).toFixed(2);
}

function addLog(text) {
  const div = document.createElement("div");
  div.className = "log-item";
  div.innerText = `${new Date().toLocaleTimeString()} — ${text}`;
  ui.log.prepend(div);
}

function showBanner(text, ms = 2400) {
  ui.banner.innerText = text;
  ui.banner.classList.add("show");
  setTimeout(() => {
    ui.banner.classList.remove("show");
  }, ms);
}

const state = {
  energy: 0,
  money: 1000,
  storageMax: 100,
  buildings: [],
  upgrades: {
    solarPanel: 0,
    windOpt: 0,
    storageIncrease: 0,
    fastBuild: 0
  },
  price: 5.0
};

function build(type) {
  const buildingData = BUILDINGS[type];
  if(state.money < buildingData.cost) {
    addLog("Недостаточно денег для постройки");
    return false;
  }
  state.money -= buildingData.cost;
  if(type === "battery") {
    state.storageMax += buildingData.storageBonus * (1 + 0.15 * state.upgrades.storageIncrease);
    addLog("Аккумулятор построен, вместимость увеличена");
    return true;
  }
  // добавляем здание в первое свободное место
  const idx = state.buildings.findIndex(b => !b);
  if(idx === -1) {
    addLog("Нет свободных клеток");
    return false;
  }
  let power = buildingData.power * (1 + 0.12 * state.upgrades[type === "solar" ? "solarPanel" : "windOpt"]);
  state.buildings[idx] = {
    type,
    power,
    created: Date.now()
  };
  addLog(`${buildingData.name} построена в клетке ${idx + 1}`);
  return true;
}

function sellEnergy(fraction) {
  const amount = Math.floor(state.energy * fraction);
  if(amount <= 0) {
    addLog("Нет энергии для продажи");
    return false;
  }
  const revenue = amount * state.price;
  state.energy -= amount;
  state.money += revenue;
  addLog(`Продано ${amount} MWh за $${revenue.toFixed(2)}`);
  return true;
}

function upgrade(name) {
  const upgradeData = UPGRADES[name];
  if(state.money < upgradeData.cost) {
    addLog("Недостаточно денег для апгрейда");
    return false;
  }
  state.money -= upgradeData.cost;
  state.upgrades[name]++;
  addLog(`Апгрейд ${upgradeData.name} куплен. Уровень: ${state.upgrades[name]}`);
  if(name === "storageIncrease") {
    state.storageMax += 100 * 0.15;
  }
  return true;
}

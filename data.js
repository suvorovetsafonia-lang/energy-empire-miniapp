const BUILDINGS = {
  solar: {
    name: "Солнечная ферма",
    cost: 200,
    power: 8/60, // MWh в секунду
    icon: "☀️",
    description: "Производит энергию за счёт солнца"
  },
  wind: {
    name: "Ветровая турбина",
    cost: 150,
    power: 5/60,
    icon: "🌬️",
    description: "Производит энергию за счёт ветра"
  },
  battery: {
    name: "Аккумулятор",
    cost: 250,
    storageBonus: 100,
    icon: "🔋",
    description: "Увеличивает вместимость энергии"
  }
};

const UPGRADES = {
  solarPanel: { name: "Улучшение панелей", cost: 300 },
  windOpt: { name: "Оптимизация турбин", cost: 250 },
  storageIncrease: { name: "Увеличение батарей", cost: 350 },
  fastBuild: { name: "Быстрая стройка", cost: 200 }
};

// Plant.Class.js

class Plant {
  constructor(name, growthRate, harvestReward) {
    this.name = name;
    this.growthStage = 0;
    this.growthRate = growthRate;
    this.harvestReward = harvestReward;
  }

  grow() {
    this.growthStage += 1;
  }

  harvest() {
    const reward = this.harvestReward;
    this.growthStage = 0;
    return reward;
  }

  isMature() {
    return this.growthStage >= this.growthRate;
  }
}


// Game.Class.js

class Game {
  constructor() {
    this.visitorCreatures = window.VisitorCreatures;
    this.lunarCycle = null;
    this.playerResources = null;
    this.craftingRecipes = window.CraftingRecipes;
    this.plants = window.Plants;
    this.plantGrowthStages = window.PlantGrowthStages;
    this.planted = {}; // Track planted crops
    this.harvested = {}; // Track harvested plants
    this.crafted = {}; // Track crafted items
    
    // HTML DOM Elements
    this.lunarCycleElement = document.getElementById('lunar-cycle');
    this.resourceListElement = document.getElementById('resource-list');
    this.playerCurrenciesElement = document.getElementById('player-currencies');
    this.playerPlantsElement = document.getElementById('player-plants');
    this.playerHarvestedPlantsElement = document.getElementById('player-harvested-plants');
    this.playerCraftedItemsElement = document.getElementById('player-crafted-items');
  }

  init(lunarCycle, playerResources) {
    if (!(lunarCycle instanceof LunarCycle) || !(playerResources instanceof PlayerResources)) {
      throw new Error('Invalid game dependencies');
    }
    this.lunarCycle = lunarCycle;
    this.playerResources = playerResources;
    this.lunarCycle.startCycle(); // Start lunar cycle
  }

  plant(plantId) {
    const plant = this.plants[plantId];
    if (plant && !this.planted[plantId]) {
      // Check resource requirements (e.g., seeds, water)
      if (this.playerResources.getResource('seeds', 1)) {
        // Consume resources
        this.playerResources.removeResource('seeds', 1);

        // Record planted crop
        this.planted[plantId] = {
          plant,
          timestamp: Date.now(),
          stage: 'seedling'
        };

        console.log(`Planted ${plant.name}.`);
      } else {
        console.log('Insufficient seeds.');
      }
    }
    else {
      console.log(`Already planted ${plant.name}.`);
    }
  }

  harvest(plantId) {
    const planted = this.planted[plantId];
    if (planted) {
      // Award harvest rewards
      const rewards = planted.plant;
      this.playerResources.addResource(rewards.name);
      // Add experience logic

      // Remove planted crop
      delete this.planted[plantId];

      console.log(`Harvested ${planted.plant.name}.`);
    }
  }

  craft(itemName) {
    const recipe = this.craftingRecipes[itemName];
    // Check if player has sufficient resources
    if (recipe) {
      if (this.playerResources.getResource('moonstones') >= recipe.requirements.moonstones
          && this.playerResources.getResource('lunarium') >= recipe.requirements.lunarium) {
        // Consume resources
        this.playerResources.removeResource('moonstones', recipe.requirements.moonstones);
        this.playerResources.removeResource('lunarium', recipe.requirements.lunarium);

        // Reward crafted item
        this.playerResources.addResource(recipe.name);

        console.log('Crafting successful!');
      } else {
        console.log('Insufficient resources.');
      }
    }
    else {
      console.log('Recipe not found.');
    }
  }

  update() {
    // Update planted crops
    Object.keys(this.planted).forEach((plantId) => {
      const planted = this.planted[plantId];
      const growthTime = planted.plant.growthTime;
      const elapsed = Date.now() - planted.timestamp;

      // Check growth stage
      if (elapsed >= growthTime) {
        // Harvest crop
        this.harvest(plantId);
      }
      else {
        // Update growth stage
        const stageDuration = this.plantGrowthStages[planted.stage].duration;
        if (elapsed >= stageDuration) {
          // Advance growth stage
          const stages = Object.keys(this.plantGrowthStages);
          const currentIndex = stages.indexOf(planted.stage);
          const nextStage = stages[currentIndex + 1];
          planted.stage = nextStage;
        }
      }
    });
    
    this.lunarCycle.advancePhase();
    this.lunarCycleElement.innerHTML = this.lunarCycle.phases[this.lunarCycle.currentPhaseIndex];
    
    // TO DO: Update visitor creatures.
    
    // Update player resources display
    this.updateCurrenciesDisplay();
    this.updatePlantsDisplay();
    this.updateHarvestedPlantsDisplay();
    this.updateCraftedItemsDisplay();
  }

  updateCurrenciesDisplay() {
    const currencies = Object.keys(this.playerResources.resources).filter((resource) => {
      return ['moonstones', 'lunarium'].includes(resource);
    });
    const currencyList = currencies.map((currency) => {
      return `<p>${currency}: ${this.playerResources.getResource(currency)}</p>`;
    });
    this.playerCurrenciesElement.innerHTML = currencyList.join('');
  }

  updatePlantsDisplay() {
    const planted = Object.keys(this.planted);
    const plantList = planted.map((plantId) => {
      return `<p>${this.plants[plantId].name} (${this.planted[plantId].stage})</p>`;
    });
    this.playerPlantsElement.innerHTML = plantList.join('');
  }

  updateHarvestedPlantsDisplay() {
    const harvested = Object.keys(this.harvested);
    const harvestedList = harvested.map((plantId) => {
      return `<p>${this.plants[plantId].name}</p>`;
    });
    this.playerHarvestedPlantsElement.innerHTML = harvestedList.join('');
  }

  updateCraftedItemsDisplay() {
    const craftedItems = Object.keys(this.playerResources.resources).filter((resource) => {
      return ['Crafted Item', 'Lunar Sword'].includes(resource);
    });
    const craftedItemList = craftedItems.map((item) => {
      return `<p>${item}: ${this.playerResources.getResource(item)}</p>`;
    });
    this.playerCraftedItemsElement.innerHTML = craftedItemList.join('');
  }
}


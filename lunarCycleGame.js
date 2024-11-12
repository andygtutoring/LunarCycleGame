// lunarCycleGame.js

// Create game instances
const game = new Game();
const lunarCycle = new LunarCycle();
const playerResources = new PlayerResources();

// Initialize game
game.init(lunarCycle, playerResources);
// Update onscreen displays (updates again every 30 seconds).
game.update();

// Event listeners
document.getElementById('plant-button').addEventListener('click', (e) => {
  game.plant("moonbloom");
  game.update();
});
document.getElementById('harvest-button').addEventListener('click', (e) => {
  game.harvest("moonbloom");
  game.update();
});
document.getElementById('craft-button').addEventListener('click', (e) => {
  game.craft("lunarSword");
  game.update();
});

// Game loop (if necessary)
setInterval(() => {
  game.update();
}, lunarCycle.duration);

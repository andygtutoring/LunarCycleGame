// LunarCycle.Class.js
/***
 * Example implementation:
 * // Start lunar cycle
 * lunarCycle.startCycle();
 * 
 * // Get current lunar phase
 * console.log(lunarCycle.getCurrentPhase());
 * 
 * // Stop lunar cycle
 * lunarCycle.stopCycle();
 **/

class LunarCycle {
  constructor() {
    this.phases = [
      "New Moon",
      "Waxing Crescent",
      "First Quarter",
      "Waxing Gibbous",
      "Full Moon",
      "Waning Gibbous",
      "Last Quarter",
      "Waning Crescent"
    ];
    this.currentPhaseIndex = 0;
    this.duration = 10000; // 10 seconds per phase (adjust for game speed)
  }

  // Advance to next lunar phase
  advancePhase() {
    this.currentPhaseIndex = (this.currentPhaseIndex + 1) % this.phases.length;
  }

  // Get current lunar phase
  getCurrentPhase() {
    return this.phases[this.currentPhaseIndex];
  }

  // Initialize lunar cycle interval
  startCycle() {
    this.intervalId = setInterval(() => {
      this.advancePhase();
      // Notify game logic of phase change (e.g., update visitor creatures)
    }, this.duration);
  }

  // Stop lunar cycle interval
  stopCycle() {
    clearInterval(this.intervalId);
  }
}


// VisitorCreature.Class.js
/***
 * Example implementation:
 * const moonFox = new VisitorCreature('Moon Fox', 0, 'moonstones', 'trade');
 * const lunarRabbit = new VisitorCreature('Lunar Rabbit', 2, 'lunarium', 'quest');
 * 
 * // Update creature presence
 * moonFox.checkPresence(lunarCycle);
 * lunarRabbit.checkPresence(lunarCycle);
 * 
 * // Initiate interaction
 * if (moonFox.isPresent) {
 *     moonFox.interact(playerResources);
 * }
 **/

class VisitorCreature {
  constructor(name, lunarPhase, reward, interactionType) {
    this.name = name;
    this.lunarPhase = lunarPhase; // Index of lunar phase (0-7)
    this.reward = reward; // Resource(s) offered
    this.interactionType = interactionType; // Trade, quest or challenge
    this.isPresent = false;
  }

  // Check if creature is present based on lunar phase
  checkPresence(lunarCycle) {
    this.isPresent = lunarCycle.getCurrentPhaseIndex() === this.lunarPhase;
  }

  // Initiate interaction (trade, quest or challenge)
  interact(playerResources) {
    switch (this.interactionType) {
      case 'trade':
        // Trade logic
        playerResources.addResource(this.reward, 10);
        break;
      case 'quest':
        // Quest logic
        console.log(`Complete ${this.name}'s quest`);
        break;
      case 'challenge':
        // Challenge logic
        console.log(`Defeat ${this.name} in combat`);
        break;
    }
  }
}


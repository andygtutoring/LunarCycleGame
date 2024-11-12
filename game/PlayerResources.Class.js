// PlayerResources.Class.js
/***
 * Example implementation:
 * // Add Moonstones
 * playerResources.addResource('moonstones', 10);
 * 
 * // Add seeds
 * playerResources.addSpecificResource('seeds', 'Lunar Bloom', 5);
 * 
 * // Remove Lunarium
 * playerResources.removeResource('lunarium', 2);
 * 
 * // Get Moonstones quantity
 * console.log(playerResources.getResource('moonstones'));  // Output: 10
 * 
 * // Get Lunar Bloom seeds quantity
 * console.log(playerResources.getSpecificResource('seeds', 'Lunar Bloom'));  // Output: 5
 **/

class PlayerResources {
  constructor() {
    this.resources = {
      moonstones: 100,
      lunarium: 20,
      seeds: {},
      plants: {},
      lunarEnergy: 0,
      craftedItems: {}
    };
  }

  // Add resource
  addResource(resourceType, quantity = 1) {
    if (resourceType in this.resources) {
      this.resources[resourceType] += quantity;
    } else if (resourceType === "seeds" || resourceType === "plants") {
      this.addSpecificResource(resourceType, quantity);
    }
  }

  // Remove resource
  removeResource(resourceType, quantity = 1) {
    if (resourceType in this.resources && this.resources[resourceType] >= quantity) {
      this.resources[resourceType] -= quantity;
    }
  }

  // Add specific seeds/plants
  addSpecificResource(resourceType, resourceName, quantity = 1) {
    if (!(resourceName in this.resources[resourceType])) {
      this.resources[resourceType][resourceName] = quantity;
    } else {
      this.resources[resourceType][resourceName] += quantity;
    }
  }

  // Remove specific seeds/plants
  removeSpecificResource(resourceType, resourceName, quantity = 1) {
    if (resourceName in this.resources[resourceType] && this.resources[resourceType][resourceName] >= quantity) {
      this.resources[resourceType][resourceName] -= quantity;
      if (this.resources[resourceType][resourceName] <= 0) {
        delete this.resources[resourceType][resourceName];
      }
    }
  }

  // Get resource quantity
  getResource(resourceType) {
    if (resourceType in this.resources) {
      return this.resources[resourceType];
    } else if (resourceType === "seeds" || resourceType === "plants") {
      return this.getSpecificResource(resourceType);
    }
    return 0;
  }

  // Get specific seeds/plants quantity
  getSpecificResource(resourceType, resourceName) {
    if (resourceName in this.resources[resourceType]) {
      return this.resources[resourceType][resourceName];
    }
    return 0;
  }
}


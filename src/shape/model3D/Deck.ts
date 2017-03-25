import * as THREE from 'three';

import { Obj3D, DeckLevel } from './index';

/**
 * Handles DeckLevel(s)
 */
export class Deck extends Obj3D {

  deckLevels: DeckLevel[] = [];

  constructor() {
    super();
    this.model = new THREE.Group();
  }

  // handles what is allowed to be added to the deck
  add(obj3d: Obj3D): void {
    if (obj3d instanceof DeckLevel) {
      this.deckLevels.push(obj3d);
      this.model.add(obj3d.model);
    }
  }

  // TODO removes the 3d and the model from this class instance
  remove(idName: string) {

  }
}

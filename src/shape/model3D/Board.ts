import { Obj3D } from './index';
import { ModelType } from '../../index';

/**
 * the base of all boards (post, beams, future possibly deckboards)
 * Idea: this class should just hold one 3d board.
 * the parent 3d model using it should clone the board if there are many
 */
export class Board extends Obj3D {

  constructor() {
    super();
  }
}

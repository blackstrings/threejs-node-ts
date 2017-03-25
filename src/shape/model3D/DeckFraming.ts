import * as THREE from 'three';

import {Animate} from '../../animation/Animate';
import { Shape2d } from '../index';
import { Board, Obj3D } from './index';
// import { Shape } from '../shape2d/Shape';

// the boards for the bottom fo the deck
export class DeckFraming extends Obj3D implements Animate {

  canAnimate: boolean;
  model: THREE.Group;

  shape: THREE.Shape;
  boards: Board[] = [];

  constructor(shape: Shape2d) {
    super();
    this.init();
  }

  init() {
    this.model = new THREE.Group();

  }

  animate(): void {

  };

}

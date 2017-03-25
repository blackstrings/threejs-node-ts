import * as THREE from 'three';

import { BaseManager } from './';
import { SelectionMode } from '../';
import { Obj3D } from '../shape/model3D';
import { ShapeModel } from '../shape';

export class SelectionManager extends BaseManager {

  selectionMode: SelectionMode;
  currentSelection: ShapeModel;

  constructor() {
    super();
  }
}

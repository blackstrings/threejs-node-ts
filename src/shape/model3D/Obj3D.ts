import * as THREE from 'three';

// All model planning to have 3d, should extend the base Obj3D
export abstract class Obj3D {
  model: THREE.Group;
}

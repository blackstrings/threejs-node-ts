import * as THREE from 'three';

import { Threejs, RenderSetting, Utils } from '../index';
import { DisplayCanvas } from './index';
import { ShapeMaker } from '../shape/index';

/**
 * This canvas is specific to displaying a deck design screen
 */
export class Final3dCanvas implements DisplayCanvas {

  canAnimate: boolean;

  // test
  mesh: THREE.Mesh;

  meshes: THREE.Mesh[] = [];

  constructor(private threejs: Threejs) {
    this.init();
  }

  init(): void {
    // custom settings for this canvas
    this.threejs.uiManager.createGrid("front", 16);
    this.threejs.uiManager.createAxis(Utils.feetToInches(4));
    this.threejs.renderManager.setRenderSetting(RenderSetting.DEFAULT);  // black background
    this.threejs.cameraManager.perspectiveCamera.position.z = Utils.feetToInches(50);

    this.canAnimate = false;

  }

  playAnimation(): void {
    if (this.canAnimate) {
      if (this.mesh) {
        this.mesh.rotation.y += 0.005;
      }
    }
  }

}

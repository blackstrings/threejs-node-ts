import * as THREE from 'three';

import { Threejs, RenderSetting, Utils } from '../index';
import { DisplayCanvas } from './index';
import { ShapeMaker, Shape2dTemplates } from '../shape/index';

/**
 * This canvas is specific to displaying a 3d deck design screen.
 * The canvas allows allow togglign 2d and 3d.
 */
export class DeckDesign3dCanvas implements DisplayCanvas {

  canAnimate: boolean;

  // test
  mesh: THREE.Mesh;
  meshes: THREE.Mesh[] = [];

  constructor(private threejs: Threejs) {
    this.init();
  }

  init(): void {
    // custom initial settings for this canvas
    this.threejs.uiManager.createGrid("top", 16);
    this.threejs.uiManager.createAxis(Utils.feetToInches(4));
    this.threejs.renderManager.setRenderSetting(RenderSetting.DEFAULT);  // sets black background
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

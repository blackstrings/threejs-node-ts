import * as THREE from 'three';

import { Threejs, RenderSetting, Utils, ShapeType3D } from '../index';
import { DisplayCanvas } from './index';
import { ShapeMaker, Shape2dTemplates, ShapeModelFactory } from '../shape/index';

/**
 * This canvas is specific to displaying a deck design screen
 */
export class DeckLandingPageCanvas implements DisplayCanvas {

  canAnimate: boolean;

  // test
  mesh: THREE.Mesh;
  meshes: THREE.Mesh[] = [];

  constructor(private threejs: Threejs) {
    this.init();
  }

  init(): void {
    // settings
    this.threejs.renderManager.setRenderSetting(RenderSetting.BASIC);  // clear background
    this.threejs.cameraManager.setupOrbitViewOnly();

    this.canAnimate = true;

    // create  test deck - keep in mind the camera is at 0,0,0
    // you'll need to reposition the mesh away from the camera to see the mesh if the mesh is big
    this.mesh = ShapeModelFactory.createShape3D(ShapeType3D.TESTDECK);
    this.mesh.position.z -= 300;
    this.threejs.sceneManager.add(this.mesh);
    this.threejs.uiManager.createRaycaster();
  }

  playAnimation(): void {
    if (this.canAnimate) {
      if (this.mesh) {
        this.mesh.rotation.y += 0.005;
      }
    }
  }

}

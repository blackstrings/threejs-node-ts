import * as THREE from 'three';

import { Threejs, RenderSetting, Utils } from '../index';
import { DisplayCanvas } from './index';
import { ShapeMaker, Shape2dTemplates, ShapeUtils, ShapeModelFactory } from '../shape/index';

/**
 * This canvas is specific to drawing 2d shapes and displaying deck templates
 */
export class Design2dCanvas implements DisplayCanvas {

  canAnimate: boolean;

  // test
  mesh: THREE.Mesh;
  meshes: THREE.Mesh[] = [];

  // tslint:disable-next-line:one-line
  constructor(private threejs: Threejs) {
    this.init();
  }

  init(): void {
    // custom settings for this canvas
    this.threejs.uiManager.createGrid("top", 128);
    this.threejs.uiManager.createRaycaster();
    this.threejs.uiManager.createAxis(Utils.feetToInches(4));

    this.threejs.renderManager.setRenderSetting(RenderSetting.BASIC);  // clear background

    this.threejs.cameraManager.perspectiveCamera.position.y = Utils.feetToInches(50);
    this.threejs.cameraManager.activeCamera.lookAt(new THREE.Vector3());

    // have perpective mimic ortho camera for now
    this.threejs.cameraManager.setupOrbitMockOrtho();

    this.canAnimate = false;

    // TODO Below are mostly testing codes for now
    // materials for testing
    let mat1 = new THREE.MeshNormalMaterial({ opacity: .1 });
    let mat = new THREE.MeshLambertMaterial({
      shading: THREE.FlatShading,
      color: 0x2C97DE,
      opacity: .8,
      transparent: true,
      // single side only
      side: THREE.FrontSide,	// doubleSide ? THREE.DoubleSide :
      wireframe: false,
      wireframeLinewidth: 1
    });

    let shapeModel = ShapeModelFactory.create(1, this.threejs.sceneManager.activeScene);
    let size = Utils.feetToInches(10);
    let num2ds = [[0, 0], [0, size], [size, size], [size, 0]];
    let point2ds = ShapeUtils.parseNum2dsToPoint2ds(num2ds);
    shapeModel.setPoint2ds(point2ds);
    shapeModel.draw();
    /*
    let shapeGeo = ShapeMaker.create2dShapeFromNum2ds(Shape2dTemplates.square);
    // rotate the shape to face ground
    ShapeUtils.faceDown(shapeGeo);

    let shapeMesh = new THREE.Mesh(shapeGeo, mat);
    shapeMesh.position.y += .5;
    this.threejs.sceneManager.add(shapeMesh);
    */

  }

  playAnimation(): void {
    if (this.canAnimate) {
      if (this.mesh) {
        this.mesh.rotation.y += 0.005;
      }
    }
  }
}

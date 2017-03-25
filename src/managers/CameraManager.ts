import * as THREE from 'three';

// --- THREEJS plugins ---
// leave this example here for if pulling javascript module from npm
// declare var require: any;
// let OrbitControls = require('three-orbit-controls')(THREE);

// if you're able to convert the example/js into typescript module
// this is how you import your custom typescript module wrapper
import OrbitControlsFactory from '../plugins/three-orbit-controls';
let OrbitControls = OrbitControlsFactory(THREE);
// -- end of THREEJS plugins

import { BaseManager } from './index';
import { CameraFactory } from '../cameras/index';
import { CameraType, CameraConfig, ViewType } from '../index';

export class CameraManager extends BaseManager {

  cameras: any[];
  activeCamera: THREE.PerspectiveCamera | THREE.OrthographicCamera;
  activeCameraType: CameraType;
  perspectiveCamera: THREE.PerspectiveCamera;
  orthoCamera: THREE.OrthographicCamera;
  cameraFactory: CameraFactory;

  // controls
  orbitControl: THREE.OrbitControls; // THREE.OrbitControls;

  /**
   * [constructor description]
   * @param {THREE.WebGLRenderer} renderer        req for orbit controls. Currently only supports WebGL
   * @param {HTMLElement}         canvasContainer
   * @param {number}              canvasWidth
   * @param {number}              canvasHeight
   */
  constructor(private renderer: THREE.WebGLRenderer,
    private canvasContainer: HTMLElement,
    private canvasWidth: number,
    private canvasHeight: number) {
    super();
    this.init();
  }

  init(): void {
    this.setupPerspectiveCamera();  // for now default is perspective
  }

  // if the canvas has been updated in size, we need to update the camera projection aspect
  updateActiveCameraProjection(latestCanvasWidth: number, latestCanvasHeight: number): void {
    if (this.activeCameraType === CameraType.PERSPECTIVE) {
      // if we want to lock the height to a const
      // this.perspectiveCamera.aspect = this.canvasContainer.offsetWidth / this.cameraHeight;
      this.perspectiveCamera.aspect = latestCanvasWidth / latestCanvasHeight;
      this.perspectiveCamera.updateProjectionMatrix();
    } else if (this.activeCameraType === CameraType.ORTHO) {
      // do ortho camera updates
    }
  }

  /**
   * ViewType dictates what camera should be used.
   * @param {string} viewType [description]
   */
  switchView(viewType: string | ViewType): void {

    /*
    if(typeof viewType === "string"){
      switch(viewType){
        case "2d":
          this.viewType = ViewType.TOP;
        default:
          this.viewType = ViewType.PERSPECTIVE;
      }
    }else if(typeof viewType === 'ViewType'){
      this.viewType = viewType;
    }

    //reasign camera base on viewType
    this.camera = this.viewType == ViewType.TOP ? this.cameraOrtho : this.cameraPerspective;
    */
  }

  switchToCamera(): void {

  }

  toggleCamera(): void {

  }

  // TODO
  getPerspectiveCamera(): THREE.PerspectiveCamera {
    return null;
  }

  setupPerspectiveCamera(): void {
    this.activeCameraType = CameraType.PERSPECTIVE;
    this.cameraFactory = new CameraFactory(this.canvasWidth, this.canvasHeight);
    this.perspectiveCamera = <THREE.PerspectiveCamera>this.cameraFactory.createCamera(CameraType.PERSPECTIVE, CameraConfig.DEFAULT);
    this.activeCamera = this.perspectiveCamera;

    this.orbitControl = new OrbitControls(this.activeCamera, this.renderer.domElement);

    // TODO don't like it here, find a better place
    this.setupOrbitDefault();
  }

  setupOrbitViewOnly(): void {
    // how far you can orbit vertically
    this.orbitControl.minPolarAngle = 0;
    this.orbitControl.maxPolarAngle = Math.PI;

    // How far you can dolly in and out ( PerspectiveCamera only )
    this.orbitControl.minDistance = 50;
    this.orbitControl.maxDistance = 300;

    this.orbitControl.enableZoom = false; // Set to false to disable zooming
    this.orbitControl.zoomSpeed = 1.0;

    this.orbitControl.enableRotate = false;

    // allow keyboard arrows
    this.orbitControl.enableKeys = false;

    // Set to false to disable panning (ie vertical and horizontal translations)
    this.orbitControl.enablePan = false;
  }

  setupOrbitDefault(): void {

    // how far you can orbit vertically
    this.orbitControl.minPolarAngle = 0;
    this.orbitControl.maxPolarAngle = Math.PI;

    // How far you can dolly in and out ( PerspectiveCamera only )
    this.orbitControl.minDistance = 0;
    this.orbitControl.maxDistance = Infinity;

    this.orbitControl.enableZoom = true; // Set to false to disable zooming
    this.orbitControl.zoomSpeed = 1.0;

    this.orbitControl.enableRotate = true;

    // allow keyboard arrows
    this.orbitControl.enableKeys = true;

    // Set to false to disable panning (ie vertical and horizontal translations)
    this.orbitControl.enablePan = true;
  }

  setupOrbitMockOrtho(): void {
    // how far you can orbit vertically
    this.orbitControl.minPolarAngle = 0;
    this.orbitControl.maxPolarAngle = Math.PI;

    // How far you can dolly in and out ( PerspectiveCamera only )
    this.orbitControl.minDistance = 100;
    this.orbitControl.maxDistance = 1500;

    this.orbitControl.enableZoom = true; // Set to false to disable zooming
    this.orbitControl.zoomSpeed = 1.0;

    this.orbitControl.enableRotate = false;

    // allow keyboard arrows
    this.orbitControl.enableKeys = false;

    // Set to false to disable panning (ie vertical and horizontal translations)
    this.orbitControl.enablePan = true;
  }

}

// exports all the modules here
// This modules depends on ThreeJS .r84 and up
import * as THREE from 'three';

import {
  BaseManager,
  SceneManager,
  RenderManager,
  CameraManager,
  UIManager,
  LightingManager
} from './managers';

// canvases
import {
  CanvasFactory,
  DisplayCanvas,
  Design3dCanvas,
  Design2dCanvas,
  EmptyCanvas,
  Final3dCanvas
 } from './canvases';

import {
  SceneType,
  ShapeType3D,
  RendererType,
  RenderSetting,
  ViewType,
  CameraType,
  CanvasType,
  Utils
} from './';

import { ShapeModelFactory } from './shape';

// The root entry to display and manipulate 3d
export class Threejs {

  // dynamically gets updated accordingly to its parent dom element
  canvasWidth: number;

  // controls
  isInit: boolean;
  canRender: boolean;
  allowAnimation: boolean = true;

  // managers
  sceneManager: SceneManager;
  renderManager: RenderManager;
  cameraManager: CameraManager;
  lightingManager: LightingManager;
  uiManager: UIManager;

  // the selected displayCanvas should link to this for driving its animation
  displayCanvas: DisplayCanvas;

  // holds all objects that have animation
  animationGroups: THREE.Group[];

  // testing
  mesh: THREE.Mesh;

	/**
   *
   * @param canvas
   * @param canvasHeight
   * @param canvasType
   */
  constructor(private canvasContainer: HTMLElement, private canvasHeight: number, private canvasType: CanvasType) {
    if (this.canvasContainer != null) {
      this.init();
    } else {
      console.warn('threejs failed to init canvasContainer is null');
    }
  }

  private init(): void {
    this.canvasWidth = this.canvasContainer.offsetWidth;

    // init all the core managers
    // some managers may create objects into the scene on init
    // some managers init without creating objects into the scene
    // each manager manages its own object that it puts into the scene
    // ex. lightingManager will handle all lights

    // scene
    this.sceneManager = new SceneManager(SceneType.DEFAULT);
    let scene = this.sceneManager.activeScene;

    // renderer
    this.renderManager = new RenderManager(RendererType.WEBGL, this.canvasContainer, this.canvasWidth, this.canvasHeight);
    let renderer = this.renderManager.renderer;

    // camera
    this.cameraManager = new CameraManager(renderer, this.canvasContainer, this.canvasWidth, this.canvasHeight);
    let camera = this.cameraManager.activeCamera;

    // ui
    this.uiManager = new UIManager(scene, camera, this.canvasContainer);

    // lighting
    this.lightingManager = new LightingManager(scene);

    // canvsaType determines what canvas to fire up
    // all canvases gets access to all managers by passing 'this' threejs into them
    this.displayCanvas = CanvasFactory.get(this.canvasType, this);

    // Start the render loop
    if (this.validateInit()) {
      this.render();
    }

    // This is really the end of the overall threejs flow
    // Everything threejs related should happen before this line
  }

  private validateInit(): boolean {
    if (this.sceneManager != null && this.renderManager != null && this.cameraManager != null) {
      this.isInit = true;
      this.canRender = true;
      return true;
    }
    console.warn("init validation failed");
    return false;
  }

	/**
	 * This method is the foundation of all animation in threejs.
   * Turn it off here, and it overrides all animation to stop completely.
   * Recommendation for handling each canvases' animation, is to turn it off within each canvases instead,
   * so do not put further logics in this method unless neccessary for improvement of the overall framework.
   * The method recursively calls itself infinitely based on frames per second (FPS) once it is called.
   * The FPS however, depends on many factors: complexity of the scene, animation complexity, computer hardware, etc.
	 */
  private render(): void {
    if (this.canRender) {

      // allows any canvases to control its own animation at will
      if (this.allowAnimation) {
        if (this.displayCanvas) {
          this.displayCanvas.playAnimation();
        }
      }

      // always update the renderer per frame
      this.renderManager.render(this.sceneManager.activeScene, this.cameraManager.activeCamera);

      // recursive call to itself
      requestAnimationFrame(() => this.render());

    }
  }

	/**
	 * Any time the dom (encapsulting the threejs canvas) updates,
	 * this method should be called upon to sync up the aspect ratio of the camera.
	 * Skewed perspective is a sign that the camera aspect ratio is different from the canvas width/height
	 * @param {number} width  [description]
	 * @param {number} height [description]
	 */
  resize(width?: number, height?: number): void {
    // lock height, since we don't want the canvas to grow in height in most cases

    // TODO logic should be dependent on the active camera which can be accessed through cameraManager
    if (this.cameraManager.activeCameraType === CameraType.PERSPECTIVE) {
      this.renderManager.resize(this.canvasContainer.offsetWidth, this.canvasHeight);

      if (width != null && height != null) {
        this.cameraManager.updateActiveCameraProjection(width, height);
      } else {
        this.cameraManager.updateActiveCameraProjection(this.canvasContainer.offsetWidth, this.canvasHeight);
      }
    } else if (this.cameraManager.activeCameraType === CameraType.ORTHO) {
      // we may need a diff setup for ortho
      console.warn("ortho resizing not set");
    }
  }
}

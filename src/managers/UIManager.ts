import * as THREE from 'three';

import { BaseManager, SceneManager, CameraManager } from './index';
import { Grid, Raycaster } from '../ui/index';

export class UIManager extends BaseManager {

  grid: Grid;
  axisHelper: THREE.AxisHelper;
  raycaster: Raycaster;

  /**
   * Handles managing UI interaction on the 3d canvas such as Grid, Axis, Raycasting, etc.
   * @param scene   the active scene
   * @param camera  the active camera in the current scene
   * @param canvas
   */
  constructor(private scene: THREE.Scene, private camera: THREE.Camera, private canvas: HTMLElement) {
    super();
  }

  /**
   * The grid is contructed to work off inches as the smallest unit.
   * It interprets 1 square = 1 feet = 12 inches.
   * Should you want 1 square to represent 2ft, 4ft, etc, use the third param.
   * @param {string} gridFacing [description]
   * @param {number} sizeInFeet multiples of 4 only and has to be >= 16
   * @param {number} spacing    default is 1 space = 1 feet. 2 is allowed and any value higher than 2 should be multiples of 4.
   */
  createGrid(gridFacing: string, sizeInFeet: number, spacing?: number): void {
    this.grid = new Grid(gridFacing, sizeInFeet, spacing);
    this.scene.add(this.grid.obj3d);
  }

  // tslint:disable-next-line:curly
  showGrid(): void { if (this.grid) this.grid.show(); else console.log("no grid available"); }
  // tslint:disable-next-line:curly
  hideGrid(): void { if (this.grid != null) this.grid.hide(); else console.log("no grid available"); }

  createAxis(size: number): void {
    if (!this.axisHelper) {
      this.axisHelper = new THREE.AxisHelper(size);
      this.scene.add(this.axisHelper);
    }
  }

  // tslint:disable-next-line:curly
  showAxis(): void { if (!this.axisHelper) this.axisHelper.visible = true; }
  // tslint:disable-next-line:curly
  hideAxis(): void { if (this.axisHelper) this.axisHelper.visible = false; }

  /**
   * There may be a difference in the coordinates depending on what camera is in use in the scene.
   * Until we verify if there's a difference or not, let's keep the two cameras in separate codes.
   */
  createRaycaster(): void {
    let perspectiveCamera: THREE.PerspectiveCamera;
    let orthoCamera: THREE.OrthographicCamera;

    if (this.camera != null) {
      if (this.camera instanceof THREE.PerspectiveCamera) {
        perspectiveCamera = <THREE.PerspectiveCamera>this.camera;
        this.raycaster = new Raycaster(this.canvas, perspectiveCamera, this.scene);
        this.canvas.addEventListener('mousedown', this.raycaster.onClick, false);
      } else if (this.camera instanceof THREE.OrthographicCamera) {
        orthoCamera = <THREE.OrthographicCamera>this.camera;
        this.raycaster = new Raycaster(this.canvas, orthoCamera, this.scene);
        this.canvas.addEventListener('mousedown', this.raycaster.onClick, false);
      }
    } else {
      console.warn('Raycast failed to init');
    }
  }

  enableRaycaster(): void {
    this.raycaster.enable();
  }

  disableRaycaster(): void {
    this.raycaster.disable();
  }

}

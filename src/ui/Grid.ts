import * as THREE from 'three';

import { Utils } from '../index';

/**
 * This is a wrapper class around the actual THREE.GridHelper class.
 * Reason so is to make the grid more friendlier to setup. Contraints are put into place for easier use.
 * Otherwise if you wish to use the Three.GridHelper directly feel free.
 */
export class Grid {


  obj3d: THREE.GridHelper;

  /**
   * The grid is contructed to work off inches as the smallest unit.
   * It interprets 1 square = 1 feet = 12 inches.
   * Should you want 1 square to represent 2ft or 4ft, pass in 2 or 4 or a # multiple of 4.
   * @param gridOrientation 'front' or 'top' - the grid can be facing front to back or from top to bottom
   * @param sizeInFeet      multiples of 4 only and has to be >= 16
   * @param gridSpacing     optional with default as 1 space = 1 feet. Use even numbers >= 2.
   */
  constructor(public gridOrientation: string, private sizeInFeet: number, private gridSpacing?: number) {
    if (this.obj3d == null) {

      // 16 is the loweset it can go anything higher must be multiples of 4
      // this prevention allows for grid to have center line exactly in the middle
      let gridSizeInFeet = (sizeInFeet >= 16) && (sizeInFeet % 4 === 0) ? sizeInFeet : 16;  // only do powers of 4??? 4, 16, 32, etc...

      let centerLineColor = Utils.getColor('red');
      let gridLineColor = Utils.getColor('white');

      // represents the length and width of the overall grid size
      let gridSizeInInch = Utils.feetToInches(gridSizeInFeet);

      let division = gridSizeInInch / 12; // every 12 inch is a line

      // if custom spacing is provided
      if (gridSpacing != null) {
        // multiples of 2 only or defaults to no custom spacing
        division /= (gridSpacing >= 2 && gridSpacing % 2 === 0) ? gridSpacing : 1;
      }

      this.createGrid(gridOrientation, gridSizeInInch, division, centerLineColor, gridLineColor);
    } else {
      this.obj3d.visible = true;
      // Utils.rotateMesh(grid, 90, 90, 0);
    }
  }

  show(): void {
    if (this.obj3d) {
      this.obj3d.visible = true;
    }
  }

  hide(): void {
    if (this.obj3d) {
      this.obj3d.visible = false;
    }
  }

  /**
   * creates the grid
   * @param {string} axis            default is top : top or front
   * @param {number} gridSizeInInch  size in inch
   * @param {number} lines           the number of dvisions
   * @param {number} centerLineColor hex number
   * @param {number} gridColor       hex number
   */
  private createGrid(axis: string, gridSizeInInch: number, division: number, centerLineColor: number, gridColor: number): void {
    if (gridSizeInInch && division) {

      let grid: THREE.GridHelper;
      // grid xz
      if (axis === 'top') {
        grid = new THREE.GridHelper(gridSizeInInch, division, centerLineColor, gridColor);

      // grid yx
      }else if (axis === 'front') {
        grid = new THREE.GridHelper(gridSizeInInch, division, centerLineColor, gridColor);
        // rotate to get the yx look
        Utils.rotateMesh(grid, 90, 90, 0);
      }

      this.obj3d = grid;
    } else {
      console.warn('Params req. not met. Grid failed to be added');
    }
  }
}

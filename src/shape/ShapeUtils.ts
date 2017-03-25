import * as THREE from 'three';

import { Point2d, Shape2d } from '../shape/index';

export module ShapeUtils {

  /**
   * Parse string into point2d array.
   * @param  {string}    str example `[ [0,0],[1,1] ]`
   * @return {Point2d[]}     [description]
   */
  export function parseStrToPoint2ds(str: string): Point2d[] {
    try {
      let num2dArray: Array<number>[] = JSON.parse(str);
      let points2d: Point2d[] = [];
      for (let point of num2dArray) {
        points2d.push(new Point2d(point[0], point[1]));
      }
      return points2d;
    } catch (e) {
      console.error("string to point2d parsing errored out");
    }
    return null;
  }

  export function parseNum2dsToPoint2ds(num2ds: Array<number>[]): Point2d[] {
    let point2ds: Point2d[] = [];
    for (let point of num2ds) {
      point2ds.push(new Point2d(point[0], point[1]));
    }
    return point2ds;
  }

  /**
   * Parse string to vector2d arrays
   * @param  {string}          str example `[ [0,0],[1,1] ]`
   * @return {THREE.Vector2[]}                 the three vector2 array
   */
  export function parseStrToVector2s(str: string): THREE.Vector2[] {
    try {
      let point2ds: Point2d[] = parseStrToPoint2ds(str);
      return parsePoint2dsToVector2s(point2ds);
    } catch (e) {
      console.error("error parsing string array");
      return null;
    }
  }

  export function parsePoint2dsToVector2s(point2ds: Point2d[]): THREE.Vector2[] {
    try {
      let shape2d: Shape2d = new Shape2d(point2ds);
      return shape2d.getVector2Points();
    } catch (e) {
      console.error("error parsing point2d array");
      return null;
    }
  }

  /**
   * Parse 2d number array to Vector2 arrays.
   * @param  {Array<number>[]} numArr example [ [0,0], [1,1] ]
   * @return {THREE.Vector2[]}        [description]
   */
  export function parseNum2dsToVector2s(num2ds: Array<number>[]): THREE.Vector2[] {
    try {
      let point2ds: Point2d[] = [];
      for (let point of num2ds) {
        point2ds.push(new Point2d(point[0], point[1]));
      }
      return new Shape2d(point2ds).getVector2Points();
    } catch (e) {
      console.error("error parsing num2d array");
      return null;
    }
  }

  /**
   * returns width in inches
   * @param mesh
   */
  export function getWidth(mesh: any): number {
    if (mesh.geometry.boundingBox == null) {
      mesh.geometry.computeBoundingBox();
    }
    let box = mesh.geometry.boundingBox;
    let width = box.max.x - box.min.x;
    return width;
  }

  /**
   * returns height in inches
   * @param mesh
   */
  export function getHeight(mesh: any): number {
    if (mesh.geometry.boundingBox == null) {
      mesh.geometry.computeBoundingBox();
    }
    let box = mesh.geometry.boundingBox;
    let height = box.max.y - box.min.y;
    return height;
  }

  /**
   * returns depth in inches
   * @param mesh
   */
  export function getDepth(mesh: any): number {
    if (mesh.geometry.boundingBox == null) {
      mesh.geometry.computeBoundingBox();
    }
    let box = mesh.geometry.boundingBox;
    let depth = box.max.z - box.min.z;
    return depth;
  }

  /**
   * By default when reading XY coordinates and drawing them into the scene
   * they are created on the XY facing direction.
   * If you want them facing in parallel to the ground XZ, you need to rotate them -90.
   * This method helps perform that.
   * @param shape the shapeGeometry you want to rotate to be facing downward
   */
  export function faceDown(shape: THREE.ShapeGeometry): void {
    // rotate to be facing top/down
    this.rotateMesh(shape, -90, 0, 0);
  }

  /**
   * Opposite of faceDown it rotates the planar object back to be front facing XY
   * @param shape
   */
  export function faceFront(shape: THREE.ShapeGeometry): void {
    // rotate to be facing top/down
    this.rotateMesh(shape, 90, 0, 0);
  }

  /**
   * Basic rotator for simple rotation use. Precise rotation should use quaternions for more advance rotation.
   * Old school rotation can be perform with obj.rotation.x = Math.PI/2;
   * @param obj
   * @param xDegree
   * @param yDegree
   * @param zDegree
   */
  export function rotateMesh(obj: THREE.Object3D | THREE.ShapeGeometry, xDegree: number, yDegree: number, zDegree: number): void {
    obj.rotateX(THREE.Math.degToRad(xDegree));
    obj.rotateY(THREE.Math.degToRad(yDegree));
    obj.rotateZ(THREE.Math.degToRad(zDegree));
  }

  /**
   * Returns XY coordinates representation of the 2d shapeGeometry
   * To avoid getting XZ coordinates pass in the appropriate boolean as 2nd param
   * Current use is for extracting XY coordinates for shape model
   * @param shape
   * @param fromFacingTopDown if shape is facing down set use true. If facing front set to false.
   */
  export function getXYCoordinatesFrom2dShapeGeometry(shape: THREE.ShapeGeometry, facingDown: boolean): Point2d[] {
    let vertices: number[][] = [];
    let point2ds: Point2d[] = [];
    let vector3s: THREE.Vector3[] = [];

    // TODO all 2d shape should always be stored in XY
    // when drawn it's 2d geometry will in XZ
    // if the shape is top/down facing XZ, rotate it 90 to front facing XY
    if (facingDown) {
      ShapeUtils.rotateMesh(shape, 90, 0, 0);
    }

    // collect the x,y after rotating it in xy facing
    for (let vec of shape.vertices) {
      let point2d = new Point2d(vec.x, vec.y);
      point2ds.push(point2d);
    }

    return point2ds;
  }

}

import * as THREE from 'three';
import { ShapeUtils, Point2d, Shape2d } from './index';
import { Utils } from '../index';
/**
 * Creates 2d and 3d shapes for now.
 * By default 2D shapes are created facing front to back.
 * However, we rotate the 2dshape -90 to be top down after creation.
 */
export module ShapeMaker {

  export function create2dShapeFromPoint2ds(point2ds: Point2d[]): THREE.ShapeGeometry {
    if (point2ds != null) {
      let shape2d = new Shape2d(point2ds);
      let shape = new THREE.Shape(shape2d.getVector2Points());
      let shapeGeo = new THREE.ShapeGeometry(shape);

      return shapeGeo;
    }
    console.error("point2ds is null");
  };

  export function create2dShapeFromString(str: string): THREE.ShapeGeometry {
    if (str != null) {
      let shape = new THREE.Shape(ShapeUtils.parseStrToVector2s(str));
      let shapeGeo = new THREE.ShapeGeometry(shape);

      return shapeGeo;
    }
  };

  export function create2dShapeFromVector2s(vector2s: THREE.Vector2[]): THREE.ShapeGeometry {
    // if(vector2s instanceof THREE.Vector2){
    let shape = new THREE.Shape(vector2s);
    let shapeGeo = new THREE.ShapeGeometry(shape);

    return shapeGeo;
    // }
  }

  export function create2dShapeFromNum2ds(num2ds: number[][]): THREE.ShapeGeometry {
    // array of numbers
    // if(typeof vec2Ds === 'array' && typeof vec2Ds[0] === 'number'){
    let shape = new THREE.Shape(ShapeUtils.parseNum2dsToVector2s(num2ds));
    let shapeGeo = new THREE.ShapeGeometry(shape);

    return shapeGeo;
    // }
  }

  // TODO refactor this method calls other method base on param
  /**
   * Creates a THREE.Shape from arrays. A THREE.Shape  is usually a 2d shape.
   * @param  {THREE.Vector2[]  | Array<number> | string} vec2Ds [description]
   * @return {THREE.ShapeGeometry}   [description]
   */
  /*
  export function create2dShape(vec2Ds: THREE.Vector2[] | Point2d[] | string):THREE.ShapeGeometry{

    if(vec2Ds != null){

      //json string
      if(typeof vec2Ds === 'string'){
        let shape = new THREE.Shape(ShapeUtils.parseStrToVector2s(vec2Ds));
        return new THREE.ShapeGeometry(shape);
      }

      let minimumLength = 3;
      if(vec2Ds.length >= minimumLength){

        //array of vector2s
        if(vec2Ds[0] instanceof THREE.Vector2){
          let shape = new THREE.Shape(vec2Ds as THREE.Vector2[]);
          return new THREE.ShapeGeometry(shape);
        }

        //array of point2ds
        if(vec2Ds[0] instanceof Point2d){
          let shape2d = new Shape2d(vec2Ds);
          let shape = new THREE.Shape(shape2d.getVector2Points());
          return new THREE.ShapeGeometry(shape);
        }

        //array of numbers
        if(typeof vec2Ds === 'array' && typeof vec2Ds[0] === 'number'){
          let shape = new THREE.Shape(ShapeUtils.parseNum2dsToVector2s(vec2Ds));
          return new THREE.ShapeGeometry(shape);
        }

      }

      console.error("Failed to create 2d shape, min length required, returning null");
      return null;

    }

    console.warn("Returning null as vec2Ds is: " + vec2Ds);
    return null;
  }
  */

}

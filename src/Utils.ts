import * as THREE from 'three';

export module Utils {

  /**
   * Feet to inch conversion
   * @param  {number} feet   the feet unit to convert
   * @return {number}        inch(es) converted from feet
   */
  export function feetToInches(feet: number): number {
    return feet * 12;
  }

  /**
   * Inch to feet conversion
   * @param  {number} inches   the inch unit to convert
   * @return {number}          feet(s) converted from inch
   */
  export function inchesToFeet(inches: number): number {
    return inches / 12;
  }

  /**
   * Get hex number of color. This helps us use the same colors througout.
   * All colors should be input into here and be called from here.
   * @param  {string} name [description]
   * @return {number}      [description]
   */
  export function getColor(name: string): number {
    let colorMap = {
      red: 0xf25346,
      white: 0xd8d0d1,
      brown: 0x59332e,
      pink: 0xF5986E,
      brownDark: 0x23190f,
      blue: 0x68c3c0,
      yellow: 0xefe823,
      darkGrey: 0x2d2d2d,
      black: 0x000000,
      lightGrey: 0xe3e4e5
    };

    if (colorMap[name] != null) {
      return colorMap[name];
    }

    console.warn('Color ' + name + ' not available, Returning color red instead');
    return 0xf25346;
  }

  /**
   * Helps rotate a mesh using degrees
   * @param {THREE.Mesh} obj     [description]
   * @param {number}     xDegree [description]
   * @param {number}     yDegree [description]
   * @param {number}     zDegree [description]
   */
  export function rotateMesh(obj: THREE.Object3D, xDegree: number, yDegree: number, zDegree: number): void {
    obj.rotateX(THREE.Math.degToRad(xDegree));
    obj.rotateY(THREE.Math.degToRad(yDegree));
    obj.rotateZ(THREE.Math.degToRad(zDegree));
    /*
    old school way, still works
    obj.rotation.x = Math.PI/3; radian value
    obj.rotation.y = Math.PI/2;
    obj.rotation.z = Math.PI/4;
    */
  }
}

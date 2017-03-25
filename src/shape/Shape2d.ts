import * as THREE from 'three';
import { Point2d } from './index';

export class Shape2d {

  constructor(public points: Point2d[]) {}

  public getVector2Points(): THREE.Vector2[] {
    let vector2Points: THREE.Vector2[] = [];

    for (let i = 0; i < this.points.length; i++) {
      vector2Points.push(new THREE.Vector2(this.points[i].x, this.points[i].y));
    }

    return vector2Points;
  }
}

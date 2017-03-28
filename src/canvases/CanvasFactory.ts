import { CanvasType, Threejs } from '../index';

import {
  DisplayCanvas,
  Design3dCanvas,
  Design2dCanvas,
  Final3dCanvas,
  EmptyCanvas
} from './index';

export module CanvasFactory {

  export function get(canvasType: CanvasType, threejs: Threejs): DisplayCanvas {
    // tslint:disable-next-line:one-line
    switch (canvasType){
      case CanvasType.EMPTY:
        return new EmptyCanvas(threejs);
      case CanvasType.DESIGN_2D:
        return new Design2dCanvas(threejs);
      case CanvasType.DESIGN_3D:
        return new Design3dCanvas(threejs);
      case CanvasType.FINAL_3D:
        return new Final3dCanvas(threejs);
      default:
        return null;
    }
  }
}

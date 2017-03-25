import { CanvasType, Threejs } from '../index';

import {
  DisplayCanvas,
  DeckDesign3dCanvas,
  DeckDesign2dCanvas,
  DeckFinal3dCanvas,
  DeckLandingPageCanvas,
  DeckLevelHeightCanvas,
  DeckProductSelectCanvas,
  LandscapeLandingPageCanvas,
} from './index';

export module CanvasFactory {

  export function get(canvasType: CanvasType, threejs: Threejs): DisplayCanvas {
    // tslint:disable-next-line:one-line
    switch (canvasType){
      case CanvasType.DECK_LANDING_PAGE:
        return new DeckLandingPageCanvas(threejs);
      case CanvasType.DECK_DESIGN_2D:
        return new DeckDesign2dCanvas(threejs);
      case CanvasType.DECK_DESIGN_3D:
        return new DeckDesign3dCanvas(threejs);
      case CanvasType.DECK_FINAL_3D:
        return new DeckFinal3dCanvas(threejs);
      case CanvasType.DECK_LEVEL_HEIGHT:
        return new DeckLevelHeightCanvas(threejs);
      case CanvasType.DECK_PRODUCT_SELECT:
        return new DeckProductSelectCanvas(threejs);
      case CanvasType.LANDSCAPE_LANDING_PAGE:
        return new LandscapeLandingPageCanvas(threejs);
      default:
        return null;
    }
  }
}

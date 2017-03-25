import * as THREE from 'three';

import { Threejs, RenderSetting, Utils } from '../index';
import { DisplayCanvas } from './index';
import { ShapeMaker, Shape2dTemplates } from '../shape/index';

export class LandscapeLandingPageCanvas implements DisplayCanvas {

  canAnimate: boolean;

  constructor(private threejs: Threejs) {
    this.init();
  }

  init(): void {

  }

  playAnimation(): void {

  }
}

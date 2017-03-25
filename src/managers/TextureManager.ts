import * as THREE from 'three';

import { BaseManager } from './index';

export class TextureManager extends BaseManager {

  // simple list cacher
  materialCacher: THREE.Material[] = [];

  // TODO images can be represented in a few ways, will have to determine what format
  // we are caching images as
  // image: HTMLImageElement  // <img>
  // image: String            // www.domain.com/images/path/image.jpeg
  // image: File              // a file as from <input> element
  textureCacher: File[] = [];

  constructor() {
    super();
  }
}

import * as THREE from 'three';

import { SceneManager } from '../managers/index';

export class Raycaster {

  raycaster: THREE.Raycaster;
  mouse: THREE.Vector2 = new THREE.Vector2();
  isEnabled: boolean = true;

  constructor(private canvas: HTMLElement, private camera: THREE.PerspectiveCamera | THREE.OrthographicCamera, private scene: THREE.Scene) {
    this.raycaster = new THREE.Raycaster();
  }

/**
 *
 * @param e mousedown event from uiManager
 */
  onClick(e) {
    if (this.isEnabled) {
      /*
          e.clientX and e.ClientY are the mousedown coordinates. These need to have the offsetLeft and offsetTop values
          applied to them to compensate for margins and padding of the canvas's parent component, which will be styled
          with bootstrap. mouse.x and mouse.y are the normalized coordinates that threejs uses to create the
          raycaster. They will have values between -1 and +1. Formulas for calculating mouse.x and mouse.y are provided
          by threejs.
      */
      this.mouse.x = ((e.clientX - this.canvas.offsetLeft) / this.canvas.offsetWidth) * 2 - 1;
      this.mouse.y = - ((e.clientY - this.canvas.offsetTop) / this.canvas.offsetHeight) * 2 + 1;

      // the raycaster.setFromCamera method updates the ray with a new origin and direction based on the mousedown
      // location and the current camera position.
      this.raycaster.setFromCamera(this.mouse, this.camera);

      // intersects is an array of objects that the raycaster hits. intersects[0], the first element of the array,
      // will be the object the user has clicked on.
      let intersects = this.raycaster.intersectObjects(this.scene.children);
      if (intersects.length > 0 && intersects[0]) {
        console.log(`      Object pointX: ${intersects[0].point.x}, 
      Object pointY: ${intersects[0].point.y}, 
      Object pointZ: ${intersects[0].point.z}`);
      }
    }
  }

  enable() {
    this.isEnabled = true;
  }

  disable() {
    this.isEnabled = false;
  }
}

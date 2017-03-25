import * as THREE from 'three';

export module RendererUtils {
  export function setClearBG(renderer: THREE.WebGLRenderer) {
    renderer.setClearColor( 0x000000, 0);
  }
  export function setDarkBG(renderer: THREE.WebGLRenderer) {
    renderer.setClearColor( 0x000000, 1);
  }
  export function setWhiteBG(renderer: THREE.WebGLRenderer) {
    renderer.setClearColor( 0xffffff, 1);
  }
  export function setBackgroundColor(renderer: THREE.WebGLRenderer, hex: number) {
    renderer.setClearColor( hex, 1);
  }
}

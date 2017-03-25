import * as THREE from 'three';

// TODO how to import three modules
// import * as CSS3DRenderer from 'three/examples/js/renderers/CSS3DRenderer';
import { RendererType } from '../index';

export module RendererFactory {

  // returns a renderer for threejs
  export function createRenderer(rendererType: RendererType, width: number, height: number): any {

    if (rendererType === RendererType.WEBGL) {
      return createWebGL(width, height, false);
    } else if (rendererType === RendererType.CSS3D) {
      // return this.createCss3D(width, height);
      return null;
    }
  }

  function createWebGL(width: number, height: number, enableShadow: boolean) {
    // only 1 renderer can be crated
    if (width && height) {
      // transparent background use alpha=true
      let renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

      // default is off
      // note: only directional and spotlight are able to cast shadow
      if (enableShadow) {
        // shadows in three are just illusions, they don't reflect real world phsyics.
        // thus making shadows hard to master or tuned to get shadows right
        renderer.shadowMap.enabled = true;   // req for shadow enabling

        // shadow map type - optional
        // param:
        // THREE.BasicShadowMap = crisp shadow and is default
        // THREE.PCFShadowMap = med shadow
        // THREE.PCFSoftShadowMap = smooth shadow
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        // renderer.shadowMapSoft = false; //deprecated as of r50 use shadowMapType but default is false

        /* //if these are set in the light, don't set it on the renderer here
        renderer.shadowCameraNear = 3;
        renderer.shadowCameraFar = 500;//this.camera.far;
        renderer.shadowCameraFov = 50;

        renderer.shadowMapBias = 1;//0.0039;
        renderer.shadowMapDarkness = 0.5;
        renderer.shadowMapWidth = 1024;
        */
      }

      renderer.setSize(width, height);

      // Changing the background color
      // renderer.setClearColor(this.getColor('blue'));

      // black background
      renderer.setClearColor(0x000000, 1);   // using clear background color

      return renderer;
    }
    throw new Error("render failed");
  }

	/*
	private static createCss3D(width:number, height:number){
		var renderer = new THREE.CSS3DRenderer();
        renderer.setSize(width, height);
        renderer.domElement.style.position = 'absolute';
        renderer.domElement.style.top = "0";
        return renderer;
	}
	*/
}

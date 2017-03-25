import * as THREE from 'three';

import { BaseManager } from './BaseManager';

/**
 * Does book keeping of all lights that will be created and use.
 * That way we can reuse light and maintain lights better
 */
export class LightingManager extends BaseManager {

  private lights: THREE.Light[] = [];

  /**
   * this ensures every light has a unqiue name/id
   * the light index never resets and keeps incrementing for as long as threejs is alive
   * for each new light created, the index increments
   */
  private lightIndex: number;

  constructor(private scene: THREE.Scene) {
    super();
    this.init();
  }

  init(): void {
    // TODO we need a robust system to be able to setup different lighting systems
    // The goal is you tell the LightingManager what lighting setup you want, 
    // lightManager goes out to select from a set of presets, and your scene just magically gets lit.
    // ex. from anywhere once scene is setup you can just call
    // threejs.lightManager.setup(Lighting.BASIC);
    // but for now we are going to just hard code initial lighting here on manager init

    // TODO lightFactory once created, should handle creating lights for us
    this.createBasicLights();
  }

  createBasicLights(): void {
    // let pointLight = new THREE.PointLight(0xffffff);
    // pointLight.position.set(0, 100, 0);
    // pointLight.name = 'testLight';
    // pointLight.intensity = 1;
    // this.threejs.sceneManager.add(pointLight);

    // ambient light
    let ambientLight = new THREE.AmbientLight(0xdc8874, 1);
    ambientLight.name = 'ambientLight';
    this.addLight(ambientLight);

    // sunlight
    let dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(0, 500, 0);
    this.addLight(dirLight);
  }

  addLight(light: THREE.Light): void {
    light.name = light.name + '_' + this.lightIndex;
    this.lights.push(light);
    this.scene.add(light);
    this.lightIndex++;
  }

  /**
   * we don't destroy the objects in threejs, it will eventually destroy itself in garbage collection
   * if nothing else is referencing it
   * @param lightName
   */
  removeLight(lightName: string): void {
    let lightToRemove: THREE.Light;

    // search for the light
    let index = 0;
    for (let light of this.lights) {
      if (light.name === lightName) {
        lightToRemove = light;
        break;
      }
      index++;
    }

    // remove the light
    if (lightToRemove != null) {
      this.lights.splice(index, 1);     // remove from array
      this.scene.remove(lightToRemove); // remove from scene
    }

  }

  removeAllLights(): void {
    for (let light of this.lights) {
      this.scene.remove(light);
    }

    // fastest way to clear array if no other variable referenes this.lights
    this.lights = new Array<THREE.Light>();

    // 2nd fastest if you want to use the same array
    /*while (this.lights.length > 0) {
      this.lights.pop();
    }*/

  }




}

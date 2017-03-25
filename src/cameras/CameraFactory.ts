import * as THREE from 'three';

import { CameraType, CameraConfig, Utils } from '../index';
import { CameraSetting, PerspectiveCameraSetting, OrthoCameraSetting } from './index';

/**
 * Handles creating cameras with configs all in place
 */
export class CameraFactory {

  cameraSettings: CameraSetting[] = [];  // acts like a pool of settings

  /**
   *
   * @param width usually the same width as the canvas
   * @param height usually the same height as the canvas
   */
  constructor(private width: number, private height: number) {
    this.init();
  }

  private init() {
    // populate camera settings into a pool for later
    this.cameraSettings.push(this.createPerspectiveConfigDefault());
  }

  /**
   * Returns a camera
   * @param {CameraType}   cameraType the camera to return
   * @param {CameraConfig} config     the configs for the camera
   * @param {HTMLElement}  canvas     used to get the width and height aspect ratio
   */
  createCamera(cameraType: CameraType, cameraConfig: CameraConfig): THREE.Camera {
    if (cameraType === CameraType.PERSPECTIVE) {
      return this.createPerspectiveCamera(cameraConfig);
    } else if (cameraType === CameraType.ORTHO) {
      return this.createOrthoCamera(cameraConfig);
    }
    console.warn('No cameraType was found');
    return null;
  }

  /**
   * A camera has the ability to be created with different preset settings.
   * CameraConfig determines what preset the camera gets during creation.
   * @param  {CameraConfig}        configType [description]
   * @return {THREE.PerspectiveCamera}            [description]
   */
  private createPerspectiveCamera(cameraConfig: CameraConfig): THREE.PerspectiveCamera {
    let perspSetting: PerspectiveCameraSetting = this.getPerspectiveCameraSetting(cameraConfig);
    // create the camera
    let camera = new THREE.PerspectiveCamera(perspSetting.fov,
      perspSetting.aspectRatio,
      perspSetting.nearClip,
      perspSetting.farClip
    );

    // Really shouldn't be here. Temparory helps the camera from being created at xyz 0,0,0 and you see nothing.
    // Whowever creates the camera, should follow up by repositioning the camera.
    // camera.position.z = Utils.feetToInches(25);
    return camera;
  }

  // TODO fix correct params inside method for ortho creation
  private createOrthoCamera(cameraConfig: CameraConfig): THREE.OrthographicCamera {
    let left = 0;
    let right = 0;
    let top = 0;
    let bottom = 0;
    let near = 0;
    let far = 0;

    return new THREE.OrthographicCamera(left, right, top, bottom, near, far);
  }

  // performs a lookup, checks for perspective instance and configType, 
  // then returns the perpective config request
  private getPerspectiveCameraSetting(cameraConfig: CameraConfig): PerspectiveCameraSetting {
    for (let currentCameraSetting of this.cameraSettings){
      if (currentCameraSetting instanceof PerspectiveCameraSetting && currentCameraSetting.cameraConfig === cameraConfig) {
         return <PerspectiveCameraSetting>currentCameraSetting;
      }
    }
    console.warn('Could not find perspective camera setting preset returning null');
    return null;
  }

  // TODO the three functions below is to basicaly hint
  // that we need to refactor and put these function settings into a json
  // then serialize the json data into real objects and finally intot he cameraSettings list for lookup
  private createPerspectiveConfigDefault(): PerspectiveCameraSetting {
    let configType = CameraConfig.DEFAULT;
    let fov = 35;
    let aspectRatio = this.width / this.height;
    let near = Utils.feetToInches(1);   // nearest render distance
    let far = Utils.feetToInches(150);  // farthest rencder distance
    return new PerspectiveCameraSetting(configType, fov, aspectRatio, near, far);
  }

  // to give is an idea that we need to refactor these settings into a json
  // then serialize the settings into objects
  private createPerspectiveConfigWide(): PerspectiveCameraSetting {
    let configType = CameraConfig.WIDESHOT;
    let fov = 135;
    let aspectRatio = this.width / this.height;
    let near = Utils.feetToInches(1);   // nearest render distance
    let far = Utils.feetToInches(300);  // farthest rencder distance
    return new PerspectiveCameraSetting(configType, fov, aspectRatio, near, far);
  }

  // to give is an idea that we need to refactor these settings into a json
  // then serialize the settings into objects
  private createPerspectiveConfigMicro(): PerspectiveCameraSetting {
    let configType = CameraConfig.MICRO;
    let fov = 10;
    let aspectRatio = this.width / this.height;
    let near = Utils.feetToInches(1);   // nearest render distance
    let far = Utils.feetToInches(200);  // farthest rencder distance
    return new PerspectiveCameraSetting(configType, fov, aspectRatio, near, far);
  }

}

import * as THREE from 'three';

import { BaseManager } from './index';
import { SceneType, Utils } from '../index';
import { Grid, Raycaster } from '../ui/index';

/**
 * This class manages adding and removing objects from the scene
 */
export class SceneManager extends BaseManager {

  // future proof so we can handle mutliple scenes
  scenes: THREE.Scene[] = [];
  activeScene: THREE.Scene;

  constructor(sceneType: SceneType) {
    super();

    let scene = new THREE.Scene();
    this.activeScene = scene;
    this.scenes.push(scene);

    // what type of scene to init
    if (sceneType === SceneType.BASIC) {
      this.initBasic();
    } else if (sceneType === SceneType.DEFAULT) {
      this.initDefault();
    } else {
      console.warn("No sceneType was selected. App won't break but no scene settings will be loaded.");
    }
  }

  // a more plain view without much UI blocking the screen view
  private initBasic(): void {

  }

  // has more contents like grids and fps UI etc
  private initDefault(): void {
    // this.showGrid("front");
    // this.showAxis(Utils.fti(5));
  }

  // TODO add 3d objects into its scene with conditions
  add(obj): boolean {
    let success = true;
    try {
      this.activeScene.add(obj);
    } catch (e) {
      success = false;
      console.error(e);
    }
    return success;
  }

  // TODO remove from the scene
  remove(nameId: string) {

  }

  // if certain settings have been changed, run this update
  // not sure if needed yet...say multiple settings get updated,
  // then useful to just run one update to the scene
  /*
  updateOnce():void{

  }
  */
}

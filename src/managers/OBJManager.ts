import * as THREE from 'three';

import { BaseManager } from './index';
import { OBJFactory } from '../obj/OBJFactory';

// TODO
// can be refactor into the OBJFactory
import OBJLoaderFactory from '../plugins/three-obj-loader';
let OBJLoader = OBJLoaderFactory(THREE);

/**
 * Handles loading all external obj or 3d files and keeps an instance of them.
 * This manager prevents unnecessary external calls for obj(s) already loaded.
 */
export class OBJManager extends BaseManager {

  // keeps one instance of each unique geometry/mesh for reusability
  geos: THREE.Geometry[] = [];
  meshes: THREE.Mesh[] = [];
  objLoader: OBJLoader;

  constructor() {
    super();
    this.objLoader = new OBJLoader(null); // we won't create our own loading manager so we pass in null
  }

  /**
   * Returns a clone if found
   * @param geometryId
   */
  getObjById(geometryId: number): THREE.Geometry {
    for (let geo of this.geos) {
      if (geo.id === geometryId) { return geo.clone(); }
    }
    return null;
  }

  /**
   * Returns a clone if found
   * @param geometryName
   */
  getObjByName(geometryName: string): THREE.Geometry {
    for (let geo of this.geos) {
      if (geo.name === geometryName) { return geo.clone(); }
    }
    return null;
  }

  /**
   * Before loading a file externally, checks first if there's an instance it can clone
   * and returns it instead. If not found, goes out to load and create the obj.
   * @param filePath
   * @param id
   */
  loadObj(filePath: string, id: string | number): THREE.Geometry {
    let geo: THREE.Geometry;

    // first check there's an instance already, if so return it
    if (typeof id === 'number') {
      geo = this.getObjById(id);
      if (geo) { return geo; }
    } else if (typeof id === 'string') {
      geo = this.getObjByName(id);
      if (geo) { return geo; }
    }

    // TODO not complete yet
    // else load the file externally
    geo = OBJFactory.get(filePath);
    if (geo != null) {
      if (typeof id === 'number') { geo.id = id; }
      if (typeof id === 'string') { geo.name = id; }
      this.geos.push(geo);  // book keeping
      return geo.clone();
    }

    return null;
  }
}

import { CameraSetting } from './index';
import { CameraConfig } from '../index';

/**
 * Purpose of this class is to hold different instances of ortho camera configurations.
 */
export class OrthoCameraSetting implements CameraSetting {

  // TODO ortho camera has more configurations params that have yet to be visited
  constructor(public cameraConfig: CameraConfig,
    public fov: number,
    public aspectRatio: number,
    public nearClip: number,
    public farClip: number) {
  }
}

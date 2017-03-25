import { CameraSetting } from './index';
import { CameraConfig } from '../index';

/**
 * Purpose of this class is to hold different instances of prespective camera configurations.
 */
export class PerspectiveCameraSetting implements CameraSetting {
  constructor(public cameraConfig: CameraConfig,
    public fov: number,
    public aspectRatio: number,
    public nearClip: number,
    public farClip: number) {
  }
}

import {CameraConfig} from '../index';
/**
 * Enables storing multiple camera settings and reusing.
 */
export interface CameraSetting {
  // NOT sure if we want to lock all configs to require this
  cameraConfig: CameraConfig;
}

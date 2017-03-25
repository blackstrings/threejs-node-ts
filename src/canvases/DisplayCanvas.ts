/**
 *  All canvases should implement DisplayCanvas for animation purposes.
 *
 */
export interface DisplayCanvas {
  canAnimate: boolean;
  playAnimation(): void;
}

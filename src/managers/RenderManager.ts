import * as THREE from 'three';

import { BaseManager } from './index';
import { RenderSetting, RendererType } from '../index';
import { RendererFactory } from '../renderer/RendererFactory';
import { RendererUtils } from '../renderer/RendererUtils';

/**
 * Handles what renderer to use. A renderer controls the overall shading and lighting look and feel
 */
export class RenderManager extends BaseManager {

  isInit: boolean = false;

  // enables us to have multiple preset settings to choose from
  renderSetting: RenderSetting;

  // currently we use only the WebGLRenderer, any other future renderer will need it's own setup
  renderer: THREE.WebGLRenderer;

  /**
   * Render manager requires that a dom element is provided at the very least.
   * However all params are needed to make it work correctly with our setup.
   * @param {RendererType}  rendererType    what renderer to create
   * @param {HTMLElement}   canvasContainer the dom element which the renderer will sit within
   * @param {number}        canvasWidth     how far to render horizontally
   * @param {number}        canvasHeight    how far to render vertically
   */
  constructor(private rendererType: RendererType,
    private canvasContainer: HTMLElement,
    private canvasWidth: number,
    private canvasHeight: number) {
    super();

    this.init();
  }

  init() {
    this.renderSetting = RenderSetting.NONE;
    this.createRenderer();
  }

  render(scene, camera) {
    this.renderer.render(scene, camera);
  }

  private createRenderer(): void {
    if (!this.isInit) {
      this.renderer = RendererFactory.createRenderer(this.rendererType, this.canvasWidth, this.canvasHeight);

      // order matters, append first before setSize
      this.canvasContainer.appendChild(this.renderer.domElement);
      this.renderer.setSize(this.canvasWidth, this.canvasHeight);

      this.isInit = true;
    }
  }

  /**
  * The component should call this whenever its dom element gets resize.
  * The prefferred and common way to resize is not providing wid and hei.
  * The reason for allowing params is for future proof in situation where it may be needed
  */
  resize(width?: number, height?: number): void {
    if (!width && !height) {
      this.renderer.setSize(this.canvasContainer.offsetWidth, this.canvasHeight);
    } else if (width && height) {
      // fallback if width and height was provided for special cases
      this.renderer.setSize(width, height);
    }
  }

  // A quick control for selecting a render setting styles
  setRenderSetting(setting: RenderSetting): void {
    this.renderSetting = setting;
    // render setup configs
    if (setting === RenderSetting.DEFAULT) {
      this.setDefault();
    } else if (setting === RenderSetting.BASIC) {
      this.setBasic();
    } else if (setting === RenderSetting.FINALRENDER) {
      this.setFinalRender();
    }
  }

  /**
   * Will keep the renderer un touched from default configs.
   * This setting has the black background.
   */
  private setDefault(): void {
    // add renderer to canvas

    // for dev turn it off as you will get clear background, we want to see the balck color for now
    // RendererUtils.clearBG(this.renderer);
  }

  /**
   * This setting has modified settings for basic use
   */
  private setBasic(): void {
    RendererUtils.setClearBG(this.renderer);
  }

  /**
   * The final render setting for print out
   * Things like shadow and high resolution will be turned on.
   */
  private setFinalRender() {

  }

}

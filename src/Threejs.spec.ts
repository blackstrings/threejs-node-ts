/// <reference path="../typings/index.d.ts" />

import { Threejs } from '../src/index';
import { CanvasType } from '../src/index';

describe('Our first next test', () => {
  it('Our first expectation', () => {
    expect(true).toBeTruthy();
  });
});

// describe('In the file Threejs.ts', () => {
//   describe('the constructor', () => {
//     let canvas: HTMLElement;
//     let canvasManager: CanvasManager = new CanvasManager(canvas, 300, CanvasType.DECKLANDINGPAGE);
//     let sut: Threejs = new Threejs(canvas, 300, CanvasType.DECKLANDINGPAGE);
//     it('should not be null', () => {
//       expect(sut).not.toBeNull();
//     });
//   });
// });

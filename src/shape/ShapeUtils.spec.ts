/// <reference path="../../typings/index.d.ts" />

import * as THREE from 'three';
import { Shape2d, Point2d, ShapeModel, ShapeMaker, Shape2dTemplates, ShapeUtils } from './';

describe('planar rotation', () => {
  let shape: THREE.ShapeGeometry = ShapeMaker.create2dShapeFromNum2ds([[0, 0], [0, 10], [10, 10], [10, 0]]);
  describe('rotated to face down', () => {
    it('should face down', () => {
      ShapeUtils.faceDown(shape);
      expect(shape.vertices[1].z).toBe(-10);
    });
  });
  describe('rotated to face front', () => {
    it('should face front', () => {
      ShapeUtils.faceFront(shape);
      expect(shape.vertices[1].y).toBe(10);
    });
  });
});

describe('getting xy coordinates from 2dshape', function () {
  let shape = ShapeMaker.create2dShapeFromNum2ds([[0, 0], [0, 10], [10, 10], [10, 0], [5, 5]]);
  let array = ShapeUtils.getXYCoordinatesFrom2dShapeGeometry(shape, false);
  it('should not be null', () => {
    expect(array).toBeTruthy();
  });
  it('is not empty', () => {
    expect(array.length).toEqual(5);
  });
});

describe('Mesh Dimensions', () => {
  let mesh = new THREE.Mesh(new THREE.BoxGeometry(10, 15, 20), new THREE.MeshNormalMaterial());
  let height = ShapeUtils.getHeight(mesh);
  let width = ShapeUtils.getWidth(mesh);
  let depth = ShapeUtils.getDepth(mesh);
  it('has height of 15', () => {
    expect(height).toEqual(15);
  });
  it('has width of 15', () => {
    expect(width).toEqual(10);
  });
  it('should get height', () => {
    expect(depth).toEqual(20);
  });
});

describe('rotateMesh', () => {
  let shape = ShapeMaker.create2dShapeFromNum2ds([[0, 0], [0, 10], [10, 10], [10, 0]]);
  describe('180 on X', () => {
    it('should rotate 180 on X', () => {
      ShapeUtils.rotateMesh(shape, 180, 0, 0);
      expect(shape.vertices[1].y).toBe(-10);
    });
  });
  describe('180 on Y', () => {
    it('should rotate 180', () => {
      ShapeUtils.rotateMesh(shape, 0, 180, 0);
      expect(shape.vertices[1].y).toBe(-10);
    });
  });
  describe('180 on Z', () => {
    it('should rotate 180', () => {
      ShapeUtils.rotateMesh(shape, 0, 0, 180);
      expect(shape.vertices[1].y).toBe(10);
    });
  });
});

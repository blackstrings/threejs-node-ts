import * as THREE from 'three';

import { ShapeType2D, ShapeType3D, Utils } from '../index';
import { ShapeModel } from './';

// **modules don't use this**

export module ShapeModelFactory {

  export function create(id: number, scene: THREE.Scene): ShapeModel {
    return new ShapeModel(id, scene);
  }

  export function createShape2D(shapeType: ShapeType2D): THREE.Geometry {
    // TODO
    return new THREE.BoxGeometry(100, 100, 100);
  }

  export function createShape3D(shapeType: ShapeType3D): THREE.Mesh {

    // test
    // this.cube = new THREE.Mesh(new THREE.ShapeGeometry(this.createIntialShape()), this.material);

    if (shapeType === ShapeType3D.TESTCUBE) { return createTestCube(); }
    if (shapeType === ShapeType3D.TESTDECK) { return createTestDeck(); }
    return null;
  }

  function createCube(size: number): THREE.Geometry {
    return new THREE.BoxGeometry(size, size, size);
  }

  function createRect(l: number, w: number, h: number) {
    return new THREE.BoxGeometry(l, w, h);
  }

  function createTestDeck(): THREE.Mesh {
    // mock rotating deck
    let grp = new THREE.Group();
    let geoMain = new THREE.Geometry();
    let regGeo = new THREE.BoxGeometry(Utils.feetToInches(12), Utils.feetToInches(1), Utils.feetToInches(12));
    let leg = new THREE.BoxGeometry(Utils.feetToInches(1), Utils.feetToInches(3), Utils.feetToInches(1));
    let leg2 = leg.clone();
    let leg3 = leg.clone();
    let leg4 = leg.clone();

    let space = Utils.feetToInches(12);

    let legGeo = new THREE.Geometry();
    leg.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    leg2.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, space));
    leg3.applyMatrix(new THREE.Matrix4().makeTranslation(space, 0, space));
    leg4.applyMatrix(new THREE.Matrix4().makeTranslation(space, 0, 0));
    legGeo.merge(leg, new THREE.Matrix4());
    legGeo.merge(leg2, new THREE.Matrix4());
    legGeo.merge(leg3, new THREE.Matrix4());
    legGeo.merge(leg4, new THREE.Matrix4());
    legGeo.translate(-space / 2, -12, -space / 2);

    // let regGeo = new THREE.Geometry().fromBufferGeometry(buffGeo);
    let matrix = new THREE.Matrix4();
    // regGeo.applyMatrix(new THREE.Matrix4().makeTranslation(0,0,0));
    // regGeo.computeBoundingBox();
    geoMain.merge(regGeo, matrix);
    geoMain.merge(legGeo, matrix);
    // geoMain.merge(leg, matrix);
    // geoMain.merge(leg2, matrix);
    // geoMain.merge(leg3, matrix);
    // geoMain.merge(leg4, matrix);

    let mat = new THREE.MeshNormalMaterial();
    let mesh = new THREE.Mesh(geoMain, mat);
    mesh.position.y -= Utils.feetToInches(3);

    return mesh;
  }

  function createTestCube(): THREE.Mesh {
    // let mat:THREE.Material = new THREE.MeshBasicMaterial({color: 0x12eeff});
    // let mesh:THREE.Mesh = new THREE.Mesh(createCube(100), new THREE.MeshBasicMaterial({color: 0x12eeff}));
    let mat = new THREE.MeshNormalMaterial();
    let sizeInInch = Utils.feetToInches(1);
    let mesh = new THREE.Mesh(new THREE.BoxGeometry(sizeInInch, sizeInInch, sizeInInch), mat);
    return mesh;
  }
}

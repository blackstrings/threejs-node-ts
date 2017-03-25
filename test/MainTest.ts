import * as THREE from 'three';
import { Utils } from '../src/Utils';
import { Grid } from '../src/ui/Grid';

import { ShapeUtils } from '../src/shape/ShapeUtils';
import { ShapeMaker } from '../src/shape/ShapeMaker';
import { Shape2dTemplates } from '../src/shape/Shape2dTemplates';
import { Point2d } from '../src/shape/Point2d';

//managers
import { CanvasManager } from '../src/managers/CanvasManager';
import { UIManager } from '../src/managers/UIManager';
import { SceneManager } from '../src/managers/SceneManager';
import { RenderManager } from '../src/managers/RenderManager';
import { CameraManager } from '../src/managers/CameraManager';
import { TextureManager } from '../src/managers/TextureManager';

let canvas = {
  offsetWidth:100,
  offsetHeight:100,
}

newClass("Utils.ts");
(() => {
  test( Utils.feetToInches(3) == 36, '3 ft to in should equal 36');
  test( Utils.inchesToFeet(36) == 3, '36 in to ft should equal 3');
  test( Utils.getColor('red') == 0xf25346, 'red equals 0xf25346');
  //
  let m = new THREE.Mesh(new THREE.Geometry(), new THREE.MeshNormalMaterial());
  Utils.rotateMesh(m, 90,0,0);
  test( Math.round(THREE.Math.radToDeg(m.rotation.x)) == 90, 'rotation is 90');
})();

newClass("ShapeMaker.ts");
(() => {
  let shape:THREE.ShapeGeometry = ShapeMaker.create2dShapeFromString(JSON.stringify(Shape2dTemplates.square));
  test( shape instanceof THREE.ShapeGeometry, 'Shape is instanceof THREE.ShapeGeometry created from string');
  
  shape = ShapeMaker.create2dShapeFromNum2ds(Shape2dTemplates.rectangle);
  test( shape instanceof THREE.ShapeGeometry, 'Shape is instanceof THREE.ShapeGeometry created from num2ds');
  shape = null;
})();

newClass("Grid.ts");
(() => {
  let widthInFeet = 32;
  let grid:Grid = new Grid("front", widthInFeet);
  test(grid instanceof Grid, 'grid is instanceof Grid');

  test(grid.obj3d.visible, 'grid is visible');

  grid.hide();
  test(!grid.obj3d.visible, 'grid is invisible');

  //let gridGeoClone = new THREE.Geometry().fromBufferGeometry(grid.obj3d.geometry);
  grid.obj3d.geometry.computeBoundingBox();
  let boundingBox = grid.obj3d.geometry.boundingBox;
  test(boundingBox != null, 'should have a bounding box');

  let widthInInches = (boundingBox.max.x - boundingBox.min.x);
  test(widthInInches == Utils.feetToInches(32), 'boundingbox is 32 ft: ' + Utils.inchesToFeet(widthInInches));
  grid = null;
})();

newClass("UIManager.ts");
(() => {
  let scene:SceneManager;
  let canvas:HTMLElement;
  let uiManager = new UIManager(scene, canvas);
  test(uiManager != null, 'UIManager is not null');
})();

newClass("Raycaster.ts");
(() => {
  let scene:SceneManager;
  let canvas:HTMLElement;
  let uiManager = new UIManager(scene, canvas);
  test(uiManager != null, 'UIManager is not null');
})();



//-------------------------------------------------------------------------------
function test(status:boolean, testMsg:string){
  if(!status){ console.log('--- ' + testMsg); }
  else{console.log('+++ ' + testMsg)}
}

function newClass(className:string){
  console.log();
  console.log(className);
}
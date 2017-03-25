import { Shape2d, Point2d, ShapeModel, ShapeMaker, Shape2dTemplates, ShapeUtils } from './src/shape';

let shape2d: THREE.ShapeGeometry = ShapeMaker.create2dShapeFromNum2ds(Shape2dTemplates.square);
ShapeUtils.faceDown(shape2d);
console.log(shape2d.vertices[1].z == -120);
ShapeUtils.faceFront(shape2d);
console.log(shape2d.vertices[1].y == 120);
// tslint:disable-next-line:eofline
//console.log(JSON.stringify(ShapeUtils.getXYCoordinatesFrom2dShapeGeometry(shape2d, true)));
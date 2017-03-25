import * as THREE from 'three';

import { Shape2d, Point2d, ShapeMaker, ShapeUtils } from './';

/**
 * The root class of any selecteable 3d mesh objects that are in the scene.
 */
export class ShapeModel {

    name: string;

    // can have child shape models
    // draw will fail if you loop the list and it is null
    // safer to have it instantiate with empty list
    shapeModels: ShapeModel[] = [];

    // ref to the 3d mesh it represents. optional
    shape3d: THREE.Group = new THREE.Group();

    // an invisible 6 sided box around the actual shape3d that does the collision detection
    meshSelectionBox: THREE.Mesh;

    // if there point2ds provided, mesh will be created from it
    point2ds: Point2d[] = [];

    constructor(private shapeModelId: number, private scene: THREE.Scene) {

    }

    setPoint2ds(point2ds: Point2d[]){
        this.point2ds = point2ds;
    }

    /**
     * A shapeModel can be drawn in multiple ways. Therefore it runs through a check phase.
     * If contains shape2d, draw mesh programatically base on shape2d coordinates
     * If no shape2d, check if mesh should be loaded from the web service
     */
    draw(): void {
        // tslint:disable-next-line:one-line
        if (this.point2ds) {
            console.log('drawing shape2d');

            // final result should do 3 things:
            // return a mesh
            // register the mesh with this shapeModel's id
            // put the mesh into the scene
            let shapeGeo = ShapeMaker.create2dShapeFromPoint2ds(this.point2ds);
            ShapeUtils.faceDown(shapeGeo);
            this.shape3d = new THREE.Mesh(shapeGeo, new THREE.MeshNormalMaterial());
            this.scene.add(this.shape3d);

        }
        // draws nested shapeModels if any
        if(this.shapeModels != null){
            for (let shapeModel of this.shapeModels) {
                shapeModel.draw();
            }
        }
    }

    erase(): void {
        if (this.shape3d) { this.scene.remove(this.shape3d); }
    }

    hideMesh(): void {
        if (this.shape3d) { this.shape3d.visible = false; }

        // cycle through all nested childs
        for (let shapeModel of this.shapeModels) {
            shapeModel.hideMesh();
        }
    }

    // tslint:disable-next-line:eofline
}
import * as THREE from 'three';

class DM {
    name: string;
    shape2d: number[][];
    constructor() { }
}

interface Shape {
    draw(): void;
}

class Side implements Shape {
    shapes: Shape[] = [];
    draw(): void {
        throw new Error('Method not implemented.');
    }
}

/**
 * A level can be createad in multiple ways.
 * A deck level designModel dictates how many sides it creates
 * For the duration of the app the threejs writes to the design model on the service?
 *
 * @class Level
 * @implements {Shape}
 */
class Level implements Shape {

    // sides don't get created until the shape 2d template is finalized....resize is final
    sides: Side[] = [];

    constructor(public dm: DM) {
        this.init();
    }
    init(): void {

    }

    // when level shape size is finalize, create the sides
    finalizeShape(): void {
        let num2ds: number[][];
        num2ds = this.dm.shape2d;
        // a side for every level side
        for (let num2d of num2ds) {
            this.sides.push(new Side());
        }
    }

    // should update sides's length
    update(): void {
        for (let side of this.sides) {

        }
    }

    draw(): void {

    }
}

class Stair implements Shape {
    sides: Side[] = [];

    construct(num2ds: number[][]) {

    }

    draw(): void {
        throw new Error('Method not implemented.');
    }
}

let levelDM = new DM();
levelDM.shape2d = [[0, 0], [0, 10], [10, 10], [10, 0]];
let lvl = new Level(levelDM);
console.log(lvl.sides.length);

// level can have side
// stair can have side
// ramp can have side

// side can have stairs
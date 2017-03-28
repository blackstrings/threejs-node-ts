/**
 * A scene can have different initialization setups
 * @type {[type]}
 */
export enum SceneType { DEFAULT, BASIC }

export enum CanvasType {
    EMPTY,
    DESIGN_2D,
    DESIGN_3D,
    FINAL_3D
}

// handles selection modes
export enum SelectionMode { OBJECT, VERTEX, EDGE, DRAW_VERTEX }

/**
 * For toggling the camera
 * @type {[type]}
 */
export enum ViewType { FRONT, BACK, LEFT, RIGHT, TOP, BOTTOM, PERSPECTIVE }
export enum CameraType {ORTHO, PERSPECTIVE}
export enum CameraConfig {DEFAULT, WIDESHOT, MICRO}

/**
 * ThreeJS has a  few renders. In case we want to utilize more than one render.
 * @type {[type]}
 */
export enum RendererType {WEBGL, CSS3D}
export enum RenderSetting {NONE, DEFAULT, BASIC, WIREFRAME, LOWRES, HIGHRES, FINALRENDER}

/**
 * Used for generating 2d/3d shape
 * @type {[type]}
 */
export enum ShapeType2D {RECTANGLE, SQUARE, OCTAGON, CIRCLE, OVAL, TRIANGLE}
export enum ShapeType3D {TESTCUBE, TESTDECK, CUBE, SPHERE}

/**
 * A short description of what the 3d model represents
 * @type {[type]}
 */
export enum ModelType { GENERIC, DECKBOARD, SPINDLE }

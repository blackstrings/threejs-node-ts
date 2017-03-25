declare class OBJLoader {
    constructor(manager: any);
    load(url: string, onLoad: () => void, onProgress?: (request: ProgressEvent) => void, onError?:(event: ErrorEvent) => void): void;
    setPath(value: string): void;
    setMaterials(materials: THREE.Material[]): void;
    parse(text: string): void;
}

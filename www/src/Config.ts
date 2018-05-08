module MyGame {
  export class Config {
    scaleFactor: number;
    safeZone: SafeZone;
    tileSettings: any;
    tilesData: any;
  }

  export class SafeZone {
    constructor(safeWidth: number, safeHeight: number, paddingX: number, paddingY: number) {
      this.safeWidth = safeWidth;
      this.safeHeight = safeHeight;
      this.paddingX = paddingX;
      this.paddingY = paddingY;
    }
    safeWidth: number;
    safeHeight: number;
    paddingX: number;
    paddingY: number;
  }

  export class TileSettings {
    tileSize: number;
    frameLineWidth: number;
    lineColor: any;
    gridPaddingX: number;
    gridPaddingY: number;
    tileScale: number;
    arraySize: number;
    initialArray: Array<number>
  }

  export class TileData {
    minimumValue: number;
    tilesOrder: Array<string>;
    mainTile: string;
  }
}

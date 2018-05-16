export class Singleton {
  private static instance: Singleton;
  private _config: Config;
  private _game: Phaser.Game;
  private constructor() {}
  static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
      Singleton.instance._config = new Config();
      Singleton.instance._game = null;
    }
    return Singleton.instance;
  }
  get config(): Config {
    return this._config;
  }
  set config(config: Config) {
    this._config = config;
  }
  get game(): Phaser.Game {
    return this._game;
  }
  set game(config: Phaser.Game) {
    this._game = config;
  }
}

export class Config {
  scaleFactor: number;
  safeZone: SafeZone;
  tileSettings: TileSettings;
}

export class SafeZone {
  constructor(
    safeWidth: number,
    safeHeight: number,
    paddingX: number,
    paddingY: number
  ) {
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
  initialArray: Array<number>;
  minimumValue: number;
  tiles: Array<string>;
  mainTile: string;
}

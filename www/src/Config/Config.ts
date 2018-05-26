import SpriteFactory from './../Tools/SpriteFactory';
import ButtonFactory from './../Tools/ButtonFactory';
import TextFactory from './../Tools/TextFactory';
import GraphicsFactory from './../Tools/GraphicsFactory';

export class Singleton {
  private static instance: Singleton;
  private _config: Config;
  private _game: Phaser.Game;
  private _tools: Tools;

  private constructor() {}
  static initialize(config: Config, game: Phaser.Game) {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
      Singleton.instance._tools = new Tools(config);
      Singleton.instance._config = config;
      Singleton.instance._game = game;
    }
  }
  static get() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    return null;
  }
  get config(): Config {
    return this._config;
  }
  get tools(): Tools {
    return this._tools;
  }
  get game(): Phaser.Game {
    return this._game;
  }
  set game(game) {
    this._game = game;
  }
}

export class GameInstance {
  private static instance: GameInstance;
  private _game: Phaser.Game;

  private constructor() {}
  static initialize(game: Phaser.Game) {
    if (!GameInstance.instance && game) {
      GameInstance.instance = new GameInstance();
      GameInstance.instance._game = game;
      return GameInstance.instance;
    }
  }
  static get() {
    if (GameInstance.instance) {
      return GameInstance.instance;
    }
    return null;
  }
  get game(): Phaser.Game {
    return this._game;
  }
}

export class Config {
  scaleFactor: number;
  screenHeight: number;
  screenWidth: number;
  safeZone: SafeZone;
  gridSettings: GridSettings;
  colorSettings: ColorSettings;
}

export class ColorSettings {
  background: string;
  primary: string;
  selected: string;
  text: string;
  altText: string;
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

export class GridSettings {
  tileSize: number;
  physicalTileSize
  frameLineWidth: number;
  lineColor: any;
  activeLineColor: any;
  gridPaddingX: number;
  gridPaddingY: number;
  tileScale: number;
  tilePadding: number;
  font: string;
}

export class Tools {
  _text: TextFactory;
  _graphics: GraphicsFactory;
  _sprite: SpriteFactory;
  _button: ButtonFactory;

  constructor(config: Config) {
    this._text = new TextFactory(config);
    this._graphics = new GraphicsFactory(config);
    this._sprite = new SpriteFactory(config);
    this._button = new ButtonFactory(config);
  }

  get text(): TextFactory {
    return this._text;
  }

  get graphics(): GraphicsFactory {
    return this._graphics;
  }

  get button(): ButtonFactory {
    return this._button;
  }

  get sprite(): SpriteFactory {
    return this._sprite;
  }
}
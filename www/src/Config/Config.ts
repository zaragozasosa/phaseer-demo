import SpriteFactory from './../Tools/SpriteFactory';
import ButtonFactory from './../Tools/ButtonFactory';
import TextFactory from './../Tools/TextFactory';
import GraphicsFactory from './../Tools/GraphicsFactory';
import MiscFactory from './../Tools/MiscFactory';
import AudioFactory from './../Tools/AudioFactory';
import TweenFactory from './../Tools/TweenFactory';
import TransitionFactory from './../Tools/TransitionFactory';



export class Singleton {
  private static instance: Singleton;
  private _config: Config;
  private _tools: Tools;

  private constructor() { }
  static initialize(config: Config, game: Phaser.Game) {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
      Singleton.instance._tools = new Tools(config);
      Singleton.instance._config = config;
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
}

export class GameInstance {
  private static instance: GameInstance;
  private _game: Phaser.Game;

  private constructor() { }
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
  grid: GridSettings;
  color: ColorSettings;
  sound: SoundSettings;
  window: WindowSettings;
  storyboard: StoryboardSettings;
}

export class WindowSettings {
  centerHeight: number;
  centerY: number;
  defaultHeight: number;
  defaultWidth: number;
  defaultLineWidth: number;
  defaultX: number;
  defaultY: number;
}

export class SoundSettings {
  bgmVolume: number;
  sfxVolume: number;
  volumeSprite: string;
  bgm: Phaser.Sound;
}
export class ColorSettings {
  background: string;
  primary: string;
  selected: string;
  text: string;
  altText: string;

  static readonly PRIMARY = 1;
  static readonly BACKGROUND = 2;
  static readonly SELECTED = 3;
  static readonly TEXT = 4;
  static readonly ALT_TEXT = 5;
  static readonly BLACK = 5;
}

export class SafeZone {
  constructor(
    safeWidth: number,
    safeHeight: number,
    paddingX: number,
    paddingY: number,
    bgPaddingX: number,
    bgPaddingY: number,
    bgWidth: number,
    bgHeight: number,
  ) {
    this.safeWidth = safeWidth;
    this.safeHeight = safeHeight;
    this.paddingX = paddingX;
    this.paddingY = paddingY;
    this.bgPaddingX = bgPaddingX;
    this.bgPaddingY = bgPaddingY;
    this.bgWidth = bgWidth;
    this.bgHeight = bgHeight;
  }
  safeWidth: number;
  safeHeight: number;
  paddingX: number;
  paddingY: number;
  bgPaddingX: number;
  bgPaddingY: number;
  bgWidth: number;
  bgHeight: number;
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
  font: string;
  tileNumberPadX: number;
  tileNumberPadY: number;
}

export class StoryboardSettings {
  storyboardSignal: Phaser.Signal;
  menuInputSignal: Phaser.Signal;
  optionClickSignal: Phaser.Signal;
  windowActionSignal: Phaser.Signal;
}

export class Tools {
  private _text: TextFactory;
  private _graphic: GraphicsFactory;
  private _sprite: SpriteFactory;
  private _button: ButtonFactory;
  private _misc: MiscFactory;
  private _audio: AudioFactory;
  private _tween: TweenFactory;
  private _transition: TransitionFactory;

  constructor(config: Config) {
    this._text = new TextFactory(config);
    this._graphic = new GraphicsFactory(config);
    this._sprite = new SpriteFactory(config);
    this._button = new ButtonFactory(config);
    this._misc = new MiscFactory(config);
    this._audio = new AudioFactory(config);
    this._tween = new TweenFactory(config);
    this._transition = new TransitionFactory(config);
  }

  get text(): TextFactory {
    return this._text;
  }

  get graphic(): GraphicsFactory {
    return this._graphic;
  }

  get button(): ButtonFactory {
    return this._button;
  }

  get sprite(): SpriteFactory {
    return this._sprite;
  }

  get misc(): MiscFactory {
    return this._misc;
  }

  get audio(): AudioFactory {
    return this._audio;
  }

  get tween(): TweenFactory {
    return this._tween;
  }
  
  get transition(): TransitionFactory {
    return this._transition;
  }
}
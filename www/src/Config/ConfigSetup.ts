import {
  Config,
  SafeZone,
  GridSettings,
  ColorSettings,
  SoundSettings,
  WindowSettings
} from './Config';

export default class ConfigSetup {
  config: Config;

  constructor() {
    this.config = new Config();
    this.resolutionSetup();
    this.colorConfig();
    this.grid();
    this.windowConfig();
  }

  resolutionSetup() {
    let scaleFactor;
    let safeZone;
    let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    let paddingX = 0;
    let paddingY = 0;
    let bgPaddingX = 0;
    let bgPaddingY = 0;
    let bgWidth = 0;
    let bgHeight = 0;
    let safeWidth = 0;
    let safeHeight = 0;
    let baseWidth = 320;
    let baseHeight = 480;
    let maxPixelRatio = 3;
    let desktopPadding = !isMobile ? 0 : 0;
    let baseProportion = baseHeight / baseWidth;
    let screenPixelRatio =
      window.devicePixelRatio <= maxPixelRatio
        ? window.devicePixelRatio
        : maxPixelRatio;

    screenPixelRatio = !isMobile ? 1 : screenPixelRatio;

    let screenWidth = window.innerWidth * screenPixelRatio;
    screenWidth = !isMobile ? screenWidth / screenPixelRatio : screenWidth;
    let screenHeight = window.innerHeight * screenPixelRatio;
    screenHeight = !isMobile ? screenHeight / screenPixelRatio : screenHeight;

    var screenProportion = screenHeight / screenWidth;

    var widthProportion = window.innerWidth / baseWidth;

    bgHeight = screenHeight;
    bgWidth = screenWidth;

    if (screenProportion > baseProportion) {
      safeWidth = screenWidth;
      safeHeight = safeWidth * baseProportion;
      paddingY = (screenHeight - safeHeight) / 2;
      scaleFactor = screenPixelRatio / 3 * widthProportion;
    } else if (screenProportion < baseProportion) {
      safeHeight = screenHeight - desktopPadding * 2;
      safeWidth = safeHeight / baseProportion;
      bgWidth = safeWidth;
      paddingX = (screenWidth - safeWidth) / 2;
      scaleFactor = safeWidth / (baseWidth * maxPixelRatio);
    }

    if (!isMobile) {
      bgPaddingX = paddingX;
      bgWidth = safeHeight / baseProportion;
    }

    paddingY += desktopPadding;

    this.config.safeZone = new SafeZone(
      safeWidth,
      safeHeight,
      paddingX,
      paddingY,
      bgPaddingX,
      bgPaddingY,
      bgWidth,
      bgHeight
    );
    this.config.scaleFactor = scaleFactor;
    this.config.screenWidth = screenWidth;
    this.config.screenHeight = screenHeight;
  }

  grid() {
    let config = this.config;
    let scaleFactor = config.scaleFactor;
    let grid: GridSettings;

    grid = new GridSettings();
    grid.tileSize = 230;
    grid.physicalTileSize = 180;
    grid.frameLineWidth = 30;
    grid.lineColor = config.color.primary;
    grid.activeLineColor = config.color.selected;
    grid.gridPaddingX = 25 * scaleFactor;
    grid.gridPaddingY = 250 * scaleFactor;
    grid.tileScale = grid.tileSize / (grid.physicalTileSize + 10);
    grid.font = 'Verdana,Geneva,sans-serif';
    grid.tileNumberPadX = 15;
    grid.tileNumberPadY = 10;

    config.grid = grid;

    config.sound = new SoundSettings();
    config.sound.bgmVolume = 1;
    config.sound.sfxVolume = 1;
    config.sound.volumeSprite = 'volume';
  }

  //lily
  // color.background = '#434D6C';
  // color.primary = '#21283B';
  // color.selected = '#BE1E2D';
  // color.text = '#EEF2FC';
  // color.altText = '#BBBEC6';

  //rosa
  // color.background = '#393939';
  // color.primary = '#21283B';
  // color.selected = '#1C1C1C';
  // color.text = '#EEF2FC';
  // color.altText = '#937A7A';

  colorConfig() {
    let color = new ColorSettings();
    color.background = '#1C1C1C';
    color.primary = '#B1851E';
    color.selected = '#837B97';
    color.text = '#EEF2FC';
    color.altText = '#7E7E7E';

    this.config.color = color;
  }

  windowConfig() {
    this.config.window = new WindowSettings();
    let window = this.config.window;
    window.defaultLineWidth = 15;
    window.defaultWidth =
      this.config.safeZone.safeWidth -
      4 * window.defaultLineWidth * this.config.scaleFactor;
    window.defaultHeight = this.config.safeZone.safeHeight * (1 / 2);

    window.defaultX = window.defaultLineWidth * 2 * this.config.scaleFactor;
    window.defaultY = this.config.safeZone.safeHeight * (1 / 4);

    window.centerHeight = this.config.safeZone.safeHeight * (1 / 3);
    window.centerY = this.config.safeZone.safeHeight * (1 / 3);
  }
}

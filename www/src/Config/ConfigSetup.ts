import { Config, SafeZone, GridSettings, ColorSettings, SoundSettings } from './Config';

export default class ConfigSetup {
  config: Config;

  constructor() {
    this.config = new Config();
    this.resolutionSetup();
    this.colorConfig();    
    this.grid();
  }

  resolutionSetup() {
    let scaleFactor;
    let safeZone;

    let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    let paddingX = 0;
    let paddingY = 0;
    let safeWidth = 0;
    let safeHeight = 0;
    let baseWidth = 320;
    let baseHeight = 480;
    let maxPixelRatio = 3;
    let baseProportion = baseHeight / baseWidth;
    let screenPixelRatio = 
      window.devicePixelRatio <= maxPixelRatio
        ? window.devicePixelRatio
        : maxPixelRatio;

    screenPixelRatio = !isMobile ? 1 : screenPixelRatio;

    let screenWidth = window.innerWidth * screenPixelRatio;

    let screenHeight = window.innerHeight * screenPixelRatio;
    screenHeight = !isMobile
      ? screenHeight / screenPixelRatio - 20
      : screenHeight;
    var screenProportion = screenHeight / screenWidth;

    var widthProportion = window.innerWidth / baseWidth;

    if (screenProportion > baseProportion) {
      safeWidth = screenWidth;
      safeHeight = safeWidth * baseProportion;
      paddingY = (screenHeight - safeHeight) / 2;
      scaleFactor = screenPixelRatio / 3 * widthProportion;
    } else if (screenProportion < baseProportion) {
      safeHeight = screenHeight;
      safeWidth = safeHeight / baseProportion;
      paddingX = (screenWidth - safeWidth) / 2;
      scaleFactor = safeWidth / (baseWidth * maxPixelRatio);
    }

    this.config.safeZone = new SafeZone(
      safeWidth,
      safeHeight,
      paddingX,
      paddingY
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
    grid.gridPaddingY = 200 * scaleFactor;
    grid.tileScale =
      grid.tileSize / (grid.physicalTileSize + 10);
    grid.tilePadding = 0;
    grid.font = 'Verdana,Geneva,sans-serif';
    grid.tileNumberPadX = 30;
    grid.tileNumberPadY = 110;
    
    config.grid = grid;

    config.sound = new SoundSettings();
    config.sound.bgmVolume = 0.5;
    config.sound.sfxVolume = 1;
    config.sound.volumeLevels = [ 1, 0.5, 0];
    config.sound.actualVolumeIndex = 0;
    config.sound.volumeSprite = 'volume';
  }

  colorConfig() {
    let color = new ColorSettings();
    color.background = '#2f3136';
    color.primary = '#99AAB5';
    color.selected = '#000000';
    color.text = '#FFFFFF';
    color.altText = '#99AAB5';

    this.config.color = color;
  }
}

import { Config, SafeZone, GridSettings, ColorSettings } from './Config';

export default class ConfigSetup {
  config: Config;

  constructor() {
    this.config = new Config();
    this.resolutionSetup();
    this.colorConfig();    
    this.gridSettings();
  }

  resolutionSetup() {
    let scaleFactor;
    let safeZone;

    //let hasVisualViewport = window.visualViewport;
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
    // let screenWidth = hasVisualViewport
    //   ? window.visualViewport.width * screenPixelRatio
    //   : window.innerWidth * screenPixelRatio;
    let screenWidth = window.innerWidth * screenPixelRatio;
    screenWidth = !isMobile && screenWidth > 1080 ? 1080 : screenWidth;
    // let screenHeight = hasVisualViewport
    //   ? window.visualViewport.height * screenPixelRatio
    //   : window.innerHeight * screenPixelRatio;
    let screenHeight = window.innerHeight * screenPixelRatio;
    screenHeight = !isMobile
      ? screenHeight / screenPixelRatio - 20
      : screenHeight > 940 ? 940 : screenHeight;
    var screenProportion = screenHeight / screenWidth;
    // var widthProportion = hasVisualViewport
    //   ? window.visualViewport.width / baseWidth
    //   : window.innerWidth / baseWidth;
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

  gridSettings() {
    let config = this.config;
    let scaleFactor = config.scaleFactor;
    let gridSettings: GridSettings;

    gridSettings = new GridSettings();
    gridSettings.tileSize = 230;
    gridSettings.physicalTileSize = 180;
    gridSettings.frameLineWidth = 30;
    gridSettings.lineColor = config.colorSettings.primary;
    gridSettings.activeLineColor = config.colorSettings.selected;
    gridSettings.gridPaddingX = 20 * scaleFactor;
    gridSettings.gridPaddingY = 200 * scaleFactor;
    gridSettings.tileScale =
      gridSettings.tileSize / (gridSettings.physicalTileSize + 10);
    gridSettings.tilePadding = 0;
    gridSettings.font = 'Verdana,Geneva,sans-serif';
    gridSettings.tileNumberPadX = 30;
    gridSettings.tileNumberPadY = 120;
    
    config.gridSettings = gridSettings;
  }

  colorConfig() {
    let color = new ColorSettings();
    color.background = '#2f3136';
    color.primary = '#99AAB5';
    color.selected = '#000000';
    color.text = '#FFFFFF';
    color.altText = '#99AAB5';

    this.config.colorSettings = color;
  }
}

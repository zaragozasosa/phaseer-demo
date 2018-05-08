module MyGame {
  export class Singleton {
    private static instance: Singleton;
    private _config: Config;
    private constructor() { }
    static getInstance() {
      if (!Singleton.instance) {
        Singleton.instance = new Singleton();
        Singleton.instance._config = new Config();
      }
      return Singleton.instance;
    }
    get config(): Config {
      return this._config;
    }
    set config(config: Config) {
      this._config = config;
    }
  }

  export class Game extends Phaser.Game {
    constructor() {
      let scaleFactor;
      let safeZone;
      let tileSettings;
      let tilesData;
      let config = Singleton.getInstance().config;

      var hasVisualViewport = window.visualViewport;
      let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      let paddingX = 0;
      let paddingY = 0;
      let safeWidth = 0;
      let safeHeight = 0;
      let baseWidth = 320;
      let baseHeight = 480;
      let maxPixelRatio = 3;
      let baseProportion = baseHeight / baseWidth;
      let screenPixelRatio = window.devicePixelRatio <= maxPixelRatio ? window.devicePixelRatio : maxPixelRatio;
      let screenWidth = hasVisualViewport ? window.visualViewport.width * screenPixelRatio : window.innerWidth * screenPixelRatio
      screenWidth = !isMobile && screenWidth > 1080 ? 1080 : screenWidth;
      let screenHeight = hasVisualViewport ? window.visualViewport.height * screenPixelRatio : window.innerHeight * screenPixelRatio
      screenHeight = !isMobile ? (screenHeight / screenPixelRatio) - 20 : screenHeight > 940 ? 940 : screenHeight;
      var screenProportion = screenHeight / screenWidth;
      var widthProportion = hasVisualViewport ? window.visualViewport.width / baseWidth : window.innerWidth / baseWidth;

      super(screenWidth, screenHeight, Phaser.CANVAS, 'content', null, true);

      if (screenProportion > baseProportion) {
        safeWidth = screenWidth;
        safeHeight = safeWidth * baseProportion;
        paddingY = (screenHeight - safeHeight) / 2;
        scaleFactor = (screenPixelRatio / 3) * widthProportion;
      } else if (screenProportion < baseProportion) {
        safeHeight = screenHeight;
        safeWidth = safeHeight / baseProportion;
        paddingX = (screenWidth - safeWidth) / 2;
        scaleFactor = safeWidth / (baseWidth * maxPixelRatio);
      }

      safeZone = new SafeZone(safeWidth, safeHeight, paddingX, paddingY);

      tileSettings = new TileSettings();
      tileSettings.tileSize = 240;
      tileSettings.frameLineWidth = 4;
      tileSettings.lineColor = 0x003399;
      tileSettings.gridPaddingX = 0 * scaleFactor;
      tileSettings.gridPaddingY = 200 * scaleFactor;
      tileSettings.tileScale = 240 / 180;
      tileSettings.arraySize = 3;
      tileSettings.initialArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

      config.scaleFactor = scaleFactor;
      config.safeZone = safeZone;
      config.tileSettings = tileSettings;
      Singleton.getInstance().config = config;

      this.state.add('Boot', Boot, false);
      this.state.add('Preloader', Preloader, false);
      this.state.add('MainMenu', MainMenu, false);
      this.state.start('Boot');
    }
  }
}

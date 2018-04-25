module MyGame {

  export class Game extends Phaser.Game {

    scaleFactor: number;
    safeZone: any;
    tileSettings: any;

    constructor() {
      let paddingX = 0;
      let paddingY = 0;
      let safeWidth = 0;
      let safeHeight = 0;
      let baseWidth = 320;
      let baseHeight = 480;
      let maxPixelRatio = 3;
      let baseProportion = baseHeight / baseWidth;
      let screenPixelRatio = window.devicePixelRatio <= maxPixelRatio ? window.devicePixelRatio : maxPixelRatio;
      let screenWidth = window.visualViewport.width * screenPixelRatio;
      screenWidth = screenPixelRatio == 1 && screenWidth > 1080 ? 1080 : screenWidth;
      let screenHeight = window.visualViewport.height * screenPixelRatio;
      screenHeight = screenPixelRatio == 1 && screenHeight > 940 ? 940 : screenHeight;
      var screenProportion = screenHeight / screenWidth;
      var widthProportion = window.visualViewport.width / baseWidth;

      super(screenWidth, screenHeight, Phaser.CANVAS, 'content');

      if (screenProportion > baseProportion) {
        safeWidth = screenWidth;
        safeHeight = safeWidth * baseProportion;
        paddingY = (screenHeight - safeHeight) / 2;
        this.scaleFactor = (screenPixelRatio / 3) * widthProportion;
      } else if (screenProportion < baseProportion) {
        safeHeight = screenHeight;
        safeWidth = safeHeight / baseProportion;
        paddingX = (screenWidth - safeWidth) / 2;
        this.scaleFactor = safeWidth / (baseWidth * maxPixelRatio);
      }



      this.safeZone = {
        safeWidth: safeWidth,
        safeHeight: safeHeight,
        paddingX: paddingX,
        paddingY: paddingY
      }

      this.tileSettings = {
        tileSize: 240,
        frameLineWidth: 4,
        lineColor: 0x0000FF,
        gridPaddingX: 0 * this.scaleFactor,
        gridPaddingY: 200 * this.scaleFactor,
      }

      this.state.add('Boot', Boot, false);
      this.state.add('Preloader', Preloader, false);
      this.state.add('MainMenu', MainMenu, false);
      this.state.start('Boot');

    }

  }

}
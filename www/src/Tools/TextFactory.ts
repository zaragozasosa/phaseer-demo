import { Singleton, Config } from '../Config';
export default class TextFactory {
    game: Phaser.Game;
    config: Config;

    constructor() {
      let singleton = Singleton.getInstance();
      this.game = singleton.game;
      this.config = singleton.config;
    }

    makeTileNumber(x: number, y: number, value: number, size: number) {
      let xPos =
        x * this.config.tileSettings.tileSize +
        this.config.tileSettings.gridPaddingX;
      let yPos =
        y * this.config.tileSettings.tileSize +
        this.config.tileSettings.gridPaddingY;

      return this.makeStroked(xPos, yPos, value.toString(), size);
    }

    makeStroked(
      posX: number,
      posY: number,
      text: string,
      textSize: number,
      center = false
    ) {
      let x = this.config.safeZone.paddingX + posX * this.config.scaleFactor;
      let y = this.config.safeZone.paddingY + posY * this.config.scaleFactor;

      let textObj = this.game.add.text(x, y, text);

      //	Font style
      textObj.font = 'Arial Black';
      textObj.fontSize = textSize * this.config.scaleFactor;

      //	Stroke color and thickness
      textObj.stroke = '#000000';
      textObj.strokeThickness = textSize / 4 * this.config.scaleFactor;
      textObj.addColor('#ffffff', 0);

      if (center) {
        textObj.anchor.set(0.5);
      }

      this.game.physics.enable(textObj, Phaser.Physics.ARCADE);
      return textObj;
    }
  }


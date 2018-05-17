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
      x * this.config.gridSettings.tileSize +
      this.config.gridSettings.gridPaddingX;
    let yPos =
      y * this.config.gridSettings.tileSize +
      this.config.gridSettings.gridPaddingY;

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

  makeHorizontalCentered(posY: number, text: string, textSize: number) {
    let y = this.config.safeZone.paddingY + posY * this.config.scaleFactor;
    var style = { boundsAlignH: 'center' };
    let textObj = this.game.add.text(0, y, text, style);

    //	Font style
    textObj.font = 'Arial Black';
    textObj.fontSize = textSize * this.config.scaleFactor;

    //	Stroke color and thickness
    textObj.stroke = '#000000';
    textObj.strokeThickness = textSize / 4 * this.config.scaleFactor;
    textObj.addColor('#ffffff', 0);
    textObj.setTextBounds(
      this.config.safeZone.paddingX,
      this.config.safeZone.paddingY,
      this.config.safeZone.safeWidth,
      this.config.safeZone.safeHeight
    );

    textObj.padding = new Phaser.Point(20,20);;

    return textObj;
  }
}

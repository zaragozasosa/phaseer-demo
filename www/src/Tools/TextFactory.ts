import { Singleton, Config } from '../Config';
export default class TextFactory {
  private game: Phaser.Game;
  private config: Config;
  private font;

  constructor() {
    let singleton = Singleton.getInstance();
    this.game = singleton.game;
    this.config = singleton.config;
    this.font = 'Verdana';
  }

  makeTileNumber(x: number, y: number, value: number, size: number) {
    let xPos =
      x * this.config.gridSettings.tileSize +
      this.config.gridSettings.gridPaddingX;
    let yPos =
      y * this.config.gridSettings.tileSize +
      this.config.gridSettings.gridPaddingY;

    return this.make(xPos, yPos, value.toString(), size);
  }

  make(
    posX: number,
    posY: number,
    text: string,
    textSize: number,
    center = false,
    stroked = true,
    color = '#ffffff'
  ) {
    let x = this.config.safeZone.paddingX + posX * this.config.scaleFactor;
    let y = this.config.safeZone.paddingY + posY * this.config.scaleFactor;

    let textObj = this.game.add.text(x, y, text);

    textObj.font = this.font;
    textObj.fontSize = textSize * this.config.scaleFactor;
    textObj.addColor(color, 0);

    if (stroked) {
      textObj.stroke = '#000000';
      textObj.strokeThickness = textSize / 4 * this.config.scaleFactor;
    }

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
    textObj.font = this.font;
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

    return textObj;
  }

  makeYBounded(
    posX: number,
    text: string,
    textSize: number,
    align: string,
    color = '#ffffff'
  ) {
    let safeZone = this.config.safeZone;
    let graphic = this.make(posX, 0, text, textSize, false, false, color);
    graphic.wordWrap = true;
    graphic.wordWrapWidth = safeZone.safeWidth;
    graphic.boundsAlignV = align;
    graphic.setTextBounds(
      10,
      10,
      safeZone.safeWidth - 10,
      safeZone.safeHeight - 10
    );

    return graphic;
  }

  makeXBounded(
    posY: number,
    text: string,
    textSize: number,
    align: string,
    color = '#ffffff',
    stroked = false
  ) {
    let safeZone = this.config.safeZone;
    let graphic = this.make(0, posY, text, textSize, false, stroked, color);
    graphic.wordWrap = true;
    graphic.wordWrapWidth = safeZone.safeWidth;
    graphic.boundsAlignH = align;
    graphic.setTextBounds(
      10,
      10,
      safeZone.safeWidth - 10,
      safeZone.safeHeight - 10
    );

    return graphic;
  }
}

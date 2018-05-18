import { Singleton, Config } from '../Config';
export default class TextFactory {
  private game: Phaser.Game;
  private config: Config;
  private font;

  constructor() {
    let singleton = Singleton.getInstance();
    this.game = singleton.game;
    this.config = singleton.config;
    this.font = 'Verdana,Geneva,sans-serif';
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
    color = '#ffffff'
  ) {
    let x = this.config.safeZone.paddingX + posX * this.config.scaleFactor;
    let y = this.config.safeZone.paddingY + posY * this.config.scaleFactor;

    let textObj = this.game.add.text(x, y, text);

    textObj.font = this.font;
    textObj.fontSize = textSize * this.config.scaleFactor;
    textObj.addColor(color, 0);

    if (center) {
      textObj.anchor.set(0.5);
    }

    this.game.physics.enable(textObj, Phaser.Physics.ARCADE);
    return textObj;
  }

  makeYBounded(
    posX: number,
    text: string,
    textSize: number,
    align: string,
    color = '#99AAB5'
  ) {
    let safeZone = this.config.safeZone;
    let graphic = this.make(posX, 0, text, textSize, false, color);
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
    color = '#99AAB5',
  ) {
    let safeZone = this.config.safeZone;
    let graphic = this.make(0, posY, text, textSize, false, color);
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

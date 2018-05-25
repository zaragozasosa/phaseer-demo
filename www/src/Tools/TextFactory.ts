import { Singleton, Config } from '../Config';
import Factory from './Factory';
export default class TextFactory extends Factory {
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
    altColor = false
  ) {
    var colorConfig = this.config.colorSettings;
    let x = this.config.safeZone.paddingX + posX * this.config.scaleFactor;
    let y = this.config.safeZone.paddingY + posY * this.config.scaleFactor;
    let color = altColor ? colorConfig.altText : colorConfig.text;
    let textObj = this.game.add.text(x, y, text);

    textObj.font = this.config.gridSettings.font;
    textObj.fontSize = textSize * this.config.scaleFactor;
    textObj.addColor(color, 0);

    this.game.physics.enable(textObj, Phaser.Physics.ARCADE);
    return textObj;
  }

  makeXBounded(
    posY: number,
    text: string,
    textSize: number,
    align: string,
    altColor = false
  ) {
    let safeZone = this.config.safeZone;
    let boundPadding = 15 * this.config.scaleFactor;
    let textObj = this.make(0, posY, text, textSize, altColor);
    textObj.wordWrap = true;
    textObj.wordWrapWidth = safeZone.safeWidth;
    textObj.boundsAlignH = align;
    textObj.setTextBounds(
      boundPadding,
      boundPadding,
      safeZone.safeWidth - boundPadding,
      safeZone.safeHeight - boundPadding
    );

    return textObj;
  }

  makeXBoundedOptions(
    posY: number,
    text: string,
    textSize: number,
    align: string,
    wordWrapWidth: number,
    padding: number,
    lineHeight: number,
    altColor = false
  ) {
    let safeZone = this.config.safeZone;
    let textObj = this.make(0, posY, text, textSize, altColor);
    let pad = padding * this.config.scaleFactor;
    textObj.wordWrap = true;
    textObj.wordWrapWidth = wordWrapWidth * this.config.scaleFactor;

    textObj.boundsAlignH = align;
    textObj.lineSpacing = lineHeight;
    textObj.setTextBounds(
      pad,
      pad,
      safeZone.safeWidth - pad,
      safeZone.safeHeight - pad
    );

    return textObj;
  }

  makeYBounded(
    posX: number,
    text: string,
    textSize: number,
    align: string,
    altColor = false,
    wordWrapWidth = 0,
    padding = 0
  ) {
    let boundPadding = padding ? padding : 15;
    let safeZone = this.config.safeZone;
    let graphic = this.make(posX, 0, text, textSize, altColor);
    graphic.wordWrap = true;
    graphic.wordWrapWidth = wordWrapWidth
      ? wordWrapWidth * this.config.scaleFactor
      : safeZone.safeWidth;
    graphic.boundsAlignV = align;
    graphic.setTextBounds(
      boundPadding,
      boundPadding,
      safeZone.safeWidth - boundPadding,
      safeZone.safeHeight - boundPadding
    );

    return graphic;
  }

  makeCenteredAnchor(
    posX: number,
    posY: number,
    text: string,
    textSize: number,
    altColor = false
  ) {
    let textObj = this.make(posX, posY, text, textSize, altColor);
    textObj.anchor.set(0.5);

    return textObj;
  }
}

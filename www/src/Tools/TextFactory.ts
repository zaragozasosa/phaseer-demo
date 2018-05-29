import Factory from './Base/Factory';
export default class TextFactory extends Factory {
  makeTileNumber(x: number, y: number, value: number, size: number) {
    let settings = this.config.grid;
    let xPos = settings.tileNumberPadX + x * settings.tileSize;
    let yPos = settings.tileNumberPadY + y * settings.tileSize;

    let txt = this.make(
      xPos,
      yPos,
      value.toString(),
      size,
      false,
      settings.gridPaddingX,
      settings.gridPaddingY
    );
    this.game.physics.enable(txt, Phaser.Physics.ARCADE);

    return txt;
  }

  updateTileNumber(x: number, y: number, text: Phaser.Text) {
    let settings = this.config.grid;
    let xPos = settings.tileNumberPadX + x * settings.tileSize;
    let yPos = settings.tileNumberPadY + y * settings.tileSize;

    let posX = this.config.safeZone.paddingX + xPos * this.config.scaleFactor;
    let posY = this.config.safeZone.paddingY + yPos * this.config.scaleFactor;

    text.position.x = posX + settings.gridPaddingX;
    text.position.y = posY + settings.gridPaddingY;
  }

  make(
    posX: number,
    posY: number,
    text: string,
    textSize: number,
    altColor = false,
    padX = 0,
    padY = 0
  ) {
    var colorConfig = this.config.color;
    let x =
      this.config.safeZone.paddingX + padX + posX * this.config.scaleFactor;
    let y =
      this.config.safeZone.paddingY + padY + posY * this.config.scaleFactor;
    let color = altColor ? colorConfig.altText : colorConfig.text;
    let textObj = this.game.add.text(x, y, text);

    textObj.font = this.config.grid.font;
    textObj.fontSize = textSize * this.config.scaleFactor;
    textObj.addColor(color, 0);

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

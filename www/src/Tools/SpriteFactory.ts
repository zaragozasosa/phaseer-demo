import { Config, Singleton } from '../Config';
export default class SpriteFactory {
  private game: Phaser.Game;
  private config: Config;

  constructor() {
    let singleton = Singleton.getInstance();
    this.game = singleton.game;
    this.config = singleton.config;
  }

  makeTile(x: number, y: number, id: string) {
    let size = this.config.gridSettings.tileSize;
    let scale = this.config.gridSettings.tileScale;
    let padX = this.config.gridSettings.gridPaddingX;
    let padY = this.config.gridSettings.gridPaddingY;
    return this.createSprite(x * size, y * size, id, scale, padX, padY);
  }

  createSprite(
    posX: number,
    posY: number,
    id: string,
    scale = 1,
    padX = 0,
    padY = 0
  ) {
    let x = posX * this.config.scaleFactor;
    let y = posY * this.config.scaleFactor;

    let config = this.config;
    let xPad = config.safeZone.paddingX + padX;
    let yPad = config.safeZone.paddingY + padY;
    let sprite = this.game.add.sprite(x + xPad, y + yPad, id);
    sprite.scale.setTo(config.scaleFactor * scale, config.scaleFactor * scale);

    return sprite;
  }

  makeMenuTile(x: number, y: number, id: string, yPad: number, ratio: number) {
    let size = this.config.gridSettings.tileSize * ratio;
    let scale = this.config.gridSettings.tileScale * ratio;

    return this.createSprite(x * size, y * size, id, scale, 0, yPad);
  }

  makeCentered(posY: number, id: string, spriteScale = 1) {
    let y = posY * this.config.scaleFactor;
    let config = this.config;
    let xPad = config.safeZone.paddingX + this.config.gridSettings.gridPaddingX;
    let yPad = config.safeZone.paddingY + this.config.gridSettings.gridPaddingY;
    let sprite = this.game.add.sprite(0, y + yPad, id);
    sprite.scale.setTo(
      config.scaleFactor * spriteScale,
      config.scaleFactor * spriteScale
    );

    let x = (this.config.safeZone.safeWidth - sprite.width) / 2;
    sprite.x = xPad + x;

    return sprite;
  }

  makeFrame(x: number, y: number, size: number, lineWidth: number, color: any) {
    let scaledSize = this.config.scaleFactor * size;
    let graphics = this.game.add.graphics(0, 0);
    graphics.lineStyle(lineWidth, color, 1);
    let rect = graphics.drawRect(x, y, scaledSize, scaledSize);
    this.game.physics.enable(rect, Phaser.Physics.ARCADE);

    return rect;
  }

  makeTileFrame(
    posX: number,
    posY: number,
    ratio = 1,
    xPadding = null,
    yPadding = null
  ) {
    let config = this.config.gridSettings;
    let scale = this.config.scaleFactor;
    let lineWidth = config.frameLineWidth;
    let safeZone = this.config.safeZone;

    let frameSize = config.tileSize * ratio - lineWidth / 2;
    let color = config.lineColor;
    let xPad = safeZone.paddingX + (xPadding ? xPadding : config.gridPaddingX);
    let yPad = safeZone.paddingY + (yPadding ? yPadding : config.gridPaddingY);
    let x = posX * config.tileSize * ratio * scale;
    let y = posY * config.tileSize * ratio * scale;

    return this.makeFrame(x + xPad, y + yPad, frameSize, lineWidth, color);
  }

  updateTileFrame(
    frame: Phaser.Graphics,
    posX: number,
    posY: number,
    ratio = 1,
    xPadding = null,
    yPadding = null
  ) {
    let config = this.config.gridSettings;
    let scale = this.config.scaleFactor;
    let lineWidth = config.frameLineWidth;
    let safeZone = this.config.safeZone;

    let frameSize = config.tileSize * ratio - lineWidth / 2;
    let xPad = safeZone.paddingX + (xPadding ? xPadding : config.gridPaddingX);
    let yPad = safeZone.paddingY + (yPadding ? yPadding : config.gridPaddingY);
    let x = posX * config.tileSize * ratio * scale;
    let y = posY * config.tileSize * ratio * scale;

    frame.x = x;
    frame.y = y;

    return frame;
  }
}

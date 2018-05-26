import Factory from './Base/Factory';
export default class SpriteFactory extends Factory {
  makeFrame(x: number, y: number, paddingY = null, ratio = 1) {
    let settings = this.config.gridSettings;
    let size = settings.tileSize * ratio;
    let scale = settings.tileSize / settings.physicalTileSize * ratio;
    let padX = settings.gridPaddingX;
    let padY = paddingY ? paddingY : settings.gridPaddingY;
    return this.createSprite(x * size, y * size, 'frame', scale, padX, padY);
  }

  makeTile(x: number, y: number, id: string) {
    let gridSettings = this.config.gridSettings;
    let size = this.config.gridSettings.tileSize;
    let scale = this.config.gridSettings.tileScale;
    let padX = gridSettings.gridPaddingX + gridSettings.tilePadding;
    let padY = gridSettings.gridPaddingY + gridSettings.tilePadding;
    let sprite = this.createSprite(x * size, y * size, id, scale, padX, padY);
    this.game.physics.enable(sprite, Phaser.Physics.ARCADE);

    return sprite;
  }

  makeMenuTile(x: number, y: number, id: string, padY: number, ratio: number) {
    let size = this.config.gridSettings.tileSize * ratio;
    let scale = this.config.gridSettings.tileScale * ratio;
    let padX = this.config.gridSettings.gridPaddingX;
    return this.createSprite(x * size, y * size, id, scale, padX, padY);
  }

  updateTile(x: number, y: number, sprite: Phaser.Sprite) {
    let gridSettings = this.config.gridSettings;

    let size = this.config.gridSettings.tileSize;
    let scale = this.config.gridSettings.tileScale;
    let xPad = gridSettings.gridPaddingX + gridSettings.tilePadding;
    let yPad = gridSettings.gridPaddingY + gridSettings.tilePadding;

    let posX = x * size * this.config.scaleFactor;
    let posY = y * size * this.config.scaleFactor;

    let padX = this.config.safeZone.paddingX + xPad;
    let padY = this.config.safeZone.paddingY + yPad;

    sprite.position.x = posX + padX;
    sprite.position.y = posY + padY;

    return sprite;
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
}

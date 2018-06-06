import Factory from './Base/Factory';
export default class SpriteFactory extends Factory {
  makeFrame(x: number, y: number, paddingY = null, ratio = 1) {
    let settings = this.config.grid;
    let size = settings.tileSize * ratio;
    let padX = settings.gridPaddingX;
    let padY = paddingY ? paddingY : settings.gridPaddingY;
    let frame = this.createSprite(
      x * size,
      y * size,
      'frame',
      ratio,
      padX,
      padY
    );
    this.game.physics.enable(frame, Phaser.Physics.ARCADE);

    return frame;
  }

  makeTile(x: number, y: number, id: string) {
    let grid = this.config.grid;
    let size = this.config.grid.tileSize;
    let scale = this.config.grid.tileScale;
    let padX = grid.gridPaddingX;
    let padY = grid.gridPaddingY;
    let sprite = this.createSprite(x * size, y * size, id, scale, padX, padY);
    this.game.physics.enable(sprite, Phaser.Physics.ARCADE);

    return sprite;
  }

  makeMenuTile(x: number, y: number, id: string, padY: number, ratio: number) {
    ratio = ratio * 190 / 180;
    let size = this.config.grid.tileSize * ratio;
    let scale = this.config.grid.tileScale * ratio;
    let padX = 0;
    return this.createSprite(x * size, y * size, id, scale, padX, padY);
  }

  updateTile(x: number, y: number, sprite: Phaser.Sprite) {
    let grid = this.config.grid;

    let size = this.config.grid.tileSize;
    let scale = this.config.grid.tileScale;
    let xPad = grid.gridPaddingX;
    let yPad = grid.gridPaddingY;

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
    let xPad = config.safeZone.paddingX + this.config.grid.gridPaddingX;
    let yPad = config.safeZone.paddingY + this.config.grid.gridPaddingY;
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

  createVolumeIcon(posX = 600, posY = 1260) {
    let config = this.config.sound;
    let volId = config.volumeSprite + '-' + config.actualVolumeIndex;
    let sprite = this.createSprite(posX, posY, volId, 0.6);
    sprite.tint = Phaser.Color.hexToRGB(this.config.color.altText);

    sprite.inputEnabled = true;
    return sprite;
  }

  createBackground() {
    let safeZone = this.config.safeZone;
    let config = this.config;

    let x = safeZone.bgPaddingX;
    let y = safeZone.bgPaddingY + safeZone.paddingY;
    let sprite = this.game.add.sprite(x, y, 'witch');
    sprite.scale.setTo(config.scaleFactor, config.scaleFactor); 
  }
}

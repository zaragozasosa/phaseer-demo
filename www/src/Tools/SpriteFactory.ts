import Factory from './Factory';
export default class SpriteFactory extends Factory {
  makeTile(x: number, y: number, id: string) {
    let size = this.config.gridSettings.tileSize;
    let scale = this.config.gridSettings.tileScale;
    let padX = this.config.gridSettings.gridPaddingX;
    let padY = this.config.gridSettings.gridPaddingY;
    return this.createSprite(x * size, y * size, id, scale, padX, padY);
  }

  makeMenuTile(x: number, y: number, id: string, padY: number, ratio: number) {
    let size = this.config.gridSettings.tileSize * ratio;
    let scale = this.config.gridSettings.tileScale * ratio;
    let padX = this.config.gridSettings.gridPaddingX;
    return this.createSprite(x * size, y * size, id, scale, padX, padY);
  }

  updateTile(x: number, y: number, sprite: Phaser.Sprite) {
    let size = this.config.gridSettings.tileSize;
    let scale = this.config.gridSettings.tileScale;
    let xPad = this.config.gridSettings.gridPaddingX;
    let yPad = this.config.gridSettings.gridPaddingY;

    let posX = x * size * this.config.scaleFactor;
    let posY = y * size * this.config.scaleFactor;

    let padX = this.config.safeZone.paddingX + xPad;
    let padY = this.config.safeZone.paddingY + yPad;
    
    //sprite.body.moves = false;    

    sprite.position.x = posX + padX;
    sprite.position.y = posY + padY;
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
}

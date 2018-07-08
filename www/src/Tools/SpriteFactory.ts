import Factory from './Base/Factory';
export default class SpriteFactory extends Factory {
  makeFrame(x: number, y: number, modeScale = 1 ) {
    let settings = this.config.grid;
    let size = settings.tileSize * modeScale
    let padX = settings.gridPaddingX;
    let padY = settings.gridPaddingY;
    let frame = this.createSprite(
      x * size,
      y * size,
      'frame',
      modeScale,
      padX,
      padY
    );
    this.game.physics.enable(frame, Phaser.Physics.ARCADE);

    return frame;
  }

  makeTile(x: number, y: number, id: string, modeScale = 1) {
    let grid = this.config.grid;
    let size = this.config.grid.tileSize * modeScale;
    let scale = this.config.grid.tileScale * modeScale;
    let padX = grid.gridPaddingX;
    let padY = grid.gridPaddingY;
    let sprite = this.createSprite(x * size, y * size, id, scale, padX, padY);
    this.game.physics.enable(sprite, Phaser.Physics.ARCADE);

    return sprite;
  }

  makeMenuTile(
    x: number,
    y: number,
    id: string,
    padX: number,
    padY: number,
    ratio: number
  ) {
    let size = this.config.grid.tileSize * ratio;
    let scale = this.config.grid.tileScale * ratio;

    return this.createSprite(x * size, y * size, id, scale, padX, padY);
  }

  updateTile(x: number, y: number, sprite: Phaser.Sprite, modeScale = 1) {
    let grid = this.config.grid;

    let size = this.config.grid.tileSize * modeScale;
    let scale = this.config.grid.tileScale * modeScale;
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

  makeCentered(y: number, id: string, spriteScale = 1) {
    let config = this.config;
    let sprite = this.createSprite(0, y, id, spriteScale);

    let x = (this.config.safeZone.safeWidth - sprite.width) / 2;
    sprite.x = config.safeZone.paddingX + x;

    return sprite;
  }


  makeCenteredFromSpriteSheet(y: number, id: string, frame: number, spriteScale = 1) {
    let config = this.config;
    let sprite = this.createFromSpriteSheet(0, y, id, frame, spriteScale);

    let x = (this.config.safeZone.safeWidth - sprite.width) / 2;
    sprite.x = config.safeZone.paddingX + x;

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

  createFromSpriteSheet(
    posX: number,
    posY: number,
    id: string,
    frame = 1,
    scale = 1,
    padX = 0,
    padY = 0
  ) {
    let x = posX * this.config.scaleFactor;
    let y = posY * this.config.scaleFactor;

    let config = this.config;
    let xPad = config.safeZone.paddingX + padX;
    let yPad = config.safeZone.paddingY + padY;
    let sprite = this.game.add.sprite(x + xPad, y + yPad, id, frame);
    sprite.scale.setTo(config.scaleFactor * scale, config.scaleFactor * scale);

    return sprite;
  }

  createVolumeIcon(posX = 600, posY = 1260) {
    let config = this.config.sound;
    let volLevel =
      config.bgmVolume && config.sfxVolume ? 0 : config.bgmVolume ? 1 : 2;
    let volId = `${config.volumeSprite}-${volLevel}`;
    let sprite = this.createSprite(posX, posY, volId, 0.6);
    sprite.tint = Phaser.Color.hexToRGB(this.config.color.altText);

    sprite.inputEnabled = true;
    return sprite;
  }

  createBackground(key: string) {
    let safeZone = this.config.safeZone;
    let config = this.config;

    let x = 0;
    let y = safeZone.bgPaddingY;

    let sprite = this.createSprite(x, y, key);

    return sprite;
  }

  makeReverseTexture(key: string) {
    let bmd = this.game.make.bitmapData();
    bmd.load(key);
    bmd.processPixelRGB(pixel => {
      pixel.r = 255 - pixel.r;
      pixel.g = 255 - pixel.g;
      pixel.b = 255 - pixel.b;
      return pixel;
    });

    return bmd.canvas;
  }
}

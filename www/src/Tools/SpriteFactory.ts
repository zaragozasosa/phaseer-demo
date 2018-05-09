namespace MyGame {
  export class SpriteFactory {
    game: Phaser.Game;
    config: Config;

    constructor() {
      let singleton = Singleton.getInstance();
      this.game = singleton.game;
      this.config = singleton.config;
    }

    makeTile(x: number, y: number, id: string) {
			let size = this.config.tileSettings.tileSize;
			let scale = this.config.tileSettings.tileScale;
      return this.make(x * size, y * size, id, scale);
    }

    make(posX: number, posY: number, id: string, spriteScale = 1) {
      let x = posX * this.config.scaleFactor;
      let y = posY * this.config.scaleFactor;

      let config = this.config;
      let xPad =
        config.safeZone.paddingX + this.config.tileSettings.gridPaddingX;
      let yPad =
        config.safeZone.paddingY + this.config.tileSettings.gridPaddingY;
      let sprite = this.game.add.sprite(x + xPad, y + yPad, id);
      sprite.scale.setTo(
        config.scaleFactor * spriteScale,
        config.scaleFactor * spriteScale
      );

      return sprite;
    }
  }
}

namespace MyGame {
  export class SpriteFactory {
    private game: Phaser.Game;
    private config: Config;

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

    makeTileFrame(posX: number, posY: number) {
      let graphics = this.game.add.graphics(0, 0);
      let lineWidth = this.config.tileSettings.frameLineWidth;
      let frameSize = this.config.tileSettings.tileSize - lineWidth / 2;
      let color = this.config.tileSettings.lineColor;
      let xPad =
        this.config.safeZone.paddingX + this.config.tileSettings.gridPaddingX;
      let yPad =
        this.config.safeZone.paddingY + this.config.tileSettings.gridPaddingY;

      let x =
        posX * this.config.tileSettings.tileSize * this.config.scaleFactor +
        xPad;
      let y =
        posY * this.config.tileSettings.tileSize * this.config.scaleFactor +
        yPad;

      graphics.lineStyle(lineWidth, color, 1);
      let rect = graphics.drawRect(
        x,
        y,
        frameSize * this.config.scaleFactor,
        frameSize * this.config.scaleFactor
      );
      this.game.physics.enable(rect, Phaser.Physics.ARCADE);

      return rect;
    }
  }
}

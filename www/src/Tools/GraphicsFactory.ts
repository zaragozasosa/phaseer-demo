namespace MyGame {
  export class GraphicsFactory {
    private game: Phaser.Game;
    private config: Config;

    constructor() {
      let singleton = Singleton.getInstance();
      this.game = singleton.game;
      this.config = singleton.config;
    }

    makeWall(x: number, y: number, long: number, tall: number): Phaser.Sprite {
      let game = this.game;
      let config = this.config;
      let scale = config.scaleFactor;

      let xPad =
        x * config.scaleFactor +
        config.safeZone.paddingX +
        config.tileSettings.gridPaddingX;
      let yPad =
        y * config.scaleFactor +
        config.safeZone.paddingY +
        config.tileSettings.gridPaddingY;

      let wall = this.game.add.sprite(xPad, yPad);
      this.game.physics.enable(wall, Phaser.Physics.ARCADE);
      wall.body.setSize(long * config.scaleFactor, tall * config.scaleFactor);
      wall.body.immovable = true;

      return wall;
    }

    drawGridRect() {
      let config = this.config;
      let xPad = config.safeZone.paddingX + config.tileSettings.gridPaddingX;
      let yPad = config.safeZone.paddingY + config.tileSettings.gridPaddingY;
      let graphics = this.game.add.graphics(0, 0);
      let wallLength = config.tileSettings.tileSize * 4 * config.scaleFactor;

      graphics.lineStyle(0);
      graphics.beginFill(0x66ccff, 1);
      graphics.drawRect(xPad, yPad, wallLength, wallLength);
      graphics.endFill();
    }
  }
}

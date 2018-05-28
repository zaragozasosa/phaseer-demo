import Factory from './Base/Factory';
export default class GraphicsFactory extends Factory {
  makeWall(x: number, y: number, long: number, tall: number): Phaser.Sprite {
    let game = this.game;
    let config = this.config;
    let scale = config.scaleFactor;

    let xPad =
      (x - 5) * config.scaleFactor +
      config.safeZone.paddingX +
      config.grid.gridPaddingX;
    let yPad =
      (y - 5) * config.scaleFactor +
      config.safeZone.paddingY +
      config.grid.gridPaddingY;

    let wall = this.game.add.sprite(xPad, yPad);
    this.game.physics.enable(wall, Phaser.Physics.ARCADE);

    wall.width = long * config.scaleFactor;
    wall.height = tall * config.scaleFactor;
    wall.body.setSize(
      (long + 20) * config.scaleFactor,
      (tall + 20) * config.scaleFactor
    );
    wall.body.immovable = true;

    return wall;
  }

  drawGridRect() {
    // let config = this.config;
    // let xPad = config.safeZone.paddingX + config.grid.gridPaddingX;
    // let yPad = config.safeZone.paddingY + config.grid.gridPaddingY;
    // let graphics = this.game.add.graphics(0, 0);
    // let wallLength = config.grid.tileSize * 4 * config.scaleFactor;
    // graphics.lineStyle(0);
    // graphics.beginFill(
    //   Phaser.Color.hexToRGB(this.config.color.altText),
    //   1
    // );
    // graphics.drawRect(xPad, yPad, wallLength, wallLength);
    // graphics.endFill();
  }

  addBackground() {
    let safeZone = this.config.safeZone;
    let color = this.config.color;
    let xPad = safeZone.paddingX;
    let yPad = safeZone.paddingY;
    var graphics = this.game.add.graphics(0, 0);
    graphics.lineStyle(0);
    graphics.beginFill(Phaser.Color.hexToRGB(color.background), 1);
    graphics.drawRect(xPad, yPad, safeZone.safeWidth, safeZone.safeHeight);
    graphics.endFill();
  }
}

import Factory from './Factory';
export default class GraphicsFactory extends Factory {

  makeWall(x: number, y: number, long: number, tall: number): Phaser.Sprite {
    let game = this.game;
    let config = this.config;
    let scale = config.scaleFactor;

    let xPad =
      x * config.scaleFactor +
      config.safeZone.paddingX +
      config.gridSettings.gridPaddingX;
    let yPad =
      y * config.scaleFactor +
      config.safeZone.paddingY +
      config.gridSettings.gridPaddingY;

    let wall = this.game.add.sprite(xPad, yPad);
    this.game.physics.enable(wall, Phaser.Physics.ARCADE);
    wall.body.setSize(long * config.scaleFactor, tall * config.scaleFactor);
    wall.body.immovable = true;

    return wall;
  }

  drawGridRect() {
    // let config = this.config;
    // let xPad = config.safeZone.paddingX + config.gridSettings.gridPaddingX;
    // let yPad = config.safeZone.paddingY + config.gridSettings.gridPaddingY;
    // let graphics = this.game.add.graphics(0, 0);
    // let wallLength = config.gridSettings.tileSize * 4 * config.scaleFactor;
    // graphics.lineStyle(0);
    // graphics.beginFill(
    //   Phaser.Color.hexToRGB(this.config.colorSettings.altText),
    //   1
    // );
    // graphics.drawRect(xPad, yPad, wallLength, wallLength);
    // graphics.endFill();
  }
  

  addBackground() {
    let safeZone = this.config.safeZone;
    let colorSettings = this.config.colorSettings;
    let xPad = safeZone.paddingX;
    let yPad = safeZone.paddingY;
    var graphics = this.game.add.graphics(0, 0);
    graphics.lineStyle(0);
    graphics.beginFill(Phaser.Color.hexToRGB(colorSettings.background), 1);
    graphics.drawRect(xPad, yPad, safeZone.safeWidth, safeZone.safeHeight);
    graphics.endFill();
  }
}

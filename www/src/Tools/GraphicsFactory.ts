import Factory from './Base/Factory';
import { ColorSettings } from './../Config/Config';
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

  addBackground(color = ColorSettings.BACKGROUND, alpha = 1) {
    let safeZone = this.config.safeZone;
    let colorString = this.getColor(color);
    let xPad = safeZone.bgPaddingX;
    let yPad = safeZone.bgPaddingY;
    var graphics = this.game.add.graphics(0, 0);
    graphics.lineStyle(0);
    graphics.beginFill(Phaser.Color.hexToRGB(colorString), alpha);
    graphics.drawRect(xPad, yPad, safeZone.bgWidth, safeZone.bgHeight);
    return graphics.endFill();
  }

  addWindowBackground(alpha: number) {
    return this.addBackground(ColorSettings.BLACK, alpha);
  }

  makeRect(
    x: number,
    y: number,
    length: number,
    height: number,
    lineWidth = 0
  ) {
    let safeZone = this.config.safeZone;
    let config = this.config;
    let color = this.config.color;
    let posX = safeZone.paddingX + x;
    let posY = safeZone.paddingY + y;
    var graphics = this.game.add.graphics(0, 0);
    graphics.lineStyle(lineWidth * config.scaleFactor, Phaser.Color.BLACK);
    graphics.beginFill(Phaser.Color.hexToRGB(color.background), 1);
    let rect = graphics.drawRect(posX, posY, length, height);
    graphics.endFill();

    return rect;
  }

  makeWindowRect(x = null, y = null, w = null, h = null, line = null) {
    let win = this.config.window;
    if (x && y && w && h && w && line) {
      return this.makeRect(x, y, w, h, line);
    } else {
      return this.makeRect(
        win.defaultX,
        win.defaultY,
        win.defaultWidth,
        win.defaultHeight,
        win.defaultLineWidth
      );
    }
  }
}

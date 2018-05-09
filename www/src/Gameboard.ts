namespace MyGame {
  export class Gameboard {
    private game: Phaser.Game;
    private config: Config;
    private grid: Grid;
    private textFactory: TextFactory;

    debugArray: Array<Phaser.Text>;
    header: Phaser.Text;
    points: number;
    movements: number;

    constructor() {
      let singleton = Singleton.getInstance();
      this.game = singleton.game;
      this.config = singleton.config;
      this.textFactory = new TextFactory();

      this.addBackground();

      this.grid = new Grid(
        function() {
          this.updateScore();
        }.bind(this)
      );

      this.movements = 0;
      this.points = this.grid.tilesArray.calculateSum();
      this.addHeader();
      this.addDebuggingMatrix();
    }

    update() {
      this.grid.update();
    }

    addBackground() {
      let game = this.game;
      let config = this.config;
      let xPad = config.safeZone.paddingX;
      let yPad = config.safeZone.paddingY;
      var graphics = this.game.add.graphics(0, 0);

      graphics.lineStyle(0);
      graphics.beginFill(0xe7e5df, 1);
      graphics.drawRect(
        xPad,
        yPad,
        config.safeZone.safeWidth,
        config.safeZone.safeHeight
      );
      graphics.endFill();
    }

    addHeader() {
      this.header = this.textFactory.makeStroked(20, 80, '', 50);
      this.updateHeader();
    }

    addPowerButton() {
      let posX = this.config.safeZone.paddingX + 250 * this.config.scaleFactor;
      let posY = this.config.safeZone.paddingY + 1200 * this.config.scaleFactor;

      let button = this.game.add.button(
        posX,
        posY,
        'button',
        null,
        this,
        1,
        0,
        2
      );
      button.scale.setTo(this.config.scaleFactor, this.config.scaleFactor);
    }

    addDebuggingMatrix() {
      let posX = 250;
      let posY = 1300;

      this.debugArray = [];

      this.debugArray.push(
        this.textFactory.makeStroked(posX, posY, '', 30, true)
      );
      this.debugArray.push(
        this.textFactory.makeStroked(posX + 150, posY, '', 30, true)
      );
      this.debugArray.push(
        this.textFactory.makeStroked(posX + 300, posY, '', 30, true)
      );
      this.debugArray.push(
        this.textFactory.makeStroked(posX + 450, posY, '', 30, true)
      );

      this.updateDebuggingMatrix();
    }

    updateScore() {
      this.movements++;
      this.points = this.grid.tilesArray.calculateSum();
      this.updateHeader();
      this.updateDebuggingMatrix();
    }

    updateDebuggingMatrix() {
      this.debugArray.forEach(
        function(text: any, index: number) {
          text.setText(
            `${this.grid.tilesArray.get(index, 0)}\n${this.grid.tilesArray.get(
              index,
              1
            )}\n${this.grid.tilesArray.get(
              index,
              2
            )}\n${this.grid.tilesArray.get(index, 3)}`
          );
        }.bind(this)
      );
    }

    updateHeader() {
      this.header.setText(
        `Score: ${this.points}     Movements: ${this.movements}`
      );
    }
  }
}

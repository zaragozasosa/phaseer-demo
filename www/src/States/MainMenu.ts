namespace MyGame {
  export class MainMenu extends Phaser.State {

    config: Config;
    gameboard: Gameboard;

    create() {
      this.config = Singleton.getInstance().config;
      this.gameboard = new Gameboard(this.game, this.config);
    }

    update() {
      this.gameboard.update();
    }
  }
}

namespace MyGame {
  export class MainMenu extends Phaser.State {
    gameboard: Gameboard;

    create() {
      this.gameboard = new Gameboard();
    }

    update() {
      this.gameboard.update();
    }
  }
}

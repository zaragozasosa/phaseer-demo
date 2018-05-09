namespace MyGame {
  export class MainMenu extends Phaser.State {
    private gameboard: Gameboard;

    create() {
      this.gameboard = new Gameboard();
    }

    update() {
      this.gameboard.update();
    }
  }
}

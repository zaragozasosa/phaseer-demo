import Gameboard from '../Gameboard';
export default class Unranked extends Phaser.State {
  private gameboard: Gameboard;

  create() {
    this.gameboard = new Gameboard();
  }
  

  update() {
    this.gameboard.update();
  }
}

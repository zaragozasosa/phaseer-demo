import Gameboard from '../Gameboard';
import GameboardConfig from './../Objects/GameboardConfig';

export default class Unranked extends Phaser.State {
  private gameboard: Gameboard;

  init(gameboardConfig: GameboardConfig) {
    this.gameboard = new Gameboard(gameboardConfig);
  }

  update() {
    this.gameboard.update();
  }
}

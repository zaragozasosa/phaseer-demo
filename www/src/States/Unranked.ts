import Gameboard from '../Objects/Gameboard/Gameboard';
import GameboardFactory from '../Objects/Gameboard/GameboardFactory';
import GameboardConfig from './../Config/GameboardConfig';

export default class Unranked extends Phaser.State {
  private gameboard: Gameboard;

  init(gameboardConfig: GameboardConfig) {
    this.gameboard = GameboardFactory.create(gameboardConfig);
  }

  update() {
    this.gameboard.update();
  }
}

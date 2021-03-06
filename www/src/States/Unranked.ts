import Gameboard from '../Objects/Gameboard/Gameboard';
import GameboardFactory from '../Objects/Gameboard/Factories/GameboardFactory';
import GameboardConfig from './../Config/GameboardConfig';
import SimpleGameUI from '../Objects/Gameboard/GameUI/SimpleGameUI';

export default class Unranked extends Phaser.State {
  private gameboard: Gameboard;

  init(gameboardConfig: GameboardConfig) {
    this.gameboard = GameboardFactory.create(gameboardConfig, new SimpleGameUI(gameboardConfig));
    this.gameboard.start();
  }

  update() {
    this.gameboard.update();
  }
}

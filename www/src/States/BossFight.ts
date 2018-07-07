import Gameboard from '../Objects/Gameboard/Gameboard';
import GameboardFactory from '../Objects/Gameboard/GameboardFactory';
import BossGameUI from '../Objects/Gameboard/GameUI/BossGameUI';
import GameboardConfig from './../Config/GameboardConfig';

export default class BossFight extends Phaser.State {
  private gameboard: Gameboard;

  init(gameboardConfig: GameboardConfig) {
    this.gameboard = GameboardFactory.create(gameboardConfig, new BossGameUI(gameboardConfig));
    this.gameboard.start();
  }

  update() {
    this.gameboard.update();
  }
}

import Gameboard from '../Objects/Gameboard/Gameboard';
import GameboardFactory from '../Objects/Gameboard/GameboardFactory';
import GameboardConfig from './../Config/GameboardConfig';

export default class Unranked extends Phaser.State {
  private gameboard: Gameboard;

  init(gameboardConfig: GameboardConfig) {
    this.gameboard = GameboardFactory.create(gameboardConfig);

    this.game.time.events.add(
      50,
      function() {
        this.gameboard.start();
      }.bind(this)
    );

  }

  update() {
    this.gameboard.update();
  }
}

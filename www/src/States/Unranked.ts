import Gameboard from './../Objects/Gameboard';
import GameboardFactory from './../Objects/GameboardFactory';
import GameboardConfig from './../Config/GameboardConfig';

export default class Unranked extends Phaser.State {
  private gameboard: Gameboard;

  init(gameboardConfig: GameboardConfig) {
    gameboardConfig.quitSignal.add(function() {
      this.game.state.start('MainMenu', true, false);      
    }.bind(this));
    this.gameboard = GameboardFactory.create(gameboardConfig);
  }

  update() {
    this.gameboard.update();
  }
}

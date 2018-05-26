import { GameInstance, Config } from './../../Config/Config';

export default class Factory {
  protected game: Phaser.Game;
  protected config: Config;

  constructor(config) {
    this.game = GameInstance.get().game;
    this.config = config;
  }
}

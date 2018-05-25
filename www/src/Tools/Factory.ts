import { Config, Singleton } from '../Config';

export default class Factory {
  protected game: Phaser.Game;
  protected config: Config;

  constructor() {
    let singleton = Singleton.getInstance();
    this.game = singleton.game;
    this.config = singleton.config;
  }
}

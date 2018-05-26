import { Config, Singleton, Tools } from './Config/Config';

export default class Base {
  protected game: Phaser.Game;
	protected config: Config;
	protected tools: Tools;

  constructor() {
    let singleton = Singleton.get();
    this.game = singleton.game;
		this.config = singleton.config;
		this.tools = singleton.tools;
  }
}

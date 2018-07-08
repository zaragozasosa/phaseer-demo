import { Singleton, Tools } from './../Config/Config';
import GameboardConfig from './../Config/GameboardConfig';
import MainMenuLoader from './../Loaders/MainMenuLoader';
import SpritesLoader from './../Loaders/SpritesLoader';

export default class Preloader extends Phaser.State {
  preloadBar: Phaser.Sprite;
  tools: Tools;
  gameboardConfig: GameboardConfig;

  preload() {
    let singleton = Singleton.get();
    let tools = singleton.tools;
    this.tools = tools;
    tools.graphic.addBackground();    

    this.gameboardConfig = new GameboardConfig();
    this.preloadBar = tools.sprite.makeCentered(600, 'preloadBar', 2);
    this.load.setPreloadSprite(this.preloadBar);

    let loader = new SpritesLoader();
    loader.loadResources(this.load, this.gameboardConfig);
  }

  create() {
    this.tools.transition.toLoaderConfig('MainMenu', this.gameboardConfig, new MainMenuLoader());
  }
}

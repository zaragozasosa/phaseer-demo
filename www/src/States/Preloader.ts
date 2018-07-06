import { Singleton, Tools } from './../Config/Config';
import GameboardConfig from './../Config/GameboardConfig';
import MainMenuLoader from './../Loaders/MainMenuLoader';

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

    for (let sprite of this.gameboardConfig.tiles) {
      let path = `assets/images/${sprite.imagePath}`;
      let specialPath = `assets/images/${sprite.specialImagePath}`;

      this.load.image(sprite.id, path);
      this.load.image(sprite.specialId, specialPath);
    }
  }

  create() {
    this.tools.transition.toLoaderConfig('MainMenu', this.gameboardConfig, new MainMenuLoader());
  }
}

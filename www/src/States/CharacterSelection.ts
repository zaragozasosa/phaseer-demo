import GameboardConfig from './../Config/GameboardConfig';
import InputManager from './../InputManager';
import TileModel from './../Models/TileModel';
import CharacterMenu from './../Objects/CharacterMenu/CharacterMenu';
import { Config, Singleton, ColorSettings, Tools } from './../Config/Config';
import GameLoader from './../Loaders/GameLoader';

export default class CharacterSelection extends Phaser.State {
  game: Phaser.Game;
  tools: Tools;
  gameboardConfig: GameboardConfig;
  inputManager: InputManager;
  preloadBar: Phaser.Sprite;
  characterMenu: CharacterMenu;

  init(gameboardConfig: GameboardConfig) {
    this.gameboardConfig = gameboardConfig;
  }

  preload() {
    let singleton = Singleton.get();
    let config = singleton.config;
    this.tools = singleton.tools;
    this.tools.audio.playIfSilent('title-bgm', true);
    this.inputManager = new InputManager(config);
  }

  create() {
    this.tools.graphic.addBackground();
    this.characterMenu = new CharacterMenu(this.gameboardConfig);

    this.tools.button.make(
      630,
      1275,
      ['start'],
      function () {
        this.gameStart();
      }.bind(this),
      1.2
    );

    let returnToMainMenu = this.tools.text.makeStroked(30, 1290, 'Return', 50);
    returnToMainMenu.inputEnabled = true;
    returnToMainMenu.events.onInputDown.addOnce(this.returnToMainMenu, this);
  }

  update() {
    if (this.inputManager.checkEnter()) {
      this.gameStart();
    }
    if (this.inputManager.checkEscape()) {
      this.returnToMainMenu();
    }
    this.characterMenu.update(this.inputManager.checkCursor());
  }

  gameStart() {
    let selected = this.gameboardConfig.getTileModel(
      this.characterMenu.selectedId
    );
    this.gameboardConfig.mainTile = selected;
    this.tools.audio.playCharacterSound(selected);

    let nextState = this.gameboardConfig.playStory ? 'Story' : 'GameboardLoader';

    if (nextState === 'Story') {
      this.tools.transition.toLoaderConfig(
        nextState,
        this.gameboardConfig,
      );
    } else {
      this.tools.transition.toLoaderConfig(
        nextState,
        this.gameboardConfig,
        new GameLoader()
      );
    }
  }

  returnToMainMenu() {
    this.tools.transition.smoothLoaderConfig('MainMenu', this.gameboardConfig, null);
  }
}

import GameboardConfig from './../Config/GameboardConfig';
import InputManager from './../InputManager';
import TileModel from './../Models/TileModel';
import CharacterMenu from './../Objects/CharacterMenu/CharacterMenu';
import { Config, Singleton, ColorSettings, Tools } from './../Config/Config';

export default class CharacterSelection extends Phaser.State {
  game: Phaser.Game;
  tools: Tools;
  gameboardConfig: GameboardConfig;
  inputManager: InputManager;
  preloadBar: Phaser.Sprite;
  characterMenu: CharacterMenu;

  preload() {
    let singleton = Singleton.get();
    let config = singleton.config;
    this.tools = singleton.tools;

    this.gameboardConfig = new GameboardConfig();
    this.inputManager = new InputManager(config);

    for (let sprite of this.gameboardConfig.tiles) {
      let path = `assets/images/${sprite.imagePath}`;
      let specialPath = `assets/images/${sprite.specialImagePath}`;
      let sfx = `assets/sfx/${sprite.sfxRoute}`;

      this.load.image(sprite.id, path);
      this.load.image(sprite.specialId, specialPath);
      this.load.audio(sprite.sfxLabel, [sfx]);
    }

    this.load.image('random', 'assets/images/tiles/random.png');
    this.preloadBar = this.tools.sprite.makeCentered(600, 'preloadBar', 2);
    this.load.setPreloadSprite(this.preloadBar);
  }

  create() {
    this.preloadBar.destroy();
    this.tools.graphic.addBackground();
    this.characterMenu = new CharacterMenu(this.gameboardConfig);

    this.tools.button.make(
      675,
      1300,
      ['start-1', 'start-2', 'start-3'],
      function() {
        this.gameStart();
      }.bind(this),
      1.8
    );

    let returnToMainMenu = this.tools.text.makeStroked(30, 1300, 'Return', 50);
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
    let selected = this.gameboardConfig.getTileModel(this.characterMenu.selectedId);
    this.gameboardConfig.mainTile = selected;
    this.tools.audio.playCharacterSound(selected);
    this.state.start('Story', true, false, this.gameboardConfig);
  }

  returnToMainMenu() {
    this.state.start('Boot');    
  }
}

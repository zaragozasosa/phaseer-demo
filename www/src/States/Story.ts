import InputManager from './../InputManager';
import { Singleton } from './../Config/Config';
import Reader from './../Objects/Storyboard/Reader'
import TwoSpritesReader from './../Objects/Storyboard/TwoSpritesReader'

import GameboardConfig from './../Config/GameboardConfig'

export default class Story extends Phaser.State {
  private cursor: InputManager;
  private reader: TwoSpritesReader;
  private gameboardConfig: GameboardConfig;

  init(gameboardConfig: GameboardConfig) {
    this.gameboardConfig = gameboardConfig;
  }

  create() {
    let config = Singleton.get().config;
    let tools = Singleton.get().tools;
    this.cursor = new InputManager(config);
    tools.graphic.addBackground();

    let list = this.gameboardConfig.mainTile.getFirstStory();
    this.reader = new TwoSpritesReader(list, function () {
      this.continue();
    }.bind(this));
    this.reader.start();

    let skip = tools.text.make(700, 1200, 'Skip', 50);
    skip.inputEnabled = true;
    skip.events.onInputDown.addOnce(function() {
      this.continue();
    }.bind(this))
  }

  update() {
    if (this.cursor.checkClick()) {
      this.reader.playNextAction();
    }

    if (this.cursor.checkEnter()) {
      this.reader.playNextAction();
    }

    if (this.cursor.checkEscape()) {
      this.continue();
    }
  }

  continue() {
    this.state.start('GameboardLoader', true, false, this.gameboardConfig);    
  }
}

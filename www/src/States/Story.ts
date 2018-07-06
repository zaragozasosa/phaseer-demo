import InputManager from './../InputManager';
import { Singleton, Tools } from './../Config/Config';
import Reader from './../Objects/Storyboard/Reader';
import TwoSpritesReader from './../Objects/Storyboard/TwoSpritesReader';

import GameboardConfig from './../Config/GameboardConfig';

export default class Story extends Phaser.State {
  private cursor: InputManager;
  private reader: TwoSpritesReader;
  private gameboardConfig: GameboardConfig;
  private isFirstStory: boolean;
  private tools: Tools;

  init(gameboardConfig: GameboardConfig, isFirstStory = true) {
    this.gameboardConfig = gameboardConfig;
    this.isFirstStory = isFirstStory;
  }

  create() {
    let config = Singleton.get().config;
    let tools = Singleton.get().tools;
    this.tools = tools;
    this.cursor = new InputManager(config);
    tools.graphic.addBackground();

    let list = this.isFirstStory
      ? this.gameboardConfig.mainTile.getFirstStory()
      : this.gameboardConfig.mainTile.getSecondStory();
    this.reader = new TwoSpritesReader(
      list,
      function() {
        this.continue();
      }.bind(this)
    );
    this.reader.start();

    let skip = tools.text.makeStroked(680, 1250, 'Skip', 90);
    skip.inputEnabled = true;
    skip.events.onInputDown.addOnce(
      function() {
        this.continue();
      }.bind(this)
    );
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
    if (this.isFirstStory) {
      this.tools.misc.hardTransition(
        this.gameboardConfig,
        'GameboardLoader',
        this.tools.audio,
        this.gameboardConfig
      );
    } else {
      this.tools.audio.stopBgm();
      this.tools.misc.hardTransition(
        this.gameboardConfig,
        'Boot',
        this.tools.audio
      );
    }
  }
}

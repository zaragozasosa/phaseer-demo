import InputManager from './../InputManager';
import { Singleton, ColorSettings, Config } from './../Config/Config';

import MenuList from './../Objects/Menu/MenuList';
import MenuObject from './../Objects/Menu/MenuObject';
import Menu from './../Objects/Menu/Menu';

export default class MainMenu extends Phaser.State {
  private cursor: InputManager;
  private started: boolean;
  private menu: Menu;
  private startText: Phaser.Text;
  private config: Config;
  private logoPlaceholder: Phaser.Text;

  create() {
    this.config = Singleton.get().config;
    let tools = Singleton.get().tools;
    this.cursor = new InputManager(this.config);
    this.started = false;
    tools.graphic.addBackground();
    tools.audio.play('title-bgm', true);

    let menuList = new MenuList('Menu');
    menuList.addChild(
      new MenuObject(
        'Start game',
        function() {
          this.menu.destroy();
          this.game.state.start('CharacterSelection');
        }.bind(this)
      )
    );

    menuList.addChild(
      new MenuObject(
        'Project site',
        function() {
          window.location.href = 'https://github.com/zaragozasosa/phaseer-demo';
        }.bind(this)
      )
    );

    let options = new MenuList('Options');

    options.addChild(tools.audio.makeVolumeMenuOption());

    menuList.addChild(options);
    this.menu = new Menu(menuList);

    this.startText = tools.text.makeXBounded(
      700,
      'Click to start',
      70,
      'center',
      ColorSettings.TEXT
    );

    this.logoPlaceholder = tools.text.makeXBounded(
      350,
      'Logo goes here',
      80,
      'center',
      ColorSettings.PRIMARY
    );

  }

  update() {
    if (!this.started) {
      if (this.cursor.checkClick() || this.cursor.checkKeys()) {
        this.menu.show();
        this.started = true;
        this.startText.destroy();
      }
    } else {
      let cursor = this.cursor.checkCursor();
      if (cursor) {
        this.config.storyboard.menuInputSignal.dispatch(cursor);
      }

      let enter = this.cursor.checkEnter();
      if (enter) {
        this.config.storyboard.menuInputSignal.dispatch(Phaser.Keyboard.ENTER);
      }

      let escape = this.cursor.checkEscape();
      if (escape) {
        this.config.storyboard.menuInputSignal.dispatch(Phaser.Keyboard.ESC);
      }
    }
  }
}

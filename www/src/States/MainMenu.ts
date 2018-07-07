import InputManager from './../InputManager';
import { Singleton, ColorSettings, Config } from './../Config/Config';
import GameboardConfig from './../Config/GameboardConfig';
import CharacterSelectionLoader from './../Loaders/CharacterSelectionLoader';
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
  private gameboardConfig: GameboardConfig;

  init(gameboardConfig: GameboardConfig) {
    this.gameboardConfig = gameboardConfig;
  }

  create() {
    this.config = Singleton.get().config;
    let tools = Singleton.get().tools;
    this.cursor = new InputManager(this.config);
    this.started = false;
    tools.graphic.addBackground();
    // tools.audio.playNormal('test-bgm', true);
         tools.audio.playNormal('title-bgm', true);

    // tools.audio.playIfSilent('title-bgm', true);

    let loader = new CharacterSelectionLoader(this.gameboardConfig.tiles);

    let menuList = new MenuList('Menu');
    menuList.addChild(
      new MenuObject(
        'Story mode',
        function() {
          this.menu.destroy();
          tools.transition.smoothLoaderConfig(
            'CharacterSelection',
            this.gameboardConfig,
            loader
          );
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

    let startText = tools.text.makeXBounded(
      700,
      'Press any key!',
      60,
      'center',
      ColorSettings.TEXT
    );

    tools.tween.blinkStart(startText);
    this.startText = startText;
    this.logoPlaceholder = tools.text.makeXBounded(
      100,
      'Logo goes here',
      80,
      'center',
      ColorSettings.PRIMARY
    );

    this.logoPlaceholder.alpha = 0.5;

    tools.tween.moveY(
      this.logoPlaceholder,
      350,
      5000,
      true,
      Phaser.Easing.Cubic.Out,
      { alpha: 1 }
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

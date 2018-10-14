import { Singleton, Config, Tools, ColorSettings } from './../Config/Config';
import GameboardConfig from './../Config/GameboardConfig';
import InfoWindow from './../Objects/Windows/InfoWindow';
import InputManager from './../InputManager';

export default class GameboardLoader extends Phaser.State {
  preloadBar: Phaser.Sprite;
  gameboardConfig: GameboardConfig;
  private cursor: InputManager;
  private tools: Tools;
  init(gameboardConfig: GameboardConfig) {
    this.gameboardConfig = gameboardConfig;
  }

  create() {
    let singleton = Singleton.get();
    this.tools = singleton.tools;
    this.cursor = new InputManager(Singleton.get().config);
    if (
      this.gameboardConfig.gameMode === GameboardConfig.GAME_MODE_SINGLE_PLAYER
    ) {
      this.tools.audio.play('game-bgm', true);
    } else {
      this.tools.audio.play('boss-bgm', true);
    }

    let window = new InfoWindow(this.gameboardConfig.mainTile);
    window.show();

    let press = this.tools.text.makeXBounded(
      850,
      'Press any key to continue.',
      50,
      'center',
      ColorSettings.PRIMARY
    );

    this.tools.tween.blinkStart(press);
  }

  update() {
    if (this.cursor.checkClick() || this.cursor.checkKeys()) {
      if (
        this.gameboardConfig.gameMode ===
        GameboardConfig.GAME_MODE_SINGLE_PLAYER
      ) {
        this.tools.transition.changeState('Unranked', this.gameboardConfig);
      } else {
        this.tools.transition.changeState('BossFight', this.gameboardConfig);
      }
    }
  }
}

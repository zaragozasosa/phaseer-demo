import InputManager from './../InputManager';
import { Singleton, ColorSettings } from './../Config/Config';
export default class MainMenu extends Phaser.State {
  private cursor: InputManager;

  create() {
    let config = Singleton.get().config;
    let tools = Singleton.get().tools;
    this.cursor = new InputManager(config);
    tools.graphic.addBackground();
    
    tools.audio.play('bgm', true);

    tools.text.makeXBounded(600, 'Click to start', 70, 'center', ColorSettings.TEXT);
  }

  update() {
    if (this.game.input.activePointer.isDown) {
      this.game.state.start('CharacterSelection');
    }

    if(this.cursor.checkKeys()) {
      this.game.state.start('CharacterSelection');      
    }
  }
}

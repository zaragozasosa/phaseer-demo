import SpriteFactory from './../Tools/SpriteFactory';
import TextFactory from './../Tools/TextFactory';
import InputManager from './../InputManager';
import { Singleton } from './../Config/Config';
export default class MainMenu extends Phaser.State {
  private spriteFactory: SpriteFactory;
  private textFactory: TextFactory;
  private cursor: InputManager;

  create() {
    let config = Singleton.get().config;
    this.spriteFactory = new SpriteFactory(config);
    this.textFactory = new TextFactory(config);
    this.cursor = new InputManager(config);

    let music = this.game.add.audio('bgm');
    music.play('', 0, 0.5, true);

    this.spriteFactory.makeCentered(100, 'title', 0.8);
    this.textFactory.makeXBounded(900, 'Click to start', 50, 'center', true);
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

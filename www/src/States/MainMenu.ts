import SpriteFactory from './../Tools/SpriteFactory';
import TextFactory from './../Tools/TextFactory';
import AudioFactory from './../Tools/AudioFactory';
import InputManager from './../InputManager';
import { Singleton } from './../Config/Config';
export default class MainMenu extends Phaser.State {
  private audioFactory: AudioFactory;
  private spriteFactory: SpriteFactory;
  private textFactory: TextFactory;
  private cursor: InputManager;

  create() {
    let config = Singleton.get().config;
    this.spriteFactory = new SpriteFactory(config);
    this.textFactory = new TextFactory(config);
    this.cursor = new InputManager(config);
    this.audioFactory = new AudioFactory(config);

    this.audioFactory.play('bgm');

    // this.spriteFactory.makeCentered(100, 'title', 0.8);
    this.textFactory.makeXBounded(600, 'Click to start', 70, 'center', true);
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

import SpriteFactory from './../Tools/SpriteFactory';
import TextFactory from './../Tools/TextFactory';
import InputManager from './../Tools/InputManager';
export default class MainMenu extends Phaser.State {
  private spriteFactory: SpriteFactory;
  private textFactory: TextFactory;
  private cursor: InputManager;

  create() {
    this.spriteFactory = new SpriteFactory();
    this.textFactory = new TextFactory();
    this.cursor = new InputManager();

    let music = this.game.add.audio('bgm');
    music.play('', 0, 0.5, true);

    this.spriteFactory.makeCentered(100, 'title', 0.8);
    this.textFactory.makeHorizontalCentered(900, 'Click to start', 50);
  }

  update() {
    if (this.game.input.activePointer.justReleased(150)) {
      this.game.state.start('Unranked');
    }

    // if(this.cursor.checkKeys()) {
    //   this.game.state.start('Unranked');      
    // }
  }
}

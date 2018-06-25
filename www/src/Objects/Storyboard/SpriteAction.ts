import BaseAction from './BaseAction';
import Reader from './Reader';
import SpriteActionModel from './SpriteActionModel';

export default class SpriteAction extends BaseAction {
  private text: Phaser.Text;
  private id: string;
  private frame: number;
  private position: number;
  private tint: number;


  constructor(parameters) {
    super(Reader.SPRITE_ACTION, parameters);
    this.isFinished = true;
    this.id = this.parameters[0];
    this.frame = parseInt(this.parameters[1]);
    this.position = this.parameters[2] === 'right' ? Reader.SPRITE_RIGHT : this.parameters[2] === 'left' ? Reader.SPRITE_LEFT : Reader.SPRITE_BOTH;
    this.tint = this.parameters[3] ? Phaser.Color.BLACK : Phaser.Color.WHITE;
  }

  play() {
    this.config.storyboard.storyboardSignal.dispatch(Reader.SPRITE_ACTION, new SpriteActionModel(this.id, this.frame, this.position, this.tint));
    this.actionIsOverSignal.dispatch();
  }

}

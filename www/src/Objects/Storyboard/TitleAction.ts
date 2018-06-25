import BaseAction from './BaseAction';
import Reader from './Reader';
import SpriteActionModel from './SpriteActionModel';

export default class TitleAction extends BaseAction {
  private name: string;
  private position: number;
  private oppositeDirection: number;


  constructor(parameters) {
    super(Reader.SPRITE_ACTION, parameters);
    this.isFinished = true;
    this.name = this.parameters[0];
    this.position = this.parameters[1] === 'right' ? Reader.SPRITE_RIGHT : Reader.SPRITE_LEFT;
    this.oppositeDirection = this.parameters[1] === 'left' ? Reader.SPRITE_RIGHT : Reader.SPRITE_LEFT;
  }

  play() {
    this.config.storyboard.storyboardSignal.dispatch(Reader.TITLE_ACTION, this.name + ':');
    this.config.storyboard.storyboardSignal.dispatch(Reader.SPRITE_ACTION, new SpriteActionModel(null, 0, this.oppositeDirection, Phaser.Color.GRAY));
    this.actionIsOverSignal.dispatch();
  }
}

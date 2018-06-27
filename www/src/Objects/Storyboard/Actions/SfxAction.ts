import BaseAction from './BaseAction';
import Reader from './../Reader';

export default class SfxAction extends BaseAction {
  private id: string;
  private volume: number;

  constructor(parameters) {
    super(Reader.SPRITE_ACTION, parameters);
    this.isFinished = true;
    this.id = this.parameters[0];
  }

  play() {
    this.tools.audio.playSound(this.id);
    this.actionIsOverSignal.dispatch();
  }
}

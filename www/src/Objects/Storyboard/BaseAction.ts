import Base from './../../Base';
export default abstract class BaseAction extends Base {
  actionType: number;
  parameters: string[];
  actionIsOverSignal: Phaser.Signal;
  isFinished: boolean;

  constructor(action, paramters) {
		super();
    this.actionType = action;
    this.parameters = paramters;
    this.actionIsOverSignal = new Phaser.Signal();
    this.isFinished = false;
  }

	play() {}
	
  clear() {}
  
  stop() {}
}

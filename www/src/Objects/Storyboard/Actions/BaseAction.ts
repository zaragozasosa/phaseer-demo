import Base from './../../../Base';
export default abstract class BaseAction extends Base {
  actionType: number;
  parameters: string[];
  actionIsOverSignal: Phaser.Signal;
  isFinished: boolean;

  constructor(action, parameters) {
		super();
    this.actionType = action;
    this.parameters = parameters;
    this.actionIsOverSignal = new Phaser.Signal();
    this.isFinished = false;
  }

	play() {}
	
  clear() {}
  
  stop() {}
}

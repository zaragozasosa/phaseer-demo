import BaseAction from './BaseAction';
export default class Reader {
  static readonly TITLE_ACTION: number = 1;
  static readonly SPRITE_ACTION: number = 2;
  static readonly TEXT_ACTION: number = 3;
  static readonly SFX_ACTION: number = 4;
  static readonly CHANGE_STATE_ACTION: number = 5;

  private actionList: Array<BaseAction>;
  private actionIndex: number;
	private endCallback: any;

  constructor(actionList: Array<BaseAction>, endCallback) {
		this.actionList = actionList;
		this.endCallback = endCallback;
  }

  start() {
    this.actionIndex = 0;
		this.play();
  }

  playNextAction() {
		let action = this.actionList[this.actionIndex];
		if(action) {
			if(action.isFinished) {
				action.clear();				
			} else {
				action.isFinished = true;
				action.stop();
				return;
			}
		}
		this.actionIndex++;
		this.play();
	}
	
	private play() {
		let action = this.actionList[this.actionIndex];
		if(action) {
			// action.actionIsOverSignal.addOnce(function() {
			// 	this.playNextAction();
			// }.bind(this));

			action.play();
		} else {
			this.endCallback();
		}
	}
}

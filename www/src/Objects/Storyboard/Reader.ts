import BaseAction from './Actions/BaseAction';
import Base from './../../Base';

export default class Reader extends Base{
	static readonly TITLE_ACTION: number = 1;
	static readonly SPRITE_ACTION: number = 2;
	static readonly TEXT_ACTION: number = 3;
	static readonly SFX_ACTION: number = 4;
	static readonly CHANGE_STATE_ACTION: number = 5;

	static readonly SPRITE_RIGHT = 1;
	static readonly SPRITE_LEFT = 2;
	static readonly SPRITE_BOTH = 3;

	protected actionList: Array<BaseAction>;
	protected actionIndex: number;
	protected endCallback: any;

	constructor(actionList: Array<BaseAction>, endCallback) {
		super();
		this.actionList = actionList;
		this.endCallback = endCallback;
	}

	start() {
		this.actionIndex = 0;
		this.play();
	}

	playNextAction() {
		let action = this.actionList[this.actionIndex];
		if (action) {
			if (action.isFinished) {
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

	protected play() {
		debugger;
		let action = this.actionList[this.actionIndex];
		if (action) {
			action.actionIsOverSignal.addOnce(function () {
				this.playNextAction();
			}.bind(this));

			action.play();
		} else {
			this.endCallback();
		}
	}
}

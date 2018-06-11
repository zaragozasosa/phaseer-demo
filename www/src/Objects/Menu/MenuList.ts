import MenuObject from './MenuObject';


export default class MenuList extends MenuObject{
	private list: Array<MenuObject>;


	constructor(label: string, id: string, previousObject = null, actionCallback = null) {
		super(label, id, null, previousObject, actionCallback);
		this.list = [];
	}

	addChild(child: MenuObject) {
		this.list.push(child);
		if(this.list.length) {
			this.nextMenuObject = this.list[0];
		}
	}
}
	
export default class MenuObject {
  protected label: string;
  protected id: string;
  protected nextMenuObject: MenuObject;
  protected previousMenuObject: MenuObject;
  protected actionCallback: any;

  get isLeaf(): boolean {
    return this.nextMenuObject === null;
  }

  constructor(
    label: string,
		id: string,
		previousMenuObject = null,		
		actionCallback = null,		
    nextMenuObject = null,
  ) {
    this.label = label;
    this.id = id;
    this.nextMenuObject = nextMenuObject;
    this.previousMenuObject = previousMenuObject;
    this.actionCallback = actionCallback;
  }
}

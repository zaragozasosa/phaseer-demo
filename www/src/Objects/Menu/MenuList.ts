import MenuObject from './MenuObject';

export default class MenuList extends MenuObject {
  private list: Array<MenuObject>;
  selectedOption: MenuObject;

  constructor(label: string) {
    super(label);
    this.list = [];
  }

  addChild(last: MenuObject) {
    last.parentObject = this;
    this.list.push(last);
    if (this.list.length > 1) {
      let beforeLast = this.list.length - 2;
      //link corners
      this.list[0].previousMenuObject = last;
      last.nextMenuObject = this.list[0];

      //link last and before last
      this.list[beforeLast].nextMenuObject = last;
      last.previousMenuObject = this.list[beforeLast];
    }
  }

  show(positionY: number, size: number) {
    if (this.parentObject && this.list[this.list.length - 1].label !== 'Back') {
      this.addChild(
        new MenuObject(
          'Back',
          function() {
            this.parentObject.show(positionY, size);
          }.bind(this),
          true
        )
      );
    }

    let position = positionY;

    for (let obj of this.list) {
      if (obj instanceof MenuList) {
        obj.actionCallback = function() {
          this.tools.audio.playBeep();
          obj.show(positionY, size);
        }.bind(this);
      }

      obj.print(position, size);
      position += size * 2;
    }

    this.setSelectedOption(this.list[0]);
  }

  clearAll() {
    for (let obj of this.list) {
      obj.clear();
    }
  }

  setSelectedOption(obj: MenuObject) {
    if (this.selectedOption) {
      this.selectedOption.toggleOption();
    }

    this.selectedOption = obj;
    obj.toggleOption();
  }

  goNext() {
    this.setSelectedOption(this.selectedOption.nextMenuObject);
  }

  goPrev() {
    this.setSelectedOption(this.selectedOption.previousMenuObject);
  }
}

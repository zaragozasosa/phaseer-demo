import MenuList from './MenuList';
import MenuConfig from './MenuConfig';
import Base from './../../Base';

export default class Menu extends Base {
  private list: MenuList;

  private selectedList: any;
  private parentElement: MenuList;
  private posY: number;
  private fontSize: number;

  constructor(list: MenuList, posY = 700, fontSize = 50) {
    super();
    this.parentElement = list;    
    this.list = list;
    this.posY = posY;
    this.fontSize = fontSize;

    if(this.config.storyboard.menuInputSignal) {
      this.config.storyboard.menuInputSignal.dispose();
    }
    this.config.storyboard.menuInputSignal = new Phaser.Signal();
    this.config.storyboard.menuInputSignal.add(function(key){
      if(key === Phaser.Keyboard.ENTER) {
        this.action();
      } else if(key === Phaser.Keyboard.ESC) {
        this.back();
      } else {
        this.update(key);
      }
    }.bind(this));

    if(this.config.storyboard.optionClickSignal) {
      this.config.storyboard.optionClickSignal.dispose();
    }
    this.config.storyboard.optionClickSignal = new Phaser.Signal();
    this.config.storyboard.optionClickSignal.add(function(option){
      this.selectedList.setSelectedOption(option);
      this.action();
    }.bind(this));


  }

  show() {
    this.selectedList = this.list;
    this.selectedList.show(this.posY, this.fontSize);
  }

  private update(cursor: number) {
    if (cursor === Phaser.Keyboard.UP || cursor === Phaser.Keyboard.LEFT) {
      this.selectedList.goPrev();
    } else if (
      cursor === Phaser.Keyboard.DOWN ||
      cursor === Phaser.Keyboard.RIGHT
    ) {
      this.selectedList.goNext();
    }
  }

  private action() {
    this.tools.audio.playBeep();
    if (this.selectedList.selectedOption.isBackOption) {
      this.back();
    } else {
      this.selectedList.selectedOption.action();
      if(this.selectedList.selectedOption instanceof MenuList){
        this.selectedList.clearAll();
        this.selectedList = this.selectedList.selectedOption;        
      }
    }
  }

  private back() {
    if (this.selectedList.parentObject) {
      this.selectedList.clearAll();
      this.tools.audio.playBeep();
      this.selectedList.parentObject.show(this.posY, this.fontSize);
      this.selectedList = this.selectedList.parentObject;
    }
  }

  destroy() {
    this.config.storyboard.menuInputSignal.dispose();
    this.config.storyboard.optionClickSignal.dispose();
    this.selectedList.clearAll();
  }
}

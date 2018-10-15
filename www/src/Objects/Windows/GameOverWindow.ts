import Window from './Window';
import { ColorSettings } from './../../Config/Config';
import TileModel from './../../Models/TileModel';

import MenuList from './../../Objects/Menu/MenuList';
import MenuObject from './../../Objects/Menu/MenuObject';
import Menu from './../../Objects/Menu/Menu';

export default class GameOverWindow extends Window {
  constructor(
    character: TileModel,
    contCallback: any,
    quitCallback: any
  ) {
    super();
    let y = 150;
    let elements = this.tools.misc.addGroup();
    let sprites = this.tools.misc.addGroup();

    sprites.add(this.tools.sprite.makeCentered(y + 120, character.spriteId, 2));

    elements.add(
      this.tools.text.makeXBounded(
        y + 470,
        'Game Over...',
        70,
        'center',
        ColorSettings.PRIMARY
      )
    );
  
    let menuList = new MenuList('Menu');
    menuList.addChild(
      new MenuObject(
        'Try again!',
        function() {
          contCallback();
        }.bind(this)
      )
    );

    menuList.addChild(
      new MenuObject(
        'Quit',
        function() {
          quitCallback();
        }.bind(this)
      )
    );

    let menu = new Menu(menuList, 740, 50);
    this.menu = menu;

    this.init(elements, sprites);
    this.show();
  }
}

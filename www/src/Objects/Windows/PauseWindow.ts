import InfoWindow from './InfoWindow';
import { ColorSettings } from './../../Config/Config';
import TileModel from './../../Models/TileModel';
import Window from './Window';

import MenuList from './../../Objects/Menu/MenuList';
import MenuObject from './../../Objects/Menu/MenuObject';
import Menu from './../../Objects/Menu/Menu';

export default class PauseWindow extends InfoWindow {
  constructor(
    character: TileModel,
    contCallback: any,
    quitCallback: any,
    y = 200
  ) {
    super(character, 350, false, Window.DEFAULT_HIDE_BACKGROUND);
    let text = this.tools.text.makeXBounded(
      y + 40,
      '- PAUSE -',
      70,
      'center',
      ColorSettings.PRIMARY
    );


    let menuList = new MenuList('Menu');
    menuList.addChild(
      new MenuObject(
        'Continue',
        function() {
          contCallback();
        }.bind(this)
      )
    );

    menuList.addChild(this.tools.audio.makeVolumeMenuOption());

    menuList.addChild(
      new MenuObject(
        'Quit',
        function() {
          quitCallback();
        }.bind(this)
      )
    );

    let menu = new Menu(menuList, 1000, 60);
    this.menu = menu;
  
    this.elements.add(text);

    this.show();
  }
}

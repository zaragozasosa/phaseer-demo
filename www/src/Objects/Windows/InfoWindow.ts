import Window from './Window';
import { ColorSettings } from './../../Config/Config';
import TileModel from './../../Models/TileModel';
export default class InfoWindow extends Window {
  constructor(
    character: TileModel,
    y = 300,
    window = Window.DEFAULT_WINDOW
  ) {
    super(window);
    
    let group = this.tools.misc.addGroup();
    let text = this.tools.text.make(
      70,
      y,
      character.power.name,
      50
    );
    let text2 = this.tools.text.makeXBoundedOptions(
      y + 20,
      character.power.description,
      35,
      'left',
      850,
      70,
      -5,
      ColorSettings.ALT_TEXT
    );

    group.add(text);
    group.add(text2);

    if (character.power.requeriments) {
      let newY = y + 70 + 100;
      let descriptionLen = character.power.description.length;
      let textY = newY + Math.floor(descriptionLen / 35) * 50;

      let text3 = this.tools.text.make(70, textY, 'Requirements:', 40);
      text2.addChild(text3);

      let text4 = this.tools.text.makeXBoundedOptions(
        textY,
        character.power.requeriments,
        35,
        'left',
        850,
        70,
        -5,
        ColorSettings.ALT_TEXT
      );

      group.add(text3);
      group.add(text4);
    }

    this.init(group);
  }
}

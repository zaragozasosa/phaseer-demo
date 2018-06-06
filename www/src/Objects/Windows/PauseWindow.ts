import InfoWindow from './InfoWindow';
import { ColorSettings } from './../../Config/Config';
import TileModel from './../../Models/TileModel';
import Window from './Window';

export default class PauseWindow extends InfoWindow {
  constructor(character: TileModel, contCallback: any, quitCallback: any,  y = 380) {
    super(character, y, false, Window.DEFAULT_HIDE_BACKGROUND);
    let text = this.tools.text.makeXBounded(
      y - 130,
      '- PAUSE -',
      70,
      'center',
      ColorSettings.PRIMARY
    );

    let cont = this.tools.text.make(
      100,
      1050,
      'Continue ',
      80,
      ColorSettings.TEXT
    );
    cont.inputEnabled = true;

    cont.events.onInputDown.add(
      function() {
        contCallback();
      }.bind(this)
    );
    

    let quit = this.tools.text.make(
      620,
      1050,
      'Quit',
      80,
      ColorSettings.TEXT
    );
    quit.inputEnabled = true;
    
    quit.events.onInputDown.add(
      function() {
        quitCallback();
      }.bind(this)
    );

    let volume = this.tools.text.make(
      200,
      1285,
      'Volume: ',
      70,
      ColorSettings.TEXT
    );

    let muteButton = this.tools.sprite.createVolumeIcon();

    this.elements.add(cont);
    this.elements.add(quit);
    this.elements.add(volume);
    this.elements.add(muteButton);
    this.elements.add(text);

    this.show();
  }
}

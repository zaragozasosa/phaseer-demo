import InfoWindow from './InfoWindow';
import { ColorSettings } from './../../Config/Config';
import TileModel from './../../Models/TileModel';

export default class PauseWindow extends InfoWindow {
  constructor(character: TileModel, y = 500) {
    super(character, y, false);

    let text = this.tools.text.makeXBounded(
      380,
      '- PAUSED -',
      70,
      'center',
      ColorSettings.PRIMARY
    );

    this.message.add(text);

    this.show();
  }
}

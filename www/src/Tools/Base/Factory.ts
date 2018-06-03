import { GameInstance, Config, ColorSettings } from './../../Config/Config';

export default class Factory {
  protected game: Phaser.Game;
  protected config: Config;

  constructor(config) {
    this.game = GameInstance.get().game;
    this.config = config;
  }

  getColor(color) {
    switch(color) {
      case ColorSettings.ALT_TEXT:
      return this.config.color.altText;
      case ColorSettings.TEXT:
      return this.config.color.text;
      case ColorSettings.PRIMARY:
      return this.config.color.primary;
      case ColorSettings.SELECTED:
      return this.config.color.selected;
      case ColorSettings.BACKGROUND:
      return this.config.color.background;
    }

    return '#FFFFFF';
  }
}

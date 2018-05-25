import Factory from './Factory';
export default class ButtonFactory extends Factory {
  make(x: number, y: number, list: Array<string>, click: any) {
    let scale = this.config.scaleFactor;
    let safe = this.config.safeZone;
    let xPos = x * scale + safe.paddingX;
    let yPos = y * scale + safe.paddingY;

    let button = this.game.add.button(xPos, yPos, list[0], click, null);

    if (list.length == 3) {
      button.onInputOver.add(function() {
        button.loadTexture(list[1]);
      }, this);
      button.onInputOut.add(function() {
        button.loadTexture(list[0]);
      }, this);

      button.onInputDown.add(function() {
        button.loadTexture(list[2]);
      }, this);

      button.onInputUp.add(function() {
        button.loadTexture(list[0]);
      }, this);
    }

    return button;
  }
}

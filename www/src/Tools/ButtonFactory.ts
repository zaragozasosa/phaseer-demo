import Factory from './Base/Factory';
export default class ButtonFactory extends Factory {
  make(x: number, y: number, list: Array<string>, click: any, ratio = 1) {
    let button;
    let scale = this.config.scaleFactor;
    let safe = this.config.safeZone;
    let xPos = x * scale + safe.paddingX;
    let yPos = y * scale + safe.paddingY;

    if (list.length === 1) {
      button = this.game.add.button(xPos, yPos, list[0], click, this, 2, 1, 0);
    } else {
      button = this.game.add.button(xPos, yPos, list[0], click, null);
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
    button.scale.x = scale * ratio;
    button.scale.y = scale * ratio;

    return button;
  }
}

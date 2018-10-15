import Base from './../Base';
import GameboardConfig from './../Config/GameboardConfig';

export default class LoadingScreen extends Base {
  constructor(gameboardConfig: GameboardConfig) {
    super();
    let tools = this.tools;
    for (let tile of gameboardConfig.tiles) {
      let x = tools.misc.randomBetween(150, 800);
      let y = tools.misc.randomBetween(150, 1400);

      let x2 = tools.misc.randomBetween(100, 800);
      let y2 = tools.misc.randomBetween(100, 1400);

      let time = tools.misc.randomBetween(500, 1200);
      let time2 = tools.misc.randomBetween(500, 1200);

      let scale = tools.misc.randomBetween(6, 10);
      let scale2 = tools.misc.randomBetween(6, 10);

      let sprite = tools.sprite.createFromSpriteSheet(x, y, tile.spriteId, 1, scale/10);
      let sprite2 = tools.sprite.createFromSpriteSheet(x2, y2, tile.spriteId, 2, scale2/10);

      sprite.angle = tools.misc.randomBetween(0, 4) * 90;
      sprite2.angle = tools.misc.randomBetween(0, 4) * 90;

      tools.tween.blinkStart(sprite, 0, time);
      tools.tween.blinkStart(sprite2, 0, time2);
    }

    let load = tools.text.makeXBounded(400, 'Loading', 100, 'center', null, true);

    tools.misc.repeatEvent(500, 3, () => (load.text = load.text + '.'));
    tools.tween.appear(load, 500);
  }
}
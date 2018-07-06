import Base from './../Base';
import GameboardConfig from './../Config/GameboardConfig';

export default class LoadingScreen extends Base {
  constructor(gameboardConfig: GameboardConfig) {
    super();
    let tools = this.tools;
    for (let tile of gameboardConfig.tiles) {
      let x = tools.misc.randomBetween(150, 750);
      let y = tools.misc.randomBetween(150, 1400);

      let x2 = tools.misc.randomBetween(150, 750);
      let y2 = tools.misc.randomBetween(150, 1400);

      let time = tools.misc.randomBetween(500, 1200);
      let time2 = tools.misc.randomBetween(500, 1200);

      let sprite = tools.sprite.createSprite(x, y, tile.id, 1);
      let sprite2 = tools.sprite.createSprite(x2, y2, tile.specialId, 1);

      sprite.alpha = 0;
      sprite2.alpha = 0;

      sprite.angle = tools.misc.randomBetween(0, 9) * 45;
      sprite2.angle = tools.misc.randomBetween(0, 9) * 45;

      tools.tween.blinkStart(sprite, 0, time);
      tools.tween.blinkStart(sprite2, 0, time2);
    }

    let load = tools.text.makeXBounded(400, 'Loading', 100, 'center', null, true);

    tools.misc.repeatEvent(500, 3, () => (load.text = load.text + '.'));
    tools.tween.appear(load, 500);
  }
}
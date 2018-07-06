import { Singleton, Config, Tools, ColorSettings } from './../Config/Config';
import GameboardConfig from './../Config/GameboardConfig';

export default class Transition extends Phaser.State {
  private callback: any;
	private gameboardConfig: GameboardConfig;
	private stopTrack: boolean;

  init(gameboardConfig: any, callback: any, stopTrack = false) {
    this.callback = callback;
		this.gameboardConfig = gameboardConfig;
		this.stopTrack = stopTrack;
  }

  create() {
    let singleton = Singleton.get();
    let tools = singleton.tools;
    tools.graphic.addBackground();

		if(this.stopTrack) {
			tools.audio.stopBgm();
		}
    for (let tile of this.gameboardConfig.tiles) {
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

    let t = tools.text.makeXBounded(400, 'Loading', 100, 'center', null, true);

    tools.misc.repeatEvent(500, 3, () => (t.text = t.text + '.'));
    t.alpha = 0;
    tools.tween.to(t, { alpha: 1 }, 500, true);
    tools.misc.runLater(2000, () => this.callback());
  }
}

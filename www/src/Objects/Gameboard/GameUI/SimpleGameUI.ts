import GameboardUI from './../GameboardUI'
import GameboardConfig from './../../../Config/GameboardConfig';


export default class SimpleGameUI extends GameboardUI {
  constructor(gameboardConfig: GameboardConfig) {
    super(gameboardConfig);
    this.gameboardConfig.arraySize = this.gameboardConfig.defaultArraySize;
  }

  update(points) {
    this.points = points;
    this.updateHeader();
    this.updateTimer();
  }
}

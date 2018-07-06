import { Singleton, Tools } from './../Config/Config';
import GameboardConfig from './../Config/GameboardConfig';
import LoadingScreen from './../Objects/LoadingScreen';

export default class Transition extends Phaser.State {
  private callback: any;
  private gameboardConfig: GameboardConfig;
  private stopTrack: boolean;
  private loader: any;
  private tools: Tools;
  private timer: Phaser.Timer;

  init(gameboardConfig: any, callback: any, stopTrack = false, loader = null) {
    this.callback = callback;
    this.gameboardConfig = gameboardConfig;
    this.stopTrack = stopTrack;
    this.loader = loader;
  }

  preload() {
    let singleton = Singleton.get();
    this.tools = singleton.tools;
    this.tools.graphic.addBackground();
    this.timer = this.tools.misc.createTimer();
    this.timer.start();

    if(this.loader) {
      this.loader.loadResources(this.game.load);
    }

    if (this.stopTrack) {
      this.tools.audio.stopBgm();
    }

    new LoadingScreen(this.gameboardConfig);
  }

  update() {
    if(this.timer.ms >= 1500) {
      this.callback()
    }
  }
}

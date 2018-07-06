import Factory from './Base/Factory';
import AudioFactory from './AudioFactory';

export default class MiscFactory extends Factory {
  addGroup(name = undefined): Phaser.Group {
    return this.game.add.group(undefined, undefined);
  }

  randomBetween(min: number, max: number): number {
    return this.game.rnd.integerInRange(min, max);
  }

  overlap(object1: any, object2: any, overlapCallback): Boolean {
    return this.game.physics.arcade.overlap(object1, object2, overlapCallback);
  }

  createTimer() {
    return this.game.time.create(false);
  }

  bringToTop(object: any) {
    this.game.world.bringToTop(object);
  }

  runLater(time: number, functionToCall: any) {
    this.game.time.events.add(
      time,
      function() {
        functionToCall();
      }.bind(this)
    );
  }

  repeatEvent(time: number, numberOfCycles: number, functionToCall: any) {
    return this.game.time.events.repeat(
      time,
      numberOfCycles,
      function() {
        functionToCall();
      }.bind(this)
    );
  }

  shuffleUniqueArray(list: Array<any>) {
    let newList = [];
    while (newList.length !== list.length) {
      let element = this.game.rnd.pick(list);
      if (newList.lastIndexOf(element) === -1) {
        newList.push(element);
      }
    }
    return newList;
  }

  cacheAddImage(key: string, data: any) {
    this.game.cache.addImage(key, '', data);
  }

  changeState(state: string, ...args) {
    this.game.state.start(state, true, false, ...args);
  }

  transitionToState(gameboardConfig: any, state: string, ...args) {
    this.changeState(
      'Transition',
      gameboardConfig,
      function() {
        this.changeState(state, ...args);
      }.bind(this)
    );
  }

  hardTransition(
    gameboardConfig: any,
    state: string,
    audio: AudioFactory,
    ...args
  ) {
    this.changeState(
      'Transition',
      gameboardConfig,
      function() {
        this.changeState(state, ...args);
      }.bind(this),
      true
    );
  }

  restartState(params = null) {
    this.game.state.restart(true, false, params);
  }
}

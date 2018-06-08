import Factory from './Base/Factory';
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

  tweenTo(
    obj: any,
    props: any,
    duration = 200,
    ease = 'Linear',
    autoStart = false,
    delay = 0,
    repeat = 0,
    yoyo = false
  ): Phaser.Tween {
    return this.game.add
      .tween(obj)
      .to(props, duration, ease, autoStart, delay, repeat);
  }

  removeTween(tween: Phaser.Tween) {
    this.game.tweens.remove(tween);
  }

  createTimer() {
    return this.game.time.create(false);
  }

  bringToTop(object: any) {
    this.game.world.bringToTop(object);
  }

  runLater(time: number, functionToCall: any) {
    this.game.time.events.add(time, function() {
      functionToCall()
    }.bind(this));
  }

  shuffleUniqueArray(list: Array<any>) {
    let newList = [];
    while(newList.length !== list.length) {
      let element = this.game.rnd.pick(list);
      if(newList.lastIndexOf(element) === -1) {
        newList.push(element);
      }      
    }
    return newList;
  }
}

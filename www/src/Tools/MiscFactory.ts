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
    duration: number,
    ease: string,
    autoStart = false,
    delay = 0,
    repeat = 0
  ): Phaser.Tween {
    return this.game.add
      .tween(obj)
      .to(props, duration, ease, autoStart, delay, repeat);
  }
}

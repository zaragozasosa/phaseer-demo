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
    autoStart = false,    
    ease = 'Linear',
    delay = 0,
    repeat = 0,
    yoyo = false
  ): Phaser.Tween {
    return this.game.add
      .tween(obj)
      .to(props, duration, ease, autoStart, delay, repeat);
  }

  tweenLoop(
    obj: any,
    props1: any,
    props2: any,    
    duration1 = 200,
    duration2 = 200,
    ease1 = 'Linear',
    ease2 = 'Linear',
    
  )  {
    let t1 = this.tweenTo(obj, props1, duration1, false, ease1);
    let t2 = this.tweenTo(obj, props2, duration2, false, ease2);
    t1.onComplete.add(() => t2.start());
    t2.onComplete.add(() => t1.start());

    return t1;
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

  tweenVanishAndDestroy(
    obj: any,
    props: any,
    duration = 200,
    ease = 'Linear',
    autoStart = false,
    delay = 0
  ) {
    this.tweenTo(
      obj,
      props,
      duration,
      true,
      ease,
      delay
    ).onComplete.add(function() {
      obj.destroy();
    });
  }

  tweenTint(obj, startColor, endColor, time) {
    // create an object to tween with our step value at 0
    var colorBlend = { step: 0 }; // create the tween on this object and tween its step property to 100
    var colorTween = this.game.add
      .tween(colorBlend)
      .to({ step: 100 }, time, 'Linear', false, 0, -1, true); // run the interpolateColor function every time the tween updates, feeding it the    // updated value of our tween each time, and set the result as our tint
    colorTween.onUpdateCallback(function() {
      obj.tint = Phaser.Color.interpolateColor(
        Phaser.Color.hexToRGB('#00BFFF'),
        Phaser.Color.hexToRGB('#87CEFA'),
        100,
        colorBlend.step
      );
    }); // set the object to the start color straight away
    obj.tint = startColor; // start the tween
    return colorTween;
  }

  cacheAddImage(key: string, data: any) {
    this.game.cache.addImage(key, '', data);
  }

  changeState(state: string, params1 = null, params2 = null, params3 = null) {
    this.game.state.start(state, true, false, params1, params2, params3);
  }

  restartState(params = null) {
    this.game.state.restart(true, false, params);
  }
}

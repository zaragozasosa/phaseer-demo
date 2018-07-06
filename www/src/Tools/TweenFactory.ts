import Factory from './Base/Factory';
export default class TweenFactory extends Factory {
  to(
    obj: any,
    props: any,
    duration = 200,
    autoStart = false,
    ease = null,
    delay = 0
  ): Phaser.Tween {
    if (!ease) {
      ease = Phaser.Easing.Linear.name;
    }
    let tween = this.game.add
      .tween(obj)
      .to(props, duration, ease, autoStart, delay);

    return tween;
  }

  start(
    obj: any,
    props: any,
    duration = 200,
    autoStart = false,
    ease = null,
    delay = 0
  ): Phaser.Tween {
    if (!ease) {
      ease = Phaser.Easing.Linear.name;
    }
    let tween = this.game.add.tween(obj).to(props, duration, ease, true, delay);
    return tween;
  }

  loop(
    obj: any,
    props1: any,
    props2: any,
    duration1 = 200,
    duration2 = 200,
    ease1 = null,
    ease2 = null
  ) {
    let t1 = this.to(obj, props1, duration1, false, ease1);
    let t2 = this.to(obj, props2, duration2, false, ease2);
    t1.onComplete.add(() => t2.start());
    t2.onComplete.add(() => t1.start());

    return t1;
  }

  blink(obj: any, minAlpha = 0.3, duration = 750) {
    obj.alpha = 0.3;
    return this.loop(
      obj,
      { alpha: 1 },
      { alpha: minAlpha },
      duration,
      duration
    );
  }

  blinkStart(obj: any, minAlpha = 0.3, duration = 750) {
    let tween = this.blink(obj, minAlpha, duration);

    tween.start();
    return tween;
  }

  appear(obj: any, duration = 1000) {
    obj.alpha = 0;
    return this.to(obj, { alpha: 1 }, duration, true);
  }

  remove(tween: Phaser.Tween) {
    this.game.tweens.remove(tween);
  }

  moveY(
    obj: any,
    newY: number,
    duration: number,
    auto = false,
    ease = null,
    extraProps = null
  ) {
    let realY = newY * this.config.scaleFactor + this.config.safeZone.paddingY;

    if (extraProps) {
      extraProps.y = realY;
    } else {
      extraProps = { y: realY };
    }
    return this.to(obj, extraProps, duration, auto, ease);
  }

  vanishAndDestroy(
    obj: any,
    props: any,
    duration = 200,
    ease = 'Linear',
    delay = 0
  ) {
    this.to(
      obj,
      props,
      duration,
      true,
      ease,
      delay
    ).onComplete.addOnce(function() {
      obj.destroy();
    });
  }

  tint(obj, startColor, endColor, time) {
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
}

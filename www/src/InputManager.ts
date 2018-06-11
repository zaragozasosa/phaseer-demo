/// <reference path="..//typings/swipe.d.ts"/>

import Factory from './Tools/Base/Factory';
export default class InputManager extends Factory {
  private swipe: Swipe;
  private cursors: Phaser.CursorKeys;
  private keyPressed: boolean;
  private escapePressed: boolean;

  constructor(config) {
    super(config);
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.swipe = new Swipe(this.game);

    this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(() => {
      this.keyPressed = true;
    });
    this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.add(() => {
      this.keyPressed = true;
    });

    this.game.input.keyboard.addKey(Phaser.Keyboard.ESC).onDown.add(() => {
      this.escapePressed = true;
    });
  }

  checkCursor() {
    if (this.game.device.desktop) {
      if (this.cursors.left.justDown) {
        return Phaser.Keyboard.LEFT;
      } else if (this.cursors.right.justDown) {
        return Phaser.Keyboard.RIGHT;
      } else if (this.cursors.up.justDown) {
        return Phaser.Keyboard.UP;
      } else if (this.cursors.down.justDown) {
        return Phaser.Keyboard.DOWN;
      }
    } else {
      var direction = this.swipe.check();
      if (direction !== null) {
        switch (direction.direction) {
          case this.swipe.DIRECTION_LEFT:
            return Phaser.Keyboard.LEFT;
          case this.swipe.DIRECTION_RIGHT:
            return Phaser.Keyboard.RIGHT;
          case this.swipe.DIRECTION_UP:
            return Phaser.Keyboard.UP;
          case this.swipe.DIRECTION_DOWN:
            return Phaser.Keyboard.DOWN;
        }
      }
    }
    return null;
  }

  checkEnter() {
    if (this.keyPressed) {
      this.keyPressed = false;
      return true;
    }
    return false;
  }

  checkEscape() {
    if (this.escapePressed) {
      this.escapePressed = false;
      return true;
    }
    return false;
  }

  checkKeys() {
    if (this.checkEnter()) {
      return Phaser.Keyboard.ENTER;
    }

    if (this.checkEscape()) {
      return Phaser.Keyboard.ESC;
    }
  }

  checkClick() {
    if (this.game.input.activePointer.isDown) {
      return true;
    } else {
      return false;
    }
  }
}

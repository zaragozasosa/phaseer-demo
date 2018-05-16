/// <reference path="../../typings/swipe.d.ts"/>

import { Config, Singleton } from '../Config';
export default class InputManager {
  private game: Phaser.Game;
  private config: Config;
  private swipe: Swipe;
  private cursors: Phaser.CursorKeys;
  private spaceKey: Phaser.Key;
  private enterKey: Phaser.Key;
  private keyPressed: boolean;

  constructor() {
    let singleton = Singleton.getInstance();
    this.game = singleton.game;
    this.config = singleton.config;
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.swipe = new Swipe(this.game);

    this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

    this.game.input.keyboard
      .addKey(Phaser.Keyboard.UP)
      .onDown.add(this.keyPressedEvent, this);
    this.game.input.keyboard
      .addKey(Phaser.Keyboard.UP)
      .onDown.add(this.keyPressedEvent, this);
  }

  private keyPressedEvent() {
    this.keyPressed = true;
  }

  checkCursor() {
    if (this.game.device.desktop) {
      if (this.cursors.left.justDown) {
        console.log(' left');
        return Phaser.Keyboard.LEFT;
      } else if (this.cursors.right.justDown) {
        console.log(' right');
        return Phaser.Keyboard.RIGHT;
      } else if (this.cursors.up.justDown) {
        console.log(' up');
        return Phaser.Keyboard.UP;
      } else if (this.cursors.down.justDown) {
        console.log(' down');
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

  checkKeys() {
    if (this.keyPressed) {
      this.keyPressed = false;
      return true;
    }
    return false;
  }

  check() {
    var cursor = this.checkCursor();
    return cursor === null ? this.checkKeys : cursor;
  }
}

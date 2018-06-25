import InputManager from './../InputManager';
import { Singleton } from './../Config/Config';
import Reader from './../Objects/Storyboard/Reader'
import TwoSpritesReader from './../Objects/Storyboard/TwoSpritesReader'
import BaseAction from './../Objects/Storyboard/BaseAction'
import TextAction from './../Objects/Storyboard/TextAction'
import SpriteAction from './../Objects/Storyboard/SpriteAction'
import TitleAction from './../Objects/Storyboard/TitleAction'


import GameboardConfig from './../Config/GameboardConfig'

export default class Story extends Phaser.State {
  private cursor: InputManager;
  private reader: TwoSpritesReader;
  private gameboardConfig: GameboardConfig;

  init(gameboardConfig: GameboardConfig) {
    this.gameboardConfig = gameboardConfig;
  }

  create() {
    let config = Singleton.get().config;
    let tools = Singleton.get().tools;
    this.cursor = new InputManager(config);
    tools.graphic.addBackground();

    let list = new Array<BaseAction>();
    list.push(new SpriteAction(['smith-sheet', '0', 'left']));
    list.push(new TitleAction(['Agent Smith', 'left']));
    list.push(new TextAction(['It was a rainy night. I was asked to come immediately.']));
    list.push(new TextAction(['The case was a murder in an old mansion. My squad was already investigating, but something happened.']));
    list.push(new SpriteAction(['lily-sheet', '0', 'right', 'black']));
    list.push(new TextAction(['One unidentified suspect managed to knock out every police offer on the crime scene. Then they cleaned up the whole place, took all the evidence and left.']));
    list.push(new TextAction(['We believe the suspect is armed and trained in hand-to-hand combat.']));
    list.push(new TextAction(['The instructions were clear. Detain the suspect and find the evidence regarding the murder case.']));

    list.push(new TextAction([`Damn, it's always the difficult cases for me, isn't it?`]));
    list.push(new SpriteAction(['lily-sheet', '2', 'right']));
    list.push(new TitleAction(['Lily', 'right']));

    list.push(new TextAction([`Huh? Who are you? Are you trying to trying to further desacrate the master's propierty?`]));
    list.push(new TitleAction(['Agent Smith', 'left']));
    list.push(new SpriteAction(['smith-sheet', '3', 'left']));
    list.push(new TextAction(['No, wait, stop!']));



    this.reader = new TwoSpritesReader(list, function () {
      this.state.start('GameboardLoader', true, false, this.gameboardConfig);
    }.bind(this));
    this.reader.start();
  }

  update() {
    if (this.cursor.checkClick()) {
      this.reader.playNextAction();
    }

    if (this.cursor.checkKeys()) {
      this.reader.playNextAction();
    }
  }
}

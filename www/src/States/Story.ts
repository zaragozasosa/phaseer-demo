import InputManager from './../InputManager';
import { Singleton } from './../Config/Config';
import Reader from './../Objects/Storyboard/Reader'
import BaseAction from './../Objects/Storyboard/BaseAction'
import TextAction from './../Objects/Storyboard/TextAction'
import GameboardConfig from './../Config/GameboardConfig'

export default class Story extends Phaser.State {
  private cursor: InputManager;
  private reader: Reader;
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
    list.push(new TextAction(Reader.TEXT_ACTION, ['It was a rainy night. I was asked to come immediately.']));
    list.push(new TextAction(Reader.TEXT_ACTION, ['The case was a murder in an old mansion. My squad was already investigating, but something happened.']));
    list.push(new TextAction(Reader.TEXT_ACTION, ['One unidentified suspect managed to knock out every police offer on the crime scene. Then they cleaned up the whole place, took all the evidence and left.']));
    list.push(new TextAction(Reader.TEXT_ACTION, ['We believe the suspect is armed and trained in hand-to-hand combat.']));


    this.reader = new Reader(list, function() {
      this.state.start('GameboardLoader', true, false, this.gameboardConfig);      
    }.bind(this));
    this.reader.start();
  }

  update() {
    if (this.cursor.checkClick()) {
      this.reader.playNextAction();
    }

    if(this.cursor.checkKeys()) {
      this.reader.playNextAction();      
    }
  }
}

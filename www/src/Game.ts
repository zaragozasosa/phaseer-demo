/// <reference path="../../node_modules/phaser-ce/typescript/phaser.comments.d.ts"/>
import { Singleton, GameInstance } from './Config/Config';
import ConfigSetup from './Config/ConfigSetup';
import Boot from './States/Boot';
import Preloader from './States/Preloader';
import MainMenu from './States/MainMenu';
import Unranked from './States/Unranked';
import CharacterSelection from './States/CharacterSelection';

export default class Game extends Phaser.Game {
  constructor() {
    let setup = new ConfigSetup();
    let height = setup.config.screenHeight;
    let width = setup.config.screenWidth;
    super(width, height, Phaser.CANVAS, 'content', null, true);
    GameInstance.initialize(this);
    Singleton.initialize(setup.config, this);
    
    this.bootGame();
  }

  bootGame() {
    this.state.add('Boot', Boot, false);
    this.state.add('Preloader', Preloader, false);
    this.state.add('MainMenu', MainMenu, false);
    this.state.add('CharacterSelection', CharacterSelection, false);
    this.state.add('Unranked', Unranked, false);

    this.state.start('Boot');
  }
}

new Game();

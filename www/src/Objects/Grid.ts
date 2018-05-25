import { Config, Singleton } from './../Models/Config';
import SpriteFactory from './../Tools/SpriteFactory';
import TextFactory from './../Tools/TextFactory';
import GraphicsFactory from './../Tools/GraphicsFactory';
import LogicalGrid from './../Objects/LogicalGrid';
import InputManager from './../Tools/InputManager';
import GridTile from './GridTile';
import GameboardConfig from './GameboardConfig';

export default class Grid {
  private game: Phaser.Game;
  private config: Config;
  private gameboardConfig: GameboardConfig;
  private textFactory: TextFactory;
  private graphicsFactory: GraphicsFactory;
  private spriteFactory: SpriteFactory;

  private gridLogic: LogicalGrid;
  private wallsGroup: Phaser.Group;
  private framesGroup: Phaser.Group;
  private animating: boolean;
  private input: InputManager;
  private gameboardCallback: any;

  constructor(gameboardConfig: GameboardConfig, gameboardCallback: any) {
    let singleton = Singleton.getInstance();
    this.game = singleton.game;
    this.config = singleton.config;
    this.textFactory = new TextFactory();
    this.graphicsFactory = new GraphicsFactory();
    this.spriteFactory = new SpriteFactory();
    this.gameboardConfig = gameboardConfig;
    this.gameboardCallback = gameboardCallback;

    this.animating = false;
    this.wallsGroup = this.makeWalls();
    this.gridLogic = new LogicalGrid(gameboardConfig);

    this.framesGroup = this.makeTileFrames();
    
    this.input = new InputManager();
  }

  update() {
    //this.game.world.bringToTop(this.framesGroup);
    
    if (!this.animating) {
      var cursor = this.input.checkCursor();
      if(cursor) {
        this.animating = this.gridLogic.scanGrid(cursor);
      }
      cursor = null;
    } else {
      this.manageCollisions();
    }
  }

  getColumnForDebug(column: number) {
    return this.gridLogic.getColumnForDebug(column);
  }

  calculatePoints() {
    return this.gridLogic.sumTiles();
  }

  private manageCollisions() {
    if (this.gridLogic.manageCollisions(this.wallsGroup)) {
      this.animating = false;
      this.gameboardCallback();
    }
  }

  private makeWalls(): Phaser.Group {
    let wallLength = (this.config.gridSettings.tileSize + 5) * 4;
    let group = this.game.add.group();

    group.add(this.graphicsFactory.makeWall(-10, -10, 2, wallLength));
    group.add(this.graphicsFactory.makeWall(-10, -10, wallLength, 2));
    group.add(this.graphicsFactory.makeWall(-10, wallLength, wallLength, 2));
    group.add(this.graphicsFactory.makeWall(wallLength, -10, 2, wallLength));

    return group;
  }

  private makeTileFrames(): Phaser.Group {
    let group = this.game.add.group();
    let arraySize = this.gameboardConfig.arraySize;
    for (let x = 0; x <= arraySize; x++) {
      for (let y = 0; y <= arraySize; y++) {
        group.add(this.spriteFactory.makeTile(x, y, 'frame'));
      }
    }
    return group;
  }
}

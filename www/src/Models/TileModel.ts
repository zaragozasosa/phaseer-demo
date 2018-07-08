import PowerModel from './PowerModel';
import BaseAction from './../Objects/Storyboard/Actions/BaseAction'

export default class TileModel {
  id: string;
  name: string;
  fullName: string;
  friendId: string;
  menuFriendId: string;
  sfxId: string;
  sfxVolume: number;
  summary: string;
  powerId: string;
  
  power: PowerModel;

  staticValue: number;
  frame: Phaser.Sprite;
  isRealTile: boolean;
  isMenuVisible: boolean;
  
  getFirstStory: any;
  getSecondStory: any;

  animationFrames: Array<number>;
  animationSpeed: number;

  get specialSpriteFrame() {
    return 4;
  }
  
  get getMenuFriendId(): string {
    return this.menuFriendId ? this.menuFriendId : this.friendId;
  }

  get sfxRoute(): string {
    return this.id + '-' + this.sfxId;
  }

  get negativeId(): string {
    return this.id + '-negative';
  }

  get sfxLabel(): string {
    return this.id + '-sfx';
  }

  get friendSfxLabel(): string {
    return this.friendId + '-sfx';
  }

  get imagePath(): string {
    return `characters/${this.id}.png`;
  }

  constructor(
    id: string,
    name: string,
    fullName: string,
    friendId: string,
    sfxId: string,
    sfxVolume: number,
    powerId: string,
    power: PowerModel,
    animationFrames: Array<number>,
    firstStory: any,
    secondStory: any,    
    summary: string,
    isMenuVisible = true,
    menuFriendId = null,
    isRealTile = true
  ) {
    this.id = id;
    this.name = name;
    this.fullName = fullName;
    this.friendId = friendId;
    this.sfxId = sfxId;
    this.sfxVolume = sfxVolume;
    this.powerId = powerId;
    this.power = power;
    this.summary = summary;
    this.isMenuVisible = isMenuVisible;
    this.getFirstStory = firstStory;
    this.getSecondStory = secondStory;
    this.menuFriendId = menuFriendId;
    this.isRealTile = isRealTile;

    this.animationFrames = animationFrames;
    this.animationSpeed = 1.5;
  }
}

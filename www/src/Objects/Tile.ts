export default class Tile {
  id: string;
  name: string;
  fullName: string;
  friendId: string;
  sfxId: string;
  summary: string;
  playable: boolean;
  powerId: string;
  powerName: string;

  staticValue: number;
  frame: Phaser.Sprite;
  
  constructor(
    id: string,
    name: string,
    fullName: string,
    friendId: string,
    sfxId: string,
    powerId: string,
    powerName: string,
    summary: string,
    playable = true,    
    gridX = 0,
    gridY = 0,
  ) {
    this.id = id;
    this.name = name;
    this.fullName = fullName;
    this.friendId = friendId;
    this.sfxId = sfxId;
    this.powerId = powerId;
    this.powerName = powerName;
    this.summary = summary;
    this.playable = playable;
  }
}
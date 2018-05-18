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

  gridX: number;
  gridY: number;
  sprite: Phaser.Sprite;
  
  constructor(
    id: string,
    name: string,
    fullName: string,
    friendId: string,
    sfxId: string,
    powerId: string,
    powerName: string,
    summary: string,
    gridX = 0,
    gridY = 0,
    playable = true
  ) {
    this.id = id;
    this.name = name;
    this.fullName = fullName;
    this.friendId = friendId;
    this.sfxId = sfxId;
    this.powerId = powerId;
    this.powerName = powerName;
    this.summary = summary;
    this.gridX = gridX;
    this.gridY = gridY;
    this.playable = playable;
  }
}
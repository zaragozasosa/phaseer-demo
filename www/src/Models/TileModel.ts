import PowerModel from './PowerModel';
export default class TileModel {
  id: string;
  name: string;
  fullName: string;
  friendId: string;
  sfxId: string;
  sfxVolume: number;
  summary: string;
  playable: boolean;
  powerId: string;

  power: PowerModel;

  staticValue: number;
  frame: Phaser.Sprite;

  get sfxRoute(): string {
    return this.id + '-' + this.sfxId;
  }

  get sfxLabel(): string {
    return this.id + '-sfx';
  }

  get friendSfxLabel(): string {
    return this.friendId + '-sfx';
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
    summary: string,
    playable = true,
    gridX = 0,
    gridY = 0
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
    this.playable = playable;
  }
}

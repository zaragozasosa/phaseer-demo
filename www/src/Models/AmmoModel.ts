export default class AmmoModel {
  id: string;
  ammo: number;
  length: number;

  constructor(id: string, ammo: number, length: number) {
    this.id = id;
    this.ammo = ammo;
    this.length = length;
  }
}

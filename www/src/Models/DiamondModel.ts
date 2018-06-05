export default class DiamondModel {
  id: string;
  requiredDiamonds: number;

  constructor(id: string, requiredDiamonds: number) {
    this.id = id;
    this.requiredDiamonds = requiredDiamonds;
  }
}

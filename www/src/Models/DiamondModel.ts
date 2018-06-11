export default class DiamondModel {
  id: string;
  requiredDiamonds: number;
  cooldown: boolean;
  startText: string;
  endText: string;

  constructor(id: string, requiredDiamonds: number, cooldown = false, startText =  '', endText= '') {
    this.id = id;
    this.requiredDiamonds = requiredDiamonds;
    this.cooldown = cooldown;
    this.startText = startText;
    this.endText = endText;
  }
}

export default class DiamondModel {
  id: string;
  requiredDiamonds: number;
  cooldown: boolean;
  endText: string;
  scale: number;
  paddingX: number;

  constructor(id: string, requiredDiamonds: number, cooldown = false, endText= '', scale = 1, paddingX = 0) {
    this.id = id;
    this.requiredDiamonds = requiredDiamonds;
    this.cooldown = cooldown;
    this.endText = endText;
    this.scale = scale;
    this.paddingX = paddingX;
  }
}

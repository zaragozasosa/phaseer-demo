export default class DiamondModel {
  id: string;
  requiredDiamonds: number;
  initialAmount: number;
  cooldown: boolean;
  endText: string;
  scale: number;
  paddingX: number;
  type: number;

  static readonly DEFAULT_TYPE = 1;
  static readonly TIME_TYPE = 2;

  constructor(
    id: string,
    requiredDiamonds: number,
    initialAmount: number,
    cooldown = false,
    endText = '',
    scale = 1,
    paddingX = 0,
    type = DiamondModel.DEFAULT_TYPE
  ) {
    this.id = id;
    this.requiredDiamonds = requiredDiamonds;
    this.initialAmount = initialAmount;
    this.cooldown = cooldown;
    this.endText = endText;
    this.scale = scale;
    this.paddingX = paddingX;
    this.type = type;
  }
}

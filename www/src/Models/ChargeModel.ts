export default class ChargeModel {
  buttonId: string;
  callback: any;
  positionX: number;

  constructor(buttonId: string, positionX: number, callback: any) {
    this.callback = callback;
    this.buttonId = buttonId;
    this.positionX = positionX;
  }
}

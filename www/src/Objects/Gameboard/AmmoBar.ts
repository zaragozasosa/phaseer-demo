import AmmoModel from './../../Models/AmmoModel';
import Base from './../../Base';
export default class AmmoBar extends Base {
  private model: AmmoModel;
  private ammo: number;
  private group: Phaser.Group;

  constructor(model: AmmoModel) {
    super();
    this.model = model;
    this.ammo = model.ammo;
    this.group = this.tools.misc.addGroup();
    this.create();
  }

  private create() {
    let y = 1250;
    let x = 80;
    let model = this.model;

    for (let i = 0; i < this.ammo; i++) {
      this.group.add(
        this.tools.sprite.createSprite(x + i * model.length, y, model.id, 0.4)
      );
    }
  }

  update() {
		let sprite = this.group.getTop();
		if(sprite) {
			this.group.removeChild(sprite);
			this.ammo--;
		}

		return this.ammo;
	}
}

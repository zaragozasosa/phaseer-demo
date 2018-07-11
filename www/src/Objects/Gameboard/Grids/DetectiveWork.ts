import Grid from './../Grid';
import DetectiveWorkLogic from './../Logic/DetectiveWorkLogic';
import GameboardConfig from './../../../Config/GameboardConfig';

export default class DetectiveWork extends Grid {
  protected gridLogic: DetectiveWorkLogic;
  private elements: Phaser.Group;

  constructor(config: GameboardConfig) {
    let gridLogic = new DetectiveWorkLogic(config);
    super(config, gridLogic);
  }

  activatePower() {
    return this.gridLogic.createGhostTile();
  }

  getPowerConfiguration() {
    let group = this.tools.misc.addGroup();
    group.inputEnableChildren = true;

    group.add(this.tools.text.make(50, 1195, 'UP', 45));
    group.add(this.tools.text.make(200, 1195, 'DOWN', 45));
    group.add(this.tools.text.make(475, 1195, 'LEFT', 45));
    group.add(this.tools.text.make(700, 1195, 'RIGHT', 45));

    let btn = this.tools.text.makeXBounded(1240, 'SEARCH', 60, 'center');
    btn.tint = Phaser.Color.GRAY;
    group.add(btn);
    btn.inputEnabled = false;

    group.onChildInputDown.add(
      function (child: Phaser.Text) {
        group.setAllChildren('tint', Phaser.Color.WHITE);
        child.tint = Phaser.Color.RED;
        if (child.text === 'UP') {
          this.gridLogic.changeFlow(Phaser.Keyboard.UP);
        } else if (child.text === 'DOWN') {
          this.gridLogic.changeFlow(Phaser.Keyboard.DOWN);
        } else if (child.text === 'LEFT') {
          this.gridLogic.changeFlow(Phaser.Keyboard.LEFT);
        } else if (child.text === 'RIGHT') {
          this.gridLogic.changeFlow(Phaser.Keyboard.RIGHT);
        } else {
          this.gridLogic.investigate();
        }
      }.bind(this)
    );

    this.elements = group;
    return group;
  }
}

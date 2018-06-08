import Grid from './../Grid';
import DetectiveWorkLogic from './../../Logic/PlayerLogic/DetectiveWorkLogic';
import GameboardConfig from './../../Config/GameboardConfig';

export default class DetectiveWork extends Grid {
  protected gridLogic: DetectiveWorkLogic;
  private elements: Phaser.Group;

  constructor(config: GameboardConfig) {
    let gridLogic = new DetectiveWorkLogic(config);
    super(config, gridLogic);
  }

  activatePower() {
    if (!this.elements) {
      this.elements = this.makeElements();
      return this.elements;
    }
  }

  private makeElements() {
    let group = this.tools.misc.addGroup();
    group.inputEnableChildren = true;

    group.add(this.tools.text.make(50, 1250, 'UP', 60));
    group.add(this.tools.text.make(200, 1250, 'DOWN', 60));
    group.add(this.tools.text.make(475, 1250, 'LEFT', 60));
    group.add(this.tools.text.make(700, 1250, 'RIGHT', 60));

    group.onChildInputDown.add(
      function(child: Phaser.Text) {
        group.setAllChildren('tint', Phaser.Color.WHITE);
        child.tint = Phaser.Color.RED;
        if (child.text === 'UP') {
          this.gridLogic.investigate(Phaser.Keyboard.UP);
        } else if (child.text === 'DOWN') {
          this.gridLogic.investigate(Phaser.Keyboard.DOWN);
        }
        if (child.text === 'LEFT') {
          this.gridLogic.investigate(Phaser.Keyboard.LEFT);
        }
        if (child.text === 'RIGHT') {
          this.gridLogic.investigate(Phaser.Keyboard.RIGHT);
        }
      }.bind(this)
    );

    return group;
  }
}

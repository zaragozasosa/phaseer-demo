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
    } else {
      return this.gridLogic.createGhostTile();
    }
  }

  private makeElements() {
    let group = this.tools.misc.addGroup();
    group.inputEnableChildren = true;

    group.add(this.tools.text.make(50, 1200, 'UP', 50));
    group.add(this.tools.text.make(200, 1200, 'DOWN', 50));
    group.add(this.tools.text.make(475, 1200, 'LEFT', 50));
    group.add(this.tools.text.make(700, 1200, 'RIGHT', 50));

    let btn = this.tools.text.make(300, 1280, 'Investigate!', 50);
    btn.tint = Phaser.Color.GRAY;
    group.add(btn);
    btn.inputEnabled = false;

    group.onChildInputDown.add(
      function(child: Phaser.Text) {
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

    return group;
  }
}

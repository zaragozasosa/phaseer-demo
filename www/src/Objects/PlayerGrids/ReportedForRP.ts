import Grid from './../Grid';
import ReportedForRPLogic from './../../Logic/PlayerLogic/ReportedForRPLogic';
import GameboardConfig from './../../Config/GameboardConfig';

export default class ReportedForRP extends Grid {
  protected gridLogic: ReportedForRPLogic;
  private buttons: Phaser.Group;

  constructor(config: GameboardConfig) {
    let gridLogic = new ReportedForRPLogic(config);
    super(config, gridLogic);
  }

  activatePower() {
    if (!this.buttons) {
      this.buttons = this.makeButtons();
      return this.buttons;
    }
  }

  private makeButtons() {
    let buttons = this.tools.misc.addGroup();
    buttons.add(
      this.tools.button.make(
        50,
        1250,
        ['power'],
        function() {
          this.sageClick();
        }.bind(this)
      )
    );

    buttons.add(
      this.tools.button.make(
        350,
        1250,
        ['power'],
        function() {
          this.reportedClick();
        }.bind(this)
      )
    );

    buttons.add(
      this.tools.button.make(
        650,
        1250,
        ['power'],
        function() {
          this.bannedClick();
        }.bind(this)
      )
    );

    return buttons;
  }

  private sageClick() {
    if (this.gridLogic.sagePower()) {
      this.gameboardConfig.chargeSignal.dispatch();
    } else {
      this.tools.audio.playSound('beep');
    }
  }

  private reportedClick() {
    if (this.gridLogic.reportedPower()) {
      this.gameboardConfig.chargeSignal.dispatch();
    } else {
      this.tools.audio.playSound('beep');
    }
  }

  private bannedClick() {
    if (this.gridLogic.bannedPower()) {
      this.gameboardConfig.chargeSignal.dispatch();
    } else {
      this.tools.audio.playSound('beep');
    }
  }
}

module MyGame {

	export class Boot extends Phaser.State {
		init() {
			this.input.maxPointers = 1;
			this.stage.disableVisibilityChange = true;
			this.game.physics.startSystem(Phaser.Physics.ARCADE);
			this.game.time.desiredFps = 60;

			if (this.game.device.desktop) {
				this.scale.pageAlignHorizontally = true;
			}
			else {
				this.scale.forcePortrait = true;
				this.scale.pageAlignHorizontally = true;
				this.scale.pageAlignVertically = true;
			}
		}

		preload() {
			this.load.image('preloadBar', 'img/loader.png');
		}

		create() {
			this.game.state.start('Preloader');
		}
	}
}

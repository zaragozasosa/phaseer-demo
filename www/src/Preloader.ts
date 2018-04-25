module MyGame {

	export class Preloader extends Phaser.State {

		preloadBar: Phaser.Sprite;
		background: Phaser.Sprite;
		ready: boolean = false;

		preload() {

			//	These are the assets we loaded in Boot.js
			this.preloadBar = this.add.sprite(0, 0, 'preloadBar');

			//	This sets the preloadBar sprite as a loader sprite.
			//	What that does is automatically crop the sprite from 0 to full-width
			//	as the files below are loaded in.
			this.load.setPreloadSprite(this.preloadBar);

			//	Here we load the rest of the assets our game needs.
			//	As this is just a Project Template I've not provided these assets, swap them for your own.
			this.load.image('cirno', 'img/cirnotest.png');
			this.load.image('choco', 'img/chocotest.png');
			this.load.image('ozaki', 'img/ozakitest.png');
			this.load.image('rosa', 'img/rosatest.png');
			this.load.image('genji', 'img/genjitest.png');

		}

		create() {
			this.game.state.start('MainMenu');
		}
	}
}
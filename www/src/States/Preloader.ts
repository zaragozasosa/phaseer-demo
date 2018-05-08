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
			this.load.image('rox', 'img/rox.png');
			this.load.image('choco', 'img/choco.png');

			this.load.image('mira', 'img/mira.png');
			this.load.image('lord_fancy', 'img/lordfancy.png');

			this.load.image('nacho', 'img/nacho.png');
			this.load.image('chili', 'img/chili.png');

			this.load.image('magil', 'img/magil.png');
			this.load.image('jessy', 'img/jessy.png');

			this.load.image('shy_senpai', 'img/shysenpai.png');
			this.load.image('kinjo', 'img/kinjo.png');

			this.load.image('lily', 'img/lily.png');
			this.load.image('agent_smith', 'img/agentsmith.png');

			this.load.image('astaroth', 'img/astaroth.png');
			this.load.image('r1r1', 'img/r1r1.png');

			this.load.image('joji', 'img/joji.png');
			this.load.image('bren', 'img/bren.png');


			this.game.tilesData = {
				minimumValue: 1,
				tilesOrder: ['nacho', 'chili', 'mira', 'lord_fancy', 'choco', 'rox', 'kinjo', 'shy_senpai', 'magil', 'jessy', 'agent_smith', 'lily', 'r1r1', 'astaroth', 'bren', 'joji']
			}

			this.game.tilesData.mainTile = this.game.tilesData.tilesOrder[this.game.rnd.integerInRange(0, 15)];


			this.game.load.spritesheet('button', 'img/button-mayo.png', 480, 180);

		}

		create() {
			this.game.state.start('MainMenu');
		}
	}
}
module MyGame {

	export class Preloader extends Phaser.State {
		preloadBar: Phaser.Sprite;

		preload() {
			let singleton = Singleton.getInstance();
			let config = singleton.config;
			singleton.game = this.game;
			
			this.preloadBar = this.add.sprite(0, 0, 'preloadBar');
			this.load.setPreloadSprite(this.preloadBar);

			this.game.load.spritesheet('button', 'img/button-mayo.png', 480, 180);

			for(let sprite of config.tileSettings.tiles) {
				let path = `img/${sprite}.png`;
				let altPath = `img/${sprite}_alt.png`;
				
				this.load.image(sprite, path);
				// this.load.image(`${sprite}_alt`, altPath);
			}
		}

		create() {
			this.game.state.start('MainMenu');
		}
	}
}
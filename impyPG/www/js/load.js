var loadState = {
	preload: function() {
		//label
		var loadingLevel = game.add.text(game.width/2, 150, 'Loading...', {
			font: '30px, Arial',
			fill: '#ffffff'
		});
		loadingLevel.anchor.setTo(0.5,0.5);

		//progress bar
		var progressBar = game.add.sprite(game.width/2, 200, 'progressBar')
		progressBar.anchor.setTo(0.5,0.5);
		game.load.setPreloadSprite(progressBar);

		//load all the assets
		//game.load.image('player', 'assets/player.png');
		game.load.image('wallV', 'assets/wallVertical.png');
		game.load.image('wallH', 'assets/wallHorizontal.png');
		game.load.image('coin', 'assets/coin.png');
		game.load.image('enemy', 'assets/enemy.png');
		game.load.image('pixel', 'assets/pixel.png');

		game.load.image('background', 'assets/background.png');

		game.load.audio('jump', ['assets/jump.ogg', 'assets/jump.mp3']);
		game.load.audio('coin', ['assets/coin.ogg', 'assets/coin.mp3']);
		game.load.audio('dead', ['assets/dead.ogg', 'assets/dead.mp3']);

		//spritesheets
		game.load.spritesheet('player', 'assets/player2.png', 20, 20);
		game.load.spritesheet('mute', 'assets/muteButton.png', 28,22);
	},

	create: function() {
		game.state.start('menu');
	},
}
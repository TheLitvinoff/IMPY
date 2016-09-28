var loadState = {
	preload: function() {
		var loadingLabel = game.add.text(game.width/2, game.height/2, 'loading...', {font: '30px Arial', fill: '#ffffff'});
		loadingLabel.anchor.setTo(0.5, 0.5);

		game.load.spritesheet('impy', 'assets/impySprite.png', 446, 610, 5);
		game.load.image('background', 'assets/background.png');
		game.load.image('clean', 'assets/cleanIcon.png');
		game.load.image('food', 'assets/foodIcon.png');
		game.load.image('play', 'assets/playIcon.png');
		game.load.image('goOut', 'assets/goOutIcon.png');
		game.load.image('nameCharBtn', 'assets/nameCharBtn.png');
	},

	create: function() {
		game.state.start('playNameChar');
	},
}
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
		game.load.image('back', 'assets/backIcon.png');
		game.load.image('geoClothes', 'assets/geoClothes.png');
		game.load.image('radarImpy', 'assets/radarImpy.png');
		game.load.image('geoGrid', 'assets/geoGrid.png');
		game.load.image('compassArrow', 'assets/compassArrow.png');
		game.load.image('heart', 'assets/healthIcon.png');
		game.load.image('redGlasses', 'assets/redglasses.png');
		game.load.image('blackGlasses', 'assets/blackglasses.png');
		game.load.image('clothesFrame', 'assets/frame.png');
		game.load.image('okay', 'assets/okay.png');
	},

	create: function() {
		game.state.start('playNameChar');
	},
}
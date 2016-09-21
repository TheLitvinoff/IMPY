var bootState = {
	preload: function() {
	},

	create: function() {
		game.stage.backgroundColor = "#3498db";
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.renderer.renderSession.roundPixels = true;
		
		game.state.start('load');
	},
}
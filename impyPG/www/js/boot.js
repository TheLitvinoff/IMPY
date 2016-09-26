var bootState = {
	preload: function() {
	},

	create: function() {
		//scaling 
		game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
		game.scale.setMinMax(game.width/2, game.height/2, game.width*2, game.height*2);
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;

		document.body.style.backgroundColor = '#422f28';

		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.renderer.renderSession.roundPixels = true;

		game.add.plugin(Fabrique.Plugins.InputField);
		
		game.state.start('load');
	},
}
var bootState = {
	preload: function() {
	},

	create: function() {
		game.stage.backgroundColor = "#faceff";
		game.physics.startSystem(Phaser.Physics.ARCADE);
		//scaling 
		game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
		game.scale.setMinMax(game.width/4, game.height/2, game.width*2, game.height*2);
		game.scale.pageAlignHorizontally = true; 
		game.scale.pageAlignVertically = true;
		
		game.add.plugin(Fabrique.Plugins.InputField);
		
		game.state.start('load');
	},
}
var playNameCharState = {
	create: function(){
		game.add.image(0,0,'background');

		var nameLabel = game.add.text(game.width/2, game.height/2, 'Impy: the little devil', {font: '50px Arial', fill: '#ffffff'});
		nameLabel.anchor.setTo(0.5, 0.5);

	},

	update: function(){
		
	},

	startMain: function() {
		game.state.start('playMain');
	},
};


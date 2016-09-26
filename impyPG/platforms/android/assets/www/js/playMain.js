var playMainState = {
	create: function(){
		game.add.image(0,0,'background');

		var impyName = localStorage.getItem('impyName');

		var nameLabel = game.add.text(game.width/2, game.height/4 - 80, impyName, {font: '50px Arial', fill: '#212121', fontWeight: 'bold'});
		nameLabel.anchor.setTo(0.5, 0.5);
	},

	update: function(){
		
	},
};


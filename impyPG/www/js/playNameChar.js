var playNameCharState = {
	create: function(){
		game.add.image(0,0,'background');

		var nameLabel = game.add.text(game.width/2, game.height/4 - 80, 'Name your Impy:', {font: '50px Arial', fill: '#212121', fontWeight: 'bold'});
		nameLabel.anchor.setTo(0.5, 0.5);

		var input = game.add.inputField((game.width-500)/2, game.height/4, {
		    font: '80px Arial',
		    fill: '#212121',
		    fontWeight: 'bold',
		    width: 500,
		    height: 100,
		    borderWidth: 1,
		    borderColor: '#000',
		    borderRadius: 6,
		    padding: 10 
		});

		var submitBtn = game.add.sprite(game.width/2, game.height/4 + 250, 'nameCharBtn')
		submitBtn.anchor.setTo(0.5, 0.5);
		submitBtn.inputEnabled = true;
		submitBtn.events.onInputDown.add(this.startMain, this)

	},

	update: function(){
		
	},

	startMain: function() {
		game.state.start('playMain');
	},
};


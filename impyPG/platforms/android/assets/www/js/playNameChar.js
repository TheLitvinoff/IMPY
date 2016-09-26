var playNameCharState = {
	create: function(){
		game.add.image(0,0,'background');
		game.add.plugin(Fabrique.Plugins.InputField);

		var nameLabel = game.add.text(game.width/2, game.height/4 - 80, 'Name your Impy:', {font: '50px Arial', fill: '#212121', fontWeight: 'bold'});
		nameLabel.anchor.setTo(0.5, 0.5);

		var input = game.add.inputField((game.width-500)/2, game.height/4, {
		    font: '80px Arial',
		    fill: '#212121',
		    fontWeight: 'bold',
		    width: 500,
		    height: 100,
		    padding: 8,
		    borderWidth: 1,
		    borderColor: '#000',
		    borderRadius: 6,
		    placeHolder: 'Type here...',
		    padding: 10 
		});


	},

	update: function(){
		
	},

	startMain: function() {
		game.state.start('playMain');
	},
};


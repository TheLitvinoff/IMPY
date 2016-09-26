var playMainState = {
	create: function(){
		game.add.image(0,0,'background');

		var impyName = localStorage.getItem('impyName');

		var nameLabel = game.add.text(game.width/2 - 210, game.height/4 - 210, impyName, {font: '80px Gloria Hallelujah', fill: '#a8493d', fontWeight: 'bold', align: 'center'});
		
		//impy sprite
		this.impySprite = game.add.sprite(game.width/2 - 25, game.height/2 + 110, 'impy');
		this.impySprite.anchor.setTo(0.5, 0.5);
		//go out sprite
		this.impySprite = game.add.sprite(game.width - 100, 150, 'goOut');
		this.impySprite.anchor.setTo(0.5, 0.5);
		//food sprite
		this.impySprite = game.add.sprite(game.width - 100, 350, 'food');
		this.impySprite.anchor.setTo(0.5, 0.5);
		//play sprite
		this.impySprite = game.add.sprite(game.width - 100, 570, 'play');
		this.impySprite.anchor.setTo(0.5, 0.5);

		//animation of impy
		this.impySprite.animations.add('blink', [1, 0], 5, false);
		this.impySprite.inputEnabled = true;
		this.impySprite.events.onInputDown.add(this.impyBlink, this)
	},

	update: function(){
		
	},

	impyBlink: function() {
		this.impySprite.animations.play('blink');
	},
};


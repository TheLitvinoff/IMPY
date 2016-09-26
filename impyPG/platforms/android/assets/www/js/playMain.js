var playMainState = {
	create: function(){
		game.add.image(0,0,'background');

		var impyName = localStorage.getItem('impyName');

		var nameLabel = game.add.text(game.width/2, game.height/4 - 150, impyName, {font: '80px Gloria Hallelujah', fill: '#212121', fontWeight: 'bold'});
		nameLabel.anchor.setTo(0.5, 0.5);

		this.impySprite = game.add.sprite(game.width/2 - 25, game.height/2 + 110, 'impy');
		this.impySprite.anchor.setTo(0.5, 0.5);

		//animations
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


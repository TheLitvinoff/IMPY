var playMainState = {
	create: function(){
		game.add.image(0,0,'background');

		var impyName = localStorage.getItem('impyName');

		var nameLabel = game.add.text(game.width/2 - 210, game.height/4 - 210, impyName, {font: '80px Gloria Hallelujah', fill: '#a8493d', fontWeight: 'bold', align: 'center'});
		
		//impy sprite
		this.impySprite = game.add.sprite(game.width/2 - 25, game.height/2 + 110, 'impy');
		this.impySprite.anchor.setTo(0.5, 0.5);

		//go out sprite
		this.goOutSprite = game.add.sprite(game.width - 100, 150, 'goOut');
		this.goOutSprite.anchor.setTo(0.5, 0.5);
		this.goOutSprite.inputEnabled = true;
		this.goOutSprite.events.onInputDown.add(this.startGeo, this);

		//food sprite
		this.foodSprite = game.add.sprite(game.width - 100, 350, 'food');
		this.foodSprite.anchor.setTo(0.5, 0.5);
		this.foodSprite.inputEnabled = true;
		this.foodSprite.events.onInputDown.add(this.restoreProperties, this);

		//play sprite
		this.playSprite = game.add.sprite(game.width - 100, 570, 'play');
		this.playSprite.anchor.setTo(0.5, 0.5);
		this.playSprite.inputEnabled = true;
		this.playSprite.events.onInputDown.add(this.startClothes, this);

		//animation of impy
		this.impySprite.animations.add('blink', [1, 0], 5, false);
		this.impySprite.inputEnabled = true;
		this.impySprite.events.onInputDown.add(this.impyBlink, this);
		//health
		this.heartSprite = game.add.sprite(game.width -500, 1240, 'heart');
		this.heartSprite.anchor.setTo(0.5, 0.5);

		this.impySprite.customParams = {health: 100};

		var style = {font: '50px Gloria Hallelujah', fill: '#481b10'};
		this.game.add.text(315, 1200, "Health: ", style);
		this.healthText = this.game.add.text(500, 1200, "", style);
		this.refreshHealth();

		this.healthDecreaser = this.game.time.events.loop(Phaser.Timer.SECOND * 5, this.reduceProperties, this);
		this.healthDecreaser.timer.start();

		this.checkClothes();
	},

	update: function(){
		if(this.impySprite.customParams.health <= 0){
			this.impySprite.customParams.health = 0;
			this.impySprite.frame = 2;
		}
		else if(this.impySprite.customParams.health <= 20){
			this.impySprite.customParams.health = 20;
			this.impySprite.frame = 0;
		}
	},

	impyBlink: function() {
		this.impySprite.animations.play('blink');
	},
	startGeo: function() {
		game.state.start('playGeo');
	},
	refreshHealth: function(){
		this.healthText.text = this.impySprite.customParams.health;
	},
	reduceProperties: function(){
		this.impySprite.customParams.health = Math.max(0, this.impySprite.customParams.health - 20);
		this.refreshHealth();
	},
	restoreProperties: function(){
		this.impySprite.customParams.health = Math.max(20, this.impySprite.customParams.health + 20);
		this.refreshHealth();
	},
	startClothes: function() {
		game.state.start('clothes');
	},

	checkClothes: function() {
		for (var clothesUnit in game.global.clothes) {
			if (game.global.clothes[clothesUnit]['isWearing']) {
				this.clothesWear = game.add.sprite(game.width/2-90, game.height/2+25, game.global.clothes[clothesUnit]['name']);
				this.clothesWear.anchor.setTo(0.5, 0.5);
			}
		}
	}
};



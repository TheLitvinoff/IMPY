var clothesState = {
	create: function() {
		//back buttin
		this.backSprite = game.add.sprite(100, 150, 'back');
		this.backSprite.anchor.setTo(0.5, 0.5);
		this.backSprite.inputEnabled = true;
		this.backSprite.events.onInputDown.add(this.startMain, this);

		this.clothesPosY = 400;
		this.clothesPosX = 200;

		this.displayClothes();

		var capsMeter = game.add.sprite(game.width/2-100, 100, 'geoClothes');
		this.capsLabel = game.add.text(game.width/2-10, 90,  ' : ' + game.global.capsNum, {font: '50px Gloria Hallelujah', fill: '#212121', fontWeight: 'bold', align: 'center'});
	   	
	},

	update: function() {
	}, 

	displayClothes: function() {
		for (var clothesUnit in game.global.clothes) {
			var clothesSprite = game.add.sprite(this.clothesPosX, this.clothesPosY, game.global.clothes[clothesUnit]['name']);
			clothesSprite.anchor.setTo(0.5, 0.5);
			if (game.global.clothes[clothesUnit]['isEnabled'] === false) {
				var capsMeter = game.add.sprite(this.clothesPosX, this.clothesPosY + 100, 'geoClothes');
				this.priceLabel = game.add.text(this.clothesPosX - 40, this.clothesPosY + 95, game.global.clothes[clothesUnit]['price'], {font: '50px Gloria Hallelujah', fill: '#212121', fontWeight: 'bold', align: 'center'});
	   			
			} else {
				if (game.global.clothes[clothesUnit]['isWearing'] === false) {

				} else {

				}
			}

			this.clothesPosX = this.clothesPosX + 400;


			for (var clothesUnitProp in game.global.clothes[clothesUnit]) {
				console.log(clothesUnitProp + ': ' + game.global.clothes[clothesUnit][clothesUnitProp]);
			}
		}
	},

	startMain: function() {
		game.state.start('playMain');
	},
};
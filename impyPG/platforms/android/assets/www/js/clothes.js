var clothesState = {
	create: function() {
		//back buttin
		this.backSprite = game.add.sprite(100, 150, 'back');
		this.backSprite.anchor.setTo(0.5, 0.5);
		this.backSprite.inputEnabled = true;
		this.backSprite.events.onInputDown.add(this.startMain, this);

		game.global.clothesPosY = 400;
		game.global.clothesPosX = 200;

		this.displayClothes();

		var capsMeter = game.add.sprite(game.width/2-100, 100, 'geoClothes');
		this.capsLabel = game.add.text(game.width/2-10, 90,  ' : ' + game.global.capsNum, {font: '50px Gloria Hallelujah', fill: '#212121', fontWeight: 'bold', align: 'center'});
	},

	update: function() {
	}, 

	displayClothes: function () {
		for (var clothesUnit in game.global.clothes) {
			game.global.clothesSprite = game.add.sprite(game.global.clothesPosX, game.global.clothesPosY, game.global.clothes[clothesUnit]['name']);
			game.global.clothesSprite.anchor.setTo(0.5, 0.5);
			var clothesFrame = game.add.sprite(game.global.clothesPosX, game.global.clothesPosY + 45, 'clothesFrame');
			clothesFrame.anchor.setTo(0.5, 0.5);
			game.global.clothesSprite.inputEnabled = true;
			if (game.global.clothes[clothesUnit]['isEnabled'] === false) {
				game.global.capsMeter = game.add.sprite(game.global.clothesPosX, game.global.clothesPosY + 100, 'geoClothes');
				game.global.priceLabel = game.add.text(game.global.clothesPosX - 40, game.global.clothesPosY + 95, game.global.clothes[clothesUnit]['price'], {font: '50px Gloria Hallelujah', fill: '#212121', fontWeight: 'bold', align: 'center'});
	   			game.global.clothesSprite.events.onInputDown.addOnce(buyClothes, this);
			} else {
				if (game.global.clothes[clothesUnit]['isWearing']) {
	   				game.global.okaySprite = game.add.sprite(game.global.clothesPosX, game.global.clothesPosY + 120, 'okay');
					game.global.okaySprite.anchor.setTo(0.5, 0.5);
	   				game.global.clothesSprite.events.onInputDown.add(undressClothes, this);
				} else {
	   				game.global.clothesSprite.events.onInputDown.add(dressClothes, this);
				}
			};

			function buyClothes() {
				if (game.global.capsNum < game.global.clothes[clothesUnit]['price']) {
					var message = game.add.text(game.width/2, game.height/2 + 200,  'Sorry, you don\'t \n have enough caps. :(', {font: '50px Gloria Hallelujah', fill: '#ff0000', fontWeight: 'bold', align: 'center'});
					message.anchor.setTo(0.5, 0.5);
				}
				else {
					game.global.capsNum = game.global.capsNum - game.global.clothes[clothesUnit]['price'];
					game.global.clothes[clothesUnit]['isEnabled'] = true;
					game.global.capsMeter.destroy();
					game.global.priceLabel.destroy();
					game.state.start('clothes');
				}
			};

			function undressClothes() {
				game.global.okaySprite.destroy();
				game.global.clothes[clothesUnit]['isWearing'] = false;
				game.state.start('clothes');
			};

			function dressClothes() {
				game.global.okaySprite = game.add.sprite(game.global.clothesSprite.position.x, game.global.clothesSprite.position.y + 120, 'okay');
				game.global.okaySprite.anchor.setTo(0.5, 0.5);
				game.global.clothes[clothesUnit]['isWearing'] = true;
				game.state.start('clothes');
			};

			game.global.clothesPosX = game.global.clothesPosX + 400;
		}
	},

	startMain: function() {
		game.state.start('playMain');
	},

	
};
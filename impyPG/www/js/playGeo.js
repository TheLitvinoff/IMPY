var playGeoState = {
	create: function() {
		//add Grid
		var grid = game.add.sprite(game.width/2, game.height/2, 'geoGrid');
		grid.anchor.setTo(0.5, 0.5);
		grid.scale.setTo(2, 2);

		//add character pic
		this.impySprite = game.add.sprite(game.width/2, game.height/2, 'radarImpy');
		this.impySprite.anchor.setTo(0.5, 0.5);

		//back buttin
		this.backSprite = game.add.sprite(100, 150, 'back');
		this.backSprite.anchor.setTo(0.5, 0.5);
		this.backSprite.inputEnabled = true;
		this.backSprite.events.onInputDown.add(this.startMain, this);

		//compass arrow
		//game.global.compArr = game.add.sprite(game.width/2, game.height/2, 'compassArrow')
		//game.global.compArr.anchor.setTo(0.5, 1);

		this.clothesNum = 0;

		game.global.latLabel = game.add.text(game.width/2, game.height/4 - 80,  'latitude', {font: '50px Gloria Hallelujah', fill: '#ffffff', fontWeight: 'bold', align: 'center'});
	   	game.global.latLabel.anchor.setTo(0.5, 0.5);
	   	game.global.lonLabel = game.add.text(game.width/2, game.height/4 - 200,  'longitude', {font: '50px Gloria Hallelujah', fill: '#ffffff', fontWeight: 'bold', align: 'center'});
	    game.global.lonLabel.anchor.setTo(0.5, 0.5);
	    //game.global.magHead = 0;
	},

	update: function() {
		this.getGeo();
		this.checkCompass();
		if (this.clothesNum < 3) {
			this.addClothes();
		}
		this.checkClothesPosition();	
	}, 

	getGeo: function() {
		var options = {
	    	maximumAge: 3000, 
	    	enableHighAccuracy: true
	   	}
		
	   	var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

	   	function onSuccess(position) {
	   		game.global.latitude = position.coords.latitude;
	   		game.global.longitude = position.coords.longitude;
	   		/*game.global.latLabel.setText(this.posLat);*/
	   		game.global.lonLabel.setText(game.global.longitude);
	   	};

	   	function onError(error) {
	      	var errorLabel = game.add.text(game.width/2, game.height/4 - 200,  'GEO code: '    + error.code    + '\n' + 'message: ' + error.message + '\n', {font: '50px Gloria Hallelujah', fill: '#ff0000', fontWeight: 'bold', align: 'center'});
	    	errorLabel.anchor.setTo(0.5, 0.5);
	   	}
	},

	addClothes: function() {
		if (game.global.latitude != 0 && game.global.longitude != 0) {
			this.clothesLat = game.global.latitude + (Math.floor(Math.random() * 10) - 10)/10000 ;
			this.clothesLon = game.global.longitude + (Math.floor(Math.random() * 10) - 10)/10000 ;
			this.clothesSprite = game.add.sprite(game.width + 100, game.height + 100, 'geoClothes');	
			this.clothesNum++;
		}
	},

	checkClothesPosition: function() {
		if (this.clothesSprite) {
			/*var clothesGamePosX =  game.height/2 + ((this.clothesLat-game.global.latitude)*1000) * (game.height/4);
			var clothesGamePosY =   game.width/2 + ((this.clothesLon-game.global.longitude)*1000) * (game.width/4);
			this.clothesSprite.position.x = clothesGamePosX;
			this.clothesSprite.position.y = clothesGamePosY;*/
			var clothesGamePosX =  game.width/2 + (((this.clothesLon-game.global.longitude)*1000) * (game.width/2));
			var clothesGamePosY =   game.height/4 - ((this.clothesLat-game.global.latitude)*1000) * (game.height/4);
			this.clothesSprite.position.x = clothesGamePosX;
			this.clothesSprite.position.y = clothesGamePosY;

			if (game.global.magHead) {
				var radius = Math.sqrt(Math.pow((game.width/2 - clothesGamePosX), 2) + Math.pow((game.height/2 + clothesGamePosY), 2));
				var angleRad = game.global.magHead * Math.PI / 180;
				var distancePx = Math.sqrt(2*Math.pow(radius, 2) - Math.pow(radius, 2)*Math.cos(angleRad));

				this.clothesSprite.position.rotate(game.width/2, game.height/2, -(game.global.magHead), distancePx);
			}
		}
	},

	checkCompass: function() {
		function onSuccess(heading) {
			/*if (game.global.magHead) {	
				this.angleDiff = heading.magneticHeading - game.global.magHead;
				game.global.compArr.angle += this.angleDiff;
			}*/
			game.global.magHead = heading.magneticHeading;
		    game.global.latLabel.setText(this.magHead); 
		};

		function onError(error) {
		    var errorLabel = game.add.text(game.width/2, game.height/4 - 200,  'CompassError: ' + error.code, {font: '20px Gloria Hallelujah', fill: '#ff0000', fontWeight: 'bold', align: 'center'});
	    	errorLabel.anchor.setTo(0.5, 0.5);
		};

		navigator.compass.getCurrentHeading(onSuccess, onError);
	},

	startMain: function() {
		game.state.start('playMain');
	},
};
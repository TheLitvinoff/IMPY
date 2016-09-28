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
		game.global.compArr = game.add.sprite(game.width/2, game.height/2, 'compassArrow')
		game.global.compArr.anchor.setTo(0.5, 1);

		this.clothesNum = 0;

		game.global.latLabel = game.add.text(game.width/2, game.height/4 - 80,  'latitude', {font: '50px Gloria Hallelujah', fill: '#ffffff', fontWeight: 'bold', align: 'center'});
	   	game.global.latLabel.anchor.setTo(0.5, 0.5);
	   	/*game.global.lonLabel = game.add.text(game.width/2, game.height/4 - 200,  'longitude', {font: '50px Gloria Hallelujah', fill: '#ffffff', fontWeight: 'bold', align: 'center'});
	    game.global.lonLabel.anchor.setTo(0.5, 0.5);*/
	},

	update: function() {
		this.getGeo();
		if (this.clothesNum < 1) {
			this.addClothes();
		}
		this.checkClothesPosition();	
		this.checkCompass();
	}, 

	getGeo: function() {
		var options = {
	    	maximumAge: 3000, 
	    	timeout: 5000, 
	    	enableHighAccuracy: true
	   	}
		
	   	var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

	   	function onSuccess(position) {
	   		game.global.latitude = position.coords.latitude;
	   		game.global.longitude = position.coords.longitude;
	   		/*game.global.latLabel.setText(this.posLat);
	   		game.global.lonLabel.setText(this.posLon);*/
	   	};

	   	function onError(error) {
	      	var errorLabel = game.add.text(game.width/2, game.height/4 - 200,  'GEO code: '    + error.code    + '\n' + 'message: ' + error.message + '\n', {font: '50px Gloria Hallelujah', fill: '#ff0000', fontWeight: 'bold', align: 'center'});
	    	errorLabel.anchor.setTo(0.5, 0.5);
	   	}
	},

	addClothes: function() {
		if (game.global.latitude != 0 && game.global.longitude != 0) {
			this.clothesLat = game.global.latitude + 0.00001;
			this.clothesLon = game.global.longitude + 0.00001;
			this.clothesSprite = game.add.sprite(game.width + 100, game.height + 100, 'geoClothes');	
			this.clothesNum++;
		}
	},

	checkClothesPosition: function() {
		if (this.clothesSprite) {
			var clothesGamePosX = ((this.clothesLat-game.global.latitude)*1000) * (game.height/4) + game.height/2;
			var clothesGamePosY = ((this.clothesLon-game.global.longitude)*1000) * (game.width/4) + game.width/2;
			this.clothesSprite.position.x = clothesGamePosX;
			this.clothesSprite.position.y = clothesGamePosY;
		}
	},

	checkCompass: function() {
		function onSuccess(heading) {
			if (this.magHead) {	
				this.angleDiff = heading.magneticHeading - magHead;
				game.global.compArr.angle += this.angleDiff;
			}
			this.magHead = heading.magneticHeading;
		    game.global.latLabel.setText(this.magHead); 
		};

		function onError(error) {
		    var errorLabel = game.add.text(game.width/2, game.height/4 - 200,  'CompassError: ' + error.code, {font: '50px Gloria Hallelujah', fill: '#ff0000', fontWeight: 'bold', align: 'center'});
	    	errorLabel.anchor.setTo(0.5, 0.5);
		};

		navigator.compass.getCurrentHeading(onSuccess, onError);
	},

	startMain: function() {
		game.state.start('playMain');
	},
};
var playGeoState = {
	create: function() {
		//add Grid
		var grid = game.add.sprite(game.width/2, game.height/2, 'geoGrid');
		grid.anchor.setTo(0.5, 0.5);
		grid.scale.setTo(2, 2);

		//add character pic
		this.impySprite = game.add.sprite(game.width/2, game.height/2, 'radarImpy');
		this.impySprite.anchor.setTo(0.5, 0.5);
		game.physics.arcade.enable(this.impySprite);

		//back buttin
		this.backSprite = game.add.sprite(100, 150, 'back');
		this.backSprite.anchor.setTo(0.5, 0.5);
		this.backSprite.inputEnabled = true;
		this.backSprite.events.onInputDown.add(this.startMain, this);

		//clothes
		this.clothes = game.add.physicsGroup();

		//compass arrow
		//game.global.compArr = game.add.sprite(game.width/2, game.height/2, 'compassArrow')
		//game.global.compArr.anchor.setTo(0.5, 1);

		game.global.latLabel = game.add.text(game.width/2, game.height/4 - 80,  'latitude', {font: '50px Gloria Hallelujah', fill: '#ffffff', fontWeight: 'bold', align: 'center'});
	   	game.global.latLabel.anchor.setTo(0.5, 0.5);
	   	game.global.lonLabel = game.add.text(game.width/2, game.height/4 - 200,  'longitude', {font: '50px Gloria Hallelujah', fill: '#ffffff', fontWeight: 'bold', align: 'center'});
	    game.global.lonLabel.anchor.setTo(0.5, 0.5);

		this.addClothes();
		this.setClothesPosition();
		//game.global.magHead = 0;
		this.getGeo();
	},

	update: function() {
		this.checkCompass();
		this.checkClothesPosition();

		game.physics.arcade.overlap(this.clothes, this.impySprite, this.takeClothes, null, this);
	}, 

	getGeo: function() {
		var options = {
			maximumAge: 3000, 
			timeout: 10000, 
			enableHighAccuracy: true
	   	}
		
	   	var watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);

	   	function onSuccess(position) {
	   		game.global.latitude = position.coords.latitude;
	   		game.global.longitude = position.coords.longitude;
	   		game.global.latLabel.setText(game.global.latitude);
	   		game.global.lonLabel.setText(game.global.longitude);
	   	};

	   	function onError(error) {
	      	var errorLabel = game.add.text(game.width/2, game.height/4 - 200,  'GEO code: '    + error.code    + '\n' + 'message: ' + error.message + '\n', {font: '50px Gloria Hallelujah', fill: '#ff0000', fontWeight: 'bold', align: 'center'});
	    	errorLabel.anchor.setTo(0.5, 0.5);
	   	}
	},

	addClothes: function() {
		for (var i=0; i < game.global.clothesNumber; i++) {
			this.clothes.create(game.width, game.height, 'geoClothes');	
		}
	},

	setClothesPosition: function() {
		this.positions = [];
		for (var i = 0; i < game.global.clothesNumber; i++) {
			var latitude = game.global.latitude + (Math.floor(Math.random() * 21) - 10)/10000;
			var longitude = game.global.longitude + (Math.floor(Math.random() * 21) - 10)/10000;
			var positionLatLon = [latitude, longitude];
			this.positions[i] = positionLatLon;
		}
	},

	checkClothesPosition: function() {
		if ((this.clothes.countLiving() > 0) && !(this.positions[game.global.clothesNumber-1][1] === null)) {
			for (var i = 0; i < game.global.clothesNumber; i++) {
				var clothesLongitude = this.positions[i][1]; //longitude in 2-level array
				var clothesLatitude = this.positions[i][0]; //latitude in 2-level array
				var clothesGamePosX =  game.width/2 + (((clothesLongitude-game.global.longitude)*1000) * (game.width/2)); //translate from actual latitude and longitude to the screen size
				var clothesGamePosY =  game.height/2 - (((clothesLatitude-game.global.latitude)*1000) * (game.height/4));
				this.clothes.getAt(i).position.x = clothesGamePosX;
				this.clothes.getAt(i).position.y = clothesGamePosY;

				if (game.global.magHead) {
					//pithagor's theorem (c^2 = a^2 + b^2)
					var radius = Math.sqrt(Math.pow((game.width/2 - clothesGamePosX), 2) + Math.pow((game.height/2 + clothesGamePosY), 2));
					//translate angle from degrees to radians
					var angleRad = game.global.magHead * Math.PI / 180;
					//find a triangle's side by formula: sqrt(r^2*r^2 - r^2*Cos(Difference angle)) 
					var distancePx = Math.sqrt(2*Math.pow(radius, 2) - Math.pow(radius, 2)*Math.cos(angleRad));

					this.clothes.getAt(i).position.rotate(game.width/2, game.height/2, -(game.global.magHead), distancePx);
				}
			}
			
		}
	},

	checkCompass: function() {
		function onSuccess(heading) {
			game.global.magHead = heading.magneticHeading;
		    //game.global.latLabel.setText(this.magHead); 
		};

		function onError(error) {
		    var errorLabel = game.add.text(game.width/2, game.height/4 - 200,  'CompassError: ' + error.code, {font: '20px Gloria Hallelujah', fill: '#ff0000', fontWeight: 'bold', align: 'center'});
	    	errorLabel.anchor.setTo(0.5, 0.5);
		};

		navigator.compass.getCurrentHeading(onSuccess, onError);
	},

	takeClothes: function(impy, cap) {
		cap.kill();
		//game.state.start('playMain');
		game.global.clothesNumber--;
	},

	startMain: function() {
		game.state.start('playMain');
	},
};
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

		//clothes
		this.clothes = game.add.group();

		//compass arrow
		//game.global.compArr = game.add.sprite(game.width/2, game.height/2, 'compassArrow')
		//game.global.compArr.anchor.setTo(0.5, 1);

		game.global.latLabel = game.add.text(game.width/2, game.height/4 - 80,  'latitude', {font: '50px Gloria Hallelujah', fill: '#ffffff', fontWeight: 'bold', align: 'center'});
	   	game.global.latLabel.anchor.setTo(0.5, 0.5);
	   	game.global.lonLabel = game.add.text(game.width/2, game.height/4 - 200,  'longitude', {font: '50px Gloria Hallelujah', fill: '#ffffff', fontWeight: 'bold', align: 'center'});
	    game.global.lonLabel.anchor.setTo(0.5, 0.5);
	    game.global.magHead = 0;


		this.getGeo();
		this.addClothes();
		this.setClothesPosition();
	},

	update: function() {
		this.getGeo();
		//this.checkCompass();
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
		for (var i=0; i < 3; i++) {
			this.clothes.create(game.width, game.height, 'geoClothes');	
		}
	},

	setClothesPosition: function() {
		this.positions = [];
		for (var i = 0; i < 3; i++) {
			var latitude = game.global.latitude + (Math.floor(Math.random() * 10) - 10)/10000;
			var longitude = game.global.longitude + (Math.floor(Math.random() * 10) - 10)/10000;
			var positionLatLon = [latitude, longitude];
			this.positions[i] = positionLatLon;
		}
	},

	checkClothesPosition: function() {
		if ((this.clothes.countLiving() > 0) && !(this.positions[2][1] === null)) {
			for (var i = 0; i < this.clothes.countLiving(); i++) {
				var clothesLongitude = this.positions[i][1];
				var clothesLatitude = this.positions[i][0];
				var clothesGamePosX =  game.width/2 + (((clothesLongitude-game.global.longitude)*1000) * (game.width/2));
				var clothesGamePosY =   game.height/4 - ((clothesLatitude-game.global.latitude)*1000) * (game.height/4);
				this.clothes.getAt(i).position.x = clothesGamePosX;
				this.clothes.getAt(i).position.y = clothesGamePosY;

				if (game.global.magHead) {
					var radius = Math.sqrt(Math.pow((game.width/2 - clothesGamePosX), 2) + Math.pow((game.height/2 + clothesGamePosY), 2));
					var angleRad = game.global.magHead * Math.PI / 180;
					var distancePx = Math.sqrt(2*Math.pow(radius, 2) - Math.pow(radius, 2)*Math.cos(angleRad));

					clothingUnit.position.rotate(game.width/2, game.height/2, -(game.global.magHead), distancePx);
				}
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
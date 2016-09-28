var playGeoState = {
	create: function() {
		this.goOutSprite = game.add.sprite(game.width - 100, 150, 'goOut');
		this.goOutSprite.anchor.setTo(0.5, 0.5);
		this.goOutSprite.inputEnabled = true;
		//this.goOutSprite.events.onInputDown.add(this.getGeo, this);

		game.global.latLabel = game.add.text(game.width/2, game.height/4 - 80,  'latitude', {font: '50px Gloria Hallelujah', fill: '#ffffff', fontWeight: 'bold', align: 'center'});
	   	game.global.latLabel.anchor.setTo(0.5, 0.5);
	   	game.global.lonLabel = game.add.text(game.width/2, game.height/4 - 200,  'longitude', {font: '50px Gloria Hallelujah', fill: '#ffffff', fontWeight: 'bold', align: 'center'});
	    game.global.lonLabel.anchor.setTo(0.5, 0.5);
	},
	update: function() {
		this.getGeo();
	}, 
	getGeo: function() {
		var options = {
	    	maximumAge: 3000, 
	    	timeout: 5000, 
	    	enableHighAccuracy: true
	   	}
		
	   	var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

	   	function onSuccess(position) {
	   		var posLat = position.coords.latitude;
	   		var posLon = position.coords.longitude;
	   		game.global.latLabel.setText(posLat);
	   		game.global.lonLabel.setText(posLon);
	   	};

	   	function onError(error) {
	      	//alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
	   	}
	},
};
var playGeoState = {
	create: function() {
		this.goOutSprite = game.add.sprite(game.width - 100, 150, 'goOut');
		this.goOutSprite.anchor.setTo(0.5, 0.5);
		this.goOutSprite.inputEnabled = true;
		this.goOutSprite.events.onInputDown.add(this.getGeo, this);
	},
	update: function() {

	}, 
	getGeo: function() {
		var options = {
	    	enableHighAccuracy: true
	   	}
		
	   	var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

	   	function onSuccess(position) {
	   		var pos = position.coords.latitude;
	   		var nameLabel = game.add.text(game.width/2, game.height/4 - 80,  pos, {font: '50px Gloria Hallelujah', fill: '#212121', fontWeight: 'bold', align: 'center'});
	      	
	   	};

	   	function onError(error) {
	      	//alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
	   	}
	},
};
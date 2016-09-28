var game = new Phaser.Game(779, 1334);

game.global = {
	impyName: '',
	latitude: '',
	longitude: ''
};

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('playNameChar', playNameCharState);
game.state.add('playMain', playMainState);
game.state.add('playGeo', playGeoState);

game.state.start('boot');
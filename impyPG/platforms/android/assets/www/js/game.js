var game = new Phaser.Game(779, 1334);

game.global = {
	impyName: '',
	latitude: 0,
	longitude: 0,
	latLabel: ''
};

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('playNameChar', playNameCharState);
game.state.add('playMain', playMainState);
game.state.add('playGeo', playGeoState);

game.state.start('boot');
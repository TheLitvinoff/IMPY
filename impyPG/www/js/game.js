var game = new Phaser.Game(779, 1334);

game.global = {
	impyName: '',
	latitude: 0,
	longitude: 0,
	compArr: '', 
	magHead: '',
	clothesNumber: 3,
	clothes: {
		redGlasses: {
			isEnabled: false,
			isWearing: false, 
			name: 'redGlasses',
			price: 3,
			check: 0
		},
		blackGlasses: {
			isEnabled: false,
			isWearing: false,
			name: 'blackGlasses',
			price: 2,
			check: 0
		}
	},
	capsNum: 0
};

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('playNameChar', playNameCharState);
game.state.add('playMain', playMainState);
game.state.add('playGeo', playGeoState);
game.state.add('clothes', clothesState);

game.state.start('boot');
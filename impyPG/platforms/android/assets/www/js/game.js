var game = new Phaser.Game(768, 1280, Phaser.AUTO, 'deviceready');

game.global = {
	
};

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('playNameChar', playNameCharState);
game.state.add('playMain', playMainState);

game.state.start('boot');
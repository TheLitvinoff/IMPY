var game = new Phaser.Game(768, 1280);

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('playNameChar', playNameCharState);
game.state.add('playMain', playMainState);

game.state.start('boot');
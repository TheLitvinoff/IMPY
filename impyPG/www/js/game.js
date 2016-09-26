var game = new Phaser.Game(779, 1334);

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('playNameChar', playNameCharState);
game.state.add('playMain', playMainState);

game.state.start('boot');
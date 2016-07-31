var gameEmitter = require('./gameEmitter');

var gameLogic = {
  playerPosition: 1,
  movePlayer: function(numSpaces) {
    var nextPosition = (this.playerPosition + numSpaces) % 12;
    if (nextPosition === 0) {
      nextPosition = 1;
    }
    this.playerPosition = nextPosition;
  },
  roll: function() {
    return Math.floor(Math.random() * 5) + 1;
  },
  takeTurn: function() {
    var die = this.roll();
    var start = this.playerPosition;
    if (die + start >= 12) {
      gameEmitter.emit('passedGo');
    }
    this.movePlayer(die);
    return this.playerPosition;
  }
}

module.exports = gameLogic;

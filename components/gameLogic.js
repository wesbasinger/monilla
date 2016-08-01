const gameData = require('./gameData');
var gameEmitter = require('./gameEmitter');

var gameLogic = {
  playerPosition: 1,
  balance: 1000,
  movePlayer: function(numSpaces) {
    var nextPosition = (this.playerPosition + numSpaces) % 12;
    if (nextPosition === 0) {
      this.playerPosition = 1;
    } else {
      this.playerPosition = nextPosition;
    }
  },
  roll: function() {
    return Math.floor(Math.random() * 5) + 1;
  },
  takeTurn: function() {
    var start = this.playerPosition;
    var die = this.roll();
    if (start + die >= 12) {
      this.balance += 200;
    }
    this.movePlayer(die);
    if (this.playerPosition === 2 || this.playerPosition === 4 || this.playerPosition === 6 || this.playerPosition === 11) {
      this.communityChest();
    }
    return this.playerPosition;
  },
  communityChest: function() {
    var random = Math.floor(Math.random() * (gameData.communityChest.length - 1));
    var card = gameData.communityChest[random];
    this.balance += card.net;
    gameEmitter.emit('communityChest', {message: card.description});
  }
}

module.exports = gameLogic;

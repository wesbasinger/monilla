const gameData = require('./gameData');
var gameEmitter = require('./gameEmitter');

var gameLogic = {
  playerPosition: 1,
  balance: gameData.initialBalance,
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
      gameEmitter.emit('passedGo');
    }
    this.movePlayer(die);
    if (this.playerPosition === 2 || this.playerPosition === 4 || this.playerPosition === 6 || this.playerPosition === 11) {
      this.communityChest();
    } else if (this.playerPosition === 3 ||
               this.playerPosition === 7 ||
               this.playerPosition === 9 ||
               this.playerPosition === 12) {
      this.centralTransportation(this.playerPosition);
    }
    return this.playerPosition;
  },
  communityChest: function() {
    var random = Math.floor(Math.random() * (gameData.communityChest.length - 1));
    var card = gameData.communityChest[random];
    this.balance += card.net;
    gameEmitter.emit('communityChest', {message: card.description});
  },
  centralTransportation: function(square) {
    if (square === 3) { // air
      this.balance -= 800;
      gameEmitter.emit(
        'centralTransportation',
        {
          message: `You bought an air ticket to ${gameData.destinations[Math.floor(Math.random() * gameData.destinations.length)]}.  It cost $800`
        }
      );
    } else if (square === 7) {
      this.balance -= 50;
      gameEmitter.emit(
        'centralTransportation',
        {
          message: `You bought an land ticket to ${gameData.destinations[Math.floor(Math.random() * gameData.destinations.length)]}.  It cost $50`
        }
      );
    } else if (square === 9) {
      this.balance -= 400;
      gameEmitter.emit(
        'centralTransportation',
        {
          message: `You bought an sea ticket to ${gameData.destinations[Math.floor(Math.random() * gameData.destinations.length)]}.  It cost $400`
        }
      );
    } else if (square === 12) {
      this.balance -= 100;
      gameEmitter.emit(
        'centralTransportation',
        {
          message: `You bought an rail ticket to ${gameData.destinations[Math.floor(Math.random() * gameData.destinations.length)]}.  It cost $100`
        }
      );
    }
  }
}

module.exports = gameLogic;
